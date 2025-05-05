
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { WeddingDataProvider, useWeddingData } from "./hooks/useWeddingData";
import Index from "./pages/Index";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";
import { useEffect } from "react";

const queryClient = new QueryClient();

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

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <WeddingDataProvider>
        <ThemeApplier>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/admin" element={<Admin />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </ThemeApplier>
      </WeddingDataProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
