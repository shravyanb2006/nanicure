import { useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { WidgetGrid } from "@/components/WidgetGrid";
import { SideMenu } from "@/components/SideMenu";
import { useState } from "react";
import { profileManager } from "@/utils/profileManager";
import { Sparkles, Heart } from "lucide-react";

const DashboardPage = () => {
  const [sideOpen, setSideOpen] = useState(false);
  const profile = useMemo(() => profileManager.getProfile(), []);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <Header
        onMenuClick={() => setSideOpen(true)}
        selectedRegion={profile?.region || ""}
        onRegionChange={(region) => profileManager.updateProfile({ region })}
        onLoginClick={() => navigate("/")}
        isLoggedIn={true}
        userName={profile?.name || "Friend"}
      />

      {/* Dashboard Hero Section */}
      <section className="gradient-hero py-16 px-4 indian-motifs">
        <div className="container mx-auto text-center max-w-4xl">
          <div className="mb-6">
            <h2 className="text-lg font-medium text-primary mb-2 flex items-center justify-center gap-2">
              <Sparkles className="h-5 w-5" />
              Welcome Back, {profile?.name || "Friend"}
              <Sparkles className="h-5 w-5" />
            </h2>
            
            <h1 className="calligraphy-title text-4xl md:text-6xl text-primary mb-4">
              Your Wellness <span className="text-secondary">Dashboard</span>
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Choose your wellness companion below. Each one is ready to help you with their special expertise.
            </p>
          </div>
          
          <div className="flex flex-col items-center space-y-4">
            <p className="text-lg text-primary font-medium">
              How can Nani help you today? 💛
            </p>
          </div>
        </div>
      </section>

      <WidgetGrid
        onStarMessage={() => {}}
        userRegion={profile?.region || ""}
        onShowBookmarks={() => navigate("/starred")}
      />

      <SideMenu isOpen={sideOpen} onClose={() => setSideOpen(false)} />

      {/* Footer */}
      <footer className="bg-card border-t py-8">
        <div className="container mx-auto px-4 text-center">
          <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground mb-4">
            <Link to="/about" className="hover:text-primary">About</Link>
            <Link to="/feedback" className="hover:text-primary">Feedback</Link>
            <Link to="/privacy-policy" className="hover:text-primary">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-primary">Terms of Use</Link>
          </div>
          
          <div className="bg-muted border border-border rounded-lg p-4 mb-4 max-w-4xl mx-auto">
            <p className="text-xs text-muted-foreground font-medium">
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
