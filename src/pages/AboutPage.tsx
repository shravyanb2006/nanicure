import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Heart, MessageCircle, Mic, Stethoscope } from "lucide-react";
import { Header } from "@/components/Header";

const AboutPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <Header
        onMenuClick={() => {}}
        selectedRegion=""
        onRegionChange={() => {}}
        onLoginClick={() => {}}
        isLoggedIn={false}
        userName=""
      />
      
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-6">
          <Button 
            variant="ghost" 
            onClick={() => navigate(-1)}
            className="mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-primary mb-4 font-serif">
              About NaniCure
            </h1>
            <p className="text-lg text-muted-foreground">
              Your caring digital grandmother, blending ancient wisdom with modern AI
            </p>
          </div>
        </div>

        <div className="space-y-6">
          {/* Mission & Vision */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl text-primary">Our Mission & Vision</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                NaniCure was born from a simple yet profound idea: every person deserves access to the caring wisdom 
                that only a grandmother can provide. In our fast-paced world, we often lose touch with the traditional 
                remedies and gentle care that have been passed down through generations.
              </p>
              <p className="text-muted-foreground">
                Our mission is to bridge this gap by creating a digital wellness companion that embodies the warmth, 
                knowledge, and unconditional care of an Indian grandmother (Nani), powered by artificial intelligence 
                to make this wisdom accessible to everyone, everywhere, at any time.
              </p>
            </CardContent>
          </Card>

          {/* How It Works */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl text-primary">How NaniCure Blends Tradition with Technology</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                NaniCure combines centuries-old traditional Indian home remedies with modern AI technology to provide 
                personalized, caring wellness guidance. Our AI has been trained on extensive databases of traditional 
                remedies, wellness practices, and grandmotherly wisdom, ensuring every interaction feels authentic and helpful.
              </p>
              <div className="bg-gradient-warm p-4 rounded-lg">
                <p className="text-primary font-medium">
                  "We don't just provide solutions - we provide care, warmth, and the feeling that someone truly understands your needs." 💛
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Features Overview */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl text-primary">Your Wellness Companions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex gap-3">
                  <MessageCircle className="h-6 w-6 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold mb-2">Nani ke Nuske</h3>
                    <p className="text-sm text-muted-foreground">
                      Your pocket nani ready with home remedies for everyday ailments. From common colds to digestive issues, 
                      get grandmother-approved natural solutions with step-by-step guidance.
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <Mic className="h-6 w-6 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold mb-2">Nani ki Vani</h3>
                    <p className="text-sm text-muted-foreground">
                      Sometimes healing begins with a gentle voice. Speak your concerns and listen as Nani shares remedies 
                      in her caring, grandmotherly voice.
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <Heart className="h-6 w-6 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold mb-2">Nani Wellness</h3>
                    <p className="text-sm text-muted-foreground">
                      Holistic wellness support covering mental health, physical fitness, yoga, and lifestyle guidance. 
                      Your companion for stress relief, better sleep, and overall well-being.
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <Stethoscope className="h-6 w-6 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold mb-2">Doctor Connect</h3>
                    <p className="text-sm text-muted-foreground">
                      When home remedies aren't enough, find trusted doctors in your region. Get personalized recommendations 
                      based on your specific health concerns and location.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Benefits */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl text-primary">Why Choose NaniCure?</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h4 className="font-semibold text-primary">🌿 Natural & Safe</h4>
                  <p className="text-sm text-muted-foreground">
                    Traditional remedies using common household ingredients, tested through generations of use.
                  </p>
                </div>
                
                <div className="space-y-2">
                  <h4 className="font-semibold text-primary">💛 Personalized Care</h4>
                  <p className="text-sm text-muted-foreground">
                    Every interaction is tailored to your specific needs, region, and cultural context.
                  </p>
                </div>
                
                <div className="space-y-2">
                  <h4 className="font-semibold text-primary">🏠 Accessible Anywhere</h4>
                  <p className="text-sm text-muted-foreground">
                    Available 24/7 from the comfort of your home, no appointments needed.
                  </p>
                </div>
                
                <div className="space-y-2">
                  <h4 className="font-semibold text-primary">🧠 Holistic Approach</h4>
                  <p className="text-sm text-muted-foreground">
                    Addresses both physical ailments and mental wellness for complete health support.
                  </p>
                </div>
                
                <div className="space-y-2">
                  <h4 className="font-semibold text-primary">🌍 Culturally Aware</h4>
                  <p className="text-sm text-muted-foreground">
                    Understands regional differences and provides location-specific guidance across India.
                  </p>
                </div>
                
                <div className="space-y-2">
                  <h4 className="font-semibold text-primary">⚡ Instant Support</h4>
                  <p className="text-sm text-muted-foreground">
                    Get immediate wellness guidance when you need it most, with the warmth of family care.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Brand Promise */}
          <Card className="bg-gradient-warm">
            <CardContent className="pt-6">
              <div className="text-center space-y-4">
                <h3 className="text-2xl font-bold text-primary">Our Promise to You</h3>
                <p className="text-muted-foreground">
                  NaniCure is more than just a health app - it's your digital family member who truly cares about your well-being. 
                  We combine the irreplaceable warmth of grandmother's love with the precision of modern technology to ensure 
                  you never feel alone in your wellness journey.
                </p>
                <p className="text-primary font-medium text-lg">
                  "Beta, main hamesha tumhare saath hun!" - Your Digital Nani 💛
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;