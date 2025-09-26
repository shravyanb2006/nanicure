import { useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Heart, Menu } from "lucide-react";

interface HeaderProps {
  onMenuClick: () => void;
  selectedRegion: string;
  onRegionChange: (region: string) => void;
  onLoginClick: () => void;
  isLoggedIn: boolean;
  userName?: string;
}

export function Header({ onMenuClick, selectedRegion, onRegionChange, onLoginClick, isLoggedIn, userName }: HeaderProps) {
  return (
    <header className="bg-card border-b border-border shadow-card">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo and Tagline */}
        <div className="flex items-center space-x-4">
          <button 
            onClick={onMenuClick}
            className="lg:hidden p-2 hover:bg-accent rounded-lg transition-smooth"
          >
            <Menu className="h-5 w-5" />
          </button>
          
          <div className="flex items-center space-x-2">
            <Heart className="h-8 w-8 text-primary fill-current" />
            <div>
              <h1 className="text-2xl font-bold text-primary font-serif">NaniCure</h1>
              <p className="text-sm text-muted-foreground hidden sm:block">Wisdom and Wellness</p>
            </div>
          </div>
        </div>

        {/* Navigation and Actions */}
        <div className="flex items-center space-x-4">
          {/* Login/Profile */}
          {isLoggedIn ? (
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium text-foreground hidden sm:block">
                Namaste, {userName}! 🙏
              </span>
            </div>
          ) : (
            <Button onClick={onLoginClick} className="btn-nani">
              Get Started
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}