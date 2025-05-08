import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EmployeeCard from '../components/EmployeeCard';
import Navbar from '../components/Navbar';
import CreateModal from '../components/CreateModal';
import TaskModal from '../components/TaskModal';

const Home = () => {
  const [user, setUser] = useState({});
  const [employees, setEmployees] = useState([]);
  const [projects, setProjects] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [timer, setTimer] = useState(0);

  const fetchProjects = async () => {
    try {
      const res = await axios.get('http://localhost:8000/api/projects/');
      setProjects(res.data.results);
    } catch (error) {
      console.error('Project fetch error:', error.message);
    }
  };

  // Fetch Employees
  const fetchEmployees = async () => {
    try {
      const res = await axios.get('http://localhost:8000/api/employees/');
      setEmployees(res.data.results);
    } catch (error) {
      console.error('Employee fetch error:', error.message);
    }
  };

  useEffect(() => {
    fetchProjects();
    fetchEmployees();
  }, []);

  // Handle Timer Start
  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        setTimer(prev => prev + 1);
        console.log("Timer:", timer);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  const handleStartProject = () => {
    setIsRunning(!isRunning);
    setShowDropdown(prev => !prev);
  };

  const showModifyModal = (e) => {
    const empCard = e.target;
    alert(empCard);
  };

 

  console.log(employees);
  return (
    <div className="min-h-full">
      <div className="w-full md:w-screen bg-[#0C1B33]">
        <Navbar />
      </div>

      


      <main className="border border-red-100 h-full flex justify-evenly">
        <TaskModal projects={projects} isVisible={true} />
        {/* <section className='flex flex-col gap-4 justify-between items-center  w-1/4  rounded-lg h-3/4 bg-white'>
          <div className='flex flex-col gap-2'>
            <h1 className='text-3xl font-bold'>Start a Task</h1>
            <p className='text-gray-500'>Start a task for today</p>
            <button className='bg-[#0C1B33] text-white p-2 rounded-md' onClick={handleStartProject}>Start Project</button>    
          </div>
          <div className='flex flex-col gap-2'>
            <div id="filter" className='flex flex-col gap-2'>
              <h2>Filter by</h2>
              <label htmlFor="all">All</label>
              <input type='radio' id='all' name='filter' value='all' className='text-black' />All
            </div>
          </div>

        </section> */}
      <CreateModal />


        <div className="flex wrapper items-center justify-center w-full">
          <div className="grid grid-cols-3 mx-auto w-3/4">
            {employees.length > 0 ? (
              employees.map((emp, index) => (
                <EmployeeCard
                  key={index}
                  id={emp.name}
                  name={emp.name}
                  email={emp.email}
                  phone={emp.phone}
                  position={emp.position}
                  team={emp.team}
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
  );
};

export default Home;
