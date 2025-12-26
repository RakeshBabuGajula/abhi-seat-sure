export interface User {
  id: string;
  phone: string;
}

export interface Passenger {
  name: string;
  age: number;
  gender: 'Male' | 'Female' | 'Other';
  seatNumber: string;
}

export interface Booking {
  id: string;
  userId: string;
  from: string;
  to: string;
  date: string;
  time: string;
  busName: string;
  busType: string;
  seats: string[];
  passengers: Passenger[];
  fare: number;
  flexiPurchased: boolean;
  flexiFee: number;
  status: 'Active' | 'Reselled' | 'ReBooked';
  createdAt: string;
  originalBookingId?: string; // For rebooked tickets
}

export interface Bus {
  id: string;
  name: string;
  type: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  seatsAvailable: number;
  totalSeats: number;
  price: number;
  rating: number;
  amenities: string[];
  bookedSeats: string[];
}

export interface City {
  id: string;
  name: string;
  code: string;
}

export interface SearchParams {
  from: string;
  to: string;
  date: string;
}
