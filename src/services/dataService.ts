
import { supabase, WardrobeItem, Outfit, WishlistItem, Store, Product, User } from '@/lib/supabase';

// Wardrobe Items
export const getWardrobeItems = async (userId: string): Promise<WardrobeItem[]> => {
  const { data, error } = await supabase
    .from('wardrobe_items')
    .select('*')
    .eq('user_id', userId);
  
  if (error) {
    console.error('Error fetching wardrobe items:', error);
    throw error;
  }
  
  return data || [];
};

export const addWardrobeItem = async (item: Omit<WardrobeItem, 'id' | 'created_at'>): Promise<WardrobeItem> => {
  const { data, error } = await supabase
    .from('wardrobe_items')
    .insert([item])
    .select()
    .single();
  
  if (error) {
    console.error('Error adding wardrobe item:', error);
    throw error;
  }
  
  return data;
};

export const deleteWardrobeItem = async (itemId: string): Promise<void> => {
  const { error } = await supabase
    .from('wardrobe_items')
    .delete()
    .eq('id', itemId);
  
  if (error) {
    console.error('Error deleting wardrobe item:', error);
    throw error;
  }
};

// Outfits
export const getOutfits = async (userId: string): Promise<Outfit[]> => {
  const { data, error } = await supabase
    .from('outfits')
    .select('*')
    .eq('user_id', userId);
  
  if (error) {
    console.error('Error fetching outfits:', error);
    throw error;
  }
  
  return data || [];
};

export const createOutfit = async (outfit: Omit<Outfit, 'id' | 'created_at' | 'likes_count'>): Promise<Outfit> => {
  const { data, error } = await supabase
    .from('outfits')
    .insert([{ ...outfit, likes_count: 0 }])
    .select()
    .single();
  
  if (error) {
    console.error('Error creating outfit:', error);
    throw error;
  }
  
  return data;
};

export const likeOutfit = async (outfitId: string): Promise<void> => {
  // First get the current likes
  const { data: outfit, error: fetchError } = await supabase
    .from('outfits')
    .select('likes_count')
    .eq('id', outfitId)
    .single();
  
  if (fetchError) {
    console.error('Error fetching outfit likes:', fetchError);
    throw fetchError;
  }
  
  // Then update with incremented count
  const { error: updateError } = await supabase
    .from('outfits')
    .update({ likes_count: (outfit.likes_count || 0) + 1 })
    .eq('id', outfitId);
  
  if (updateError) {
    console.error('Error liking outfit:', updateError);
    throw updateError;
  }
};

// Wishlist
export const getWishlistItems = async (userId: string): Promise<WishlistItem[]> => {
  const { data, error } = await supabase
    .from('wishlist_items')
    .select('*')
    .eq('user_id', userId);
  
  if (error) {
    console.error('Error fetching wishlist items:', error);
    throw error;
  }
  
  return data || [];
};

export const addWishlistItem = async (item: Omit<WishlistItem, 'id' | 'created_at'>): Promise<WishlistItem> => {
  const { data, error } = await supabase
    .from('wishlist_items')
    .insert([item])
    .select()
    .single();
  
  if (error) {
    console.error('Error adding wishlist item:', error);
    throw error;
  }
  
  return data;
};

export const removeWishlistItem = async (itemId: string): Promise<void> => {
  const { error } = await supabase
    .from('wishlist_items')
    .delete()
    .eq('id', itemId);
  
  if (error) {
    console.error('Error removing wishlist item:', error);
    throw error;
  }
};

// Stores
export const getStores = async (): Promise<Store[]> => {
  const { data, error } = await supabase
    .from('stores')
    .select('*');
  
  if (error) {
    console.error('Error fetching stores:', error);
    throw error;
  }
  
  return data || [];
};

export const followStore = async (storeId: string, userId: string): Promise<void> => {
  // First check if already following
  const { data: existingFollow, error: checkError } = await supabase
    .from('store_followers')
    .select()
    .eq('store_id', storeId)
    .eq('user_id', userId);
  
  if (checkError) {
    console.error('Error checking store follow status:', checkError);
    throw checkError;
  }
  
  // If not already following, add follow
  if (!existingFollow || existingFollow.length === 0) {
    const { error: followError } = await supabase
      .from('store_followers')
      .insert([{ store_id: storeId, user_id: userId }]);
    
    if (followError) {
      console.error('Error following store:', followError);
      throw followError;
    }
    
    // Update store followers count
    const { data: store, error: fetchError } = await supabase
      .from('stores')
      .select('followers_count')
      .eq('id', storeId)
      .single();
    
    if (fetchError) {
      console.error('Error fetching store followers:', fetchError);
      throw fetchError;
    }
    
    const { error: updateError } = await supabase
      .from('stores')
      .update({ followers_count: (store.followers_count || 0) + 1 })
      .eq('id', storeId);
    
    if (updateError) {
      console.error('Error updating store followers count:', updateError);
      throw updateError;
    }
  }
};

// Products
export const getProducts = async (filters?: { 
  storeId?: string, 
  category?: string,
  isNew?: boolean
}): Promise<Product[]> => {
  let query = supabase.from('products').select('*');
  
  if (filters?.storeId) {
    query = query.eq('store_id', filters.storeId);
  }
  
  if (filters?.category) {
    query = query.eq('category', filters.category);
  }
  
  if (filters?.isNew !== undefined) {
    query = query.eq('isNew', filters.isNew);
  }
  
  const { data, error } = await query;
  
  if (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
  
  return data || [];
};

// User Profile
export const getUserProfile = async (userId: string): Promise<User | null> => {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();
  
  if (error) {
    console.error('Error fetching user profile:', error);
    if (error.code === 'PGRST116') {
      // Not found error
      return null;
    }
    throw error;
  }
  
  return data;
};

// File Storage
export const uploadImage = async (
  file: File, 
  bucket: 'wardrobe' | 'outfits' | 'profile',
  userId: string
): Promise<string> => {
  const fileExt = file.name.split('.').pop();
  const fileName = `${userId}-${Math.random().toString(36).substring(2)}.${fileExt}`;
  const filePath = `${bucket}/${fileName}`;
  
  const { error } = await supabase.storage
    .from(bucket)
    .upload(filePath, file);
  
  if (error) {
    console.error(`Error uploading to ${bucket}:`, error);
    throw error;
  }
  
  const { data } = supabase.storage
    .from(bucket)
    .getPublicUrl(filePath);
  
  return data.publicUrl;
};
