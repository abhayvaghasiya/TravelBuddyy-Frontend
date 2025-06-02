import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AgeGroup, TransportMode, DestinationDetail, ItineraryResponse, ItineraryRequest } from '../types';
import { getDestinationById, createItinerary } from '../services/api';
import ItineraryDay from '../components/ItineraryDay';

const TripPlannerPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  
  const [loading, setLoading] = useState<boolean>(false);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [destination, setDestination] = useState<DestinationDetail | null>(null);
  const [itinerary, setItinerary] = useState<ItineraryResponse | null>(null);
  
  const [formData, setFormData] = useState<Partial<ItineraryRequest>>({
    ageGroup: AgeGroup.ADULT,
    budget: 1000,
    transportMode: TransportMode.PUBLIC_TRANSPORT,
    durationDays: 3
  });

  useEffect(() => {
    const destinationId = searchParams.get('destinationId');
    
    if (destinationId && !isNaN(parseInt(destinationId))) {
      fetchDestination(parseInt(destinationId));
    }
  }, [searchParams]);

  const fetchDestination = async (id: number) => {
    try {
      setLoading(true);
      const data = await getDestinationById(id);
      setDestination(data);
      setFormData(prev => ({
        ...prev,
        destinationId: id
      }));
    } catch (error) {
      toast.error('Failed to load destination. Please try again later.');
      console.error('Error fetching destination:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: name === 'budget' || name === 'durationDays' ? Number(value) : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.destinationId) {
      toast.error('Please select a destination');
      return;
    }
    
    try {
      setSubmitting(true);
      const response = await createItinerary(formData as ItineraryRequest);
      setItinerary(response);
      window.scrollTo(0, 0);
    } catch (error) {
      toast.error('Failed to create itinerary. Please try again later.');
      console.error('Error creating itinerary:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  if (loading) {
    return (
      <div className="flex justify-center py-16">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-8">Trip Planner</h1>
      
      {itinerary ? (
        <div>
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold">{itinerary.destination.name}, {itinerary.destination.country}</h2>
                <p className="text-gray-600">{itinerary.destination.shortDescription}</p>
              </div>
              <div className="mt-4 md:mt-0">
                <div className={`text-lg font-bold ${itinerary.withinBudget ? 'text-green-600' : 'text-red-600'}`}>
                  Total Cost: {formatCurrency(itinerary.totalCost)}
                </div>
                {!itinerary.withinBudget && (
                  <div className="text-sm text-red-600">
                    Exceeds your budget of {formatCurrency(formData.budget || 0)}
                  </div>
                )}
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="bg-gray-50 p-4 rounded">
                <h3 className="text-lg font-semibold mb-2">Transportation</h3>
                <p>{itinerary.suggestedTransportation}</p>
              </div>
              
              <div className="bg-gray-50 p-4 rounded">
                <h3 className="text-lg font-semibold mb-2">Duration</h3>
                <p>{itinerary.days.length} days</p>
              </div>
              
              <div className="bg-gray-50 p-4 rounded">
                <h3 className="text-lg font-semibold mb-2">Age Group</h3>
                <p>{formData.ageGroup}</p>
              </div>
            </div>
            
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Cost Breakdown</h3>
              <div className="bg-gray-50 p-4 rounded">
                <div className="space-y-2">
                  {Object.entries(itinerary.costBreakdown).map(([category, cost]) => (
                    <div key={category} className="flex justify-between">
                      <span>{category}</span>
                      <span>{formatCurrency(cost)}</span>
                    </div>
                  ))}
                  <div className="border-t pt-2 mt-2 font-bold flex justify-between">
                    <span>Total</span>
                    <span>{formatCurrency(itinerary.totalCost)}</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Travel Tips</h3>
              <div className="bg-gray-50 p-4 rounded">
                <ul className="list-disc list-inside space-y-1">
                  {itinerary.tips.map((tip, index) => (
                    <li key={index} className="text-gray-700">{tip}</li>
                  ))}
                </ul>
              </div>
            </div>
            
            <div className="flex justify-between">
              <button
                className="btn btn-outline"
                onClick={() => setItinerary(null)}
              >
                Modify Plan
              </button>
              <button
                className="btn btn-primary"
                onClick={() => {
                  toast.success('Your itinerary has been saved! (Demo functionality)');
                }}
              >
                Save Itinerary
              </button>
            </div>
          </div>
          
          <div>
            <h2 className="text-2xl font-bold mb-6">Your Itinerary</h2>
            {itinerary.days.map((day) => (
              <ItineraryDay key={day.dayNumber} day={day} />
            ))}
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold mb-6">Plan Your Trip</h2>
          
          {!destination && !formData.destinationId ? (
            <div className="text-center py-8">
              <p className="text-gray-600 mb-4">
                Select a destination first to plan your trip.
              </p>
              <button
                className="btn btn-primary"
                onClick={() => navigate('/destinations')}
              >
                Browse Destinations
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              {destination && (
                <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-semibold mb-2">Selected Destination</h3>
                  <div className="flex items-center">
                    <img 
                      src={destination.imageUrl} 
                      alt={destination.name} 
                      className="w-16 h-16 object-cover rounded mr-4"
                    />
                    <div>
                      <p className="font-semibold">{destination.name}, {destination.country}</p>
                      <p className="text-sm text-gray-600">Typical cost: {formatCurrency(destination.typicalCost)}</p>
                    </div>
                  </div>
                </div>
              )}
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-gray-700 font-medium mb-2" htmlFor="ageGroup">
                    Age Group
                  </label>
                  <select
                    id="ageGroup"
                    name="ageGroup"
                    className="input w-full"
                    value={formData.ageGroup}
                    onChange={handleChange}
                    required
                  >
                    <option value={AgeGroup.STUDENT}>Student (18-25)</option>
                    <option value={AgeGroup.ADULT}>Adult (26-40)</option>
                    <option value={AgeGroup.MIDDLE_AGED}>Middle-aged (41-60)</option>
                    <option value={AgeGroup.SENIOR}>Senior (61-75)</option>
                    <option value={AgeGroup.RETIREE}>Retiree (76+)</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-gray-700 font-medium mb-2" htmlFor="budget">
                    Budget (USD)
                  </label>
                  <input
                    id="budget"
                    name="budget"
                    type="number"
                    className="input w-full"
                    value={formData.budget}
                    onChange={handleChange}
                    min="100"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-gray-700 font-medium mb-2" htmlFor="transportMode">
                    Transport Mode
                  </label>
                  <select
                    id="transportMode"
                    name="transportMode"
                    className="input w-full"
                    value={formData.transportMode}
                    onChange={handleChange}
                    required
                  >
                    <option value={TransportMode.WALKING}>Walking</option>
                    <option value={TransportMode.PUBLIC_TRANSPORT}>Public Transport</option>
                    <option value={TransportMode.TAXI}>Taxi</option>
                    <option value={TransportMode.RENTAL_CAR}>Rental Car</option>
                    <option value={TransportMode.TRAIN}>Train</option>
                    <option value={TransportMode.BUS}>Bus</option>
                    <option value={TransportMode.FLIGHT}>Flight</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-gray-700 font-medium mb-2" htmlFor="durationDays">
                    Duration (Days)
                  </label>
                  <input
                    id="durationDays"
                    name="durationDays"
                    type="number"
                    className="input w-full"
                    value={formData.durationDays}
                    onChange={handleChange}
                    min="1"
                    max="14"
                    required
                  />
                </div>
              </div>
              
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={submitting}
                >
                  {submitting ? (
                    <>
                      <span className="animate-spin inline-block w-4 h-4 mr-2 border-t-2 border-b-2 border-white rounded-full"></span>
                      Generating...
                    </>
                  ) : 'Generate Itinerary'}
                </button>
              </div>
            </form>
          )}
        </div>
      )}
    </div>
  );
};

export default TripPlannerPage; 