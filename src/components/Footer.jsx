import React from 'react';
import { Link } from 'react-router-dom';
import { restaurantInfo } from '../data/restaurantData';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-top">
          {/* Brand Info */}
          <div className="footer-brand">
            <Link to="/" className="footer-logo">
              <span className="logo-badge">FC</span>
              <span className="logo-main">FOUR CHAIRS</span>
            </Link>
            <p className="footer-tagline">{restaurantInfo.story.subtitle}</p>
            <div className="footer-socials">
              <a href="#instagram" target="_blank" rel="noreferrer" aria-label="Instagram">INSTAGRAM</a>
              <span className="social-sep">•</span>
              <a href="#facebook" target="_blank" rel="noreferrer" aria-label="Facebook">FACEBOOK</a>
              <span className="social-sep">•</span>
              <a href="#tripadvisor" target="_blank" rel="noreferrer" aria-label="Tripadvisor">TRIPADVISOR</a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-col">
            <h4 className="footer-col-title">NAVIGATION</h4>
            <ul className="footer-links">
              <li><Link to="/">Home Showcase</Link></li>
              <li><Link to="/about">Our Story &amp; Craft</Link></li>
              <li><Link to="/menu">Editorial Menu</Link></li>
              <li><Link to="/gallery">Visual Gallery</Link></li>
              <li><Link to="/events">Events &amp; Tastings</Link></li>
              <li><Link to="/reservation">Table Reservation</Link></li>
            </ul>
          </div>

          {/* Opening Hours */}
          <div className="footer-col">
            <h4 className="footer-col-title">OPENING HOURS</h4>
            <ul className="footer-hours">
              {restaurantInfo.contact.hours.map((h, i) => (
                <li key={i}>
                  <span className="days">{h.days}</span>
                  <span className="time">{h.time}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details */}
          <div className="footer-col">
            <h4 className="footer-col-title">LOCATION &amp; CONTACT</h4>
            <p className="footer-address">{restaurantInfo.contact.address}</p>
            <p className="footer-phone">{restaurantInfo.contact.phone}</p>
            <p className="footer-email">{restaurantInfo.contact.email}</p>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} Four Chairs Café. All Rights Reserved.</p>
          <div className="footer-legal">
            <Link to="/admin" className="admin-link">Staff Login</Link>
            <span>•</span>
            <a href="#privacy">Privacy Policy</a>
            <span>•</span>
            <a href="#terms">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
