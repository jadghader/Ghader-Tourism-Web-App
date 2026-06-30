export type Language = "en" | "ar" | "fr";

export type ServiceType = "airport_transfer" | "tour" | "chauffeur";

export type BookingStatus = "Pending" | "Confirmed" | "Cancelled" | "Completed";

export interface Booking {
  id: string;
  name: string;
  email: string;
  phone: string;
  whatsapp: string;
  passengers: number;
  vehicleType: string;
  serviceType: ServiceType;
  pickupLocation: string;
  destination: string;
  date: string;
  time: string;
  flightNumber?: string;
  tourId?: string;
  specialRequests?: string;
  createdAt: string;
  status: BookingStatus;
}

export interface Review {
  id: string;
  name: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Vehicle {
  id: string;
  name: string;
  category: string;
  suitableFor: string;
  capacity: string;
  luggage: string;
  features: string[];
  description: string;
  image: string;
  basePriceUSD: number; // approximate base prices for transparent pricing
  type?: string;
}

export interface Tour {
  id: string;
  name: string;
  duration: string;
  highlights: string[];
  description: string;
  image: string;
  priceEstimateUSD: number; // transparent pricing
}

export interface CustomItinerary {
  title: string;
  summary: string;
  days: {
    day: number;
    title: string;
    morning: string;
    afternoon: string;
    evening: string;
    highlights: string[];
  }[];
  recommendedVehicleReason: string;
  localProTip: string;
}
