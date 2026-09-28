import React from 'react';
import { Link } from 'react-router-dom';
import './Hero.css';

const Hero = () => {
  return (
    <section 
      className="hero-section" 
      style={{ backgroundImage: "url('https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=2000&q=85')" }}
    >
      {/* Deep Dark Charcoal Overlay for Moody Black Aesthetic */}
      <div className="hero-bg-overlay"></div>

      {/* Vertical Slide Indicator */}
      <div className="hero-slide-indicator">
        <span className="current-slide">01</span>
        <span className="slide-line"></span>
        <span className="total-slides">03</span>
      </div>

      <div className="container hero-container">
        {/* Floating Overlapping Editorial Content Card */}
        <div className="hero-card">
          {/* Price Badge in Circular Accent */}
          <div className="hero-price-badge">
            <span>₹240</span>
          </div>

          <div className="hero-card-content">
            <span className="eyebrow">BARISTA'S SIGNATURE</span>

            <h1 className="hero-title">
              Craft Espresso <br />
              <span className="serif-italic">&amp; Fresh Juices</span>
            </h1>

            <span className="hero-subtag">ARTISANAL CAFÉ &amp; LIGHT BITES</span>

            <p className="hero-description">
              Single-origin Ethiopian Yirgacheffe pour-overs, raw cold-pressed citrus elixirs &amp; wood-fired sourdough toasts.
            </p>

            <div className="hero-card-actions">
              <Link to="/menu" className="btn btn-primary">
                EXPLORE CAFÉ MENU
              </Link>
              <Link to="/reservation" className="btn btn-outline">
                RESERVE A TABLE
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
