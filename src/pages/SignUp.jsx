import React, { useState } from 'react';
import { postData } from '../requestData'; 
import { useNavigate } from 'react-router-dom'; 
import { useDispatch } from 'react-redux'; 
import { login } from '../Redux/authSlice'; 
import { showAlert } from '../Redux/alertSlice';

function SignUp() {
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate(); 
  const dispatch = useDispatch(); 

  const handleSubmit = async (e) => {
    e.preventDefault();


    const signUpData = {
      fullName,
      username,
      email,
      password,
    };

    try {
      await postData(`${import.meta.env.VITE_API_URL}/api/v1/users/register`, signUpData);
      console.log('Sign-up successful');

  
      const { email, password } = signUpData; 


      const loginResponse = await postData(`${import.meta.env.VITE_API_URL}/api/v1/users/login`, { email, password });
      
      if (loginResponse.success) {
        dispatch(login(loginResponse.data.user));
        dispatch(showAlert('Login successful after sign-up'));
        navigate("/blog"); 
      } else {
        dispatch(showAlert('Login failed after sign-up'));
        console.error('Login failed');
      }

    } catch (error) {
      dispatch(showAlert('Sign-up failed'));
      console.error('Sign-up failed:', error);
    }
  };

  return (
    <div className='w-full min-h-full flex justify-center items-center'>
      <form onSubmit={handleSubmit}>
        <div className='p-5 bg-gray-50 rounded-md w-80 md:w-96'>
          <label htmlFor="fullName">Full Name</label><br />
          <input
            type="text"
            id="fullName"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className='border rounded-md p-1 w-full outline-gray-400'
          /><br /><br />
          <label htmlFor="username">Username</label><br />
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className='border rounded-md p-1 w-full outline-gray-400'
          /><br /><br />
          <label htmlFor="email">Email</label><br />
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className='border rounded-md p-1 w-full outline-gray-400'
          /><br /><br />
          <label htmlFor="password">Password</label><br />
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className='border rounded-md p-1 w-full outline-gray-400'
          /><br /><br />
          <input
            type="submit"
            value={"Submit"}
            className='bg-blue-400 p-2 px-4 rounded-md'
          />
        </div>
      </form>
    </div>
  );
}

export default SignUp;