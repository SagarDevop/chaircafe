import React from 'react';
import MenuShowcase from '../components/MenuShowcase';
import FeaturedDish from '../components/FeaturedDish';
import './Pages.css';

const Menu = () => {
  return (
    <div className="page-wrapper animate-fade-in">
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow">EDITORIAL SELECTION</span>
          <h1 className="page-hero-title">
            Artisanal Café <br />
            <span className="serif-italic">&amp; Juice Menu</span>
          </h1>
        </div>
      </section>

      <MenuShowcase />
      <FeaturedDish />
    </div>
  );
};

export default Menu;
