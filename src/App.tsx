
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AnimatedLayout from "./components/layout/AnimatedLayout";
import Index from "./pages/Index";
import Wardrobe from "./pages/Wardrobe";
import Wishlist from "./pages/Wishlist";
import Profile from "./pages/Profile";
import Create from "./pages/Create";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route 
            path="/" 
            element={
              <AnimatedLayout>
                <Index />
              </AnimatedLayout>
            } 
          />
          <Route 
            path="/wardrobe" 
            element={
              <AnimatedLayout>
                <Wardrobe />
              </AnimatedLayout>
            } 
          />
          <Route 
            path="/wishlist" 
            element={
              <AnimatedLayout>
                <Wishlist />
              </AnimatedLayout>
            } 
          />
          <Route 
            path="/profile" 
            element={
              <AnimatedLayout>
                <Profile />
              </AnimatedLayout>
            } 
          />
          <Route 
            path="/create" 
            element={
              <AnimatedLayout>
                <Create />
              </AnimatedLayout>
            } 
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
