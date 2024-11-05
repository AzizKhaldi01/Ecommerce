import React from 'react';

const Dashboard: React.FC = () => {
  return (
    <div className="p-6  min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-700">Overview</h2>
          <p className="text-gray-500">Summary of recent activity and statistics.</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-700">Reports</h2>
          <p className="text-gray-500">View detailed reports and analytics.</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-700">Settings</h2>
          <p className="text-gray-500">Manage dashboard and account settings.</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
