import React, { useState, useEffect } from 'react';
import getCurrentUser from '../../utils/getCurrentUser'; // adjust the path as needed
import { Link } from 'react-router-dom';

const Intro = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const user = getCurrentUser();
    setIsLoggedIn(user !== null);
  }, []);
  const user = getCurrentUser();
  console.log(user)
  return (
    <div className="flex justify-center items-center h-screen relative">
      <div className={`absolute inset-0 ${isLoggedIn ? '' : 'blur'}`}>
        <img
          className="shadow-lg max-w-full h-auto"
          src="./img/bg.jpg"
          alt="background"
        />
      </div>
      {!isLoggedIn && (


        <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 dark:bg-gray-800 dark:border-gray-700 z-10 text-center">
          <h5 className="mb-3 text-base font-semibold text-gray-900 md:text-xl dark:text-white">
            Connect us
          </h5>
        
          <ul className="my-4 space-y-3">
            <li>
              <Link to = '/login' className="flex items-center p-3 text-base font-bold text-gray-900 rounded-lg bg-gray-50 hover:bg-gray-100 group hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white">
              <span className="flex-1 ms-3 whitespace-nowrap">Login Now</span>
                
              </Link>
            </li>
            <li>
              <Link to= '/register' className="flex items-center p-3 text-base font-bold text-gray-900 rounded-lg bg-gray-50 hover:bg-gray-100 group hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white">
                <span className="flex-1 ms-3 whitespace-nowrap">Sign Up</span>
              </Link>
            </li>
          
          </ul>
         
        </div>

      )}
    </div>
  );
};

export default Intro;
