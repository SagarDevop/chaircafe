import React from 'react';
import { Link } from 'react-router-dom';
import { specialitiesList } from '../data/menuData';
import './FeaturedDish.css';

const FeaturedDish = () => {
  return (
    <section className="section featured-dish-section">
      <div className="container featured-dish-container">
        {/* Left: Drink & Light Bites Presentation Image */}
        <div className="featured-dish-image-wrapper">
          <img
            src="https://images.unsplash.com/photo-1577968897966-3d4325b36b61?auto=format&fit=crop&w=1000&q=80"
            alt="Four Chairs Artisanal Coffee & Cold-Pressed Juices"
            className="img-cover featured-dish-img"
          />
          <div className="featured-badge">
            <span>BARISTA'S PICK</span>
          </div>
        </div>

        {/* Right: Dark Charcoal Information Panel */}
        <div className="featured-dish-dark-panel">
          <span className="eyebrow eyebrow-light">TODAY'S CAFÉ SPECIALITY</span>

          <h2 className="dark-panel-title">
            Curated Artisanal <br />
            <span className="serif-italic">Brews &amp; Fresh Juices</span>
          </h2>

          <p className="dark-panel-subtitle">
            Fresh morning extractions, single-origin pour-overs &amp; sourdough light toasts.
          </p>

          <div className="speciality-items-list">
            {specialitiesList.map((item, index) => (
              <div key={index} className="speciality-item-row">
                <span className="speciality-item-name">{item.name}</span>
                <span className="dotted-leader dotted-leader-dark"></span>
                <span className="speciality-item-price">{item.price}</span>
              </div>
            ))}
          </div>

          <div className="dark-panel-actions">
            <Link to="/reservation" className="btn btn-accent">
              RESERVE A TABLE
            </Link>
            <span className="dark-panel-note">or call +91 98765 43210</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedDish;
