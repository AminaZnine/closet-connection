import React, { useState, useRef } from 'react';
import WardrobeGrid from '@/components/ui/WardrobeGrid';
import { cn } from '@/lib/utils';
import ImageCapture from '@/components/ui/ImageCapture';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

// Sample data - in a real app, this would come from an API
const SAMPLE_WARDROBE_ITEMS = [
  {
    id: 'c1',
    imageUrl: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&q=80',
    category: 'Tops',
    name: 'White T-shirt'
  },
  {
    id: 'c2',
    imageUrl: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&q=80',
    category: 'Tops',
    name: 'Grey Sweater'
  },
  {
    id: 'c3',
    imageUrl: 'https://images.unsplash.com/photo-1584382296087-ac00c7263710?auto=format&fit=crop&q=80',
    category: 'Bottoms',
    name: 'Blue Jeans'
  },
  {
    id: 'c4',
    imageUrl: 'https://images.unsplash.com/photo-1591369822096-ffd140ec948f?auto=format&fit=crop&q=80',
    category: 'Bottoms',
    name: 'Black Pants'
  },
  {
    id: 'c5',
    imageUrl: 'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&q=80',
    category: 'Shoes',
    name: 'White Sneakers'
  },
  {
    id: 'c6',
    imageUrl: 'https://images.unsplash.com/photo-1608666634759-4376010f863d?auto=format&fit=crop&q=80',
    category: 'Accessories',
    name: 'Brown Hat'
  },
  {
    id: 'c7',
    imageUrl: 'https://images.unsplash.com/photo-1618354691792-d1d42acfd860?auto=format&fit=crop&q=80',
    category: 'Tops',
    name: 'Denim Jacket'
  }
];

const SAMPLE_OUTFITS = [
  {
    id: 'o1',
    imageUrl: 'https://images.unsplash.com/photo-1551489186-cf8726f514f8?auto=format&fit=crop&q=80',
    category: 'Outfit',
    name: 'Casual Weekend'
  },
  {
    id: 'o2',
    imageUrl: 'https://images.unsplash.com/photo-1614251055880-ee96e4803393?auto=format&fit=crop&q=80',
    category: 'Outfit',
    name: 'Office Look'
  }
];

const Wardrobe: React.FC = () => {
  const [activeTab, setActiveTab] = useState('items');
  const [userItems, setUserItems] = useState<any[]>(SAMPLE_WARDROBE_ITEMS);
  const [showImageCapture, setShowImageCapture] = useState(false);
  
  const handleItemClick = (item: any) => {
    console.log('Item clicked:', item);
    // In a real app, open item detail modal
  };
  
  const handleImageCapture = (file: File) => {
    console.log('Image captured:', file);
    
    // Create a new wardrobe item with the captured image
    const newItem = {
      id: `user-${Date.now()}`,
      imageUrl: URL.createObjectURL(file),
      category: 'Uncategorized', // Default category
      name: 'New Item' // Default name
    };
    
    // Add to user items
    setUserItems(prev => [newItem, ...prev]);
  };

  const handleAddItemClick = () => {
    setShowImageCapture(true);
  };
  
  return (
    <div className="space-y-8 pb-8">
      <section className="space-y-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold">Your Wardrobe</h1>
          
          <ImageCapture onImageCapture={handleImageCapture} />
        </div>
        
        <div className="flex border-b border-border">
          <button
            className={cn(
              "px-4 py-2 text-sm transition-colors",
              activeTab === 'items' 
                ? "border-b-2 border-foreground font-medium" 
                : "text-muted-foreground"
            )}
            onClick={() => setActiveTab('items')}
          >
            Items
          </button>
          <button
            className={cn(
              "px-4 py-2 text-sm transition-colors",
              activeTab === 'outfits' 
                ? "border-b-2 border-foreground font-medium" 
                : "text-muted-foreground"
            )}
            onClick={() => setActiveTab('outfits')}
          >
            Outfits
          </button>
          <button
            className={cn(
              "px-4 py-2 text-sm transition-colors",
              activeTab === 'categories' 
                ? "border-b-2 border-foreground font-medium" 
                : "text-muted-foreground"
            )}
            onClick={() => setActiveTab('categories')}
          >
            Categories
          </button>
        </div>
      </section>
      
      {activeTab === 'items' && (
        <WardrobeGrid 
          items={userItems}
          onItemClick={handleItemClick}
          onAddItemClick={handleImageCapture}
        />
      )}
      
      {activeTab === 'outfits' && (
        <div className="space-y-6">
          <WardrobeGrid 
            items={SAMPLE_OUTFITS}
            title="Your Outfits"
            onItemClick={handleItemClick}
          />
          
          <div className="flex justify-center mt-8">
            <button className="px-6 py-2 bg-foreground text-background rounded-md btn-hover">
              Create New Outfit
            </button>
          </div>
        </div>
      )}
      
      {activeTab === 'categories' && (
        <div className="space-y-8">
          <WardrobeGrid 
            items={userItems.filter(item => item.category === 'Tops')}
            title="Tops"
            onItemClick={handleItemClick}
          />
          
          <WardrobeGrid 
            items={userItems.filter(item => item.category === 'Bottoms')}
            title="Bottoms"
            onItemClick={handleItemClick}
          />
          
          <WardrobeGrid 
            items={userItems.filter(item => item.category === 'Shoes')}
            title="Shoes"
            onItemClick={handleItemClick}
          />
          
          <WardrobeGrid 
            items={userItems.filter(item => item.category === 'Accessories')}
            title="Accessories"
            onItemClick={handleItemClick}
          />
          
          <WardrobeGrid 
            items={userItems.filter(item => 
              !['Tops', 'Bottoms', 'Shoes', 'Accessories'].includes(item.category)
            )}
            title="Uncategorized"
            onItemClick={handleItemClick}
          />
        </div>
      )}
    </div>
  );
};

export default Wardrobe;
