import React from 'react';
import '../Styles/Homepage.css';
import car from '../assets/car.png';
import Aboutus from './Aboutus';
import Collage from './Collage';
import Footer from './Footer';

function Homepage() {
  const monsterText = 'MONSTER';

  return (
    <>
      {/* Hero Section */}
      <div className="home-container">
        <div className="caption">
          <h1 className="ride">Ride Your</h1>
          <h1 className="monster">
            {monsterText.split('').map((char, index) => (
              <span key={index} style={{ '--i': index }}>{char}</span>
            ))}
          </h1>

          <div className="content">
            <h2>Unleash the Beast</h2>
            <p>
              Feel the raw power<br />
              Unmatched performance<br />
              Match Your Breath with our Monster<br />
              Not a machine but more than a machine, built for legends.
            </p>
          </div>
        </div>

        {/* Car Image */}
        <img src={car} alt="car" className="car-image" />

        {/* Smoke Animation */}
        <div className="smoke-wrapper">
          <div className="smoke smoke1"></div>
          <div className="smoke smoke2"></div>
        </div>
      </div>

      {/* Collage Section - outside of home-container */}
      <section className="collage-section">
        <Collage />
      </section>

      {/* About Us Section */}
      <section className="aboutus-section">
        <Aboutus />
      </section>
      <section>
        <Footer/>
      </section>
    </>
  );
}

export default Homepage;
