import React, { useState } from 'react';
import { Trophy, Trees as Tree, Droplets, Mountain, Medal } from 'lucide-react';
import type { CommunityAction } from '../types';

const CommunityActions: React.FC = () => {
  const [actions] = useState<CommunityAction[]>([
    {
      id: '1',
      type: 'tree_planting',
      points: 100,
      description: 'Plant 10 drought-resistant trees in Region A',
      completedBy: 'Community Team Alpha',
      timestamp: '2025-03-15T10:00:00Z',
      imageUrl: 'https://images.unsplash.com/photo-1576502200916-3808e07386a5'
    },
    {
      id: '2',
      type: 'water_retention',
      points: 150,
      description: 'Install water retention system in Region B',
      completedBy: 'Community Team Beta',
      timestamp: '2025-03-14T15:30:00Z',
      imageUrl: 'https://images.unsplash.com/photo-1468421870903-4df1664ac249'
    },
    {
      id: '3',
      type: 'soil_restoration',
      points: 200,
      description: 'Implement soil restoration techniques in Region C',
      completedBy: 'Community Team Gamma',
      timestamp: '2025-03-13T09:15:00Z',
      imageUrl: 'https://images.unsplash.com/photo-1463123081488-789f998ac9c4'
    }
  ]);

  return (
    <div className="space-y-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-green-800">Community Actions</h1>
        <p className="text-gray-600 mt-2">Join community challenges and earn rewards for environmental restoration</p>
      </header>

      <div className="bg-white rounded-xl shadow-md p-6 mb-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <Trophy className="h-8 w-8 text-yellow-500" />
            <div>
              <h2 className="text-xl font-semibold">Your Impact Score</h2>
              <p className="text-gray-600">Keep up the great work!</p>
            </div>
          </div>
          <div className="text-4xl font-bold text-yellow-500">450</div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <Tree className="h-6 w-6 mx-auto text-green-600 mb-2" />
            <p className="font-semibold">25 Trees</p>
            <p className="text-sm text-gray-600">Planted</p>
          </div>
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <Droplets className="h-6 w-6 mx-auto text-blue-600 mb-2" />
            <p className="font-semibold">5 Systems</p>
            <p className="text-sm text-gray-600">Water Retention</p>
          </div>
          <div className="text-center p-4 bg-orange-50 rounded-lg">
            <Mountain className="h-6 w-6 mx-auto text-orange-600 mb-2" />
            <p className="font-semibold">3 Hectares</p>
            <p className="text-sm text-gray-600">Soil Restored</p>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Active Challenges</h2>
          <div className="space-y-4">
            {actions.map(action => (
              <div key={action.id} className="border rounded-lg p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold">{action.description}</h3>
                    <p className="text-sm text-gray-600">By {action.completedBy}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Medal className="h-5 w-5 text-yellow-500" />
                    <span className="font-semibold">{action.points} pts</span>
                  </div>
                </div>
                {action.imageUrl && (
                  <img 
                    src={action.imageUrl} 
                    alt="Action evidence" 
                    className="mt-4 w-full h-48 object-cover rounded-lg"
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Leaderboard</h2>
          <div className="space-y-4">
            {[
              { name: 'Team Alpha', points: 1200, rank: 1 },
              { name: 'Team Beta', points: 950, rank: 2 },
              { name: 'Team Gamma', points: 800, rank: 3 },
              { name: 'Team Delta', points: 650, rank: 4 },
              { name: 'Team Epsilon', points: 500, rank: 5 }
            ].map((team, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <span className={`w-8 h-8 flex items-center justify-center rounded-full ${
                    team.rank === 1 ? 'bg-yellow-100 text-yellow-700' :
                    team.rank === 2 ? 'bg-gray-100 text-gray-700' :
                    team.rank === 3 ? 'bg-orange-100 text-orange-700' :
                    'bg-gray-100 text-gray-600'
                  }`}>
                    {team.rank}
                  </span>
                  <span className="font-semibold">{team.name}</span>
                </div>
                <span className="font-semibold text-green-600">{team.points} pts</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityActions;