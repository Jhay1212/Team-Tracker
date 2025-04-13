import React from 'react'
import { useState, useEffect } from 'react';
import EmployeeCard from '../components/EmployeeCard';
import Navbar from '../components/Navbar';
import CreateModal from '../components/CreateModal';
import axios from 'axios';

const Home = () => {
  const [employee, setEmployee] = useState([]);

  useEffect(() => {
      try {
        async function fetchData (){
          const response = await axios.get(`http://localhost:8000/api/employees/`)
          setEmployee(response.data.results);
            };     
        fetchData();
      } catch (error) {
        console.log('error', error.message);
      };

  }, [employee]);
  console.log(employee)

  const showCreateModal = () => {
    const modal = document.getElementById('createModal');
    modal.style.display = 'block';
  }
  // console.log(employee['results']);
  return (


    <div className='min-h-full'>

    <Navbar />
    
      
      
      <div id='menu' className='container px-3 py-4  mx-auto flex justify-between bg-white mt-5 rounded-sm'>


<div className='flex justify-center items-center gap-4'> 

      <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
            </svg>
      <input type='search'  placeholder='Search'/>
</div>
      <div>
        <div className='flex justify-center items-center gap-4 uppercase text-sm text-center'>

      <h1 onClick={showCreateModal}>Add a new employee</h1>
      <h1>Modify an employee</h1>
          </div>
      </div>
      </div>


      

    
      <main className=" border border-red-100 h-full ">
        <div className="flex justify-center mx-auto w-full">

    <CreateModal />
        </div>


      <div className='flex wrapper items-center justify-center w-full'>

        <div className="grid   grid-cols-3 mx-auto w-3/4">

        
{employee && employee.length > 0 ? (
  employee.map((emp, index) => (
    <EmployeeCard
      key={index}
      name={emp.name}
      email={emp.email}
      phone={emp.phone}
      position={emp.position}
      department={emp.department}
    />
  ))
) : (
  <p>No Employees available</p>
)}
  

      </div>
        </div>
      </main>
    </div>
  )
}

export default Home