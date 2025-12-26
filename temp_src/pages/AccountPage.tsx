import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  User,
  Phone,
  Ticket,
  Settings,
  LogOut,
  ChevronRight,
  Bell,
  Shield,
  Star,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useApp } from '@/context/AppContext';
import BottomNav from '@/components/BottomNav';
import { toast } from '@/hooks/use-toast';

const AccountPage: React.FC = () => {
  const navigate = useNavigate();
  const { user, setUser, bookings } = useApp();

  const userBookings = bookings.filter(
    (b) => b.userId === user?.id || b.userId === 'user-1'
  );

  const handleLogout = () => {
    setUser(null);
    toast({
      title: 'Logged Out',
      description: 'You have been successfully logged out',
    });
    navigate('/login');
  };

  if (!user) {
    return (
      <div className="app-container min-h-screen bg-background pb-safe flex items-center justify-center p-6">
        <div className="text-center">
          <div className="w-20 h-20 mx-auto rounded-full bg-muted flex items-center justify-center mb-4">
            <User className="w-10 h-10 text-muted-foreground" />
          </div>
          <h2 className="text-lg font-semibold text-foreground mb-2">Not Logged In</h2>
          <p className="text-muted-foreground text-sm mb-6">
            Login to manage your account and bookings
          </p>
          <Button onClick={() => navigate('/login')} variant="gradient">
            Login Now
          </Button>
        </div>
        <BottomNav />
      </div>
    );
  }

  const menuItems = [
    { icon: Ticket, label: 'My Bookings', path: '/bookings', badge: userBookings.length },
    { icon: Bell, label: 'Notifications', path: '#' },
    { icon: Shield, label: 'Privacy & Security', path: '#' },
    { icon: Star, label: 'Rate Us', path: '#' },
    { icon: Settings, label: 'Settings', path: '#' },
  ];

  return (
    <div className="app-container min-h-screen bg-background pb-safe">
      {/* Header */}
      <div className="gradient-primary pt-12 pb-8 px-6 rounded-b-3xl">
        <h1 className="text-2xl font-bold text-primary-foreground mb-6">My Account</h1>
        
        {/* Profile Card */}
        <div className="bg-card/20 backdrop-blur-sm rounded-2xl p-5">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-primary-foreground/20 flex items-center justify-center">
              <User className="w-8 h-8 text-primary-foreground" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-primary-foreground">Welcome!</h2>
              <div className="flex items-center gap-2 mt-1">
                <Phone className="w-4 h-4 text-primary-foreground/80" />
                <span className="text-primary-foreground/80">+91 {user.phone}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="px-6 py-6 space-y-4">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-card rounded-xl p-4 text-center shadow-card">
            <p className="text-2xl font-bold text-primary">{userBookings.length}</p>
            <p className="text-xs text-muted-foreground mt-1">Bookings</p>
          </div>
          <div className="bg-card rounded-xl p-4 text-center shadow-card">
            <p className="text-2xl font-bold text-success">₹0</p>
            <p className="text-xs text-muted-foreground mt-1">Abhicash</p>
          </div>
          <div className="bg-card rounded-xl p-4 text-center shadow-card">
            <p className="text-2xl font-bold text-accent">0</p>
            <p className="text-xs text-muted-foreground mt-1">Rewards</p>
          </div>
        </div>

        {/* Menu */}
        <div className="bg-card rounded-2xl shadow-card overflow-hidden">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <button
                key={index}
                onClick={() => item.path !== '#' && navigate(item.path)}
                className="w-full flex items-center gap-4 p-4 hover:bg-muted transition-colors border-b border-border last:border-b-0"
              >
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <span className="flex-1 text-left font-medium text-foreground">
                  {item.label}
                </span>
                {item.badge && item.badge > 0 && (
                  <span className="px-2 py-0.5 bg-primary text-primary-foreground text-xs font-semibold rounded-full">
                    {item.badge}
                  </span>
                )}
                <ChevronRight className="w-4 h-4 text-muted-foreground" />
              </button>
            );
          })}
        </div>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-4 p-4 bg-destructive/10 rounded-2xl hover:bg-destructive/20 transition-colors"
        >
          <div className="w-10 h-10 rounded-xl bg-destructive/20 flex items-center justify-center">
            <LogOut className="w-5 h-5 text-destructive" />
          </div>
          <span className="font-medium text-destructive">Logout</span>
        </button>

        {/* Version */}
        <p className="text-center text-xs text-muted-foreground pt-4">
          Abhi's SeatSure v1.0.0 (Demo)
        </p>
      </div>

      <BottomNav />
    </div>
  );
};

export default AccountPage;
