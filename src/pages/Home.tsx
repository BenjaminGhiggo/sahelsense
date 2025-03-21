import React from 'react';
import { Link } from 'react-router-dom';
import { LineChart, Activity, Map, AlertTriangle } from 'lucide-react';

const Home: React.FC = () => {
  return (
    <div className="space-y-8">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold text-green-800 mb-4">
          Welcome to TerraHope
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Empowering communities through intelligent environmental monitoring and sustainable resource management
        </p>
      </header>

      <div className="grid md:grid-cols-3 gap-6">
        <Link to="/analysis" className="transform hover:scale-105 transition-transform">
          <div className="bg-white p-6 rounded-xl shadow-md border border-green-100">
            <LineChart className="h-12 w-12 text-green-600 mb-4" />
            <h2 className="text-xl font-semibold text-green-800 mb-2">
              Analysis Dashboard
            </h2>
            <p className="text-gray-600">
              Comprehensive environmental analysis with AI-powered predictions
            </p>
          </div>
        </Link>

        <Link to="/resource-mapping" className="transform hover:scale-105 transition-transform">
          <div className="bg-white p-6 rounded-xl shadow-md border border-green-100">
            <Map className="h-12 w-12 text-green-600 mb-4" />
            <h2 className="text-xl font-semibold text-green-800 mb-2">
              Resource Mapping
            </h2>
            <p className="text-gray-600">
              Smart mapping of resources and sustainable project recommendations
            </p>
          </div>
        </Link>

        <Link to="/risk-zones" className="transform hover:scale-105 transition-transform">
          <div className="bg-white p-6 rounded-xl shadow-md border border-green-100">
            <AlertTriangle className="h-12 w-12 text-red-600 mb-4" />
            <h2 className="text-xl font-semibold text-green-800 mb-2">
              Risk Zones
            </h2>
            <p className="text-gray-600">
              Early warning system and conflict prediction analysis
            </p>
          </div>
        </Link>
      </div>

      <section className="mt-16 bg-white rounded-xl p-8 shadow-md">
        <h2 className="text-2xl font-bold text-green-800 mb-6">
          Impact Statistics
        </h2>
        <div className="grid md:grid-cols-4 gap-8">
          <div className="text-center">
            <p className="text-4xl font-bold text-green-600">2,500+</p>
            <p className="text-gray-600">Hectares Monitored</p>
          </div>
          <div className="text-center">
            <p className="text-4xl font-bold text-blue-600">150+</p>
            <p className="text-gray-600">Districts Analyzed</p>
          </div>
          <div className="text-center">
            <p className="text-4xl font-bold text-purple-600">10,000+</p>
            <p className="text-gray-600">Data Points Collected</p>
          </div>
          <div className="text-center">
            <p className="text-4xl font-bold text-yellow-600">85%</p>
            <p className="text-gray-600">Prediction Accuracy</p>
          </div>
        </div>
      </section>

      <section className="grid md:grid-cols-2 gap-8">
        <div className="bg-white rounded-xl p-8 shadow-md">
          <h2 className="text-2xl font-bold text-green-800 mb-4">Our Mission</h2>
          <p className="text-gray-600 leading-relaxed">
            TerraHope is dedicated to empowering communities through innovative environmental monitoring 
            and sustainable resource management. By combining advanced technology with local knowledge, 
            we help create resilient and thriving ecosystems for future generations.
          </p>
        </div>

        <div className="bg-white rounded-xl p-8 shadow-md">
          <h2 className="text-2xl font-bold text-green-800 mb-4">Latest Updates</h2>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-green-500 mt-2"></div>
              <div>
                <h3 className="font-semibold">Enhanced AI Predictions</h3>
                <p className="text-gray-600">New machine learning models for improved environmental analysis</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-blue-500 mt-2"></div>
              <div>
                <h3 className="font-semibold">Community Integration</h3>
                <p className="text-gray-600">Expanded community participation in resource management</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-purple-500 mt-2"></div>
              <div>
                <h3 className="font-semibold">Real-time Monitoring</h3>
                <p className="text-gray-600">Advanced sensors deployed for continuous environmental tracking</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;