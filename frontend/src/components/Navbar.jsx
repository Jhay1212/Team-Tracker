import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const username = user?.username || '';

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  return (
    <header className="w-full bg-[#0C1B33] flex items-center py-3 sticky top-0 z-50 shadow-md h-[15vh]">
      <nav className="container mx-auto flex flex-wrap justify-between items-center px-4 text-white text-md font-semibold">

        {/* Left: Navigation Links */}
        <ul className="flex items-center space-x-6">
          <li>
            <Link to="/" className="hover:underline">Home</Link>
          </li>
          <li>
            <Link to="/dashboard" className="hover:underline">Dashboard</Link>
          </li>
        </ul>

        {/* Right: User Actions */}
        <ul className="flex items-center space-x-6 uppercase">
          {localStorage.getItem('token') ? (
            <>
              <li className="text-indigo-200 font-bold">{username}</li>
              {/* You can later add a profile link here */}
              <li>
                <button type='button' onClick={logout} className="hover:underline">Logout</button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/login" className="hover:underline">Login</Link>
              </li>
              <li>
                <Link to="/signup" className="hover:underline">Register</Link>
              </li>
            </>
          )}
        </ul>

      </nav>
    </header>
  );
};

export default Navbar;
