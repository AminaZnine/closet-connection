
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

const queryClient = new QueryClient();

// Protected route component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  // In a real app, you'd check authentication state
  // For this demo we'll just use local storage
  const isAuthenticated = localStorage.getItem('user') !== null;
  
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  return <>{children}</>;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
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
            <Route 
              path="/login" 
              element={
                <AnimatedLayout>
                  <Login />
                </AnimatedLayout>
              } 
            />
            <Route 
              path="/signup" 
              element={
                <AnimatedLayout>
                  <Signup />
                </AnimatedLayout>
              } 
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
