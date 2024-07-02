import React, { useState, useEffect, useCallback } from 'react'
import { fetchData, postData } from '../requestData'
import { useNavigate } from 'react-router-dom';
import { showAlert } from '../Redux/alertSlice';
import { useDispatch } from 'react-redux';

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import Loader from '../Components/Loader/Loader';

import { BsSignpost2 } from "react-icons/bs";
import { RiDeleteBinLine } from "react-icons/ri";
import { FiEdit } from "react-icons/fi";
import { SlCloudUpload } from "react-icons/sl";


function Dashboard() {
  const [allUsers, setAllUsers] = useState([]);
  const [allPosts, setAllPosts] = useState([]);
  const [postTitle, setPostTitle] = useState('');
  const [postContent, setPostContent] = useState('');
  const [coverImage, setCoverImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [refetchPosts, setRefetchPosts] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingUser, setIsLoadingUser] = useState(false);
  const [isLoadingPost, setIsLoadingPost] = useState(false);
  const [deletingPostId, setDeletingPostId] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleAddPost = useCallback(async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData();
    formData.append('title', postTitle);
    formData.append('content', postContent);
    formData.append('coverImage', coverImage);

    try {
      await postData(`${import.meta.env.VITE_API_URL}/api/v1/admin/generatePost`, formData);
      console.log("post added sucessfully")
      dispatch(showAlert('Post added successfully'));
      setRefetchPosts(prev => !prev);
    } catch (error) {
      console.error('Failed to add post:', error.message);
      dispatch(showAlert('Failed to add post'));
    } finally {
      setIsLoading(false);
    }
  });


  const handleDeletePost = useCallback(async (postId) => {
    setDeletingPostId(postId);
    try {
      const response = await postData(`${import.meta.env.VITE_API_URL}/api/v1/admin/deletePost`, { _id: postId });
      console.log('Post deleted successfully:', response);
      dispatch(showAlert('Post deleted successfully')); 
      setRefetchPosts(prev => !prev);
    } catch (error) {
      console.error('Failed to delete post:', error.message);
      dispatch(showAlert('Failed to delete post')); 
    } finally {
      setDeletingPostId(null);
    }
  });

  useEffect(() => {
    setIsLoadingUser(true)

    fetchData(`${import.meta.env.VITE_API_URL}/api/v1/admin/getAllUsers`)
      .then(fetchData => {
        setAllUsers(fetchData.data)
        console.log("able to fetch user")
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        navigate('/');
      }).finally(() => {
        setIsLoadingUser(false)
      })

  }, [])

  useEffect(() => {
    setIsLoadingPost(true)


    fetchData(`${import.meta.env.VITE_API_URL}/api/v1/admin/getAllPosts`)
      .then(fetchData => {
        setAllPosts(fetchData.data)
        console.log("able to fetch post")
      })
      .catch(error => console.error('Error:', error))
      .finally(() => {
        setIsLoadingPost(false)
      });



  }, [refetchPosts])







  return (
    <div>
      <div className='flex gap-3 mb-10'>
        <div className='bg-[#685CFE] p-3 rounded-md w-52'>
          <div className='flex justify-between'>
            <div className='text-blue-50 text-sm'>Total Post</div>
            <div className='p-2 rounded-md text-[#dedcff] text-xl bg-[#8b82ff]'><BsSignpost2 /></div>
          </div>
          <div className='text-3xl text-blue-50'>{allPosts.length}</div>
          <div className='text-[12px] text-blue-100'>*Updated every post</div>
        </div>

        <div className='bg-gray-50 p-3 rounded-md w-52'>
          <div className='flex justify-between'>
            <div className='text-gray-800 text-sm'>Total Users</div>
            <div className='p-2 rounded-md text-[#dedcff] text-xl bg-[#8b82ff]'><BsSignpost2 /></div>
          </div>
          <div className='text-3xl text-gray-900'>{allUsers.length}</div>
          <div className='text-[12px] text-gray-800'>*Updated every users</div>
        </div>

      </div>

      <div className='bg-[#3A3B3D] p-6 rounded-lg overflow-x-auto'>
        <div className='flex justify-between'>
          <div className='text-2xl font-semibold text-white mb-2'>Posts</div>
          <a href="#addPost">
            <div className='bg-[#242527] p-2 px-4 shadow-md shadow-[#2c2c2d] rounded-md text-gray-100 cursor-pointer hover:bg-[#1a1b1c]'>Add Post</div>
          </a>
        </div>
        {isLoadingPost ?
          <div className='w-full'><Loader /></div> :
          <table className='text-gray-200 w-full max-h-[60vh] overflow-y-auto'>
            <thead className='text-gray-50 font-semibold'>
              <tr className='border-b border-[#6b6b6c]'>
                <td className='p-3'>So.no</td>
                <td className='p-3'>Title</td>
                <td className='p-3'>Image</td>
                {/* <td className='p-3'>Content</td> */}
                <td className='p-3'>Created by</td>
                <td className='p-3'>Delete</td>
                <td className='p-3'>Edit</td>
              </tr>
            </thead>
            <tbody>
              {allPosts.map((post, i) => (
                <tr className='border-b border-[#474747]' key={post._id}>
                  <td className='p-3 px-3 text-sm max-w-32'>{i + 1}</td>
                  <td className='p-3 px-3 text-sm max-w-32 line-clamp-1 leading-[40px]'>{post.title}</td>
                  <td className='p-3 px-3 text-sm max-w-32'><div className='w-10 h-10 overflow-hidden rounded-full'><img src={post.coverImage} alt="" className='w-full  h-full object-cover' /></div></td>
                  {/* <td className='pt-3 text-sm max-w-32 '>{post.content}</td> */}
                  <td className='p-3 px-3 text-sm max-w-32'>{post.authorId.username}</td>

                  <td className='p-3 px-3 text-sm max-w-32'>
                    {deletingPostId === post._id ? (
                      <div className="w-fit flex justify-center items-center">
                        <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-blue-500"></div>
                      </div>
                    ) : (
                      <button className='bg-red-500 p-2 rounded-md hover:bg-red-400' onClick={() => handleDeletePost(post._id)}>
                        <RiDeleteBinLine />
                      </button>
                    )}
                  </td>

                  <td className='p-3 px-3 py-2'><button className='bg-[#685CFE] p-2 rounded-md'><FiEdit /></button></td>
                </tr>
              ))}
            </tbody>
          </table>
        }
      </div>


      <div className='mt-20 bg-[#3A3B3D] p-6 rounded-lg overflow-x-auto'>
        <div className='text-2xl font-semibold text-white mb-2'>Users</div>
        {isLoadingUser ?
          <div className='w-full'><Loader /></div> :
          <table className='text-gray-200 w-full max-h-[60vh] overflow-y-auto'>
            <thead className='text-gray-50 font-semibold'>
              <tr className='border-b border-[#6b6b6c]'>
                <td className='p-3'>So.no</td>
                <td className='p-3'>Name</td>
                <td className='p-3'>userName</td>
                <td className='p-3'>Email</td>
                <td className='p-3'>Role</td>
                <td className='p-3'>Delete</td>
                <td className='p-3'>Edit</td>
              </tr>
            </thead>
            <tbody>
              {allUsers.map((user, i) => (
                <tr className='border-b border-[#474747]' key={user._id}>
                  <td className='p-3 text-sm'>{i + 1}</td>
                  <td className='p-3 text-sm'>{user.fullName}</td>
                  <td className='p-3 text-sm'>{user.username}</td>
                  <td className='p-3 text-sm'>{user.email}</td>
                  <td className={`p-3 text-sm ${user.role === "user" ? "text-green-400" : "text-orange-400"}`}>{user.role}</td>
                  <td className='p-3 text-sm'><button className='bg-red-500 p-2 rounded-md hover:bg-red-400'><RiDeleteBinLine /></button></td>
                  <td className='p-3 text-sm'><button className='bg-[#685CFE] p-2 rounded-md'><FiEdit /></button></td>
                </tr>
              ))}
            </tbody>
          </table>
        }
      </div>


      <div id='addPost' className='mt-20 bg-[#3A3B3D] p-6 rounded-lg'>
        <div className='text-2xl font-semibold text-white mb-2'>Add Post</div>
        <form onSubmit={handleAddPost} encType="multipart/form-data">
          <div>

            <input
              type="file"
              id="coverImage"
              className="hidden"
              accept="image/*"
              onChange={(e) => {
                setCoverImage(e.target.files[0]);
                // Update state to show the preview
                const reader = new FileReader();
                reader.onloadend = () => {
                  setPreview(reader.result);
                };
                if (e.target.files[0]) {
                  reader.readAsDataURL(e.target.files[0]);
                }
              }}
            />

            <label htmlFor="coverImage" className="cursor-pointer">
              {preview ? (
                <div className="w-full h-52 flex items-center justify-center border-2 border-gray-300 rounded-md">
                  <img src={preview} alt="Selected" className="h-full object-cover rounded-md" />
                </div>
              ) : (
                <div className="w-full h-52 flex items-center justify-center border-2 border-dashed bg-[#685CFE] border-gray-300 rounded-md">

                  <div className='text-6xl p-8 text-[#c3befc]'><SlCloudUpload /></div>
                </div>
              )}
            </label><br /><br />


            <label htmlFor="title" className='text-gray-200'>Title</label><br />
            <input
              type="text"
              id="title"
              value={postTitle}
              required
              onChange={(e) => setPostTitle(e.target.value)}
              className='bg-transparent border-b text-gray-50 border-b-gray-600 p-1 w-full outline-none'
            /><br /><br />
            <label htmlFor="content" className='text-gray-200 '>Content</label><br /><br />
            <ReactQuill
              className='text-gray-100'
              theme="snow"
              value={postContent}
              required
              onChange={(content, delta, source, editor) => setPostContent(content)}
            />


            <br /><br />


            <button
              type="submit"
              className={`bg-[#685CFE] hover:bg-[#7a71fe] text-gray-50 p-2 px-4 rounded-md ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={isLoading}
            >
              {isLoading ? 'Submitting...' : 'Submit'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Dashboard