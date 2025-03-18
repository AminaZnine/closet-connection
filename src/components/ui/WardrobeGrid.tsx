
import React from 'react';
import { cn } from '@/lib/utils';

interface ClothingItem {
  id: string;
  imageUrl: string;
  category: string;
  name: string;
}

interface WardrobeGridProps {
  items: ClothingItem[];
  title?: string;
  className?: string;
  onItemClick?: (item: ClothingItem) => void;
}

const WardrobeGrid: React.FC<WardrobeGridProps> = ({
  items,
  title,
  className,
  onItemClick,
}) => {
  return (
    <div className={cn("space-y-4", className)}>
      {title && <h2 className="text-xl font-medium">{title}</h2>}
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {items.map((item) => (
          <div 
            key={item.id}
            className="group relative aspect-square overflow-hidden rounded-md bg-muted cursor-pointer"
            onClick={() => onItemClick?.(item)}
          >
            <img 
              src={item.imageUrl} 
              alt={item.name} 
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            />
            
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            <div className="absolute bottom-0 left-0 right-0 p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <p className="text-xs text-white font-medium truncate">{item.name}</p>
              <p className="text-xs text-white/70 truncate">{item.category}</p>
            </div>
          </div>
        ))}
        
        <div className="border border-dashed border-border aspect-square rounded-md flex flex-col items-center justify-center p-4 cursor-pointer hover:bg-muted/50 transition-colors duration-300">
          <div className="w-8 h-8 rounded-full flex items-center justify-center border border-muted-foreground mb-2">
            <span className="text-xl leading-none">+</span>
          </div>
          <p className="text-xs text-center text-muted-foreground">Add new item</p>
        </div>
      </div>
    </div>
  );
};

export default WardrobeGrid;
