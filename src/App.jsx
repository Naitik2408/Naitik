import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { fetchData } from './requestData'; 
import { login } from './Redux/authSlice'; 

import { hideAlert } from './Redux/alertSlice'; // Import the action to hide the alert
import AlertPopup from './Components/Popup/AlertPopup';


import Home from './Home'
import Blog from './pages/Blog'
import Dashboard from './pages/Dashboard';
import Portfolio from './pages/Portfolio';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import AllBlogs from './Components/Blog/AllBlogs';
import SingleBlog from './Components/Blog/SingleBlog';


function App() {

  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const { isVisible, message } = useSelector((state) => state.alert);

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        dispatch(hideAlert());
      }, 4000);
      return () => clearTimeout(timer); // Cleanup on component unmount or when isVisible changes
    }
  }, [isVisible, dispatch]);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const response = await fetchData(`${import.meta.env.VITE_API_URL}/api/v1/users/current-user`); // Adjust the URL to your backend's endpoint
        if (response && response.data) { // Assuming the response contains user data
          dispatch(login(response.data)); // Use login or setCurrentUser action as needed
        } else {
          console.error('Failed to fetch current user');
          // Optionally, dispatch logout or another action if fetching fails
        }
      } catch (error) {
        console.error('Error fetching current user:', error);
        // Handle errors, such as dispatching logout if the fetch fails
      }
    };

    fetchCurrentUser();
  }, [dispatch]);





  return (
    <>
    <AlertPopup message={message} isVisible={isVisible} />
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route path='/' element={<Portfolio />} />
          <Route path='/blog' element={<Blog />}>
            <Route path='/blog' element={<AllBlogs />} />
            <Route path='/blog:id' element={<SingleBlog />} />
          </Route>
          {
            (isAuthenticated && user.role == "admin") &&
            <Route path='/dashboard' element={<Dashboard />} />
          }
          {/* <Route path='/blog' /> */}
          <Route path='/login' element={<Login />} />
          <Route path='/signUp' element={<SignUp />} />
        </Route>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
