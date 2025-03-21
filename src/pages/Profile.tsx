
import React, { useState, useRef } from 'react';
import { toast } from '@/components/ui/use-toast';
import ProfileHeader from '@/components/ui/ProfileHeader';
import StyleCard from '@/components/ui/StyleCard';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Camera, Settings, BookMarked, Heart, ShoppingBag, LogOut, Upload, UserPen, ImagePlus, LogIn, User } from 'lucide-react';
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
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useAuth } from '@/contexts/AuthContext';

const profileFormSchema = z.object({
  username: z.string().min(3, { message: "Username must be at least 3 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  bio: z.string().optional(),
  avatarUrl: z.string().optional(),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

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
  const { user, isAuthenticated, logout } = useAuth();
  
  if (!isAuthenticated) {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
        <div className="mb-8">
          <Avatar className="h-24 w-24 mx-auto mb-6">
            <AvatarFallback>
              <User size={48} />
            </AvatarFallback>
          </Avatar>
          <h1 className="text-2xl font-bold mb-2">Sign in to your account</h1>
          <p className="text-muted-foreground max-w-sm mx-auto">
            Log in to access your profile, save your favorite styles, and track your wardrobe
          </p>
        </div>
        
        <div className="flex flex-col w-full max-w-xs gap-3">
          <Button onClick={() => navigate('/login')} className="w-full">
            <LogIn className="mr-2 h-4 w-4" />
            Log in
          </Button>
          <Button variant="outline" onClick={() => navigate('/signup')} className="w-full">
            Sign up
          </Button>
        </div>
      </div>
    );
  }
  
  const handlePostClick = (postId: string) => {
    console.log(`Post clicked: ${postId}`);
  };
  
  const handleEditProfile = () => {
    setIsEditing(true);
  };
  
  const handleStylePreferences = () => {
    console.log("Opening style preferences");
  };
  
  const handleNotificationSettings = () => {
    console.log("Opening notification settings");
  };
  
  const handleSignOut = () => {
    logout();
  };
  
  const handleManagePosts = () => {
    console.log("Opening post management");
  };

  const handleSaveProfile = (data: ProfileFormValues) => {
    toast({
      title: "Profile updated",
      description: "Your profile has been successfully updated",
    });
    setIsEditing(false);
  };

  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };
  
  return (
    <div className="space-y-10 pb-8">
      <ProfileHeader 
        avatarUrl={user?.avatarUrl || ''}
        username={user?.username || ''}
        followers={254}
        following={187}
        bio={user?.bio || ''}
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
        <Dialog open={isEditing} onOpenChange={setIsEditing}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="text-xl font-semibold">Edit Profile</DialogTitle>
            </DialogHeader>
            <ProfileEditModal 
              user={user} 
              onClose={() => setIsEditing(false)} 
              onSave={handleSaveProfile} 
            />
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

interface ProfileEditModalProps {
  user: {
    username: string;
    bio?: string;
    email: string;
    avatarUrl: string;
  };
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
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const handleAvatarUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (!file.type.match('image.*')) {
        toast({
          title: "Invalid file type",
          description: "Please upload an image file"
        });
        return;
      }
      
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Maximum file size is 5MB"
        });
        return;
      }
      
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setAvatarPreview(result);
        form.setValue('avatarUrl', result);
      };
      reader.readAsDataURL(file);
    }
  };
  
  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };
  
  const onSubmit = (data: ProfileFormValues) => {
    onSave(data);
  };
  
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="flex justify-center mb-5">
          <div className="relative group">
            <Avatar className="h-32 w-32 border-2 border-primary cursor-pointer">
              <AvatarImage src={avatarPreview} alt={form.getValues().username} className="object-cover" />
              <AvatarFallback>{form.getValues().username.substring(0, 2).toUpperCase()}</AvatarFallback>
              <div 
                className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={triggerFileInput}
              >
                <ImagePlus className="text-white h-10 w-10" />
              </div>
            </Avatar>
            <input 
              type="file"
              ref={fileInputRef}
              className="hidden"
              accept="image/*"
              onChange={handleAvatarUpload}
            />
          </div>
        </div>
        <div className="text-center -mt-4 mb-6">
          <Button 
            type="button"
            variant="outline"
            size="sm"
            onClick={triggerFileInput}
            className="rounded-full px-4"
          >
            <Upload size={14} className="mr-2" />
            Upload Photo
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
        
        <div className="flex justify-end space-x-3 pt-4 mt-6">
          <Button variant="outline" onClick={onClose} type="button">Cancel</Button>
          <Button type="submit">Save Changes</Button>
        </div>
      </form>
    </Form>
  );
};

export default Profile;
