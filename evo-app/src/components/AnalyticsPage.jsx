// src/components/Dashboard/AnalyticsPage.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { HiOutlineChartBar, HiOutlineHome, HiOutlineCurrencyDollar, HiOutlineUserGroup } from 'react-icons/hi';

const icons = {
  deals: <HiOutlineCurrencyDollar className="w-6 h-6" />,
  offers: <HiOutlineHome className="w-6 h-6" />,
  accepted: <HiOutlineUserGroup className="w-6 h-6" />,
  leads: <HiOutlineChartBar className="w-6 h-6" />,
};

const metrics = {
    accepted_offers: { title: 'Accepted Offers', value: '120' },
    new_deals: { title: 'New Deals', value: '45' },
    new_leads: { title: 'New Leads', value: '80' },
    new_offers: { title: 'New Offers', value: '60' }
  };
  

const AnalyticsPage = ({ metrics }) => {
    if (!Array.isArray(metrics)) {
        console.error('Expected metrics to be an array but got:', metrics);
        return <div>Something went wrong with the metrics data.</div>;
    }
    return (
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-4">Analytics Overview</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {metrics.map((metric, index) => (
              <motion.div
                key={index}
                className="bg-white shadow-md rounded-lg p-6"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="text-lg font-semibold text-gray-700">{metric.title}</h3>
                <p className="text-2xl font-bold text-emerald-500 mt-2">{metric.value}</p>
              </motion.div>
            ))}
          </div>
        </div>
      );
};

export default AnalyticsPage;
