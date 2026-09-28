import React from 'react';
import { Link } from 'react-router-dom';
import './CTASection.css';

const CTASection = () => {
  return (
    <section className="cta-banner-section">
      <div className="container cta-banner-container">
        {/* Subtle Floating Graphics */}
        <div className="cta-graphics">
          <div className="cta-graphic-dot dot-1"></div>
          <div className="cta-graphic-dot dot-2"></div>
        </div>

        <div className="cta-content">
          <span className="eyebrow eyebrow-light">THE FOUR CHAIRS CAFÉ EXPERIENCE</span>

          <h2 className="cta-headline">
            Good coffee. Fresh juices. <br />
            <span className="serif-italic">Good company.</span>
          </h2>

          <p className="cta-subtext">
            Come for single-origin pour-overs and cold-pressed elixirs. Stay for artisanal sourdough toasts and warm everyday atmosphere.
          </p>

          <div className="cta-actions">
            <Link to="/reservation" className="btn btn-primary btn-cta-dark">
              RESERVE A TABLE NOW
            </Link>
            <Link to="/menu" className="btn btn-light-outline">
              VIEW CAFÉ MENU
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
