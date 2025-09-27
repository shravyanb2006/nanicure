import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Menu, MessageSquare, Mic, Heart, Stethoscope } from "lucide-react";
import { Header } from "@/components/Header";
import { SideMenu } from "@/components/SideMenu";

export function CompanionsPage() {
  const [sideMenuOpen, setSideMenuOpen] = useState(false);
  const navigate = useNavigate();
  
  // Mock header props - companions page doesn't need full header functionality
  const headerProps = {
    onMenuClick: () => setSideMenuOpen(true),
    selectedRegion: '',
    onRegionChange: () => {},
    onLoginClick: () => {},
    isLoggedIn: true,
    userName: 'Friend'
  };

  const companions = [
    {
      id: 'nani-nuske',
      title: 'Nani Ke Nuske',
      tagline: 'Traditional Home Remedies',
      description: 'Chat with Nani for time-tested remedies',
      icon: MessageSquare,
      path: '/nani-nuske',
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50 hover:bg-emerald-100'
    },
    {
      id: 'nani-vani',
      title: 'Nani Ki Vani',
      tagline: 'Voice-Powered Wellness',
      description: 'Speak with Nani through voice interaction',
      icon: Mic,
      path: '/nani-vani',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50 hover:bg-purple-100'
    },
    {
      id: 'nani-wellness',
      title: 'Nani Wellness',
      tagline: 'Holistic Health Guidance',
      description: 'Comprehensive wellness tips and routines',
      icon: Heart,
      path: '/nani-wellness',
      color: 'text-rose-600',
      bgColor: 'bg-rose-50 hover:bg-rose-100'
    },
    {
      id: 'doctor-connect',
      title: 'Doctor Connect',
      tagline: 'Professional Medical Care',
      description: 'Find qualified doctors in your region',
      icon: Stethoscope,
      path: '/doctor-connect',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50 hover:bg-blue-100'
    }
  ];

  const handleCompanionClick = (path: string) => {
    navigate(path);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/20 to-background">
      <Header {...headerProps} />
      <SideMenu isOpen={sideMenuOpen} onClose={() => setSideMenuOpen(false)} />
      
      <main className="container mx-auto px-4 py-8">
        {/* Header with Menu */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Choose Your Companion
            </h1>
            <p className="text-muted-foreground">
              Select a wellness companion to begin your journey with Nani
            </p>
          </div>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => setSideMenuOpen(true)}
            className="lg:hidden"
          >
            <Menu className="h-4 w-4" />
          </Button>
        </div>

        {/* Companions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {companions.map((companion) => {
            const IconComponent = companion.icon;
            
            return (
              <Card 
                key={companion.id}
                className={`cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-105 ${companion.bgColor} border-2 hover:border-primary/20`}
                onClick={() => handleCompanionClick(companion.path)}
              >
                <CardHeader className="text-center pb-4">
                  <div className="flex justify-center mb-4">
                    <div className={`p-4 rounded-full bg-white/80 ${companion.color}`}>
                      <IconComponent className="h-8 w-8" />
                    </div>
                  </div>
                  <CardTitle className="text-xl font-bold text-foreground">
                    {companion.title}
                  </CardTitle>
                  <p className={`text-sm font-medium ${companion.color}`}>
                    {companion.tagline}
                  </p>
                </CardHeader>
                
                <CardContent className="text-center">
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {companion.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Welcome Message */}
        <div className="text-center mt-12">
          <div className="bg-card/50 backdrop-blur-sm rounded-lg p-6 max-w-2xl mx-auto border border-primary/10">
            <h2 className="text-lg font-semibold text-foreground mb-2">
              Welcome to NaniCure 🌿
            </h2>
            <p className="text-muted-foreground text-sm">
              Each companion offers a unique way to connect with traditional wellness wisdom. 
              Choose the one that feels right for you today, and remember - Nani is always here to help!
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}