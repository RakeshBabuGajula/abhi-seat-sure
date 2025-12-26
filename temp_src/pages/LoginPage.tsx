import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bus, Phone, ArrowRight, Shield, Smartphone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useApp } from '@/context/AppContext';
import { generateOTP } from '@/data/mockData';
import { toast } from '@/hooks/use-toast';
import LoadingSpinner from '@/components/LoadingSpinner';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { setUser, setIsLoading, isLoading } = useApp();
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [generatedOtp, setGeneratedOtp] = useState<string | null>(null);
  const [step, setStep] = useState<'phone' | 'otp'>('phone');

  const handleSendOtp = async () => {
    if (phone.length !== 10) {
      toast({
        title: 'Invalid Phone Number',
        description: 'Please enter a valid 10-digit mobile number',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    const mockOtp = generateOTP();
    setGeneratedOtp(mockOtp);
    setStep('otp');
    setIsLoading(false);
    
    toast({
      title: 'OTP Sent!',
      description: `Your OTP is: ${mockOtp} (Demo)`,
    });
  };

  const handleVerifyOtp = async () => {
    if (otp.length !== 6) {
      toast({
        title: 'Invalid OTP',
        description: 'Please enter the 6-digit OTP',
        variant: 'destructive',
      });
      return;
    }

    if (otp !== generatedOtp) {
      toast({
        title: 'Wrong OTP',
        description: 'The OTP you entered is incorrect',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 800));
    
    setUser({
      id: `user-${Date.now()}`,
      phone: phone,
    });
    
    setIsLoading(false);
    
    toast({
      title: 'Welcome!',
      description: 'You have successfully logged in',
    });
    
    navigate('/');
  };

  if (isLoading) {
    return (
      <div className="app-container flex items-center justify-center min-h-screen bg-background">
        <LoadingSpinner message={step === 'phone' ? 'Sending OTP...' : 'Verifying...'} />
      </div>
    );
  }

  return (
    <div className="app-container min-h-screen bg-background">
      {/* Header */}
      <div className="gradient-primary pt-12 pb-20 px-6 rounded-b-[2.5rem]">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-12 h-12 rounded-2xl bg-card/20 backdrop-blur-sm flex items-center justify-center">
            <Bus className="w-7 h-7 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-primary-foreground">Abhi's SeatSure</h1>
            <p className="text-primary-foreground/80 text-sm">Book with confidence</p>
          </div>
        </div>
        
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-primary-foreground">
            {step === 'phone' ? 'Welcome Back!' : 'Verify OTP'}
          </h2>
          <p className="text-primary-foreground/80">
            {step === 'phone'
              ? 'Enter your mobile number to continue'
              : `We've sent an OTP to +91 ${phone}`}
          </p>
        </div>
      </div>

      {/* Form Card */}
      <div className="px-6 -mt-10">
        <div className="bg-card rounded-2xl shadow-elevated p-6 space-y-6 animate-slide-up">
          {step === 'phone' ? (
            <>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Mobile Number</label>
                <div className="flex gap-3">
                  <div className="flex items-center gap-2 px-4 bg-muted rounded-xl text-muted-foreground font-medium">
                    <Phone className="w-4 h-4" />
                    +91
                  </div>
                  <Input
                    type="tel"
                    placeholder="Enter 10-digit number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                    className="flex-1"
                    maxLength={10}
                  />
                </div>
              </div>
              
              <Button
                onClick={handleSendOtp}
                className="w-full"
                variant="gradient"
                size="lg"
                disabled={phone.length !== 10}
              >
                Get OTP
                <ArrowRight className="w-5 h-5" />
              </Button>
            </>
          ) : (
            <>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Enter OTP</label>
                <Input
                  type="text"
                  placeholder="6-digit OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  className="text-center text-2xl tracking-[0.5em] font-bold"
                  maxLength={6}
                />
              </div>

              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Smartphone className="w-4 h-4" />
                <span>Demo OTP: {generatedOtp}</span>
              </div>
              
              <Button
                onClick={handleVerifyOtp}
                className="w-full"
                variant="gradient"
                size="lg"
                disabled={otp.length !== 6}
              >
                Verify & Login
                <ArrowRight className="w-5 h-5" />
              </Button>

              <button
                onClick={() => {
                  setStep('phone');
                  setOtp('');
                  setGeneratedOtp(null);
                }}
                className="w-full text-sm text-primary font-medium hover:underline"
              >
                Change Phone Number
              </button>
            </>
          )}
        </div>
      </div>

      {/* Trust Indicators */}
      <div className="px-6 mt-8">
        <div className="flex items-center justify-center gap-6 text-muted-foreground">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-success" />
            <span className="text-xs">Secure Login</span>
          </div>
          <div className="flex items-center gap-2">
            <Bus className="w-4 h-4 text-primary" />
            <span className="text-xs">5000+ Routes</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
