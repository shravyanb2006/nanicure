import { useState, useMemo } from "react";
import { Header } from "@/components/Header";
import { WidgetGrid } from "@/components/WidgetGrid";
import { SideMenu } from "@/components/SideMenu";
import { StarredBookmarks } from "@/components/StarredBookmarks";
import { profileManager } from "@/utils/profileManager";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const DashboardPage = () => {
  const [sideOpen, setSideOpen] = useState(false);
  const [starredMessages, setStarredMessages] = useState<any[]>([]);
  const [showBookmarks, setShowBookmarks] = useState(false);
  const profile = useMemo(() => profileManager.getProfile(), []);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleStarMessage = (message: any) => {
    const starredMessage = {
      ...message,
      id: message.id || Date.now().toString(),
      timestamp: message.timestamp || new Date(),
    };
    setStarredMessages(prev => [...prev, starredMessage]);
    toast({
      title: "Message saved!",
      description: "Added to your Starred collection",
    });
  };

  const handleSignOut = () => {
    // Delete profile completely
    profileManager.deleteProfile();
    setStarredMessages([]);
    setSideOpen(false);
    
    toast({
      title: "Signed out successfully", 
      description: "Take care, Nani will be here when you need her! 💛",
    });
    
    // Navigate back to home
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-background indian-motifs">
      <Header
        onMenuClick={() => setSideOpen(true)}
        selectedRegion={profile?.region || ""}
        onRegionChange={(region) => profileManager.updateProfile({ region })}
        onLoginClick={handleSignOut}
        isLoggedIn={true}
        userName={profile?.name || "Friend"}
      />

      {/* Hero Section for Dashboard */}
      <section className="gradient-hero py-16 px-4 text-center">
        <div className="container mx-auto max-w-4xl">
          <h1 className="calligraphy-title text-5xl md:text-6xl text-primary mb-4">
            Welcome back, {profile?.name || "Friend"}! 💛
          </h1>
          <p className="nani-description text-xl md:text-2xl mb-6">
            Your caring companions are ready to help you feel better naturally
          </p>
          <div className="lotus-divider">
            <span>🪷</span>
          </div>
        </div>
      </section>

      {showBookmarks ? (
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
              onRemoveStarred={(id) => setStarredMessages(prev => prev.filter(msg => msg.id !== id))}
            />
          </div>
        </section>
      ) : (
        <WidgetGrid
          onStarMessage={handleStarMessage}
          userRegion={profile?.region || ""}
          onShowBookmarks={() => setShowBookmarks(true)}
        />
      )}

      <SideMenu isOpen={sideOpen} onClose={() => setSideOpen(false)} />
      
      {/* Footer */}
      <footer className="bg-card border-t py-8">
        <div className="container mx-auto px-4 text-center">
          <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground mb-4">
            <button onClick={() => navigate('/about')} className="hover:text-primary">About</button>
            <button onClick={() => navigate('/feedback')} className="hover:text-primary">Feedback</button>
            <button onClick={() => navigate('/privacy-policy')} className="hover:text-primary">Privacy Policy</button>
            <button onClick={() => navigate('/terms')} className="hover:text-primary">Terms of Use</button>
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

export default DashboardPage;
