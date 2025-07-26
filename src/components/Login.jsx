import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../Styles/Login.css';
import Navbar from './Navbar';
import axios from 'axios';

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
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
        'https://autohire-backend-exdn.onrender.com/auth/login',
        formData
      );

      if (response.status === 200 && response.data.token) {
        alert('Login successful!');

        // ✅ Store token
        localStorage.setItem('token', response.data.token);

        // ✅ Store user in correct structure (your response has userId, name, email)
        const user = {
          id: response.data.userId,
          name: response.data.name,
          email: response.data.email
        };
        localStorage.setItem('currentUser', JSON.stringify(user));

        navigate('/');
      } else {
        alert('Login failed. Please check credentials.');
      }
    } catch (err) {
      console.error(err);
      alert('Invalid email or password. Try again.');
    }
  };

  return (
    <>
  
      <div className="login-page">
        <div className="login-box">
          <h2>Welcome Back</h2>
          <p className="subtitle">Login to AutoHire</p>
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
          <button className="login-btn" onClick={handleSubmit}>
            Login
          </button>
          <p className="register-link">
            Don't have an account? <Link to="/register">Register Now</Link>
          </p>
        </div>
      </div>
    </>
  );
}

export default Login;
