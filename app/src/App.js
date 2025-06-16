import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Home from './components/Home';
import PropertyLanding from './components/PropertyLanding';
import PropertyDashboard from './components/PropertyDashboard';
import PropertyReportPage from './components/PropertyReportPage';

function AnimatedRoutes() {
  const location = useLocation();

  // Hide Navbar on specific routes
  const hideNavbar = ['/propevo/dashboard'].includes(location.pathname) ||
    /^\/properties\/[^/]+\/report$/.test(location.pathname); // Regex for report page

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {!hideNavbar && <Navbar />}
      <main>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/propevo" element={<PropertyLanding />} />
            <Route path="/propevo/dashboard" element={<PropertyDashboard />} />
            <Route path="/techevo" element={<div className="pt-20 text-center">TechEvo Coming Soon</div>} />
            <Route path="/about" element={<div className="pt-20 text-center">About Page Coming Soon</div>} />
            <Route path="/properties/:propertyId/report" element={<PropertyReportPage />} />
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