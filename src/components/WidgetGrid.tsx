import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageCircle, Mic, Heart, Stethoscope } from "lucide-react";
import { getDailyTip } from "@/utils/dailyTips";

interface WidgetGridProps {
  onStarMessage: (message: any) => void;
  userRegion: string;
  onShowBookmarks: () => void;
}

export function WidgetGrid({ onStarMessage, userRegion, onShowBookmarks }: WidgetGridProps) {
  return (
    <section className="py-16 px-4">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-primary mb-4 font-serif">
            Your Wellness Companions
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Four caring assistants, each with their own specialty, ready to help you feel better naturally
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 max-w-4xl mx-auto">
          {/* Nani ke Nuske */}
          <Link to="/nani-ke-nuske" className="block">
            <Card className="widget-card hover:shadow-lg transition-all duration-300 cursor-pointer">
              <CardHeader className="text-center pb-4">
                <CardTitle className="flex items-center justify-center gap-2 text-2xl mb-2">
                  <MessageCircle className="h-6 w-6 text-primary" />
                  <span className="nani-tagline">Nani ke Nuske</span>
                </CardTitle>
                <p className="text-primary font-medium">Your pocket nani, ready with a nuskha for every problem</p>
              </CardHeader>
              <CardContent>
                <p className="nani-description text-center">
                  Start a conversation and receive grandmother-approved cures for everyday ailments.
                </p>
              </CardContent>
            </Card>
          </Link>

          {/* Nani ki Vani */}
          <Link to="/nani-ki-vani" className="block">
            <Card className="widget-card hover:shadow-lg transition-all duration-300 cursor-pointer">
              <CardHeader className="text-center pb-4">
                <CardTitle className="flex items-center justify-center gap-2 text-2xl mb-2">
                  <Mic className="h-6 w-6 text-primary" />
                  <span className="nani-tagline">Nani ki Vani</span>
                </CardTitle>
                <p className="text-primary font-medium">Because sometimes, healing begins with a gentle voice</p>
              </CardHeader>
              <CardContent>
                <p className="nani-description text-center">
                  Press the mic, speak your issue, and listen as Nani shares remedies in her caring voice.
                </p>
              </CardContent>
            </Card>
          </Link>

          {/* Nani Wellness */}
          <Link to="/nani-wellness" className="block">
            <Card className="widget-card hover:shadow-lg transition-all duration-300 cursor-pointer">
              <CardHeader className="text-center pb-4">
                <CardTitle className="flex items-center justify-center gap-2 text-2xl mb-2">
                  <Heart className="h-6 w-6 text-primary" />
                  <span className="nani-tagline">Nani Wellness</span>
                </CardTitle>
                <p className="text-primary font-medium">Mental & physical wellness for modern life</p>
              </CardHeader>
              <CardContent>
                <p className="nani-description text-center">
                  Covers stress, anxiety, depression, low confidence, anger, loneliness, stamina, sleep issues, posture, obesity, fat loss, breathing exercises, and women's health.
                </p>
              </CardContent>
            </Card>
          </Link>

          {/* Doctor Connect */}
          <Link to="/doctor-connect" className="block">
            <Card className="widget-card hover:shadow-lg transition-all duration-300 cursor-pointer">
              <CardHeader className="text-center pb-4">
                <CardTitle className="flex items-center justify-center gap-2 text-2xl mb-2">
                  <Stethoscope className="h-6 w-6 text-primary" />
                  <span className="nani-tagline">Doctor Connect</span>
                </CardTitle>
                <p className="text-primary font-medium">Professional medical care when you need it</p>
              </CardHeader>
              <CardContent>
                <p className="nani-description text-center">
                  Suggests 5 doctors based on problem and region. Shows name, specialty, contact number, email, region with empathetic, professional recommendations.
                </p>
              </CardContent>
            </Card>
          </Link>
        </div>

        <div className="lotus-divider">
          <span>🪷</span>
        </div>

        {/* Bookmarks Access Button */}
        <div className="text-center mb-8">
          <button
            onClick={onShowBookmarks}
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium transition-colors duration-200"
          >
            <span className="text-2xl">⭐</span>
            View Your Starred Remedies
          </button>
        </div>

        {/* Footer wellness tip with dynamic content */}
        <div className="bg-gradient-warm rounded-xl p-6 text-center indian-motifs">
          <p className="text-primary font-medium mb-2">
            Daily Wellness Tip 🌿
          </p>
          <p className="text-muted-foreground text-sm">
            {getDailyTip()} - Nani
          </p>
        </div>
      </div>
    </section>
  );
}