import React from 'react';
import { Wallet, Gift, History, ArrowRight, Sparkles } from 'lucide-react';
import BottomNav from '@/components/BottomNav';
import { Button } from '@/components/ui/button';

const AbhicashPage: React.FC = () => {
  return (
    <div className="app-container min-h-screen bg-background pb-safe">
      {/* Header */}
      <div className="gradient-primary pt-12 pb-8 px-6 rounded-b-3xl">
        <h1 className="text-2xl font-bold text-primary-foreground mb-4">Abhicash</h1>
        
        {/* Balance Card */}
        <div className="bg-card/20 backdrop-blur-sm rounded-2xl p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 rounded-xl bg-primary-foreground/20 flex items-center justify-center">
              <Wallet className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <p className="text-primary-foreground/80 text-sm">Available Balance</p>
              <p className="text-3xl font-bold text-primary-foreground">₹0</p>
            </div>
          </div>
        </div>
      </div>

      <div className="px-6 py-6 space-y-6">
        {/* Earn Section */}
        <div className="bg-card rounded-2xl p-5 shadow-card">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-5 h-5 text-accent" />
            <h2 className="font-semibold text-foreground">Earn Abhicash</h2>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-muted rounded-xl">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center">
                  <Gift className="w-5 h-5 text-success" />
                </div>
                <div>
                  <p className="font-medium text-foreground text-sm">Refer & Earn</p>
                  <p className="text-xs text-muted-foreground">Get ₹100 per referral</p>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-muted-foreground" />
            </div>
            
            <div className="flex items-center justify-between p-3 bg-muted rounded-xl">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <History className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium text-foreground text-sm">Book More</p>
                  <p className="text-xs text-muted-foreground">Earn 2% cashback on every booking</p>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-muted-foreground" />
            </div>
          </div>
        </div>

        {/* Transaction History */}
        <div className="bg-card rounded-2xl p-5 shadow-card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-foreground">Transaction History</h2>
            <button className="text-sm text-primary font-medium">View All</button>
          </div>
          
          <div className="text-center py-8">
            <div className="w-16 h-16 mx-auto rounded-full bg-muted flex items-center justify-center mb-3">
              <History className="w-8 h-8 text-muted-foreground" />
            </div>
            <p className="text-muted-foreground text-sm">No transactions yet</p>
            <p className="text-xs text-muted-foreground mt-1">
              Start booking to earn Abhicash
            </p>
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  );
};

export default AbhicashPage;
