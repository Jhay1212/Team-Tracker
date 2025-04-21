import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import hidden from '../assets/hidden.png';
import eye from '../assets/eye.png';

const CreateModal = () => {
  const [passwordVisibility, setPasswordVisibility] = useState(false);

  const [teams, setTeams] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    department: '',
    team: '',
    gender: '',
    position: ''
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/teams/');
        setTeams(response.data.results);
      } catch (error) {
        console.log('error', error.message);
      }
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8000/api/employees/', formData);
      alert('Success');
    } catch (error) {
      if (error.response) {
        console.log("Server responded with status:", error.response.status);
        console.log("Data:", { ...error.response.data });
        alert(JSON.stringify(error.response.data));
      } else if (error.request) {
        console.log("No response received:", error.request);
      } else {
        console.log("Error setting up request:", error.message);
      }
    }
  };

  const toggleVisibility = (e) => {
    e.preventDefault();
    setPasswordVisibility((prev) => !prev);
  };

  return (
    <div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className='none card modal rounded-[10px] mx-auto m-2 bg-transparent p-4 w-1/2 h-100 relative'
      id='createModal'
      type='button'
    >
      <div className='border border-black bg-amber-200 mt-1 p-4 rounded-md'>
      <legend className='text-2xl text-indigo-600 text-center font-extrabold'>Create Employee</legend>
      <span className='flex justify-end text-5xl text-red-600 font-extrabold'>X</span>
        <form onSubmit={handleSubmit} className='flex flex-col gap-2 flex-wrap'  method='post'>
          <div className='flex justify-between gap-4'>
            <input
              placeholder='Name'
              name='name'
              value={formData.name}
              onChange={handleChange}
              className='py-2.5 px-2 md:w-1/2 w-full text-sm text-gray bg-transparent border-b-2 appearance-none'
              type="text"
              id="name"
            />

            <input
              placeholder='Email'
              name='email'
              value={formData.email}
              onChange={handleChange}
              className='py-2.5 px-2 w-full text-sm text-gray bg-transparent border-b-2 appearance-none'
              type="email"
              id="email"
            />
          </div>

          <div className='flex between my-5 gap-2'>
            <input
              name='password'
              type={passwordVisibility ? 'text' : 'password'}
              id='password'
              placeholder='Password'
              value={formData.password}
              onChange={handleChange}
              className='py-2.5 px-2 block sm:w-1/2 w-full text-sm text-gray bg-transparent border-b-2 appearance-none'
            />
            <img
              src={passwordVisibility ? eye : hidden}
              alt='Toggle Password'
              className='w-10 h-10 rounded-full cursor-pointer'
              onClick={toggleVisibility}
            />
          </div>

          <div className='flex between my-5 gap-2'>
            <input
              placeholder='Gender'
              name='gender'
              value={formData.gender}
              onChange={handleChange}
              className='py-2.5 px-2 md:w-1/2 w-full text-sm text-gray bg-transparent border-b-2 appearance-none'
              type="text"
              id="gender"
            />
            <input
              placeholder='Phone Number'
              name='phone'
              value={formData.phone}
              onChange={handleChange}
              className='py-2.5 px-2 w-full text-sm text-gray bg-transparent border-b-2 appearance-none'
              type="text"
              id="phone"
            />
          </div>

          <div className='flex justify-between gap-2'>
            <input
              placeholder='Department'
              name='department'
              value={formData.department}
              onChange={handleChange}
              className='py-2.5 px-2 w-full text-sm text-gray bg-transparent border-b-2 appearance-none'
              type="text"
              id="department"
            />
            <input
              placeholder='Position'
              name='position'
              value={formData.position}
              onChange={handleChange}
              className='py-2.5 px-2 w-full text-sm text-gray bg-transparent border-b-2 appearance-none'
              type="text"
              id="position"
            />
          </div>

          <div className='flex flex-col gap-2 mb-4'>
            <label htmlFor='team'>Team</label>
            <select
              id="team"
              name="team"
              value={formData.team.id}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option value="">Select a team</option>
              {teams.map((team) => (
                <option key={team.id} value={team.id}>{team.name}</option>
              ))}
            </select>
          </div>

          <div className='w-full flex justify-center'>
            <motion.button

              type='submit'   
              className='bg-cyan-700 text-white font-extrabold  text-lg rounded-lg hover:bg-cyan-800 border border-cyan-200 px-3 py-2'
            >
              Create
            </motion.button>
            <button onClick={handleSubmit}>Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateModal;
