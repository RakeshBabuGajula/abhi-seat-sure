import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppProvider } from "@/context/AppContext";
import ErrorBoundary from "@/components/ErrorBoundary";
import Index from "./pages/Index";
import LoginPage from "./pages/LoginPage";
import BusListPage from "./pages/BusListPage";
import SeatSelectionPage from "./pages/SeatSelectionPage";
import PassengerDetailsPage from "./pages/PassengerDetailsPage";
import PaymentPage from "./pages/PaymentPage";
import BookingsPage from "./pages/BookingsPage";
import TicketDetailsPage from "./pages/TicketDetailsPage";
import AbhicashPage from "./pages/AbhicashPage";
import HelpPage from "./pages/HelpPage";
import AccountPage from "./pages/AccountPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AppProvider>
        <ErrorBoundary>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/buses" element={<BusListPage />} />
              <Route path="/seats" element={<SeatSelectionPage />} />
              <Route path="/passengers" element={<PassengerDetailsPage />} />
              <Route path="/payment" element={<PaymentPage />} />
              <Route path="/bookings" element={<BookingsPage />} />
              <Route path="/ticket/:id" element={<TicketDetailsPage />} />
              <Route path="/abhicash" element={<AbhicashPage />} />
              <Route path="/help" element={<HelpPage />} />
              <Route path="/account" element={<AccountPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </ErrorBoundary>
      </AppProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
