
import React from 'react';
import ProfileHeader from '@/components/ui/ProfileHeader';
import StyleCard from '@/components/ui/StyleCard';

// Sample data - in a real app, this would come from an API
const SAMPLE_USER = {
  username: 'sophie_style',
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80',
  followers: 254,
  following: 187,
  bio: 'Fashion enthusiast | Minimalist style | Based in NYC'
};

const SAMPLE_USER_POSTS = [
  {
    id: 'up1',
    imageUrl: 'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?auto=format&fit=crop&q=80',
    likes: 65,
    caption: 'Minimal style for everyday'
  },
  {
    id: 'up2',
    imageUrl: 'https://images.unsplash.com/photo-1550614000-4895a10e1bfd?auto=format&fit=crop&q=80',
    likes: 82,
    caption: 'Neutral tones always work'
  },
  {
    id: 'up3',
    imageUrl: 'https://images.unsplash.com/photo-1581044777550-4cfa60707c03?auto=format&fit=crop&q=80',
    likes: 47,
    caption: 'Weekend casual outfit'
  },
  {
    id: 'up4',
    imageUrl: 'https://images.unsplash.com/photo-1554412933-514a83d2f3c8?auto=format&fit=crop&q=80',
    likes: 94,
    caption: 'Spring layers'
  }
];

const Profile: React.FC = () => {
  const handlePostClick = (postId: string) => {
    console.log(`Post clicked: ${postId}`);
  };
  
  return (
    <div className="space-y-10 pb-8">
      <ProfileHeader 
        avatarUrl={SAMPLE_USER.avatarUrl}
        username={SAMPLE_USER.username}
        followers={SAMPLE_USER.followers}
        following={SAMPLE_USER.following}
        bio={SAMPLE_USER.bio}
      />
      
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-medium">Your Style Posts</h2>
          <button className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Manage Posts
          </button>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {SAMPLE_USER_POSTS.map((post) => (
            <StyleCard 
              key={post.id}
              imageUrl={post.imageUrl}
              likes={post.likes}
              caption={post.caption}
              onClick={() => handlePostClick(post.id)}
            />
          ))}
        </div>
      </div>
      
      <div className="space-y-4">
        <h2 className="text-xl font-medium text-center">Manage Your Account</h2>
        
        <div className="space-y-3 max-w-sm mx-auto">
          <button className="w-full py-2 text-sm border border-foreground rounded-md btn-hover">
            Edit Profile
          </button>
          <button className="w-full py-2 text-sm border border-foreground rounded-md btn-hover">
            Style Preferences
          </button>
          <button className="w-full py-2 text-sm border border-foreground rounded-md btn-hover">
            Notification Settings
          </button>
          <button className="w-full py-2 text-sm border border-border text-muted-foreground rounded-md btn-hover">
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
