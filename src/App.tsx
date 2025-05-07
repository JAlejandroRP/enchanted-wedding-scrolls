
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { WeddingDataProvider, useWeddingData } from "./hooks/useWeddingData";
import { AuthProvider, useAuth } from "./hooks/useAuth";
import Index from "./pages/Index";
import Admin from "./pages/Admin";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import Invitation from "./pages/Invitation";
import NotFound from "./pages/NotFound";
import { useEffect } from "react";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

const ThemeApplier = ({ children }: { children: React.ReactNode }) => {
  const { weddingData } = useWeddingData();
  const { themeColors } = weddingData;

  useEffect(() => {
    // Apply theme colors to CSS variables
    if (themeColors) {
      document.documentElement.style.setProperty('--wedding-primary', themeColors.primary);
      document.documentElement.style.setProperty('--wedding-secondary', themeColors.secondary);
      document.documentElement.style.setProperty('--wedding-accent', themeColors.accent);
      document.documentElement.style.setProperty('--wedding-background', themeColors.background);
    }
  }, [themeColors]);

  return <>{children}</>;
};

// Protected route component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#E5E0D8]">
        <p className="text-[#3E000C] text-lg">Cargando...</p>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  return <>{children}</>;
};

const AppWithProviders = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AuthProvider>
          <WeddingDataProvider>
            <ThemeApplier>
              <Toaster />
              <Sonner />
              <BrowserRouter>
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route 
                    path="/admin" 
                    element={
                      <ProtectedRoute>
                        <Admin />
                      </ProtectedRoute>
                    } 
                  />
                  <Route path="/auth" element={<Auth />} />
                  <Route 
                    path="/dashboard" 
                    element={
                      <ProtectedRoute>
                        <Dashboard />
                      </ProtectedRoute>
                    } 
                  />
                  <Route path="/invitation/:publicId" element={<Invitation />} />
                  {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </BrowserRouter>
            </ThemeApplier>
          </WeddingDataProvider>
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

const App = () => <AppWithProviders />;

export default App;
