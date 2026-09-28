import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { menuCategories, menuItems } from '../data/menuData';
import './MenuShowcase.css';

const MenuShowcase = () => {
  const [activeCategory, setActiveCategory] = useState('ALL');

  const filteredItems = activeCategory === 'ALL'
    ? menuItems
    : menuItems.filter(item => item.category === activeCategory);

  return (
    <section className="section menu-showcase-section" id="menu">
      {/* Background Watermark */}
      <div className="watermark-bg menu-watermark">MENU</div>

      <div className="container menu-showcase-container">
        {/* Section Header */}
        <div className="menu-header">
          <span className="eyebrow">FOOD &amp; DRINKS</span>
          <h2 className="menu-section-title">
            Tasty &amp; crunchy main courses <br />
            <span className="serif-italic">&amp; artisanal brews</span>
          </h2>
          <p className="menu-section-intro">
            A curated showcase of our chef's signature kitchen creations and freshly roasted coffees.
          </p>

          {/* Category Filter Pills */}
          <div className="category-tabs" role="tablist">
            {menuCategories.map((cat) => (
              <button
                key={cat.id}
                role="tab"
                aria-selected={activeCategory === cat.id}
                className={`category-tab ${activeCategory === cat.id ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat.id)}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* 2-Column Editorial Menu List */}
        <div className="menu-grid">
          {filteredItems.map((item) => (
            <div key={item.id} className="menu-item-card">
              <div className="menu-item-thumb">
                <img src={item.image} alt={item.name} className="img-cover" />
                {item.badge && <span className="menu-badge">{item.badge}</span>}
              </div>

              <div className="menu-item-info">
                <div className="menu-item-header">
                  <h3 className="menu-item-title">{item.name}</h3>
                  <span className="dotted-leader"></span>
                  <span className="menu-item-price">{item.price}</span>
                </div>
                <p className="menu-item-desc">{item.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Section Footer Action */}
        <div className="menu-showcase-footer">
          <Link to="/menu" className="btn btn-primary">
            VIEW FULL SHOWCASE MENU
          </Link>
        </div>
      </div>
    </section>
  );
};

export default MenuShowcase;
