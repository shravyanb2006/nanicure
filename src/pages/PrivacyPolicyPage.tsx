import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Shield, Eye, Lock, UserCheck } from "lucide-react";
import { Header } from "@/components/Header";

const PrivacyPolicyPage = () => {
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
        
        <div className="text-center mb-8">
          <h1 className="nani-tagline text-4xl mb-2">
            Privacy Policy & Terms of Use
          </h1>
          <p className="nani-description">
            Your privacy and trust matter deeply to us
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            Last updated: December 2024
          </p>
        </div>

        <div className="grid gap-6">
          {/* Privacy Policy */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl">
                <Shield className="h-6 w-6 text-primary" />
                Privacy Policy
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="font-semibold text-primary mb-2 flex items-center gap-2">
                  <Eye className="h-4 w-4" />
                  Information We Collect
                </h3>
                <div className="space-y-3 text-sm text-muted-foreground">
                  <p>
                    <strong>Personal Information:</strong> When you use NaniCure, we may collect your name, 
                    region selection, and any health symptoms you share with our AI assistant.
                  </p>
                  <p>
                    <strong>Usage Data:</strong> We collect information about how you interact with our platform, 
                    including which remedies you view, voice interactions, and starred content.
                  </p>
                  <p>
                    <strong>Device Information:</strong> Basic device and browser information to ensure 
                    optimal performance and security.
                  </p>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-primary mb-2 flex items-center gap-2">
                  <Lock className="h-4 w-4" />
                  How We Use Your Information
                </h3>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p>• <strong>Provide Personalized Care:</strong> Tailor remedy suggestions to your region and needs</p>
                  <p>• <strong>Improve Our Service:</strong> Enhance our AI responses and remedy database</p>
                  <p>• <strong>Safety & Security:</strong> Protect against misuse and ensure platform security</p>
                  <p>• <strong>Communication:</strong> Send important updates about our service (with your consent)</p>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-primary mb-2">Data Storage & Security</h3>
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <p className="text-sm text-green-800">
                    <strong>Local Storage First:</strong> Most of your data (preferences, starred remedies, profile) 
                    is stored locally on your device. You have full control over this data.
                  </p>
                </div>
                <div className="mt-3 space-y-2 text-sm text-muted-foreground">
                  <p>• All data transmission is encrypted using industry-standard SSL/TLS</p>
                  <p>• We implement strict access controls and regular security audits</p>
                  <p>• Health-related conversations are processed with extra privacy safeguards</p>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-primary mb-2">Your Rights</h3>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p>• <strong>Access:</strong> Request a copy of your personal data</p>
                  <p>• <strong>Correction:</strong> Update or correct your information</p>
                  <p>• <strong>Deletion:</strong> Request removal of your data (right to be forgotten)</p>
                  <p>• <strong>Data Portability:</strong> Export your data in a common format</p>
                  <p>• <strong>Opt-out:</strong> Unsubscribe from communications at any time</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Terms of Use */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl">
                <UserCheck className="h-6 w-6 text-primary" />
                Terms of Use
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="font-semibold text-primary mb-2">Medical Disclaimer</h3>
                <div className="bg-muted border border-border rounded-lg p-4">
                  <p className="text-sm text-muted-foreground">
                    <strong>Important:</strong> NaniCure provides traditional remedy suggestions for informational 
                    and educational purposes only. Our content is not a substitute for professional medical advice, 
                    diagnosis, or treatment. Always consult qualified healthcare providers for medical concerns.
                  </p>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-primary mb-2">Acceptable Use</h3>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p>By using NaniCure, you agree to:</p>
                  <p>• Use the service for personal, non-commercial purposes</p>
                  <p>• Provide accurate information when interacting with our AI</p>
                  <p>• Not attempt to misuse, hack, or disrupt our platform</p>
                  <p>• Respect the intellectual property rights of NaniCure and third parties</p>
                  <p>• Not share harmful, illegal, or inappropriate content</p>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-primary mb-2">Limitation of Liability</h3>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p>
                    NaniCure is provided "as is" without warranties. We do not guarantee the accuracy, 
                    completeness, or effectiveness of any remedy suggestions. Users assume full responsibility 
                    for their health decisions.
                  </p>
                  <p>
                    We are not liable for any direct, indirect, incidental, or consequential damages 
                    arising from your use of our service.
                  </p>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-primary mb-2">Changes to Terms</h3>
                <p className="text-sm text-muted-foreground">
                  We may update these terms occasionally. Significant changes will be communicated through 
                  our platform. Continued use constitutes acceptance of updated terms.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card className="gradient-warm">
            <CardHeader>
              <CardTitle>Questions or Concerns?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                If you have any questions about this Privacy Policy or Terms of Use, please don't hesitate to contact us:
              </p>
              <div className="bg-white/50 p-4 rounded-lg">
                <p className="font-medium text-primary">Email: support@nanicure.com</p>
                <p className="text-sm text-muted-foreground mt-1">
                  We're here to help and will respond within 24-48 hours.
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