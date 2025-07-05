import React from 'react'
import {useState, useRef} from 'react';
import {useGSAP} from '@gsap/react';
import gsap from 'gsap';
import 'remixicon/fonts/remixicon.css'
import LocationSearchPanel from '../components/LocationSearchPanel';

const Home = () => {

  const [pickup, setPickup] = useState('');
  const [destination, setDestination] = useState('');
  const [panelOpen, setPanelOpen] = useState(false);

  const panelRef = useRef(null); 
  const panelCloseRef = useRef(null);
  const vehiclePanelRef = useRef(null);
  const [vehiclePanelOpen, setVehiclePanelOpen] = useState(false);

  const submitHandler = (e) => {
    e.preventDefault();
    console.log({ pickup, destination });
  }


  useGSAP(function(){
    if(panelOpen){
      gsap.to(panelRef.current, {
        height: '70%',
        duration: 0.5,
        ease: 'power2.inOut',
      });
      gsap.to(panelCloseRef.current, {
        opacity: 1,
        duration: 0.5,
        ease: 'power2.inOut',
      }); 
    }
    else{
      gsap.to(panelRef.current, {
        height: '0%',
        duration: 0.5,
        ease: 'power2.inOut',
      });
      gsap.to(panelCloseRef.current, {
        opacity: 0,
        duration: 0.5,
        ease: 'power2.inOut',
      });
    }
  }, [panelOpen]);


  useGSAP(function(){

    if(vehiclePanelOpen){
    gsap.to(vehiclePanelRef.current, {
      transform: 'translateY(0)'
    })
  } else{
    gsap.to(vehiclePanelRef.current, {
      transform: 'translateY(100%)'
    })
  }

  }, [vehiclePanelOpen]);


  return (
    <div className='h-screen relative overflow-hidden'>

      <img className='w-16 absolute left-5 top-5 mb-10' src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Uber_logo_2018.svg/2560px-Uber_logo_2018.svg.png" alt="" />

      <div className='h-screen w-screen' >
        <img className='h-full w-full object-center' src="https://miro.medium.com/v2/resize:fit:250/1*CI4wWKiHf8EfGRofgu5Dew.png" alt="" />
      </div>


      <div className='h-screen absolute flex flex-col justify-end top-0 w-full'>
        <div className='h-[30%] bg-white p-5 relative'>
          <h5 ref={panelCloseRef} onClick={
            ()=>{
              setPanelOpen(false);
            }
          } className='absolute opacity-0 top-4 right-6 text-2xl'>
          <i className="ri-arrow-down-wide-line"></i>
        </h5>
          <h4>Find a trip</h4>
        <form onSubmit={(e)=>{
          submitHandler(e);
        }}>
          <input 
          onClick={() => setPanelOpen(true)}
          value={pickup}
          onChange={(e) => setPickup(e.target.value)}
          className='bg-[#eeeeee] mb-5 rounded px-4 py-2 border w-full text-sm placeholder:text-sm' type="text" placeholder='Enter your Pick-up location' />
          <input 
          onClick={() => setPanelOpen(true)}
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          className='bg-[#eeeeee] rounded px-4 py-2 border w-full text-sm placeholder:text-sm' type="text" placeholder='Enter your destination' />
        </form>
        </div>
        <div ref={panelRef} className='bg-white h-0'>
          <LocationSearchPanel vehiclePanel={vehiclePanelOpen} setVehiclePanel={setVehiclePanelOpen}/>
        </div>
      </div>

      <div ref={vehiclePanelRef} className='fixed w-full z-10 bottom-0 translate-y-full px-3 py-6 bg-white'>
        <h3 className='p-2 text-xl font-bold'>Choose a Vehicle</h3>
        <div className='flex w-full items-center justify-between p-3 border-2 border-black rounded-lg mb-5'>
          <img className='h-20 w-28' src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1714471451/assets/27/362eaf-3e88-4568-a460-29b0da41c285/original/UberX-%281%29.png" alt="" />
          <div className='w-1/2 text-sm'>
            <h4>UberGo <span><i className="ri-user-fill">4</i></span></h4>
            <h5>2 mins away</h5>
            <p>Affordable, compact rides</p>
          </div>
          <h2 className='text-lg font-semibold'>₹400</h2>
        </div>

        <div className='flex w-full items-center justify-between p-3 border-2 border-black rounded-lg mb-5'>
          <img className='h-16 w-24' src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1649231091/assets/2c/7fa194-c954-49b2-9c6d-a3b8601370f5/original/Uber_Moto_Orange_312x208_pixels_Mobile.png" alt="" />
          <div className='w-1/2 text-sm'>
            <h4>Moto <span><i className="ri-user-fill">1</i></span></h4>
            <h5>3 mins away</h5>
            <p>Affordable, Motorcycle Rides</p>
          </div>
          <h2 className='text-lg font-semibold'>₹89</h2>
        </div>

        <div className='flex w-full items-center justify-between p-3 border-2 border-black rounded-lg mb-5'>
          <img className='h-16 w-24' src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1648431773/assets/1d/db8c56-0204-4ce4-81ce-56a11a07fe98/original/Uber_Auto_558x372_pixels_Desktop.png" alt="" />
          <div className='w-1/2 text-sm'>
            <h4>Auto <span><i className="ri-user-fill">3</i></span></h4>
            <h5>5 mins away</h5>
            <p>Affordable, Auto Rides</p>
          </div>
          <h2 className='text-lg font-semibold'>₹109</h2>
        </div>
        
      </div>

    </div>
  )
}

export default Home
