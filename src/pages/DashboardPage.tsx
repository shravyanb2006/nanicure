import { useState } from "react";
import { Header } from "@/components/Header";
import { WidgetGrid } from "@/components/WidgetGrid";
import { StarredBookmarks } from "@/components/StarredBookmarks";
import { SideMenu } from "@/components/SideMenu";
import { useToast } from "@/hooks/use-toast";

interface DashboardPageProps {
  userName: string;
  selectedRegion: string;
  onSignOut: () => void;
  starredMessages: any[];
  onStarMessage: (message: any) => void;
  onRemoveStarred: (id: string) => void;
}

const DashboardPage = ({ 
  userName, 
  selectedRegion, 
  onSignOut, 
  starredMessages, 
  onStarMessage, 
  onRemoveStarred 
}: DashboardPageProps) => {
  const [showSidebar, setShowSidebar] = useState(false);
  const [showBookmarks, setShowBookmarks] = useState(false);
  const { toast } = useToast();

  return (
    <div className="min-h-screen bg-background">
      <Header
        onMenuClick={() => setShowSidebar(true)}
        selectedRegion={selectedRegion}
        onRegionChange={() => {}} // Read-only on dashboard
        onLoginClick={() => {}} // Not needed on dashboard
        isLoggedIn={true}
        userName={userName}
      />

      {/* Dashboard Header */}
      <section className="py-8 px-4 bg-gradient-to-b from-primary/5 to-transparent">
        <div className="container mx-auto text-center max-w-4xl">
          <h1 className="text-3xl md:text-4xl font-bold text-primary mb-2">
            Welcome back, {userName}! 💛
          </h1>
          <p className="text-lg text-muted-foreground">
            Choose how Nani can help you today
          </p>
        </div>
      </section>

      {!showBookmarks && (
        <WidgetGrid
          onStarMessage={onStarMessage}
          userRegion={selectedRegion}
          onShowBookmarks={() => setShowBookmarks(true)}
        />
      )}

      {showBookmarks && (
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
              onRemoveStarred={onRemoveStarred}
            />
          </div>
        </section>
      )}

      <SideMenu
        isOpen={showSidebar}
        onClose={() => setShowSidebar(false)}
        onSignOut={onSignOut}
      />
    </div>
  );
};

export default DashboardPage;