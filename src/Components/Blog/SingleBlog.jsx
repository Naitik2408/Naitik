import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom';
import { fetchData } from '../../requestData'
import DOMPurify from 'dompurify';
import RelatedBlogCards from './RelatedBlogCards';

function SingleBlog() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null)
  const [relatedBlog, setRelatedBlog] = useState(null)

  useEffect(() => {
    fetchData(`${import.meta.env.VITE_API_URL}/api/v1/posts/getPostById/${id}`)
      .then(response => {
        setBlog(response.data.post);
        setRelatedBlog(response.data.topPosts);
      })
      .catch(error => console.error('Error:', error));
  }, [id]);

  if (!blog) {
    return <div>Loading...</div>;
  }


  return (
    <div className='flex flex-col md:px-20 py-5'>
      <div className='text-center flex flex-col gap-4 px-5 md:px-32'>
        <div className='text-3xl font-semibold text-gray-50'>{blog.title}</div>
        <div className='text-gray-200 font-thin'>" Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus beatae cupiditate iste accusamus nobis sunt labore quibusdam tempore totam! Nesciunt dolorum in aut laboriosam quidem! Fugiat voluptatum ipsam rem voluptatem! "</div>
      </div>
      <div className='my-10'>
        <div className=' rounded-md overflow-hidden max-h-[70vh]'><img src={blog.coverImage} alt="blog image" /></div>
      </div>
      <div>
        {/* <div className='text-xl font-semibold text-gray-50'>{blog.title}</div> */}
        {/* <div className='text-gray-200'>{blog.content}</div> */}
        <div className='text-gray-200' dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(blog.content) }}></div>
      </div>
      <div className='mt-32'>
        <div className='text-2xl font-semibold text-gray-100 mb-5'>Related Blogs</div>
        <div className='flex overflow-x-auto'>
          {relatedBlog.map(post =>(
            <div key={post._id}>
              <Link to={`/blog/${post._id}`}>
              <RelatedBlogCards title={post.title} image={post.coverImage}/>
              </Link>
            </div>
          ) )}
        </div>
      </div>
    </div>
  )
}

export default SingleBlog
