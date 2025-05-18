import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { BsSendFill } from 'react-icons/bs';
import { sendEmail } from '../utils/renders';
import LoadingBar from 'react-top-loading-bar';

function NavBar(props) {
  const [isPressed, setIsPressed] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const ref = useRef(null);
  const userData = props.data;
  const navigate = useNavigate();

  const logoutHandle = async () => {
    try {
      ref.current.staticStart();
      localStorage.removeItem('User');
      toast.success('Logout Successfully!!');
      ref.current.complete();
      navigate('/login');
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="w-full">
      <LoadingBar color="orange" ref={ref} />

      <div className="flex justify-between items-center px-4 sm:px-10 py-5 bg-neutral-950">
        {/* Logo */}
        <div className="text-white font-bold font-Handjet tracking-wider text-3xl sm:text-5xl">
          <span className="text-yellow-500">Expense</span> Tracker
        </div>

        
        <div className="relative">
          <div
            className="relative z-50 inline-flex group cursor-pointer"
            onClick={() => setIsPressed(!isPressed)}
          >
            <div className="absolute transition-all duration-700 opacity-70 inset-16 bg-gradient-to-r from-[#44BCFF] via-[#FF44EC] to-[#FF675E] rounded-xl blur-lg group-hover:opacity-100 group-hover:inset-1 group-hover:duration-200 animate-tilt"></div>
            <div
              className="relative inline-flex items-center justify-center px-6 py-3 text-sm sm:text-base font-bold text-white transition-all duration-200 bg-neutral-950 font-pj rounded-xl focus:outline-none focus:ring-1 focus:ring-offset-1 focus:ring-gray-900"
              role="button"
            >
              Send Email
            </div>
          </div>

         
          <div
            className={`absolute top-16 right-0 sm:right-auto transition-all duration-500 z-40 bg-blue-500 rounded-xl p-4 gap-3 flex flex-col ${
              isPressed
                ? 'opacity-100 w-64 sm:w-80'
                : 'opacity-0 w-0 overflow-hidden'
            }`}
          >
            <div
              className="absolute -top-2 -left-2 w-6 h-6 text-white bg-black font-bold rounded-full text-center leading-5 cursor-pointer border-2"
              onClick={() => setIsPressed(false)}
            >
              x
            </div>
            <div className="flex items-center gap-3">
              <input
                placeholder="Your Email"
                onChange={(e) => setUserEmail(e.target.value)}
                type="email"
                className="flex-1 outline-none p-2 pl-4 rounded-xl"
              />
              <button
                onClick={() => sendEmail(userEmail, userData)}
                className="bg-neutral-800 text-white p-3 rounded-xl"
              >
                <BsSendFill />
              </button>
            </div>
            <p className="text-xs text-white text-center">
              **Get your expenses in <b>one month</b>, On Your Email
            </p>
          </div>
        </div>

       
        <div className="ml-4">
          <a
            onClick={logoutHandle}
            href="#_"
            className="relative inline-flex items-center justify-center p-3 px-6 py-3 overflow-hidden font-medium text-indigo-600 transition duration-300 ease-out border-2 border-purple-500 rounded-full shadow-md group text-sm sm:text-lg"
          >
            <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-purple-500 group-hover:translate-x-0 ease">
              <svg
                className="w-5 h-5 sm:w-6 sm:h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                ></path>
              </svg>
            </span>
            <span className="absolute flex items-center justify-center w-full h-full text-purple-500 transition-all duration-300 transform group-hover:translate-x-full ease">
              LogOut
            </span>
            <span className="relative invisible">LogOut</span>
          </a>
        </div>
      </div>
    </div>
  );
}

export default NavBar;
