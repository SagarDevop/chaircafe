import React from 'react';
import ReservationSection from '../components/ReservationSection';
import './Pages.css';

const ReservationPage = () => {
  return (
    <div className="page-wrapper animate-fade-in">
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow">RESERVE A TABLE</span>
          <h1 className="page-hero-title">
            Dining Experience <br />
            <span className="serif-italic">Reservation</span>
          </h1>
        </div>
      </section>

      <ReservationSection />
    </div>
  );
};

export default ReservationPage;
