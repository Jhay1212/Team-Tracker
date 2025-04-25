import React from 'react';
import axios from 'axios';
import {useState, useEffect, useRef } from 'react';
import { Link } from 'react-router'
const RegisterForm = () => {
    const [user, setUser] = useState({
      username: '',
      email: '',
      password: ''
    });
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setUser((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      const updatedUser = {...user };
      try {
        await axios.post('http://localhost:8000/api/auth/register/', updatedUser);
        alert('Registration Successfully');
        localStorage.setItem('user', JSON.stringify(updatedUser));
      }catch(err) {
        console.log(err);
        alert(err)
      }
    }
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
    <div className="w-full max-w-md  rounded-2xl shadow-xl p-8 bg-white">
      <h2 className="text-3xl font-bold text-center text-indigo-600 mb-6">Register</h2>
      
      <form className="space-y-5" onSubmit={handleSubmit}>
        
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">Username</label>
          <input
            type="text"
            name='username'
            value={user.username}
            onChange={handleChange}
            placeholder="Username"
            className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
          />
        </div>
  <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            name='email'
            value={user.email}
            onChange={handleChange}
            placeholder="Email"
            className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
          />
        </div>
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">Password</label>
          <input
          value={user.password}
          name='password'
            type="password"
            onChange={handleChange}
            placeholder="Enter your password"
            className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 rounded-xl font-semibold hover:bg-indigo-700 transition"
        >
          Sign Up
        </button>

        <div className="text-center mt-4 text-sm text-gray-500">
          Have an account? <Link to="/login" className="text-indigo-600 hover:underline">Sign in</Link>
        </div>
      </form>
    </div>
  </div>
  )
}

export default RegisterForm