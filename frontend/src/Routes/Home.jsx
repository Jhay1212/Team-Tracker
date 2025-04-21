import React from 'react'
import { useState, useEffect } from 'react';
import EmployeeCard from '../components/EmployeeCard';
import Navbar from '../components/Navbar';
import CreateModal from '../components/CreateModal';
import TableData from '../components/TableData';
import axios from 'axios';
import ModifyEmployee from '../components/ModifyEmployee';
import { Link } from 'react-router';

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

  const showCreateModal = () => {
    const modal = document.getElementById('createModal');
    modal.style.display = 'block';
  }
  const emps = 0;

  const showModifyModal = (e) => {
    const empcard = e.target;
    console.log(empcard);
    alert(empcard)
  }
  // console.log(employee);
  return (


    <div className='min-h-full'>


    <div className='w-full md:w-screen bg-[#0C1B33]'>
    <Navbar />
    </div>

    
    <div id='menu'>
    
    </div>
    
      
      
      <div id='menu' className='container sm:w-full mb-5  py-4  mx-auto flex justify-between bg-white mt-5 rounded-sm'>


<div className='flex justify-center items-center gap-4 sm:gap-1'> 

      <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
            </svg>
      <input type='search'  placeholder='Search' className='block w-full sm:w-1/2 outline outline-red-500' />
</div>
      <div>
        <div className='flex justify-center items-center pr-3 sm:pr-4  gap-4 sm:gap-2 uppercase text-sm text-center'>

      <h1 onClick={showCreateModal}>Add a new employee</h1>
      <h1>Modify an employee</h1>
          </div>
      </div>
      </div>


  
      <CreateModal />

    
      <main className=" border border-red-100 h-full ">
        <div className="flex justify-center mx-auto w-full">
      {/* <TableData data={employee}/> */}


        </div>


      <div className='flex wrapper items-center justify-center w-full'>

        <div className="grid   grid-cols-3 mx-auto w-3/4">

        
{employee && employee.length > 0 ? (
  employee.map((emp, index) => (
    <EmployeeCard
      id={emp.name}
      key={index}
      name={emp.name}
      email={emp.email}
      team={emp.team}
      
      phone={emp.phone}
      position={emp.position}
      department={emp.department}

      onClick={showModifyModal}
      
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