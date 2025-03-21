import React, { useState } from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet';
import { AlertTriangle, Users, Droplets, Mountain, Calendar, Filter, Download, Radio, Brain, MessageSquare } from 'lucide-react';
import 'leaflet/dist/leaflet.css';

interface RiskZone {
  id: string;
  name: string;
  coordinates: [number, number];
  riskLevel: number;
  population: number;
  waterAccess: number;
  soilDegradation: number;
  conflictHistory: number;
  lastUpdate: string;
}

const RiskZones: React.FC = () => {
  const [selectedYear, setSelectedYear] = useState(2023);

  // Mock risk zones data
  const riskZones: RiskZone[] = [
    {
      id: '1',
      name: 'Northern Tillabéri',
      coordinates: [14.2074, 1.4502],
      riskLevel: 0.85,
      population: 250000,
      waterAccess: 0.3,
      soilDegradation: 0.7,
      conflictHistory: 0.6,
      lastUpdate: '2025-03-15T10:00:00Z'
    },
    {
      id: '2',
      name: 'Eastern Tahoua',
      coordinates: [14.8888, 5.2599],
      riskLevel: 0.65,
      population: 180000,
      waterAccess: 0.4,
      soilDegradation: 0.5,
      conflictHistory: 0.4,
      lastUpdate: '2025-03-15T10:00:00Z'
    },
    {
      id: '3',
      name: 'Southern Maradi',
      coordinates: [13.5000, 7.1000],
      riskLevel: 0.45,
      population: 220000,
      waterAccess: 0.6,
      soilDegradation: 0.3,
      conflictHistory: 0.2,
      lastUpdate: '2025-03-15T10:00:00Z'
    }
  ];

  const getRiskColor = (risk: number) => {
    if (risk >= 0.7) return '#ef4444';
    if (risk >= 0.4) return '#f59e0b';
    return '#22c55e';
  };

  return (
    <div className="space-y-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-red-800 flex items-center gap-2">
          <AlertTriangle className="h-8 w-8" />
          Risk Zones & Conflict Prediction
        </h1>
        <p className="text-gray-600 mt-2">
          Advanced analysis of potential conflict zones based on environmental and social factors
        </p>
      </header>

      <div className="grid md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-md">
          <div className="flex items-center space-x-2 mb-2">
            <AlertTriangle className="h-6 w-6 text-red-600" />
            <h3 className="font-semibold">High Risk Zones</h3>
          </div>
          <p className="text-3xl font-bold text-red-600">3</p>
          <p className="text-sm text-gray-600">Active critical areas</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md">
          <div className="flex items-center space-x-2 mb-2">
            <Users className="h-6 w-6 text-blue-600" />
            <h3 className="font-semibold">Affected Population</h3>
          </div>
          <p className="text-3xl font-bold text-blue-600">650K</p>
          <p className="text-sm text-gray-600">People in risk zones</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md">
          <div className="flex items-center space-x-2 mb-2">
            <Droplets className="h-6 w-6 text-cyan-600" />
            <h3 className="font-semibold">Water Stress</h3>
          </div>
          <p className="text-3xl font-bold text-cyan-600">75%</p>
          <p className="text-sm text-gray-600">Of high-risk areas</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md">
          <div className="flex items-center space-x-2 mb-2">
            <Mountain className="h-6 w-6 text-orange-600" />
            <h3 className="font-semibold">Land Degradation</h3>
          </div>
          <p className="text-3xl font-bold text-orange-600">60%</p>
          <p className="text-sm text-gray-600">Critical soil status</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-gray-500" />
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(Number(e.target.value))}
              className="p-2 border rounded-md focus:ring-2 focus:ring-red-500"
            >
              {[2020, 2021, 2022, 2023].map(year => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
          </div>
          <div className="flex gap-4">
            <button className="p-2 hover:bg-gray-100 rounded-lg">
              <Filter className="h-5 w-5 text-gray-500" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-lg">
              <Download className="h-5 w-5 text-gray-500" />
            </button>
          </div>
        </div>

        <div className="h-[500px] rounded-lg overflow-hidden">
          <MapContainer
            center={[14.2074, 1.4502]}
            zoom={6}
            style={{ height: '100%', width: '100%' }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {riskZones.map(zone => (
              <CircleMarker
                key={zone.id}
                center={zone.coordinates}
                radius={20}
                pathOptions={{
                  color: getRiskColor(zone.riskLevel),
                  fillOpacity: 0.6
                }}
              >
                <Popup>
                  <div className="p-2">
                    <h3 className="font-bold mb-2">{zone.name}</h3>
                    <div className="space-y-1 text-sm">
                      <p>Risk Level: {(zone.riskLevel * 100).toFixed(0)}%</p>
                      <p>Population: {zone.population.toLocaleString()}</p>
                      <p>Water Access: {(zone.waterAccess * 100).toFixed(0)}%</p>
                      <p>Soil Degradation: {(zone.soilDegradation * 100).toFixed(0)}%</p>
                    </div>
                  </div>
                </Popup>
              </CircleMarker>
            ))}
          </MapContainer>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="flex items-center gap-2 mb-6">
          <Radio className="h-6 w-6 text-purple-600" />
          <h2 className="text-xl font-semibold">Community Radio Reports</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          {[
            {
              reporter: "Amadou Diallo",
              location: "Northern Tillabéri",
              message: "Water sources are drying up faster than usual. Herders are moving their cattle earlier than planned.",
              timestamp: "2025-03-15T08:00:00Z",
              station: "Radio Sahel 90.5 FM",
              verified: true
            },
            {
              reporter: "Fatima Ibrahim",
              location: "Eastern Tahoua",
              message: "Local farmers report unusual soil conditions affecting crop growth. Community elders suggest traditional solutions.",
              timestamp: "2025-03-14T15:30:00Z",
              station: "Voice of Sahel 88.3 FM",
              verified: true
            },
            {
              reporter: "Mohammed Toure",
              location: "Southern Maradi",
              message: "Successful implementation of water-sharing agreement between farming and herding communities.",
              timestamp: "2025-03-14T09:15:00Z",
              station: "Community Radio 92.1 FM",
              verified: true
            }
          ].map((report, index) => (
            <div key={index} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-semibold flex items-center gap-2">
                    <MessageSquare className="h-4 w-4 text-purple-600" />
                    {report.reporter}
                  </h3>
                  <p className="text-sm text-gray-600">{report.station}</p>
                </div>
                {report.verified && (
                  <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                    Verified
                  </span>
                )}
              </div>
              <p className="text-gray-800 my-2">{report.message}</p>
              <div className="flex justify-between items-center text-sm text-gray-600">
                <span>{report.location}</span>
                <span>{new Date(report.timestamp).toLocaleString()}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="flex items-center gap-2 mb-6">
          <Brain className="h-6 w-6 text-blue-600" />
          <h2 className="text-xl font-semibold">AI Preventive Alerts</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          {[
            {
              title: "Potential Water Conflict",
              location: "Northern Tillabéri",
              prediction: "High probability of water access disputes in the next 30 days",
              recommendations: [
                "Activate community water-sharing protocols",
                "Deploy mobile water storage units",
                "Initiate stakeholder dialogue"
              ],
              confidence: 85,
              timeframe: "Next 30 days",
              priority: "high"
            },
            {
              title: "Soil Degradation Risk",
              location: "Eastern Tahoua",
              prediction: "Accelerated soil degradation likely to affect crop yields",
              recommendations: [
                "Implement soil conservation measures",
                "Rotate grazing areas",
                "Distribute drought-resistant seeds"
              ],
              confidence: 78,
              timeframe: "Next 60 days",
              priority: "medium"
            },
            {
              title: "Resource Competition",
              location: "Southern Maradi",
              prediction: "Increased likelihood of resource competition due to migration patterns",
              recommendations: [
                "Update resource sharing agreements",
                "Mark and protect critical water points",
                "Establish community monitoring teams"
              ],
              confidence: 92,
              timeframe: "Next 45 days",
              priority: "high"
            }
          ].map((alert, index) => (
            <div key={index} className={`border rounded-lg p-4 ${
              alert.priority === 'high' ? 'border-red-200' : 'border-yellow-200'
            }`}>
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="font-semibold text-lg">{alert.title}</h3>
                  <p className="text-sm text-gray-600">{alert.location}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm ${
                  alert.priority === 'high' 
                    ? 'bg-red-100 text-red-800' 
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {alert.priority.charAt(0).toUpperCase() + alert.priority.slice(1)} Priority
                </span>
              </div>

              <p className="text-gray-800 mb-3">{alert.prediction}</p>

              <div className="mb-3">
                <h4 className="font-semibold mb-2">Recommended Actions:</h4>
                <ul className="space-y-1">
                  {alert.recommendations.map((rec, i) => (
                    <li key={i} className="text-sm text-gray-600 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                      {rec}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex justify-between items-center text-sm pt-3 border-t">
                <div className="flex items-center gap-2">
                  <Brain className="h-4 w-4 text-purple-600" />
                  <span className="text-purple-600">Confidence: {alert.confidence}%</span>
                </div>
                <span className="text-gray-600">Timeframe: {alert.timeframe}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RiskZones;