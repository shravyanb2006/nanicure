import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { WidgetGrid } from "@/components/WidgetGrid";
import { OnboardingModal } from "@/components/OnboardingModal";
import { StarredBookmarks } from "@/components/StarredBookmarks";
import { SideMenu } from "@/components/SideMenu";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("");
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const [starredMessages, setStarredMessages] = useState<any[]>([]);
  const [showBookmarks, setShowBookmarks] = useState(false);
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
    // After onboarding, go to Dashboard
    navigate('/dashboard');
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

      {isLoggedIn && !showBookmarks && (
        <WidgetGrid
          onStarMessage={handleStarMessage}
          userRegion={selectedRegion}
          onShowBookmarks={() => setShowBookmarks(true)}
        />
      )}

      {isLoggedIn && showBookmarks && (
        <section className="py-8 px-4">
          <div className="container mx-auto max-w-4xl">
            <div className="mb-6">
              <button
                onClick={() => setShowBookmarks(false)}
                className="text-sm text-muted-foreground hover:text-primary mb-4"
              >
                ← Back to Dashboard
              </button>
            </div>
            <StarredBookmarks
              starredMessages={starredMessages}
              onRemoveStarred={handleRemoveStarred}
            />
          </div>
        </section>
      )}

      <SideMenu
        isOpen={showSidebar}
        onClose={() => setShowSidebar(false)}
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