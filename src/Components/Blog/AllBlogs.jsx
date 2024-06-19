import React, { useEffect, useState } from 'react'
import { fetchData } from '../../requestData';
import { Link } from 'react-router-dom';
import BlogCards from './BlogCards';
import Loader from '../Loader/Loader';

function AllBlogs() {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);


    useEffect(() => {
        fetchData(`${import.meta.env.VITE_API_URL}/api/v1/posts/getAllEnablePosts`)
            .then(fetchData => {
                setData(fetchData.data)
            })
            .catch((error) => {
                console.error('Error:', error);
            }).finally(()=>{
                setIsLoading(false);
                
            });
    }, [])

    if (isLoading) {
        return (
            <div className='w-full h-[80vh]'>
                <Loader />
            </div>
        ); 
    }



    return (
        <div>
            <div className='text-center pb-20 border-b border-b-gray-700 mb-10'>
                <div className='text-4xl font-bold text-gray-100 mb-10'>Explore Our Blog Archive</div>
                <div className='text-gray-300 px-32 font-thin'>"Welcome to our treasure trove of insights and stories! Dive into a diverse collection of blogs crafted with passion and expertise. Whether you're here to learn something new, find inspiration, or simply enjoy a good read, we have something for everyone. Happy exploring!"</div>
            </div>
            <div className="columns-1 sm:columns-2 lg:columns-3 gap-4">
            {data.map(post => (
                <div key={post._id}>
                    <Link to={`/blog/${post._id}`}>
                        <BlogCards image={post.coverImage} title={post.title} content={post.content} createdAt={post.createdAt} />
                    </Link>
                </div>
            ))}
        </div>
        </div>
    )
}

export default AllBlogs
