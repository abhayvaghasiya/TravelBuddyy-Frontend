import { Link } from 'react-router-dom';
import { Destination, AgeGroup } from '../types';

interface DestinationCardProps {
  destination: Destination;
}

const DestinationCard = ({ destination }: DestinationCardProps) => {
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
        return 'Student';
      case AgeGroup.ADULT:
        return 'Adult';
      case AgeGroup.MIDDLE_AGED:
        return 'Middle-aged';
      case AgeGroup.SENIOR:
        return 'Senior';
      case AgeGroup.RETIREE:
        return 'Retiree';
      default:
        return ageGroup;
    }
  };

  return (
    <div className="card h-full flex flex-col">
      <div className="relative">
        <img 
          src={destination.imageUrl || 'https://images.unsplash.com/photo-1500835556837-99ac94a94552?w=600&auto=format&fit=crop'} 
          alt={destination.name}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-2 right-2 badge badge-primary">
          {formatCurrency(destination.typicalCost)}
        </div>
      </div>
      
      <div className="p-4 flex-grow flex flex-col">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-semibold">{destination.name}</h3>
          <span className="text-sm text-gray-500">{destination.country}</span>
        </div>
        
        <p className="text-gray-600 mt-2 mb-4 flex-grow">
          {destination.shortDescription.length > 100 
            ? `${destination.shortDescription.substring(0, 100)}...` 
            : destination.shortDescription}
        </p>
        
        <div className="mt-auto">
          <div className="flex flex-wrap gap-1 mb-3">
            {destination.suitableAgeGroups.map((ageGroup) => (
              <span 
                key={ageGroup} 
                className="inline-block px-2 py-1 text-xs bg-gray-200 text-gray-700 rounded-full"
              >
                {getAgeGroupLabel(ageGroup)}
              </span>
            ))}
          </div>
          
          <Link 
            to={`/destinations/${destination.id}`} 
            className="btn btn-outline w-full text-center"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DestinationCard; 