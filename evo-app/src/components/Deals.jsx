const Deals = () => {
  const mockDeals = [
    {
      id: 1,
      name: 'Luxury Penthouse Deal',
      status: 'Closed',
      value: 'R8,500,000',
      date: '2025-04-01',
    },
    {
      id: 2,
      name: 'Office Space Lease',
      status: 'In Progress',
      value: 'R12,800,000',
      date: '2025-03-15',
    },
    {
      id: 3,
      name: 'Family Home Sale',
      status: 'Closed',
      value: 'R4,200,000',
      date: '2025-02-28',
    },
    {
      id: 4,
      name: 'Retail Space Rental',
      status: 'In Progress',
      value: 'R2,500,000',
      date: '2025-03-20',
    },
    {
      id: 5,
      name: 'Commercial Property Deal',
      status: 'Closed',
      value: 'R18,000,000',
      date: '2025-01-10',
    },
  ];

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Deals</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockDeals.map((deal) => (
          <div key={deal.id} className="bg-white shadow-md rounded-lg p-4">
            <h3 className="font-semibold text-gray-900">{deal.name}</h3>
            <p className="text-gray-500 text-sm">Status: {deal.status}</p>
            <p className="text-gray-500 text-sm">Value: {deal.value}</p>
            <p className="text-gray-500 text-sm">Date: {deal.date}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Deals;