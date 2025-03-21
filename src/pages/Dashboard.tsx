import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { AlertTriangle, Droplets, Mountain, Trees as Tree, Download, Calendar, Map as MapIcon, FileBarChart, Layers, Building2, Filter } from 'lucide-react';
import { MapContainer, TileLayer, GeoJSON, LayersControl, CircleMarker, Popup } from 'react-leaflet';
import type { LatLngTuple } from 'leaflet';
import type { Feature, FeatureCollection } from 'geojson';
import Plot from 'react-plotly.js';
import 'leaflet/dist/leaflet.css';

const Analysis: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'general' | 'landcover' | 'district'>('general');
  const [selectedDistrict, setSelectedDistrict] = useState<string>('');
  const [degradationEstimationYear, setDegradationEstimationYear] = useState<number>(2025);
  const [rainfallEstimationYear, setRainfallEstimationYear] = useState<number>(2025);
  const [selectedLayers, setSelectedLayers] = useState({
    landCover: true,
    water: true,
    urban: true,
    risk: true
  });
  const [landCoverYear, setLandCoverYear] = useState<number>(2023);
  const [comparisonYear, setComparisonYear] = useState(2010);
  const [showComparison, setShowComparison] = useState(false);
  const [activeLandCoverLayers, setActiveLandCoverLayers] = useState({
    forest: true,
    agricultural: true,
    urban: true,
    water: true
  });

  const districts = [
    { id: '01', name: 'Aghorat' },
    { id: '02', name: 'Barkeiwel' },
    { id: '03', name: 'Blajmil' },
    { id: '04', name: 'Bou Lahrath' },
    { id: '05', name: 'Boumdeid' },
    { id: '06', name: 'Daghveg' },
    { id: '07', name: 'El Ghabra' },
    { id: '08', name: 'El Ghaira' },
    { id: '09', name: 'El Melgue' },
    { id: '10', name: 'Gueller' },
    { id: '11', name: 'Guerou' },
    { id: '12', name: 'Hamed' },
    { id: '13', name: 'Hseiy Tin' },
    { id: '14', name: 'Kamour' },
    { id: '15', name: 'Kankoussa' },
    { id: '16', name: 'Kiffa' },
    { id: '17', name: 'Kouroudjel' },
    { id: '18', name: 'Lavtah' },
    { id: '19', name: 'Laweissi' },
    { id: '20', name: 'Lebheir' },
    { id: '21', name: 'Legrane' },
    { id: '22', name: 'Nouamlein' },
    { id: '23', name: 'Oudeiy Jrid' },
    { id: '24', name: 'R\'Dheidhie' },
    { id: '25', name: 'Sani' },
    { id: '26', name: 'Tenaha' }
  ];

  const degradationData = Array.from({ length: degradationEstimationYear - 2015 + 1 }, (_, i) => ({
    year: 2015 + i,
    value: 45 + i * 3 + Math.random() * 5
  }));

  const rainfallData = Array.from({ length: rainfallEstimationYear - 2015 + 1 }, (_, i) => ({
    year: 2015 + i,
    value: 850 - i * 10 + Math.random() * 50
  }));

  const landCoverData = {
    forest: Array.from({ length: 6 }, (_, i) => ({
      year: 2020 + i,
      value: 25 - i * 0.8 + Math.random() * 2
    })),
    agricultural: Array.from({ length: 6 }, (_, i) => ({
      year: 2020 + i,
      value: 35 + i * 0.5 + Math.random() * 2
    })),
    urban: Array.from({ length: 6 }, (_, i) => ({
      year: 2020 + i,
      value: 10 + i * 0.3 + Math.random() * 1
    })),
    water: Array.from({ length: 6 }, (_, i) => ({
      year: 2020 + i,
      value: 30 - i * 0.2 + Math.random() * 1
    }))
  };

  const rainfallProductivityData = Array.from({ length: 10 }, (_, i) => ({
    rainfall: 800 - i * 10 + Math.random() * 100,
    productivity: 75 - i * 2 + Math.random() * 20,
    year: 2015 + i
  }));

  const isDegradationHigh = degradationData[degradationData.length - 1].value > 60;
  const isRainfallRiskHigh = rainfallData[rainfallData.length - 1].value < 700;
  const lastUpdate = new Date().toLocaleString();

  const renderLandCoverChart = () => {
    const traces = Object.entries(landCoverData).map(([key, data]) => ({
      x: data.map(d => d.year),
      y: data.map(d => d.value),
      name: key.charAt(0).toUpperCase() + key.slice(1),
      type: 'scatter',
      mode: 'lines+markers'
    }));

    return (
      <Plot
        data={traces as any}
        layout={{
          title: 'Land Cover Changes Over Time',
          xaxis: { title: 'Year' },
          yaxis: { title: 'Percentage (%)' },
          height: 300,
          margin: { t: 40, r: 60, l: 60, b: 40 },
          legend: { orientation: 'h', y: -0.2 }
        }}
        config={{ responsive: true }}
      />
    );
  };

  const renderRainfallProductivityPlot = () => {
    return (
      <Plot
        data={[
          {
            x: rainfallProductivityData.map(d => d.rainfall),
            y: rainfallProductivityData.map(d => d.productivity),
            mode: 'markers',
            type: 'scatter',
            marker: {
              size: 10,
              color: rainfallProductivityData.map(d => d.year),
              colorscale: 'Viridis',
              showscale: true
            },
            text: rainfallProductivityData.map(d => `Year: ${d.year}`),
            name: 'Rainfall vs Productivity'
          }
        ]}
        layout={{
          title: 'Rainfall vs Land Productivity',
          xaxis: { title: 'Annual Rainfall (mm)' },
          yaxis: { title: 'Land Productivity Index' },
          height: 300,
          margin: { t: 40, r: 60, l: 60, b: 40 }
        }}
        config={{ responsive: true }}
      />
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-green-800">Welcome, Marcos</h1>
          <div className="flex flex-col items-end gap-2">
            <button
              className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg border shadow-sm hover:bg-gray-50"
            >
              <Download className="h-4 w-4" />
              Export PDF
            </button>
            <p className="text-sm text-gray-600">Last updated: {lastUpdate}</p>
          </div>
        </div>

        <div className="flex space-x-4 mb-6">
          <button
            onClick={() => setActiveTab('general')}
            className={`px-6 py-3 rounded-lg flex items-center gap-2 ${
              activeTab === 'general' 
                ? 'bg-green-600 text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <FileBarChart className="h-5 w-5" />
            General Analysis
          </button>
          <button
            onClick={() => setActiveTab('landcover')}
            className={`px-6 py-3 rounded-lg flex items-center gap-2 ${
              activeTab === 'landcover' 
                ? 'bg-green-600 text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <Layers className="h-5 w-5" />
            Land Cover Analysis
          </button>
          <button
            onClick={() => setActiveTab('district')}
            className={`px-6 py-3 rounded-lg flex items-center gap-2 ${
              activeTab === 'district' 
                ? 'bg-green-600 text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <MapIcon className="h-5 w-5" />
            District Analysis
          </button>
        </div>

        {activeTab === 'general' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-semibold text-green-800 mb-4">Interactive Map</h2>
              <div className="mb-4">
                <select
                  value={selectedDistrict}
                  onChange={(e) => setSelectedDistrict(e.target.value)}
                  className="w-full p-2 border rounded-md focus:ring-2 focus:ring-green-500"
                >
                  <option value="">Select a district</option>
                  {districts.map(district => (
                    <option key={district.id} value={district.id}>
                      {district.name}
                    </option>
                  ))}
                </select>
              </div>
              <p className="text-sm text-gray-600 mb-4">Select the layers you want to display:</p>
              <div className="mb-4 flex flex-wrap gap-2">
                {Object.entries(selectedLayers).map(([layer, active]) => (
                  <button
                    key={layer}
                    onClick={() => setSelectedLayers(prev => ({ ...prev, [layer]: !prev[layer] }))}
                    className={`px-3 py-1 rounded-full text-sm ${
                      active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    {layer}
                  </button>
                ))}
              </div>
              <div className="h-[600px] rounded-lg overflow-hidden">
                <MapContainer
                  center={[14.2074, 1.4502] as LatLngTuple}
                  zoom={7}
                  style={{ height: '100%', width: '100%' }}
                >
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  />
                </MapContainer>
              </div>
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-white p-6 rounded-xl shadow-md">
                  <div className="flex items-center space-x-2 mb-2">
                    <Tree className="h-6 w-6 text-blue-600" />
                    <h3 className="font-semibold">Total Population</h3>
                  </div>
                  <p className="text-3xl font-bold text-blue-600">2.8M</p>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-md">
                  <div className="flex items-center space-x-2 mb-2">
                    <Mountain className="h-6 w-6 text-green-600" />
                    <h3 className="font-semibold">Fertile Fields</h3>
                  </div>
                  <p className="text-3xl font-bold text-green-600">12.5K km²</p>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-md">
                  <div className="flex items-center space-x-2 mb-2">
                    <Droplets className="h-6 w-6 text-cyan-600" />
                    <h3 className="font-semibold">Water Volume</h3>
                  </div>
                  <p className="text-3xl font-bold text-cyan-600">45K m³</p>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-md p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-semibold">Degradation Trends</h3>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-5 w-5 text-gray-500" />
                      <select
                        value={degradationEstimationYear}
                        onChange={(e) => setDegradationEstimationYear(Number(e.target.value))}
                        className="p-2 border rounded-md focus:ring-2 focus:ring-green-500"
                      >
                        {Array.from({ length: 11 }, (_, i) => 2025 + i).map(year => (
                          <option key={year} value={year}>{year}</option>
                        ))}
                      </select>
                    </div>
                    {isDegradationHigh && (
                      <div className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm flex items-center gap-1">
                        <AlertTriangle className="h-4 w-4" />
                        High Risk Alert
                      </div>
                    )}
                  </div>
                </div>
                <div className="h-[200px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={degradationData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="year" />
                      <YAxis />
                      <Tooltip />
                      <Line 
                        type="monotone" 
                        dataKey="value" 
                        stroke="#ef4444" 
                        name="Degradation Index"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-md p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-semibold">Rainfall Patterns (CHIRPS)</h3>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-5 w-5 text-gray-500" />
                      <select
                        value={rainfallEstimationYear}
                        onChange={(e) => setRainfallEstimationYear(Number(e.target.value))}
                        className="p-2 border rounded-md focus:ring-2 focus:ring-green-500"
                      >
                        {Array.from({ length: 11 }, (_, i) => 2025 + i).map(year => (
                          <option key={year} value={year}>{year}</option>
                        ))}
                      </select>
                    </div>
                    {isRainfallRiskHigh && (
                      <div className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm flex items-center gap-1">
                        <AlertTriangle className="h-4 w-4" />
                        Low Rainfall Alert
                      </div>
                    )}
                  </div>
                </div>
                <div className="h-[200px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={rainfallData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="year" />
                      <YAxis />
                      <Tooltip />
                      <Line 
                        type="monotone" 
                        dataKey="value" 
                        stroke="#3b82f6" 
                        name="Annual Rainfall (mm)"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'landcover' && (
          <div className="space-y-6">
            <div className="grid md:grid-cols-4 gap-6">
              {Object.entries(landCoverData).map(([type, data]) => {
                const currentValue = data.find(d => d.year === landCoverYear)?.value || 0;
                const previousValue = data.find(d => d.year === landCoverYear - 1)?.value || 0;
                const change = ((currentValue - previousValue) / previousValue) * 100;

                return (
                  <div key={type} className="bg-white rounded-xl shadow-md p-6">
                    <h3 className="text-lg font-semibold capitalize mb-2">{type}</h3>
                    <p className="text-3xl font-bold text-green-600">{currentValue.toFixed(1)}%</p>
                    <p className={`text-sm ${change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {change >= 0 ? '↑' : '↓'} {Math.abs(change).toFixed(1)}% from previous year
                    </p>
                  </div>
                );
              })}
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-white p-6 rounded-xl shadow-md">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Calendar className="h-4 w-4 inline mr-2" />
                  Select Year
                </label>
                <select
                  value={landCoverYear}
                  onChange={(e) => setLandCoverYear(Number(e.target.value))}
                  className="w-full p-2 border rounded-md focus:ring-2 focus:ring-green-500"
                >
                  {Array.from({ length: 14 }, (_, i) => 2010 + i).map(year => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-md">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Layers className="h-4 w-4 inline mr-2" />
                  Compare With
                </label>
                <div className="flex gap-2">
                  <select
                    value={comparisonYear}
                    onChange={(e) => setComparisonYear(Number(e.target.value))}
                    className="w-full p-2 border rounded-md focus:ring-2 focus:ring-green-500"
                    disabled={!showComparison}
                  >
                    {Array.from({ length: 14 }, (_, i) => 2010 + i).map(year => (
                      <option key={year} value={year}>{year}</option>
                    ))}
                  </select>
                  <button
                    onClick={() => setShowComparison(!showComparison)}
                    className={`p-2 rounded-md ${
                      showComparison ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    <Filter className="h-5 w-5" />
                  </button>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-md">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Layers className="h-4 w-4 inline mr-2" />
                  Layer Visibility
                </label>
                <div className="flex flex-wrap gap-2">
                  {Object.entries(activeLandCoverLayers).map(([layer, active]) => (
                    <button
                      key={layer}
                      onClick={() => setActiveLandCoverLayers(prev => ({ ...prev, [layer]: !prev[layer] }))}
                      className={`px-3 py-1 rounded-full text-sm flex items-center gap-1 ${
                        active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      {layer === 'forest' && <Tree className="h-4 w-4" />}
                      {layer === 'agricultural' && <Tree className="h-4 w-4" />}
                      {layer === 'urban' && <Building2 className="h-4 w-4" />}
                      {layer === 'water' && <Droplets className="h-4 w-4" />}
                      {layer.charAt(0).toUpperCase() + layer.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl shadow-md p-6">
                <h2 className="text-xl font-semibold mb-4">Satellite View</h2>
                <div className="h-[500px] rounded-lg overflow-hidden">
                  <MapContainer
                    center={[14.2074, 1.4502]}
                    zoom={7}
                    style={{ height: '100%', width: '100%' }}
                  >
                    <TileLayer
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />
                    <LayersControl position="topright">
                      {Object.entries(activeLandCoverLayers).map(([layer, active]) => (
                        active && (
                          <LayersControl.Overlay key={layer} checked name={layer}>
                            <TileLayer
                              url={`https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png`}
                              opacity={0.7}
                            />
                          </LayersControl.Overlay>
                        )
                      ))}
                    </LayersControl>
                  </MapContainer>
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-white rounded-xl shadow-md p-6">
                  <h2 className="text-xl font-semibold mb-4">Land Cover Trends</h2>
                  {renderLandCoverChart()}
                </div>

                <div className="bg-white rounded-xl shadow-md p-6">
                  <h2 className="text-xl font-semibold mb-4">Climate Impact Analysis</h2>
                  {renderRainfallProductivityPlot()}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'district' && (
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                <MapIcon className="h-6 w-6 text-green-600" />
                District Analysis
              </h2>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-600">Total Area</p>
                    <p className="text-2xl font-bold text-green-600">
                      🗺️ 97,251 km²
                    </p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-600">Population</p>
                    <p className="text-2xl font-bold text-blue-600">
                      👥 2,722,482
                    </p>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <h3 className="font-semibold mb-2">Environmental Indicators</h3>
                  <div className="space-y-2">
                    {[
                      { key: 'Soil Health', value: 65 },
                      { key: 'Water Availability', value: 45 },
                      { key: 'Vegetation Index', value: 40 },
                      { key: 'Desertification Risk', value: 35 }
                    ].map(({ key, value }) => (
                      <div key={key} className="flex justify-between items-center p-2 bg-gray-50 rounded-lg">
                        <span className="text-gray-600">{key}</span>
                        <span className="font-semibold">{value}%</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border-t pt-4">
                  <h3 className="font-semibold mb-2">Climate Data</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center p-2 bg-gray-50 rounded-lg">
                      <span className="text-gray-600">Average Rainfall</span>
                      <span className="font-semibold">450 mm/year</span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-gray-50 rounded-lg">
                      <span className="text-gray-600">Temperature Range</span>
                      <span className="font-semibold">20°C - 35°C</span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-gray-50 rounded-lg">
                      <span className="text-gray-600">Drought Frequency</span>
                      <span className="font-semibold">30%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-semibold mb-6">Environmental Trends</h2>
              <Plot
                data={[
                  {
                    type: 'scatter',
                    mode: 'lines+markers',
                    name: 'Soil Health',
                    x: [2020, 2021, 2022, 2023, 2024, 2025],
                    y: [70, 68, 65, 63, 60, 58],
                    line: { color: '#84cc16' }
                  },
                  {
                    type: 'scatter',
                    mode: 'lines+markers',
                    name: 'Water Availability',
                    x: [2020, 2021, 2022, 2023, 2024, 2025],
                    y: [55, 52, 48, 45, 42, 40],
                    line: { color: '#0ea5e9' }
                  },
                  {
                    type: 'scatter',
                    mode: 'lines+markers',
                    name: 'Vegetation Index',
                    x: [2020, 2021, 2022, 2023, 2024, 2025],
                    y: [45, 43, 42, 40, 38, 35],
                    line: { color: '#22c55e' }
                  }
                ]}
                layout={{
                  title: 'Environmental Indicators Over Time',
                  height: 400,
                  margin: { t: 40, r: 60, l: 60, b: 40 },
                  yaxis: { title: 'Index Value (%)' },
                  xaxis: { title: 'Year' },
                  legend: { orientation: 'h', y: -0.2 }
                }}
                config={{ responsive: true }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Analysis;