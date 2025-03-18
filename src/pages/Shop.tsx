
import React from 'react';
import { Store, ShoppingBag } from 'lucide-react';

// Sample data - in a real app, this would come from an API
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

const TRENDING_ITEMS = [
  {
    id: 'p1',
    name: 'Minimalist Tee',
    price: '$35',
    imageUrl: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80',
  },
  {
    id: 'p2',
    name: 'Classic Denim',
    price: '$89',
    imageUrl: 'https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&q=80',
  },
  {
    id: 'p3',
    name: 'Everyday Sneakers',
    price: '$65',
    imageUrl: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&q=80',
  },
  {
    id: 'p4',
    name: 'Structured Blazer',
    price: '$120',
    imageUrl: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&q=80',
  }
];

const Shop: React.FC = () => {
  const handleStoreClick = (storeId: string) => {
    console.log(`Store clicked: ${storeId}`);
  };
  
  const handleProductClick = (productId: string) => {
    console.log(`Product clicked: ${productId}`);
  };
  
  return (
    <div className="space-y-10 pb-8">
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold">Shop</h1>
          <button className="flex items-center space-x-2 text-sm bg-foreground text-background px-4 py-2 rounded-md btn-hover">
            <ShoppingBag size={16} />
            <span>Cart (0)</span>
          </button>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {TRENDING_ITEMS.map((product) => (
            <div 
              key={product.id}
              className="group cursor-pointer"
              onClick={() => handleProductClick(product.id)}
            >
              <div className="overflow-hidden rounded-md mb-3 aspect-[3/4]">
                <img 
                  src={product.imageUrl} 
                  alt={product.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <h3 className="font-medium">{product.name}</h3>
              <div className="flex justify-between items-center mt-1">
                <p className="text-sm">{product.price}</p>
                <button className="text-xs px-3 py-1 border border-foreground rounded-full btn-hover">
                  Add to Cart
                </button>
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
              <div className="absolute inset-0 bg-black/30 flex items-end">
                <div className="w-full p-4">
                  <div className="flex items-center space-x-2">
                    <Store size={16} className="text-white" />
                    <h3 className="text-white font-medium">{store.name}</h3>
                  </div>
                  <p className="text-xs text-white/80 mt-1">Featured Store</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Shop;
