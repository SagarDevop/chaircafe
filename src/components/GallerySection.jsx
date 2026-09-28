import React from 'react';
import { galleryImages } from '../data/restaurantData';
import './GallerySection.css';

const GallerySection = () => {
  return (
    <section className="section gallery-section" id="gallery">
      <div className="container gallery-container">
        <div className="gallery-header">
          <span className="eyebrow">VISUAL JOURNAL</span>
          <h2 className="gallery-title">
            Art, Atmosphere <br />
            <span className="serif-italic">&amp; Culinary Details</span>
          </h2>
        </div>

        {/* Asymmetric Gallery Layout */}
        <div className="gallery-grid">
          {galleryImages.map((img, index) => (
            <div
              key={img.id}
              className={`gallery-item gallery-item-${index + 1} gallery-aspect-${img.aspect}`}
            >
              <img src={img.src} alt={img.title} className="img-cover gallery-img" />
              <div className="gallery-overlay">
                <span className="gallery-category">{img.category}</span>
                <h4 className="gallery-img-title">{img.title}</h4>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GallerySection;
