import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';
const LoginForm = () => {
  const [user, setUser] = useState({
    username: '',
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
      await axios.post('http://localhost:8000/api/auth/login/', updatedUser);
      alert('Login Successfully');
      localStorage.setItem('user', JSON.stringify(updatedUser));
      
      return window.location.href = '/';
    }catch(err) {
      console.log(err);
      alert(err.message )
    }
}
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-indigo-200 px-4">
    <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
      <h2 className="text-3xl font-bold text-center text-indigo-600 mb-6">Login</h2>
      
      <form className="space-y-5" onSubmit={handleSubmit}>
        
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">Username</label>
          <input
            type="text"
            value={user.username}
            name='username'
            onChange={handleChange}
            placeholder="Username"
            className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">Password</label>
          <input
          value={user.password}
            type="password"
            name='password'
            onChange={handleChange}
            placeholder="Enter your password"
            className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 rounded-xl font-semibold hover:bg-indigo-700 transition"
        >
          Sign In
        </button>

        <div className="text-center mt-4 text-sm text-gray-500">
          Don't have an account? <a href="#" className="text-indigo-600 hover:underline">Sign up</a>
        </div>
      </form>
    </div>
  </div>
  )
}

export default LoginForm