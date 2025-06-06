import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import ProtectedRoute from "@/components/ProtectedRoute";
import Index from "./pages/Index";
import Emergency from "./pages/Emergency";
import PreRegistration from "./pages/PreRegistration";
import ExistingPatient from "./pages/ExistingPatient";
import Auth from "./pages/Auth";
import HospitalDashboard from "./pages/HospitalDashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/emergency" element={<Emergency />} />
            <Route path="/pre-registration" element={<PreRegistration />} />
            <Route path="/existing-patient" element={
              <ProtectedRoute>
                <ExistingPatient />
              </ProtectedRoute>
            } />
            <Route path="/hospital-dashboard" element={
              <ProtectedRoute>
                <HospitalDashboard />
              </ProtectedRoute>
            } />
            {/* CUSTOM ROUTES */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
