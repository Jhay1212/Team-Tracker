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

    <div className='card modal rounded-[10px] m-2 bg-transparent p-4 w-1/2 h-100' >

            <legend className='text-2xl'>Create Employee</legend>

            <div className='border border-black  bg-amber-200 mt-1 p-4 rounded-md' >
                <form className='flex flex-col gap-2 flex-wrap' onSubmit={handdleSubmit} method='post'>
                    <div className='flex justify-between gap-4'>
                        
                        <input
                        placeholder='Name'
                        
                        onChange={handleChange}
                        className='py-2.5 px-2 w-full text-sm text-gray bg-transparent boder-0 border-b-2 appearance-none
                        ' type="text" name="name" id="name" />

                        <input
                        placeholder='Email'
                        onChange={handleChange}
                        className='block py-2.5 px-0 w-full text-sm text-gray bg-transparent boder-0 
                        border-b-2 appearance-none' type="email" name="email" id="email" />
                    </div>
                    <div className='flex justify-evenly my-5 `gap-2'>
                        <input
                        placeholder='Gender'
                        onChange={handleChange}
                        className='py-2.5 px-2 w-full text-sm text-gray bg-transparent boder-0 border-b-2 
                        appearance-none' type="email" name="gender" id="gender" />
                        <input
                        placeholder='Phone Number'
                        onChange={handleChange}
                        className=' py-2.5 px-2 w-full text-sm text-gray bg-transparent boder-0 border-b-2 
                        appearance-none' type="text" name="phone" id="phone" />
                    </div>
                  
                 
                    <div className='flex justify-between gap-2'>
                        <input
                        placeholder='Department'
                        onChange={handleChange}
                        className='block py-2.5 px-2 w-full text-sm text-gray bg-transparent boder-0  border-b-2 
                        appearance-none' type="text" name="department" id="department" />
                          <input 
                        placeholder='Position'
                        onChange={handleChange}
                        className= 'py-2.5 px-2 w-full text-sm text-gray bg-transparent boder-0 border-b-2 appearance-none'
                         type="text" name="position" id="position" />
                    </div>
                  
                    <div className='flex flex-col gap-2 mb-4'>  
                        <label htmlFor='team'>Team</label>
                        <select id="team" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                          {teams.map((team, index) => (
                              <option key={team.id} value={team.name}>{team.name}</option>
                          ))}
                        </select>

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