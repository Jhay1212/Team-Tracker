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
  return (
    <>
    <div className='min-h-screen h-full '>
        <Navbar />
        {/* on dashboard this will have table that will show all the employees and their task for the day and 
        seperate table for project details on the same day */}
    </div>

<main>
  <section id="projectContainer" className='bg white w-full mx-auto border border-double border-white rounded-md'>


  <h2>Project</h2>
<TableData data={sampleData} />
  </section>

</main>
        </>
  )
}

export default Dashboard