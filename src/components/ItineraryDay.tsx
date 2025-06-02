import { ItineraryDay as IItineraryDay } from '../types';

interface ItineraryDayProps {
  day: IItineraryDay;
}

const ItineraryDay = ({ day }: ItineraryDayProps) => {
  const formatTime = (timeString: string) => {
    const date = new Date(`2000-01-01T${timeString}`);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="mb-8">
      <h3 className="text-xl font-semibold mb-4">Day {day.dayNumber}</h3>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="mb-6">
          <h4 className="text-lg font-medium mb-2">Morning</h4>
          <p className="text-gray-600">{day.morningDescription}</p>
        </div>
        
        <div className="mb-6">
          <h4 className="text-lg font-medium mb-2">Afternoon</h4>
          <p className="text-gray-600">{day.afternoonDescription}</p>
        </div>
        
        <div className="mb-6">
          <h4 className="text-lg font-medium mb-2">Evening</h4>
          <p className="text-gray-600">{day.eveningDescription}</p>
        </div>
        
        <div>
          <h4 className="text-lg font-medium mb-3">Activities</h4>
          <div className="space-y-4">
            {day.activities.map((activity, index) => (
              <div 
                key={index} 
                className="border-l-4 border-primary pl-4 py-2"
              >
                <div className="flex justify-between">
                  <h5 className="font-medium">{activity.name}</h5>
                  <span className="text-sm font-medium text-primary">
                    {formatCurrency(activity.cost)}
                  </span>
                </div>
                <p className="text-gray-600 text-sm mt-1">{activity.description}</p>
                <div className="flex justify-between text-xs text-gray-500 mt-2">
                  <span>{activity.location}</span>
                  <span>
                    {formatTime(activity.startTime)} - {formatTime(activity.endTime)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItineraryDay; 