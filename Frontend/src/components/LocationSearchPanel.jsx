import React from 'react'

const LocationSearchPanel = (props) => {

  const locations = [
    "Alwal, Hyderabad, Telangana, 500010 India",
    "ammerpet, Hyderabad, Telangana",
    "dilshuknagar, Hyderabad, Telangana",
    "kukatpally, Hyderabad, Telangana",
  ]

  return (

    <div className='p-3'>
      {
        locations.map(function(elem, idx){

          return <div key={idx} onClick={()=>{
              props.setVehiclePanel(true);
              props.setPanelOpen(false);
            }} className='flex justify-items-start border-2 active:border-black items-center px-3 py-2 mb-3'>
              <h2 className='bg-[#eee] h-10 flex items-center justify-center w-10 rounded-xl mr-3'><i className="ri-map-pin-line text-2xl"></i></h2>
              <h4 className='font-medium'>{elem}</h4>
            </div>
        })
      }
    </div>
  )
}

export default LocationSearchPanel