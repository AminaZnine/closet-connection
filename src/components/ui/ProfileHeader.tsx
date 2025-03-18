
import React from 'react';
import { cn } from '@/lib/utils';

interface ProfileHeaderProps {
  avatarUrl: string;
  username: string;
  followers?: number;
  following?: number;
  bio?: string;
  className?: string;
  onEditClick?: () => void;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  avatarUrl,
  username,
  followers = 0,
  following = 0,
  bio,
  className,
  onEditClick,
}) => {
  return (
    <div className={cn("flex flex-col items-center text-center", className)}>
      <div className="relative mb-4">
        <img 
          src={avatarUrl} 
          alt={username} 
          className="w-24 h-24 rounded-full object-cover border border-border"
        />
        <button 
          className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-3 py-0.5 bg-primary text-primary-foreground rounded-full text-xs font-medium cursor-pointer"
          onClick={onEditClick}
        >
          Edit
        </button>
      </div>
      
      <h2 className="text-xl font-semibold mb-2">{username}</h2>
      
      {bio && <p className="text-sm text-muted-foreground max-w-xs mb-4">{bio}</p>}
      
      <div className="flex items-center space-x-8 mb-6">
        <div className="flex flex-col items-center">
          <span className="font-semibold">{followers}</span>
          <span className="text-xs text-muted-foreground">Followers</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="font-semibold">{following}</span>
          <span className="text-xs text-muted-foreground">Following</span>
        </div>
      </div>
      
      <button 
        className="w-full max-w-xs py-2 border border-foreground rounded-md font-medium text-sm btn-hover"
        onClick={onEditClick}
      >
        Edit Profile
      </button>
    </div>
  );
};

export default ProfileHeader;
