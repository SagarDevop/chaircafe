import React from 'react';
import { Link } from 'react-router-dom';
import { restaurantInfo } from '../data/restaurantData';
import './AboutSection.css';

const AboutSection = () => {
  return (
    <section className="section about-section" id="about">
      {/* Background Watermark */}
      <div className="watermark-bg about-watermark">ABOUT</div>

      <div className="container about-container">
        {/* Left: Floating Ingredient / Beverage Composition */}
        <div className="about-visual-col">
          <div className="about-img-frame">
            <img
              src="https://images.unsplash.com/photo-1613478223719-2ab802602423?auto=format&fit=crop&w=800&q=80"
              alt="Four Chairs Cold-Pressed Juices & Coffee Beans"
              className="about-ingredients-img"
            />
          </div>

          {/* Floating Ingredient Tags */}
          <div className="ingredient-tag ingredient-tag-1">
            <span>COLD-PRESSED JUICES</span>
          </div>
          <div className="ingredient-tag ingredient-tag-2">
            <span>SINGLE ORIGIN BREWS</span>
          </div>
        </div>

        {/* Right: Editorial Story Content */}
        <div className="about-content-col">
          <span className="eyebrow">ABOUT FOUR CHAIRS</span>

          <h2 className="about-title">
            Artisanal coffee &amp; juices from <br />
            <span className="serif-italic">the passionate Four Chairs team.</span>
          </h2>

          <p className="about-subtitle-italic">
            Crafting memorable moments over honest brews, cold-pressed elixirs and sourdough toasts.
          </p>

          <div className="about-text-body">
            <p>{restaurantInfo.story.paragraphs[0]}</p>
            <p>{restaurantInfo.story.paragraphs[1]}</p>
          </div>

          {/* Barista & Culinary Team Signature Block */}
          <div className="about-signature-block">
            <div className="signature-art">
              <svg width="140" height="42" viewBox="0 0 140 42" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 28C25 10 45 5 55 22C62 34 40 40 30 32C20 24 35 12 65 14C95 16 110 8 130 18" stroke="#20201F" strokeWidth="2" strokeLinecap="round"/>
                <path d="M75 18C85 28 95 32 105 24" stroke="#8E2D22" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </div>
            <div className="signature-meta">
              <span className="signature-name">Antonin Scalia &amp; Team</span>
              <span className="signature-role">Master Baristas / Four Chairs</span>
            </div>
          </div>

          <div className="about-cta">
            <Link to="/about" className="btn btn-outline">
              READ OUR STORY
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
