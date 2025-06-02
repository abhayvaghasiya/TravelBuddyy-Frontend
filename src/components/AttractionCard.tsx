import { useState } from 'react';
import { Attraction } from '../types';

interface AttractionCardProps {
  attraction: Attraction;
}

const AttractionCard = ({ attraction }: AttractionCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="border rounded-lg overflow-hidden mb-4">
      <div 
        className="flex items-center justify-between p-4 cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center">
          <h3 className="font-medium">{attraction.name}</h3>
          <span className="ml-4 badge badge-primary">
            {formatCurrency(attraction.entryFee)}
          </span>
        </div>
        <div>
          <svg 
            className={`w-5 h-5 transition-transform duration-200 ${isExpanded ? 'transform rotate-180' : ''}`} 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 20 20" 
            fill="currentColor"
          >
            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </div>
      </div>
      
      {isExpanded && (
        <div className="p-4 border-t">
          <div className="flex flex-col md:flex-row">
            {attraction.imageUrl && (
              <img 
                src={attraction.imageUrl} 
                alt={attraction.name}
                className="w-full md:w-48 h-48 object-cover rounded mb-4 md:mb-0 md:mr-4"
              />
            )}
            <div>
              <p className="text-gray-700 mb-4">{attraction.description}</p>
              <div className="text-sm text-gray-500">
                <span className="font-semibold">Entry Fee:</span> {formatCurrency(attraction.entryFee)}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AttractionCard; 