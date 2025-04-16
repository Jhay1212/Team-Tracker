import React from 'react'
import logo from '../assets/react.svg'
import { Link } from 'react-router-dom'
import {motion }from 'framer-motion';
const Navbar = () => {

  const showCreateModal = () => {
    const modal = document.getElementById('createModal');
    modal.style.display = 'block';
  }
  return (
    <header className='min-w-full flex flex-wrap justify-between items-center bg-[#0C1B33] py-2 sticky  h-[15vh]'>


<nav className='flex justify-between text-white text-md font-mono '>


<div >


<ul className='flex justify-between'>
  <li className='block list-none text-md  font-bolder hover:underline  pl-4 '><Link to={'/'}>Home</Link></li>
  <li className='block list-none text-md  font-bolder hover:underline  pl-4 '><Link to={'/tasks'}>Tasks</Link></li>
  <li className='block list-none text-md  font-bolder hover:underline  pl-4 '><Link to={'/login'}>Dashboard</Link></li>
</ul>
</div>

<div>
<ul className='flex justify-between'>
  <li className='block list-none text-md  font-bolder hover:underline  pl-4 '>
    <motion.button type='button'  className='block list-none text-md  font-bolder hover:underline  pl-4 ' whileHover={{scale:1.2}} onClick={showCreateModal}>
      Add Employee
    </motion.button>
  </li>
  <li className='block list-none text-md  font-bolder hover:underline  pl-4 '><Link to={'/tasks'}>Tasks</Link></li>
  <li className='block list-none text-md  font-bolder hover:underline  pl-4 '><Link to={'/login'}>Dashboard</Link></li>
</ul>
</div>
      </nav>
     



    </header>
  )
}

export default Navbar