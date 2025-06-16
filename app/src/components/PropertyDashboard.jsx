import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  HiOutlineHome,
  HiOutlineChartBar,
  HiOutlineUserGroup,
} from 'react-icons/hi';
import SideMenu from './SideMenu';
import PropertiesPage from './PropertiesPage';
import AnalyticsPage from './AnalyticsPage';
import Deals from './Deals';
import SettingsPage from './SettingsPage';

const PropertyDashboard = () => {
  const [searchParams] = useSearchParams();
  const [dashboardData, setDashboardData] = useState(null);
  const [error, setError] = useState(null);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeItem, setActiveItem] = useState('dashboard');
  const [viewMode, setViewMode] = useState('card');
  const [theme, setTheme] = useState('light');

  const city = searchParams.get('city');
  const area = searchParams.get('area');

  useEffect(() => {
    document.body.className =
      theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900';
  }, [theme]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          `${process.env.REACT_APP_API_URL}/api/dashboard?city=${city}&area=${area}`
        );
        if (!res.ok) throw new Error('Failed to fetch dashboard data.');
        const data = await res.json();
        setDashboardData(data);
      } catch (err) {
        console.error(err);
        setError(err.message);
      }
    };
    if (city && area) fetchData();
  }, [city, area]);

  useEffect(() => {
    // Set active tab from query param if present
    const tab = searchParams.get('tab');
    if (tab) setActiveItem(tab);
  }, [searchParams]);

  const quickStats = [
    {
      icon: <HiOutlineHome className="w-6 h-6 text-blue-500" />,
      label: 'Total Properties',
      value: dashboardData?.properties?.length ?? '--',
    },
    {
      icon: <HiOutlineChartBar className="w-6 h-6 text-green-500" />,
      label: 'Avg. Value',
      value: dashboardData?.average_value
        ? `R${dashboardData.average_value.toLocaleString()}`
        : '--',
    },
    {
      icon: <HiOutlineUserGroup className="w-6 h-6 text-pink-500" />,
      label: 'Active Agents',
      value: dashboardData?.active_agents ?? '--',
    },
    {
      icon: <HiOutlineChartBar className="w-6 h-6 text-yellow-500" />,
      label: 'Deals Closed',
      value: dashboardData?.deals_closed ?? '--',
    },
  ];

  const renderDashboard = () => {
    const bgImage = dashboardData?.area_background_image || '/images/background.jpeg';
    return (
      <section className="w-full min-h-screen bg-gray-50 dark:bg-gray-900">
        <div
          className="h-[320px] md:h-[400px] bg-cover bg-center relative"
          style={{ backgroundImage: `url(${bgImage})` }}
        >
          <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center text-center px-4">
            <h1 className="text-4xl md:text-5xl font-bold text-white drop-shadow">
              {dashboardData?.area_name || 'Unknown Area'}
            </h1>
            <p className="mt-3 text-lg md:text-xl text-white">
              {dashboardData?.area_description || 'Discover the area’s potential.'}
            </p>
          </div>
        </div>

        <div className="max-w-6xl mx-auto -mt-12 md:-mt-16 px-4 z-10 relative">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {quickStats.map((stat) => (
              <div
                key={stat.label}
                className="bg-white dark:bg-gray-800 rounded-xl shadow p-4 text-center"
              >
                <div>{stat.icon}</div>
                <div className="mt-2 text-lg font-bold">{stat.value}</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="max-w-6xl mx-auto mt-10 grid grid-cols-1 md:grid-cols-2 gap-8 px-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
            <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
            <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-2">
              {(dashboardData?.recent_activity ?? ['No recent activity']).map((act, i) => (
                <li key={i} className="border-b pb-2 last:border-none">
                  {act}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 text-center">
            <h3 className="text-lg font-semibold mb-2">Top Performing Agent</h3>
            <p className="text-xl font-bold text-blue-600">
              {dashboardData?.top_agent?.name ?? '--'}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              {dashboardData?.top_agent?.stats ?? 'No stats available.'}
            </p>
          </div>
        </div>
      </section>
    );
  };

  const renderContent = () => {
    switch (activeItem) {
      case 'dashboard':
        return renderDashboard();
      case 'properties':
        return (
          <section className="p-4 max-w-7xl mx-auto w-full">
            <PropertiesPage
              dashboardData={dashboardData}
              viewMode={viewMode}
              setViewMode={setViewMode}
            />
          </section>
        );
      case 'analytics':
        return (
          <section className="p-4 max-w-7xl mx-auto w-full">
            <AnalyticsPage metrics={dashboardData?.activity_metrics ?? {}} />
          </section>
        );
      case 'deals':
        return (
          <section className="p-4 max-w-7xl mx-auto w-full">
            <Deals />
          </section>
        );
      case 'settings':
        return (
          <section className="p-4 max-w-7xl mx-auto w-full">
            <SettingsPage theme={theme} setTheme={setTheme} />
          </section>
        );
      default:
        return <p className="p-4">Page not found.</p>;
    }
  };

  return (
    <div className="flex h-screen w-full bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white transition-all">
      <SideMenu
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
        activeItem={activeItem}
        setActiveItem={setActiveItem}
        theme={theme}
      />
      <main
        className={`flex-1 overflow-y-auto transition-all duration-300 ${
          isCollapsed ? 'ml-16' : 'ml-56'
        }`}
      >
        {renderContent()}
      </main>

      {error && (
        <div className="fixed bottom-0 left-0 w-full bg-red-600 text-white py-2 text-center z-50">
          {error}
        </div>
      )}
    </div>
  );
};

export default PropertyDashboard;
