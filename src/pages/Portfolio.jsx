


// React icons 
import { IoLogoGithub } from "react-icons/io5";


// Images 
import img1 from '../assets/ProfileImage.jpeg'
import shortUrlIcon from '../assets/ShortUrlIcon.png'
import noteAppIcon from '../assets/NoteAppIcon.png'
import shorUrlApi from '../assets/ShortUrlApi.png'
import bhailang from '../assets/BhailangIcon.png'
import profileVideo1 from '../assets/ProfileVideo1.mp4'
import profileVideoImage from '../assets/ProfileVideoImage.jpg'
import leetcode from '../assets/leetcode.png'
import hackerRank from '../assets/hackerRank.png'
import java from '../assets/java.png'
import whatsapp from '../assets/whatsapp.png'
import gmail from '../assets/gmail.png'


// React components 
import ProjectCard from '../Components/Home/ProjectCard';

function Portfolio() {
  return (
    <div className="w-full">

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

              <ProjectCard iconImg={shortUrlIcon} title={"Url-Shortner"} websiteLink={"https://github.com/Naitik2408/Url-Shortner"} websiteLinkTitle={"url-shortner-seven-swart.vercel"} githubLink={"https://github.com/Naitik2408/Url-Shortner"} githubLinkTitle={"Naitik2408/Url-Shortner"} commit={"updated readme file"} date={"8h ago on"} />


              <ProjectCard iconImg={noteAppIcon} title={"Note-app"} websiteLink={"https://note-app-black-eight.vercel.app/"} websiteLinkTitle={"note-app-black-eight.vercel.app"} githubLink={"https://github.com/Naitik2408/NoteApp"} githubLinkTitle={"Naitik2408/NoteApp"} commit={"update the redme file according to updated version."} date={"8h ago on"} />


              <ProjectCard iconImg={shorUrlApi} title={"Url-Shortner-api"} websiteLink={"https://github.com/Naitik2408/Url-Shortner-api"} websiteLinkTitle={"url-shortner-api-tau.verel.app"} githubLink={"https://github.com/Naitik2408/Url-Shortner-api"} githubLinkTitle={"Naitik2408/Url-Shortner-api"} commit={"cors origin chaged 3"} date={"12h ago on"} />


              <ProjectCard iconImg={bhailang} title={"Bhailang"} websiteLink={"https://github.com/Naitik2408/Bhailang"} websiteLinkTitle={"url-shortner-seven-swart.vercel"} githubLink={"https://github.com/Naitik2408/Bhailang"} githubLinkTitle={"Naitik2408/Url-Shortner-api"} commit={"updated readme file"} date={"8h ago on"} />

            </div>
          </div>

          {/* This is github Repository.....................  */}
          <div className='my-10 p-3 bg-black rounded-md overflow-x-auto'>
            <div className='text-white text-xl'><IoLogoGithub /></div>
            <div className='w-fit h-48 mt-9 flex gap-3'>
              <div className='w-80 h-full p-2 border border-gray-900 rounded-lg bg-gray-950 px-4'>
                <div className='flex items-start gap-2 h-[20%]'>
                  <img src={leetcode} alt="" className='w-6' />
                  <div className='text-gray-300'>Leetcode</div>
                </div>
                <div className='w-full h-[80%] flex justify-between items-center'>
                  <div className='w-[45%] h-full flex items-center justify-center'>
                    <div className=' w-32 h-32 rounded-full border-2 border-gray-400 flex items-center justify-center'>
                      <div className='flex flex-col items-center text-gray-500'>
                        <div className='text-sm'>All</div>
                        <div className='text-4xl text-gray-300'>12</div>
                        <div className='w-full h-[0.6px] bg-gray-500'></div>
                        <div className='text-sm'>3119</div>
                      </div>
                    </div>
                  </div>
                  <div className='w-[55%] h-full flex justify-end items-center'>
                    <div className='text-gray-500 w-fit h-fit '>
                      <div className='flex gap-4 justify-between'>
                        <div className='text-[#00B893]'>Easy</div>
                        <div className='text-gray-300'>8 <span className='text-sm text-gray-500'>/787</span></div>
                      </div>
                      <div className='flex gap-4 justify-between'>
                        <div className=' text-yellow-600'>Medium</div>
                        <div className='text-gray-300'>4 <span className='text-sm text-gray-500'>/1637</span></div>
                      </div>
                      <div className='flex gap-4 justify-between'>
                        <div className='text-red-500'>Hard</div>
                        <div className='text-gray-300'>0 <span className='text-sm text-gray-500'>/695</span></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className='w-80 h-full p-2 border border-gray-900 rounded-lg bg-gray-950 px-4'>
                <div className='flex items-start gap-2 h-[20%]'>
                  <img src={hackerRank} alt="" className='w-6' />
                  <div className='text-gray-300 flex items-center gap-[2px]'>HackerRank <div className='w-2 h-4 bg-green-600'></div></div>
                </div>
                <div className='flex justify-between h-[80%]'>
                  <div className='w-[65%] h-full'>
                    <div>
                      <div className='text-3xl text-gray-300'>Java</div>
                      <div className='w-full mt-4 h-2 bg-gray-200 rounded-md overflow-hidden'>
                        <div className='w-[30%] h-full bg-green-500'></div>
                      </div>
                      <div className='mt-3'>
                        <div className='text-gray-300'>20% <span className='text-gray-400 text-sm'>(20 points to next star)</span></div>
                      </div>
                    </div>
                  </div>
                  <div className='w-[30%] h-full flex justify-center items-center'>
                    <div className='w-fit h-fit bg-red-400 p-4 rounded-lg'><img src={java} alt="" className='w-10' /></div>
                  </div>
                </div>

              </div>
            </div>
            <div className='w-full flex justify-center items-center mt-5 mb-2'>
              <div className='w-1 h-1 bg-green-500 rounded-full hover:bg-green-300 cursor-pointer'></div>
            </div>
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

        </div>
  )
}

export default Portfolio
