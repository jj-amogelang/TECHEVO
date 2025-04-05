import { useState, useEffect } from 'react';

const SettingsPage = ({ theme, setTheme }) => {
  const [selectedTheme, setSelectedTheme] = useState(theme);

  useEffect(() => {
    setTheme(selectedTheme); // Update the theme globally when the user selects a new theme
  }, [selectedTheme, setTheme]);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Settings</h2>
      <div className="space-y-6">
        {/* Theme Setting */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Theme</h3>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setSelectedTheme('light')}
              className={`px-4 py-2 rounded-lg ${
                selectedTheme === 'light'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Light
            </button>
            <button
              onClick={() => setSelectedTheme('dark')}
              className={`px-4 py-2 rounded-lg ${
                selectedTheme === 'dark'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Dark
            </button>
          </div>
        </div>

        {/* Other Settings */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Account Settings</h3>
          <p className="text-gray-600">Manage your account details and preferences.</p>
        </div>

        <div className="bg-white shadow-md rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Notifications</h3>
          <p className="text-gray-600">Customize your notification preferences.</p>
        </div>

        <div className="bg-white shadow-md rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Privacy</h3>
          <p className="text-gray-600">Control your privacy settings and data usage.</p>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;