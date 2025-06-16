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

export default PropertyListItem;