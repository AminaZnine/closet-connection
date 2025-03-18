
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Heart, Search, User } from 'lucide-react';
import { cn } from '@/lib/utils';

export const Navbar: React.FC = () => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass border-b">
      <div className="container mx-auto max-w-screen-xl">
        <div className="flex items-center justify-between py-4 px-4">
          <Link
            to="/"
            className="text-2xl font-semibold tracking-tighter"
          >
            closet
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
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
