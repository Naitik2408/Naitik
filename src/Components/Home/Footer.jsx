import React from 'react'
import { SlSocialLinkedin, SlSocialGithub, SlSocialInstagram } from "react-icons/sl";




function Footer() {
    return (
        <div className='w-full mt-7 mb-3 text-gray-400'>
            <div className='b border-t-[1px] border-t-gray-600 py-2 flex justify-center items-center gap-3'>
                <div className='text-sm'>Created By - Naitik kumar</div>
                <div className=' border-r-[1px] border-r-gray-400 h-7'></div>
                <div className='flex items-center gap-3'>
                    <a href="https://www.linkedin.com/in/naitik2/" target='_blank'><SlSocialLinkedin className='cursor-pointer text-blue-500' /></a>
                    <a href="https://github.com/Naitik2408" target='_blank'><SlSocialGithub className='cursor-pointer text-purple-500' /></a>
                    <a href="https://www.instagram.com/naitik7324/" target='_blank'><SlSocialInstagram className='cursor-pointer text-orange-500' /></a>
                </div>
            </div>
        </div>
    )
}

export default Footer
