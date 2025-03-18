
import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Heart, LogIn, LogOut, Search, User, UserPlus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';

export const Navbar: React.FC = () => {
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
    <header className="fixed top-0 left-0 right-0 z-50 glass border-b">
      <div className="container mx-auto max-w-screen-xl">
        <div className="flex items-center justify-between py-4 px-4">
          <Link
            to="/"
            className="text-2xl font-semibold tracking-tighter"
          >
            Unik concept
          </Link>
          
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className={cn(
                "text-sm tracking-wide transition-all",
                isActive("/") ? "font-medium" : "text-muted-foreground hover:text-foreground"
              )}
            >
              Discover
            </Link>
            <Link
              to="/wardrobe"
              className={cn(
                "text-sm tracking-wide transition-all",
                isActive("/wardrobe") ? "font-medium" : "text-muted-foreground hover:text-foreground"
              )}
            >
              Wardrobe
            </Link>
            <Link
              to="/create"
              className={cn(
                "text-sm tracking-wide transition-all",
                isActive("/create") ? "font-medium" : "text-muted-foreground hover:text-foreground"
              )}
            >
              Create
            </Link>
            <Link
              to="/shop"
              className={cn(
                "text-sm tracking-wide transition-all",
                isActive("/shop") ? "font-medium" : "text-muted-foreground hover:text-foreground"
              )}
            >
              Shop
            </Link>
          </nav>
          
          <div className="flex items-center space-x-5">
            <button
              aria-label="Search"
              className="btn-hover text-muted-foreground hover:text-foreground"
            >
              <Search size={20} />
            </button>
            
            {isAuthenticated ? (
              <>
                <Link
                  to="/wishlist"
                  aria-label="Wishlist"
                  className={cn(
                    "btn-hover",
                    isActive("/wishlist") ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  <Heart size={20} />
                </Link>
                <Link
                  to="/profile"
                  aria-label="Profile"
                  className={cn(
                    "btn-hover",
                    isActive("/profile") ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  <User size={20} />
                </Link>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={handleLogout} 
                  className="text-muted-foreground hover:text-foreground"
                >
                  <LogOut size={20} />
                </Button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  aria-label="Login"
                  className={cn(
                    "btn-hover",
                    isActive("/login") ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  <LogIn size={20} />
                </Link>
                <Link
                  to="/signup"
                  aria-label="Sign up"
                  className={cn(
                    "btn-hover",
                    isActive("/signup") ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  <UserPlus size={20} />
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
