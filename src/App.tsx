import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
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
  const location = useLocation();

  useEffect(() => {
    // Solo aplicar los colores del tema si estamos en una invitación
    if (themeColors && location.pathname.startsWith('/invitation/')) {
      document.documentElement.style.setProperty('--wedding-primary', themeColors.primary);
      document.documentElement.style.setProperty('--wedding-secondary', themeColors.secondary);
      document.documentElement.style.setProperty('--wedding-accent', themeColors.accent);
      document.documentElement.style.setProperty('--wedding-background', themeColors.background);
    } else {
      // Resetear los colores a los valores por defecto cuando no estamos en una invitación
      document.documentElement.style.setProperty('--wedding-primary', '#3E000C');
      document.documentElement.style.setProperty('--wedding-secondary', '#D4B2A7');
      document.documentElement.style.setProperty('--wedding-accent', '#B3B792');
      document.documentElement.style.setProperty('--wedding-background', '#E5E0D8');
    }
  }, [themeColors, location.pathname]);

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
            <BrowserRouter>
              <ThemeApplier>
                <Toaster />
                <Sonner />
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
              </ThemeApplier>
            </BrowserRouter>
          </WeddingDataProvider>
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

const App = () => <AppWithProviders />;

export default App;
