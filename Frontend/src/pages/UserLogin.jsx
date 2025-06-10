import React from 'react'
import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import { UserDataContext } from '../context/UserContext';
import axios from 'axios';

const UserLogin = () => {

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [userData, setUserData] = React.useState({});

  const navigate = useNavigate();
  const {user, setUser} = useContext(UserDataContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData ={
      email:email,
      password:password
    };

    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/user/login`, userData);

    if (response.status === 200) {
      const data = response.data;
      setUser(data.user);
      localStorage.setItem('token', data.token);
      navigate('/home');
    }
    

    setEmail('');
    setPassword('');
    
  }

  return (
    <div className='p-10 h-screen flex flex-col justify-between'>

      <div>
        <img className='w-16 mb-10' src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Uber_logo_2018.svg/2560px-Uber_logo_2018.svg.png" alt="" />
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
            <p>Don't have an account? <Link className='text-blue-500' to='/signup'>Sign up</Link></p>
        </form>
      </div>

      <div>
        <Link to={'/captain-login'} className='bg-green-500 text-white flex items-center justify-center mb-8 rounded px-4 py-2 border w-full'>Sign in as Captain</Link>
      </div>
    </div>
  )
}

export default UserLogin
