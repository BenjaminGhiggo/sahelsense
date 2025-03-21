import React, { useState } from 'react';
import { Map, FileBarChart, Download, Filter } from 'lucide-react';
import type { DistrictProfile as DistrictProfileType, AnalysisReport } from '../types';
import LazyPlot from '../components/LazyPlot';

const DistrictProfile: React.FC = () => {
  const [selectedDistrict, setSelectedDistrict] = useState<string>('');
  const [timeRange, setTimeRange] = useState({ start: 2010, end: 2020 });
  const [coverageTab, setCoverageTab] = useState<'profile' | 'analysis'>('profile');

  const generateLandCoverChanges = (
    startYear: number = 2010,
    baseForest: number,
    baseGrassland: number,
    baseCropland: number,
    baseUrban: number,
    baseWater: number
  ) => {
    return [2010, 2015, 2020].map((year, index) => ({
      year,
      forest: Math.max(0, baseForest - index * 1.5),
      grassland: Math.max(0, baseGrassland - index * 1.2),
      cropland: baseCropland + index * 1.8,
      urban: baseUrban + index * 0.8,
      water: Math.max(0, baseWater - index * 0.2)
    }));
  };

  const districts: DistrictProfileType[] = [
    {
      id: '01',
      name: 'Aghorat',
      area: 12500,
      population: 145000,
      landCoverChanges: generateLandCoverChanges(2010, 25, 45, 15, 5, 10),
      environmentalIndicators: {
        soilHealth: 65,
        waterAvailability: 45,
        vegetationIndex: 0.4,
        desertificationRisk: 35
      },
      climateData: {
        averageRainfall: 450,
        temperatureRange: { min: 20, max: 35 },
        droughtFrequency: 0.3
      }
    },
    {
      id: '02',
      name: 'Barkeiwel',
      area: 11800,
      population: 138000,
      landCoverChanges: generateLandCoverChanges(2010, 22, 48, 16, 4, 10),
      environmentalIndicators: {
        soilHealth: 62,
        waterAvailability: 42,
        vegetationIndex: 0.38,
        desertificationRisk: 38
      },
      climateData: {
        averageRainfall: 420,
        temperatureRange: { min: 22, max: 36 },
        droughtFrequency: 0.32
      }
    },
    {
      id: '26',
      name: 'Tenaha',
      area: 9200,
      population: 108000,
      landCoverChanges: generateLandCoverChanges(2010, 20, 42, 20, 8, 10),
      environmentalIndicators: {
        soilHealth: 56,
        waterAvailability: 36,
        vegetationIndex: 0.31,
        desertificationRisk: 44
      },
      climateData: {
        averageRainfall: 360,
        temperatureRange: { min: 23, max: 39 },
        droughtFrequency: 0.38
      }
    }
  ].map(district => ({
    ...district,
    landCoverChanges: generateLandCoverChanges(
      2010,
      20 + Math.random() * 10,  // forest: 20-30%
      40 + Math.random() * 10,  // grassland: 40-50%
      15 + Math.random() * 10,  // cropland: 15-25%
      5 + Math.random() * 5,    // urban: 5-10%
      8 + Math.random() * 4     // water: 8-12%
    )
  }));

  const districtProfile = districts.find(d => d.id === selectedDistrict);

  const getIndicatorIcon = (value: number) => {
    if (value >= 70) return '🟢';
    if (value >= 40) return '🟡';
    return '🔴';
  };

  const getWeatherEmoji = (type: string) => {
    switch (type) {
      case 'rain': return '🌧️';
      case 'temp': return '🌡️';
      case 'drought': return '☀️';
      default: return '🌍';
    }
  };

  const renderLandCoverChart = () => {
    if (!districtProfile) return null;

    const years = districtProfile.landCoverChanges.map(d => d.year);
    const categories = ['forest', 'grassland', 'cropland', 'urban', 'water'];
    const traces = categories.map(category => ({
      x: years,
      y: districtProfile.landCoverChanges.map(d => d[category as keyof typeof d]),
      name: category.charAt(0).toUpperCase() + category.slice(1),
      type: 'scatter',
      mode: 'lines+markers'
    }));

    return (
      <LazyPlot
        data={traces as any}
        layout={{
          title: 'Land Cover Changes Over Time',
          xaxis: { title: 'Year' },
          yaxis: { title: 'Percentage (%)' },
          height: 400,
          margin: { t: 40, r: 0, l: 40, b: 40 },
          legend: { orientation: 'h', y: -0.2 }
        }}
        config={{ responsive: true }}
      />
    );
  };

  return (
    <div className="space-y-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-green-800">District Profile</h1>
        <p className="text-gray-600 mt-2">Comprehensive district analysis and monitoring</p>
      </header>

      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-md">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <Map className="h-6 w-6 text-green-600" />
              <h2 className="text-xl font-semibold">District Selection</h2>
            </div>
            <Filter className="h-5 w-5 text-gray-400" />
          </div>
          <select
            value={selectedDistrict}
            onChange={(e) => setSelectedDistrict(e.target.value)}
            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-green-500"
          >
            <option value="">Select a district</option>
            {districts.map(district => (
              <option key={district.id} value={district.id}>
                📍 {district.name}
              </option>
            ))}
          </select>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <FileBarChart className="h-6 w-6 text-blue-600" />
              <h2 className="text-xl font-semibold">Time Range</h2>
            </div>
            <Download className="h-5 w-5 text-gray-400" />
          </div>
          <div className="flex space-x-4">
            <select
              value={timeRange.start}
              onChange={(e) => setTimeRange({ ...timeRange, start: Number(e.target.value) })}
              className="w-1/2 p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
            >
              {Array.from({ length: 11 }, (_, i) => 2010 + i).map(year => (
                <option key={year} value={year}>📅 {year}</option>
              ))}
            </select>
            <select
              value={timeRange.end}
              onChange={(e) => setTimeRange({ ...timeRange, end: Number(e.target.value) })}
              className="w-1/2 p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
            >
              {Array.from({ length: 11 }, (_, i) => 2010 + i).map(year => (
                <option key={year} value={year}>📅 {year}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {districtProfile && (
        <div className="space-y-6">
          <div className="flex space-x-4 mb-6">
            <button
              onClick={() => setCoverageTab('profile')}
              className={`px-6 py-3 rounded-lg flex items-center gap-2 ${
                coverageTab === 'profile' 
                  ? 'bg-green-600 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <Map className="h-5 w-5" />
              District Profile
            </button>
            <button
              onClick={() => setCoverageTab('analysis')}
              className={`px-6 py-3 rounded-lg flex items-center gap-2 ${
                coverageTab === 'analysis' 
                  ? 'bg-green-600 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <FileBarChart className="h-5 w-5" />
              Analysis Report
            </button>
          </div>

          {coverageTab === 'profile' && (
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white rounded-xl shadow-md p-6">
                <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                  <Map className="h-6 w-6 text-green-600" />
                  District Profile
                </h2>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-600">Total Area</p>
                      <p className="text-2xl font-bold text-green-600">
                        🗺️ {districtProfile.area} km²
                      </p>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-600">Population</p>
                      <p className="text-2xl font-bold text-blue-600">
                        👥 {districtProfile.population.toLocaleString()}
                      </p>
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <h3 className="font-semibold mb-2">Environmental Indicators</h3>
                    <div className="space-y-2">
                      {Object.entries(districtProfile.environmentalIndicators).map(([key, value]) => (
                        <div key={key} className="flex justify-between items-center p-2 bg-gray-50 rounded-lg">
                          <span className="text-gray-600">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                          <span className="font-semibold">{value} {getIndicatorIcon(value * 100)}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <h3 className="font-semibold mb-2">Climate Data</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center p-2 bg-gray-50 rounded-lg">
                        <span className="text-gray-600">Average Rainfall</span>
                        <span className="font-semibold">
                          {getWeatherEmoji('rain')} {districtProfile.climateData.averageRainfall} mm/year
                        </span>
                      </div>
                      <div className="flex justify-between items-center p-2 bg-gray-50 rounded-lg">
                        <span className="text-gray-600">Temperature Range</span>
                        <span className="font-semibold">
                          {getWeatherEmoji('temp')} {districtProfile.climateData.temperatureRange.min}°C - {districtProfile.climateData.temperatureRange.max}°C
                        </span>
                      </div>
                      <div className="flex justify-between items-center p-2 bg-gray-50 rounded-lg">
                        <span className="text-gray-600">Drought Frequency</span>
                        <span className="font-semibold">
                          {getWeatherEmoji('drought')} {(districtProfile.climateData.droughtFrequency * 100).toFixed(1)}%
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-md p-6">
                <h2 className="text-xl font-semibold mb-6">Land Cover Analysis</h2>
                {renderLandCoverChart()}
              </div>
            </div>
          )}

          {coverageTab === 'analysis' && (
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                <FileBarChart className="h-6 w-6 text-blue-600" />
                Change Analysis Report
              </h2>
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                {[
                  { name: 'Forest Cover Change', value: -5, change: -33.3, trend: 'decreasing' },
                  { name: 'Grassland Change', value: -5, change: -11.1, trend: 'decreasing' },
                  { name: 'Agricultural Expansion', value: 5, change: 20, trend: 'increasing' }
                ].map((metric, index) => (
                  <div key={index} className="p-4 bg-gray-50 rounded-lg">
                    <h3 className="font-semibold mb-2">{metric.name}</h3>
                    <p className={`text-2xl font-bold ${
                      metric.trend === 'increasing' ? 'text-green-600' :
                      metric.trend === 'decreasing' ? 'text-red-600' :
                      'text-gray-600'
                    }`}>
                      {metric.trend === 'increasing' ? '📈' : '📉'} {metric.change > 0 ? '+' : ''}{metric.change}%
                    </p>
                  </div>
                ))}
              </div>

              <LazyPlot
                data={[{
                  x: Array.from({ length: 11 }, (_, i) => `${timeRange.start + i}-01-01`),
                  y: Array.from({ length: 11 }, () => Math.random() * 100),
                  type: 'scatter',
                  mode: 'lines+markers',
                  name: 'Trend',
                  line: { color: '#059669' }
                }]}
                layout={{
                  title: 'Historical Trend Analysis',
                  xaxis: { title: 'Year' },
                  yaxis: { title: 'Value' },
                  height: 300,
                  margin: { t: 40, r: 0, l: 40, b: 40 }
                }}
                config={{ responsive: true }}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default DistrictProfile;