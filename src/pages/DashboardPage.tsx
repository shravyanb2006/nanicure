import { useMemo } from "react";
import { Header } from "@/components/Header";
import { WidgetGrid } from "@/components/WidgetGrid";
import { SideMenu } from "@/components/SideMenu";
import { useState } from "react";
import { profileManager } from "@/utils/profileManager";
import { useNavigate } from "react-router-dom";

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

      <WidgetGrid
        onStarMessage={() => {}}
        userRegion={profile?.region || ""}
        onShowBookmarks={() => navigate("/starred")}
      />

      <SideMenu isOpen={sideOpen} onClose={() => setSideOpen(false)} />
    </div>
  );
};

export default DashboardPage;
