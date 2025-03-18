import React, { useState } from 'react';
import { toast } from '@/components/ui/use-toast';
import ProfileHeader from '@/components/ui/ProfileHeader';
import StyleCard from '@/components/ui/StyleCard';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Camera, Settings, BookMarked, Heart, ShoppingBag, LogOut, Upload, UserPen } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Card } from '@/components/ui/card';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

// Define the profile form schema
const profileFormSchema = z.object({
  username: z.string().min(3, { message: "Username must be at least 3 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  bio: z.string().optional(),
  avatarUrl: z.string().url({ message: "Please enter a valid URL" }).optional(),
});

// Define the ProfileFormValues type
type ProfileFormValues = z.infer<typeof profileFormSchema>;

// Sample data - in a real app, this would come from an API
const SAMPLE_USER = {
  username: 'sophie_style',
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80',
  followers: 254,
  following: 187,
  bio: 'Fashion enthusiast | Minimalist style | Based in NYC',
  email: 'sophie@example.com'
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

const SAMPLE_SAVED_POSTS = [
  {
    id: 'sp1',
    imageUrl: 'https://images.unsplash.com/photo-1509631179647-0177331693e8?auto=format&fit=crop&q=80',
    likes: 112,
    username: 'minimal_fashion',
    caption: 'Timeless outfit inspiration'
  },
  {
    id: 'sp2',
    imageUrl: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80',
    likes: 78,
    username: 'street_style',
    caption: 'Urban style lookbook'
  }
];

const SAMPLE_WISHLIST_ITEMS = [
  {
    id: 'wl1',
    imageUrl: 'https://images.unsplash.com/photo-1578932750294-f5075e85f44a?auto=format&fit=crop&q=80',
    store: 'Urban Threads',
    name: 'High-Waisted Jeans',
    price: '$65.00'
  },
  {
    id: 'wl2',
    imageUrl: 'https://images.unsplash.com/photo-1595341888016-a392ef81b7de?auto=format&fit=crop&q=80',
    store: 'Style Maven',
    name: 'Canvas Tote Bag',
    price: '$29.99'
  }
];

const Profile: React.FC = () => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('posts');
  const [userData, setUserData] = useState(SAMPLE_USER);
  
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

  const handleSaveProfile = (data: ProfileFormValues) => {
    setUserData({
      ...userData,
      username: data.username,
      bio: data.bio || '',
      email: data.email,
      avatarUrl: data.avatarUrl || userData.avatarUrl
    });
    setIsEditing(false);
    toast({
      title: "Profile updated",
      description: "Your profile has been successfully updated",
    });
  };

  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };
  
  return (
    <div className="space-y-10 pb-8">
      <ProfileHeader 
        avatarUrl={userData.avatarUrl}
        username={userData.username}
        followers={userData.followers}
        following={userData.following}
        bio={userData.bio}
        onEditClick={handleEditProfile}
      />
      
      <Tabs defaultValue="posts" value={activeTab} onValueChange={handleTabChange} className="w-full">
        <TabsList className="grid grid-cols-3 mb-6">
          <TabsTrigger value="posts" className="data-[state=active]:bg-foreground data-[state=active]:text-background">
            Posts
          </TabsTrigger>
          <TabsTrigger value="saved" className="data-[state=active]:bg-foreground data-[state=active]:text-background">
            Saved
          </TabsTrigger>
          <TabsTrigger value="wishlist" className="data-[state=active]:bg-foreground data-[state=active]:text-background">
            Wishlist
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="posts" className="space-y-6">
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
          
          <div className="flex justify-center">
            <Button 
              className="bg-foreground text-background hover:bg-foreground/80"
              onClick={() => navigate('/create')}
            >
              <Camera className="mr-2 h-4 w-4" />
              Create New Post
            </Button>
          </div>
        </TabsContent>
        
        <TabsContent value="saved" className="space-y-6">
          <h2 className="text-xl font-medium">Saved Inspirations</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {SAMPLE_SAVED_POSTS.map((post) => (
              <StyleCard 
                key={post.id}
                imageUrl={post.imageUrl}
                likes={post.likes}
                username={post.username}
                caption={post.caption}
                onClick={() => handlePostClick(post.id)}
              />
            ))}
            
            {SAMPLE_SAVED_POSTS.length === 0 && (
              <div className="col-span-full text-center py-10">
                <BookMarked className="mx-auto h-10 w-10 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">No saved posts yet</h3>
                <p className="text-muted-foreground mb-4">Save posts you like for inspiration</p>
                <Button onClick={() => navigate('/')}>Discover Posts</Button>
              </div>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="wishlist" className="space-y-6">
          <h2 className="text-xl font-medium">Your Wishlist</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {SAMPLE_WISHLIST_ITEMS.map((item) => (
              <div key={item.id} className="space-y-3">
                <div 
                  className="overflow-hidden rounded-md cursor-pointer aspect-[3/4]"
                  onClick={() => navigate('/shop')}
                >
                  <img 
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="space-y-1 px-1">
                  <p className="text-xs text-muted-foreground">{item.store}</p>
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
            
            {SAMPLE_WISHLIST_ITEMS.length === 0 && (
              <div className="col-span-full text-center py-10">
                <Heart className="mx-auto h-10 w-10 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">Your wishlist is empty</h3>
                <p className="text-muted-foreground mb-4">Save items while shopping</p>
                <Button onClick={() => navigate('/shop')}>Discover Products</Button>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
      
      <div className="space-y-4">
        <h2 className="text-xl font-medium text-center">Manage Your Account</h2>
        
        <div className="space-y-3 max-w-sm mx-auto">
          <button 
            className="w-full py-2 text-sm flex items-center justify-center space-x-2 border border-foreground rounded-md btn-hover"
            onClick={handleEditProfile}
          >
            <UserPen size={16} />
            <span>Edit Profile</span>
          </button>
          <button 
            className="w-full py-2 text-sm flex items-center justify-center space-x-2 border border-foreground rounded-md btn-hover"
            onClick={handleStylePreferences}
          >
            <Heart size={16} />
            <span>Style Preferences</span>
          </button>
          <button 
            className="w-full py-2 text-sm flex items-center justify-center space-x-2 border border-foreground rounded-md btn-hover"
            onClick={handleNotificationSettings}
          >
            <ShoppingBag size={16} />
            <span>Shopping History</span>
          </button>
          <button 
            className="w-full py-2 text-sm flex items-center justify-center space-x-2 border border-border text-muted-foreground rounded-md btn-hover"
            onClick={handleSignOut}
          >
            <LogOut size={16} />
            <span>Sign Out</span>
          </button>
        </div>
      </div>
      
      {isEditing && (
        <ProfileEditModal 
          user={userData} 
          onClose={() => setIsEditing(false)} 
          onSave={handleSaveProfile} 
        />
      )}
    </div>
  );
};

interface ProfileEditModalProps {
  user: typeof SAMPLE_USER;
  onClose: () => void;
  onSave: (formData: ProfileFormValues) => void;
}

const ProfileEditModal: React.FC<ProfileEditModalProps> = ({ user, onClose, onSave }) => {
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      username: user.username,
      bio: user.bio,
      email: user.email,
      avatarUrl: user.avatarUrl
    }
  });
  
  const [avatarPreview, setAvatarPreview] = useState(user.avatarUrl);
  
  const handleAvatarChange = () => {
    const mockAvatars = [
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80'
    ];
    
    const randomAvatar = mockAvatars[Math.floor(Math.random() * mockAvatars.length)];
    setAvatarPreview(randomAvatar);
    form.setValue('avatarUrl', randomAvatar);
    
    toast({
      title: "Avatar Updated",
      description: "Profile picture has been changed successfully"
    });
  };
  
  const onSubmit = (data: ProfileFormValues) => {
    onSave(data);
  };
  
  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md rounded-lg border shadow-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Edit Profile</h2>
          <Button variant="ghost" size="sm" onClick={onClose}>✕</Button>
        </div>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="flex justify-center mb-6 relative">
              <Avatar className="h-24 w-24">
                <AvatarImage src={avatarPreview} alt={form.getValues().username} />
                <AvatarFallback>{form.getValues().username.substring(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>
              <Button 
                type="button"
                variant="outline"
                size="sm"
                className="absolute -bottom-2 left-1/2 -translate-x-1/2 rounded-full h-8 flex items-center space-x-1"
                onClick={handleAvatarChange}
              >
                <Upload size={12} />
                <span>Change</span>
              </Button>
            </div>
            
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Your username" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Your email" type="email" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="bio"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bio</FormLabel>
                    <FormControl>
                      <Textarea 
                        {...field} 
                        placeholder="Tell us about yourself"
                        className="resize-none min-h-[100px]"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <div className="flex justify-end space-x-3 pt-4">
              <Button variant="outline" onClick={onClose} type="button">Cancel</Button>
              <Button type="submit">Save Changes</Button>
            </div>
          </form>
        </Form>
      </Card>
    </div>
  );
};

export default Profile;
