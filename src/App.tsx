
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AnimatedLayout from "./components/layout/AnimatedLayout";
import Index from "./pages/Index";
import Wardrobe from "./pages/Wardrobe";
import Wishlist from "./pages/Wishlist";
import Profile from "./pages/Profile";
import Create from "./pages/Create";
import Shop from "./pages/Shop";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/auth/ProtectedRoute";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
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
                  <ProtectedRoute>
                    <Wardrobe />
                  </ProtectedRoute>
                </AnimatedLayout>
              } 
            />
            <Route 
              path="/wishlist" 
              element={
                <AnimatedLayout>
                  <ProtectedRoute>
                    <Wishlist />
                  </ProtectedRoute>
                </AnimatedLayout>
              } 
            />
            <Route 
              path="/profile" 
              element={
                <AnimatedLayout>
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                </AnimatedLayout>
              } 
            />
            <Route 
              path="/create" 
              element={
                <AnimatedLayout>
                  <ProtectedRoute>
                    <Create />
                  </ProtectedRoute>
                </AnimatedLayout>
              } 
            />
            <Route 
              path="/shop" 
              element={
                <AnimatedLayout>
                  <Shop />
                </AnimatedLayout>
              } 
            />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
