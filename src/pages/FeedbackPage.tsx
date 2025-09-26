import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Mail, Send } from "lucide-react";
import { Header } from "@/components/Header";
import { useToast } from "@/hooks/use-toast";

const FeedbackPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulate form submission
    toast({
      title: "Feedback sent successfully!",
      description: "Thank you for your feedback, beta! Nani will review it with love 💛",
    });
    
    // Reset form
    setName("");
    setEmail("");
    setMessage("");
  };

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
      
      <div className="container mx-auto px-4 py-8 max-w-2xl">
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
              Feedback
            </h1>
            <p className="text-lg text-muted-foreground">
              We'd love to hear from you, beta! Your thoughts help Nani become better 💛
            </p>
          </div>
        </div>

        <div className="space-y-6">
          {/* Contact Information */}
          <Card className="bg-gradient-warm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="h-5 w-5 text-primary" />
                Get in Touch
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center space-y-4">
                <p className="text-muted-foreground">
                  Have a suggestion, found a bug, or just want to say hello? 
                  Nani is always happy to hear from her digital family!
                </p>
                <div className="bg-background/50 p-4 rounded-lg">
                  <p className="font-medium text-primary">Write to us at:</p>
                  <a 
                    href="mailto:support@nanicure.com" 
                    className="text-lg font-semibold text-primary hover:underline"
                  >
                    support@nanicure.com
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Feedback Form */}
          <Card>
            <CardHeader>
              <CardTitle>Send Your Feedback</CardTitle>
              <p className="text-sm text-muted-foreground">
                Use this form for quick feedback, or email us directly for detailed discussions
              </p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="text-sm font-medium mb-2 block">
                      Name
                    </label>
                    <Input
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Your name"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="text-sm font-medium mb-2 block">
                      Email
                    </label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your.email@example.com"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="message" className="text-sm font-medium mb-2 block">
                    Your Message
                  </label>
                  <Textarea
                    id="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell us what's on your mind..."
                    rows={6}
                    required
                  />
                </div>
                
                <Button type="submit" className="w-full">
                  <Send className="h-4 w-4 mr-2" />
                  Send Feedback
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Feedback Types */}
          <Card>
            <CardHeader>
              <CardTitle>What Kind of Feedback Are You Sharing?</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="space-y-2">
                  <h4 className="font-semibold text-primary">💡 Suggestions</h4>
                  <p className="text-muted-foreground">
                    New features, improvements, or remedies you'd like to see
                  </p>
                </div>
                
                <div className="space-y-2">
                  <h4 className="font-semibold text-primary">🐛 Bug Reports</h4>
                  <p className="text-muted-foreground">
                    Something not working as expected? Let us know!
                  </p>
                </div>
                
                <div className="space-y-2">
                  <h4 className="font-semibold text-primary">❤️ Appreciation</h4>
                  <p className="text-muted-foreground">
                    Share how NaniCure helped you - it makes our day!
                  </p>
                </div>
                
                <div className="space-y-2">
                  <h4 className="font-semibold text-primary">🤝 Partnerships</h4>
                  <p className="text-muted-foreground">
                    Interested in collaborating? We'd love to explore together
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Response Time */}
          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-sm text-blue-800">
                  <strong>Response Time:</strong> We typically respond within 24-48 hours. 
                  For urgent matters, please mention "URGENT" in your subject line.
                </p>
                <p className="text-sm text-blue-600 mt-2">
                  Thank you for helping us make NaniCure better for everyone! 🙏
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default FeedbackPage;