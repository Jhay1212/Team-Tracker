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
      <div id='menu' className='container px-3 py-5  mx-auto flex justify-between bg-white mt-5 '>

      <input type='search'  placeholder='Search'/>
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

        <div className="flex justify-evenly flex-wrap place-items-center  w-full">

        
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