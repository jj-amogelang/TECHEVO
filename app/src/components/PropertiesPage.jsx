import { motion } from 'framer-motion';

const PropertyListItem = ({ property }) => (
  <div className="bg-white shadow-md rounded-lg p-4 flex items-center justify-between hover:shadow-lg transition-shadow">
    <div>
      <h3 className="font-semibold text-gray-900">{property.name}</h3>
      <p className="text-gray-500 text-sm">{property.address}</p>
      <p className="text-gray-500 text-sm">
        {property.beds} beds • {property.baths} baths • {property.sqm}m²
      </p>
    </div>
    <span
      className={`px-3 py-1 rounded-full text-sm font-medium ${
        property.status === 'Available'
          ? 'bg-green-100 text-green-800'
          : 'bg-yellow-100 text-yellow-800'
      }`}
    >
      {property.status}
    </span>
  </div>
);

const PropertyCard = ({ property }) => (
  <div className="bg-white shadow-md rounded-lg p-4 flex flex-col items-center text-center hover:shadow-lg transition-shadow">
    <img
      src={property.image}
      alt={property.name}
      className="w-32 h-32 rounded-lg object-cover mb-4"
    />
    <h3 className="font-semibold text-gray-900">{property.name}</h3>
    <p className="text-gray-500 text-sm">{property.address}</p>
    <span
      className={`mt-2 px-3 py-1 rounded-full text-sm font-medium ${
        property.status === 'Available'
          ? 'bg-green-100 text-green-800'
          : 'bg-yellow-100 text-yellow-800'
      }`}
    >
      {property.status}
    </span>
  </div>
);

const PropertiesPage = ({ dashboardData, viewMode, setViewMode }) => {
  if (!dashboardData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Toggle Button */}
      <button
        onClick={() => setViewMode(viewMode === 'card' ? 'list' : 'card')}
        className="text-blue-600 hover:text-blue-700 mb-6"
      >
        {viewMode === 'card' ? 'Switch to List View' : 'Switch to Card View'}
      </button>

      {/* Properties Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white shadow-md rounded-lg p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-800">
            Properties in {dashboardData.area_name || 'Selected Area'}
          </h2>
        </div>
        <div
          className={
            viewMode === 'card'
              ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'
              : 'space-y-4'
          }
        >
          {viewMode === 'card'
            ? dashboardData.properties.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))
            : dashboardData.properties.map((property) => (
                <PropertyListItem key={property.id} property={property} />
              ))}
        </div>
      </motion.div>
    </div>
  );
};

export default PropertiesPage;