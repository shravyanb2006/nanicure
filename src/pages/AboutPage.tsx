import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Heart, Sparkles, Users, Shield } from "lucide-react";
import { Header } from "@/components/Header";

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header
        onMenuClick={() => {}}
        selectedRegion=""
        onRegionChange={() => {}}
        onLoginClick={() => {}}
        isLoggedIn={true}
        userName=""
      />
      
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-6">
          <Link to="/">
            <Button variant="ghost">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
          </Link>
        </div>
        
        <div className="text-center mb-12">
          <h1 className="calligraphy-title text-5xl md:text-6xl text-primary mb-4">
            About Nani<span className="text-secondary">Cure</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Where ancient wisdom meets modern care
          </p>
        </div>

        <div className="grid gap-8 mb-8">
          {/* Our Story */}
          <Card className="gradient-warm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl">
                <Heart className="h-6 w-6 text-primary" />
                Our Story
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground leading-relaxed">
                NaniCure was born from a simple truth: the best remedies often come from our grandmothers' 
                kitchens and their generations of wisdom. In a world moving faster than ever, we're losing 
                touch with time-tested natural solutions that have healed families for centuries.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Our platform combines the warmth of traditional Indian home remedies with the convenience 
                of modern technology. Every remedy, every piece of advice, every gentle word is crafted 
                to feel like it's coming from your own loving Nani.
              </p>
            </CardContent>
          </Card>

          {/* Our Mission */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl">
                <Sparkles className="h-6 w-6 text-primary" />
                Our Mission
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground leading-relaxed">
                To bridge the gap between traditional healing wisdom and modern healthcare needs. 
                We believe in empowering people with natural, gentle remedies while ensuring they 
                know when professional medical care is necessary.
              </p>
              <div className="bg-muted border border-border rounded-lg p-4">
                <p className="text-sm text-muted-foreground">
                  <strong>Important:</strong> NaniCure provides traditional remedy suggestions for informational 
                  purposes only. We always encourage consulting healthcare professionals for serious conditions.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Our Values */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl">
                <Shield className="h-6 w-6 text-primary" />
                Our Values
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-primary mb-2">Safety First</h3>
                  <p className="text-sm text-muted-foreground">
                    Every remedy includes safety guidelines and clear instructions on when to seek medical help.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-primary mb-2">Cultural Respect</h3>
                  <p className="text-sm text-muted-foreground">
                    We honor the regional diversity of Indian traditional medicine and healing practices.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-primary mb-2">Accessibility</h3>
                  <p className="text-sm text-muted-foreground">
                    Healing wisdom should be available to everyone, regardless of their technical expertise.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-primary mb-2">Warmth & Care</h3>
                  <p className="text-sm text-muted-foreground">
                    Every interaction is designed to provide comfort and emotional support alongside practical advice.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* The NaniCure Experience */}
          <Card className="gradient-warm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl">
                <Users className="h-6 w-6 text-primary" />
                The NaniCure Experience
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground leading-relaxed">
                When you interact with NaniCure, you're not just getting information—you're experiencing care. 
                Our AI is trained to respond with the same patience, wisdom, and gentle concern that your 
                grandmother would show.
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-white/50 p-4 rounded-lg">
                  <h4 className="font-medium text-primary mb-2">🌿 Natural Remedies</h4>
                  <p className="text-sm text-muted-foreground">
                    Kitchen ingredients transformed into healing solutions
                  </p>
                </div>
                <div className="bg-white/50 p-4 rounded-lg">
                  <h4 className="font-medium text-primary mb-2">🗣️ Voice Interaction</h4>
                  <p className="text-sm text-muted-foreground">
                    Hear Nani's caring voice guide you through remedies
                  </p>
                </div>
                <div className="bg-white/50 p-4 rounded-lg">
                  <h4 className="font-medium text-primary mb-2">👩‍⚕️ Doctor Connect</h4>
                  <p className="text-sm text-muted-foreground">
                    Professional medical support when you need it
                  </p>
                </div>
                <div className="bg-white/50 p-4 rounded-lg">
                  <h4 className="font-medium text-primary mb-2">💛 Wellness Support</h4>
                  <p className="text-sm text-muted-foreground">
                    Mental and physical wellness for modern life
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Contact Info */}
        <div className="text-center bg-gradient-warm rounded-xl p-6">
          <h3 className="text-lg font-semibold text-primary mb-2">Get in Touch</h3>
          <p className="text-muted-foreground mb-4">
            We'd love to hear from you! Share your feedback or ask questions.
          </p>
          <Link to="/feedback">
            <Button className="btn-nani">
              Share Feedback
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;