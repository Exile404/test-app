
import React, { useState } from "react";


import newRequest from "../../utils/newRequest";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {

  const [user, setUser] = useState({
    name: "",
    username: "",
    email: "",
    password: "",

  });
  // console.log(user)

  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await newRequest.post("/auth/register", {
        ...user,

      });
      //localStorage.setItem("currentUser", JSON.stringify(user.name));
      navigate("/")
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img className="mx-auto h-10 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company" />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign in to your account</h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label for="text" className="block text-sm font-medium leading-6 text-gray-900">Name</label>
            <div className="mt-2">
              <input id="name" name="name" type="text" required className="block w-full rounded-md border-0 py-1.5
           text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" onChange={handleChange} />
            </div>
          </div>
          <div>
            <label for="text" className="block text-sm font-medium leading-6 text-gray-900">User Name</label>
            <div className="mt-2">
              <input id="username" name="username" type="text" required className="block w-full rounded-md border-0 py-1.5
           text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset 
           focus:ring-indigo-600 sm:text-sm sm:leading-6" onChange={handleChange} />
            </div>
          </div>
          <div>
            <label for="email" className="block text-sm font-medium leading-6 text-gray-900">Email address</label>
            <div className="mt-2">
              <input id="email" name="email" type="email" autocomplete="email" required className="block w-full rounded-md border-0 py-1.5
           text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300
            placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" onChange={handleChange} />
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between">
              <label for="password" className="block text-sm font-medium leading-6 text-gray-900">Password</label>

            </div>
            <div className="mt-2">
              <input id="password" name="password" type="password" autocomplete="current-password" required className="block w-full 
          ounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 
          focus:ring-2 focus:ring-inset 
          focus:ring-indigo-600 sm:text-sm sm:leading-6" onChange={handleChange} />
            </div>
          </div>

          <div>
            <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 
    px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 
    focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 
    focus-visible:outline-indigo-600 mb-4">Sign Up</button>

            <Link to="http://localhost:8800/api/auth/google" className="flex w-full justify-center rounded-md bg-indigo-600 
    px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 
    focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 
    focus-visible:outline-indigo-600">Sign up with Google</Link>
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
          Already a member?
          <Link to="/register" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"> {' '}Login Now</Link>
        </p>
      </div>
    </div>
  )
}

export default Register
