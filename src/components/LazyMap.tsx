import React, { lazy, Suspense } from 'react';
import type { FeatureCollection } from 'geojson';

const MapContainer = lazy(() => import('react-leaflet').then(module => ({ default: module.MapContainer })));
const TileLayer = lazy(() => import('react-leaflet').then(module => ({ default: module.TileLayer })));
const GeoJSON = lazy(() => import('react-leaflet').then(module => ({ default: module.GeoJSON })));

interface LazyMapProps {
  districts: FeatureCollection | null;
  roads: FeatureCollection | null;
  water: FeatureCollection | null;
  showDistricts: boolean;
  showRoads: boolean;
  showWater: boolean;
  selectedYear: number;
}

const LazyMap: React.FC<LazyMapProps> = ({
  districts,
  roads,
  water,
  showDistricts,
  showRoads,
  showWater,
  selectedYear
}) => {
  return (
    <Suspense fallback={<div className="h-[500px] flex items-center justify-center bg-gray-50 rounded-lg">
      <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-green-500"></div>
    </div>}>
      <div className="h-[500px] rounded-lg overflow-hidden">
        <MapContainer
          center={[17.0, -11.0]}
          zoom={7}
          style={{ height: '100%', width: '100%' }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {showDistricts && districts && (
            <GeoJSON 
              key={`districts-${selectedYear}`}
              data={districts} 
              style={{ color: '#047857', weight: 2, fillOpacity: 0.2 }}
            />
          )}
          {showRoads && roads && (
            <GeoJSON 
              key={`roads-${selectedYear}`}
              data={roads} 
              style={{ color: '#2563eb', weight: 3 }}
            />
          )}
          {showWater && water && (
            <GeoJSON 
              key={`water-${selectedYear}`}
              data={water} 
              style={{ color: '#7c3aed', weight: 2 }}
            />
          )}
        </MapContainer>
      </div>
    </Suspense>
  );
};

export default LazyMap;