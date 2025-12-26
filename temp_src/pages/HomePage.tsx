import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import {
  Bus,
  MapPin,
  Calendar,
  ArrowRightLeft,
  Search,
  Star,
  Shield,
  Clock,
  ChevronDown,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { useApp } from '@/context/AppContext';
import { cities } from '@/data/mockData';
import { cn } from '@/lib/utils';
import BottomNav from '@/components/BottomNav';

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { setSearchParams, rebookData } = useApp();
  const [fromCity, setFromCity] = useState('');
  const [toCity, setToCity] = useState('');
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [fromOpen, setFromOpen] = useState(false);
  const [toOpen, setToOpen] = useState(false);
  const [calendarOpen, setCalendarOpen] = useState(false);

  const handleSwapCities = () => {
    const temp = fromCity;
    setFromCity(toCity);
    setToCity(temp);
  };

  const handleSearch = () => {
    if (!fromCity || !toCity || !date) {
      return;
    }

    setSearchParams({
      from: fromCity,
      to: toCity,
      date: format(date, 'yyyy-MM-dd'),
    });

    navigate('/buses');
  };

  const CitySelector = ({
    value,
    onChange,
    placeholder,
    open,
    onOpenChange,
    label,
  }: {
    value: string;
    onChange: (city: string) => void;
    placeholder: string;
    open: boolean;
    onOpenChange: (open: boolean) => void;
    label: string;
  }) => (
    <Popover open={open} onOpenChange={onOpenChange}>
      <PopoverTrigger asChild>
        <button className="w-full text-left p-4 bg-card rounded-xl border border-border hover:border-primary/50 transition-all duration-200 group">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
              <MapPin className="w-5 h-5 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs text-muted-foreground mb-0.5">{label}</p>
              <p className={cn(
                "font-semibold truncate",
                value ? "text-foreground" : "text-muted-foreground"
              )}>
                {value || placeholder}
              </p>
            </div>
            <ChevronDown className="w-4 h-4 text-muted-foreground" />
          </div>
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-72 p-2" align="start">
        <div className="space-y-1">
          {cities.map((city) => (
            <button
              key={city.id}
              onClick={() => {
                onChange(city.name);
                onOpenChange(false);
              }}
              className={cn(
                "w-full text-left px-3 py-2.5 rounded-lg hover:bg-accent transition-colors flex items-center gap-3",
                value === city.name && "bg-primary/10 text-primary"
              )}
            >
              <MapPin className="w-4 h-4" />
              <span className="font-medium">{city.name}</span>
              <span className="text-xs text-muted-foreground ml-auto">{city.code}</span>
            </button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );

  return (
    <div className="app-container min-h-screen bg-background pb-safe">
      {/* Header with gradient */}
      <div className="gradient-primary pt-12 pb-32 px-6 rounded-b-[2.5rem] relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-40 h-40 bg-primary-foreground/5 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-10 left-0 w-24 h-24 bg-primary-foreground/5 rounded-full -translate-x-1/2" />
        
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-2xl bg-card/20 backdrop-blur-sm flex items-center justify-center">
              <Bus className="w-7 h-7 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-primary-foreground">Abhi's SeatSure</h1>
              <p className="text-primary-foreground/80 text-sm">Book • ReSell • ReBook</p>
            </div>
          </div>

          {rebookData && (
            <div className="bg-warning/20 backdrop-blur-sm rounded-xl p-3 mb-4 flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-warning flex items-center justify-center">
                <ArrowRightLeft className="w-4 h-4 text-warning-foreground" />
              </div>
              <div>
                <p className="text-primary-foreground font-semibold text-sm">ReBook Mode</p>
                <p className="text-primary-foreground/80 text-xs">Select your new journey</p>
              </div>
            </div>
          )}

          <h2 className="text-2xl font-bold text-primary-foreground">
            Where are you going?
          </h2>
        </div>
      </div>

      {/* Search Card */}
      <div className="px-6 -mt-24 relative z-20">
        <div className="bg-card rounded-2xl shadow-elevated p-5 space-y-4 animate-slide-up">
          {/* From City */}
          <CitySelector
            value={fromCity}
            onChange={setFromCity}
            placeholder="Select departure city"
            open={fromOpen}
            onOpenChange={setFromOpen}
            label="From"
          />

          {/* Swap Button */}
          <div className="flex justify-center -my-2">
            <button
              onClick={handleSwapCities}
              className="w-10 h-10 rounded-full bg-primary/10 hover:bg-primary/20 flex items-center justify-center transition-all duration-200 hover:scale-110"
            >
              <ArrowRightLeft className="w-4 h-4 text-primary rotate-90" />
            </button>
          </div>

          {/* To City */}
          <CitySelector
            value={toCity}
            onChange={setToCity}
            placeholder="Select destination city"
            open={toOpen}
            onOpenChange={setToOpen}
            label="To"
          />

          {/* Date Picker */}
          <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
            <PopoverTrigger asChild>
              <button className="w-full text-left p-4 bg-card rounded-xl border border-border hover:border-primary/50 transition-all duration-200 group">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <Calendar className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-muted-foreground mb-0.5">Date</p>
                    <p className="font-semibold text-foreground">
                      {date ? format(date, 'EEE, d MMM yyyy') : 'Select date'}
                    </p>
                  </div>
                  <ChevronDown className="w-4 h-4 text-muted-foreground" />
                </div>
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="center">
              <CalendarComponent
                mode="single"
                selected={date}
                onSelect={(newDate) => {
                  setDate(newDate);
                  setCalendarOpen(false);
                }}
                disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
                initialFocus
                className="pointer-events-auto"
              />
            </PopoverContent>
          </Popover>

          {/* Search Button */}
          <Button
            onClick={handleSearch}
            className="w-full"
            variant="gradient"
            size="lg"
            disabled={!fromCity || !toCity || !date}
          >
            <Search className="w-5 h-5" />
            Search Buses
          </Button>
        </div>
      </div>

      {/* Features */}
      <div className="px-6 mt-8">
        <h3 className="font-semibold text-foreground mb-4">Why SeatSure?</h3>
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-card rounded-xl p-4 text-center shadow-card card-hover">
            <div className="w-10 h-10 mx-auto rounded-xl bg-success/10 flex items-center justify-center mb-2">
              <Shield className="w-5 h-5 text-success" />
            </div>
            <p className="text-xs font-medium text-foreground">Flexi Tickets</p>
            <p className="text-[10px] text-muted-foreground mt-0.5">ReSell & ReBook</p>
          </div>
          <div className="bg-card rounded-xl p-4 text-center shadow-card card-hover">
            <div className="w-10 h-10 mx-auto rounded-xl bg-warning/10 flex items-center justify-center mb-2">
              <Star className="w-5 h-5 text-warning" />
            </div>
            <p className="text-xs font-medium text-foreground">Rated Buses</p>
            <p className="text-[10px] text-muted-foreground mt-0.5">4.5+ avg rating</p>
          </div>
          <div className="bg-card rounded-xl p-4 text-center shadow-card card-hover">
            <div className="w-10 h-10 mx-auto rounded-xl bg-info/10 flex items-center justify-center mb-2">
              <Clock className="w-5 h-5 text-info" />
            </div>
            <p className="text-xs font-medium text-foreground">24/7 Support</p>
            <p className="text-[10px] text-muted-foreground mt-0.5">Always here</p>
          </div>
        </div>
      </div>

      {/* Popular Routes */}
      <div className="px-6 mt-8 mb-6">
        <h3 className="font-semibold text-foreground mb-4">Popular Routes</h3>
        <div className="space-y-3">
          {[
            { from: 'Hyderabad', to: 'Bangalore', price: '₹599' },
            { from: 'Chennai', to: 'Bangalore', price: '₹449' },
            { from: 'Mumbai', to: 'Pune', price: '₹299' },
          ].map((route, index) => (
            <button
              key={index}
              onClick={() => {
                setFromCity(route.from);
                setToCity(route.to);
              }}
              className="w-full bg-card rounded-xl p-4 flex items-center justify-between shadow-card card-hover group"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Bus className="w-4 h-4 text-primary" />
                </div>
                <div className="text-left">
                  <p className="font-medium text-foreground text-sm">
                    {route.from} → {route.to}
                  </p>
                  <p className="text-xs text-muted-foreground">Multiple buses daily</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold text-primary text-sm">From {route.price}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      <BottomNav />
    </div>
  );
};

export default HomePage;
