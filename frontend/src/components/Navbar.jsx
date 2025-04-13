import React from 'react'
import logo from '../assets/react.svg'
import { Link } from 'react-router-dom'
const Navbar = () => {
  return (
    <header className='min-w-full flex flex-wrap justify-around items-center bg-[#0C1B33] py-2 sticky'>
      <div className='img rounded-50'>
        <img src={logo} alt='logo' className='w-10 h-10' />
      </div>

      <nav className='flex justify-between text-white text-md font-mono '>


<ul className='flex justify-between'>
  <li className='block list-none text-md  font-bolder hover:underline  pl-4 '><Link to={'/'}>Home</Link></li>
  <li className='block list-none text-md  font-bolder hover:underline  pl-4 '><Link to={'/tasks'}>Tasks</Link></li>
  <li className='block list-none text-md  font-bolder hover:underline  pl-4 '><Link to={'/dashboard'}>Dashboard</Link></li>
</ul>
      </nav>

    </header>
  )
}

export default Navbar