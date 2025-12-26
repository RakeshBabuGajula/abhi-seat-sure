import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, Booking, SearchParams, Bus, Passenger } from '@/types';
import { getInitialBookings, buses as mockBuses } from '@/data/mockData';

interface RebookData {
  originalBookingId: string;
  originalFare: number;
}

interface AppContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  bookings: Booking[];
  addBooking: (booking: Omit<Booking, 'id' | 'createdAt'>) => Booking;
  updateBookingStatus: (bookingId: string, status: 'Active' | 'Reselled' | 'ReBooked') => void;
  getBookingById: (id: string) => Booking | undefined;
  searchParams: SearchParams | null;
  setSearchParams: (params: SearchParams | null) => void;
  selectedBus: Bus | null;
  setSelectedBus: (bus: Bus | null) => void;
  selectedSeats: string[];
  setSelectedSeats: (seats: string[]) => void;
  passengers: Passenger[];
  setPassengers: (passengers: Passenger[]) => void;
  flexiSelected: boolean;
  setFlexiSelected: (selected: boolean) => void;
  rebookData: RebookData | null;
  setRebookData: (data: RebookData | null) => void;
  resetBookingFlow: () => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUserState] = useState<User | null>(null);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [searchParams, setSearchParams] = useState<SearchParams | null>(null);
  const [selectedBus, setSelectedBus] = useState<Bus | null>(null);
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [passengers, setPassengers] = useState<Passenger[]>([]);
  const [flexiSelected, setFlexiSelected] = useState(false);
  const [rebookData, setRebookData] = useState<RebookData | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('seatsure_user');
    const storedBookings = localStorage.getItem('seatsure_bookings');

    if (storedUser) {
      setUserState(JSON.parse(storedUser));
    }

    if (storedBookings) {
      setBookings(JSON.parse(storedBookings));
    } else {
      // Initialize with seed data
      const initialBookings = getInitialBookings();
      setBookings(initialBookings);
      localStorage.setItem('seatsure_bookings', JSON.stringify(initialBookings));
    }
  }, []);

  const setUser = (newUser: User | null) => {
    setUserState(newUser);
    if (newUser) {
      localStorage.setItem('seatsure_user', JSON.stringify(newUser));
    } else {
      localStorage.removeItem('seatsure_user');
    }
  };

  const addBooking = (bookingData: Omit<Booking, 'id' | 'createdAt'>): Booking => {
    const newBooking: Booking = {
      ...bookingData,
      id: `booking-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };

    const updatedBookings = [...bookings, newBooking];
    setBookings(updatedBookings);
    localStorage.setItem('seatsure_bookings', JSON.stringify(updatedBookings));

    return newBooking;
  };

  const updateBookingStatus = (bookingId: string, status: 'Active' | 'Reselled' | 'ReBooked') => {
    const updatedBookings = bookings.map((booking) =>
      booking.id === bookingId ? { ...booking, status } : booking
    );
    setBookings(updatedBookings);
    localStorage.setItem('seatsure_bookings', JSON.stringify(updatedBookings));
  };

  const getBookingById = (id: string): Booking | undefined => {
    return bookings.find((booking) => booking.id === id);
  };

  const resetBookingFlow = () => {
    setSearchParams(null);
    setSelectedBus(null);
    setSelectedSeats([]);
    setPassengers([]);
    setFlexiSelected(false);
    setRebookData(null);
  };

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        bookings,
        addBooking,
        updateBookingStatus,
        getBookingById,
        searchParams,
        setSearchParams,
        selectedBus,
        setSelectedBus,
        selectedSeats,
        setSelectedSeats,
        passengers,
        setPassengers,
        flexiSelected,
        setFlexiSelected,
        rebookData,
        setRebookData,
        resetBookingFlow,
        isLoading,
        setIsLoading,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
