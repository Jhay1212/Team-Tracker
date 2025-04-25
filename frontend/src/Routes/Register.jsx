import React from 'react'
import Navbar from '../components/Navbar'
import RegisterForm from '../components/RegisterForm'
const Register = () => {
  return (
    <div className='min-h-screen h-full  sm:m-0'>
    <Navbar />
    <main className='w-full h-3/4 '> 
    <RegisterForm />
    </main>
    </div>
  )
}

export default Register