
import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Heart, Home, LogOut, Store, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';

export const BottomNav: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();
  
  const isActive = (path: string) => location.pathname === path;

  const handleLogout = () => {
    logout();
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
    navigate('/');
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden glass border-t">
      <div className="flex items-center justify-around py-3">
        <Link
          to="/"
          className={cn(
            "flex flex-col items-center justify-center",
            isActive("/") ? "text-foreground" : "text-muted-foreground"
          )}
        >
          <Home size={20} />
          <span className="text-[10px] mt-1">Home</span>
        </Link>
        
        <Link
          to="/shop"
          className={cn(
            "flex flex-col items-center justify-center",
            isActive("/shop") ? "text-foreground" : "text-muted-foreground"
          )}
        >
          <Store size={20} />
          <span className="text-[10px] mt-1">Shop</span>
        </Link>
        
        {isAuthenticated ? (
          <>
            <Link
              to="/wardrobe"
              className={cn(
                "flex flex-col items-center justify-center",
                isActive("/wardrobe") ? "text-foreground" : "text-muted-foreground"
              )}
            >
              <Heart size={20} />
              <span className="text-[10px] mt-1">Wardrobe</span>
            </Link>
            <Link
              to="/profile"
              className={cn(
                "flex flex-col items-center justify-center",
                isActive("/profile") ? "text-foreground" : "text-muted-foreground"
              )}
            >
              <User size={20} />
              <span className="text-[10px] mt-1">Profile</span>
            </Link>
          </>
        ) : (
          <Link
            to="/login"
            className={cn(
              "flex flex-col items-center justify-center",
              isActive("/login") ? "text-foreground" : "text-muted-foreground"
            )}
          >
            <User size={20} />
            <span className="text-[10px] mt-1">Profile</span>
          </Link>
        )}
      </div>
    </div>
  );
};

export default BottomNav;
