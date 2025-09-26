import { NaniKeNuskeWidget } from "./widgets/NaniKeNuskeWidget";
import { NaniKiVaniWidget } from "./widgets/NaniKiVaniWidget";
import { NaniWellnessWidget } from "./widgets/NaniWellnessWidget";
import { NaniFitnessWidget } from "./widgets/NaniFitnessWidget";
import { DoctorConnectWidget } from "./DoctorConnectWidget";

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

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
          {/* Main Chat Widget - Full width on mobile, spans 2 cols on xl */}
          <div className="xl:col-span-2">
            <NaniKeNuskeWidget onStarMessage={onStarMessage} />
          </div>

          {/* Voice Widget */}
          <div>
            <NaniKiVaniWidget />
          </div>

          {/* Wellness Widget */}
          <div>
            <NaniWellnessWidget />
          </div>

          {/* Fitness Widget */}
          <div>
            <NaniFitnessWidget />
          </div>

          {/* Doctor Connect Widget */}
          <div>
            <DoctorConnectWidget userRegion={userRegion} />
          </div>
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