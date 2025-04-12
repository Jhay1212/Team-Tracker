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
  // console.log(employee['results']);
  return (


    <div className='min-h-full'>
    <Navbar />
    
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
      email={emp.pemail}
      phone={emp.phone}
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