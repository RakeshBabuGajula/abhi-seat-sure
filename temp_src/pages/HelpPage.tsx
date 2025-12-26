import React from 'react';
import {
  HelpCircle,
  MessageCircle,
  Phone,
  Mail,
  ChevronRight,
  FileText,
  Shield,
  CreditCard,
  Ticket,
} from 'lucide-react';
import BottomNav from '@/components/BottomNav';

const helpTopics = [
  {
    icon: Ticket,
    title: 'Booking Issues',
    description: 'Problems with booking or cancellation',
  },
  {
    icon: CreditCard,
    title: 'Payment & Refunds',
    description: 'Payment failures, refund status',
  },
  {
    icon: Shield,
    title: 'Flexi Ticket',
    description: 'ReSell and ReBook queries',
  },
  {
    icon: FileText,
    title: 'General Queries',
    description: 'Other questions and feedback',
  },
];

const HelpPage: React.FC = () => {
  return (
    <div className="app-container min-h-screen bg-background pb-safe">
      {/* Header */}
      <div className="gradient-primary pt-12 pb-8 px-6 rounded-b-3xl">
        <h1 className="text-2xl font-bold text-primary-foreground mb-2">Help & Support</h1>
        <p className="text-primary-foreground/80">We're here to help you 24/7</p>
      </div>

      <div className="px-6 py-6 space-y-6">
        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-3">
          <button className="bg-card rounded-2xl p-4 shadow-card card-hover flex flex-col items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-success/10 flex items-center justify-center">
              <MessageCircle className="w-6 h-6 text-success" />
            </div>
            <span className="text-sm font-medium text-foreground">Live Chat</span>
          </button>
          <button className="bg-card rounded-2xl p-4 shadow-card card-hover flex flex-col items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <Phone className="w-6 h-6 text-primary" />
            </div>
            <span className="text-sm font-medium text-foreground">Call Us</span>
          </button>
        </div>

        {/* Help Topics */}
        <div className="bg-card rounded-2xl p-5 shadow-card">
          <h2 className="font-semibold text-foreground mb-4">How can we help?</h2>
          
          <div className="space-y-3">
            {helpTopics.map((topic, index) => {
              const Icon = topic.icon;
              return (
                <button
                  key={index}
                  className="w-full flex items-center gap-4 p-3 rounded-xl hover:bg-muted transition-colors"
                >
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1 text-left">
                    <p className="font-medium text-foreground text-sm">{topic.title}</p>
                    <p className="text-xs text-muted-foreground">{topic.description}</p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-muted-foreground" />
                </button>
              );
            })}
          </div>
        </div>

        {/* Contact Info */}
        <div className="bg-card rounded-2xl p-5 shadow-card">
          <h2 className="font-semibold text-foreground mb-4">Contact Us</h2>
          
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium text-foreground">+91 1800-123-4567</p>
                <p className="text-xs text-muted-foreground">24/7 Customer Support</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium text-foreground">support@seatsure.com</p>
                <p className="text-xs text-muted-foreground">Email us anytime</p>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Link */}
        <button className="w-full bg-muted rounded-2xl p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <HelpCircle className="w-5 h-5 text-muted-foreground" />
            <span className="font-medium text-foreground">Frequently Asked Questions</span>
          </div>
          <ChevronRight className="w-4 h-4 text-muted-foreground" />
        </button>
      </div>

      <BottomNav />
    </div>
  );
};

export default HelpPage;
