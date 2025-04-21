import React from 'react'
import logo from '../assets/react.svg'
import { Link } from 'react-router-dom'
import {motion }from 'framer-motion';
import axios from 'axios';
import { useEffect } from 'react';
const Navbar = () => {

  useEffect(() => {
    
  })

  const showCreateModal = () => {
    const modal = document.getElementById('createModal');
    modal.style.display = 'block';
  }
  return (
    <header className='min-w-screen flex items-center bg-[#0C1B33] py-2 sticky  h-[15vh]'>


    
<nav className='w-full font-bolder py-2 text-white text-md flex justify-around'>
      <ul className='list-none flex justify-between items-center' >
        
        <li className='block list-none text-md  font-bolder hover:underline  pl-4 '><Link to={'/'}>Home</Link></li>
        {/* <li className='block list-none text-md  font-bolder hover:underline  pl-4 '><Link to={'/tasks'}>Tasks</Link></li> */}
        <li className='block list-none text-md  font-bolder hover:underline  pl-4 '><Link to={'/login'}>Dashboard</Link></li>
</ul>
     

     <ul className='flex justify-between items-center' >
        <li className='block list-none text-md  font-bolder hover:underline  pl-4 '><Link to={'/login'}>Login</Link></li>
        <li className='block list-none text-md  font-bolder hover:underline  pl-4 '><Link to={'/register'}>Register</Link></li>
        <li className='block list-none text-md  font-bolder hover:underline  pl-4 '><Link to={'/'}>Logout</Link></li>
     </ul>
  </nav>



    </header>
  )
}

export default Navbar