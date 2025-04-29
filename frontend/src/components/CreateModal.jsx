import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import hidden from '../assets/hidden.png';
import eye from '../assets/eye.png';

const CreateModal = ({ onClose }) => {
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const [teams, setTeams] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    team: '',
    position: ''
  });

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/teams/');
        setTeams(response.data.results);
      } catch (error) {
        console.error('Error fetching teams:', error.message);
      }
    };
    fetchTeams();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8000/api/employees/', formData);
      alert('Employee created successfully!');
      if (onClose) onClose();
    } catch (error) {
      if (error.response) {
        console.error("Server error:", error.response.data);
        alert(JSON.stringify(error.response.data));
      } else if (error.request) {
        console.error("No response received");
      } else {
        console.error("Request error:", error.message);
      }
    }
  };

  const toggleVisibility = () => {
    setPasswordVisibility((prev) => !prev);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, display: 'none' }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50"
    >
      <div className="bg-white rounded-xl shadow-xl p-8 w-full max-w-2xl relative">
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-red-600 text-2xl font-bold"
        >
          &times;
        </button>

        <h2 className="text-3xl font-extrabold text-center text-indigo-600 mb-6">Create Employee</h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          {/* Name & Email */}
          <div className="flex flex-col md:flex-row gap-4">
            <input
              placeholder="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="flex-1 border-b-2 p-2 focus:outline-none"
              type="text"
            />
            <input
              placeholder="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="flex-1 border-b-2 p-2 focus:outline-none"
              type="email"
            />
          </div>

          {/* Password with Eye */}
          <div className="relative">
            <input
              name="password"
              type={passwordVisibility ? 'text' : 'password'}
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full border-b-2 p-2 pr-12 focus:outline-none"
            />
            <img
              src={passwordVisibility ? eye : hidden}
              alt="Toggle Password Visibility"
              onClick={toggleVisibility}
              className="w-6 h-6 absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer"
            />
          </div>

          {/* Phone */}
          <input
            placeholder="Phone Number"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="border-b-2 p-2 focus:outline-none"
            type="text"
          />

          {/* Position */}
          <input
            placeholder="Position"
            name="position"
            value={formData.position}
            onChange={handleChange}
            className="border-b-2 p-2 focus:outline-none"
            type="text"
          />

          {/* Team Select */}
          <div className="flex flex-col">
            <label htmlFor="team" className="text-sm font-semibold mb-1">Team</label>
            <select
              id="team"
              name="team"
              value={formData.team}
              onChange={handleChange}
              className="p-2 border rounded-md focus:ring focus:border-blue-300"
            >
              <option value="">Select a team</option>
              {teams.map((team) => (
                <option key={team.id} value={team.id}>
                  {team.name}
                </option>
              ))}
            </select>
          </div>

          {/* Submit Button */}
          <div className="flex justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="bg-cyan-700 hover:bg-cyan-800 text-white font-bold py-2 px-6 rounded-lg shadow-md"
            >
              Create
            </motion.button>
          </div>
        </form>
      </div>
    </motion.div>
  );
};

export default CreateModal;
