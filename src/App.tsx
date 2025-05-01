
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";

// Pages
import HomePage from "./app/page";
import LoginPage from "./app/login/page";
import UnauthorizedPage from "./app/unauthorized/page";
import DashboardPage from "./app/dashboard/page";
import AdminDashboardPage from "./app/dashboard/admin/page";
import DoctorDashboardPage from "./app/dashboard/doctor/page";
import PatientDashboardPage from "./app/dashboard/patient/page";
import NotFound from "./pages/NotFound";

// Create a Dashboard Layout component
const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-screen">
      {/* Import sidebar component here if needed */}
      <main className="flex-1 overflow-auto p-8">
        {children}
      </main>
    </div>
  );
};

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/unauthorized" element={<UnauthorizedPage />} />
            
            {/* Dashboard Routes */}
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/dashboard/admin" element={<AdminDashboardPage />} />
            <Route path="/dashboard/doctor" element={<DoctorDashboardPage />} />
            <Route path="/dashboard/patient" element={<PatientDashboardPage />} />
            
            {/* Catch-all route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
