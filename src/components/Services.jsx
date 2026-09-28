import React from 'react';
import { servicesData } from '../data/restaurantData';
import './Services.css';

const Services = () => {
  return (
    <section className="section services-section">
      {/* Background Watermark */}
      <div className="watermark-bg services-watermark">SERVICES</div>

      <div className="container services-container">
        {/* Section Header */}
        <div className="services-header">
          <span className="eyebrow">OUR OFFERINGS</span>
          <h2 className="services-title">
            We bring the best services ever <br />
            <span className="serif-italic">to every table &amp; cup.</span>
          </h2>
        </div>

        {/* 3 Editorial Cards Grid */}
        <div className="services-grid">
          {servicesData.map((service, idx) => (
            <div key={service.id} className={`service-card ${idx === 1 ? 'featured-service-card' : ''}`}>
              <div className="service-card-image-wrapper">
                <img src={service.image} alt={service.title} className="img-cover service-img" />
                <span className="service-subtitle">{service.subtitle}</span>
              </div>

              <div className="service-card-body">
                <h3 className="service-card-title">{service.title}</h3>
                <p className="service-card-desc">{service.description}</p>
                <div className="service-card-footer">
                  <span className="service-arrow">→</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
