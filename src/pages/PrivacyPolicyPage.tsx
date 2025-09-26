import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Shield, Eye, Lock, UserCheck } from "lucide-react";
import { Header } from "@/components/Header";

const PrivacyPolicyPage = () => {
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
              Privacy Policy
            </h1>
            <p className="text-lg text-muted-foreground">
              Your privacy and trust are precious to us, beta 💛
            </p>
          </div>
        </div>

        <div className="space-y-6">
          {/* Introduction */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary" />
                Our Commitment to Your Privacy
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                At NaniCure, we treat your personal information with the same care and protection that a grandmother would give to her family's secrets. This Privacy Policy explains how we collect, use, protect, and handle your personal information when you use our services.
              </p>
              <div className="bg-gradient-warm p-4 rounded-lg">
                <p className="text-primary font-medium">
                  <strong>Last Updated:</strong> December 2024
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Data Collection */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="h-5 w-5 text-primary" />
                What Information We Collect
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div>
                  <h4 className="font-semibold text-primary mb-2">Personal Information</h4>
                  <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                    <li>Name and region/location you provide during registration</li>
                    <li>Email address (if provided for feedback or support)</li>
                    <li>User preferences and settings</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold text-primary mb-2">Interaction Data</h4>
                  <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                    <li>Chat messages and health queries you share with Nani</li>
                    <li>Starred remedies and bookmarked content</li>
                    <li>Voice interactions (processed locally, not stored permanently)</li>
                    <li>Usage patterns and feature preferences</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold text-primary mb-2">Technical Information</h4>
                  <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                    <li>Device information and browser type</li>
                    <li>IP address and general location</li>
                    <li>Usage analytics and performance data</li>
                    <li>Error logs for troubleshooting</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Data Usage */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <UserCheck className="h-5 w-5 text-primary" />
                How We Use Your Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div>
                  <h4 className="font-semibold text-primary mb-2">Personalization & Service Delivery</h4>
                  <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                    <li>Provide personalized health remedies and wellness guidance</li>
                    <li>Remember your preferences and starred remedies</li>
                    <li>Adapt responses based on your region and cultural context</li>
                    <li>Maintain conversation continuity during your session</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold text-primary mb-2">Service Improvement</h4>
                  <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                    <li>Analyze usage patterns to improve AI responses</li>
                    <li>Identify and fix technical issues</li>
                    <li>Develop new features based on user needs</li>
                    <li>Enhance the accuracy of remedy recommendations</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold text-primary mb-2">Communication</h4>
                  <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                    <li>Respond to your support requests and feedback</li>
                    <li>Send important service updates (with your consent)</li>
                    <li>Provide customer support when needed</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Data Protection */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lock className="h-5 w-5 text-primary" />
                How We Protect Your Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h4 className="font-semibold text-green-800 mb-2">Security Measures</h4>
                  <ul className="list-disc list-inside text-sm text-green-700 space-y-1">
                    <li>All data is encrypted both in transit and at rest</li>
                    <li>Regular security audits and updates</li>
                    <li>Access controls and authentication systems</li>
                    <li>Secure cloud infrastructure with industry-standard protection</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold text-primary mb-2">Data Confidentiality</h4>
                  <p className="text-sm text-muted-foreground">
                    We understand that health information is deeply personal. All interactions with Nani are treated with 
                    the highest level of confidentiality. We do not store sensitive medical details beyond what's necessary 
                    for providing immediate guidance, and personal health information is not used for any other purposes.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* User Rights */}
          <Card>
            <CardHeader>
              <CardTitle>Your Rights & Control</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-muted-foreground">You have complete control over your personal information:</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <h4 className="font-semibold text-primary">Access & Review</h4>
                    <p className="text-sm text-muted-foreground">
                      Request a copy of all personal data we have about you
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="font-semibold text-primary">Correction</h4>
                    <p className="text-sm text-muted-foreground">
                      Update or correct any inaccurate personal information
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="font-semibold text-primary">Deletion</h4>
                    <p className="text-sm text-muted-foreground">
                      Request deletion of your personal data and account
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="font-semibold text-primary">Data Portability</h4>
                    <p className="text-sm text-muted-foreground">
                      Export your data in a readable format
                    </p>
                  </div>
                </div>
                
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-sm text-blue-800">
                    To exercise any of these rights, contact us at <strong>privacy@nanicure.com</strong> or through our feedback form.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Data Sharing */}
          <Card>
            <CardHeader>
              <CardTitle>Data Sharing & Third Parties</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <h4 className="font-semibold text-red-800 mb-2">What We DON'T Do</h4>
                  <ul className="list-disc list-inside text-sm text-red-700 space-y-1">
                    <li>Sell your personal information to any third parties</li>
                    <li>Share your health queries for marketing purposes</li>
                    <li>Use your data for advertising or promotional activities</li>
                    <li>Share identifiable personal information with external partners</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold text-primary mb-2">Limited Sharing</h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    We may share anonymized and aggregated data (with no personal identifiers) with:
                  </p>
                  <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                    <li>Research institutions for improving traditional medicine practices</li>
                    <li>Technology partners for service improvement (under strict confidentiality agreements)</li>
                    <li>Legal authorities if required by law or to protect user safety</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact & Updates */}
          <Card className="bg-gradient-warm">
            <CardContent className="pt-6">
              <div className="text-center space-y-4">
                <h3 className="text-xl font-bold text-primary">Questions About Your Privacy?</h3>
                <p className="text-muted-foreground">
                  If you have any questions about this Privacy Policy or how we handle your data, 
                  please don't hesitate to reach out. We're here to ensure you feel completely comfortable 
                  and secure while using NaniCure.
                </p>
                <div className="space-y-2">
                  <p className="font-medium text-primary">Contact our Privacy Team:</p>
                  <p className="text-sm">Email: <strong>privacy@nanicure.com</strong></p>
                  <p className="text-sm">General Support: <strong>support@nanicure.com</strong></p>
                </div>
                <p className="text-sm text-muted-foreground">
                  We will notify you of any significant changes to this Privacy Policy via email or through the app.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;