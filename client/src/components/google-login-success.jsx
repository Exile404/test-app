// components/google-login-success.jsx
import React, { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

const GoogleLoginSuccess = () => {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    // Fetch user data from the cookie
    const storedUserData = document.cookie
      .split('; ')
      .find(row => row.startsWith('userData='));

    if (storedUserData) {
      // Decode URL-encoded data and then parse as JSON
      const decodedUserData = decodeURIComponent(storedUserData.split('=')[1]);
      const parsedUserData = JSON.parse(decodedUserData);
      setUserData(parsedUserData);
      
    }
  }, []);
  localStorage.setItem("currentUser", JSON.stringify(userData));
      navigate('/')
  return (
    <div>
      <h1>Google Login Successful</h1>
      {userData && (
        <>
          <p>Welcome, {userData.name}!</p>
          {/* Render other user data as needed */}
        </>
      )}
    </div>
  );
};

export default GoogleLoginSuccess;
