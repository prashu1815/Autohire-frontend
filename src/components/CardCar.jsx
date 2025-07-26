import { useNavigate } from 'react-router-dom';
import './CarCard.css'; // optional if you want to style each card

function CarCard({ car }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/car/${car.carId}`);
  };

  return (
    <div className="car-card" onClick={handleClick}>
      <img src={car.imageUrl} alt={car.model} />
      <h3>{car.brand} {car.model}</h3>
      <p>{car.type} | ₹{car.pricePerDay}/day</p>
    </div>
  );
}

export default CarCard;
