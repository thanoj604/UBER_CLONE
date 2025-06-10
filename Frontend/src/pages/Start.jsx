import React from 'react'
import {Link} from 'react-router-dom'

const Start = () => {
  return (
    <div>

        <div className='bg-cover bg-center bg-[url(./assets/images/uberHomePage.png)] h-screen w-full flex justify-between flex-col bg-red-400'>
            <div className='p-10'>
                <img className='w-16' src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Uber_logo_2018.svg/2560px-Uber_logo_2018.svg.png" alt="" />
            </div>
            <div className='bg-white flex flex-col justify-between py-5 px-5'>
                <h2 className='text-2xl font-bold mb-3'>Get Started with Uber</h2>
                <Link to={'/login'} className='flex items-center justify-center w-full bg-black text-white py-3 rounded'>Continue</Link>
            </div>
        </div>
      
    </div>
  )
}

export default Start
