import { Bus, City, Booking } from '@/types';

export const cities: City[] = [
  { id: '1', name: 'Hyderabad', code: 'HYD' },
  { id: '2', name: 'Bangalore', code: 'BLR' },
  { id: '3', name: 'Chennai', code: 'CHE' },
  { id: '4', name: 'Mumbai', code: 'MUM' },
  { id: '5', name: 'Delhi', code: 'DEL' },
  { id: '6', name: 'Pune', code: 'PUN' },
  { id: '7', name: 'Vizag', code: 'VIZ' },
  { id: '8', name: 'Vijayawada', code: 'VJA' },
];

export const buses: Bus[] = [
  {
    id: 'bus-1',
    name: 'Orange Travels',
    type: 'AC Sleeper (2+1)',
    departureTime: '22:00',
    arrivalTime: '06:00',
    duration: '8h 0m',
    seatsAvailable: 24,
    totalSeats: 36,
    price: 899,
    rating: 4.5,
    amenities: ['WiFi', 'Charging Point', 'Blanket', 'Water Bottle'],
    bookedSeats: ['L1', 'L3', 'L5', 'U2', 'U4', 'U6', 'L8', 'U10', 'L12', 'U14', 'L15', 'U18'],
  },
  {
    id: 'bus-2',
    name: 'SRS Travels',
    type: 'Non-AC Sleeper (2+1)',
    departureTime: '21:30',
    arrivalTime: '05:30',
    duration: '8h 0m',
    seatsAvailable: 18,
    totalSeats: 30,
    price: 649,
    rating: 4.2,
    amenities: ['Blanket', 'Water Bottle'],
    bookedSeats: ['L2', 'L4', 'U1', 'U3', 'L7', 'U8', 'L11', 'U12', 'L13', 'U15', 'L17', 'U19'],
  },
  {
    id: 'bus-3',
    name: 'VRL Travels',
    type: 'AC Seater (2+2)',
    departureTime: '23:00',
    arrivalTime: '07:00',
    duration: '8h 0m',
    seatsAvailable: 32,
    totalSeats: 44,
    price: 549,
    rating: 4.0,
    amenities: ['Charging Point', 'Water Bottle'],
    bookedSeats: ['A1', 'A2', 'B3', 'B4', 'C1', 'C3', 'D2', 'D4', 'E1', 'E3', 'F2', 'F4'],
  },
  {
    id: 'bus-4',
    name: 'Kallada Travels',
    type: 'Volvo AC Multi-Axle (2+1)',
    departureTime: '20:00',
    arrivalTime: '04:30',
    duration: '8h 30m',
    seatsAvailable: 15,
    totalSeats: 36,
    price: 1299,
    rating: 4.8,
    amenities: ['WiFi', 'Charging Point', 'Blanket', 'Water Bottle', 'Snacks', 'Entertainment'],
    bookedSeats: ['L1', 'L2', 'L3', 'L4', 'L5', 'U1', 'U2', 'U3', 'U4', 'U5', 'L10', 'L11', 'L12', 'U10', 'U11', 'U12', 'L16', 'L17', 'U16', 'U17', 'L18'],
  },
  {
    id: 'bus-5',
    name: 'APSRTC Garuda',
    type: 'AC Sleeper (2+1)',
    departureTime: '21:00',
    arrivalTime: '05:00',
    duration: '8h 0m',
    seatsAvailable: 28,
    totalSeats: 36,
    price: 799,
    rating: 4.3,
    amenities: ['Charging Point', 'Blanket', 'Water Bottle'],
    bookedSeats: ['L1', 'L2', 'U1', 'U2', 'L7', 'U8', 'L13', 'U14'],
  },
];

export const getInitialBookings = (): Booking[] => [
  {
    id: 'booking-1',
    userId: 'user-1',
    from: 'Hyderabad',
    to: 'Bangalore',
    date: '2024-12-18',
    time: '22:00',
    busName: 'Orange Travels',
    busType: 'AC Sleeper (2+1)',
    seats: ['L7', 'L9'],
    passengers: [
      { name: 'Rahul Sharma', age: 28, gender: 'Male', seatNumber: 'L7' },
      { name: 'Priya Sharma', age: 26, gender: 'Female', seatNumber: 'L9' },
    ],
    fare: 1798,
    flexiPurchased: true,
    flexiFee: 50,
    status: 'Active',
    createdAt: new Date().toISOString(),
  },
];

export const generateOTP = (): string => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-IN', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
  });
};

export const formatTime = (time: string): string => {
  const [hours, minutes] = time.split(':');
  const hour = parseInt(hours);
  const ampm = hour >= 12 ? 'PM' : 'AM';
  const hour12 = hour % 12 || 12;
  return `${hour12}:${minutes} ${ampm}`;
};
