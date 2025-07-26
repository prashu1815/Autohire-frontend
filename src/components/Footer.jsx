import React from 'react'
import '../Styles/Footer.css';

function Footer() {
  return (
     <footer className="footer">
      <div className="footer-container">
        
        {/* About */}
        <div className="footer-column">
          <h2 className="footer-title">AutoHire</h2>
          <p className="footer-text">
            Driven by passion, powered by technology. AutoHire is your smart car rental partner. Smooth rides, anytime, anywhere.
          </p>
        </div>

        {/* Services */}
        <div className="footer-column">
          <h3 className="footer-subtitle">Services</h3>
          <ul className="footer-links">
            <li><a href="/cars">Browse Cars</a></li>
            <li><a href="/bookings">Booking Process</a></li>
            <li><a href="/offers">Offers & Discounts</a></li>
            <li><a href="/faq">FAQs</a></li>
          </ul>
        </div>

        {/* Company */}
        <div className="footer-column">
          <h3 className="footer-subtitle">Company</h3>
          <ul className="footer-links">
            <li><a href="/about">About Us</a></li>
            <li><a href="/contact">Contact</a></li>
            <li><a href="/pricing">Pricing</a></li>
            <li><a href="/terms">Terms of Service</a></li>
            <li><a href="/privacy">Privacy Policy</a></li>
          </ul>
        </div>

        {/* Newsletter */}
        <div className="footer-column">
          <h3 className="footer-subtitle">Stay Connected</h3>
          <p className="footer-text">Get the latest updates & offers:</p>
          <form className="footer-form">
            <input type="email" placeholder="Your email" />
            <button type="submit">Subscribe</button>
          </form>
        </div>

      </div>

      {/* Bottom Text */}
      <div className="footer-bottom">
        © 2025 AutoHire Technologies Pvt. Ltd. — Your ride, redefined.
      </div>
    </footer>
  )
}

export default Footer
