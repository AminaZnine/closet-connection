
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import StyleCard from '@/components/ui/StyleCard';
import { cn } from '@/lib/utils';
import { useToast } from '@/components/ui/use-toast';
import { Heart, Store, Sparkles, Search, Filter } from 'lucide-react';

// Sample data - in a real app, this would come from an API
const SAMPLE_POSTS = [
  {
    id: '1',
    imageUrl: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80',
    likes: 124,
    username: 'olivia_style',
    userAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80',
    caption: 'Summer vibes with this minimal outfit',
    tags: ['summer', 'minimal', 'casual']
  },
  {
    id: '2',
    imageUrl: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&q=80',
    likes: 89,
    username: 'max_fashion',
    userAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80',
    caption: 'Street style for this season',
    tags: ['street', 'urban', 'trendy']
  },
  {
    id: '3',
    imageUrl: 'https://images.unsplash.com/photo-1550614000-4895a10e1bfd?auto=format&fit=crop&q=80',
    likes: 210,
    username: 'sophie_trends',
    userAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80',
    caption: 'Modern casual with neutral tones',
    tags: ['modern', 'neutral', 'casual']
  },
  {
    id: '4',
    imageUrl: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&q=80',
    likes: 156,
    username: 'alex_minimal',
    userAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80',
    caption: 'Minimal style is always in fashion',
    tags: ['minimal', 'classic', 'timeless']
  }
];

const FOLLOWING_POSTS = [
  {
    id: '5',
    imageUrl: 'https://images.unsplash.com/photo-1485968579580-b6d095142e6e?auto=format&fit=crop&q=80',
    likes: 198,
    username: 'fashion_daily',
    userAvatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80',
    caption: 'Layering tips for fall season',
    tags: ['fall', 'layering', 'tips']
  },
  {
    id: '6',
    imageUrl: 'https://images.unsplash.com/photo-1475180098004-ca77a66827be?auto=format&fit=crop&q=80',
    likes: 163,
    username: 'style_tips',
    userAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80',
    caption: 'Business casual look for the modern office',
    tags: ['business', 'office', 'casual']
  }
];

const FEATURED_STORES = [
  {
    id: 's1',
    name: 'Minimal Studios',
    imageUrl: 'https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?auto=format&fit=crop&q=80',
    description: 'Minimalist clothing for modern lifestyle',
    followers: 1243
  },
  {
    id: 's2',
    name: 'Urban Attire',
    imageUrl: 'https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&q=80',
    description: 'Street style essentials for everyday wear',
    followers: 987
  },
  {
    id: 's3',
    name: 'Essence Boutique',
    imageUrl: 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?auto=format&fit=crop&q=80',
    description: 'Elegant and timeless fashion pieces',
    followers: 1589
  }
];

const TRENDING_TAGS = [
  'summerStyle', 'minimalFashion', 'sustainableClothing', 
  'vintageFinds', 'streetwear', 'officeLook'
];

const Index: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [posts, setPosts] = useState(SAMPLE_POSTS);
  const [activeTab, setActiveTab] = useState('trending');
  const [likedPosts, setLikedPosts] = useState<string[]>([]);
  const [savedPosts, setSavedPosts] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  
  // Switch posts based on active tab
  useEffect(() => {
    if (activeTab === 'trending') {
      setPosts(SAMPLE_POSTS);
    } else {
      setPosts(FOLLOWING_POSTS);
    }
  }, [activeTab]);
  
  const handlePostClick = (postId: string) => {
    console.log(`Post clicked: ${postId}`);
    const post = [...SAMPLE_POSTS, ...FOLLOWING_POSTS].find(p => p.id === postId);
    
    toast({
      title: `Post by ${post?.username}`,
      description: post?.caption,
    });
  };
  
  const handleLikePost = (postId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    
    if (likedPosts.includes(postId)) {
      setLikedPosts(likedPosts.filter(id => id !== postId));
      toast({
        title: "Unliked",
        description: "You've unliked this post",
      });
    } else {
      setLikedPosts([...likedPosts, postId]);
      toast({
        title: "Liked",
        description: "You've liked this post",
      });
    }
  };
  
  const handleSavePost = (postId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    
    if (savedPosts.includes(postId)) {
      setSavedPosts(savedPosts.filter(id => id !== postId));
      toast({
        title: "Removed",
        description: "Post removed from your saved collection",
      });
    } else {
      setSavedPosts([...savedPosts, postId]);
      toast({
        title: "Saved",
        description: "Post saved to your collection",
      });
    }
  };
  
  const handleStoreClick = (storeId: string) => {
    console.log(`Store clicked: ${storeId}`);
    const store = FEATURED_STORES.find(s => s.id === storeId);
    
    toast({
      title: store?.name,
      description: `Viewing ${store?.name} products`,
    });
    
    // In a real app, navigate to store page
    setTimeout(() => navigate('/shop'), 1000);
  };
  
  const handleFollowStore = (storeId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const store = FEATURED_STORES.find(s => s.id === storeId);
    
    toast({
      title: "Following",
      description: `You're now following ${store?.name}`,
    });
  };
  
  const handleTagClick = (tag: string) => {
    toast({
      title: `#${tag}`,
      description: `Browsing posts with #${tag}`,
    });
    
    // Filter posts by tag in a real app
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!searchQuery.trim()) return;
    
    toast({
      title: "Searching",
      description: `Results for "${searchQuery}"`,
    });
    
    // In a real app, fetch search results
    setShowSearch(false);
  };
  
  return (
    <div className="space-y-10 pb-8">
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold">Discover</h1>
          <div className="flex items-center space-x-4">
            {!showSearch ? (
              <button 
                className="text-foreground hover:text-muted-foreground transition-colors"
                onClick={() => setShowSearch(true)}
              >
                <Search size={20} />
              </button>
            ) : (
              <form onSubmit={handleSearch} className="flex items-center">
                <input
                  type="text"
                  placeholder="Search styles, tags..."
                  className="border-b border-foreground bg-transparent px-2 py-1 text-sm focus:outline-none"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                />
                <button 
                  type="button" 
                  className="ml-2 text-muted-foreground hover:text-foreground"
                  onClick={() => setShowSearch(false)}
                >
                  ✕
                </button>
              </form>
            )}
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
        
        {/* Trending tags */}
        <div className="flex overflow-x-auto py-2 space-x-2 no-scrollbar">
          {TRENDING_TAGS.map((tag, index) => (
            <button 
              key={index}
              className="px-3 py-1 text-xs border border-border rounded-full whitespace-nowrap hover:bg-secondary transition-colors"
              onClick={() => handleTagClick(tag)}
            >
              #{tag}
            </button>
          ))}
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {posts.map((post) => (
            <div key={post.id} className="relative group">
              <StyleCard 
                key={post.id}
                imageUrl={post.imageUrl}
                likes={likedPosts.includes(post.id) ? post.likes + 1 : post.likes}
                username={post.username}
                userAvatar={post.userAvatar}
                caption={post.caption}
                onClick={() => handlePostClick(post.id)}
              />
              
              <div className="absolute top-2 right-2 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button 
                  className={`p-2 rounded-full bg-background/80 backdrop-blur-sm ${
                    likedPosts.includes(post.id) ? 'text-destructive' : 'text-foreground'
                  } hover:bg-background transition-colors`}
                  onClick={(e) => handleLikePost(post.id, e)}
                >
                  <Heart size={18} fill={likedPosts.includes(post.id) ? "currentColor" : "none"} />
                </button>
                
                <button 
                  className={`p-2 rounded-full bg-background/80 backdrop-blur-sm ${
                    savedPosts.includes(post.id) ? 'text-foreground font-bold' : 'text-foreground'
                  } hover:bg-background transition-colors`}
                  onClick={(e) => handleSavePost(post.id, e)}
                >
                  <Sparkles size={18} fill={savedPosts.includes(post.id) ? "currentColor" : "none"} />
                </button>
              </div>
              
              {/* Tags */}
              <div className="mt-2 flex flex-wrap gap-1">
                {post.tags.map((tag, index) => (
                  <span 
                    key={index} 
                    className="text-xs text-muted-foreground hover:text-foreground cursor-pointer"
                    onClick={() => handleTagClick(tag)}
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
      
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-medium">Featured Stores</h2>
          <button 
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            onClick={() => navigate('/shop')}
          >
            View all
          </button>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {FEATURED_STORES.map((store) => (
            <div 
              key={store.id}
              className="group relative rounded-md overflow-hidden aspect-[16/9] cursor-pointer"
              onClick={() => handleStoreClick(store.id)}
            >
              <img 
                src={store.imageUrl} 
                alt={store.name} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-black/40 flex flex-col justify-end">
                <div className="w-full p-4">
                  <div className="flex items-center space-x-2 mb-1">
                    <Store size={16} className="text-white" />
                    <h3 className="text-white font-medium">{store.name}</h3>
                  </div>
                  <p className="text-xs text-white/80 mb-2">{store.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-white/90">{store.followers} followers</span>
                    <button 
                      className="text-xs px-3 py-1 bg-white/20 text-white rounded-full backdrop-blur-sm hover:bg-white/30 transition-colors"
                      onClick={(e) => handleFollowStore(store.id, e)}
                    >
                      Follow
                    </button>
                  </div>
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
