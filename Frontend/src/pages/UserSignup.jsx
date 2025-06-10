import React from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { UserDataContext } from "../context/UserContext";

const UserSignup = () => {


  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [userData, setUserData] = React.useState({});

  const navigate = useNavigate();
  const {user, setUser} = React.useContext(UserDataContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newUser = {
      fullname:{
        firstname: firstName,
        lastname: lastName
      },
      email: email,
      password: password
    };


    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/user/register`, newUser);


    if (response.status === 201) {
      const data = response.data;

      setUser(data.user);
      localStorage.setItem('token', data.token);

      navigate('/home');
    }


    setEmail('');
    setPassword('');
    setFirstName('');
    setLastName('');
  }


  return (
    <div className="p-10 h-screen flex flex-col justify-between">
      <div>
        <img
          className="w-16 mb-10"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Uber_logo_2018.svg/2560px-Uber_logo_2018.svg.png"
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

          <div>
          <button
            className="bg-black text-white mb-1 rounded px-4 py-2 border w-full"
            type="submit"
          >Sign up
          </button>
          <p>Already have an account? <Link className='text-blue-500' to='/login'>Login here</Link></p>
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
};

export default UserSignup;
