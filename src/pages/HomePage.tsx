import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AgeGroup } from '../types';

const HomePage = () => {
  const navigate = useNavigate();
  const [selectedAgeGroup, setSelectedAgeGroup] = useState<AgeGroup | null>(null);
  const [budget, setBudget] = useState<string>('');

  const handleSearch = () => {
    const params = new URLSearchParams();
    
    if (selectedAgeGroup) {
      params.append('ageGroup', selectedAgeGroup);
    }
    
    if (budget && !isNaN(parseFloat(budget))) {
      params.append('budget', budget);
    }
    
    navigate({
      pathname: '/destinations',
      search: params.toString()
    });
  };

  return (
    <div>
      {/* Hero Section */}
      <div className="relative bg-gray-900 text-white">
        <div className="absolute inset-0 overflow-hidden">
          <img 
            src="https://images.unsplash.com/photo-1488085061387-422e29b40080?w=1200&auto=format&fit=crop" 
            alt="Travel" 
            className="w-full h-full object-cover opacity-50"
          />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="md:w-2/3">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Find your perfect travel destination
            </h1>
            <p className="text-xl mb-8">
              Discover destinations tailored to your age group and budget with TravelBuddy
            </p>
            
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Age Group
                  </label>
                  <select
                    className="input w-full text-gray-700"
                    value={selectedAgeGroup || ''}
                    onChange={(e) => setSelectedAgeGroup(e.target.value as AgeGroup)}
                  >
                    <option value="">All Age Groups</option>
                    <option value={AgeGroup.STUDENT}>Student (18-25)</option>
                    <option value={AgeGroup.ADULT}>Adult (26-40)</option>
                    <option value={AgeGroup.MIDDLE_AGED}>Middle-aged (41-60)</option>
                    <option value={AgeGroup.SENIOR}>Senior (61-75)</option>
                    <option value={AgeGroup.RETIREE}>Retiree (76+)</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Budget (USD)
                  </label>
                  <input
                    type="number"
                    className="input w-full text-gray-700"
                    placeholder="Maximum budget"
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    min="0"
                  />
                </div>
              </div>
              
              <button
                className="btn btn-primary w-full"
                onClick={handleSearch}
              >
                Find Destinations
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">How TravelBuddy Works</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="bg-primary text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-xl font-bold">1</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Find Destinations</h3>
            <p className="text-gray-600">
              Search for travel destinations based on your age group and budget preferences.
            </p>
          </div>
          
          <div className="text-center">
            <div className="bg-primary text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-xl font-bold">2</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Explore Attractions</h3>
            <p className="text-gray-600">
              Discover popular attractions and activities at each destination.
            </p>
          </div>
          
          <div className="text-center">
            <div className="bg-primary text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-xl font-bold">3</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Plan Your Trip</h3>
            <p className="text-gray-600">
              Generate a customized itinerary with cost breakdowns and travel tips.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage; 