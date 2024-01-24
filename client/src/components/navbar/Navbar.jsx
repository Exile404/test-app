import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import getCurrentUser from '../../utils/getCurrentUser';
import newRequest from "../../utils/newRequest.js";
const Navbar = () => {
    // Assuming isUserLoggedIn is Link state variable indicating whether the user is logged in or not
    const isUserLoggedIn = getCurrentUser();
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    const navigate = useNavigate();


    const handleLogout = async () => {
        try {
            await newRequest.post("/auth/logout");
            localStorage.setItem('currentUser', null);
            navigate("/");
            window.location.reload(); // Refresh the page
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <>
            <nav className="flex items-center justify-between flex-wrap bg-teal-500 p-6 relative z-50">
                <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
                <Link to = "/" className="flex items-center flex-shrink-0 text-white mr-6">
                    <svg className="fill-current h-8 w-8 mr-2" width="54" height="54" viewBox="0 0 54 54" xmlns="http://www.w3.org/2000/svg">
                        <path d="M13.5 22.1c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 
                        10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05zM0 38.3c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 
                        9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05z"/></svg>
                    <span className="font-semibold text-xl tracking-tight">Test App</span>
                </Link>
                    <div className="ml-auto space-x-4">
                        
                        {isUserLoggedIn ? (
                            <>
                            <span className='inline-block text-sm px-4 py-2 leading-none border rounded text-white
                                     border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0'>{currentUser?.name}
                            </span>
                            <Link

                                onClick={handleLogout}
                                className="inline-block text-sm px-4 py-2 leading-none border rounded text-white
                                     border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0"
                            >
                                LogOut
                            </Link>
                            
                            </>
                        ) : (
                            <>
                                <Link
                                    to="/register"
                                    className="inline-block text-sm px-4 py-2 leading-none border rounded text-white
                                         border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0"
                                >
                                    Sign Up
                                </Link>
                                <Link
                                    to ="/login"
                                    className="inline-block text-sm px-4 py-2 leading-none border rounded text-white
                                         border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0"
                                >
                                    Login
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </nav>
        </>
    );
};

export default Navbar;
