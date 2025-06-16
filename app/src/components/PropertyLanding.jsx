import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { HiOutlineOfficeBuilding, HiOutlineLocationMarker } from 'react-icons/hi';

const PropertyLanding = () => {
  const navigate = useNavigate();
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState('');
  const [areas, setAreas] = useState([]);
  const [selectedArea, setSelectedArea] = useState('');
  const [loading, setLoading] = useState(false);
  

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/cities`);
        const data = await response.json();
        setCities(data);
      } catch (error) {
        console.error('Error fetching cities:', error);
      }
    };

    fetchCities();
  }, []);

  useEffect(() => {
    const fetchAreas = async () => {
      if (!selectedCity || selectedCity === "undefined") return;

      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/areas/${selectedCity}`);
        if (!response.ok) throw new Error(`Status ${response.status}`);
        const data = await response.json();
        setAreas(data);
        setSelectedArea('');
      } catch (error) {
        console.error('Error fetching areas:', error);
      }
    };

    fetchAreas();
  }, [selectedCity]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedCity && selectedArea) {
      navigate(`/propevo/dashboard?city=${selectedCity}&area=${selectedArea}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-100 to-white flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-lg w-full bg-white p-10 rounded-2xl shadow-2xl border border-gray-200"
        style={{ fontFamily: 'Segoe UI, Open Sans, sans-serif' }}
      >
        <div className="text-center mb-8">
          <HiOutlineOfficeBuilding className="text-blue-600 text-5xl mx-auto mb-2" />
          <h1 className="text-3xl font-bold text-gray-800">Find Properties by Location</h1>
          <p className="text-sm text-gray-500 mt-2">Select your preferred city and area to begin</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* City Selection */}
          <div>
            <label htmlFor="city" className="block text-sm font-semibold text-gray-700 mb-2">
              <HiOutlineOfficeBuilding className="inline-block mr-1 text-blue-500" /> City
            </label>
            <select
              id="city"
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="w-full px-4 py-2 bg-white border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Choose a city</option>
              {cities.map((city) => (
                <option key={city.id} value={city.id}>{city.name}</option>
              ))}
            </select>
          </div>

          {/* Area Selection */}
          <div>
            <label htmlFor="area" className="block text-sm font-semibold text-gray-700 mb-2">
              <HiOutlineLocationMarker className="inline-block mr-1 text-blue-500" /> Area
            </label>
            <select
              id="area"
              value={selectedArea}
              onChange={(e) => setSelectedArea(e.target.value)}
              className="w-full px-4 py-2 bg-white border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              disabled={!selectedCity}
            >
              <option value="">Choose an area</option>
              {areas.map((area) => (
                <option key={area.id} value={area.id}>{area.name}</option>
              ))}
            </select>
          </div>

          {/* Submit Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className={`w-full py-3 text-white font-semibold rounded-md transition duration-300 ${
              selectedCity && selectedArea ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-300 cursor-not-allowed'
            }`}
            disabled={!selectedCity || !selectedArea}
          >
            View Dashboard
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default PropertyLanding;
