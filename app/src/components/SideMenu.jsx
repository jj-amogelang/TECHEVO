import { motion } from 'framer-motion';
import {
  HiOutlineChartBar,
  HiOutlineHome,
  HiOutlineCurrencyDollar,
  HiOutlineUserGroup,
  HiOutlineCog,
  HiOutlineArrowLeft,
} from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';

const MenuItem = ({ icon, label, isCollapsed, isActive, onClick }) => (
  <motion.div
    onClick={onClick}
    className={`flex items-center cursor-pointer px-4 py-3 rounded-lg transition-colors ${
      isActive ? 'bg-emerald-600 text-white' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
    }`}
    whileHover={{ scale: 1.02 }}
  >
    <div className={`w-6 h-6 ${isActive ? 'text-white' : 'text-emerald-500'}`}>{icon}</div>
    {!isCollapsed && (
      <span className="ml-4 text-sm font-medium truncate">{label}</span>
    )}
  </motion.div>
);

const SideMenu = ({ isCollapsed, setIsCollapsed, activeItem, setActiveItem, theme }) => {
  const navigate = useNavigate();

  const menuItems = [
    { icon: <HiOutlineChartBar />, label: 'Dashboard', key: 'dashboard' },
    { icon: <HiOutlineHome />, label: 'Properties', key: 'properties' },
    { icon: <HiOutlineCurrencyDollar />, label: 'Deals', key: 'deals' },
    { icon: <HiOutlineUserGroup />, label: 'Analytics', key: 'analytics' },
    { icon: <HiOutlineCog />, label: 'Settings', key: 'settings' },
  ];

  return (
    <motion.div
      initial={false}
      animate={{ width: isCollapsed ? '4rem' : '14rem' }}
      className={`h-screen fixed top-0 left-0 z-20 transition-all duration-300 ease-in-out border-r ${
        theme === 'dark' ? 'bg-gray-900 border-gray-700 text-white' : 'bg-white border-gray-200 text-gray-900'
      } flex flex-col py-6`}
    >
      {/* Toggle Collapse Button */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3 top-6 w-6 h-6 border rounded-full shadow-md flex items-center justify-center text-sm bg-white dark:bg-gray-800"
      >
        {isCollapsed ? '→' : '←'}
      </button>

      {/* Navigation Items */}
      <div className="flex-1 mt-10 space-y-2 px-2">
        {menuItems.map(({ icon, label, key }) => (
          <MenuItem
            key={key}
            icon={icon}
            label={label}
            isCollapsed={isCollapsed}
            isActive={activeItem === key}
            onClick={() => setActiveItem(key)}
          />
        ))}
      </div>

      {/* Back to Website */}
      <div className="px-2 mt-auto mb-4">
        <button
          onClick={() => navigate('/')}
          className="flex items-center w-full text-sm font-medium p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          <HiOutlineArrowLeft className="w-5 h-5" />
          {!isCollapsed && <span className="ml-3">Back to Website</span>}
        </button>
      </div>
    </motion.div>
  );
};

export default SideMenu;
