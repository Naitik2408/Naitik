import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
              // console.log("auth: ", isAuthenticated, " role: ", user)
              // if(isAuthenticated && user?.role=="admin"){
              //   navigate("/dashboard")
              // }else{
              //   navigate("/")
              // }
          } else {
            dispatch(showAlert('Login failed'));
              console.error('Login failed');
          }
      } catch (error) {
        dispatch(showAlert('Login failed'));
          console.error('Login failed:', error);
      }finally{
        setIsLoading(false)
      }
  };

  useEffect(() => {
    if (isAuthenticated && user?.role === "admin") {
        navigate("/dashboard");
    } 
    else if(isAuthenticated && user?.role === "user") {
        navigate("/");
    }
}, [isAuthenticated, user]);

  return (
    <div className='w-full min-h-full flex justify-center items-center'>
      <form onSubmit={handleSubmit}> {/* Wrap inputs in a form tag */}
        <div className='p-5 bg-gray-50 rounded-md w-80 md:w-96'>
          <label htmlFor="email">Email</label><br />
          <input
            type="text"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)} // Update state on change
            className='border rounded-md p-1 w-full outline-gray-400'
          /><br /><br />
          <label htmlFor="password">Password</label><br />
          <input
            type="password" // Changed to password to hide input
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)} // Update state on change
            className='border rounded-md p-1 w-full outline-gray-400'
          /><br /><br />
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
  );
}

export default Login;