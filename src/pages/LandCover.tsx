import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, GeoJSON, LayersControl, CircleMarker, Popup } from 'react-leaflet';
import { Calendar, Layers, ArrowLeftRight, Download, LineChart, CloudRain, Trees as Tree, Building2, Droplets } from 'lucide-react';
import Plot from 'react-plotly.js';
import type { Feature, FeatureCollection } from 'geojson';
import 'leaflet/dist/leaflet.css';

interface LandCoverData {
  year: number;
  forest: number;
  agricultural: number;
  urban: number;
  water: number;
}

const YEARS = Array.from({ length: 14 }, (_, i) => 2010 + i);

const MOCK_LAND_COVER_DATA: LandCoverData[] = YEARS.map(year => ({
  year,
  forest: 25 - Math.floor((year - 2010) * 0.8),
  agricultural: 35 + Math.floor((year - 2010) * 0.5),
  urban: 10 + Math.floor((year - 2010) * 0.3),
  water: 30 - Math.floor((year - 2010) * 0.2)
}));

const MOCK_RAINFALL_DATA = YEARS.map(year => ({
  year,
  rainfall: 800 - Math.floor((year - 2010) * 10) + Math.random() * 100,
  productivity: 75 - Math.floor((year - 2010) * 2) + Math.random() * 20
}));

const LandCover: React.FC = () => {
  const [selectedYear, setSelectedYear] = useState(2023);
  const [comparisonYear, setComparisonYear] = useState(2010);
  const [showComparison, setShowComparison] = useState(false);
  const [activeLayers, setActiveLayers] = useState({
    forest: true,
    agricultural: true,
    urban: true,
    water: true
  });

  const handleExport = (format: 'pdf' | 'csv' | 'image') => {
    console.log(`Exporting in ${format} format...`);
  };

  const renderLandCoverTrends = () => {
    const traces = ['forest', 'agricultural', 'urban', 'water'].map(type => ({
      x: MOCK_LAND_COVER_DATA.map(d => d.year),
      y: MOCK_LAND_COVER_DATA.map(d => d[type as keyof LandCoverData]),
      name: type.charAt(0).toUpperCase() + type.slice(1),
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
          margin: { t: 40, r: 0, l: 40, b: 40 },
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
            x: MOCK_RAINFALL_DATA.map(d => d.rainfall),
            y: MOCK_RAINFALL_DATA.map(d => d.productivity),
            mode: 'markers',
            type: 'scatter',
            marker: {
              size: 10,
              color: MOCK_RAINFALL_DATA.map(d => d.year),
              colorscale: 'Viridis',
              showscale: true
            },
            text: MOCK_RAINFALL_DATA.map(d => `Year: ${d.year}`),
            name: 'Rainfall vs Productivity'
          }
        ]}
        layout={{
          title: 'Rainfall vs Land Productivity',
          xaxis: { title: 'Annual Rainfall (mm)' },
          yaxis: { title: 'Land Productivity Index' },
          height: 300,
          margin: { t: 40, r: 0, l: 40, b: 40 }
        }}
        config={{ responsive: true }}
      />
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 space-y-6">
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-green-800">Land Cover Analysis</h1>
          <p className="text-gray-600 mt-1">Analyze land cover changes in the Sahel region</p>
        </div>
        <button
          onClick={() => handleExport('pdf')}
          className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg border shadow-sm hover:bg-gray-50"
        >
          <Download className="h-4 w-4" />
          Export Report
        </button>
      </header>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Controls */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Calendar className="h-4 w-4 inline mr-2" />
                  Select Year
                </label>
                <select
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(Number(e.target.value))}
                  className="w-full p-2 border rounded-md focus:ring-2 focus:ring-green-500"
                >
                  {YEARS.map(year => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
              </div>

              <div>
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
                    {YEARS.map(year => (
                      <option key={year} value={year}>{year}</option>
                    ))}
                  </select>
                  <button
                    onClick={() => setShowComparison(!showComparison)}
                    className={`p-2 rounded-md ${
                      showComparison ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    <ArrowLeftRight className="h-5 w-5" />
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Layers className="h-4 w-4 inline mr-2" />
                  Layer Visibility
                </label>
                <div className="flex flex-wrap gap-2">
                  {Object.entries(activeLayers).map(([layer, active]) => (
                    <button
                      key={layer}
                      onClick={() => setActiveLayers(prev => ({ ...prev, [layer]: !prev[layer] }))}
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
          </div>

          {/* Map */}
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
                  {Object.entries(activeLayers).map(([layer, active]) => (
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
        </div>

        {/* Analysis Panel */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <LineChart className="h-5 w-5" />
              Land Cover Trends
            </h2>
            {renderLandCoverTrends()}
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <CloudRain className="h-5 w-5" />
              Climate Impact Analysis
            </h2>
            {renderRainfallProductivityPlot()}
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Key Statistics</h2>
            <div className="space-y-4">
              {[
                { label: 'Forest Cover Change', value: '-15%', trend: 'negative' },
                { label: 'Agricultural Expansion', value: '+22%', trend: 'positive' },
                { label: 'Urban Growth', value: '+8%', trend: 'positive' },
                { label: 'Water Body Reduction', value: '-5%', trend: 'negative' }
              ].map((stat, index) => (
                <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-700">{stat.label}</span>
                  <span className={stat.trend === 'positive' ? 'text-green-600' : 'text-red-600'}>
                    {stat.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandCover;