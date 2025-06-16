const PropertyCard = ({ property }) => (
  <div className="bg-white shadow-md rounded-lg p-4 flex flex-col items-center text-center hover:shadow-lg transition-shadow">
    <img
      src={property.image.startsWith('http') ? property.image : property.image.startsWith('/images') ? property.image : `/images/${property.image}`}
      alt={property.name}
      className="w-32 h-32 rounded-lg object-cover mb-4"
      onError={e => { e.target.src = '/images/placeholder.jpg'; }}
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

export default PropertyCard;