import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, User, Shield, Info, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useApp } from '@/context/AppContext';
import { Passenger } from '@/types';
import { cn } from '@/lib/utils';

const PassengerDetailsPage: React.FC = () => {
  const navigate = useNavigate();
  const {
    selectedBus,
    selectedSeats,
    searchParams,
    passengers,
    setPassengers,
    flexiSelected,
    setFlexiSelected,
    rebookData,
  } = useApp();

  const [localPassengers, setLocalPassengers] = useState<Passenger[]>([]);

  useEffect(() => {
    if (!selectedBus || !searchParams || selectedSeats.length === 0) {
      navigate('/');
      return;
    }

    // Initialize passengers for each selected seat
    const initialPassengers: Passenger[] = selectedSeats.map((seat) => ({
      name: '',
      age: 0,
      gender: 'Male' as const,
      seatNumber: seat,
    }));

    setLocalPassengers(initialPassengers);
  }, [selectedBus, searchParams, selectedSeats, navigate]);

  if (!selectedBus || !searchParams) {
    return null;
  }

  const handlePassengerChange = (
    index: number,
    field: keyof Passenger,
    value: string | number
  ) => {
    const updated = [...localPassengers];
    updated[index] = { ...updated[index], [field]: value };
    setLocalPassengers(updated);
  };

  const isFormValid = localPassengers.every(
    (p) => p.name.trim() !== '' && p.age > 0 && p.age < 120
  );

  const baseFare = selectedSeats.length * selectedBus.price;
  const flexiFee = flexiSelected ? 50 : 0;
  const totalFare = baseFare + flexiFee;

  const handleContinue = () => {
    setPassengers(localPassengers);
    navigate('/payment');
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

        <h1 className="text-lg font-bold text-foreground">Passenger Details</h1>
        <p className="text-sm text-muted-foreground mt-0.5">
          Enter details for {selectedSeats.length} passenger
          {selectedSeats.length > 1 ? 's' : ''}
        </p>
      </div>

      <div className="px-6 py-6 pb-48 space-y-6">
        {/* Passenger Forms */}
        {localPassengers.map((passenger, index) => (
          <div
            key={passenger.seatNumber}
            className="bg-card rounded-2xl p-5 shadow-card animate-slide-up"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <User className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">
                  Passenger {index + 1}
                </h3>
                <p className="text-xs text-muted-foreground">
                  Seat: {passenger.seatNumber}
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {/* Name */}
              <div>
                <label className="text-sm font-medium text-foreground mb-1.5 block">
                  Full Name
                </label>
                <Input
                  placeholder="Enter passenger name"
                  value={passenger.name}
                  onChange={(e) =>
                    handlePassengerChange(index, 'name', e.target.value)
                  }
                />
              </div>

              {/* Age and Gender */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">
                    Age
                  </label>
                  <Input
                    type="number"
                    placeholder="Age"
                    value={passenger.age || ''}
                    onChange={(e) =>
                      handlePassengerChange(index, 'age', parseInt(e.target.value) || 0)
                    }
                    min={1}
                    max={120}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">
                    Gender
                  </label>
                  <div className="flex gap-2">
                    {(['Male', 'Female'] as const).map((gender) => (
                      <button
                        key={gender}
                        onClick={() => handlePassengerChange(index, 'gender', gender)}
                        className={cn(
                          'flex-1 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 border',
                          passenger.gender === gender
                            ? 'bg-primary text-primary-foreground border-primary'
                            : 'bg-card text-muted-foreground border-border hover:border-primary/50'
                        )}
                      >
                        {gender}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Flexi Ticket Add-On */}
        {!rebookData && (
          <div
            className={cn(
              'rounded-2xl p-5 border-2 transition-all duration-200 cursor-pointer',
              flexiSelected
                ? 'bg-success/5 border-success'
                : 'bg-card border-border hover:border-success/50'
            )}
            onClick={() => setFlexiSelected(!flexiSelected)}
          >
            <div className="flex items-start gap-4">
              <div
                className={cn(
                  'w-12 h-12 rounded-xl flex items-center justify-center transition-colors',
                  flexiSelected ? 'bg-success' : 'bg-success/10'
                )}
              >
                <Shield
                  className={cn(
                    'w-6 h-6 transition-colors',
                    flexiSelected ? 'text-success-foreground' : 'text-success'
                  )}
                />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-semibold text-foreground">Flexi Ticket</h3>
                  <span className="px-2 py-0.5 bg-accent text-accent-foreground text-xs font-semibold rounded-full flex items-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    NEW
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                  Get flexibility to ReSell or ReBook your ticket anytime before
                  departure
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-success">₹50</span>
                  <div
                    className={cn(
                      'w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all',
                      flexiSelected
                        ? 'bg-success border-success'
                        : 'border-muted-foreground'
                    )}
                  >
                    {flexiSelected && (
                      <svg
                        className="w-3.5 h-3.5 text-success-foreground"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={3}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Flexi Benefits */}
        {flexiSelected && (
          <div className="bg-success/5 rounded-xl p-4 border border-success/20 animate-slide-up">
            <div className="flex items-start gap-2">
              <Info className="w-4 h-4 text-success mt-0.5" />
              <div className="text-sm text-success">
                <p className="font-medium mb-1">With Flexi Ticket, you can:</p>
                <ul className="list-disc list-inside space-y-0.5 text-success/80">
                  <li>ReSell your ticket and get refund if seat is re-booked</li>
                  <li>ReBook to a different date/bus with fare adjustment</li>
                  <li>Modify plans until departure time</li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border p-4 shadow-elevated">
        <div className="max-w-md mx-auto">
          {/* Fare Summary */}
          <div className="flex items-center justify-between text-sm mb-3">
            <span className="text-muted-foreground">Base Fare</span>
            <span className="font-medium text-foreground">
              ₹{selectedBus.price} × {selectedSeats.length} = ₹{baseFare}
            </span>
          </div>
          {flexiSelected && (
            <div className="flex items-center justify-between text-sm mb-3 animate-fade-in">
              <span className="text-muted-foreground">Flexi Ticket</span>
              <span className="font-medium text-success">₹{flexiFee}</span>
            </div>
          )}
          <div className="flex items-center justify-between pt-3 border-t border-border">
            <div>
              <p className="text-xs text-muted-foreground">Total Amount</p>
              <p className="font-bold text-2xl text-foreground">₹{totalFare}</p>
            </div>
            <Button
              onClick={handleContinue}
              variant="gradient"
              size="lg"
              disabled={!isFormValid}
            >
              Proceed to Pay
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PassengerDetailsPage;
