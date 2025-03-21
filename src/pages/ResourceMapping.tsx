import React, { useState } from 'react';
import { Map, AlertTriangle, Droplets, Route, Car as Farm, Brain, ArrowRight, Users, Calendar, Target, BarChart as ChartBar, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import type { ResourceArea } from '../types';

interface Project {
  title: string;
  description: string;
  impact: string;
  timeframe: string;
  confidence: number;
  beneficiaries: number;
  cost: string;
  roi: number;
  environmentalImpact: string;
  risks: string[];
  requirements: string[];
  sustainabilityScore: number;
}

const ResourceMapping: React.FC = () => {
  const navigate = useNavigate();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  
  const resourceAreas: ResourceArea[] = [
    {
      id: '1',
      type: 'grazing',
      status: 'available',
      capacity: 75,
      lastUpdated: '2025-03-15T10:00:00Z',
      coordinates: { lat: 14.7167, lng: 17.4677 },
      alerts: ['Moderate vegetation cover', 'Suitable for short-term grazing']
    },
    {
      id: '2',
      type: 'water_source',
      status: 'limited',
      capacity: 45,
      lastUpdated: '2025-03-15T09:30:00Z',
      coordinates: { lat: 14.8234, lng: 17.5123 },
      alerts: ['Decreasing water levels', 'Shared with local farmers']
    },
    {
      id: '3',
      type: 'migration_route',
      status: 'available',
      capacity: 100,
      lastUpdated: '2025-03-15T08:45:00Z',
      coordinates: { lat: 14.9001, lng: 17.6054 },
      alerts: ['Traditional route active', 'No conflicts reported']
    }
  ];

  const recommendedProjects: Project[] = [
    {
      title: "Water Retention System",
      description: "Install sustainable water retention system in Region B based on soil composition and rainfall patterns",
      impact: "High",
      timeframe: "3-6 months",
      confidence: 85,
      beneficiaries: 2500,
      cost: "150,000",
      roi: 2.5,
      environmentalImpact: "Significant improvement in groundwater levels and soil moisture",
      risks: ["Weather dependencies", "Community adoption rate"],
      requirements: ["Local materials", "Community training", "Technical expertise"],
      sustainabilityScore: 85
    },
    {
      title: "Drought-Resistant Agriculture",
      description: "Implement drought-resistant crop varieties in identified fertile zones",
      impact: "Medium",
      timeframe: "6-12 months",
      confidence: 78,
      beneficiaries: 1800,
      cost: "95,000",
      roi: 1.8,
      environmentalImpact: "Enhanced soil fertility and reduced water consumption",
      risks: ["Seed availability", "Market acceptance"],
      requirements: ["Agricultural training", "Seed supply chain", "Monitoring system"],
      sustainabilityScore: 75
    },
    {
      title: "Soil Restoration Initiative",
      description: "Strategic soil restoration program using local materials and traditional techniques",
      impact: "High",
      timeframe: "12-18 months",
      confidence: 92,
      beneficiaries: 3200,
      cost: "280,000",
      roi: 3.2,
      environmentalImpact: "Major improvement in soil quality and biodiversity",
      risks: ["Long-term maintenance", "Resource availability"],
      requirements: ["Expert consultation", "Community participation", "Monitoring tools"],
      sustainabilityScore: 90
    }
  ];

  return (
    <div className="space-y-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-green-800">Resource Mapping</h1>
        <p className="text-gray-600 mt-2">Intelligent mapping of shared resources and safe migration routes</p>
      </header>

      <div className="grid md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-md">
          <div className="flex items-center space-x-2 mb-2">
            <Farm className="h-6 w-6 text-green-600" />
            <h3 className="font-semibold">Grazing Areas</h3>
          </div>
          <p className="text-3xl font-bold text-green-600">12</p>
          <p className="text-sm text-gray-600">Available zones</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md">
          <div className="flex items-center space-x-2 mb-2">
            <Droplets className="h-6 w-6 text-blue-600" />
            <h3 className="font-semibold">Water Sources</h3>
          </div>
          <p className="text-3xl font-bold text-blue-600">8</p>
          <p className="text-sm text-gray-600">Active sources</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md">
          <div className="flex items-center space-x-2 mb-2">
            <Route className="h-6 w-6 text-purple-600" />
            <h3 className="font-semibold">Migration Routes</h3>
          </div>
          <p className="text-3xl font-bold text-purple-600">5</p>
          <p className="text-sm text-gray-600">Safe passages</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md">
          <div className="flex items-center space-x-2 mb-2">
            <AlertTriangle className="h-6 w-6 text-yellow-600" />
            <h3 className="font-semibold">Active Alerts</h3>
          </div>
          <p className="text-3xl font-bold text-yellow-600">3</p>
          <p className="text-sm text-gray-600">Current warnings</p>
          <button
            onClick={() => navigate('/risk-zones')}
            className="mt-4 w-full flex items-center justify-center gap-2 px-4 py-2 bg-red-50 text-red-700 rounded-lg hover:bg-red-100 transition-colors"
          >
            <AlertTriangle className="h-4 w-4" />
            View Risk Zones
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-semibold mb-6">Available Resources</h2>
          <div className="space-y-4">
            {resourceAreas.map(area => (
              <div key={area.id} className="border rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-semibold capitalize">{area.type.replace('_', ' ')}</h3>
                    <p className="text-sm text-gray-600">
                      Last updated: {new Date(area.lastUpdated).toLocaleString()}
                    </p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm ${
                    area.status === 'available' 
                      ? 'bg-green-100 text-green-800' 
                      : area.status === 'limited'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {area.status}
                  </span>
                </div>
                <div className="mt-2">
                  <div className="flex justify-between text-sm mb-1">
                    <span>Capacity</span>
                    <span>{area.capacity}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${
                        area.capacity > 70 ? 'bg-green-600' :
                        area.capacity > 30 ? 'bg-yellow-600' : 'bg-red-600'
                      }`}
                      style={{ width: `${area.capacity}%` }}
                    />
                  </div>
                </div>
                {area.alerts && (
                  <div className="mt-3">
                    {area.alerts.map((alert, index) => (
                      <p key={index} className="text-sm text-gray-600 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-gray-400"></span>
                        {alert}
                      </p>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center gap-2 mb-6">
            <h2 className="text-xl font-semibold">Recommended Projects</h2>
            <Brain className="h-5 w-5 text-purple-600" />
          </div>
          <p className="text-gray-600 mb-6 text-sm">
            AI-powered project recommendations based on comprehensive data analysis.
          </p>
          <div className="space-y-4">
            {recommendedProjects.map((project, index) => (
              <div key={index} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-semibold">{project.title}</h3>
                    <p className="text-sm text-gray-600 mt-1">{project.description}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm ${
                    project.impact === 'High' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                  }`}>
                    {project.impact} Impact
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 mb-3">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-gray-500" />
                    <span className="text-sm text-gray-600">{project.timeframe}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-gray-500" />
                    <span className="text-sm text-gray-600">{project.beneficiaries} beneficiaries</span>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedProject(project)}
                  className="w-full mt-2 px-4 py-2 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors flex items-center justify-center gap-2"
                >
                  View Details
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Project Details Modal */}
      {selectedProject && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-2xl font-bold">{selectedProject.title}</h2>
                  <p className="text-gray-600 mt-1">{selectedProject.description}</p>
                </div>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="p-2 hover:bg-gray-100 rounded-full"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold mb-2">Project Overview</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-3 bg-gray-50 rounded-lg">
                        <p className="text-sm text-gray-600">Timeframe</p>
                        <p className="font-semibold">{selectedProject.timeframe}</p>
                      </div>
                      <div className="p-3 bg-gray-50 rounded-lg">
                        <p className="text-sm text-gray-600">Beneficiaries</p>
                        <p className="font-semibold">{selectedProject.beneficiaries}</p>
                      </div>
                      <div className="p-3 bg-gray-50 rounded-lg">
                        <p className="text-sm text-gray-600">Cost</p>
                        <p className="font-semibold">${selectedProject.cost}</p>
                      </div>
                      <div className="p-3 bg-gray-50 rounded-lg">
                        <p className="text-sm text-gray-600">ROI</p>
                        <p className="font-semibold">{selectedProject.roi}x</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">Environmental Impact</h3>
                    <p className="text-gray-600">{selectedProject.environmentalImpact}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold mb-2">Requirements</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.requirements.map((req, i) => (
                        <span key={i} className="px-3 py-1 bg-gray-100 rounded-full text-sm">
                          {req}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">Risk Factors</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.risks.map((risk, i) => (
                        <span key={i} className="px-3 py-1 bg-red-50 text-red-600 rounded-full text-sm">
                          {risk}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-center pt-4 border-t">
                <div className="flex items-center gap-2">
                  <Brain className="h-5 w-5 text-purple-600" />
                  <span className="text-purple-600 font-semibold">
                    AI Confidence: {selectedProject.confidence}%
                  </span>
                </div>
                <div>
                  <span className="text-green-600 font-semibold">
                    Sustainability Score: {selectedProject.sustainabilityScore}%
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResourceMapping;