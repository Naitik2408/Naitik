import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { postData } from '../requestData';
import { login } from '../Redux/authSlice';
import { showAlert } from '../Redux/alertSlice';

function Login() {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { isAuthenticated, user } = useSelector((state) => state.auth);


  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await postData(`${import.meta.env.VITE_API_URL}/api/v1/users/login`, { email, password });
      if (response.success) {
        dispatch(login(response.data.user));
        dispatch(showAlert('Login successful'));
      } else {
        dispatch(showAlert('Login failed'));
        console.error('Login failed');
      }
    } catch (error) {
      dispatch(showAlert('Login failed'));
      console.error('Login failed:', error);
    } finally {
      setIsLoading(false)
    }
  };

  useEffect(() => {
    if (isAuthenticated && user?.role === "admin") {
      navigate("/dashboard");
    }
    else if (isAuthenticated && user?.role === "user") {
      navigate("/");
    }
  }, [isAuthenticated, user]);

  return (
    <div className='w-full min-h-full flex flex-col gap-10 justify-center items-center'>
      <div className='flex flex-col gap-8 items-center bg-gray-900 p-3 py-9 rounded-lg shadow-lg shadow-gray-950 border border-gray-800'>
        <div className='text-3xl text-gray-100 underline'>Login</div>
        <form onSubmit={handleSubmit}> {/* Wrap inputs in a form tag */}
          <div className='p-5 backdrop-blur-lg rounded-md w-80 md:w-96'>
            <label htmlFor="email" className='text-gray-400'>Email</label><br />
            <input
              type="text"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)} // Update state on change
              className='border-b border-b-gray-400 bg-transparent p-1 w-full outline-none text-gray-50'
            /><br /><br />
            <label htmlFor="password" className='text-gray-400'>Password</label><br />
            <input
              type="password" // Changed to password to hide input
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)} // Update state on change
              className='border-b border-b-gray-400 bg-transparent p-1 w-full outline-none text-gray-50'
            /><br /><br />
            <div className='text-gray-200 text-sm mb-5 text-center'>Don't have account? <Link to='/signUp' className='text-blue-500 hover:underline cursor-pointer'>Sign Up</Link></div>
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

export default Login;