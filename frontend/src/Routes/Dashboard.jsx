import React from 'react'
import Navbar from '../components/Navbar'
import LoginForm from '../components/LoginForm'
import TableData from '../components/TableData';

const Dashboard = () => {
  const sampleData  = [
    {
      name: "Project Name",
      description: "Project Description",
    },
    
    {
      name: "Project Name2",
      description: "Project Description2",
    },
    {
      name: "Project Name3",
      description: "Project Description3",
    },
    {
      name: "Project Name4",
      description: "Project Description4",
    },

    
  ]  
  if (!localStorage.getItem('user').username === 'admin') {
    return (
      <div className='min-h-screen h-full '>
    <Navbar />

 
        {/* on dashboard this will have table that will show all the employees and their task for the day and 
        seperate table for project details on the same day */}

<main className='h-screen w-screen mt-20'>
<div className="card w-1/4 h-1/4 bg-white px-auto text-center rounded-lg mx-3 mb-3">
      <div className="card-body ">
        <h5 className="card-title">Card title</h5>
        <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
        <a href="#" className="btn btn-primary">Go somewhere</a>
      </div>
    </div>
  <section id="projectContainer" className='bg white w-full mx-auto border border-double border-white rounded-md'>


  <h2>Project</h2>
<TableData data={sampleData} />
  </section>

</main>
        </div>
  )
}
else{
  return (
    <div className='w-full h-full'>

    {/* <Navbar /> */}
    <div className='flex justify-center items-center min-h-screen h-full '>
        <h2 className="p-5 font-extraboldan text-center text-blue rounded text-white font-extrabold text-3xl  ">
          Admin Access Only
        </h2>
      </div>
</div>    
  )
}}

export default Dashboard