import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Shield, AlertTriangle, Heart, FileText } from "lucide-react";
import { HamburgerMenu } from "@/components/HamburgerMenu";

const TermsPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background indian-motifs">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-6 flex items-center justify-between">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/companions')}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Companions
          </Button>
          
          <HamburgerMenu currentPage="terms" />
        </div>
        
        <div className="lotus-divider mb-8">
          <span>📜</span>
        </div>
        
        <div className="text-center mb-8">
          <h1 className="calligraphy-title text-4xl mb-2 text-primary">
            Terms of Service & Privacy Policy
          </h1>
          <p className="nani-description text-lg">
            Your privacy and wellness are our priority
          </p>
        </div>

        <div className="space-y-6">
          {/* Terms of Service */}
          <Card className="shadow-warm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" />
                Terms of Service
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold text-lg mb-2 text-primary">1. Acceptance of Terms</h3>
                <p className="text-muted-foreground">
                  By using NaniCure, you agree to these terms. NaniCure provides traditional home remedies and wellness guidance for informational purposes only.
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold text-lg mb-2 text-primary">2. Medical Disclaimer</h3>
                <p className="text-muted-foreground">
                  NaniCure is not a substitute for professional medical advice, diagnosis, or treatment. Always consult qualified healthcare professionals for medical concerns.
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold text-lg mb-2 text-primary">3. Use of Remedies</h3>
                <p className="text-muted-foreground">
                  Traditional remedies are shared for educational purposes. Users are responsible for their own health decisions. Discontinue any remedy if adverse reactions occur.
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold text-lg mb-2 text-primary">4. User Responsibilities</h3>
                <ul className="text-muted-foreground space-y-1 ml-4">
                  <li>• Use remedies at your own discretion and risk</li>
                  <li>• Seek emergency medical help for serious conditions</li>
                  <li>• Verify ingredient allergies before use</li>
                  <li>• Do not share personal medical information publicly</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Privacy Policy */}
          <Card className="shadow-warm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary" />
                Privacy Policy
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold text-lg mb-2 text-primary">Data Collection</h3>
                <p className="text-muted-foreground">
                  We collect minimal information: your name, region preference, and starred remedies. This data is stored locally on your device and is not transmitted to external servers without your consent.
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold text-lg mb-2 text-primary">Data Usage</h3>
                <ul className="text-muted-foreground space-y-1 ml-4">
                  <li>• Personalizing remedy recommendations based on your region</li>
                  <li>• Remembering your starred remedies and preferences</li>
                  <li>• Improving voice recognition and response accuracy</li>
                  <li>• Providing relevant wellness content</li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold text-lg mb-2 text-primary">Data Security</h3>
                <p className="text-muted-foreground">
                  Your data is stored locally using browser localStorage. We implement industry-standard security measures to protect your information from unauthorized access.
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold text-lg mb-2 text-primary">Third-Party Services</h3>
                <p className="text-muted-foreground">
                  NaniCure may use browser-based speech recognition and synthesis APIs. These services have their own privacy policies that govern data handling.
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold text-lg mb-2 text-primary">Your Rights</h3>
                <ul className="text-muted-foreground space-y-1 ml-4">
                  <li>• Access and review your stored data anytime</li>
                  <li>• Export your profile and starred remedies</li>
                  <li>• Delete all your data using the "Forget Me" option</li>
                  <li>• Opt-out of voice features at any time</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Important Disclaimers */}
          <Card className="gradient-warm border-orange-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-orange-800">
                <AlertTriangle className="h-5 w-5" />
                Important Health & Safety Notices
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-800 font-medium">🚨 Emergency Situations</p>
                <p className="text-red-700 text-sm">
                  For medical emergencies, call 108 (National Ambulance) or 102 (Free Ambulance) immediately. Do not rely on home remedies for serious conditions.
                </p>
              </div>
              
              <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
                <p className="text-amber-800 font-medium">⚠️ Allergy & Medication Warnings</p>
                <p className="text-amber-700 text-sm">
                  Always check for allergies to ingredients. Consult healthcare providers before combining remedies with prescription medications.
                </p>
              </div>
              
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-blue-800 font-medium">👶 Special Populations</p>
                <p className="text-blue-700 text-sm">
                  Pregnant women, nursing mothers, children, and elderly individuals should consult healthcare professionals before using any remedies.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Contact & Updates */}
          <Card className="gradient-sage">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-primary">
                <Heart className="h-5 w-5" />
                Contact & Updates
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <p className="text-primary">
                  <strong>Contact Us:</strong> support@nanicure.com for questions, concerns, or feedback about these terms and your privacy.
                </p>
                <p className="text-primary">
                  <strong>Updates:</strong> We may update these terms periodically. Continued use constitutes acceptance of updated terms.
                </p>
                <p className="text-primary">
                  <strong>Effective Date:</strong> These terms are effective as of the date of your first use of NaniCure.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Footer */}
        <div className="text-center mt-12 py-8 border-t border-primary/20">
          <p className="text-muted-foreground text-sm">
            Made with 💛 for your wellness journey. Remember, Nani's wisdom complements, never replaces, professional medical care.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TermsPage;