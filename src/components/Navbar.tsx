import React from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  return (
    <nav className="bg-green-700 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <img 
              src="/img/logo-terra.png" 
              alt="TerraHope Logo" 
              className="h-11 w-auto"
            />
            <span className="text-xl font-bold">Terra Hope</span>
          </Link>
          <div className="flex space-x-6">
            <Link to="/analysis" className="hover:text-green-200">Analysis</Link>
            <Link to="/resource-mapping" className="hover:text-green-200">Resource Mapping</Link>
            <Link to="/risk-zones" className="hover:text-green-200">Risk Zones</Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;