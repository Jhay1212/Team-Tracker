import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import {motion} from 'framer-motion'



const CreateModal = () => {

    const [teams, setTeams] = useState([])
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        department: '',
        team: ''
    });

    

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      };
    const handdleSubmit = async (e) => {
        e.preventDefault();

        
        const updatedFormData = {...formData };
         try{ 
            await axios.post('http://localhost:8000/api/employees/', updatedFormData);
            alert('Success')
         }catch(error){
            if (error.response) {
                console.log("Server responded with status:", error.response.status);
                console.log("Data:", error.response.data);
            } else if (error.request) {
                console.log("No response received:", error.request);
            } else {
                console.log("Error setting up request:", error.message);
            }
         }
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/teams/');
                // alert('fetched');
                setTeams(response.data.results);
                // console.log(response.data.results);
            } catch (error) {
                console.log('error', error.message);
            }
        };
    
        fetchData()
    }, []);

    // console.log(teams)

  return (

    <div className='card modal rounded-[10px] m-2 bg-transparent p-4 w-1/2' >

            <legend className='text-2xl'>Create Employee</legend>

            <div className='border border-black  bg-amber-200 mt-1 p-4'>
                <form className='flex flex-col gap-2 flex-wrap' onSubmit={handdleSubmit} method='post'>
                    <div className='flex flex-col gap-2'>
                        <label htmlFor="name">Name</label>
                        <input
                        onChange={handleChange}
                        className='block py-2.5 px-0 w-full text-sm text-gray bg-transparent boder-0 border-b-2 appearance-none' type="text" name="name" id="name" />
                    </div>
                    <div className='flex flex-col gap-2'>
                        <label htmlFor="email">Email</label>
                        <input
                        onChange={handleChange}
                        className='block py-2.5 px-0 w-full text-sm text-gray bg-transparent boder-0 border-b-2 appearance-none' type="email" name="email" id="email" />
                    </div>
                    <div className='flex flex-col gap-2'>
                        <label htmlFor="genderl">Gender</label>
                        <input
                        onChange={handleChange}
                        className='block py-2.5 px-0 w-full text-sm text-gray bg-transparent boder-0 border-b-2 appearance-none' type="email" name="gender" id="gender" />
                    </div>
                    <div className='flex flex-col gap-2'>    
                        <label htmlFor="phone">Phone</label>
                        <input
                        onChange={handleChange}
                        className='block py-2.5 px-0 w-full text-sm text-gray bg-transparent boder-0 border-b-2 appearance-none' type="text" name="phone" id="phone" />
                    </div>
                 
                    <div className='flex flex-col gap-2'>
                        <label htmlFor="department">Department</label>
                        <input
                        onChange={handleChange}
                        className='block py-2.5 px-0 w-full text-sm text-gray bg-transparent boder-0  border-b-2 appearance-none' type="text" name="department" id="department" />
                    </div>
                    <div className='flex flex-col gap-2 mb-4'>  
                        <label htmlFor='position'>position</label>
                        <input 
                        onChange={handleChange}
                        className='block py-2.5 px-0 w-full text-sm text-gray bg-transparent boder-0 border-b-2 appearance-none' type="text" name="position" id="position" />
                    </div>
                    <div className='flex flex-col gap-2 mb-4'>  
                        <label htmlFor='team'>Team</label>
                       <button
  id="dropDownDefaultButton"
  data-dropdown-toggle="dropdown"
  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 
             focus:outline-none focus:ring-blue-300 font-medium 
             rounded-lg text-sm px-5 py-2.5 text-center inline-flex 
             items-center dark:bg-blue-600 dark:hover:bg-blue-700 
             dark:focus:ring-blue-800"
  type="button"
>
  <svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
  </svg>
  <span className="text-sm px-2">Select Team</span>
</button>

<div
  id="dropdown"
  className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
>
  <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropDownDefaultButton">
    <li>sadasd</li>
    {teams.map((team) => (
      <li key={team.id}>
        <a
          href="#"
          className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
        >
          {team.name}
        </a>
      </li>
    ))}
  </ul>
</div>

                    </div>
                    </form>


                <div className='w-full flex justify-center '> 

            <motion.button
            
            whileHover={{scale: 1.1}}
            whileTap={{scale: 0.9}}
            className='btn border-t-cyan-700 px-3 py-2'
            onClick={handdleSubmit}
            >Create</motion.button>
                </div>
            </div>

        </div>
  )
}

export default CreateModal