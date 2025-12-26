import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Ticket, Calendar, MapPin, Clock, ArrowRight, Bus } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { formatDate, formatTime } from '@/data/mockData';
import StatusBadge from '@/components/StatusBadge';
import BottomNav from '@/components/BottomNav';
import { cn } from '@/lib/utils';

const BookingsPage: React.FC = () => {
  const navigate = useNavigate();
  const { bookings, user } = useApp();

  // Filter bookings for current user and sort by date
  const userBookings = bookings
    .filter((b) => b.userId === user?.id || b.userId === 'user-1') // Include seed data
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  const activeBookings = userBookings.filter((b) => b.status === 'Active');
  const pastBookings = userBookings.filter((b) => b.status !== 'Active');

  const BookingCard = ({ booking, clickable = true }: { booking: typeof userBookings[0]; clickable?: boolean }) => (
    <div
      onClick={() => clickable && navigate(`/ticket/${booking.id}`)}
      className={cn(
        'bg-card rounded-2xl p-4 shadow-card animate-slide-up',
        clickable && 'cursor-pointer card-hover',
        !clickable && 'opacity-75'
      )}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <Bus className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">{booking.busName}</h3>
            <p className="text-xs text-muted-foreground">{booking.busType}</p>
          </div>
        </div>
        <StatusBadge status={booking.status} />
      </div>

      <div className="flex items-center gap-2 mb-3">
        <div className="flex items-center gap-1.5 text-sm">
          <MapPin className="w-3.5 h-3.5 text-muted-foreground" />
          <span className="text-foreground">{booking.from}</span>
        </div>
        <ArrowRight className="w-4 h-4 text-muted-foreground" />
        <div className="flex items-center gap-1.5 text-sm">
          <MapPin className="w-3.5 h-3.5 text-muted-foreground" />
          <span className="text-foreground">{booking.to}</span>
        </div>
      </div>

      <div className="flex items-center gap-4 text-xs text-muted-foreground">
        <div className="flex items-center gap-1.5">
          <Calendar className="w-3.5 h-3.5" />
          <span>{formatDate(booking.date)}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Clock className="w-3.5 h-3.5" />
          <span>{formatTime(booking.time)}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Ticket className="w-3.5 h-3.5" />
          <span>{booking.seats.length} seat{booking.seats.length > 1 ? 's' : ''}</span>
        </div>
      </div>

      {booking.flexiPurchased && booking.status === 'Active' && (
        <div className="mt-3 pt-3 border-t border-border">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-success/10 text-success text-xs font-medium rounded-lg">
            <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
            Flexi Ticket Active
          </span>
        </div>
      )}
    </div>
  );

  return (
    <div className="app-container min-h-screen bg-background pb-safe">
      {/* Header */}
      <div className="gradient-primary pt-12 pb-6 px-6 rounded-b-2xl">
        <h1 className="text-2xl font-bold text-primary-foreground">My Bookings</h1>
        <p className="text-primary-foreground/80 text-sm mt-1">
          {userBookings.length} booking{userBookings.length !== 1 ? 's' : ''} found
        </p>
      </div>

      <div className="px-6 py-6 space-y-6">
        {userBookings.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-20 h-20 mx-auto rounded-full bg-muted flex items-center justify-center mb-4">
              <Ticket className="w-10 h-10 text-muted-foreground" />
            </div>
            <h2 className="text-lg font-semibold text-foreground mb-2">No Bookings Yet</h2>
            <p className="text-muted-foreground text-sm mb-6">
              Start your journey by booking your first bus ticket
            </p>
            <button
              onClick={() => navigate('/')}
              className="text-primary font-medium hover:underline"
            >
              Search Buses →
            </button>
          </div>
        ) : (
          <>
            {/* Active Bookings */}
            {activeBookings.length > 0 && (
              <div>
                <h2 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
                  Upcoming ({activeBookings.length})
                </h2>
                <div className="space-y-3">
                  {activeBookings.map((booking) => (
                    <BookingCard key={booking.id} booking={booking} />
                  ))}
                </div>
              </div>
            )}

            {/* Past Bookings */}
            {pastBookings.length > 0 && (
              <div>
                <h2 className="font-semibold text-muted-foreground mb-3">
                  Past ({pastBookings.length})
                </h2>
                <div className="space-y-3">
                  {pastBookings.map((booking) => (
                    <BookingCard key={booking.id} booking={booking} clickable={false} />
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>

      <BottomNav />
    </div>
  );
};

export default BookingsPage;
