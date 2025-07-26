import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../Styles/Bookings.css';

function Bookings() {
  const [confirmed, setConfirmed] = useState([]);
  const [pending, setPending] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("currentUser");

    let user;
    try {
      user = JSON.parse(userData);
    } catch (e) {
      console.warn("Error parsing user data:", e);
      user = null;
    }

    if (!user || !token) {
      alert("Please login to view your bookings.");
      navigate('/login');
      return;
    }

    const userId = user.id;

    axios.get(`https://autohire-backend-exdn.onrender.com/bookings/user/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => {
        const allBookings = res.data;
        setConfirmed(allBookings.filter(b => b.status?.toUpperCase() === 'CONFIRMED'));
        setPending(allBookings.filter(b => b.status?.toUpperCase() === 'PENDING'));
      })
      .catch(err => {
        console.error('❌ Error fetching bookings:', err);
        if (err.response?.status === 403 || err.response?.status === 401) {
          alert("Session expired or unauthorized. Please login again.");
          localStorage.removeItem("currentUser");
          localStorage.removeItem("token");
          navigate('/login');
        } else {
          alert("Failed to load bookings. Try again later.");
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, [navigate]);

  if (loading) return <div className="user-bookings">Loading your bookings...</div>;

  return (
    <div className="user-bookings">
      <h2>My Bookings</h2>

      <div className="booking-columns">
        <div className="booking-column">
          <h3>✅ Confirmed Bookings</h3>
          <ul>
            {confirmed.length === 0 ? (
              <li>No confirmed bookings</li>
            ) : (
              confirmed.map(b => (
                <li key={b.bookingId} className="booking-item">
                  {b.car?.imageUrl && (
                    <img src={b.car.imageUrl} alt={b.car.model} />
                  )}
                  <div className="booking-details">
                    <h4>{b.car ? `${b.car.brand} ${b.car.model}` : 'Car info not available'}</h4>
                    <p><strong>Booking Dates:</strong> {new Date(b.startDate).toLocaleDateString()} ➡ {new Date(b.endDate).toLocaleDateString()}</p>
                    <p><strong>Type:</strong> {b.car?.type}</p>
                    <p><strong>Fuel:</strong> {b.car?.fuelType}</p>
                    <p><strong>Seats:</strong> {b.car?.seats}</p>
                    <p><strong>Transmission:</strong> {b.car?.transmission}</p>
                    <p><strong>Price/Day:</strong> ₹{b.car?.pricePerDay}</p>
                    <p><strong>Total:</strong> ₹{b.totalPrice}</p>
                  </div>
                </li>
              ))
            )}
          </ul>
        </div>

        <div className="booking-column">
          <h3>⏳ Pending Bookings</h3>
          <ul>
            {pending.length === 0 ? (
              <li>No pending bookings</li>
            ) : (
              pending.map(b => (
                <li key={b.bookingId} className="booking-item">
                  {b.car?.imageUrl && (
                    <img src={b.car.imageUrl} alt={b.car.model} />
                  )}
                  <div className="booking-details">
                    <h4>{b.car ? `${b.car.brand} ${b.car.model}` : 'Car info not available'}</h4>
                    <p><strong>Booking Dates:</strong> {new Date(b.startDate).toLocaleDateString()} ➡ {new Date(b.endDate).toLocaleDateString()}</p>
                    <p><strong>Type:</strong> {b.car?.type}</p>
                    <p><strong>Fuel:</strong> {b.car?.fuelType}</p>
                    <p><strong>Seats:</strong> {b.car?.seats}</p>
                    <p><strong>Transmission:</strong> {b.car?.transmission}</p>
                    <p><strong>Price/Day:</strong> ₹{b.car?.pricePerDay}</p>
                    <p><strong>Total:</strong> ₹{b.totalPrice}</p>
                  </div>
                </li>
              ))
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Bookings;
