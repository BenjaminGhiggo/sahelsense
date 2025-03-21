import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { AlertTriangle, Droplets, Mountain, Trees as Tree } from 'lucide-react';

const MonitoringDashboard: React.FC = () => {
  // Synthetic data for demonstration
  const monitoringData = [
    { month: 'Jan', soilHealth: 65, waterLevel: 45, desertification: 30 },
    { month: 'Feb', soilHealth: 60, waterLevel: 40, desertification: 35 },
    { month: 'Mar', soilHealth: 55, waterLevel: 35, desertification: 40 },
    { month: 'Apr', soilHealth: 50, waterLevel: 30, desertification: 45 },
    { month: 'May', soilHealth: 45, waterLevel: 25, desertification: 50 },
  ];

  return (
    <div className="space-y-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-green-800">Monitoring Dashboard</h1>
        <p className="text-gray-600 mt-2">Comprehensive environmental monitoring and analysis</p>
      </header>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-md">
          <div className="flex items-center space-x-2 mb-4">
            <Mountain className="h-6 w-6 text-orange-500" />
            <h2 className="text-xl font-semibold">Soil Health Index</h2>
          </div>
          <p className="text-4xl font-bold text-orange-500">45%</p>
          <p className="text-gray-600 mt-2">Critical level - Action needed</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md">
          <div className="flex items-center space-x-2 mb-4">
            <Droplets className="h-6 w-6 text-blue-500" />
            <h2 className="text-xl font-semibold">Water Resources</h2>
          </div>
          <p className="text-4xl font-bold text-blue-500">25%</p>
          <p className="text-gray-600 mt-2">Severe shortage detected</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md">
          <div className="flex items-center space-x-2 mb-4">
            <AlertTriangle className="h-6 w-6 text-red-500" />
            <h2 className="text-xl font-semibold">Desertification Risk</h2>
          </div>
          <p className="text-4xl font-bold text-red-500">50%</p>
          <p className="text-gray-600 mt-2">High risk - Immediate action required</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-xl font-semibold mb-4">Trend Analysis</h2>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={monitoringData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="soilHealth" stroke="#f97316" name="Soil Health" />
              <Line type="monotone" dataKey="waterLevel" stroke="#3b82f6" name="Water Level" />
              <Line type="monotone" dataKey="desertification" stroke="#ef4444" name="Desertification" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-xl font-semibold mb-4">Recent Alerts</h2>
        <div className="space-y-4">
          {[
            {
              title: "Critical Water Shortage",
              description: "Region A experiencing severe water scarcity",
              type: "urgent"
            },
            {
              title: "Soil Degradation Warning",
              description: "Increased erosion detected in Region B",
              type: "warning"
            },
            {
              title: "Vegetation Loss Alert",
              description: "Significant decrease in vegetation cover in Region C",
              type: "info"
            }
          ].map((alert, index) => (
            <div key={index} className={`p-4 rounded-lg ${
              alert.type === 'urgent' ? 'bg-red-100 text-red-800' :
              alert.type === 'warning' ? 'bg-yellow-100 text-yellow-800' :
              'bg-blue-100 text-blue-800'
            }`}>
              <h3 className="font-semibold">{alert.title}</h3>
              <p>{alert.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MonitoringDashboard;