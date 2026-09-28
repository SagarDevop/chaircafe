import React from 'react';
import EventsSection from '../components/EventsSection';
import CTASection from '../components/CTASection';
import './Pages.css';

const Events = () => {
  return (
    <div className="page-wrapper animate-fade-in">
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow">GATHERINGS &amp; EXPERIENCES</span>
          <h1 className="page-hero-title">
            Special Events <br />
            <span className="serif-italic">&amp; Sommelier Tastings</span>
          </h1>
        </div>
      </section>

      <EventsSection />
      <CTASection />
    </div>
  );
};

export default Events;
