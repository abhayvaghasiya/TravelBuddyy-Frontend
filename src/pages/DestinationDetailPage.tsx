import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { DestinationDetail, AgeGroup } from '../types';
import { getDestinationById } from '../services/api';
import AttractionCard from '../components/AttractionCard';

const DestinationDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [destination, setDestination] = useState<DestinationDetail | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchDestinationDetails = async () => {
      if (!id || isNaN(parseInt(id))) {
        toast.error('Invalid destination ID');
        navigate('/destinations');
        return;
      }

      try {
        setLoading(true);
        const data = await getDestinationById(parseInt(id));
        setDestination(data);
      } catch (error) {
        toast.error('Failed to load destination details. Please try again later.');
        console.error('Error fetching destination details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDestinationDetails();
  }, [id, navigate]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getAgeGroupLabel = (ageGroup: AgeGroup) => {
    switch (ageGroup) {
      case AgeGroup.STUDENT:
        return 'Student (18-25)';
      case AgeGroup.ADULT:
        return 'Adult (26-40)';
      case AgeGroup.MIDDLE_AGED:
        return 'Middle-aged (41-60)';
      case AgeGroup.SENIOR:
        return 'Senior (61-75)';
      case AgeGroup.RETIREE:
        return 'Retiree (76+)';
      default:
        return ageGroup;
    }
  };

  const handlePlanTrip = () => {
    navigate(`/plan?destinationId=${destination?.id}`);
  };

  if (loading) {
    return (
      <div className="flex justify-center py-16">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!destination) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Destination not found</h1>
          <p className="text-gray-600 mb-6">The destination you're looking for doesn't exist or has been removed.</p>
          <button 
            className="btn btn-primary"
            onClick={() => navigate('/destinations')}
          >
            Browse Destinations
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="relative h-64 md:h-96">
          <img 
            src={destination.imageUrl || 'https://images.unsplash.com/photo-1500835556837-99ac94a94552?w=1200&auto=format&fit=crop'} 
            alt={destination.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-6">
            <h1 className="text-3xl font-bold text-white">{destination.name}</h1>
            <p className="text-white text-lg">{destination.country}</p>
          </div>
          <div className="absolute top-4 right-4 badge badge-primary text-lg px-3 py-1">
            {formatCurrency(destination.typicalCost)}
          </div>
        </div>
        
        <div className="p-6">
          <div className="flex flex-wrap gap-2 mb-4">
            {destination.suitableAgeGroups.map((ageGroup) => (
              <span 
                key={ageGroup} 
                className="inline-block px-3 py-1 bg-primary-light text-white rounded-full text-sm"
              >
                {getAgeGroupLabel(ageGroup)}
              </span>
            ))}
          </div>
          
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-2">About {destination.name}</h2>
            <p className="text-gray-700">{destination.shortDescription}</p>
          </div>
          
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Attractions</h2>
              <span className="text-sm text-gray-500">
                {destination.attractions.length} attractions available
              </span>
            </div>
            
            <div className="space-y-4">
              {destination.attractions.map((attraction) => (
                <AttractionCard key={attraction.id} attraction={attraction} />
              ))}
            </div>
          </div>
          
          <div className="mt-8">
            <button
              className="btn btn-primary w-full md:w-auto"
              onClick={handlePlanTrip}
            >
              Plan Your Trip
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DestinationDetailPage; 