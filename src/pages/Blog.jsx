import React, { useEffect, useState } from 'react'
import BlogCards from '../Components/Blog/BlogCards'
import { fetchData } from '../requestData'
import { Link, Outlet } from 'react-router-dom'

function Blog() {
  // const [data, setData] = useState([]);

  // useEffect(() => {
  //   fetchData('http://localhost:8000/api/v1/posts/getAllEnablePosts')
  //     .then(fetchData => {
  //       setData(fetchData.data)

  //     })
  //     .catch(error => console.error('Error:', error));
  // }, [])




  return (
    <div className='w-full min-h-full'>

        <Outlet/>
    </div>
  )
}

export default Blog
