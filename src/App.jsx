import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import MobileBottomNav from './components/MobileBottomNav';

// Pages
import Home from './pages/Home';
import About from './pages/About';
import Menu from './pages/Menu';
import Gallery from './pages/Gallery';
import Events from './pages/Events';
import Contact from './pages/Contact';
import ReservationPage from './pages/Reservation';
import Order from './pages/Order';
import Admin from './pages/Admin';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const MainLayout = ({ children }) => {
  const location = useLocation();
  // Hide main header/footer on isolated /order and /admin routes
  const isIsolatedRoute = location.pathname.startsWith('/order') || location.pathname.startsWith('/admin');

  return (
    <div className="app-container">
      <ScrollToTop />
      {!isIsolatedRoute && <Header />}
      <div className="content-area">{children}</div>
      {!isIsolatedRoute && <Footer />}
      {!isIsolatedRoute && <MobileBottomNav />}
    </div>
  );
};

function App() {
  return (
    <Router>
      <MainLayout>
        <Routes>
          {/* Public Showcase Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/events" element={<Events />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/reservation" element={<ReservationPage />} />

          {/* Isolated Dine-In QR Order Route */}
          <Route path="/order" element={<Order />} />

          {/* Isolated Staff Operational Admin Route */}
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </MainLayout>
    </Router>
  );
}

export default App;
