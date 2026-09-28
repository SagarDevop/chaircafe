import React from 'react';
import GallerySection from '../components/GallerySection';
import './Pages.css';

const Gallery = () => {
  return (
    <div className="page-wrapper animate-fade-in">
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow">PHOTOGRAPHIC JOURNAL</span>
          <h1 className="page-hero-title">
            Atmosphere &amp; Plating <br />
            <span className="serif-italic">Gallery</span>
          </h1>
        </div>
      </section>

      <GallerySection />
    </div>
  );
};

export default Gallery;
