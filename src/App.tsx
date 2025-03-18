
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import AnimatedLayout from "./components/layout/AnimatedLayout";
import Index from "./pages/Index";
import Wardrobe from "./pages/Wardrobe";
import Wishlist from "./pages/Wishlist";
import Profile from "./pages/Profile";
import Create from "./pages/Create";
import Shop from "./pages/Shop";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Register from "./pages/Register";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000, // 1 minute
      refetchOnWindowFocus: false,
    },
  },
});

// Protected route component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, isLoading } = useAuth();
  
  if (isLoading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
};

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
                <ProtectedRoute>
                  <AnimatedLayout>
                    <Wardrobe />
                  </AnimatedLayout>
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/wishlist" 
              element={
                <ProtectedRoute>
                  <AnimatedLayout>
                    <Wishlist />
                  </AnimatedLayout>
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/profile" 
              element={
                <ProtectedRoute>
                  <AnimatedLayout>
                    <Profile />
                  </AnimatedLayout>
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/create" 
              element={
                <ProtectedRoute>
                  <AnimatedLayout>
                    <Create />
                  </AnimatedLayout>
                </ProtectedRoute>
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
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
