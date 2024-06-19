import React from 'react'

function BlogNavbar() {
  return (
    <div className='w-full flex justify-between items-center p-3'>
        <div>
            <div className='font-bold text-gray-200 font-serif italic text-2xl'>Blog Spot.</div>
        </div>
        <div className='flex gap-3 text-white'>
          <div className='cursor-pointer'>Add post</div>
          <div>Dashboard</div>
        </div>
      </div>
  )
}

export default BlogNavbar
