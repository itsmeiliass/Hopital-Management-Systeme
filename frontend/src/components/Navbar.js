// components/Navbar.js
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="navbar">
      <div className="nav-container">
        <h2 className="nav-logo">Hospital Management</h2>
        <ul className="nav-menu">
          <li className="nav-item">
            <Link 
              to="/dashboard" 
              className={`nav-link ${location.pathname === '/dashboard' ? 'active' : ''}`}
            >
              Dashboard
            </Link>
          </li>
          <li className="nav-item">
            <Link 
              to="/patients" 
              className={`nav-link ${location.pathname.startsWith('/patients') ? 'active' : ''}`}
            >
              Patients
            </Link>
          </li>

           <li className="nav-item">
            <Link 
              to="/doctors" 
              className={`nav-link ${location.pathname.startsWith('/doctors') ? 'active' : ''}`}
            >
              Doctors
            </Link>
          </li>
          <li className="nav-item"></li>


          <li className="nav-item">
            <Link 
              to="/rooms" 
              className={`nav-link ${location.pathname.startsWith('/rooms') ? 'active' : ''}`}
            >
              Rooms
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;