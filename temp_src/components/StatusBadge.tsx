import React from 'react';
import { cn } from '@/lib/utils';
import { CheckCircle, RefreshCw, ShoppingCart } from 'lucide-react';

interface StatusBadgeProps {
  status: 'Active' | 'Reselled' | 'ReBooked';
  size?: 'sm' | 'md';
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status, size = 'sm' }) => {
  const config = {
    Active: {
      className: 'badge-active',
      icon: CheckCircle,
      label: 'Active',
    },
    Reselled: {
      className: 'badge-reselled',
      icon: ShoppingCart,
      label: 'Reselled',
    },
    ReBooked: {
      className: 'badge-rebooked',
      icon: RefreshCw,
      label: 'ReBooked',
    },
  };

  const { className, icon: Icon, label } = config[status];

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full border font-medium',
        className,
        size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-3 py-1 text-sm'
      )}
    >
      <Icon className={size === 'sm' ? 'w-3 h-3' : 'w-4 h-4'} />
      {label}
    </span>
  );
};

export default StatusBadge;
