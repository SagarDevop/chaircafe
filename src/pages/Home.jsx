import React from 'react';
import Hero from '../components/Hero';
import AboutSection from '../components/AboutSection';
import FeaturedDish from '../components/FeaturedDish';
import MenuShowcase from '../components/MenuShowcase';
import Services from '../components/Services';
import CTASection from '../components/CTASection';
import GallerySection from '../components/GallerySection';
import EventsSection from '../components/EventsSection';
import ReservationSection from '../components/ReservationSection';

const Home = () => {
  return (
    <main className="home-page-editorial">
      {/* 1. LARGE FOOD HERO */}
      <Hero />

      {/* 2. ABOUT / STORY */}
      <AboutSection />

      {/* 3. FEATURED FOOD (DARK CHARCOAL BLOCK) */}
      <FeaturedDish />

      {/* 4. MENU SHOWCASE */}
      <MenuShowcase />

      {/* 5. SERVICES / EXPERIENCE */}
      <Services />

      {/* 6. LARGE PROMOTIONAL / CTA SECTION */}
      <CTASection />

      {/* 7. GALLERY JOURNAL */}
      <GallerySection />

      {/* 8. EVENTS */}
      <EventsSection />

      {/* 9. RESERVATION */}
      <ReservationSection />
    </main>
  );
};

export default Home;
