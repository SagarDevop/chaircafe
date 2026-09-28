import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, UtensilsCrossed } from 'lucide-react';
import './Header.css';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { path: '/', label: 'HOME' },
    { path: '/about', label: 'ABOUT' },
    { path: '/menu', label: 'MENU' },
    { path: '/gallery', label: 'GALLERY' },
    { path: '/events', label: 'EVENTS' },
    { path: '/contact', label: 'CONTACT' },
  ];

  const isActive = (path) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <header className="site-header">
      <div className="header-container">
        {/* Brand Logo */}
        <Link to="/" className="brand-logo" aria-label="Four Chairs Homepage">
          <span className="logo-badge">FC</span>
          <div className="logo-text">
            <span className="logo-main">FOUR CHAIRS</span>
            <span className="logo-sub">RESTAURANT & CAFÉ</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="desktop-nav" aria-label="Primary Navigation">
          <ul className="nav-list">
            {navLinks.map((link) => (
              <li key={link.path}>
                <Link
                  to={link.path}
                  className={`nav-link ${isActive(link.path) ? 'active' : ''}`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Header Right Utility */}
        <div className="header-actions">
          <Link to="/reservation" className="btn btn-accent btn-sm header-reserve-btn">
            RESERVE
          </Link>
          
          {/* Mobile Menu Toggle Button */}
          <button
            className="mobile-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="mobile-drawer animate-fade-in">
          <nav className="mobile-nav">
            <ul>
              {navLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className={`mobile-nav-link ${isActive(link.path) ? 'active' : ''}`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li className="mobile-reserve-li">
                <Link
                  to="/reservation"
                  className="btn btn-accent full-width"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  RESERVE A TABLE
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
