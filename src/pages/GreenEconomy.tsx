import React from 'react';
import { Coins, Sprout, CreditCard, TrendingUp } from 'lucide-react';
import type { GreenCredit } from '../types';

const GreenEconomy: React.FC = () => {
  const credits: GreenCredit[] = [
    {
      id: '1',
      amount: 1000,
      type: 'token',
      issuedTo: 'Community A',
      validUntil: '2025-12-31',
      status: 'active'
    },
    {
      id: '2',
      amount: 500,
      type: 'microcredit',
      issuedTo: 'Farmer Group B',
      validUntil: '2025-09-30',
      status: 'active'
    },
    {
      id: '3',
      amount: 750,
      type: 'token',
      issuedTo: 'Conservation Team C',
      validUntil: '2025-10-31',
      status: 'active'
    }
  ];

  return (
    <div className="space-y-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-green-800">Green Economy</h1>
        <p className="text-gray-600 mt-2">Transform environmental restoration into sustainable economic opportunities</p>
      </header>

      <div className="grid md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-md">
          <Coins className="h-8 w-8 text-green-600 mb-2" />
          <h3 className="text-lg font-semibold">Total Green Credits</h3>
          <p className="text-3xl font-bold text-green-600">2,250</p>
          <p className="text-sm text-gray-600 mt-1">Active credits in circulation</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md">
          <Sprout className="h-8 w-8 text-blue-600 mb-2" />
          <h3 className="text-lg font-semibold">Projects Funded</h3>
          <p className="text-3xl font-bold text-blue-600">15</p>
          <p className="text-sm text-gray-600 mt-1">Environmental initiatives</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md">
          <CreditCard className="h-8 w-8 text-purple-600 mb-2" />
          <h3 className="text-lg font-semibold">Microloans</h3>
          <p className="text-3xl font-bold text-purple-600">45</p>
          <p className="text-sm text-gray-600 mt-1">Active loans</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md">
          <TrendingUp className="h-8 w-8 text-yellow-600 mb-2" />
          <h3 className="text-lg font-semibold">Market Value</h3>
          <p className="text-3xl font-bold text-yellow-600">$12.5K</p>
          <p className="text-sm text-gray-600 mt-1">Total token value</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-semibold mb-6">Active Green Credits</h2>
          <div className="space-y-4">
            {credits.map(credit => (
              <div key={credit.id} className="border rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-semibold">{credit.issuedTo}</h3>
                    <p className="text-sm text-gray-600">Valid until {new Date(credit.validUntil).toLocaleDateString()}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm ${
                    credit.type === 'token' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-blue-100 text-blue-800'
                  }`}>
                    {credit.type === 'token' ? 'Token' : 'Microcredit'}
                  </span>
                </div>
                <div className="flex justify-between items-center mt-3">
                  <span className="text-2xl font-bold text-green-600">{credit.amount}</span>
                  <span className={`px-2 py-1 rounded text-sm ${
                    credit.status === 'active'
                      ? 'bg-green-100 text-green-800'
                      : credit.status === 'redeemed'
                      ? 'bg-gray-100 text-gray-800'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {credit.status.charAt(0).toUpperCase() + credit.status.slice(1)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-semibold mb-6">Marketplace</h2>
          <div className="space-y-4">
            {[
              {
                title: 'Organic Fertilizer',
                provider: 'Green Solutions Ltd',
                price: '500 credits',
                available: 50
              },
              {
                title: 'Solar Water Pump',
                provider: 'EcoTech Systems',
                price: '1200 credits',
                available: 10
              },
              {
                title: 'Drought-Resistant Seeds',
                provider: 'Local Seed Bank',
                price: '300 credits',
                available: 100
              }
            ].map((item, index) => (
              <div key={index} className="border rounded-lg p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold">{item.title}</h3>
                    <p className="text-sm text-gray-600">{item.provider}</p>
                  </div>
                  <span className="text-green-600 font-semibold">{item.price}</span>
                </div>
                <div className="mt-2 flex justify-between items-center">
                  <span className="text-sm text-gray-500">{item.available} units available</span>
                  <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                    Purchase
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GreenEconomy;