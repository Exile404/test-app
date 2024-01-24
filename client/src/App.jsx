import React from 'react'
import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
} from "react-router-dom";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query'


import Navbar from './components/navbar/Navbar';
import Footer from './components/footer/Footer';
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import GoogleLoginSuccess from './components/google-login-success';




function App() {
  const queryClient = new QueryClient()

  const Layout = () => {
    return (
      <div className="app">
        <QueryClientProvider client = {queryClient}>
          <Navbar />
          <Outlet />
          <Footer />
        </QueryClientProvider>
      </div>
    );
  };
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children:[
        {
          path:"/",
          element: <Home />
        },
        {
          path:"/login",
          element:<Login />
        },
        {
          path: "/register",
          element: <Register />
        },
        {
          path:"/google-login-success",
          element: <GoogleLoginSuccess />
          
        }
      ]

    },
  ]);
  return (
     <div>
      <RouterProvider router={router} />
     </div>
  )
}

export default App
