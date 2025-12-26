import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Info, Armchair } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useApp } from '@/context/AppContext';
import { cn } from '@/lib/utils';

interface Seat {
  id: string;
  type: 'lower' | 'upper';
  status: 'available' | 'booked' | 'ladies' | 'selected';
}

const SeatSelectionPage: React.FC = () => {
  const navigate = useNavigate();
  const { selectedBus, selectedSeats, setSelectedSeats, searchParams } = useApp();
  const [activeView, setActiveView] = useState<'lower' | 'upper'>('lower');

  if (!selectedBus || !searchParams) {
    navigate('/');
    return null;
  }

  // Generate seat layout
  const generateSeats = (type: 'lower' | 'upper'): Seat[] => {
    const prefix = type === 'lower' ? 'L' : 'U';
    const seats: Seat[] = [];

    for (let i = 1; i <= 18; i++) {
      const seatId = `${prefix}${i}`;
      let status: Seat['status'] = 'available';

      if (selectedBus.bookedSeats.includes(seatId)) {
        status = 'booked';
      } else if (selectedSeats.includes(seatId)) {
        status = 'selected';
      } else if ([3, 6, 9, 12, 15, 18].includes(i) && type === 'lower') {
        status = 'ladies';
      }

      seats.push({ id: seatId, type, status });
    }

    return seats;
  };

  const lowerSeats = generateSeats('lower');
  const upperSeats = generateSeats('upper');

  const handleSeatClick = (seat: Seat) => {
    if (seat.status === 'booked') return;

    if (selectedSeats.includes(seat.id)) {
      setSelectedSeats(selectedSeats.filter((s) => s !== seat.id));
    } else if (selectedSeats.length < 6) {
      setSelectedSeats([...selectedSeats, seat.id]);
    }
  };

  const totalFare = selectedSeats.length * selectedBus.price;

  const renderSeatGrid = (seats: Seat[]) => {
    // 2+1 sleeper layout: 3 rows of 6 seats each
    const rows = [];
    for (let i = 0; i < 18; i += 3) {
      rows.push(seats.slice(i, i + 3));
    }

    return (
      <div className="space-y-3">
        {rows.map((row, rowIndex) => (
          <div key={rowIndex} className="flex items-center justify-center gap-2">
            {/* Left side - 2 seats */}
            <div className="flex gap-2">
              {row.slice(0, 2).map((seat) => (
                <button
                  key={seat.id}
                  onClick={() => handleSeatClick(seat)}
                  disabled={seat.status === 'booked'}
                  className={cn(
                    'seat',
                    seat.status === 'available' && 'seat-available',
                    seat.status === 'selected' && 'seat-selected',
                    seat.status === 'booked' && 'seat-booked',
                    seat.status === 'ladies' && 'seat-ladies'
                  )}
                >
                  {seat.id}
                </button>
              ))}
            </div>

            {/* Aisle */}
            <div className="w-8" />

            {/* Right side - 1 seat */}
            <div className="flex gap-2">
              {row.slice(2, 3).map((seat) => (
                <button
                  key={seat.id}
                  onClick={() => handleSeatClick(seat)}
                  disabled={seat.status === 'booked'}
                  className={cn(
                    'seat',
                    seat.status === 'available' && 'seat-available',
                    seat.status === 'selected' && 'seat-selected',
                    seat.status === 'booked' && 'seat-booked',
                    seat.status === 'ladies' && 'seat-ladies'
                  )}
                >
                  {seat.id}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="app-container min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border pt-12 pb-4 px-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-4 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="text-sm font-medium">Back</span>
        </button>

        <h1 className="text-lg font-bold text-foreground">{selectedBus.name}</h1>
        <p className="text-sm text-muted-foreground mt-0.5">{selectedBus.type}</p>
      </div>

      {/* Deck Tabs */}
      <div className="px-6 pt-4">
        <div className="bg-muted p-1 rounded-xl flex">
          <button
            onClick={() => setActiveView('lower')}
            className={cn(
              'flex-1 py-2.5 rounded-lg text-sm font-medium transition-all duration-200',
              activeView === 'lower'
                ? 'bg-card text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            )}
          >
            Lower Deck
          </button>
          <button
            onClick={() => setActiveView('upper')}
            className={cn(
              'flex-1 py-2.5 rounded-lg text-sm font-medium transition-all duration-200',
              activeView === 'upper'
                ? 'bg-card text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            )}
          >
            Upper Deck
          </button>
        </div>
      </div>

      {/* Legend */}
      <div className="px-6 py-4">
        <div className="flex items-center justify-center gap-4 text-xs">
          <div className="flex items-center gap-1.5">
            <div className="w-5 h-5 rounded border-2 border-border bg-card" />
            <span className="text-muted-foreground">Available</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-5 h-5 rounded border-2 border-primary bg-primary" />
            <span className="text-muted-foreground">Selected</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-5 h-5 rounded border-2 border-muted bg-muted" />
            <span className="text-muted-foreground">Booked</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-5 h-5 rounded border-2 border-pink-300 bg-pink-50" />
            <span className="text-muted-foreground">Ladies</span>
          </div>
        </div>
      </div>

      {/* Bus Layout */}
      <div className="px-6 pb-32">
        <div className="bg-card rounded-2xl p-6 shadow-card">
          {/* Driver */}
          <div className="flex justify-end mb-6">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-muted rounded-lg text-xs text-muted-foreground">
              <Armchair className="w-4 h-4" />
              Driver
            </div>
          </div>

          {/* Seats */}
          <div className="animate-fade-in">
            {activeView === 'lower' ? renderSeatGrid(lowerSeats) : renderSeatGrid(upperSeats)}
          </div>

          {/* Info */}
          <div className="flex items-start gap-2 mt-6 p-3 bg-info/10 rounded-xl">
            <Info className="w-4 h-4 text-info mt-0.5" />
            <p className="text-xs text-info">
              You can select up to 6 seats. Ladies seats are preferably for female passengers.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      {selectedSeats.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border p-4 shadow-elevated animate-slide-up">
          <div className="max-w-md mx-auto flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">
                {selectedSeats.length} seat{selectedSeats.length > 1 ? 's' : ''} selected
              </p>
              <p className="font-bold text-xl text-foreground">₹{totalFare}</p>
            </div>
            <Button onClick={() => navigate('/passengers')} variant="gradient" size="lg">
              Continue
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SeatSelectionPage;
