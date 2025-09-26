import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageCircle, Mic, Heart, Stethoscope } from "lucide-react";

interface WidgetGridProps {
  onStarMessage: (message: any) => void;
  userRegion: string;
}

export function WidgetGrid({ onStarMessage, userRegion }: WidgetGridProps) {
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Nani ke Nuske */}
          <Link to="/nani-ke-nuske" className="block">
            <Card className="widget-card hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageCircle className="h-5 w-5 text-primary" />
                  Nani ke Nuske
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Your pocket nani, ready with a nuskha for every problem. Start a conversation and receive grandmother-approved cures for everyday ailments.
                </p>
              </CardContent>
            </Card>
          </Link>

          {/* Nani ki Vani */}
          <Link to="/nani-ki-vani" className="block">
            <Card className="widget-card hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mic className="h-5 w-5 text-primary" />
                  Nani ki Vani
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Because sometimes, healing begins with a gentle voice. Press the mic, speak your issue, and listen as Nani shares remedies in her caring voice.
                </p>
              </CardContent>
            </Card>
          </Link>

          {/* Nani Wellness */}
          <Link to="/nani-wellness" className="block">
            <Card className="widget-card hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="h-5 w-5 text-primary" />
                  Nani Wellness
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Covers stress, anxiety, depression, low confidence, anger, loneliness, stamina, sleep issues, posture, obesity, fat loss, breathing exercises, and women's health.
                </p>
              </CardContent>
            </Card>
          </Link>

          {/* Doctor Connect */}
          <Link to="/doctor-connect" className="block">
            <Card className="widget-card hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Stethoscope className="h-5 w-5 text-primary" />
                  Doctor Connect
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Suggests 5 doctors based on problem and region. Shows name, specialty, contact number, email, region with empathetic, professional recommendations.
                </p>
              </CardContent>
            </Card>
          </Link>
        </div>

        {/* Footer wellness tip */}
        <div className="bg-gradient-warm rounded-xl p-6 text-center">
          <p className="text-primary font-medium mb-2">
            Daily Wellness Tip 🌿
          </p>
          <p className="text-muted-foreground text-sm">
            "Start your day with gratitude and warm water with lemon. Small habits create big changes, beta!" - Nani
          </p>
        </div>
      </div>
    </section>
  );
}