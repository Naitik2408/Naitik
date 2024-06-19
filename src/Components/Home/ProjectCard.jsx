import React from 'react'
import { IoLogoGithub } from "react-icons/io5";
import cardImage from '../../assets/cardImage.avif'
import { GoLink } from "react-icons/go";

function ProjectCard({iconImg, title, websiteLink, websiteLinkTitle, githubLink, githubLinkTitle, commit, date }) {
    return (
        <div className="xl:w-80 lg:w-[48%] w-full h-56 border-[1px] border-gray-600 rounded-md overflow-hidden p-2">
            <div className="w-full h-[30%] overflow-hidden rounded-t-md"><img src={cardImage} alt="" /></div>
            <div className="w-full h-[70%] py-3 flex gap-2 flex-col text-sm text-gray-300">
                <div className="flex gap-2 items-center">
                    <div className="w-10"><img src={iconImg} alt="" /></div>
                    <div>
                        <div className="text-gray-200">{title}</div>
                        <div className="text-gray-400 hover:underline hover:text-blue-600 cursor-pointer flex gap-1 items-center ">
                            <a href={websiteLink} target='_blank' className='flex items-center gap-1'>{websiteLinkTitle}
                            </a>
                            <GoLink className='text-xs' />
                        </div>
                    </div>
                </div>
                <div className="flex gap-2 items-center pl-4 cursor-pointer hover:underline">
                    <IoLogoGithub />
                    <div><a href={githubLink} target='_blank'>{githubLinkTitle}</a></div>
                </div>
                <div className="text-gray-400">
                    <div>{commit}</div>
                    <div>{date}</div>
                </div>
            </div>
        </div>
    )
}

export default ProjectCard
