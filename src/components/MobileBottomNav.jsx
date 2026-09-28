import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Utensils, Image as GalleryIcon, CalendarDays, Calendar } from 'lucide-react';
import './MobileBottomNav.css';

const MobileBottomNav = () => {
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/menu', label: 'Menu', icon: Utensils },
    { path: '/gallery', label: 'Gallery', icon: GalleryIcon },
    { path: '/events', label: 'Events', icon: CalendarDays },
    { path: '/reservation', label: 'Reserve', icon: Calendar }
  ];

  const isActive = (path) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <nav className="mobile-bottom-nav" aria-label="Mobile Navigation Bar">
      <div className="bottom-nav-container">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.path);
          return (
            <Link
              key={item.label}
              to={item.path}
              className={`bottom-nav-item ${active ? 'active' : ''}`}
            >
              <Icon size={20} className="bottom-nav-icon" />
              <span className="bottom-nav-label">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default MobileBottomNav;
