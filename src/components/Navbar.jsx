import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import '../Styles/Navbar.css';

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-logo" onClick={closeMenu}>
        <b>AUTOHIRE</b>
      </Link>

      <div className={`navbar-menu ${isOpen ? 'active' : ''}`}>
        <Link to="/" onClick={closeMenu}>Home</Link>
        <Link to="/cars" onClick={closeMenu}>Cars</Link>
        <Link to="/bookings" onClick={closeMenu}>Bookings</Link>
        {isLoggedIn ? (
          <Link to="/user" onClick={closeMenu}>User</Link>
        ) : (
          <Link to="/login" onClick={closeMenu}>Login</Link>
        )}
      </div>

    
    </nav>
  );
}

export default Navbar;
