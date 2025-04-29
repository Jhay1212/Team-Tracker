import React from 'react'
import { useState } from 'react'
import male from '../assets/male-profile.svg'
import avatar from '../assets/avatar.svg'

const EmployeeCard = (props) => {
  const [showModal, setShowModal] = useState(false);
  const [show, setShow] = useState(false)


  return (
    

<div id={props.name} className="max-w-md  sm:-text-center  bg-[#233775]
 text-white rounded-lg overflow-hidden shadow-lg mx-4 my-4 transform transition 
 duration-300 hover:scale-105" >
  <div className="flex items-center p-4 ">
    <img src={avatar} alt="logo" className="w-12 h-12 mr-4 rounded" />
    <h5 className="text-xl font-bold text-whiteuppercase">{props.name}</h5>
  </div>
    <div className="px-4 pb-4">
    <p className="text-white text-base mb-2">
      Email: <span className="font-medium">{props.email}</span>
    </p>
    <p className="text-white text-base mb-2">
      Phone: <span className="font-medium">{props.phone}</span>
    </p>
    <p className="text-white text-base mb-2">
      Position: <span className="font-medium">{props.position}</span>
    </p>
    </div>
  <div className="px-4 pb-4">
    
<p className='text-white text-sm'>
      <span className='font-bold '>Team: </span>{props.team}
    </p>
    
    <p className='text-white text-sm'>
      Workin in project: <span className='font-bold'>{props.project}</span>
      
    </p>

  </div>
</div>

  )
}

export default EmployeeCard