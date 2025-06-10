import React from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useState } from 'react'
import { CaptainDataContext } from '../context/CaptainContext';

const CaptainLogin = () => {


   const [email, setEmail] = React.useState('');
   const [password, setPassword] = React.useState('');
    
   const {captain, setCaptain} = React.useContext(CaptainDataContext);
   const navigate = useNavigate(); 
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      
      const captain ={
        email:email,
        password
      }

      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captain/login`, captain);
      
      if (response.status === 200) {
        const data = response.data;
        setCaptain(data.captain);
        localStorage.setItem('token', data.token);
        navigate('/captain-home');
      } else {
        console.error('Login failed');
      }

      setEmail('');
      setPassword('');
      
    }

  return (
    <div className='p-10 h-screen flex flex-col justify-between'>

      <div>
        <img className='w-16 mb-10' src="https://www.svgrepo.com/show/505031/uber-driver.svg" alt="" />
        <form onSubmit={
          (e)=>{
            handleSubmit(e);
          }
        }>
            <h3 className='text-lg font-medium'>What's your email</h3>

            <input className='bg-[#eeeeee] mb-8 rounded px-4 py-2 border w-full text-lg placeholder:text-xm' required 
            value={email} 
            onChange={(e) => setEmail(e.target.value)}
            type="email" 
            placeholder='email@example.com' 
            />

          
            <h3 className='text-lg font-medium'>What's your password</h3>

            <input className='bg-[#eeeeee] mb-8 rounded px-4 py-2 border w-full text-lg placeholder:text-xm' type="password" 
            placeholder='********'
            value={password}
            onChange={(e) => setPassword(e.target.value)} 
            />

            <button className='bg-black text-white mb-8 rounded px-4 py-2 border w-full' type="submit">Login</button>
            <p>Want to be a Captain? <Link className='text-blue-500' to='/captain-signup'>Sign up</Link></p>
        </form>
      </div>

      <div>
        <Link to={'/login'} className='bg-green-500 text-white flex items-center justify-center mb-8 rounded px-4 py-2 border w-full'>Sign in as User</Link>
      </div>
    </div>
  )
}

export default CaptainLogin
