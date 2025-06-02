import axios from 'axios';
import {
  AgeGroup,
  Destination,
  DestinationDetail,
  ItineraryRequest,
  ItineraryResponse,
} from '../types';

// ✅ Use Vite's environment variable API
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getDestinations = async (
  ageGroup?: AgeGroup,
  budget?: number
): Promise<Destination[]> => {
  const params: Record<string, string | number> = {};
  if (ageGroup) params.ageGroup = ageGroup;
  if (budget) params.budget = budget;

  const response = await apiClient.get('/destinations', { params });
  return response.data;
};

export const getDestinationById = async (id: number): Promise<DestinationDetail> => {
  const response = await apiClient.get(`/destinations/${id}`);
  return response.data;
};

export const createItinerary = async (
  request: ItineraryRequest
): Promise<ItineraryResponse> => {
  const response = await apiClient.post('/itinerary', request);
  return response.data;
};
