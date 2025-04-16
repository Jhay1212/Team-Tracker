import React from 'react'
import Navbar from '../components/Navbar'
import LoginForm from '../components/LoginForm'
const Dashboard = () => {
  return (
    <div className='min-h-screen h-full '>
        <Navbar />
        <LoginForm />
    </div>
  )
}

export default Dashboard