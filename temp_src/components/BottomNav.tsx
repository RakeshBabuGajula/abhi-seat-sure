import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, Wallet, Ticket, HelpCircle, User } from 'lucide-react';
import { cn } from '@/lib/utils';

interface NavItem {
  id: string;
  label: string;
  icon: React.ElementType;
  path: string;
}

const navItems: NavItem[] = [
  { id: 'home', label: 'Home', icon: Home, path: '/' },
  { id: 'abhicash', label: 'Abhicash', icon: Wallet, path: '/abhicash' },
  { id: 'bookings', label: 'Bookings', icon: Ticket, path: '/bookings' },
  { id: 'help', label: 'Help', icon: HelpCircle, path: '/help' },
  { id: 'account', label: 'Account', icon: User, path: '/account' },
];

const BottomNav: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-card border-t border-border shadow-elevated">
      <div className="max-w-md mx-auto">
        <div className="flex items-center justify-around py-2 pb-safe">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);

            return (
              <button
                key={item.id}
                onClick={() => navigate(item.path)}
                className={cn(
                  'flex flex-col items-center gap-1 py-2 px-4 rounded-xl transition-all duration-200 btn-bounce',
                  active
                    ? 'text-primary'
                    : 'text-muted-foreground hover:text-foreground'
                )}
              >
                <div
                  className={cn(
                    'p-1.5 rounded-xl transition-all duration-200',
                    active && 'bg-primary/10'
                  )}
                >
                  <Icon
                    className={cn('w-5 h-5', active && 'text-primary')}
                    strokeWidth={active ? 2.5 : 2}
                  />
                </div>
                <span
                  className={cn(
                    'text-[10px] font-medium',
                    active && 'font-semibold'
                  )}
                >
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default BottomNav;
