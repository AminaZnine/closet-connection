
import React, { useState } from 'react';
import StyleCard from '@/components/ui/StyleCard';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import { Heart, ShoppingBag, Filter, TrashIcon } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

// Sample data - in a real app, this would come from an API
const SAMPLE_WISHLIST = [
  {
    id: 'w1',
    imageUrl: 'https://images.unsplash.com/photo-1617952236317-115faa55b33d?auto=format&fit=crop&q=80',
    storeUrl: 'https://example.com/store1',
    storeName: 'Minimal Studio',
    name: 'Oversized Cotton Sweater',
    price: '$49.99',
    inStock: true,
    isOnSale: false
  },
  {
    id: 'w2',
    imageUrl: 'https://images.unsplash.com/photo-1578932750294-f5075e85f44a?auto=format&fit=crop&q=80',
    storeUrl: 'https://example.com/store2',
    storeName: 'Urban Threads',
    name: 'High-Waisted Jeans',
    price: '$65.00',
    inStock: true,
    isOnSale: false
  },
  {
    id: 'w3',
    imageUrl: 'https://images.unsplash.com/photo-1595341888016-a392ef81b7de?auto=format&fit=crop&q=80',
    storeUrl: 'https://example.com/store3',
    storeName: 'Style Maven',
    name: 'Canvas Tote Bag',
    price: '$29.99',
    originalPrice: '$39.99',
    inStock: true,
    isOnSale: true
  },
  {
    id: 'w4',
    imageUrl: 'https://images.unsplash.com/photo-1611390103895-2a4e66a8bd41?auto=format&fit=crop&q=80',
    storeUrl: 'https://example.com/store4',
    storeName: 'Fashion Forward',
    name: 'Leather Ankle Boots',
    price: '$89.95',
    inStock: false,
    isOnSale: false
  }
];

const Wishlist: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [wishlistItems, setWishlistItems] = useState(SAMPLE_WISHLIST);
  const [filterValue, setFilterValue] = useState<string | null>(null);
  
  const handleItemClick = (itemId: string) => {
    console.log(`Item clicked: ${itemId}`);
    toast({
      title: "Product Details",
      description: "Opening product details...",
    });
  };

  const handleShopNow = (item: any, e: React.MouseEvent) => {
    e.stopPropagation();
    toast({
      title: "Shopping",
      description: `Redirecting to ${item.storeName} to purchase ${item.name}`,
    });
    // In a real app, we would redirect to the store
    setTimeout(() => navigate('/shop'), 1500);
  };
  
  const handleRemoveFromWishlist = (itemId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setWishlistItems(wishlistItems.filter(item => item.id !== itemId));
    toast({
      title: "Removed from wishlist",
      description: "Item has been removed from your wishlist",
    });
  };

  const handleClearWishlist = () => {
    if (wishlistItems.length === 0) return;
    
    setWishlistItems([]);
    toast({
      title: "Wishlist cleared",
      description: "All items have been removed from your wishlist",
    });
  };

  const handleFilter = (filter: string | null) => {
    setFilterValue(filter);
    
    if (filter) {
      toast({
        title: "Filtered wishlist",
        description: `Showing ${filter.toLowerCase()} items`,
      });
    }
  };

  // Apply filters
  const filteredItems = filterValue === 'On Sale' 
    ? wishlistItems.filter(item => item.isOnSale)
    : filterValue === 'In Stock' 
    ? wishlistItems.filter(item => item.inStock)
    : wishlistItems;
  
  return (
    <div className="space-y-8 pb-8">
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold">Your Wishlist</h1>
            <p className="text-muted-foreground text-sm">Save items you love and want to purchase later</p>
          </div>
          
          {wishlistItems.length > 0 && (
            <button 
              className="text-sm text-muted-foreground hover:text-destructive transition-colors flex items-center"
              onClick={handleClearWishlist}
            >
              <TrashIcon size={16} className="mr-1" />
              Clear All
            </button>
          )}
        </div>

        {wishlistItems.length > 0 && (
          <div className="flex justify-between items-center">
            <div className="flex gap-2">
              <button
                onClick={() => handleFilter(null)}
                className={`px-3 py-1 text-xs rounded-full border ${
                  filterValue === null 
                    ? "bg-foreground text-background border-foreground" 
                    : "bg-background text-foreground border-border"
                }`}
              >
                All
              </button>
              <button
                onClick={() => handleFilter('On Sale')}
                className={`px-3 py-1 text-xs rounded-full border ${
                  filterValue === 'On Sale' 
                    ? "bg-foreground text-background border-foreground" 
                    : "bg-background text-foreground border-border"
                }`}
              >
                On Sale
              </button>
              <button
                onClick={() => handleFilter('In Stock')}
                className={`px-3 py-1 text-xs rounded-full border ${
                  filterValue === 'In Stock' 
                    ? "bg-foreground text-background border-foreground" 
                    : "bg-background text-foreground border-border"
                }`}
              >
                In Stock
              </button>
            </div>
            
            <span className="text-sm text-muted-foreground">
              {filteredItems.length} {filteredItems.length === 1 ? 'item' : 'items'}
            </span>
          </div>
        )}
      </section>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredItems.map((item) => (
          <div key={item.id} className="space-y-3">
            <div 
              className="overflow-hidden rounded-md cursor-pointer relative aspect-[3/4]"
              onClick={() => handleItemClick(item.id)}
            >
              <img 
                src={item.imageUrl}
                alt={item.name}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
              {item.isOnSale && (
                <Badge className="absolute top-2 left-2 bg-destructive">Sale</Badge>
              )}
              {!item.inStock && (
                <div className="absolute inset-0 bg-background/60 flex items-center justify-center">
                  <Badge className="bg-muted-foreground">Out of Stock</Badge>
                </div>
              )}
            </div>
            <div className="space-y-1 px-1">
              <p className="text-xs text-muted-foreground">{item.storeName}</p>
              <h3 className="font-medium text-sm">{item.name}</h3>
              <div className="flex items-center space-x-2">
                <p className="font-medium">{item.price}</p>
                {item.originalPrice && (
                  <p className="text-sm text-muted-foreground line-through">{item.originalPrice}</p>
                )}
              </div>
              
              <div className="flex items-center space-x-2 mt-3">
                <button 
                  className={`flex-1 py-2 text-sm rounded-md btn-hover flex items-center justify-center ${
                    item.inStock 
                      ? "bg-foreground text-background" 
                      : "bg-muted text-muted-foreground cursor-not-allowed"
                  }`}
                  onClick={(e) => item.inStock && handleShopNow(item, e)}
                  disabled={!item.inStock}
                >
                  <ShoppingBag size={16} className="mr-2" />
                  Shop Now
                </button>
                <button 
                  className="py-2 px-3 text-sm border border-border rounded-md hover:bg-destructive/10 hover:text-destructive hover:border-destructive transition-colors"
                  onClick={(e) => handleRemoveFromWishlist(item.id, e)}
                >
                  <TrashIcon size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {wishlistItems.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16">
          <Heart size={64} className="text-muted-foreground/30 mb-4" />
          <p className="text-lg font-medium mb-2">Your wishlist is empty</p>
          <p className="text-muted-foreground text-sm mb-6">Save items you love while browsing</p>
          <button 
            className="px-6 py-2 bg-foreground text-background rounded-md btn-hover"
            onClick={() => navigate('/shop')}
          >
            Discover Products
          </button>
        </div>
      )}
    </div>
  );
};

export default Wishlist;
