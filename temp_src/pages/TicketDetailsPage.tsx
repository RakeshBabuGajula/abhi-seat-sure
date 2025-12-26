import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  ArrowLeft,
  MapPin,
  Calendar,
  Clock,
  Users,
  Bus,
  Ticket,
  Shield,
  ArrowRightLeft,
  ShoppingCart,
  X,
  Check,
  Info,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useApp } from '@/context/AppContext';
import { formatDate, formatTime } from '@/data/mockData';
import StatusBadge from '@/components/StatusBadge';
import LoadingSpinner from '@/components/LoadingSpinner';
import { cn } from '@/lib/utils';
import { toast } from '@/hooks/use-toast';

type FlowType = null | 'resell' | 'rebook';

const TicketDetailsPage: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { getBookingById, updateBookingStatus, setRebookData, resetBookingFlow } = useApp();

  const [showModal, setShowModal] = useState<FlowType>(null);
  const [processing, setProcessing] = useState(false);

  const booking = id ? getBookingById(id) : undefined;

  if (!booking) {
    return (
      <div className="app-container min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Ticket className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
          <h2 className="text-lg font-semibold text-foreground mb-2">Ticket Not Found</h2>
          <button
            onClick={() => navigate('/bookings')}
            className="text-primary font-medium hover:underline"
          >
            Go to Bookings
          </button>
        </div>
      </div>
    );
  }

  const totalPaid = booking.fare + booking.flexiFee;
  const canUseFlexi = booking.flexiPurchased && booking.status === 'Active';

  const handleResellConfirm = async () => {
    setProcessing(true);
    
    // Simulate payment processing for ₹75 fee
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    updateBookingStatus(booking.id, 'Reselled');
    setProcessing(false);
    setShowModal(null);
    
    toast({
      title: 'Ticket Listed for ReSale',
      description: 'Your ticket is now listed. You\'ll be notified when it\'s sold.',
    });
    
    navigate('/bookings');
  };

  const handleRebookConfirm = () => {
    setShowModal(null);
    
    // Set rebook data so the home page knows we're in rebook mode
    setRebookData({
      originalBookingId: booking.id,
      originalFare: booking.fare,
    });
    
    toast({
      title: 'ReBook Mode Active',
      description: 'Select your new journey. Fare difference will be calculated.',
    });
    
    navigate('/');
  };

  const Modal = ({ type }: { type: 'resell' | 'rebook' }) => (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-foreground/50 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-md bg-card rounded-t-3xl p-6 animate-slide-up">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold text-foreground">
            {type === 'resell' ? 'ReSell Ticket' : 'ReBook Ticket'}
          </h2>
          <button
            onClick={() => setShowModal(null)}
            className="w-8 h-8 rounded-full bg-muted flex items-center justify-center"
          >
            <X className="w-4 h-4 text-muted-foreground" />
          </button>
        </div>

        {type === 'resell' ? (
          <>
            <div className="bg-muted rounded-xl p-4 mb-6">
              <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                <Info className="w-4 h-4 text-primary" />
                ReSell Terms & Conditions
              </h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-success mt-0.5 shrink-0" />
                  Available only for bus tickets with Flexi add-on
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-success mt-0.5 shrink-0" />
                  Can be initiated until departure time
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-success mt-0.5 shrink-0" />
                  If resold before departure → 100% fare refund
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-success mt-0.5 shrink-0" />
                  If not resold → 50% fare refund
                </li>
                <li className="flex items-start gap-2">
                  <Info className="w-4 h-4 text-warning mt-0.5 shrink-0" />
                  Flexi add-on (₹50) is non-refundable
                </li>
                <li className="flex items-start gap-2">
                  <Info className="w-4 h-4 text-info mt-0.5 shrink-0" />
                  Refund in 5-7 working days
                </li>
              </ul>
            </div>

            <div className="flex items-center justify-between p-4 bg-warning/10 rounded-xl mb-6">
              <span className="text-sm text-foreground">ReSell Processing Fee</span>
              <span className="font-bold text-lg text-foreground">₹75</span>
            </div>

            <Button
              onClick={handleResellConfirm}
              variant="gradient"
              className="w-full"
              size="lg"
              disabled={processing}
            >
              {processing ? (
                <>
                  <span className="animate-spin mr-2">⏳</span>
                  Processing...
                </>
              ) : (
                <>
                  <ShoppingCart className="w-5 h-5" />
                  Pay ₹75 & List for ReSale
                </>
              )}
            </Button>
          </>
        ) : (
          <>
            <div className="bg-muted rounded-xl p-4 mb-6">
              <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                <Info className="w-4 h-4 text-primary" />
                ReBook Terms & Conditions
              </h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-success mt-0.5 shrink-0" />
                  Available only with Flexi add-on
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-success mt-0.5 shrink-0" />
                  Allowed only once per ticket
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-success mt-0.5 shrink-0" />
                  Must be initiated before departure
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-success mt-0.5 shrink-0" />
                  Change date, bus, or both
                </li>
                <li className="flex items-start gap-2">
                  <Info className="w-4 h-4 text-warning mt-0.5 shrink-0" />
                  If new fare is higher → pay the difference
                </li>
                <li className="flex items-start gap-2">
                  <Info className="w-4 h-4 text-info mt-0.5 shrink-0" />
                  If new fare is lower → no refund of difference
                </li>
              </ul>
            </div>

            <div className="flex items-center justify-between p-4 bg-success/10 rounded-xl mb-6">
              <span className="text-sm text-foreground">Current Ticket Value</span>
              <span className="font-bold text-lg text-success">₹{booking.fare}</span>
            </div>

            <Button
              onClick={handleRebookConfirm}
              variant="gradient"
              className="w-full"
              size="lg"
            >
              <ArrowRightLeft className="w-5 h-5" />
              Select New Journey
            </Button>
          </>
        )}
      </div>
    </div>
  );

  return (
    <div className="app-container min-h-screen bg-background">
      {/* Header */}
      <div className="gradient-primary pt-12 pb-20 px-6 rounded-b-3xl">
        <button
          onClick={() => navigate('/bookings')}
          className="flex items-center gap-2 text-primary-foreground/80 hover:text-primary-foreground mb-4 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="text-sm font-medium">Back to Bookings</span>
        </button>

        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-xl font-bold text-primary-foreground">Ticket Details</h1>
            <p className="text-primary-foreground/80 text-sm mt-1">
              Booking ID: {booking.id.slice(-8).toUpperCase()}
            </p>
          </div>
          <StatusBadge status={booking.status} size="md" />
        </div>
      </div>

      <div className="px-6 -mt-12 pb-32 space-y-4">
        {/* Journey Card */}
        <div className="bg-card rounded-2xl p-5 shadow-elevated animate-slide-up">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <Bus className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">{booking.busName}</h3>
              <p className="text-sm text-muted-foreground">{booking.busType}</p>
            </div>
          </div>

          <div className="flex items-center gap-4 py-4 border-y border-border">
            <div className="flex-1">
              <p className="text-2xl font-bold text-foreground">{formatTime(booking.time)}</p>
              <div className="flex items-center gap-1.5 mt-1">
                <MapPin className="w-3.5 h-3.5 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">{booking.from}</span>
              </div>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-8 h-px bg-border" />
              <Clock className="w-4 h-4 text-muted-foreground my-2" />
              <div className="w-8 h-px bg-border" />
            </div>
            <div className="flex-1 text-right">
              <p className="text-2xl font-bold text-foreground">—:—</p>
              <div className="flex items-center gap-1.5 mt-1 justify-end">
                <MapPin className="w-3.5 h-3.5 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">{booking.to}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4 pt-4">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm text-foreground">{formatDate(booking.date)}</span>
            </div>
            <div className="flex items-center gap-2">
              <Ticket className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm text-foreground">{booking.seats.join(', ')}</span>
            </div>
          </div>
        </div>

        {/* Passengers */}
        <div className="bg-card rounded-2xl p-5 shadow-card animate-slide-up" style={{ animationDelay: '0.1s' }}>
          <div className="flex items-center gap-2 mb-4">
            <Users className="w-5 h-5 text-muted-foreground" />
            <h3 className="font-semibold text-foreground">Passengers</h3>
          </div>

          <div className="space-y-3">
            {booking.passengers.map((passenger, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-muted rounded-xl"
              >
                <div>
                  <p className="font-medium text-foreground">{passenger.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {passenger.gender}, {passenger.age} yrs • Seat {passenger.seatNumber}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Fare Details */}
        <div className="bg-card rounded-2xl p-5 shadow-card animate-slide-up" style={{ animationDelay: '0.15s' }}>
          <h3 className="font-semibold text-foreground mb-4">Fare Breakdown</h3>

          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Base Fare</span>
              <span className="font-medium text-foreground">₹{booking.fare}</span>
            </div>
            {booking.flexiPurchased && (
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground flex items-center gap-1.5">
                  <Shield className="w-3.5 h-3.5 text-success" />
                  Flexi Ticket
                </span>
                <span className="font-medium text-success">₹{booking.flexiFee}</span>
              </div>
            )}
            <div className="pt-3 border-t border-border flex justify-between">
              <span className="font-semibold text-foreground">Total Paid</span>
              <span className="font-bold text-xl text-primary">₹{totalPaid}</span>
            </div>
          </div>
        </div>

        {/* Flexi Options */}
        {canUseFlexi && (
          <div className="bg-success/5 rounded-2xl p-5 border border-success/20 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <div className="flex items-center gap-2 mb-4">
              <Shield className="w-5 h-5 text-success" />
              <h3 className="font-semibold text-success">Flexi Ticket Options</h3>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setShowModal('resell')}
                className="flex flex-col items-center gap-2 p-4 bg-card rounded-xl border border-success/20 hover:border-success transition-colors"
              >
                <ShoppingCart className="w-6 h-6 text-success" />
                <span className="text-sm font-medium text-foreground">ReSell</span>
                <span className="text-xs text-muted-foreground">Get refund</span>
              </button>
              <button
                onClick={() => setShowModal('rebook')}
                className="flex flex-col items-center gap-2 p-4 bg-card rounded-xl border border-success/20 hover:border-success transition-colors"
              >
                <ArrowRightLeft className="w-6 h-6 text-success" />
                <span className="text-sm font-medium text-foreground">ReBook</span>
                <span className="text-xs text-muted-foreground">Change trip</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && <Modal type={showModal} />}
    </div>
  );
};

export default TicketDetailsPage;
