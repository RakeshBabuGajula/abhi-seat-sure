import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  CreditCard,
  Wallet,
  Building2,
  Smartphone,
  Shield,
  Check,
  Loader2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useApp } from '@/context/AppContext';
import { cn } from '@/lib/utils';
import { toast } from '@/hooks/use-toast';

const paymentMethods = [
  { id: 'upi', name: 'UPI', icon: Smartphone, description: 'GPay, PhonePe, Paytm' },
  { id: 'card', name: 'Credit/Debit Card', icon: CreditCard, description: 'Visa, Mastercard' },
  { id: 'netbanking', name: 'Net Banking', icon: Building2, description: 'All major banks' },
  { id: 'wallet', name: 'Wallets', icon: Wallet, description: 'Paytm, PhonePe' },
];

const PaymentPage: React.FC = () => {
  const navigate = useNavigate();
  const {
    selectedBus,
    selectedSeats,
    searchParams,
    passengers,
    flexiSelected,
    user,
    addBooking,
    updateBookingStatus,
    rebookData,
    resetBookingFlow,
  } = useApp();

  const [selectedMethod, setSelectedMethod] = useState('upi');
  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState(false);

  if (!selectedBus || !searchParams || passengers.length === 0) {
    navigate('/');
    return null;
  }

  const baseFare = selectedSeats.length * selectedBus.price;
  const flexiFee = flexiSelected ? 50 : 0;
  
  // Calculate fare difference for rebook
  let fareDifference = 0;
  let amountToPay = baseFare + flexiFee;
  
  if (rebookData) {
    fareDifference = baseFare - rebookData.originalFare;
    amountToPay = fareDifference > 0 ? fareDifference : 0;
  }

  const handlePayment = async () => {
    setProcessing(true);

    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Create new booking
    const newBooking = addBooking({
      userId: user?.id || 'guest',
      from: searchParams.from,
      to: searchParams.to,
      date: searchParams.date,
      time: selectedBus.departureTime,
      busName: selectedBus.name,
      busType: selectedBus.type,
      seats: selectedSeats,
      passengers: passengers,
      fare: baseFare,
      flexiPurchased: flexiSelected,
      flexiFee: flexiFee,
      status: 'Active',
      originalBookingId: rebookData?.originalBookingId,
    });

    // If this is a rebook, mark the old booking as ReBooked
    if (rebookData) {
      updateBookingStatus(rebookData.originalBookingId, 'ReBooked');
    }

    setProcessing(false);
    setSuccess(true);

    setTimeout(() => {
      resetBookingFlow();
      navigate(`/ticket/${newBooking.id}`);
    }, 1500);
  };

  if (success) {
    return (
      <div className="app-container min-h-screen bg-background flex items-center justify-center p-6">
        <div className="text-center space-y-6 animate-bounce-in">
          <div className="w-24 h-24 mx-auto rounded-full bg-success flex items-center justify-center">
            <Check className="w-12 h-12 text-success-foreground" />
          </div>
          <div className="space-y-2">
            <h1 className="text-2xl font-bold text-foreground">Payment Successful!</h1>
            <p className="text-muted-foreground">
              Your ticket has been booked successfully
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (processing) {
    return (
      <div className="app-container min-h-screen bg-background flex items-center justify-center p-6">
        <div className="text-center space-y-6">
          <div className="w-24 h-24 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
            <Loader2 className="w-12 h-12 text-primary animate-spin" />
          </div>
          <div className="space-y-2">
            <h1 className="text-xl font-bold text-foreground">Processing Payment</h1>
            <p className="text-muted-foreground">Please don't close this page...</p>
          </div>
        </div>
      </div>
    );
  }

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

        <h1 className="text-lg font-bold text-foreground">Payment</h1>
        <p className="text-sm text-muted-foreground mt-0.5">
          Choose your payment method
        </p>
      </div>

      <div className="px-6 py-6 pb-48 space-y-6">
        {/* Order Summary */}
        <div className="bg-card rounded-2xl p-5 shadow-card">
          <h2 className="font-semibold text-foreground mb-4">Order Summary</h2>

          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Route</span>
              <span className="font-medium text-foreground">
                {searchParams.from} → {searchParams.to}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Bus</span>
              <span className="font-medium text-foreground">{selectedBus.name}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Seats</span>
              <span className="font-medium text-foreground">
                {selectedSeats.join(', ')}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Passengers</span>
              <span className="font-medium text-foreground">{passengers.length}</span>
            </div>
          </div>

          <div className="border-t border-border mt-4 pt-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Base Fare</span>
              <span className="font-medium text-foreground">₹{baseFare}</span>
            </div>
            {flexiSelected && (
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Flexi Ticket</span>
                <span className="font-medium text-success">₹{flexiFee}</span>
              </div>
            )}
            {rebookData && (
              <>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Previous Fare</span>
                  <span className="font-medium text-foreground">
                    -₹{rebookData.originalFare}
                  </span>
                </div>
                {fareDifference <= 0 && (
                  <div className="flex justify-between text-sm text-success">
                    <span>No extra payment needed!</span>
                  </div>
                )}
              </>
            )}
          </div>

          <div className="border-t border-border mt-4 pt-4">
            <div className="flex justify-between">
              <span className="font-semibold text-foreground">Total</span>
              <span className="font-bold text-xl text-primary">₹{amountToPay}</span>
            </div>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="bg-card rounded-2xl p-5 shadow-card">
          <h2 className="font-semibold text-foreground mb-4">Payment Method</h2>

          <div className="space-y-3">
            {paymentMethods.map((method) => {
              const Icon = method.icon;
              return (
                <button
                  key={method.id}
                  onClick={() => setSelectedMethod(method.id)}
                  className={cn(
                    'w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all duration-200',
                    selectedMethod === method.id
                      ? 'border-primary bg-primary/5'
                      : 'border-border hover:border-primary/50'
                  )}
                >
                  <div
                    className={cn(
                      'w-10 h-10 rounded-xl flex items-center justify-center',
                      selectedMethod === method.id ? 'bg-primary' : 'bg-muted'
                    )}
                  >
                    <Icon
                      className={cn(
                        'w-5 h-5',
                        selectedMethod === method.id
                          ? 'text-primary-foreground'
                          : 'text-muted-foreground'
                      )}
                    />
                  </div>
                  <div className="flex-1 text-left">
                    <p className="font-medium text-foreground">{method.name}</p>
                    <p className="text-xs text-muted-foreground">{method.description}</p>
                  </div>
                  <div
                    className={cn(
                      'w-5 h-5 rounded-full border-2 flex items-center justify-center',
                      selectedMethod === method.id
                        ? 'border-primary bg-primary'
                        : 'border-muted-foreground'
                    )}
                  >
                    {selectedMethod === method.id && (
                      <div className="w-2 h-2 rounded-full bg-primary-foreground" />
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Security Notice */}
        <div className="flex items-center justify-center gap-2 text-muted-foreground">
          <Shield className="w-4 h-4 text-success" />
          <span className="text-xs">100% Secure Payment</span>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border p-4 shadow-elevated">
        <div className="max-w-md mx-auto flex items-center justify-between">
          <div>
            <p className="text-xs text-muted-foreground">Amount to Pay</p>
            <p className="font-bold text-2xl text-foreground">₹{amountToPay}</p>
          </div>
          <Button onClick={handlePayment} variant="gradient" size="lg">
            Pay Now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
