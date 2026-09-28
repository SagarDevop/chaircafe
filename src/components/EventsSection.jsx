import React from 'react';
import { Link } from 'react-router-dom';
import { eventsData } from '../data/restaurantData';
import './EventsSection.css';

const EventsSection = () => {
  return (
    <section className="section events-section" id="events">
      <div className="container events-container">
        <div className="events-header">
          <span className="eyebrow">WHAT'S HAPPENING</span>
          <h2 className="events-title">
            Events &amp; Special Tastings <br />
            <span className="serif-italic">at Four Chairs</span>
          </h2>
        </div>

        <div className="events-grid">
          {eventsData.map((evt) => (
            <div key={evt.id} className="event-card">
              <div className="event-img-wrapper">
                <img src={evt.image} alt={evt.title} className="img-cover event-img" />
                <span className="event-date-badge">{evt.date}</span>
              </div>
              <div className="event-body">
                <h3 className="event-card-title">{evt.title}</h3>
                <p className="event-card-desc">{evt.description}</p>
                <Link to="/reservation" className="btn btn-outline btn-sm">
                  RESERVE EVENT TABLE
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EventsSection;
