import React, { useState } from 'react';
import { Calendar, Clock, Users, CheckCircle } from 'lucide-react';
import './ReservationSection.css';

const ReservationSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    guests: '2 Guests',
    date: '',
    time: '19:00',
    notes: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.date) {
      alert("Please fill in your name, phone number, and reservation date.");
      return;
    }
    setSubmitted(true);
  };

  return (
    <section className="section reservation-section" id="reservation">
      <div className="container reservation-container">
        <div className="reservation-card">
          <div className="reservation-header">
            <span className="eyebrow">TABLE RESERVATION</span>
            <h2 className="reservation-title">
              Reserve Your Table <br />
              <span className="serif-italic">at Four Chairs</span>
            </h2>
            <p className="reservation-intro">
              Experience chef-curated dining and warm hospitality. Reserve your table below.
            </p>
          </div>

          {submitted ? (
            <div className="reservation-success animate-fade-in">
              <CheckCircle size={48} className="success-icon" />
              <h3 className="success-title">Reservation Confirmed</h3>
              <p className="success-msg">
                Thank you, <strong>{formData.name}</strong>! Your table for <strong>{formData.guests}</strong> on <strong>{formData.date}</strong> at <strong>{formData.time}</strong> has been reserved.
              </p>
              <p className="success-sub">A confirmation has been sent to your contact details.</p>
              <button
                className="btn btn-primary"
                onClick={() => {
                  setSubmitted(false);
                  setFormData({ name: '', phone: '', email: '', guests: '2 Guests', date: '', time: '19:00', notes: '' });
                }}
              >
                BOOK ANOTHER TABLE
              </button>
            </div>
          ) : (
            <form className="reservation-form" onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="res-name">Full Name *</label>
                  <input
                    type="text"
                    id="res-name"
                    placeholder="e.g. Antonin Scalia"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="res-phone">Phone Number *</label>
                  <input
                    type="tel"
                    id="res-phone"
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="form-row form-row-3">
                <div className="form-group">
                  <label htmlFor="res-guests"><Users size={14} /> Guests</label>
                  <select
                    id="res-guests"
                    value={formData.guests}
                    onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                  >
                    <option>1 Guest</option>
                    <option>2 Guests</option>
                    <option>3 Guests</option>
                    <option>4 Guests</option>
                    <option>5-6 Guests</option>
                    <option>7+ Private Dining</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="res-date"><Calendar size={14} /> Date *</label>
                  <input
                    type="date"
                    id="res-date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="res-time"><Clock size={14} /> Time</label>
                  <select
                    id="res-time"
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                  >
                    <option value="12:00">12:00 PM (Lunch)</option>
                    <option value="13:30">01:30 PM (Lunch)</option>
                    <option value="18:30">06:30 PM (Dinner)</option>
                    <option value="19:30">07:30 PM (Dinner)</option>
                    <option value="20:30">08:30 PM (Dinner)</option>
                    <option value="21:30">09:30 PM (Late Dinner)</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="res-notes">Special Requests (Optional)</label>
                <textarea
                  id="res-notes"
                  rows="3"
                  placeholder="Dietary preferences, anniversary, window seating..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                ></textarea>
              </div>

              <div className="form-submit">
                <button type="submit" className="btn btn-accent full-width-btn">
                  CONFIRM RESERVATION
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default ReservationSection;
