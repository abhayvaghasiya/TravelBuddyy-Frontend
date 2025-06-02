export enum AgeGroup {
  STUDENT = 'STUDENT',
  ADULT = 'ADULT',
  MIDDLE_AGED = 'MIDDLE_AGED',
  SENIOR = 'SENIOR',
  RETIREE = 'RETIREE'
}

export enum TransportMode {
  WALKING = 'WALKING',
  PUBLIC_TRANSPORT = 'PUBLIC_TRANSPORT',
  TAXI = 'TAXI',
  RENTAL_CAR = 'RENTAL_CAR',
  TRAIN = 'TRAIN',
  BUS = 'BUS',
  FLIGHT = 'FLIGHT'
}

export interface Destination {
  id: number;
  name: string;
  country: string;
  shortDescription: string;
  typicalCost: number;
  suitableAgeGroups: AgeGroup[];
  imageUrl: string;
}

export interface Attraction {
  id: number;
  name: string;
  description: string;
  entryFee: number;
  imageUrl: string;
}

export interface DestinationDetail extends Destination {
  attractions: Attraction[];
}

export interface ItineraryActivity {
  name: string;
  description: string;
  startTime: string;
  endTime: string;
  location: string;
  cost: number;
  attractionId: number | null;
}

export interface ItineraryDay {
  dayNumber: number;
  activities: ItineraryActivity[];
  morningDescription: string;
  afternoonDescription: string;
  eveningDescription: string;
}

export interface ItineraryRequest {
  destinationId: number;
  ageGroup: AgeGroup;
  budget: number;
  transportMode: TransportMode;
  durationDays: number;
}

export interface ItineraryResponse {
  destination: Destination;
  days: ItineraryDay[];
  costBreakdown: Record<string, number>;
  totalCost: number;
  withinBudget: boolean;
  suggestedTransportation: string;
  tips: string[];
} 