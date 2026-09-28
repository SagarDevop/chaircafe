import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle } from 'lucide-react';
import { restaurantInfo } from '../data/restaurantData';
import './Pages.css';

const Contact = () => {
  const [msgSent, setMsgSent] = useState(false);
  const [contactForm, setContactForm] = useState({ name: '', email: '', subject: '', message: '' });

  const handleSend = (e) => {
    e.preventDefault();
    if (contactForm.name && contactForm.email && contactForm.message) {
      setMsgSent(true);
    }
  };

  return (
    <div className="page-wrapper animate-fade-in">
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow">GET IN TOUCH</span>
          <h1 className="page-hero-title">
            Visit Four Chairs <br />
            <span className="serif-italic">&amp; Connect With Us</span>
          </h1>
        </div>
      </section>

      <section className="section contact-section">
        <div className="container contact-container">
          {/* Left Contact Cards */}
          <div className="contact-info-col">
            <div className="contact-card">
              <div className="contact-icon"><MapPin size={22} /></div>
              <div>
                <h4 className="contact-card-label">OUR ADDRESS</h4>
                <p className="contact-card-val">{restaurantInfo.contact.address}</p>
              </div>
            </div>

            <div className="contact-card">
              <div className="contact-icon"><Phone size={22} /></div>
              <div>
                <h4 className="contact-card-label">RESERVATIONS &amp; PHONE</h4>
                <p className="contact-card-val">{restaurantInfo.contact.phone}</p>
              </div>
            </div>

            <div className="contact-card">
              <div className="contact-icon"><Mail size={22} /></div>
              <div>
                <h4 className="contact-card-label">EMAIL ENQUIRIES</h4>
                <p className="contact-card-val">{restaurantInfo.contact.email}</p>
              </div>
            </div>

            <div className="contact-card">
              <div className="contact-icon"><Clock size={22} /></div>
              <div>
                <h4 className="contact-card-label">OPENING HOURS</h4>
                {restaurantInfo.contact.hours.map((h, i) => (
                  <p key={i} className="contact-card-val">
                    <strong>{h.days}:</strong> {h.time}
                  </p>
                ))}
              </div>
            </div>
          </div>

          {/* Right Direct Message Form */}
          <div className="contact-form-col">
            <div className="form-box">
              <h3 className="form-box-title">Send a Direct Message</h3>
              <p className="form-box-sub">For private dining bookings, press inquiries, or general feedback.</p>

              {msgSent ? (
                <div className="msg-success">
                  <CheckCircle size={40} className="success-icon" />
                  <h4>Message Sent Successfully</h4>
                  <p>Thank you, {contactForm.name}. Our hospitality team will reply shortly.</p>
                  <button className="btn btn-outline btn-sm" onClick={() => setMsgSent(false)}>Send Another Message</button>
                </div>
              ) : (
                <form onSubmit={handleSend} className="contact-form-grid">
                  <div className="form-group">
                    <label htmlFor="cnt-name">Your Name *</label>
                    <input
                      type="text"
                      id="cnt-name"
                      placeholder="e.g. Antonin Scalia"
                      value={contactForm.name}
                      onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="cnt-email">Email Address *</label>
                    <input
                      type="email"
                      id="cnt-email"
                      placeholder="antonin@example.com"
                      value={contactForm.email}
                      onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="cnt-subj">Subject</label>
                    <input
                      type="text"
                      id="cnt-subj"
                      placeholder="Private Event Inquiry"
                      value={contactForm.subject}
                      onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="cnt-msg">Message *</label>
                    <textarea
                      id="cnt-msg"
                      rows="4"
                      placeholder="Write your note here..."
                      value={contactForm.message}
                      onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                      required
                    ></textarea>
                  </div>

                  <button type="submit" className="btn btn-primary full-width-btn">
                    SEND MESSAGE
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
