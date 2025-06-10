import React, { use } from 'react'
import { useContext } from 'react'
import { useEffect } from 'react'
import { UserDataContext } from '../context/UserContext'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'


const UserProtectWrapper = ({children}) => {
   
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const { user, setUser } = useContext(UserDataContext);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!token) {
            navigate('/login');
        }

        axios.get(`${import.meta.env.VITE_BASE_URL}/user/profile`, { 
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((response) => {
            if (response.status === 200) {
                setUser(response.data.user);
                setIsLoading(false);
            } 
        }).catch((error) => {
            console.error('Error fetching user profile:', error);
            localStorage.removeItem('token');
            navigate('/login');
        });

    }, [token]);

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <>
     {children} 
    </>
  )
}

export default UserProtectWrapper
