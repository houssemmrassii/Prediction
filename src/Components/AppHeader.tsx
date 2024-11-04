import React, { useState, useEffect, useRef } from 'react';
import { FaSearch, FaBell, FaUserCircle, FaSignOutAlt } from 'react-icons/fa';
import './AppHeader.scss';
import { useNavigate } from 'react-router-dom';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../FirebaseConfig';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';

const Header: React.FC = () => {
  const navigate = useNavigate();
  const [unviewedCount, setUnviewedCount] = useState<number>(0);
  const [userName, setUserName] = useState<string | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const auth = getAuth();

  useEffect(() => {
    const fetchUnviewedNotifications = async () => {
      try {
        const q = query(collection(db, 'notif'), where('isViewed', '==', false));
        const querySnapshot = await getDocs(q);
        setUnviewedCount(querySnapshot.size);
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };

    fetchUnviewedNotifications();

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      user ? setUserName(user.displayName || 'User') : setUserName(null);
    });

    return () => unsubscribe();
  }, [auth]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsProfileDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const toggleSearch = () => setIsSearchOpen(!isSearchOpen);
  const toggleProfileDropdown = () => setIsProfileDropdownOpen(!isProfileDropdownOpen);

  return (
    <header className="header">
      <div className="header-left">
        {isSearchOpen ? (
          <div className="search-bar">
            <input type="text" placeholder="Recherchez ici..." />
            <FaSearch className="search-icon" onClick={toggleSearch} />
          </div>
        ) : (
          <FaSearch className="search-icon only" onClick={toggleSearch} />
        )}
      </div>

      <div className="header-right">
       

        <div className="profile-dropdown" ref={dropdownRef}>
          <div className="profile-link" onClick={toggleProfileDropdown}>
            <FaUserCircle className="header-icon admin-icon" />
            <span className="admin-name">{userName || 'Guest'}</span>
          </div>
          {isProfileDropdownOpen && (
            <div className="dropdown-menu">
              <a href="#" className="dropdown-item">
                <FaUserCircle size={20} className="dropdown-icon" />
                <span>Compte</span>
              </a>
            </div>
          )}
        </div>

        <div className="logout-wrapper">
          <FaSignOutAlt className="header-icon logout-icon" onClick={handleLogout} />
        </div>
      </div>
    </header>
  );
};

export default Header;
