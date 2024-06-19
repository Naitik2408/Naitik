import React, { useState } from 'react';
import { SlSocialLinkedin, SlSocialGithub, SlSocialInstagram, SlNotebook, SlMenu } from "react-icons/sl";
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { showAlert } from './Redux/alertSlice';

import { useDispatch } from 'react-redux';
import { logout } from './Redux/authSlice'; // Adjust the import path as necessary
import { postData } from './requestData'; // Adjust the import path as necessary


// React icons 
import { RxCross1 } from "react-icons/rx";
import { IoLogoGithub } from "react-icons/io5";
import { ImCommand } from "react-icons/im";
// import { LuLogIn } from "react-icons/lu";
import { LuLayoutDashboard, LuAirplay, LuLogIn } from "react-icons/lu";
import { AiOutlineLogout } from "react-icons/ai";
import { TbLogin } from "react-icons/tb";
import icon from '/icon2.png'


// Images 
import achivement1 from './assets/achivement1.png'
import githubProfileImage from './assets/githubProfileImage.jpg'
import githubVideo from './assets/githubVideo.mp4'


// React components 
import { Link, Outlet } from 'react-router-dom';
import Footer from './Components/Home/Footer';



function Home() {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const location = useLocation();
  const [bar, setBar] = useState(false);
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  const handleBar = () => {
    setBar(!bar);
  }



  const handleLogout = async () => {
    try {
      await postData(`${import.meta.env.VITE_API_URL}/api/v1/users/logout`, { action: 'logout' });
      dispatch(logout()); 
      dispatch(showAlert('You are logged out successfully'));
      console.log('Logout successful');
      navigate("/")
    } catch (error) {
      dispatch(showAlert('Logout failed'));
      console.error('Logout failed:', error);
    }
  };




  return (
    <div className="w-screen h-screen relative overflow-hidden">


      {/* This is navbar................  */}
      <div className="w-full md:h-[8%] h-[7%] flex lg:px-10 items-center justify-between shadow-sm bg-[#242527] px-3">
        <div className="flex gap-3 items-center">
          <img src={icon} alt="" className='md:w-9 w-7' />
          <div className="w-3 h-3 bg-[#685CFE] rounded-full"></div>
          <div className="w-3 h-3 bg-[#685CFE] rounded-full"></div>
        </div>
        <div className='text-gray-300 md:hidden' onClick={handleBar}>{bar ? <RxCross1 /> : <SlMenu />}</div>
      </div>


      {/* This is right and left section of the page.............. */}
      <div className="w-full md:h-[92%] h-[93%] flex justify-between bg-[#242527] p-3">



        {/* This is left section of the page................  */}
        <div className="lg:w-[18%] md:w-[28%] h-full gap-3 rounded-md md:flex flex-col hidden">
          <div className='flex flex-col gap-1 w-full h-[38%]'>
            {/* <a href="https://www.linkedin.com/in/naitik2/" target='_blank'>
              <div className="rounded-md p-2 px-4 cursor-pointer text-gray-400 font-normal text-sm border-[1px] border-gray-600 flex gap-2 group"><div className=" transition-transform duration-300 group-hover:translate-x-2 flex gap-2 items-center"><SlSocialLinkedin className='text-blue-500' /><div className="text-gray-300">Linkedin</div></div></div></a> */}
            {/* <a href="https://github.com/Naitik2408" target='_blank'>
              <div className="rounded-md p-2 px-4 cursor-pointer text-gray-400 font-normal text-sm border-[1px] border-gray-600 flex gap-2 group"><div className=" transition-transform duration-300 group-hover:translate-x-2 flex gap-2 items-center"><SlSocialGithub className='text-purple-500' /><div className="text-gray-300">Github</div></div></div></a> */}
            {/* <a href="https://www.instagram.com/naitik7324/" target='_blank'>
              <div className="rounded-md p-2 px-4 cursor-pointer text-gray-400 font-normal text-sm border-[1px] border-gray-600 flex gap-2 group"><div className=" transition-transform duration-300 group-hover:translate-x-2 flex gap-2 items-center"><SlSocialInstagram className='text-orange-500' /><div className="text-gray-300">Instagrammm</div></div></div></a> */}
            <Link to="/">
              <div className={`rounded-md p-2 px-4 cursor-pointer text-gray-50 font-normal text-sm flex gap-2 group ${location.pathname === "/"? "bg-[#685CFE]" : "hover:bg-[#3A3B3D]"}`}><div className=" transition-transform duration-300 group-hover:translate-x-2 flex gap-2 items-center"><ImCommand className='text-blue-50' /><div className="text-gray-50">Portfolio</div></div></div></Link>
            <Link to="/blog">
              <div className={`rounded-md p-2 px-4 cursor-pointer text-gray-50 font-normal text-sm flex gap-2 group ${(location.pathname.startsWith("/blog"))? "bg-[#685CFE]" : "hover:bg-[#3A3B3D]"}`}><div className=" transition-transform duration-300 group-hover:translate-x-2 flex gap-2 items-center"><LuAirplay className='text-gray-50' /><div className="text-gray-50">Blog</div></div></div></Link>
            {(isAuthenticated && user.role=='admin' ) && (
              <>
                <Link to="/dashboard">
                  <div className={`rounded-md p-2 px-4 cursor-pointer text-gray-50 font-normal text-sm flex gap-2 group ${location.pathname === "/dashboard"? "bg-[#685CFE]" : "hover:bg-[#3A3B3D]"}`}><div className=" transition-transform duration-300 group-hover:translate-x-2 flex gap-2 items-center"><LuLayoutDashboard className='text-blue-50' /><div className="text-gray-50">Dashboard</div></div></div></Link>
              </>
            )}
            {!isAuthenticated && (
              <>
                <Link to="/login">
                  <div className={`rounded-md p-2 px-4 cursor-pointer text-gray-50 font-normal text-sm flex gap-2 group ${location.pathname === "/login"? "bg-[#685CFE]" : "hover:bg-[#3A3B3D]"}`}><div className=" transition-transform duration-300 group-hover:translate-x-2 flex gap-2 items-center"><LuLogIn className='text-blue-50' /><div className="text-gray-50">Login</div></div></div></Link>
                <Link to="/signUp">
                  <div className={`rounded-md p-2 px-4 cursor-pointer text-gray-50 font-normal text-sm flex gap-2 group ${location.pathname === "/signUp"? "bg-[#685CFE]" : "hover:bg-[#3A3B3D]"}`}><div className=" transition-transform duration-300 group-hover:translate-x-2 flex gap-2 items-center"><TbLogin className='text-blue-50' /><div className="text-gray-50">Sign Up</div></div></div></Link>
              </>
            )}
            {isAuthenticated && (
              <>
                <div onClick={handleLogout} className="rounded-md p-2 px-4 cursor-pointer hover:bg-red-500 text-gray-400 font-normal text-sm  border-gray-600 flex gap-2 group"><div className=" transition-transform duration-300 group-hover:translate-x-2 flex gap-2 items-center"><AiOutlineLogout className='text-blue-50' /><div className="text-blue-50">Logout</div></div></div>
              </>
            )}

          </div>
          <div className="w-full bg-black rounded-md p-2 relative overflow-hidden h-[62%]">
            <div className='text-white flex items-center gap-2 text-xl'>
              <IoLogoGithub />
            </div>
            <div className='flex justify-center'>
              <div className='w-28 rounded-full overflow-hidden'><img src={githubProfileImage} alt="" /></div>
            </div>
            <div className='text-gray-200 relative mt-2 z-10 text-center'>
              <div>Naitik Kumar</div>
              <div className='text-gray-500 text-xs'>Naitik2408 . he/him</div>
            </div>
            <div className='text-sm relative z-10 mt-2 flex flex-col'>
              <div className='w-full py-1 px-2 flex justify-between gap-1 border-b-[1px] border-b-gray-600'>
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
          <Outlet />
          <Footer />
        </div>



        {/* <Portfolio/> */}



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

export default Home
