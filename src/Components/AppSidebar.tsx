import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import './AppSidebar.scss';
import logo from './logo.png'; // Ensure the logo path is correct
import { auth } from '../FirebaseConfig'; // Import Firebase auth
import { MdDashboard } from 'react-icons/md'; // Dashboard icon
import { IoMdCreate } from 'react-icons/io'; // Form icon
import { FiLogOut } from 'react-icons/fi'; // Logout icon

const Sidebar: React.FC = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth); // Sign out from Firebase
      navigate('/login'); // Redirect to the login page
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  useEffect(() => {
    const checkScreenSize = () => {
      setIsSmallScreen(window.innerWidth <= 785);
    };
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => {
      window.removeEventListener('resize', checkScreenSize);
    };
  }, []);

  return (
    <div className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-header">
        <img
          src={logo}
          alt="Logo"
          className="logo"
        />
        <button className="collapse-button" onClick={toggleSidebar}>
          {isCollapsed ? '>' : '<'}
        </button>
      </div>
      <div className="sidebar-menu">
        <ul>
          <li>
            <NavLink
              to="/dashboard2"
              className={({ isActive }) => (isActive ? 'menu-item active' : 'menu-item')}
            >
              <MdDashboard className="icon" />
              <span>Dashboard</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/churn-prediction-form"
              className={({ isActive }) => (isActive ? 'menu-item active' : 'menu-item')}
            >
              <IoMdCreate className="icon" />
              <span>Churn Prediction Form</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/clv-prediction-form"
              className={({ isActive }) => (isActive ? 'menu-item active' : 'menu-item')}
            >
              <IoMdCreate className="icon" />
              <span>CLV Prediction Form</span>
            </NavLink>
          </li>
        </ul>
      </div>
      {/* Logout button at the bottom */}
      <div className="sidebar-footer">
        <button className="logout-button" onClick={handleLogout}>
          <FiLogOut className="icon" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
