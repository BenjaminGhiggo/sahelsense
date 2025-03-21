export interface MonitoringData {
  region: string;
  soilDegradation: number;
  waterAccess: number;
  desertificationRisk: number;
  timestamp: string;
}

export interface CommunityAction {
  id: string;
  type: 'tree_planting' | 'water_retention' | 'soil_restoration';
  points: number;
  description: string;
  completedBy: string;
  timestamp: string;
  imageUrl?: string;
}

export interface TrainingModule {
  id: string;
  title: string;
  description: string;
  language: string;
  videoUrl?: string;
  completionRate: number;
}

export interface ResourceArea {
  id: string;
  type: 'grazing' | 'water_source' | 'migration_route' | 'agricultural';
  status: 'available' | 'limited' | 'restricted';
  capacity: number;
  lastUpdated: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  alerts?: string[];
}

export interface DistrictProfile {
  id: string;
  name: string;
  area: number;
  population: number;
  landCoverChanges: {
    year: number;
    forest: number;
    grassland: number;
    cropland: number;
    urban: number;
    water: number;
  }[];
  environmentalIndicators: {
    soilHealth: number;
    waterAvailability: number;
    vegetationIndex: number;
    desertificationRisk: number;
  };
  climateData: {
    averageRainfall: number;
    temperatureRange: {
      min: number;
      max: number;
    };
    droughtFrequency: number;
  };
}

export interface RasterData {
  base64_data: string;
  shape: [number, number];
  metadata: {
    crs: string;
    transform: number[];
    dtype: string;
    nodata: null | number;
    driver: string;
    count: number;
    width: number;
    height: number;
  };
}

export interface TimeSeriesData {
  timestamp: string;
  value: number;
}

export interface AnalysisReport {
  districtId: string;
  period: {
    start: string;
    end: string;
  };
  metrics: {
    name: string;
    value: number;
    change: number;
    trend: 'increasing' | 'decreasing' | 'stable';
  }[];
  timeSeries: TimeSeriesData[];
}