
import React, { useState } from 'react';
import { toast } from '@/components/ui/use-toast';
import ProfileHeader from '@/components/ui/ProfileHeader';
import StyleCard from '@/components/ui/StyleCard';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

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
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  
  const handlePostClick = (postId: string) => {
    console.log(`Post clicked: ${postId}`);
    toast({
      title: "Post details",
      description: `You selected post ${postId}`,
    });
  };
  
  const handleEditProfile = () => {
    setIsEditing(true);
    toast({
      title: "Edit Profile",
      description: "Profile editing mode activated",
    });
  };
  
  const handleStylePreferences = () => {
    toast({
      title: "Style Preferences",
      description: "Opening style preferences...",
    });
  };
  
  const handleNotificationSettings = () => {
    toast({
      title: "Notifications",
      description: "Opening notification settings...",
    });
  };
  
  const handleSignOut = () => {
    toast({
      title: "Signing out",
      description: "You have been signed out",
    });
    // In a real app, this would handle the sign out process
    setTimeout(() => navigate('/'), 1500);
  };
  
  const handleManagePosts = () => {
    toast({
      title: "Manage Posts",
      description: "Opening post management...",
    });
  };
  
  return (
    <div className="space-y-10 pb-8">
      <ProfileHeader 
        avatarUrl={SAMPLE_USER.avatarUrl}
        username={SAMPLE_USER.username}
        followers={SAMPLE_USER.followers}
        following={SAMPLE_USER.following}
        bio={SAMPLE_USER.bio}
        onEditClick={handleEditProfile}
      />
      
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-medium">Your Style Posts</h2>
          <button 
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            onClick={handleManagePosts}
          >
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
          <button 
            className="w-full py-2 text-sm border border-foreground rounded-md btn-hover"
            onClick={handleEditProfile}
          >
            Edit Profile
          </button>
          <button 
            className="w-full py-2 text-sm border border-foreground rounded-md btn-hover"
            onClick={handleStylePreferences}
          >
            Style Preferences
          </button>
          <button 
            className="w-full py-2 text-sm border border-foreground rounded-md btn-hover"
            onClick={handleNotificationSettings}
          >
            Notification Settings
          </button>
          <button 
            className="w-full py-2 text-sm border border-border text-muted-foreground rounded-md btn-hover"
            onClick={handleSignOut}
          >
            Sign Out
          </button>
        </div>
      </div>
      
      {isEditing && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-card w-full max-w-md rounded-lg border shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Edit Profile</h2>
            
            <div className="flex justify-center mb-6">
              <Avatar className="h-24 w-24">
                <AvatarImage src={SAMPLE_USER.avatarUrl} alt={SAMPLE_USER.username} />
                <AvatarFallback>{SAMPLE_USER.username.substring(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>
            </div>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Username</label>
                <input 
                  type="text" 
                  className="w-full px-3 py-2 border rounded-md"
                  defaultValue={SAMPLE_USER.username}
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Bio</label>
                <textarea 
                  className="w-full px-3 py-2 border rounded-md min-h-[100px]"
                  defaultValue={SAMPLE_USER.bio}
                />
              </div>
            </div>
            
            <div className="flex justify-end space-x-3 mt-6">
              <Button variant="outline" onClick={() => setIsEditing(false)}>Cancel</Button>
              <Button onClick={() => {
                setIsEditing(false);
                toast({
                  title: "Profile updated",
                  description: "Your profile has been successfully updated",
                });
              }}>Save Changes</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
