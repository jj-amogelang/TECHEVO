import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Home from './components/Home';
import PropertyLanding from './components/PropertyLanding';
import PropertyDashboard from './components/PropertyDashboard';

function AnimatedRoutes() {
  const location = useLocation();

  // Hide Navbar on specific routes
  const hideNavbar = location.pathname === '/propevo/dashboard';

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {!hideNavbar && <Navbar />} {/* Conditionally render Navbar */}
      <main>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/propevo" element={<PropertyLanding />} />
            <Route path="/propevo/dashboard" element={<PropertyDashboard />} />
            <Route path="/techevo" element={<div className="pt-20 text-center">TechEvo Coming Soon</div>} />
            <Route path="/about" element={<div className="pt-20 text-center">About Page Coming Soon</div>} />
          </Routes>
        </AnimatePresence>
      </main>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AnimatedRoutes />
    </Router>
  );
}

export default App;