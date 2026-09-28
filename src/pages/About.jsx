import React from 'react';
import AboutSection from '../components/AboutSection';
import Services from '../components/Services';
import CTASection from '../components/CTASection';
import './Pages.css';

const About = () => {
  return (
    <div className="page-wrapper animate-fade-in">
      {/* Editorial Page Header */}
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow">OUR HERITAGE</span>
          <h1 className="page-hero-title">
            The Story Behind <br />
            <span className="serif-italic">Four Chairs</span>
          </h1>
        </div>
      </section>

      <AboutSection />
      <Services />
      <CTASection />
    </div>
  );
};

export default About;
