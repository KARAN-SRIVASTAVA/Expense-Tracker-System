import React from 'react';
import { AiFillDelete } from 'react-icons/ai';
import { deleteExpense } from '../utils/renders';

function Items(props) {
  const exp = props.data;

  function getDate() {
    const dater = new Date(Date.parse(exp.date));
    const txt = dater.toString();
    return txt.substring(8, 10) + ' ' + txt.substring(4, 7);
  }

  return (
    <div className="flex flex-col gap-6 bg-black rounded-2xl w-full p-4 sm:p-5 font-mont">
      <div className="flex justify-between items-center text-white">
        <p className="font-bold text-xl sm:text-2xl">₹ {exp.amount}</p>
        <p className="bg-white text-black text-xs sm:text-sm font-bold px-3 py-1 rounded-full">
          {getDate()}
        </p>
      </div>

      <div className="flex justify-between items-center flex-wrap gap-4">
        <div className="border-2 text-white text-xs sm:text-sm px-3 py-1 rounded-full">
          <p>{exp.category}</p>
        </div>

        <a
          onClick={() => {
            const datar = {
              expenseId: exp._id,
              userId: exp.usersid,
            };
            deleteExpense(datar);
          }}
          href="#_"
          className="relative group overflow-hidden border-2 border-indigo-600 text-white rounded-md px-3.5 py-2 transition-all text-sm sm:text-base"
        >
          <span className="absolute w-64 h-0 transition-all duration-300 origin-center rotate-45 -translate-x-20 bg-indigo-600 top-1/2 group-hover:h-64 group-hover:-translate-y-32 ease"></span>
          <span className="relative flex items-center gap-1 transition duration-300 group-hover:text-white ease">
            <AiFillDelete className="text-lg sm:text-xl" />
          </span>
        </a>
      </div>
    </div>
  );
}

export default Items;
