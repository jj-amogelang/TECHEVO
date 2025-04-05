import { motion } from 'framer-motion';
import {
  HiOutlineChartBar,
  HiOutlineHome,
  HiOutlineCurrencyDollar,
  HiOutlineUserGroup,
  HiOutlineMail,
  HiOutlineOfficeBuilding,
  HiOutlineLockClosed,
  HiOutlineCog,
} from 'react-icons/hi'; // Import Heroicons
import Deals from './Deals'; // Component for Deals

const MenuItem = ({ icon, label, isCollapsed, isActive, onClick }) => (
  <motion.div
    onClick={onClick} // Handle click
    className={`flex items-center cursor-pointer p-3 ${
      isActive ? 'bg-emerald-500 text-white' : 'text-gray-600 hover:bg-gray-100'
    } rounded-lg transition-colors`}
    whileHover={{ scale: 1.02 }}
    style={{ fontFamily: 'Open Sans, sans-serif' }} // Use professional font
  >
    <div
      className={`w-10 h-10 flex items-center justify-center ${
        isActive ? 'text-white' : 'text-emerald-500'
      }`}
    >
      {icon}
    </div>
    {!isCollapsed && (
      <span className="ml-3 whitespace-nowrap text-sm font-medium">{label}</span>
    )}
  </motion.div>
);

const Properties = ({ properties, areaName }) => (
  <div>
    <h2 className="text-2xl font-bold mb-4">Properties in {areaName}</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {properties.map((property) => (
        <div key={property.id} className="bg-white shadow-md rounded-lg p-4">
          <img
            src={property.image}
            alt={property.name}
            className="w-full h-40 object-cover rounded-lg mb-4"
          />
          <h3 className="font-semibold text-gray-900">{property.name}</h3>
          <p className="text-gray-500 text-sm">{property.address}</p>
          <p className="text-gray-500 text-sm">{property.type}</p>
        </div>
      ))}
    </div>
  </div>
);

const Analytics = ({ metrics }) => (
  <div>
    <h2 className="text-2xl font-bold mb-4">Analytics</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {Object.entries(metrics).map(([key, value]) => (
        <div key={key} className="bg-white shadow-md rounded-lg p-4">
          <h3 className="font-semibold text-gray-900 capitalize">{key.replace('_', ' ')}</h3>
          <p className="text-gray-500 text-sm">Value: {value.value}</p>
          <p className={`text-sm ${value.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
            Change: {value.change}%
          </p>
        </div>
      ))}
    </div>
  </div>
);

const SideMenu = ({ isCollapsed, setIsCollapsed, activeItem, setActiveItem, theme, dashboardData }) => {
  const menuItems = [
    {
      icon: <HiOutlineChartBar className="w-6 h-6" />,
      label: 'Dashboard',
      key: 'dashboard',
    },
    {
      icon: <HiOutlineHome className="w-6 h-6" />,
      label: 'Properties',
      key: 'properties',
    },
    {
      icon: <HiOutlineCurrencyDollar className="w-6 h-6" />,
      label: 'Deals',
      key: 'deals',
    },
    {
      icon: <HiOutlineUserGroup className="w-6 h-6" />,
      label: 'Analytics',
      key: 'analytics',
    },
    {
      icon: <HiOutlineMail className="w-6 h-6" />,
      label: 'Messages',
      key: 'messages',
    },
    {
      icon: <HiOutlineOfficeBuilding className="w-6 h-6" />,
      label: 'Companies',
      key: 'companies',
    },
    {
      icon: <HiOutlineLockClosed className="w-6 h-6" />,
      label: 'Access',
      key: 'access',
    },
    {
      icon: <HiOutlineCog className="w-6 h-6" />,
      label: 'Settings',
      key: 'settings',
    },
  ];

  // Render the content dynamically based on the active menu item
  const renderContent = () => {
    if (!dashboardData) {
      return <p>Loading data...</p>; // Handle loading state
    }

    switch (activeItem) {
      case 'properties':
        return (
          <Properties
            properties={dashboardData.properties || []} // Fallback to an empty array
            areaName={dashboardData.area_name || 'Unknown Area'} // Fallback to a default value
          />
        );
      case 'analytics':
        return <Analytics metrics={dashboardData.activity_metrics || {}} />;
      case 'deals':
        return <Deals />;
      default:
        return <p>Welcome to the Dashboard! Select a menu item to get started.</p>;
    }
  };

  return (
    <div className="flex h-screen">
      {/* Side Menu */}
      <motion.div
        initial={false}
        animate={{ width: isCollapsed ? '4rem' : '16rem' }}
        className={`h-screen ${
          theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'
        } border-r border-gray-200 flex flex-col py-4 fixed left-0 top-0`}
        style={{ fontFamily: 'Open Sans, sans-serif' }} // Use professional font
      >
        {/* Toggle Button */}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className={`absolute -right-3 top-8 w-6 h-6 ${
            theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-white text-gray-900'
          } border border-gray-200 rounded-full flex items-center justify-center cursor-pointer`}
        >
          {isCollapsed ? '→' : '←'}
        </button>

        {/* Menu Items */}
        <div className="flex-1 px-2 space-y-2">
          {menuItems.map(({ icon, label, key }) => (
            <MenuItem
              key={key}
              icon={icon}
              label={label}
              isCollapsed={isCollapsed}
              isActive={activeItem === key}
              onClick={() => setActiveItem(key)} // Call setActiveItem here
            />
          ))}
        </div>
      </motion.div>

      {/* Content Section */}
      <div className="flex-1 p-6">{renderContent()}</div>
    </div>
  );
};

export default SideMenu;