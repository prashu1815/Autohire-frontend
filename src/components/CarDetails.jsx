import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from '../Styles/CarDetails.module.css';

function CarDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [car, setCar] = useState(null);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [userId, setUserId] = useState(null);
  const [bookingLoading, setBookingLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false); // 🆕 success state

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please log in to view car details.");
      navigate("/login");
      return;
    }

    axios.get(`http://localhost:1815/cars/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(res => setCar(res.data))
    .catch(err => {
      console.error('Error fetching car details:', err);
      if (err.response?.status === 403 || err.response?.status === 401) {
        alert("Session expired. Please log in again.");
        navigate("/login");
      }
    });

    const user = JSON.parse(localStorage.getItem("currentUser"));
    if (user) {
      setUserId(user.id);
    }
  }, [id, navigate]);

  const handleBooking = () => {
    if (!userId) {
      alert("Please log in to book a car.");
      navigate("/login");
      return;
    }

    if (!car?.id && !car?.carId) {
      alert("Car ID not found.");
      return;
    }

    if (!startDate || !endDate) {
      alert("Please select both start and end dates.");
      return;
    }

    const bookingPayload = {
      carId: car.id || car.carId,
      userId,
      startDate,
      endDate
    };

    const token = localStorage.getItem("token");
    setBookingLoading(true);

    axios.post("https://autohire-backend-exdn.onrender.com/bookings", bookingPayload, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(() => {
      setShowSuccess(true); // ✅ show popup
      setTimeout(() => {
        navigate("/bookings"); // redirect after 2s
      }, 2000);
    })
    .catch(err => {
      console.error(err);
      alert("Booking failed: " + (err.response?.data?.message || "Server error"));
    })
    .finally(() => {
      setBookingLoading(false);
    });
  };

  if (!car) return <div className={styles.loading}>Loading car details...</div>;

  return (
    <div className={styles.carDetailsWrapper}>
      <div className={styles.carDetailsCard}>
        <div className={styles.carInfoSection}>
          <h2 className={styles.carTitle}>{car.brand} {car.model} ({car.year})</h2>
          <div className={styles.carAttributes}>
            <p><b>Type:</b> {car.type}</p>
            <p><b>Fuel:</b> {car.fuelType}</p>
            <p><b>Transmission:</b> {car.transmission}</p>
            <p><b>Seats:</b> {car.seats}</p>
            <p><b>Mileage:</b> {car.mileage} kmpl</p>
          </div>

          <div className={styles.carPriceStatus}>
            <p className={styles.price}>₹{car.pricePerDay} / day</p>
            <p className={`${styles.status} ${car.availability ? '' : styles.notAvailable}`}>
              {car.availability ? 'Available for Booking' : 'Currently Unavailable'}
            </p>
          </div>

          {car.availability && (
            <div className={styles.bookingSection}>
              <div className={styles.dateInputsRow}>
                <div className={styles.inputGroup}>
                  <label>Start Date:</label>
                  <input
                    type="date"
                    value={startDate}
                    onChange={e => setStartDate(e.target.value)}
                  />
                </div>
                <div className={styles.inputGroup}>
                  <label>End Date:</label>
                  <input
                    type="date"
                    value={endDate}
                    onChange={e => setEndDate(e.target.value)}
                  />
                </div>
              </div>

              <button
                className={styles.bookButton}
                onClick={handleBooking}
                disabled={bookingLoading}
              >
                {bookingLoading ? 'Booking...' : 'Book Now'}
              </button>
            </div>
          )}
        </div>

        <div className={styles.carImageSection}>
          <img src={car.imageUrl} alt={car.model} className={styles.carImage} />
        </div>
      </div>

      {/* ✅ Success Popup */}
      {showSuccess && (
        <div className={styles.successPopup}>
          <div className={styles.successBox}>
            ✅ Booking inProcess...
          </div>
        </div>
      )}
    </div>
  );
}

export default CarDetails;
