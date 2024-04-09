import { useState } from 'react'
import { SlSocialLinkedin, SlSocialGithub, SlSocialInstagram, SlNotebook, SlMenu } from "react-icons/sl";
import { RxCross1 } from "react-icons/rx";
import { IoLogoGithub } from "react-icons/io5";
import img1 from './assets/ProfileImage.jpeg'
import icon from '/icon2.png'
import shortUrlIcon from './assets/ShortUrlIcon.png'
import noteAppIcon from './assets/NoteAppIcon.png'
import shorUrlApi from './assets/ShortUrlApi.png'
import achivement1 from './assets/achivement1.png'
import bhailang from './assets/BhailangIcon.png'
import githubProfileImage from './assets/githubProfileImage.jpg'
import githubVideo from './assets/githubVideo.mp4'
import profileVideo1 from './assets/ProfileVideo1.mp4'
import profileVideoImage from './assets/ProfileVideoImage.jpg'
import whatsapp from './assets/whatsapp.png'
import gmail from './assets/gmail.png'
import ProjectCard from './Components/ProjectCard';
import Footer from './Components/Footer';



function App() {
  const [bar, setBar] = useState(false);

  const handleBar = () => {
    setBar(!bar);
  }




  return (
    <div className="w-screen h-screen relative overflow-hidden">


      {/* This is navbar................  */}
      <div className="w-full md:h-[8%] h-[7%] flex lg:px-10 items-center justify-between shadow-sm border-b border-b-gray-800 bg-gray-900 px-3">
        <div className="flex gap-3 items-center">
          <img src={icon} alt="" className='md:w-9 w-7' />
          <div className="w-3 h-3 bg-green-600 rounded-full"></div>
          <div className="w-3 h-3 bg-green-600 rounded-full"></div>
        </div>
        <div className='text-gray-300 md:hidden' onClick={handleBar}>{bar ? <RxCross1 /> : <SlMenu />}</div>
      </div>


      {/* This is right and left section of the page.............. */}
      <div className="w-full md:h-[92%] h-[93%] flex justify-between bg-gray-800 p-3">



        {/* This is left section of the page................  */}
        <div className="lg:w-[18%] md:w-[28%] h-full rounded-md md:flex flex-col hidden">
          <div className='flex flex-col gap-4 w-full h-[30%]'>
          <a href="https://www.linkedin.com/in/naitik2/" target='_blank'>
            <div className="rounded-md p-2 px-4 cursor-pointer text-gray-400 font-normal text-sm border-[1px] border-gray-600 flex gap-2 group"><div className=" transition-transform duration-300 group-hover:translate-x-2 flex gap-2 items-center"><SlSocialLinkedin className='text-blue-500' /><div className="text-gray-300">Linkedin</div></div></div></a>
          <a href="https://github.com/Naitik2408" target='_blank'>
            <div className="rounded-md p-2 px-4 cursor-pointer text-gray-400 font-normal text-sm border-[1px] border-gray-600 flex gap-2 group"><div className=" transition-transform duration-300 group-hover:translate-x-2 flex gap-2 items-center"><SlSocialGithub className='text-purple-500' /><div className="text-gray-300">Github</div></div></div></a>
          <a href="https://www.instagram.com/naitik7324/" target='_blank'>
            <div className="rounded-md p-2 px-4 cursor-pointer text-gray-400 font-normal text-sm border-[1px] border-gray-600 flex gap-2 group"><div className=" transition-transform duration-300 group-hover:translate-x-2 flex gap-2 items-center"><SlSocialInstagram className='text-orange-500' /><div className="text-gray-300">Instagram</div></div></div></a>
          </div>
          <div className="w-full h-96 bg-black rounded-md p-3 relative overflow-hidden h-[70%]">
            <div className='text-white flex items-center gap-3 text-xl'>
              <IoLogoGithub />
            </div>
            <div className='flex justify-center'>
              <div className='w-28 rounded-full overflow-hidden'><img src={githubProfileImage} alt="" /></div>
            </div>
            <div className='text-gray-200 relative mt-2 z-10 text-center'>
              <div>Naitik Kumar</div>
              <div className='text-gray-500 text-xs'>Naitik2408 . he/him</div>
            </div>
            <div className='text-sm relative z-10 mt-4 flex flex-col gap-1'>
              <div className='w-full py-1 px-2 flex justify-between gap-2 border-b-[1px] border-b-gray-600 pb-3'>
                <div className='text-gray-400 flex gap-2 items-center'><SlNotebook />Repositories</div>
                <div className='text-xs text-gray-400 bg-gray-800 w-fit p-1 rounded-md'>14</div>
              </div>
              <div className='w-full py-1 px-2 flex flex-col gap-2'>
                <div className='text-gray-200'>Achievements</div>
                <div>
                  <div className='w-12'><img src={achivement1} alt="" /></div>
                </div>
              </div>

            </div>




            <div className='absolute bottom-[-30px] w-full left-0 z-0'><video src={githubVideo} autoPlay muted loop></video></div>
          </div>
        </div>


        {/* This is right section of the page .................  */}
        <div className="lg:w-[81%] md:w-[71%] h-full rounded-md overflow-auto w-full">

          {/* This div contain profile image with green background color and text over it.................  */}
          <div className="w-full min:h-60 flex items-center justify-center px-20 py-3 flex-col md:flex-row gap-2 md:justify-between relative">
            <div className="w-52 h-52 rounded-full object-cover z-10 p-1 md:border-2 border-4 border-white">
              <div className='w-full h-full overflow-hidden rounded-full'>
                <img src={img1} alt="Profile image" className='w-full h-full object-cover' />
              </div>
            </div>
            <div className='text-center w-full md:w-[60%] flex flex-col justify-between z-10'>
              <div className='text-3xl font-semibold text-gray-800 md:text-5xl '>Naitik Kumar</div>
              <div className='text-gray-700 text-lg underline'>Web Developer</div>
              <div className='flex flex-col lg:flex-row gap-4 md:gap-9 mt-5 md:mt-16 items-center justify-center'>
                <div className='flex gap-1'><img src={whatsapp} alt="" className='w-6' /><div className='bg-gray-300/50 px-2 rounded-md cursor-pointer hover:bg-gray-300 text-gray-800 whatsapp'>9060557296</div></div>
                <div className='flex items-center gap-2 '><img src={gmail} alt="" className='w-6' /><div className='bg-gray-300/50 px-2 rounded-md hover:bg-gray-300 cursor-pointer text-gray-800 gmail'>naitikkumarofficial2408@gmail.com</div></div>
              </div>
            </div>
            <div className='w-full h-full overflow-hidden absolute top-0 bottom-0 left-0 -z-0'>
              <video src={profileVideo1} autoPlay muted loop className='w-full h-full object-cover' ></video>
              <img src={profileVideoImage} alt="" className='w-full h-full object-cover' />
            </div>
          </div>

          {/* This div contain Title and all projects related information...............  */}
          <div className="mt-10 flex flex-col gap-3">


            {/* This div contains Title of the div...............  */}
            <div className="text-xl font-semibold text-gray-300">Projects</div>


            {/* This div contains all projects  related to a user. Each project will be displayed in card format with title, description, start date.............  */}
            <div className="flex flex-wrap gap-7">

              <ProjectCard iconImg={shortUrlIcon} title={"Url-Shortner"} websiteLink={"https://url-shortner-seven-swart.vercel.app/"} websiteLinkTitle={"url-shortner-seven-swart.vercel"} githubLink={"https://github.com/Naitik2408/Url-Shortner"} githubLinkTitle={"Naitik2408/Url-Shortner"} commit={"updated readme file"} date={"8h ago on"} />


              <ProjectCard iconImg={noteAppIcon} title={"Note-app"} websiteLink={"https://note-app-black-eight.vercel.app/"} websiteLinkTitle={"note-app-black-eight.vercel.app"} githubLink={"https://github.com/Naitik2408/NoteApp"} githubLinkTitle={"Naitik2408/NoteApp"} commit={"update the redme file according to updated version."} date={"8h ago on"} />


              <ProjectCard iconImg={shorUrlApi} title={"Url-Shortner-api"} websiteLink={"https://github.com/Naitik2408/Url-Shortner-api"} websiteLinkTitle={"url-shortner-api-tau.verel.app"} githubLink={"https://github.com/Naitik2408/Url-Shortner-api"} githubLinkTitle={"Naitik2408/Url-Shortner-api"} commit={"cors origin chaged 3"} date={"12h ago on"} />


              <ProjectCard iconImg={bhailang} title={"Bhailang"} websiteLink={"https://github.com/Naitik2408/Bhailang"} websiteLinkTitle={"url-shortner-seven-swart.vercel"} githubLink={"https://github.com/Naitik2408/Bhailang"} githubLinkTitle={"Naitik2408/Url-Shortner-api"} commit={"updated readme file"} date={"8h ago on"} />

            </div>
          </div>

          {/* This is github Repository.....................  */}
          <div className='my-10 p-3 bg-black rounded-md'>
            <div className='text-white text-xl'><IoLogoGithub /></div>
          </div>


          {/* This div contains my skill ................  */}
          <div className='flex flex-col gap-3'>
            <div className='text-xl font-semibold text-gray-300'>Skills</div>


            <div className='flex gap-4 flex-wrap'>

              {/* This is frontend  Skill set.........  */}
              <div className='md:w-40 border-[1px] border-gray-600 rounded-md p-3 bg-gray-900 w-full'>
                <div className='f font-semibold text-gray-300 mb-5'>Frontend</div>
                <div className='flex flex-wrap gap-2'>
                  <div className='text-gray-400 text-sm p-1 bg-gray-800 rounded-md border border-orange-600'>Html</div>
                  <div className='text-gray-400 text-sm p-1 bg-gray-800 rounded-md border border-blue-600'>Css</div>
                  <div className='text-gray-400 text-sm p-1 bg-gray-800 rounded-md border border-yellow-600'>Javascript</div>
                  <div className='text-gray-400 text-sm p-1 bg-gray-800 rounded-md border border-gray-600'>React</div>
                  <div className='text-gray-400 text-sm p-1 bg-gray-800 rounded-md border border-gray-600'>Tailwind Css</div>
                </div>
              </div>

              {/* This is backend skill set..............  */}
              <div className='md:w-40 border-[1px] border-gray-600 rounded-md p-3 bg-gray-900 w-full'>
                <div className='f font-semibold text-gray-300 mb-5'>Backend</div>
                <div className='flex flex-wrap gap-2'>
                  <div className='text-gray-400 text-sm p-1 bg-gray-800 rounded-md border border-green-600'>Node Js</div>
                  <div className='text-gray-400 text-sm p-1 bg-gray-800 rounded-md border border-gray-600'>Mongodb</div>
                </div>
              </div>

              {/* This is version control set .......................  */}
              <div className='md:w-40 border-[1px] border-gray-600 rounded-md p-3 bg-gray-900 w-full'>
                <div className='f font-semibold text-gray-300 mb-5'>Version Control</div>
                <div className='flex flex-wrap gap-2'>
                  <div className='text-gray-400 text-sm p-1 bg-gray-800 rounded-md border border-orange-600'>Git</div>
                  <div className='text-gray-400 text-sm p-1 bg-gray-800 rounded-md border border-gray-600'>Github</div>
                </div>
              </div>

            </div>


          </div>

          {/* This is footer  part of the page.................  */}
          <Footer />

        </div>
      </div>



      {/* This is for mobile left side ...............  */}
      <div className={`absolute bottom-0 w-full bg-gray-900 px-5 rounded-t-3xl transition-transform duration-500 z-50 ${bar ? "h-auto pt-8" : "h-0 pt-0"}`}>
        <div className="lg:w-[18%] md:w-[28%] h-full rounded-md flex flex-col gap-4 md:hidden">
          <a href="https://www.linkedin.com/in/naitik2/" target='_blank'>
            <div className="rounded-md p-3 px-4 cursor-pointer text-gray-400 font-normal text-sm border-[1px] border-gray-600 flex gap-2 group"><div className=" transition-transform duration-300 group-hover:translate-x-2 flex gap-2 items-center"><SlSocialLinkedin className='text-blue-500' /><div className="text-gray-300">Linkedin</div></div></div></a>
          <a href="https://github.com/Naitik2408" target='_blank'>
            <div className="rounded-md p-3 px-4 cursor-pointer text-gray-400 font-normal text-sm border-[1px] border-gray-600 flex gap-2 group"><div className=" transition-transform duration-300 group-hover:translate-x-2 flex gap-2 items-center"><SlSocialGithub className=' text-purple-500' /><div className="text-gray-300">Github</div></div></div></a>
          <a href="https://www.instagram.com/naitik7324/" target='_blank'>
            <div className="rounded-md p-3 px-4 cursor-pointer text-gray-400 font-normal text-sm border-[1px] border-gray-600 flex gap-2 group"><div className=" transition-transform duration-300 group-hover:translate-x-2 flex gap-2 items-center"><SlSocialInstagram className='text-orange-500' /><div className="text-gray-300">Instagram</div></div></div></a>
          <div className="w-full h-96 bg-black rounded-md p-3 relative overflow-hidden">
            <div className='text-white flex items-center gap-3 text-xl'>
              <IoLogoGithub />
            </div>
            <div className='flex justify-center'>
              <div className='w-28 rounded-full overflow-hidden'><img src={githubProfileImage} alt="" /></div>
            </div>
            <div className='text-gray-200 relative mt-2 z-10 text-center'>
              <div>Naitik Kumar</div>
              <div className='text-gray-500 text-xs'>Naitik2408 . he/him</div>
            </div>
            <div className='text-sm relative z-10 mt-4 flex flex-col gap-1'>
              <div className='w-full py-1 px-2 flex justify-between gap-2 border-b-[1px] border-b-gray-600 pb-3'>
                <div className='text-gray-400 flex gap-2 items-center'><SlNotebook />Repositories</div>
                <div className='text-xs text-gray-400 bg-gray-800 w-fit p-1 rounded-md'>14</div>
              </div>
              <div className='w-full py-1 px-2 flex flex-col gap-2'>
                <div className='text-gray-200'>Achievements</div>
                <div>
                  <div className='w-12'><img src={achivement1} alt="" /></div>
                </div>
              </div>

            </div>




            <div className='absolute bottom-[-30px] w-full left-0 z-0'><video src={githubVideo} autoPlay muted loop></video></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
