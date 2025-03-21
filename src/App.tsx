import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import ResourceMapping from './pages/ResourceMapping';
import Analysis from './pages/Dashboard';
import Home from './pages/Home';
import RiskZones from './pages/RiskZones';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/analysis" element={<Analysis />} />
            <Route path="/resource-mapping" element={<ResourceMapping />} />
            <Route path="/risk-zones" element={<RiskZones />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;