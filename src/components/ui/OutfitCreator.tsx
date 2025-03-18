
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import ImageCapture from './ImageCapture';

interface ClothingItem {
  id: string;
  imageUrl: string;
  category: string;
  name: string;
}

interface OutfitCreatorProps {
  wardrobeItems: ClothingItem[];
  className?: string;
  onAddItem?: (item: ClothingItem) => void;
}

const OutfitCreator: React.FC<OutfitCreatorProps> = ({
  wardrobeItems,
  className,
  onAddItem,
}) => {
  const [selectedItems, setSelectedItems] = useState<ClothingItem[]>([]);
  const [showImageCapture, setShowImageCapture] = useState(false);
  
  const categories = ['Tops', 'Bottoms', 'Shoes', 'Accessories'];
  
  const handleItemClick = (item: ClothingItem) => {
    // Check if the item is already selected
    if (selectedItems.some(i => i.id === item.id)) {
      setSelectedItems(prev => prev.filter(i => i.id !== item.id));
    } else {
      // Add item to the selected items
      setSelectedItems(prev => [...prev, item]);
    }
  };
  
  const isItemSelected = (id: string) => {
    return selectedItems.some(item => item.id === id);
  };

  const handleImageCapture = (file: File) => {
    // Create a new wardrobe item with the captured image
    const newItem = {
      id: `user-${Date.now()}`,
      imageUrl: URL.createObjectURL(file),
      category: 'Uncategorized', // Default category
      name: 'New Item' // Default name
    };
    
    // Call the onAddItem callback if provided
    if (onAddItem) {
      onAddItem(newItem);
    }

    // Close the image capture dialog
    setShowImageCapture(false);
  };
  
  return (
    <div className={cn("space-y-8", className)}>
      <div className="flex flex-col items-center space-y-6">
        <h2 className="text-xl font-medium">Create Your Outfit</h2>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 w-full max-w-xl mx-auto">
          {selectedItems.map((item) => (
            <div 
              key={item.id}
              className="relative aspect-square overflow-hidden rounded-md bg-muted"
            >
              <img 
                src={item.imageUrl} 
                alt={item.name} 
                className="w-full h-full object-cover"
              />
              
              <button 
                onClick={() => handleItemClick(item)}
                className="absolute top-2 right-2 w-6 h-6 flex items-center justify-center bg-foreground/80 text-background rounded-full text-xs"
              >
                ×
              </button>
              
              <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/50 to-transparent">
                <p className="text-xs text-white font-medium truncate">{item.name}</p>
                <p className="text-xs text-white/70 truncate">{item.category}</p>
              </div>
            </div>
          ))}
          
          {Array.from({ length: Math.max(4 - selectedItems.length, 0) }).map((_, index) => (
            <div 
              key={`empty-${index}`}
              className="aspect-square bg-muted/30 rounded-md border border-dashed border-border flex items-center justify-center"
            >
              <span className="text-muted-foreground text-xs">Empty slot</span>
            </div>
          ))}
        </div>
        
        <button className="px-8 py-2 bg-primary text-primary-foreground rounded-md font-medium text-sm btn-hover">
          Save Outfit
        </button>
      </div>
      
      <div className="space-y-6">
        {categories.map((category) => {
          const itemsInCategory = wardrobeItems.filter(
            item => item.category.toLowerCase() === category.toLowerCase()
          );
          
          if (itemsInCategory.length === 0) return null;
          
          return (
            <div key={category} className="space-y-3">
              <h3 className="text-sm font-medium">{category}</h3>
              
              <div className="flex overflow-x-auto pb-2 space-x-3 hide-scrollbar">
                {itemsInCategory.map((item) => (
                  <div 
                    key={item.id}
                    className={cn(
                      "flex-shrink-0 w-20 h-20 rounded-md overflow-hidden cursor-pointer transition-all duration-300",
                      isItemSelected(item.id) 
                        ? "ring-2 ring-primary" 
                        : "hover:opacity-80"
                    )}
                    onClick={() => handleItemClick(item)}
                  >
                    <img 
                      src={item.imageUrl} 
                      alt={item.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          );
        })}
        
        {/* Add new item button with ImageCapture */}
        <div className="mt-6">
          {showImageCapture ? (
            <ImageCapture 
              onImageCapture={handleImageCapture} 
              onClose={() => setShowImageCapture(false)}
            />
          ) : (
            <div 
              className="border border-dashed border-border aspect-square w-20 h-20 rounded-md flex flex-col items-center justify-center p-2 cursor-pointer hover:bg-muted/50 transition-colors duration-300"
              onClick={() => setShowImageCapture(true)}
            >
              <div className="w-6 h-6 rounded-full flex items-center justify-center border border-muted-foreground mb-1">
                <span className="text-sm leading-none">+</span>
              </div>
              <p className="text-xs text-center text-muted-foreground">Add new item</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OutfitCreator;
