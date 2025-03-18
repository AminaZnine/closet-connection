
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Heart, Search, User, LogOut } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const Navbar: React.FC = () => {
  const location = useLocation();
  const { user, signOut } = useAuth();
  const isActive = (path: string) => location.pathname === path;

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
            
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger className="focus:outline-none">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user.avatar_url || ''} alt={user.username} />
                    <AvatarFallback>{user.username.charAt(0).toUpperCase()}</AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/profile" className="cursor-pointer w-full">
                      <User className="mr-2 h-4 w-4" />
                      <span>Profile</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={signOut} className="cursor-pointer">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link
                to="/login"
                aria-label="Login"
                className={cn(
                  "btn-hover",
                  isActive("/login") ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                )}
              >
                <User size={20} />
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
