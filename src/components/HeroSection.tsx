import { Button } from "@/components/ui/button";
import { Sparkles, Heart } from "lucide-react";

interface HeroSectionProps {
  onGetStarted: () => void;
  isLoggedIn: boolean;
}

export function HeroSection({ onGetStarted, isLoggedIn }: HeroSectionProps) {
  return (
    <section className="gradient-hero py-16 px-4 indian-motifs">
      <div className="container mx-auto text-center max-w-4xl">
        <div className="mb-6">
          <h2 className="text-lg font-medium text-primary mb-2 flex items-center justify-center gap-2">
            <Sparkles className="h-5 w-5" />
            Wellness Wrapped in Warmth
            <Sparkles className="h-5 w-5" />
          </h2>
          
          <h1 className="calligraphy-title text-6xl md:text-8xl text-primary mb-4">
            Nani<span className="text-secondary">Cure</span>
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Ancient traditions powered by AI, giving you remedies you can trust with comfort you'll feel. 
            Your virtual grandmother is here with healing wisdom, just a conversation away.
          </p>
        </div>

        {!isLoggedIn && (
          <div className="flex justify-center gap-4">
            <Button 
              onClick={onGetStarted}
              size="lg"
              className="btn-nani text-lg px-8 py-4 shadow-glow hover:shadow-warm transition-all"
            >
              <Heart className="mr-2 h-5 w-5 fill-current" />
              Start Your Journey with Nani
            </Button>
          </div>
        )}
        
        {isLoggedIn && (
          <div className="flex flex-col items-center space-y-4">
            <p className="text-lg text-primary font-medium">
              Welcome back! How can Nani help you today? 💛
            </p>
          </div>
        )}
      </div>
    </section>
  );
}