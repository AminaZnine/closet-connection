
import { createClient } from '@supabase/supabase-js';

// Using environment variables for Supabase credentials
// These will need to be set up in your deployment environment
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Create Supabase client
export const supabase = createClient(supabaseUrl, supabaseKey);

// Database types based on our schema
export type User = {
  id: string;
  username: string;
  email: string;
  avatar_url?: string;
  bio?: string;
  created_at: string;
  followers_count: number;
  following_count: number;
};

export type WardrobeItem = {
  id: string;
  user_id: string;
  name: string;
  category: string;
  imageUrl: string;
  brand?: string;
  color?: string;
  season?: string;
  created_at: string;
};

export type Outfit = {
  id: string;
  user_id: string;
  name: string;
  imageUrl: string;
  items: string[]; // Array of WardrobeItem IDs
  created_at: string;
  likes_count: number;
};

export type WishlistItem = {
  id: string;
  user_id: string;
  name: string;
  imageUrl: string;
  storeUrl: string;
  storeName: string;
  price: string;
  originalPrice?: string;
  inStock: boolean;
  isOnSale: boolean;
  created_at: string;
};

export type Store = {
  id: string;
  name: string;
  imageUrl: string;
  description: string;
  followers_count: number;
};

export type Product = {
  id: string;
  store_id: string;
  name: string;
  imageUrl: string;
  price: string;
  originalPrice?: string;
  sizes: string[];
  colors: string[];
  isNew: boolean;
  category: string;
  created_at: string;
};
