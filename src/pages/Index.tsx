import { useState } from "react";
import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { WidgetGrid } from "@/components/WidgetGrid";
import { Sidebar } from "@/components/Sidebar";
import { OnboardingModal } from "@/components/OnboardingModal";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("");
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const [starredMessages, setStarredMessages] = useState<any[]>([]);
  const { toast } = useToast();

  const handleLogin = () => {
    setShowOnboarding(true);
  };

  const handleOnboardingComplete = (userData: { name: string; region: string }) => {
    setUserName(userData.name);
    setSelectedRegion(userData.region);
    setIsLoggedIn(true);
    setShowOnboarding(false);
  };

  const handleSignOut = () => {
    setIsLoggedIn(false);
    setUserName("");
    setSelectedRegion("");
    setStarredMessages([]);
    setShowSidebar(false);
    
    toast({
      title: "Signed out successfully",
      description: "Take care beta, Nani will be here when you need her! 💛",
    });
  };

  const handleStarMessage = (message: any) => {
    setStarredMessages(prev => [...prev, message]);
    toast({
      title: "Message saved!",
      description: "Added to your Starred Nuske collection",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header
        onMenuClick={() => setShowSidebar(true)}
        selectedRegion={selectedRegion}
        onRegionChange={setSelectedRegion}
        onLoginClick={handleLogin}
        isLoggedIn={isLoggedIn}
        userName={userName}
      />

      <HeroSection
        onGetStarted={handleLogin}
        isLoggedIn={isLoggedIn}
      />

      {isLoggedIn && (
        <WidgetGrid
          onStarMessage={handleStarMessage}
          userRegion={selectedRegion}
        />
      )}

      <Sidebar
        isOpen={showSidebar}
        onClose={() => setShowSidebar(false)}
        userName={userName}
        starredMessages={starredMessages}
        onSignOut={handleSignOut}
      />

      <OnboardingModal
        isOpen={showOnboarding}
        onComplete={handleOnboardingComplete}
      />

      {/* Footer */}
      <footer className="bg-card border-t py-8">
        <div className="container mx-auto px-4 text-center">
          <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground mb-4">
            <button className="hover:text-primary">About</button>
            <button className="hover:text-primary">Feedback</button>
            <button className="hover:text-primary">Privacy Policy</button>
            <button className="hover:text-primary">Terms of Use</button>
          </div>
          
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4 max-w-4xl mx-auto">
            <p className="text-xs text-yellow-800 font-medium">
              ⚠️ Medical Disclaimer: All remedies and advice provided by NaniCure are for informational 
              purposes only. Always consult a licensed healthcare provider for serious health concerns.
            </p>
          </div>
          
          <p className="text-xs text-muted-foreground">
            © 2024 NaniCure. Made with 💛 for your wellness journey.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;