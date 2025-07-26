import React, { useState, useEffect } from 'react';
import '../Styles/User.css';
import { FaUserCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function UserPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    license: '',
    aadhar: '',
    pan: ''
  });

  // Load user info from localStorage on component mount
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    if (!user) {
      navigate('/login');
      return;
    }

    setFormData(prev => ({
      ...prev,
      name: user.name || '',
      email: user.email || '',
      phone: user.phone || ''
    }));
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleUpdate = async () => {
    const { email, license, aadhar, pan } = formData;

    try {
      const token = localStorage.getItem('token');

      const response = await axios.post(
        'http://localhost:1815/user/update',
        { email, license, aadhar, pan },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          }
        }
      );

      if (response.status === 200) {
        alert('Details updated successfully!');
      } else {
        alert('Failed to update details.');
      }
    } catch (err) {
      console.error(err);
      alert('Server error. Please try again later.');
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    sessionStorage.clear();
    navigate('/login');
  };

  return (
    <div className="user-page">
      <div className="user-box">
        <div className="icon-wrapper">
          <FaUserCircle size={80} color="#3b82f6" />
        </div>
        <div className="center-text"><strong>{formData.name}</strong></div>
        <div className="info-row">📧 Email: <span>{formData.email}</span></div>
        <div className="info-row">📞 Phone: <span>{formData.phone}</span></div>

        <div className="input-group">🔐 License:
          <input
            name="license"
            value={formData.license}
            onChange={handleChange}
            placeholder="Enter License No"
          />
        </div>

        <div className="input-group">🆔 Aadhar:
          <input
            name="aadhar"
            value={formData.aadhar}
            onChange={handleChange}
            placeholder="Enter Aadhar No"
          />
        </div>

        <div className="input-group">💳 PAN:
          <input
            name="pan"
            value={formData.pan}
            onChange={handleChange}
            placeholder="Enter PAN No"
          />
        </div>

        <div className="button-row">
          <button className="update-btn" onClick={handleUpdate}>Update</button>
          <button className="logout-btn" onClick={handleLogout}>Logout</button>
        </div>
      </div>
    </div>
  );
}

export default UserPage;
