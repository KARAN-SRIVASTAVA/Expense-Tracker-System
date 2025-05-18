import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Items from '../components/Items';
import { Chartss } from '../components/Chartss';
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import LoadingBar from 'react-top-loading-bar';
import { createExpense, getUserExpenses } from '../utils/renders';
import NavBar from '../components/NavBar';

function Home() {
  const navigate = useNavigate();
  const [selectDate, setSelectedDate] = useState("");
  const [amount, setAmount] = useState(0);
  const [category, setCategory] = useState("");
  const [userdata] = useState(JSON.parse(localStorage.getItem('User')));
  const [userexp, setUserexp] = useState([]);
  const ref = useRef(null);

  document.title = 'Home';

  useEffect(() => {
    if (!localStorage.getItem('User')) {
      navigate('/login');
    }
    setUserexp(Promise.resolve(getUserExpenses(userdata._id)).then((data) => setUserexp(data)));
  }, [userdata._id, navigate]);

  const getTotal = () => {
    let sum = 0;
    for (const item in userexp) {
      sum += userexp[item].amount;
    }
    return sum;
  };

  return (
    <div className='h-screen w-full bg-zinc-900 font-mont overflow-y-auto'>
      <LoadingBar color='orange' ref={ref}></LoadingBar>
      <NavBar data={userexp} />

      <div className='Feed relative w-full min-h-[calc(100%-6rem)] flex flex-col lg:flex-row items-stretch px-4 lg:px-12 pt-6 pb-10 gap-8'>

        <div className='leftbox w-full lg:w-1/2 h-fit lg:h-full'>
          <div className='p-4'>
            <Chartss exdata={userexp} />
          </div>
        </div>

        <div className='rightbox w-full lg:w-1/2 flex flex-col gap-10 items-center'>

          <div className='createnew bg-gray-800 w-full max-w-xl rounded-3xl p-6 flex flex-col justify-center items-center gap-4'>
            <div className='font-bold text-2xl sm:text-3xl text-white'>Create Transaction</div>

            <div className='flex flex-col sm:flex-row gap-4 w-full'>
              <input
                type='number'
                onChange={(e) => setAmount(e.target.value)}
                placeholder='Amount'
                className='h-12 w-full text-base placeholder-black p-4 rounded-xl outline-none focus:focus-animation'
              />
              <select
                onChange={(e) => { setCategory(e.target.value); }}
                defaultValue='selected'
                className='bg-white w-full outline-none border border-gray-300 text-gray-900 text-sm rounded-xl p-2.5 focus:focus-animation'
              >
                <option value="">--Select--</option>
                <option value="Grocery">Grocery</option>
                <option value="Vehicle">Vehicle</option>
                <option value="Shopping">Shopping</option>
                <option value="Travel">Travel</option>
                <option value="Food">Food</option>
                <option value="Fun">Fun</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className='flex flex-col sm:flex-row w-full gap-4 mt-4'>
              <DatePicker
                selected={selectDate}
                onChange={(date) => setSelectedDate(date)}
                className="p-3 placeholder-black w-full rounded-xl outline-none bg-jp-black px-4 text-jp-white focus:focus-animation"
                placeholderText="Date"
                showYearDropdown
              />
              <a
                onClick={() => {
                  const expInfo = {
                    usersid: userdata._id,
                    category,
                    date: selectDate,
                    amount
                  };
                  ref.current.staticStart();
                  createExpense(expInfo);
                  ref.current.complete();
                }}
                href="#_"
                className="relative w-full text-center rounded-xl px-5 py-2 overflow-hidden group bg-gray-800 border-2 hover:bg-gradient-to-r hover:from-indigo-600 hover:to-indigo-600 text-white hover:ring-2 hover:ring-offset-2 hover:ring-indigo-600 transition-all ease-out duration-300"
              >
                <span className="absolute right-0 w-8 h-10 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
                <span className="relative font-bold text-2xl">+</span>
              </a>
            </div>
          </div>

          <div className='w-full max-w-4xl px-4 py-6 rounded-xl border-2 border-white overflow-y-auto max-h-[400px]'>
            <div className='text-2xl sm:text-3xl text-white font-bold mb-4'>Total Expense : ₹ {getTotal()}</div>
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
              {
                Object.keys(userexp).map((items) => (
                  <Items key={userexp[items]._id} data={userexp[items]} />
                ))
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
