import React from 'react'
import logo from '../assets/react.svg'

const Navbar = () => {
  return (
    <header className='min-w-full flex flex-wrap justify-around items-center bg-blue-950 py-2 sticky'>
      <div className='img rounded-50'>
        <img src={logo} alt='logo' className='w-10 h-10' />
      </div>

      <nav className='flex justify-between text-white text-md font-mono '>


<ul className='flex justify-between'>
  <li className='block list-none text-md  font-bolder hover:underline  pl-4 '>Home</li>
  <li className='block list-none text-md  font-bolder hover:underline  pl-4 '>About</li>
  <li className='block list-none text-md  font-bolder hover:underline  pl-4 '>Contact</li>
</ul>
      </nav>

    </header>
  )
}

export default Navbar