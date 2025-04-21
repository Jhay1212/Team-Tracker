import React from 'react'
import Navbar from '../components/Navbar'
import LoginForm from '../components/LoginForm'
const Dashboard = () => {
  return (
    <div className='min-h-screen h-full '>
        <Navbar />
        {/* on dashboard this will have table that will show all the employees and their task for the day and 
        seperate table for project details on the same day */}
        <LoginForm />
    </div>
  )
}

export default Dashboard