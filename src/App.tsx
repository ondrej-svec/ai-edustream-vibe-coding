import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import BeansList from "./pages/BeansList";
import NotFound from "./pages/NotFound";
import { ErrorBoundary } from "@/components/ui/error-boundary";
import { toast } from "@/hooks/use-toast";
import React from "react";

const queryClient = new QueryClient();

const App = () => {
  React.useEffect(() => {
    window.onerror = (message, source, lineno, colno, error) => {
      // Log to error reporting service here if needed
      console.error("Global error:", message, source, lineno, colno, error);
      toast({ title: "Unexpected Error", description: String(message), variant: "destructive" });
    };
    window.onunhandledrejection = (event) => {
      // Log to error reporting service here if needed
      console.error("Unhandled promise rejection:", event.reason);
      toast({ title: "Unhandled Error", description: String(event.reason), variant: "destructive" });
    };
  }, []);

  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/beans" element={<BeansList />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
};

export default App;
