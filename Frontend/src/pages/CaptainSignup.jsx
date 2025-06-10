import React from 'react'
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CaptainDataContext } from '../context/CaptainContext';
import axios from 'axios';

const CaptainSignup = () => {

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  
  const [vehicleColor, setVehicleColor] = useState('');
  const [vehiclePlate, setVehiclePlate] = useState('');
  const [vehicleCapacity, setVehicleCapacity] = useState('');
  const [vehicleType, setVehicleType] = useState('');

  const {captain, setCaptain} = React.useContext(CaptainDataContext)

  const navigate = useNavigate();
  const {user, setUser} = React.useContext(CaptainDataContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const captainData = {
      fullname:{
        firstname: firstName,
        lastname: lastName
      },
      email: email,
      password: password,
      vehicle: {
        color: vehicleColor,
        plate: vehiclePlate,
        capacity: vehicleCapacity,
        vehicleType: vehicleType
      }
    };



    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captain/register`, captainData);


    if (response.status === 201) {
      const data = response.data;
      setCaptain(data.captain);
      localStorage.setItem('token', data.token);
      navigate('/captain-home');
    }


    setEmail('');
    setPassword('');
    setFirstName('');
    setLastName('');
    setVehicleColor('');
    setVehiclePlate('');
    setVehicleCapacity('');
    setVehicleType('');
  }


  return (
    <div className="p-10 h-screen flex flex-col justify-between">
      <div>
        <img
          className="w-16 mb-10"
          src="https://www.svgrepo.com/show/505031/uber-driver.svg"
          alt=""
        />
        <form
          onSubmit={(e) => {
            handleSubmit(e);
          }}
        >
          <h3 className="text-base font-medium">What is your Name</h3>
          <div>
            <input
              className="bg-[#eeeeee] mb-8 rounded px-4 py-2 border w-full text-base placeholder:text-sm"
              required
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              type="text"
              placeholder="First Name"
            />

            <input
              className="bg-[#eeeeee] mb-8 rounded px-4 py-2 border w-full text-base placeholder:text-sm"
              required
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              type="text"
              placeholder="Last Name"
            />
          </div>

          <h3 className="text-base font-medium">What's your email</h3>

          <input
            className="bg-[#eeeeee] mb-8 rounded px-4 py-2 border w-full text-lg placeholder:text-sm"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="email@example.com"
          />

          <h3 className="text-base font-medium">What's your password</h3>

          <input
            className="bg-[#eeeeee] mb-8 rounded px-4 py-2 border w-full text-lg placeholder:text-sm"
            type="password"
            placeholder="********"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <h3 className="text-base font-medium">Vehicle Details</h3>


          <div className='flex md:flex-row gap-4'>
            <select
            className="bg-[#eeeeee] mb-8 rounded px-4 py-2 border w-full text-sm placeholder:text-sm"
            required
            value={vehicleType}
            onChange={(e) => setVehicleType(e.target.value)}
          >
            <option value="">Select Vehicle Type</option>
            <option value="car">Car</option>
            <option value="auto">Auto</option>
            <option value="bike">Bike</option>
          </select>
          <input
            className="bg-[#eeeeee] mb-8 rounded px-4 py-2 border w-full text-base placeholder:text-sm"
            required
            value={vehicleColor}
            onChange={(e) => setVehicleColor(e.target.value)}
            type="text"
            placeholder="Vehicle Color"
          />
          </div>


          <div className='flex md:flex-row gap-4'>
            <input
            className="bg-[#eeeeee] mb-8 rounded px-4 py-2 border w-full text-base placeholder:text-sm"
            required
            value={vehiclePlate}
            onChange={(e) => setVehiclePlate(e.target.value)}
            type="text"
            placeholder="Vehicle Plate Number"
          />

          <input
            className="bg-[#eeeeee] mb-8 rounded px-4 py-2 border w-full text-base placeholder:text-sm"
            required
            value={vehicleCapacity}
            onChange={(e) => setVehicleCapacity(e.target.value)}
            type="number"
            placeholder="Vehicle Capacity"
          />
          </div>
          

          <div>
          <button
            className="bg-black text-white mb-1 rounded px-4 py-2 border w-full"
            type="submit"
          >Create Captain Account
          </button>
          <p>Already a Captain? <Link className='text-blue-500' to='/captain-login'>Login</Link></p>
          </div>
        </form>
      </div>

      <div>
        <p className="text-[10px] text-gray-500 mt-2 mb-2">
          By proceeding, you consent to get calls, WhatsApp or SMS messages, including by automated means, from Uber and its affiliates to the number you provided. This includes calls and messages sent by or on behalf of Uber, its affiliates, and third-party partners.
        </p>
         
      </div>
    </div>
  );
  
}

export default CaptainSignup
