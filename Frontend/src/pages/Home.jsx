import React from 'react'

const Home = () => {
  return (
    <div className='h-screen relative'>

      <img className='w-16 absolute left-5 top-5 mb-10' src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Uber_logo_2018.svg/2560px-Uber_logo_2018.svg.png" alt="" />

      <div className='h-screen w-screen' >
        <img className='h-full w-full object-center' src="https://miro.medium.com/v2/resize:fit:250/1*CI4wWKiHf8EfGRofgu5Dew.png" alt="" />
      </div>


      <div className='p-10 bg-white absolute flex flex-col justify-between bottom-0'>
        <div>
          <h4>Find a trip</h4>
        <form>
          <input className='bg-[#eeeeee] mb-5 rounded px-4 py-2 border w-full text-sm placeholder:text-sm' type="text" placeholder='Enter your Pick-up location' />
          <input className='bg-[#eeeeee] rounded px-4 py-2 border w-full text-sm placeholder:text-sm' type="text" placeholder='Enter your destination' />
        </form>
        </div>
      </div>

    </div>
  )
}

export default Home
