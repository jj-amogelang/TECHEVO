import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { HiArrowLeft } from 'react-icons/hi';
import { Bar, Line, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Tooltip,
  Legend
);

const mockReportData = {
  propertyName: "The Leonardo",
  address: "75 Maude St, Sandton",
  revenue: 528976.82,
  deals: 256,
  value: 528000,
  winRate: 44,
  leads: 118,
  bestDeal: { value: 42300, client: "Rolf Inc." },
  topSales: { count: 72, agent: "Mikasa" },
  platforms: [
    { name: 'Private Property', value: 227459, percent: 43 },
    { name: 'Property24', value: 142823, percent: 27 },
    { name: 'Remax', value: 89935, percent: 11 },
    { name: 'Pam Golding', value: 37028, percent: 7 },
  ],
  sales: [
    { name: "Armin A.", revenue: 209633, leads: 41, kpi: 0.84, win: 31, lose: 12 },
    { name: "Mikasa A.", revenue: 156841, leads: 54, kpi: 1.03, win: 39, lose: 21 },
    { name: "Eren Y.", revenue: 117115, leads: 23, kpi: 0.89, win: 22, lose: 8 },
  ],
  salesDynamic: [
    { month: "Sep", value: 11035 },
    { month: "Oct", value: 6901 },
    { month: "Nov", value: 9028 },
  ],
};

const PropertyReportPage = () => {
  const { propertyId } = useParams();
  const navigate = useNavigate();
  const [reportData, setReportData] = useState(null);

  useEffect(() => {
    const navbar = document.getElementById('navbar');
    if (navbar) navbar.style.display = 'none';
    return () => {
      if (navbar) navbar.style.display = '';
    };
  }, []);

  useEffect(() => {
    setReportData(mockReportData);
  }, [propertyId]);

  if (!reportData) return <div className="p-8 text-center">Loading Report...</div>;

  const barData = {
    labels: reportData.salesDynamic.map((d) => d.month),
    datasets: [
      {
        label: 'Monthly Revenue (R)',
        data: reportData.salesDynamic.map((d) => d.value),
        backgroundColor: '#4f46e5',
      },
    ],
  };

  const lineData = {
    labels: reportData.sales.map((s) => s.name),
    datasets: [
      {
        label: 'Agent Revenue (R)',
        data: reportData.sales.map((s) => s.revenue),
        borderColor: '#10b981',
        backgroundColor: 'rgba(16,185,129,0.2)',
        tension: 0.4,
      },
    ],
  };

  const pieData = {
    labels: reportData.platforms.map((p) => p.name),
    datasets: [
      {
        label: 'Platform Share',
        data: reportData.platforms.map((p) => p.value),
        backgroundColor: ['#60a5fa', '#f472b6', '#fbbf24', '#34d399'],
      },
    ],
  };

  return (
    <div className="p-4 md:p-10 bg-gradient-to-br from-slate-50 to-blue-100 min-h-screen">
      <button
        onClick={() => navigate('/dashboard?tab=propertiespage')}
        className="flex items-center px-4 py-2 mb-6 bg-white hover:bg-slate-100 text-blue-700 font-semibold rounded-lg shadow border border-blue-200"
      >
        <HiArrowLeft className="mr-2 w-5 h-5" />
        Back to Properties
      </button>

      <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-xl p-6 md:p-10">
        <div className="flex flex-col md:flex-row justify-between mb-8">
          <div>
            <h1 className="text-3xl font-extrabold text-blue-900 mb-1">{reportData.propertyName} - Property Report</h1>
            <p className="text-gray-500 text-sm">{reportData.address} &bull; ID: {propertyId}</p>
          </div>
          <div className="flex flex-col md:flex-row gap-4 text-center">
            <div className="bg-blue-50 px-4 py-2 rounded-lg shadow">
              <div className="text-xs text-gray-500">Top Sales</div>
              <div className="text-lg font-bold">{reportData.topSales.count}</div>
              <div className="text-xs text-blue-700">{reportData.topSales.agent}</div>
            </div>
            <div className="bg-green-50 px-4 py-2 rounded-lg shadow">
              <div className="text-xs text-gray-500">Best Deal</div>
              <div className="text-lg font-bold">R{reportData.bestDeal.value.toLocaleString()}</div>
              <div className="text-xs text-green-700">{reportData.bestDeal.client}</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
          <div className="bg-white border rounded-xl p-4 text-center shadow">
            <div className="text-xs text-gray-500">Revenue</div>
            <div className="text-2xl font-bold text-blue-900">R{reportData.revenue.toLocaleString()}</div>
          </div>
          <div className="bg-white border rounded-xl p-4 text-center shadow">
            <div className="text-xs text-gray-500">Deals</div>
            <div className="text-2xl font-bold text-pink-700">{reportData.deals}</div>
          </div>
          <div className="bg-white border rounded-xl p-4 text-center shadow">
            <div className="text-xs text-gray-500">Property Value</div>
            <div className="text-2xl font-bold text-green-700">R{reportData.value.toLocaleString()}</div>
          </div>
          <div className="bg-white border rounded-xl p-4 text-center shadow">
            <div className="text-xs text-gray-500">Win Rate</div>
            <div className="text-2xl font-bold text-yellow-700">{reportData.winRate}%</div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
          <div className="bg-white p-4 rounded-xl shadow">
            <h2 className="text-md font-semibold mb-2 text-blue-800">Monthly Revenue</h2>
            <Bar data={barData} options={{ plugins: { legend: { display: false } } }} />
          </div>
          <div className="bg-white p-4 rounded-xl shadow">
            <h2 className="text-md font-semibold mb-2 text-green-800">Agent Revenue</h2>
            <Line data={lineData} options={{ plugins: { legend: { display: false } } }} />
          </div>
          <div className="bg-white p-4 rounded-xl shadow">
            <h2 className="text-md font-semibold mb-2 text-yellow-600">Platform Share</h2>
            <Pie data={pieData} />
          </div>
        </div>

        <div className="mb-10">
          <h2 className="text-lg font-bold text-blue-900 mb-4">Platform Breakdown</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {reportData.platforms.map((p) => (
              <div key={p.name} className="flex items-center justify-between bg-blue-50 rounded-xl p-4 shadow">
                <span className="font-semibold text-blue-900">{p.name}</span>
                <span className="font-bold">R{p.value.toLocaleString()}</span>
                <span className="text-gray-500">{p.percent}%</span>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-10">
          <h2 className="text-lg font-bold text-blue-900 mb-4">Sales Team Performance</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border rounded-xl shadow">
              <thead>
                <tr className="text-left">
                  <th className="px-4 py-2 text-xs text-gray-500">Name</th>
                  <th className="px-4 py-2 text-xs text-gray-500">Revenue</th>
                  <th className="px-4 py-2 text-xs text-gray-500">Leads</th>
                  <th className="px-4 py-2 text-xs text-gray-500">KPI</th>
                  <th className="px-4 py-2 text-xs text-gray-500">Win</th>
                  <th className="px-4 py-2 text-xs text-gray-500">Lose</th>
                </tr>
              </thead>
              <tbody>
                {reportData.sales.map((s) => (
                  <tr key={s.name} className="border-t">
                    <td className="px-4 py-2 font-medium">{s.name}</td>
                    <td className="px-4 py-2">R{s.revenue.toLocaleString()}</td>
                    <td className="px-4 py-2">{s.leads}</td>
                    <td className="px-4 py-2">{s.kpi}</td>
                    <td className="px-4 py-2">{s.win}</td>
                    <td className="px-4 py-2">{s.lose}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="text-center text-gray-400 py-4 border-t">
          More property analytics and insights coming soon...
        </div>
      </div>
    </div>
  );
};

export default PropertyReportPage;