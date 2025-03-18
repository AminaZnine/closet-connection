
import React, { useState } from 'react';
import { Store, ShoppingBag, Heart, ShoppingCart } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { Badge } from '@/components/ui/badge';

// Sample data - in a real app, this would come from an API
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

const TRENDING_ITEMS = [
  {
    id: 'p1',
    name: 'Minimalist Tee',
    price: '$35',
    imageUrl: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80',
    store: 'Minimal Studios',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['White', 'Black', 'Gray'],
    isNew: true
  },
  {
    id: 'p2',
    name: 'Classic Denim',
    price: '$89',
    imageUrl: 'https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&q=80',
    store: 'Urban Attire',
    sizes: ['28', '30', '32', '34'],
    colors: ['Blue', 'Black'],
    isNew: false
  },
  {
    id: 'p3',
    name: 'Everyday Sneakers',
    price: '$65',
    imageUrl: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&q=80',
    store: 'Urban Attire',
    sizes: ['7', '8', '9', '10', '11'],
    colors: ['White', 'Black'],
    isNew: true
  },
  {
    id: 'p4',
    name: 'Structured Blazer',
    price: '$120',
    imageUrl: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&q=80',
    store: 'Essence Boutique',
    sizes: ['XS', 'S', 'M', 'L'],
    colors: ['Black', 'Navy', 'Beige'],
    isNew: false
  }
];

const CATEGORIES = [
  { id: 'c1', name: 'New Arrivals' },
  { id: 'c2', name: 'Tops' },
  { id: 'c3', name: 'Bottoms' },
  { id: 'c4', name: 'Outerwear' },
  { id: 'c5', name: 'Accessories' },
  { id: 'c6', name: 'Shoes' },
];

const Shop: React.FC = () => {
  const { toast } = useToast();
  const [cartItems, setCartItems] = useState<string[]>([]);
  const [wishlistItems, setWishlistItems] = useState<string[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('c1');
  const [selectedStore, setSelectedStore] = useState<string | null>(null);
  
  const handleStoreClick = (storeId: string) => {
    console.log(`Store clicked: ${storeId}`);
    setSelectedStore(storeId);
    const store = FEATURED_STORES.find(s => s.id === storeId);
    toast({
      title: `${store?.name}`,
      description: `Viewing products from ${store?.name}`,
    });
  };
  
  const handleProductClick = (productId: string) => {
    console.log(`Product clicked: ${productId}`);
    const product = TRENDING_ITEMS.find(p => p.id === productId);
    toast({
      title: product?.name,
      description: `View details for ${product?.name}`,
    });
  };

  const handleAddToCart = (productId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (cartItems.includes(productId)) {
      setCartItems(cartItems.filter(id => id !== productId));
      toast({
        title: "Removed from cart",
        description: "Item has been removed from your cart",
      });
    } else {
      setCartItems([...cartItems, productId]);
      toast({
        title: "Added to cart",
        description: "Item has been added to your cart",
      });
    }
  };

  const handleAddToWishlist = (productId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (wishlistItems.includes(productId)) {
      setWishlistItems(wishlistItems.filter(id => id !== productId));
      toast({
        title: "Removed from wishlist",
        description: "Item has been removed from your wishlist",
      });
    } else {
      setWishlistItems([...wishlistItems, productId]);
      toast({
        title: "Added to wishlist",
        description: "Item has been added to your wishlist",
      });
    }
  };

  const handleCategoryClick = (categoryId: string) => {
    setActiveCategory(categoryId);
    const category = CATEGORIES.find(c => c.id === categoryId);
    toast({
      title: `${category?.name}`,
      description: `Browsing ${category?.name} category`,
    });
  };
  
  const filteredProducts = selectedStore 
    ? TRENDING_ITEMS.filter(product => product.store === FEATURED_STORES.find(s => s.id === selectedStore)?.name)
    : TRENDING_ITEMS;
  
  return (
    <div className="space-y-10 pb-8">
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold">Shop</h1>
          <button className="flex items-center space-x-2 text-sm bg-foreground text-background px-4 py-2 rounded-md btn-hover">
            <ShoppingBag size={16} />
            <span>Cart ({cartItems.length})</span>
          </button>
        </div>

        {/* Categories */}
        <div className="flex overflow-x-auto py-2 space-x-2 no-scrollbar">
          {CATEGORIES.map((category) => (
            <button
              key={category.id}
              className={`px-4 py-2 whitespace-nowrap rounded-full text-sm ${
                activeCategory === category.id
                  ? "bg-foreground text-background"
                  : "bg-secondary text-foreground"
              } btn-hover`}
              onClick={() => handleCategoryClick(category.id)}
            >
              {category.name}
            </button>
          ))}
        </div>
        
        {selectedStore && (
          <div className="flex items-center justify-between py-2">
            <p className="text-sm">
              Showing products from{" "}
              <span className="font-medium">
                {FEATURED_STORES.find(s => s.id === selectedStore)?.name}
              </span>
            </p>
            <button 
              className="text-xs text-muted-foreground hover:text-foreground"
              onClick={() => setSelectedStore(null)}
            >
              View all stores
            </button>
          </div>
        )}
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div 
              key={product.id}
              className="group cursor-pointer relative"
              onClick={() => handleProductClick(product.id)}
            >
              <div className="overflow-hidden rounded-md mb-3 aspect-[3/4] relative">
                <img 
                  src={product.imageUrl} 
                  alt={product.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-2 right-2 flex flex-col gap-2">
                  <button 
                    onClick={(e) => handleAddToWishlist(product.id, e)} 
                    className={`p-2 rounded-full ${
                      wishlistItems.includes(product.id) 
                        ? "bg-foreground text-background" 
                        : "bg-background/80 text-foreground"
                    } btn-hover`}
                  >
                    <Heart size={16} fill={wishlistItems.includes(product.id) ? "currentColor" : "none"} />
                  </button>
                  <button 
                    onClick={(e) => handleAddToCart(product.id, e)} 
                    className={`p-2 rounded-full ${
                      cartItems.includes(product.id) 
                        ? "bg-foreground text-background" 
                        : "bg-background/80 text-foreground"
                    } btn-hover`}
                  >
                    <ShoppingCart size={16} />
                  </button>
                </div>
                {product.isNew && (
                  <Badge className="absolute top-2 left-2 bg-foreground text-background">New</Badge>
                )}
              </div>
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground">{product.store}</p>
                <h3 className="font-medium">{product.name}</h3>
                <div className="flex justify-between items-center">
                  <p className="font-medium">{product.price}</p>
                  <div className="flex space-x-1">
                    {product.colors.slice(0, 3).map((color, idx) => (
                      <span key={idx} className="w-3 h-3 rounded-full" style={{ 
                        backgroundColor: color.toLowerCase() === 'white' ? '#fff' : 
                                        color.toLowerCase() === 'black' ? '#000' : 
                                        color.toLowerCase() === 'gray' ? '#888' : 
                                        color.toLowerCase() === 'blue' ? '#3b82f6' : 
                                        color.toLowerCase() === 'navy' ? '#1e3a8a' : 
                                        color.toLowerCase() === 'beige' ? '#e5d3b3' : '#ddd',
                        border: color.toLowerCase() === 'white' ? '1px solid #e5e5e5' : 'none'
                      }}></span>
                    ))}
                    {product.colors.length > 3 && (
                      <span className="text-xs text-muted-foreground">+{product.colors.length - 3}</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
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
                    <button className="text-xs px-3 py-1 bg-white/20 text-white rounded-full backdrop-blur-sm hover:bg-white/30 transition-colors">
                      Follow
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-4 bg-secondary p-6 rounded-lg">
        <h2 className="text-xl font-medium text-center">Discover Your Perfect Style</h2>
        <p className="text-center text-muted-foreground text-sm max-w-lg mx-auto">
          Browse curated collections from our featured stores and find pieces that match your personal style
        </p>
        <div className="flex justify-center mt-4">
          <button 
            className="px-6 py-2 bg-foreground text-background rounded-md btn-hover"
            onClick={() => {
              toast({
                title: "Style Quiz",
                description: "Find your perfect style with our personalized recommendations",
              });
            }}
          >
            Take Style Quiz
          </button>
        </div>
      </section>
    </div>
  );
};

export default Shop;
