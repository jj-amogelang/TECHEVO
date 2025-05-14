import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { HiOutlineViewList, HiOutlineViewGrid } from 'react-icons/hi'; // Import icons
import SideMenu from './SideMenu';
import PropertiesPage from './PropertiesPage';
import AnalyticsPage from './AnalyticsPage';
import Deals from './Deals';
import SettingsPage from './SettingsPage'; // Import SettingsPage

const PropertyDashboard = () => {
  const [searchParams] = useSearchParams();
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // State for error handling
  const [isCollapsed, setIsCollapsed] = useState(false); // State for toggling SideMenu
  const [activeItem, setActiveItem] = useState('dashboard'); // Default active item
  const [viewMode, setViewMode] = useState('card'); // State for toggling view mode
  const [theme, setTheme] = useState('light'); // Default theme is light

  const city = searchParams.get('city');
  const area = searchParams.get('area'); // Get the selected area from the URL

  const metrics = {
    accepted_offers: { title: 'Accepted Offers', value: '120' },
    new_deals: { title: 'New Deals', value: '45' },
    new_leads: { title: 'New Leads', value: '80' },
    new_offers: { title: 'New Offers', value: '60' }
  };

  useEffect(() => {
    // Apply the theme to the document body
    document.body.className = theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900';
  }, [theme]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/api/dashboard?city=${city}&area=${area}`
        );
        if (!response.ok) {
          throw new Error(`Failed to fetch dashboard data: ${response.statusText}`);
        }
        const data = await response.json();
        setDashboardData(data);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        setError(error.message); // Set the error message
      } finally {
        setLoading(false);
      }
    };

    if (city && area) {
      fetchDashboardData();
    }
  }, [city, area]);

  const renderContent = () => {
    switch (activeItem) {
      case 'dashboard':
        return (
          <div
            className="relative h-full w-full"
            style={{
              backgroundImage: `url(${dashboardData?.area_image || 'https://via.placeholder.com/1920x1080'})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              height: '100vh'
            }}
          >
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <div className="text-center text-white">
                <h1 className="text-4xl font-bold mb-4">{dashboardData?.area_name || 'Unknown Area'}</h1>
                <p className="text-lg">{dashboardData?.area_description || 'Explore the beauty of this area.'}</p>
              </div>
            </div>
          </div>
        );
      case 'properties':
        return (
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold">Properties</h2>
              <div className="flex items-center space-x-2">
                <span className="text-gray-600">Set view:</span>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-full ${
                    viewMode === 'list' ? 'bg-gray-200' : 'hover:bg-gray-100'
                  }`}
                >
                  <HiOutlineViewList
                    className={`w-6 h-6 ${
                      viewMode === 'list' ? 'text-blue-600' : 'text-gray-600'
                    }`}
                  />
                </button>
                <button
                  onClick={() => setViewMode('card')}
                  className={`p-2 rounded-full ${
                    viewMode === 'card' ? 'bg-gray-200' : 'hover:bg-gray-100'
                  }`}
                >
                  <HiOutlineViewGrid
                    className={`w-6 h-6 ${
                      viewMode === 'card' ? 'text-blue-600' : 'text-gray-600'
                    }`}
                  />
                </button>
              </div>
            </div>
            <PropertiesPage
              dashboardData={dashboardData}
              viewMode={viewMode}
              setViewMode={setViewMode}
            />
          </div>
        );
      case 'analytics':
        return <AnalyticsPage metrics={Object.values(metrics)} />;
      case 'deals':
        return <Deals />;
      case 'settings':
        return <SettingsPage theme={theme} setTheme={setTheme} />;
      default:
        return <p>Welcome to the Dashboard! Select a menu item to get started.</p>;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className={`flex h-screen ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}>
      {/* SideMenu */}
      <SideMenu
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
        activeItem={activeItem}
        setActiveItem={setActiveItem}
        theme={theme} // Pass theme to SideMenu
      />

      {/* Main Content */}
      <div
        className={`flex-1 overflow-y-auto transition-all duration-300 ${
          isCollapsed ? 'ml-16' : 'ml-64'
        }`}
      >
        {renderContent()}
      </div>

      {/* Error Message */}
      {error && (
        <div className="fixed bottom-0 left-0 w-full bg-red-500 text-white text-center py-2">
          {error}
        </div>
      )}
    </div>
  );
};

export default PropertyDashboard;