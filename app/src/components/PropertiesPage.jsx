import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import PropertyCard from './PropertyCard';
import PropertyListItem from './PropertyListItem';

const filterOptions = ['All', 'Residential', 'Commercial', 'Industrial', 'Retail'];

const PropertiesPage = ({ dashboardData, viewMode, setViewMode }) => {
  const navigate = useNavigate();
  const [selectedType, setSelectedType] = useState('All');

  if (!dashboardData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-600">Loading...</div>
      </div>
    );
  }

  const filteredProperties = dashboardData.properties.filter((property) => {
    if (selectedType === 'All') return true;
    return property.type?.toLowerCase() === selectedType.toLowerCase();
  });

  return (
    <div className="p-6">
      {/* View Mode + Filter Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
        <button
          onClick={() => setViewMode(viewMode === 'card' ? 'list' : 'card')}
          className="text-sm px-4 py-2 border border-blue-500 text-blue-600 rounded-lg hover:bg-blue-50 transition"
        >
          {viewMode === 'card' ? 'Switch to List View' : 'Switch to Card View'}
        </button>

        <div className="flex flex-wrap gap-3">
          {filterOptions.map((type) => (
            <button
              key={type}
              onClick={() => setSelectedType(type)}
              className={`px-4 py-2 text-sm rounded-full border transition ${
                selectedType === type
                  ? 'bg-emerald-600 text-white border-emerald-600'
                  : 'border-gray-300 text-gray-700 hover:bg-gray-100'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Properties Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white">
            Properties in {dashboardData.area_name || 'Selected Area'}
          </h2>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            Showing {filteredProperties.length} of {dashboardData.properties.length}
          </span>
        </div>

        {filteredProperties.length > 0 ? (
          <div
            className={
              viewMode === 'card'
                ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'
                : 'space-y-4'
            }
          >
            {filteredProperties.map((property) =>
              viewMode === 'card' ? (
                <div
                  key={property.id}
                  onClick={() => navigate(`/properties/${property.id}/report`)}
                  className="cursor-pointer"
                >
                  <PropertyCard property={property} />
                </div>
              ) : (
                <div
                  key={property.id}
                  onClick={() => navigate(`/properties/${property.id}/report`)}
                  className="cursor-pointer"
                >
                  <PropertyListItem property={property} />
                </div>
              )
            )}
          </div>
        ) : (
          <p className="text-gray-500 dark:text-gray-400 text-center py-12">
            No properties found for this type.
          </p>
        )}
      </motion.div>
    </div>
  );
};

export default PropertiesPage;
