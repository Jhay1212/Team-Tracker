import {useEffect, useState} from 'react'
import Navbar from '../components/Navbar'
import LoginForm from '../components/LoginForm.jsx'
import EmployeeTable from '../components/Dashboard/EmployeeTable.jsx'
import ProjectsTable from '../components/Dashboard/ProjectsTable.jsx'
import axios from 'axios';
const Dashboard = () => {
  const is_superuser = localStorage.getItem('is_superuser');


  

  if (is_superuser) {
    return (
      <div className='min-h-screen h-full '>
    <Navbar />

 
        {/* on dashboard this will have table that will show all the employees and their task for the day and 
        seperate table for project details on the same day */}

<main className='h-screen w-screen mt-20'>
  <div className="flex justify-evenly">
  <div className="card w-1/4 h-1/4 bg-white px-auto text-center rounded-lg mx-3 mb-3">
        <div className="card-body ">
          <h5 className="card-title bold pb-4">Number of Employees Working </h5>
          <h2 className='text-3xl'>{employees.length}</h2>
          <a href="#" className="btn btn-primary">Go somewhere</a>
        </div>
      </div>

      <div className="card w-1/4 h-1/4 bg-white px-auto text-center rounded-lg mx-3 mb-3">
        <div className="card-body">
          <h5 className="card-title bold pb-4">Number of Projects</h5>
          <h2 className='text-3xl'>{projects.length}</h2>
          <a href="#" className="btn btn-primary">Go somewhere</a>
        </div>
      </div>
  </div>

     
    
  <section id="projectContainer" className='bg white w-full mx-auto border border-double border-white rounded-md'>


  <h2>Project</h2>
{/* <TableData data={projects} /> */}
<ProjectsTable />
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