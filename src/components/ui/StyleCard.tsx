
import React, { useState } from 'react';
import { Heart } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StyleCardProps {
  imageUrl: string;
  likes?: number;
  username?: string;
  userAvatar?: string;
  liked?: boolean;
  caption?: string;
  className?: string;
  aspectRatio?: 'portrait' | 'square';
  onClick?: () => void;
}

const StyleCard: React.FC<StyleCardProps> = ({
  imageUrl,
  likes = 0,
  username,
  userAvatar,
  liked = false,
  caption,
  className,
  aspectRatio = 'portrait',
  onClick,
}) => {
  const [isLiked, setIsLiked] = useState(liked);
  const [likeCount, setLikeCount] = useState(likes);
  const [isLoading, setIsLoading] = useState(true);

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsLiked(!isLiked);
    setLikeCount(prev => isLiked ? prev - 1 : prev + 1);
  };

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  return (
    <div 
      className={cn(
        "group relative overflow-hidden rounded-md bg-muted transition-all duration-300",
        aspectRatio === 'portrait' ? 'aspect-portrait' : 'aspect-square',
        className
      )}
      onClick={onClick}
    >
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-muted animate-pulse">
          <div className="w-8 h-8 rounded-full border-2 border-muted-foreground/30 border-t-foreground/80 animate-spin" />
        </div>
      )}
      
      <img 
        src={imageUrl} 
        alt={caption || "Fashion item"} 
        className={cn(
          "w-full h-full object-cover transition-transform duration-700",
          !isLoading && "group-hover:scale-[1.03]",
          isLoading && "opacity-0"
        )}
        onLoad={handleImageLoad}
      />
      
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      {username && userAvatar && (
        <div className="absolute top-3 left-3 flex items-center space-x-2 z-10">
          <img 
            src={userAvatar} 
            alt={username} 
            className="w-7 h-7 rounded-full border border-white/50 object-cover"
          />
          <span className="text-xs font-medium text-white drop-shadow-md">{username}</span>
        </div>
      )}
      
      <button 
        onClick={handleLike}
        className="absolute top-3 right-3 z-10 p-1.5 rounded-full glass flex items-center justify-center btn-hover"
        aria-label={isLiked ? "Unlike" : "Like"}
      >
        <Heart 
          size={16} 
          className={cn(
            "transition-all duration-300 ease-out",
            isLiked ? "fill-red-500 text-red-500" : "text-white"
          )} 
        />
      </button>
      
      {caption && (
        <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/70 to-transparent">
          <p className="text-sm text-white">{caption}</p>
          {likeCount > 0 && (
            <div className="flex items-center mt-1 space-x-1">
              <Heart size={12} className="text-white" />
              <span className="text-xs text-white">{likeCount}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default StyleCard;
