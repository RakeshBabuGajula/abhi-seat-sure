import React from 'react';
import { cn } from '@/lib/utils';
import { Bus } from 'lucide-react';

interface LoadingSpinnerProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  message?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  className,
  size = 'md',
  message,
}) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
  };

  return (
    <div className={cn('flex flex-col items-center justify-center gap-4', className)}>
      <div className="relative">
        <div
          className={cn(
            'rounded-full border-4 border-muted animate-spin',
            sizeClasses[size]
          )}
          style={{
            borderTopColor: 'hsl(var(--primary))',
            animationDuration: '0.8s',
          }}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <Bus className={cn(
            'text-primary animate-pulse',
            size === 'sm' ? 'w-3 h-3' : size === 'md' ? 'w-5 h-5' : 'w-7 h-7'
          )} />
        </div>
      </div>
      {message && (
        <p className="text-sm text-muted-foreground animate-pulse">{message}</p>
      )}
    </div>
  );
};

export default LoadingSpinner;
