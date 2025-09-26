import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, FileText, AlertTriangle, Shield, Heart } from "lucide-react";
import { Header } from "@/components/Header";

const TermsPage = () => {
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
              Terms of Use
            </h1>
            <p className="text-lg text-muted-foreground">
              Clear guidelines for using NaniCure safely and responsibly
            </p>
          </div>
        </div>

        <div className="space-y-6">
          {/* Important Disclaimer */}
          <Card className="bg-yellow-50 border-yellow-300">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-yellow-800">
                <AlertTriangle className="h-5 w-5" />
                Medical Disclaimer - Please Read Carefully
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-yellow-100 border border-yellow-400 rounded-lg p-4">
                <p className="text-yellow-900 font-medium text-center mb-2">
                  🚨 IMPORTANT: NaniCure is for informational purposes only
                </p>
                <p className="text-sm text-yellow-800">
                  All remedies, advice, and guidance provided by NaniCure are based on traditional knowledge and are 
                  intended for general wellness support only. <strong>This is NOT medical advice and should never replace 
                  professional healthcare consultation.</strong>
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <h4 className="font-semibold text-yellow-800 mb-2">✅ What NaniCure IS:</h4>
                  <ul className="list-disc list-inside text-yellow-700 space-y-1">
                    <li>Informational wellness guidance</li>
                    <li>Traditional home remedy suggestions</li>
                    <li>General wellness and lifestyle tips</li>
                    <li>Emotional support and care</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold text-yellow-800 mb-2">❌ What NaniCure is NOT:</h4>
                  <ul className="list-disc list-inside text-yellow-700 space-y-1">
                    <li>Medical diagnosis or treatment</li>
                    <li>Replacement for professional healthcare</li>
                    <li>Emergency medical service</li>
                    <li>Licensed medical practice</li>
                  </ul>
                </div>
              </div>
              
              <div className="bg-gradient-warm p-4 rounded-lg text-center">
                <p className="text-primary font-medium">
                  "Beta, Nani is here to guide, not to replace your doctor! Always consult healthcare providers for serious concerns." 💛
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Terms of Service */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" />
                Terms of Service
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold text-primary mb-2">1. Acceptance of Terms</h4>
                <p className="text-sm text-muted-foreground">
                  By using NaniCure, you agree to these Terms of Use and our Privacy Policy. If you don't agree 
                  with any part of these terms, please don't use our services.
                </p>
              </div>
              
              <div>
                <h4 className="font-semibold text-primary mb-2">2. User Responsibilities</h4>
                <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                  <li>Use NaniCure responsibly and only for its intended purpose</li>
                  <li>Provide accurate information when interacting with our AI</li>
                  <li>Do not use the service for any illegal or harmful activities</li>
                  <li>Respect the intellectual property rights of NaniCure</li>
                  <li>Report any bugs or security issues responsibly</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold text-primary mb-2">3. Age Requirements</h4>
                <p className="text-sm text-muted-foreground">
                  NaniCure is intended for users aged 13 and above. Users under 18 should use the service under 
                  parental guidance, especially when following any remedy suggestions.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Usage Guidelines */}
          <Card>
            <CardHeader>
              <CardTitle>Usage Guidelines for AI-Generated Content</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold text-primary mb-2">Remedy Suggestions</h4>
                <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                  <li>All remedies are generated based on traditional knowledge databases</li>
                  <li>Always check for allergies to ingredients before trying any remedy</li>
                  <li>Start with small amounts to test your body's reaction</li>
                  <li>Stop immediately if you experience any adverse reactions</li>
                  <li>Consult a healthcare provider if symptoms persist or worsen</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold text-primary mb-2">When to Seek Professional Help</h4>
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <p className="text-sm text-red-800 font-medium mb-2">
                    🚨 Consult a doctor immediately for:
                  </p>
                  <ul className="list-disc list-inside text-sm text-red-700 space-y-1">
                    <li>Persistent high fever, severe pain, or breathing difficulties</li>
                    <li>Symptoms that worsen despite home remedies</li>
                    <li>Any condition affecting children under 2 years</li>
                    <li>Chest pain, severe headaches, or vision problems</li>
                    <li>Any symptom that concerns you or feels unusual</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Intellectual Property */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary" />
                Intellectual Property Rights
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold text-primary mb-2">NaniCure Content</h4>
                <p className="text-sm text-muted-foreground">
                  All content, features, and functionality of NaniCure, including but not limited to AI responses, 
                  user interface design, graphics, and software, are owned by NaniCure and protected by international 
                  copyright, trademark, and other intellectual property laws.
                </p>
              </div>
              
              <div>
                <h4 className="font-semibold text-primary mb-2">Traditional Knowledge</h4>
                <p className="text-sm text-muted-foreground">
                  The traditional remedies and wellness practices shared through NaniCure are part of cultural heritage 
                  passed down through generations. We respect and acknowledge the traditional communities that have 
                  preserved this knowledge.
                </p>
              </div>
              
              <div>
                <h4 className="font-semibold text-primary mb-2">Your Content</h4>
                <p className="text-sm text-muted-foreground">
                  You retain ownership of any personal information or content you share with NaniCure. However, 
                  by using our service, you grant us permission to use anonymized and aggregated data to improve 
                  our AI responses and services.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Limitation of Liability */}
          <Card>
            <CardHeader>
              <CardTitle>Limitation of Liability</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-gray-50 border rounded-lg p-4">
                <h4 className="font-semibold text-primary mb-2">Service Limitations</h4>
                <p className="text-sm text-muted-foreground mb-2">
                  NaniCure and its developers are not responsible for:
                </p>
                <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                  <li>Any adverse reactions to suggested remedies</li>
                  <li>Misinterpretation or misuse of provided information</li>
                  <li>Delays in seeking professional medical care</li>
                  <li>Accuracy of third-party doctor information</li>
                  <li>Service interruptions or technical issues</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold text-primary mb-2">User Responsibility</h4>
                <p className="text-sm text-muted-foreground">
                  By using NaniCure, you acknowledge that you are responsible for your own health decisions and 
                  that our service is a complementary tool, not a replacement for professional medical judgment.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Contact & Changes */}
          <Card className="bg-gradient-warm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="h-5 w-5 text-primary" />
                Terms Updates & Contact
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold text-primary mb-2">Changes to Terms</h4>
                <p className="text-sm text-muted-foreground">
                  We may update these Terms of Use from time to time. We'll notify users of any significant changes 
                  via email or through the app. Continued use of NaniCure after changes indicates acceptance of the new terms.
                </p>
              </div>
              
              <div className="text-center space-y-2">
                <p className="font-medium text-primary">Questions about these Terms?</p>
                <p className="text-sm text-muted-foreground">
                  Contact us at <strong>legal@nanicure.com</strong> for any questions about these Terms of Use.
                </p>
                <p className="text-sm text-muted-foreground">
                  For general support: <strong>support@nanicure.com</strong>
                </p>
              </div>
              
              <div className="bg-background/50 p-4 rounded-lg text-center">
                <p className="text-primary font-medium">
                  "Remember beta, these terms exist to keep everyone safe. Nani wants the best for all her digital children!" 💛
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default TermsPage;