import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AgeGroup, Destination } from '../types';
import { getDestinations } from '../services/api';
import DestinationCard from '../components/DestinationCard';

const DestinationListPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  
  const [selectedAgeGroup, setSelectedAgeGroup] = useState<AgeGroup | ''>('');
  const [budget, setBudget] = useState<string>('');

  // Initialize filters from URL params
  useEffect(() => {
    const ageGroup = searchParams.get('ageGroup') as AgeGroup | null;
    const budgetParam = searchParams.get('budget');
    
    if (ageGroup) {
      setSelectedAgeGroup(ageGroup);
    }
    
    if (budgetParam) {
      setBudget(budgetParam);
    }
    
    fetchDestinations(ageGroup, budgetParam ? parseInt(budgetParam) : undefined);
  }, [searchParams]);

  const fetchDestinations = async (ageGroup?: AgeGroup | null, budget?: number) => {
    try {
      setLoading(true);
      const data = await getDestinations(ageGroup || undefined, budget);
      setDestinations(data);
    } catch (error) {
      toast.error('Failed to load destinations. Please try again later.');
      console.error('Error fetching destinations:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilter = () => {
    const params = new URLSearchParams();
    
    if (selectedAgeGroup) {
      params.append('ageGroup', selectedAgeGroup);
    }
    
    if (budget && !isNaN(parseFloat(budget))) {
      params.append('budget', budget);
    }
    
    setSearchParams(params);
  };

  const clearFilters = () => {
    setSelectedAgeGroup('');
    setBudget('');
    setSearchParams({});
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-8">Travel Destinations</h1>
      
      {/* Filters */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Filter Destinations</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Age Group
            </label>
            <select
              className="input w-full"
              value={selectedAgeGroup}
              onChange={(e) => setSelectedAgeGroup(e.target.value as AgeGroup | '')}
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
              Maximum Budget (USD)
            </label>
            <input
              type="number"
              className="input w-full"
              placeholder="Enter budget"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              min="0"
            />
          </div>
          
          <div className="flex items-end">
            <button
              className="btn btn-primary mr-2 flex-grow"
              onClick={handleFilter}
            >
              Apply Filters
            </button>
            <button
              className="btn btn-outline"
              onClick={clearFilters}
            >
              Clear
            </button>
          </div>
        </div>
      </div>
      
      {/* Results */}
      {loading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      ) : destinations.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {destinations.map((destination) => (
            <DestinationCard 
              key={destination.id} 
              destination={destination} 
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <h3 className="text-xl font-medium mb-2">No destinations found</h3>
          <p className="text-gray-600">
            Try adjusting your filters or explore without filters to see all available destinations.
          </p>
          <button
            className="btn btn-primary mt-4"
            onClick={clearFilters}
          >
            Show All Destinations
          </button>
        </div>
      )}
    </div>
  );
};

export default DestinationListPage; 