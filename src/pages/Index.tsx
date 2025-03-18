
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import StyleCard from '@/components/ui/StyleCard';
import { cn } from '@/lib/utils';

// Sample data - in a real app, this would come from an API
const SAMPLE_POSTS = [
  {
    id: '1',
    imageUrl: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80',
    likes: 124,
    username: 'olivia_style',
    userAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80',
    caption: 'Summer vibes with this minimal outfit'
  },
  {
    id: '2',
    imageUrl: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&q=80',
    likes: 89,
    username: 'max_fashion',
    userAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80',
    caption: 'Street style for this season'
  },
  {
    id: '3',
    imageUrl: 'https://images.unsplash.com/photo-1550614000-4895a10e1bfd?auto=format&fit=crop&q=80',
    likes: 210,
    username: 'sophie_trends',
    userAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80',
    caption: 'Modern casual with neutral tones'
  },
  {
    id: '4',
    imageUrl: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&q=80',
    likes: 156,
    username: 'alex_minimal',
    userAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80',
    caption: 'Minimal style is always in fashion'
  }
];

const FEATURED_STORES = [
  {
    id: 's1',
    name: 'Minimal Studios',
    imageUrl: 'https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?auto=format&fit=crop&q=80',
  },
  {
    id: 's2',
    name: 'Urban Attire',
    imageUrl: 'https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&q=80',
  },
  {
    id: 's3',
    name: 'Essence Boutique',
    imageUrl: 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?auto=format&fit=crop&q=80',
  }
];

const Index: React.FC = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState(SAMPLE_POSTS);
  const [activeTab, setActiveTab] = useState('trending');
  
  const handlePostClick = (postId: string) => {
    console.log(`Post clicked: ${postId}`);
    // In a real app, navigate to post detail page
  };
  
  const handleStoreClick = (storeId: string) => {
    console.log(`Store clicked: ${storeId}`);
    // In a real app, navigate to store detail page
  };
  
  return (
    <div className="space-y-10 pb-8">
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold">Discover</h1>
          <div className="flex items-center space-x-4">
            <button 
              className={cn(
                "text-sm transition-colors",
                activeTab === 'trending' 
                  ? "font-medium" 
                  : "text-muted-foreground hover:text-foreground"
              )}
              onClick={() => setActiveTab('trending')}
            >
              Trending
            </button>
            <button 
              className={cn(
                "text-sm transition-colors",
                activeTab === 'following' 
                  ? "font-medium" 
                  : "text-muted-foreground hover:text-foreground"
              )}
              onClick={() => setActiveTab('following')}
            >
              Following
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {posts.map((post) => (
            <StyleCard 
              key={post.id}
              imageUrl={post.imageUrl}
              likes={post.likes}
              username={post.username}
              userAvatar={post.userAvatar}
              caption={post.caption}
              onClick={() => handlePostClick(post.id)}
            />
          ))}
        </div>
      </section>
      
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-medium">Featured Stores</h2>
          <button className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            View all
          </button>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {FEATURED_STORES.map((store) => (
            <div 
              key={store.id}
              className="group relative rounded-md overflow-hidden aspect-[16/9]"
              onClick={() => handleStoreClick(store.id)}
            >
              <img 
                src={store.imageUrl} 
                alt={store.name} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-black/30 flex items-end">
                <div className="w-full p-4">
                  <h3 className="text-white font-medium">{store.name}</h3>
                  <p className="text-xs text-white/80">Featured Store</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
      
      <section className="space-y-6 mt-10">
        <h2 className="text-xl font-medium text-center">Build Your Perfect Wardrobe</h2>
        <p className="text-center text-muted-foreground text-sm max-w-xl mx-auto">
          Add your clothing items, create outfits, and get personalized style recommendations
        </p>
        
        <div className="flex flex-col md:flex-row justify-center gap-6 mt-4">
          <button 
            className="px-6 py-3 bg-foreground text-background rounded-md btn-hover"
            onClick={() => navigate('/wardrobe')}
          >
            Manage Your Wardrobe
          </button>
          <button 
            className="px-6 py-3 border border-foreground rounded-md btn-hover"
            onClick={() => navigate('/create')}
          >
            Create New Outfit
          </button>
        </div>
      </section>
    </div>
  );
};

export default Index;
