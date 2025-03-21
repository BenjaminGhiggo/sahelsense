import React from 'react';
import { Play, Book, Globe, Award } from 'lucide-react';
import type { TrainingModule } from '../types';

const TrainingHub: React.FC = () => {
  const trainingModules: TrainingModule[] = [
    {
      id: '1',
      title: 'Soil Restoration Techniques',
      description: 'Learn effective methods for restoring degraded soil using local materials',
      language: 'French',
      videoUrl: 'https://example.com/video1',
      completionRate: 75
    },
    {
      id: '2',
      title: 'Water Conservation Strategies',
      description: 'Discover traditional and modern water conservation methods',
      language: 'Hausa',
      videoUrl: 'https://example.com/video2',
      completionRate: 60
    },
    {
      id: '3',
      title: 'Tree Planting Guide',
      description: 'Step-by-step guide to planting and maintaining drought-resistant trees',
      language: 'Bambara',
      videoUrl: 'https://example.com/video3',
      completionRate: 90
    }
  ];

  return (
    <div className="space-y-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-green-800">Training Hub</h1>
        <p className="text-gray-600 mt-2">Access practical environmental restoration training in local languages</p>
      </header>

      <div className="grid md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-md">
          <div className="flex items-center space-x-2 mb-2">
            <Play className="h-6 w-6 text-green-600" />
            <h3 className="font-semibold">Video Lessons</h3>
          </div>
          <p className="text-3xl font-bold text-green-600">24</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md">
          <div className="flex items-center space-x-2 mb-2">
            <Book className="h-6 w-6 text-blue-600" />
            <h3 className="font-semibold">Guides</h3>
          </div>
          <p className="text-3xl font-bold text-blue-600">15</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md">
          <div className="flex items-center space-x-2 mb-2">
            <Globe className="h-6 w-6 text-purple-600" />
            <h3 className="font-semibold">Languages</h3>
          </div>
          <p className="text-3xl font-bold text-purple-600">6</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md">
          <div className="flex items-center space-x-2 mb-2">
            <Award className="h-6 w-6 text-yellow-600" />
            <h3 className="font-semibold">Certificates</h3>
          </div>
          <p className="text-3xl font-bold text-yellow-600">120</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-green-800">Featured Courses</h2>
          {trainingModules.map(module => (
            <div key={module.id} className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{module.title}</h3>
                    <p className="text-gray-600">{module.description}</p>
                  </div>
                  <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                    {module.language}
                  </span>
                </div>
                <div className="mt-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span>Progress</span>
                    <span>{module.completionRate}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-green-600 h-2 rounded-full" 
                      style={{ width: `${module.completionRate}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-2xl font-semibold text-green-800 mb-6">Upcoming Live Sessions</h2>
          <div className="space-y-4">
            {[
              {
                title: 'Advanced Soil Testing Methods',
                instructor: 'Dr. Aminata Diallo',
                date: 'March 20, 2025',
                time: '10:00 AM GMT',
                language: 'French'
              },
              {
                title: 'Traditional Water Management',
                instructor: 'Ibrahim Hassan',
                date: 'March 22, 2025',
                time: '2:00 PM GMT',
                language: 'Hausa'
              },
              {
                title: 'Community-Led Conservation',
                instructor: 'Mariam Sy',
                date: 'March 25, 2025',
                time: '11:00 AM GMT',
                language: 'Bambara'
              }
            ].map((session, index) => (
              <div key={index} className="border-l-4 border-green-500 pl-4 py-2">
                <h3 className="font-semibold">{session.title}</h3>
                <p className="text-sm text-gray-600">By {session.instructor}</p>
                <div className="mt-2 flex justify-between items-center">
                  <span className="text-sm text-gray-500">
                    {session.date} at {session.time}
                  </span>
                  <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-sm">
                    {session.language}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrainingHub;