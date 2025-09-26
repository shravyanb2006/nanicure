import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Heart, AlertTriangle, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface OnboardingModalProps {
  isOpen: boolean;
  onComplete: (userData: { name: string; region: string }) => void;
}

export function OnboardingModal({ isOpen, onComplete }: OnboardingModalProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    region: '',
    agreedToTerms: false,
  });
  const { toast } = useToast();

  const handleNext = () => {
    if (step === 1) {
      if (!formData.name.trim()) {
        toast({
          title: "Name required beta!",
          description: "Please enter your name so Nani can address you properly",
          variant: "destructive",
        });
        return;
      }
      if (!formData.region) {
        toast({
          title: "Region required!",
          description: "Please select your region for personalized remedies",
          variant: "destructive",
        });
        return;
      }
      setStep(2);
    }
  };

  const handleComplete = () => {
    if (!formData.agreedToTerms) {
      toast({
        title: "Agreement required",
        description: "Please agree to the Terms and Conditions to continue",
        variant: "destructive",
      });
      return;
    }

    onComplete({
      name: formData.name,
      region: formData.region,
    });

    toast({
      title: "Welcome to NaniCure! 💛",
      description: "You have logged in successfully! Your caring Nani is ready to help.",
    });
  };

  return (
    <Dialog open={isOpen} modal>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-center">
            <Heart className="h-6 w-6 text-primary fill-current" />
            Welcome to NaniCure
          </DialogTitle>
          <DialogDescription className="text-center">
            Let's get you started with your caring virtual grandmother
          </DialogDescription>
        </DialogHeader>

        {step === 1 && (
          <div className="space-y-6 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">What should Nani call you? *</Label>
              <Input
                id="name"
                placeholder="Enter your name..."
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="bg-background"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="region">Select your region *</Label>
              <Select value={formData.region} onValueChange={(value) => setFormData({ ...formData, region: value })}>
                <SelectTrigger className="bg-background">
                  <SelectValue placeholder="Choose your region" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="north">North India</SelectItem>
                  <SelectItem value="south">South India</SelectItem>
                  <SelectItem value="east">East India</SelectItem>
                  <SelectItem value="west">West India</SelectItem>
                  <SelectItem value="central">Central India</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground">
                This helps Nani provide region-specific remedies and doctor recommendations
              </p>
            </div>

            <Button onClick={handleNext} className="w-full btn-nani">
              Continue to Safety Information
            </Button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6 py-4">
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-yellow-800 mb-2">Important Safety Information</h4>
                  <ul className="text-sm text-yellow-700 space-y-1">
                    <li>• These are traditional home remedies for informational purposes only</li>
                    <li>• Always consult a doctor for serious health conditions</li>
                    <li>• Consider your health conditions before trying any remedy</li>
                    <li>• Stop any remedy if you experience adverse reactions</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <Checkbox
                  id="terms"
                  checked={formData.agreedToTerms}
                  onCheckedChange={(checked) => 
                    setFormData({ ...formData, agreedToTerms: checked as boolean })
                  }
                />
                <div className="text-sm">
                  <label htmlFor="terms" className="cursor-pointer">
                    I agree to all the{" "}
                    <span className="text-primary underline">Terms and Conditions</span>{" "}
                    and understand that this platform provides educational information only
                  </label>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <Button 
                variant="outline" 
                onClick={() => setStep(1)}
                className="flex-1"
              >
                Back
              </Button>
              <Button 
                onClick={handleComplete}
                className="flex-1 btn-nani"
                disabled={!formData.agreedToTerms}
              >
                <CheckCircle className="h-4 w-4 mr-2" />
                Start My Journey
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}