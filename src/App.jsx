import './App.css';
import Homepage from './components/Homepage';
import Navbar from './components/Navbar';
import Register from './components/Register';
import Login from './components/Login';
import CarList from './components/Carlist';
import CarDetails from './components/CarDetails';
import Bookings from './components/Bookings';
import UserPage from './components/User';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  const user = JSON.parse(localStorage.getItem("currentUser"));

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/cars" element={<CarList />} />
        <Route path="/car/:id" element={<CarDetails />} />
        <Route path="/bookings" element={<Bookings userId={user?.id} />} />
        <Route path="/user" element={<UserPage/>} />
      </Routes>
    </Router>
  );
}

export default App;
