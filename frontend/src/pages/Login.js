import React, { useEffect, useState, useRef } from 'react';
import { axiosClient } from '../utils/axiosClient';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import LoadingBar from 'react-top-loading-bar';

document.title = 'Login';

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const ref = useRef(null);

  useEffect(() => {
    if (localStorage.getItem("User")) {
      navigate("/");
    }
  }, [navigate]);

  const submitForm = async (e) => {
    e.preventDefault();
    try {
      ref.current.staticStart();
      const response = await axiosClient.post('/auth/login', {
        email,
        password
      });

      if (response.data.statusCode !== 201) {
        toast.error(response.data.message);
        return;
      }

      toast.success("Successfully Logged In !!");
      localStorage.setItem('User', JSON.stringify(response.data.message));
      ref.current.complete();
      navigate('/');
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <div className='bg-slate-800 w-screen h-screen flex flex-col lg:flex-row overflow-hidden'>
      <LoadingBar color='orange' ref={ref} />

      <div className='left w-full lg:w-2/5 h-1/3 lg:h-full flex justify-center items-center p-10'>
        <h1 className='text-white font-thin text-4xl sm:text-6xl lg:text-7xl leading-tight text-center lg:text-left'>
          <span className='font-medium text-yellow-500'>Expense</span><br />Tracker App!!
        </h1>
      </div>

      <hr className='hidden lg:block w-0.5 h-3/4 mt-24 bg-white' />

      <div className='flex justify-center items-center w-full lg:w-3/5 h-2/3 lg:h-full px-6 py-10'>
        <div className='flex flex-col gap-6 w-full max-w-md'>
          <h1 className='text-3xl sm:text-4xl text-white font-bold text-center'>Login</h1>

          <input
            placeholder='Email'
            onChange={(e) => setEmail(e.target.value)}
            className='w-full h-12 pl-6 rounded-2xl outline-none transition-all focus:outline-2 focus:outline-white focus:outline-offset-4'
          />

          <input
            placeholder='Password'
            type='password'
            onChange={(e) => setPassword(e.target.value)}
            className='w-full h-12 pl-6 rounded-2xl outline-none transition-all focus:outline-2 focus:outline-white focus:outline-offset-4'
          />

          <button
            onClick={submitForm}
            className='w-full h-12 text-lg rounded-2xl bg-yellow-600 text-white text-center font-bold flex justify-center items-center transition-all hover:bg-yellow-700'
          >
            Submit
          </button>

          <p className='text-white text-center'>
            New User? Go To <a href='/signup' className='underline text-yellow-400'>SignUp</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
