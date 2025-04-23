import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EmployeeCard from '../components/EmployeeCard';
import Navbar from '../components/Navbar';
import CreateModal from '../components/CreateModal';
import ModifyEmployee from '../components/ModifyEmployee'; // Placeholder
import TableData from '../components/TableData'; // Placeholder

const Home = () => {
  const [user, setUser] = useState({});
  const [employees, setEmployees] = useState([]);
  const [projects, setProjects] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [timer, setTimer] = useState(0);

  // Fetch Projects
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

  const showCreateModal = () => {
    const modal = document.getElementById('createModal');
    if (modal) modal.style.display = 'block'; // Ideally use useRef or state
  };

  return (
    <div className="min-h-full">
      <div className="w-full md:w-screen bg-[#0C1B33]">
        <Navbar />
      </div>

      <div id="menu">
        <div id="btnContainer" className="flex justify-start ml-20 sm:ml-10">
          <button
            onClick={handleStartProject}
            className="card-title text-2xl font-bold text-indigo-600 uppercase bg-amber-300 p-5 m-5 rounded-lg"
          >
            Start project
          </button>
        </div>

        {showDropdown && (
          <div className="flex z-10 justify-center items-center px-3 p-5 my-5 text-lg">
            <select className="bg-teal-200 rounded-md p-3 font-bold">
              <option value="Select a Project">Select a Project</option>
              {projects.map(project => (
                <option key={project.id} value={project.name}>
                  {project.name}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      <div className="container sm:w-full mb-5 py-4 mx-auto flex justify-between bg-white mt-5 rounded-sm">
        <div className="flex justify-center items-center gap-4 sm:gap-1">
          <svg className="w-4 h-4 text-gray-500" viewBox="0 0 20 20">
            <path d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" stroke="currentColor" strokeWidth="2" fill="none" />
          </svg>
          <input type="search" placeholder="Search" className="block w-full sm:w-1/2 outline outline-red-500" />
        </div>

        <div className="flex justify-center items-center pr-3 sm:pr-4 gap-4 sm:gap-2 uppercase text-sm text-center">
          <h1 onClick={showCreateModal}>Add a new employee</h1>
          <h1>Modify an employee</h1>
        </div>
      </div>

      <CreateModal />

      <main className="border border-red-100 h-full">
        <div className="flex justify-center mx-auto w-full">
          {/* Placeholder for table: <TableData data={employees}/> */}
        </div>

        <div className="flex wrapper items-center justify-center w-full">
          <div className="grid grid-cols-3 mx-auto w-3/4">
            {employees.length > 0 ? (
              employees.map((emp, index) => (
                <EmployeeCard
                  key={index}
                  id={emp.name}
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
  );
};

export default Home;
