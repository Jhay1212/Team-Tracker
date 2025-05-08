import { useState, useRef} from 'react';
import { Link } from 'react-router-dom';
import home from '../assets/home-dark.svg';
import login from '../assets/login.png';
import loginDark from '../assets/loginDark.svg';
import dashboardDark from '../assets/dashboar-dark.svg';
import dashboard from '../assets/dashboard.png';
const Navbar = () => {
  const [isModalHidden, setIsModalHidden] = useState(true);
  const user_id = parseInt(localStorage.getItem('user_id'))|| '';
  const username = localStorage.getItem('username') || 'GUEST';

  const logout = () => {
    localStorage.removeItem('user_id');
    localStorage.removeItem('token');
    window.location.href = '/';
  }
  const toggleModal = () => {
    setIsModalHidden(previsModalHidden => !previsModalHidden);
  };
  

  return (

    <header className="w-full bg-[#0C1B33] flex items-center py-3 sticky top-0 z-50 shadow-md h-[15vh]">
      <nav className="container mx-auto flex flex-wrap justify-between items-center px-4 text-white text-md font-semibold">

        {/* Left: Navigation Links */}
        <ul className="flex items-center space-x-6">

          <li>
            <Link to="/" className="hover:underline gap-0 md:gap-1.5  flex justify-even items-center">
              <img src={home} alt="Home" className="block w-8 h-8" />
              <h2>Home</h2>
            </Link>
            </li>
          <li>
            <Link to="/dashboard" className="hover:underline flex justify-even items-center">
            <img src={dashboardDark} alt="Dashboard" className="block w-8 h-8" />
            <h2>Dashboard</h2>
            </Link>
          </li>
        </ul>

        {/* Right: User Actions */}
        <ul className="flex items-center space-x-6 uppercase">
          {localStorage.getItem('user_id') ? (
            <>
              <li className="text-indigo-200 font-bold">
                <Link to={`/employee/${user_id}`} className="hover:underline">
                {username}</Link></li>
              <li className="text-indigo-200 font-bold">
                <button onClick={toggleModal} className="hover:underline">
                Edit Employee Profile
                </button></li>

              {/* You can later add a profile link here */}
              <li>
                <button type='button' onClick={logout} className="hover:underline">Logout</button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/login" className="hover:underline flex justify-evenly gap-0 md:gap-2">
                  <img src={loginDark} alt="Login" className="block w-7 h-7" />
                  <h2>Login</h2>
                </Link>
              </li>
              <li>
                <Link to="/signup" className="hover:underline flex justify-evenly gap-0 md:gap-2">Register</Link>
              </li>
            </>
          )}
        </ul>

      </nav>
    </header>
  );
};

export default Navbar;
