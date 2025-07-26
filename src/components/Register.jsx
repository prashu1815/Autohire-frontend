import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../Styles/Register.css';
import Navbar from './Navbar';
import axios from 'axios';

function Register() {
  const [formData, setFormData] = useState({
    name: '',       // ✅ This should match input name
    email: '',
    password: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        'https://autohire-backend-exdn.onrender.com/auth/register',
        formData
      );

      alert('Registration successful!');
      navigate('/login');
    } catch (error) {
      if (error.response) {
        alert('Registration failed: ' + (error.response.data.message || 'Please try again.'));
      } else {
        alert('Server error. Please try again later.');
      }
    }
  };

  return (
    <>
      <div className="sunset-register-page">
        <div className="sunset-card">
          <h2>Join AutoHire</h2>
          <p className="tagline">Drive your dream, start your journey.</p>
          <input
            type="text"
            name="name" // ✅ Changed from uName to name
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
          />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
          />
          <button className="sunset-btn" onClick={handleSubmit}>
            Register
          </button>
          <p className="sunset-login-link">
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </div>
      </div>
    </>
  );
}

export default Register;
