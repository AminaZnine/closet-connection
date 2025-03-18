
import React from 'react';
import StyleCard from '@/components/ui/StyleCard';

// Sample data - in a real app, this would come from an API
const SAMPLE_WISHLIST = [
  {
    id: 'w1',
    imageUrl: 'https://images.unsplash.com/photo-1617952236317-115faa55b33d?auto=format&fit=crop&q=80',
    storeUrl: 'https://example.com/store1',
    storeName: 'Minimal Studio',
    name: 'Oversized Cotton Sweater',
    price: '$49.99'
  },
  {
    id: 'w2',
    imageUrl: 'https://images.unsplash.com/photo-1578932750294-f5075e85f44a?auto=format&fit=crop&q=80',
    storeUrl: 'https://example.com/store2',
    storeName: 'Urban Threads',
    name: 'High-Waisted Jeans',
    price: '$65.00'
  },
  {
    id: 'w3',
    imageUrl: 'https://images.unsplash.com/photo-1595341888016-a392ef81b7de?auto=format&fit=crop&q=80',
    storeUrl: 'https://example.com/store3',
    storeName: 'Style Maven',
    name: 'Canvas Tote Bag',
    price: '$29.99'
  },
  {
    id: 'w4',
    imageUrl: 'https://images.unsplash.com/photo-1611390103895-2a4e66a8bd41?auto=format&fit=crop&q=80',
    storeUrl: 'https://example.com/store4',
    storeName: 'Fashion Forward',
    name: 'Leather Ankle Boots',
    price: '$89.95'
  }
];

const Wishlist: React.FC = () => {
  const handleItemClick = (itemId: string) => {
    console.log(`Item clicked: ${itemId}`);
  };
  
  return (
    <div className="space-y-8 pb-8">
      <section className="space-y-4">
        <h1 className="text-2xl font-semibold">Your Wishlist</h1>
        <p className="text-muted-foreground text-sm">Save items you love and want to purchase later</p>
      </section>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {SAMPLE_WISHLIST.map((item) => (
          <div key={item.id} className="space-y-3">
            <StyleCard 
              imageUrl={item.imageUrl}
              onClick={() => handleItemClick(item.id)}
            />
            <div className="space-y-1 px-1">
              <p className="text-xs text-muted-foreground">{item.storeName}</p>
              <h3 className="font-medium text-sm">{item.name}</h3>
              <p className="font-medium">{item.price}</p>
              
              <div className="flex items-center space-x-2 mt-3">
                <button className="flex-1 py-2 text-sm bg-foreground text-background rounded-md btn-hover">
                  Shop Now
                </button>
                <button className="py-2 px-3 text-sm border border-border rounded-md btn-hover">
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {SAMPLE_WISHLIST.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16">
          <p className="text-lg font-medium mb-2">Your wishlist is empty</p>
          <p className="text-muted-foreground text-sm mb-6">Save items you love while browsing</p>
          <button className="px-6 py-2 bg-foreground text-background rounded-md btn-hover">
            Discover Products
          </button>
        </div>
      )}
    </div>
  );
};

export default Wishlist;
