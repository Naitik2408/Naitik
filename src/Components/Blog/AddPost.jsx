import React from 'react'

function AddPost() {
    return (
        <div className='w-full h-full fixed top-0 left-0 flex justify-center items-center bg-gray-200'>
            <div className='bg-gray-50 rounded-md p-3'>
                <form action="">
                    <label htmlFor="title">Title</label><br />
                    <input type="text" className='w-full outline-none border rounded-md p-1' /><br /><br />
                    <label htmlFor="content">Content</label><br />
                    <input type="text" className='w-full outline-none border rounded-md p-1' /><br /><br />
                    <label htmlFor="coverImage">Cover Image</label><br />
                    <input type="file" className='w-full outline-none border rounded-md p-1' /><br /><br />
                    <input type="submit" value={"submit"} className='bg-blue-300 py-2 px-3 rounded-md cursor-pointer hover:bg-blue-400' />

                </form>
            </div>
        </div>
    )
}

export default AddPost
