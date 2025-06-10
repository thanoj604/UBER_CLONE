import React, { use } from 'react'
import { useContext } from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { CaptainDataContext } from '../context/CaptainContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'


const CaptainProtectWrapper = ({children}) => {
   
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const { captain, setCaptain } = useContext(CaptainDataContext);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!token) {
            navigate('/captain-login');
        }
    }, [token]);


    axios.get(`${import.meta.env.VITE_BASE_URL}/captain/profile`, { 
        headers: {
            Authorization: `Bearer ${token}`
        }
    }).then((response) => {
        if (response.status === 200) {
            setCaptain(response.data.captain);
            setIsLoading(false);
        } 
    }).catch((error) => {
        console.error('Error fetching captain profile:', error);
        localStorage.removeItem('token');
        navigate('/captain-login');
    }
    );



  return (
    <>
     {children} 
    </>
  )
}

export default CaptainProtectWrapper
