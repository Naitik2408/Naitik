import React, { useState } from 'react';
import { postData } from '../requestData';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../Redux/authSlice';
import { showAlert } from '../Redux/alertSlice';
import { Link } from 'react-router-dom';

function SignUp() {
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);


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
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='w-full min-h-full flex justify-center items-center'>
      <div className='flex flex-col gap-8 items-center bg-gray-900 p-3 py-9 rounded-lg shadow-lg shadow-gray-950 border border-gray-800'>
        <div className='text-3xl text-gray-100 underline'>Sign Up</div>
        <form onSubmit={handleSubmit}>
          <div className='p-5 w-80 md:w-96'>
            <label htmlFor="fullName" className='text-gray-400'>Full Name</label><br />
            <input
              type="text"
              id="fullName"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className='border-b border-b-gray-400 bg-transparent p-1 w-full outline-none text-gray-50'
            /><br /><br />
            <label htmlFor="username" className='text-gray-400'>Username</label><br />
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className='border-b border-b-gray-400 bg-transparent p-1 w-full outline-none text-gray-50'
            /><br /><br />
            <label htmlFor="email" className='text-gray-400'>Email</label><br />
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className='border-b border-b-gray-400 bg-transparent p-1 w-full outline-none text-gray-50'
            /><br /><br />
            <label htmlFor="password" className='text-gray-400'>Password</label><br />
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className='border-b border-b-gray-400 bg-transparent p-1 w-full outline-none text-gray-50'
            /><br /><br />
            {/* <input
              type="submit"
              value={"Submit"}
              className='bg-blue-400 p-2 px-4 rounded-md'
            /> */}

            <div className='text-gray-200 text-sm mb-5 text-center'>Already have an account? <Link to='/login' className='text-blue-500 hover:underline cursor-pointer'>Login</Link></div>

            <button
              type="submit"
              value={"submit"}
              className={`bg-[#685CFE] hover:bg-[#7a71fe] text-gray-50 p-2 px-4 rounded-md ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={isLoading}
            >
              {isLoading ? 'Submitting...' : 'Submit'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignUp;