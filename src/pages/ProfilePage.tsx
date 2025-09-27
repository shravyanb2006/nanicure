import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, User, Download, Trash2, Save } from "lucide-react";
import { Header } from "@/components/Header";
import { HamburgerMenu } from "@/components/HamburgerMenu";
import { useToast } from "@/hooks/use-toast";

interface UserProfile {
  name: string;
  region: string;
  voicePreferences: {
    rate: number;
    pitch: number;
    volume: number;
  };
  starredCount: number;
  createdAt: string;
}

const ProfilePage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [profile, setProfile] = useState<UserProfile>({
    name: '',
    region: '',
    voicePreferences: {
      rate: 1.0,
      pitch: 1.1,
      volume: 1.0
    },
    starredCount: 0,
    createdAt: new Date().toISOString()
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = () => {
    const savedUser = localStorage.getItem('nanicure_user');
    const savedProfile = localStorage.getItem('nanicure_profile');
    const starredMessages = JSON.parse(localStorage.getItem('nanicure_starred') || '[]');
    
    if (savedUser) {
      const userData = JSON.parse(savedUser);
      const profileData = savedProfile ? JSON.parse(savedProfile) : {};
      
      setProfile({
        name: userData.name || '',
        region: userData.region || '',
        voicePreferences: profileData.voicePreferences || {
          rate: 1.0,
          pitch: 1.1,
          volume: 1.0
        },
        starredCount: starredMessages.length,
        createdAt: profileData.createdAt || new Date().toISOString()
      });
    }
  };

  const saveProfile = () => {
    const userData = { name: profile.name, region: profile.region };
    const profileData = {
      voicePreferences: profile.voicePreferences,
      createdAt: profile.createdAt
    };
    
    localStorage.setItem('nanicure_user', JSON.stringify(userData));
    localStorage.setItem('nanicure_profile', JSON.stringify(profileData));
    
    setIsEditing(false);
    toast({
      title: "Profile updated!",
      description: "Your preferences have been saved successfully",
    });
  };

  const exportProfile = () => {
    const exportData = {
      profile,
      starredMessages: JSON.parse(localStorage.getItem('nanicure_starred') || '[]'),
      exportDate: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `nanicure-profile-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Profile exported",
      description: "Your profile data has been downloaded",
    });
  };

  const clearAllData = () => {
    if (window.confirm("Are you sure you want to delete all your data? This action cannot be undone.")) {
      localStorage.removeItem('nanicure_user');
      localStorage.removeItem('nanicure_profile');
      localStorage.removeItem('nanicure_starred');
      localStorage.removeItem('nanicure_sessions');
      
      toast({
        title: "Data cleared",
        description: "All your NaniCure data has been deleted",
      });
      
      navigate('/');
    }
  };

  const testVoice = () => {
    const text = "Namaste beta! This is how Nani will speak with your current voice settings.";
    
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      const voices = window.speechSynthesis.getVoices();
      
      // Try to find an Indian English voice
      const preferredVoice = voices.find(voice => 
        voice.lang.includes('en-IN') || 
        voice.name.toLowerCase().includes('indian')
      ) || voices.find(voice => voice.lang.includes('en'));
      
      if (preferredVoice) {
        utterance.voice = preferredVoice;
      }
      
      utterance.rate = profile.voicePreferences.rate;
      utterance.pitch = profile.voicePreferences.pitch;
      utterance.volume = profile.voicePreferences.volume;
      
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header
        onMenuClick={() => {}}
        selectedRegion=""
        onRegionChange={() => {}}
        onLoginClick={() => {}}
        isLoggedIn={true}
        userName={profile.name}
      />
      
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-6 flex items-center justify-between">
          <Button 
            variant="ghost" 
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          
          <HamburgerMenu currentPage="profile" />
        </div>
        
        <div className="text-center mb-8">
          <h1 className="nani-tagline text-4xl mb-2">
            Your Profile
          </h1>
          <p className="nani-description text-lg">
            Manage your preferences and data
          </p>
        </div>

        <div className="grid gap-6">
          {/* Personal Information */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5 text-primary" />
                Personal Information
              </CardTitle>
              <Button
                variant={isEditing ? "default" : "outline"}
                onClick={isEditing ? saveProfile : () => setIsEditing(true)}
                className="gap-2"
              >
                {isEditing ? <Save className="h-4 w-4" /> : "Edit"}
                {isEditing ? "Save Changes" : ""}
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    value={profile.name}
                    onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                    disabled={!isEditing}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="region">Region</Label>
                  <Select 
                    value={profile.region} 
                    onValueChange={(value) => setProfile({ ...profile, region: value })}
                    disabled={!isEditing}
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select Region" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="north">North India</SelectItem>
                      <SelectItem value="south">South India</SelectItem>
                      <SelectItem value="east">East India</SelectItem>
                      <SelectItem value="west">West India</SelectItem>
                      <SelectItem value="central">Central India</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="text-sm text-muted-foreground bg-muted/50 p-3 rounded">
                <p><strong>Member since:</strong> {new Date(profile.createdAt).toLocaleDateString()}</p>
                <p><strong>Starred remedies:</strong> {profile.starredCount}</p>
              </div>
            </CardContent>
          </Card>

          {/* Voice Preferences */}
          <Card>
            <CardHeader>
              <CardTitle>Nani's Voice Settings</CardTitle>
              <p className="text-sm text-muted-foreground">
                Customize how Nani speaks to you in voice chat
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <Label>Speech Rate</Label>
                    <span className="text-sm text-muted-foreground">{profile.voicePreferences.rate.toFixed(1)}x</span>
                  </div>
                  <Slider
                    value={[profile.voicePreferences.rate]}
                    onValueChange={(values) => setProfile({
                      ...profile,
                      voicePreferences: { ...profile.voicePreferences, rate: values[0] }
                    })}
                    min={0.5}
                    max={2.0}
                    step={0.1}
                    className="w-full"
                  />
                  <p className="text-xs text-muted-foreground mt-1">How fast Nani speaks</p>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <Label>Voice Pitch</Label>
                    <span className="text-sm text-muted-foreground">{profile.voicePreferences.pitch.toFixed(1)}</span>
                  </div>
                  <Slider
                    value={[profile.voicePreferences.pitch]}
                    onValueChange={(values) => setProfile({
                      ...profile,
                      voicePreferences: { ...profile.voicePreferences, pitch: values[0] }
                    })}
                    min={0.5}
                    max={2.0}
                    step={0.1}
                    className="w-full"
                  />
                  <p className="text-xs text-muted-foreground mt-1">How high or low Nani's voice sounds</p>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <Label>Volume</Label>
                    <span className="text-sm text-muted-foreground">{Math.round(profile.voicePreferences.volume * 100)}%</span>
                  </div>
                  <Slider
                    value={[profile.voicePreferences.volume]}
                    onValueChange={(values) => setProfile({
                      ...profile,
                      voicePreferences: { ...profile.voicePreferences, volume: values[0] }
                    })}
                    min={0.1}
                    max={1.0}
                    step={0.1}
                    className="w-full"
                  />
                  <p className="text-xs text-muted-foreground mt-1">How loud Nani speaks</p>
                </div>
              </div>

              <Button onClick={testVoice} variant="outline" className="w-full">
                Test Voice Settings
              </Button>
            </CardContent>
          </Card>

          {/* Data Management */}
          <Card>
            <CardHeader>
              <CardTitle>Data Management</CardTitle>
              <p className="text-sm text-muted-foreground">
                Export or delete your personal data
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-3">
                <Button onClick={exportProfile} variant="outline" className="gap-2">
                  <Download className="h-4 w-4" />
                  Export My Data
                </Button>
                <Button onClick={clearAllData} variant="destructive" className="gap-2">
                  <Trash2 className="h-4 w-4" />
                  Delete All Data
                </Button>
              </div>
              
              <Separator />
              
              <div className="text-xs text-muted-foreground bg-muted/50 p-3 rounded">
                <p><strong>Privacy Note:</strong> All your data is stored locally on your device. 
                No personal information is sent to our servers. You have full control over your data.</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;