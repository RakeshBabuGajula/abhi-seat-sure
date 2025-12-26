import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Star, Wifi, BatteryCharging, Clock, Users, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useApp } from '@/context/AppContext';
import { buses as mockBuses, formatDate, formatTime } from '@/data/mockData';
import { Bus } from '@/types';
import LoadingSpinner from '@/components/LoadingSpinner';
import { cn } from '@/lib/utils';

const BusListPage: React.FC = () => {
  const navigate = useNavigate();
  const { searchParams, setSelectedBus, rebookData } = useApp();
  const [buses, setBuses] = useState<Bus[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!searchParams) {
      navigate('/');
      return;
    }

    // Simulate API call
    const fetchBuses = async () => {
      await new Promise((resolve) => setTimeout(resolve, 800));
      setBuses(mockBuses);
      setLoading(false);
    };

    fetchBuses();
  }, [searchParams, navigate]);

  if (!searchParams) {
    return null;
  }

  const handleSelectBus = (bus: Bus) => {
    setSelectedBus(bus);
    navigate('/seats');
  };

  if (loading) {
    return (
      <div className="app-container min-h-screen bg-background flex items-center justify-center">
        <LoadingSpinner message="Finding best buses for you..." />
      </div>
    );
  }

  const getAmenityIcon = (amenity: string) => {
    switch (amenity.toLowerCase()) {
      case 'wifi':
        return <Wifi className="w-3 h-3" />;
      case 'charging point':
        return <BatteryCharging className="w-3 h-3" />;
      default:
        return null;
    }
  };

  return (
    <div className="app-container min-h-screen bg-background">
      {/* Header */}
      <div className="gradient-primary pt-12 pb-6 px-6 rounded-b-2xl">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-primary-foreground/80 hover:text-primary-foreground mb-4 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="text-sm font-medium">Back</span>
        </button>

        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-primary-foreground">
              {searchParams.from} → {searchParams.to}
            </h1>
            <p className="text-primary-foreground/80 text-sm mt-1">
              {formatDate(searchParams.date)} • {buses.length} buses available
            </p>
          </div>
          {rebookData && (
            <div className="px-3 py-1.5 bg-warning/20 rounded-lg">
              <span className="text-warning-foreground text-xs font-semibold">ReBook</span>
            </div>
          )}
        </div>
      </div>

      {/* Filters */}
      <div className="px-6 py-4 flex items-center gap-3 overflow-x-auto no-scrollbar">
        {['All', 'AC', 'Non-AC', 'Sleeper', 'Seater'].map((filter) => (
          <button
            key={filter}
            className={cn(
              "px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all duration-200",
              filter === 'All'
                ? "bg-primary text-primary-foreground"
                : "bg-card text-muted-foreground hover:bg-accent"
            )}
          >
            {filter}
          </button>
        ))}
        <button className="px-4 py-2 rounded-xl bg-card text-muted-foreground flex items-center gap-2">
          <Filter className="w-4 h-4" />
          <span className="text-sm font-medium">Filters</span>
        </button>
      </div>

      {/* Bus List */}
      <div className="px-6 pb-6 space-y-4">
        {buses.map((bus, index) => (
          <div
            key={bus.id}
            className="bg-card rounded-2xl shadow-card overflow-hidden animate-slide-up card-hover"
            style={{ animationDelay: `${index * 0.05}s` }}
          >
            <div className="p-4">
              {/* Bus Name and Rating */}
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-semibold text-foreground">{bus.name}</h3>
                  <p className="text-xs text-muted-foreground mt-0.5">{bus.type}</p>
                </div>
                <div className="flex items-center gap-1 px-2 py-1 bg-success/10 rounded-lg">
                  <Star className="w-3.5 h-3.5 text-success fill-success" />
                  <span className="text-xs font-semibold text-success">{bus.rating}</span>
                </div>
              </div>

              {/* Time and Duration */}
              <div className="flex items-center gap-4 mb-3">
                <div className="text-center">
                  <p className="font-bold text-lg text-foreground">{formatTime(bus.departureTime)}</p>
                  <p className="text-xs text-muted-foreground">{searchParams.from}</p>
                </div>
                <div className="flex-1 flex flex-col items-center">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <div className="w-2 h-2 rounded-full border-2 border-muted-foreground" />
                    <div className="flex-1 h-px bg-border" />
                    <Clock className="w-3 h-3" />
                    <span className="text-xs">{bus.duration}</span>
                    <div className="flex-1 h-px bg-border" />
                    <div className="w-2 h-2 rounded-full bg-muted-foreground" />
                  </div>
                </div>
                <div className="text-center">
                  <p className="font-bold text-lg text-foreground">{formatTime(bus.arrivalTime)}</p>
                  <p className="text-xs text-muted-foreground">{searchParams.to}</p>
                </div>
              </div>

              {/* Amenities */}
              <div className="flex items-center gap-2 mb-4">
                {bus.amenities.slice(0, 4).map((amenity, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1 px-2 py-1 bg-muted rounded-md text-xs text-muted-foreground"
                  >
                    {getAmenityIcon(amenity)}
                    {amenity}
                  </span>
                ))}
              </div>

              {/* Price and Book */}
              <div className="flex items-center justify-between pt-3 border-t border-border">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">
                    {bus.seatsAvailable} seats left
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground">Starts from</p>
                    <p className="font-bold text-lg text-foreground">₹{bus.price}</p>
                  </div>
                  <Button
                    onClick={() => handleSelectBus(bus)}
                    size="sm"
                    className="px-6"
                  >
                    Select
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BusListPage;
