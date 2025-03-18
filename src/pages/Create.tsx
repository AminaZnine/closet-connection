
import React from 'react';
import OutfitCreator from '@/components/ui/OutfitCreator';

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

const Create: React.FC = () => {
  return (
    <div className="pb-8">
      <OutfitCreator wardrobeItems={SAMPLE_WARDROBE_ITEMS} />
    </div>
  );
};

export default Create;
