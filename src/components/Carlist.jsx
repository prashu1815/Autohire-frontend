import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../Styles/CarList.css';

function CarList() {
  const [cars, setCars] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("currentUser"));
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login to view available cars.");
      navigate('/login');
      return;
    }

    axios.get('https://autohire-backend-exdn.onrender.com/cars', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then((res) => {
        setCars(res.data);
      })
      .catch((err) => {
        console.error('Error fetching cars:', err);
        if (err.response?.status === 403 || err.response?.status === 401) {
          alert("Unauthorized access. Please login again.");
          localStorage.removeItem("currentUser");
          navigate('/login');
        } else {
          alert("Failed to load cars. Try again later.");
        }
      });
  }, [navigate]);

  // ✅ Define the missing function
  const handleViewDetails = (id) => {
    navigate(`/car/${id}`);
  };

  return (
    <div className="car-list">
      {cars.map(car => (
        <div className="car-card" key={car.carId}>
          <div className="car-image-wrapper">
            <img src={car.imageUrl} alt={car.model} />
          </div>
          <div className="car-content">
            <h3>{car.brand} {car.model}</h3>
            <p className="car-type">{car.type} • {car.fuelType} • {car.transmission}</p>
            <p className="car-info">
              Seats: {car.seats} | Mileage: {car.mileage} kmpl | Year: {car.year}
            </p>
            <p className="price">₹{car.pricePerDay}/day</p>
            <button
              disabled={!car.availability}
              className="book-btn"
              onClick={() => handleViewDetails(car.carId)}
            >
              {car.availability ? 'View Details' : 'Not Available'}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default CarList;
