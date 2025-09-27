import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { OnboardingModal } from "@/components/OnboardingModal";
import DashboardPage from "@/pages/DashboardPage";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("");
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [starredMessages, setStarredMessages] = useState<any[]>([]);
  const { toast } = useToast();
  const navigate = useNavigate();

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
    
    toast({
      title: "Signed out successfully",
      description: "Take care beta, Nani will be here when you need her! 💛",
    });
  };

  const handleStarMessage = (message: any) => {
    const starredMessage = {
      ...message,
      id: message.id || Date.now().toString(),
      timestamp: message.timestamp || new Date(),
    };
    setStarredMessages(prev => [...prev, starredMessage]);
    toast({
      title: "Message saved!",
      description: "Added to your Starred Nuske collection",
    });
  };

  const handleRemoveStarred = (id: string) => {
    setStarredMessages(prev => prev.filter(msg => msg.id !== id));
    toast({
      title: "Removed from starred",
      description: "Message removed from your collection",
    });
  };

  // If logged in, show Dashboard Page
  if (isLoggedIn) {
    return (
      <DashboardPage
        userName={userName}
        selectedRegion={selectedRegion}
        onSignOut={handleSignOut}
        starredMessages={starredMessages}
        onStarMessage={handleStarMessage}
        onRemoveStarred={handleRemoveStarred}
      />
    );
  }

  // If not logged in, show Home Page
  return (
    <div className="min-h-screen bg-background">
      <Header
        onMenuClick={() => {}} // No menu on home page
        selectedRegion={selectedRegion}
        onRegionChange={setSelectedRegion}
        onLoginClick={handleLogin}
        isLoggedIn={false}
        userName=""
      />

      <HeroSection
        onGetStarted={handleLogin}
        isLoggedIn={false}
      />

      <OnboardingModal
        isOpen={showOnboarding}
        onComplete={handleOnboardingComplete}
        onClose={() => setShowOnboarding(false)}
      />

      {/* Footer */}
      <footer className="bg-card border-t py-8">
        <div className="container mx-auto px-4 text-center">
          <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground mb-4">
            <Link to="/about" className="hover:text-primary">About</Link>
            <Link to="/feedback" className="hover:text-primary">Feedback</Link>
            <Link to="/privacy-policy" className="hover:text-primary">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-primary">Terms of Use</Link>
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