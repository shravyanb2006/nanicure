import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { 
  X, 
  User, 
  Star, 
  Leaf, 
  HeartHandshake, 
  Stethoscope, 
  Info, 
  MessageSquare, 
  Shield,
  ChevronDown,
  ChevronRight,
  LogOut,
  MessageCircle,
  Mic,
  Heart,
  Home
} from "lucide-react";

interface SideMenuProps {
  isOpen: boolean;
  onClose: () => void;
  currentPage?: string;
  onSignOut?: () => void;
}

// Sample data for Browse Ingredients and Quick Remedies
const ingredients = [
  {
    name: "Ginger (Adrak)",
    description: "Natural anti-inflammatory and digestive aid",
    helpsWithy: "Cold, nausea, indigestion, morning sickness",
    precautions: "Avoid if on blood thinners. Limit to 4g daily."
  },
  {
    name: "Turmeric (Haldi)",
    description: "Powerful antioxidant with healing properties",
    helpsWithy: "Inflammation, wounds, joint pain, immunity",
    precautions: "May interfere with blood thinners. Avoid before surgery."
  },
  {
    name: "Tulsi (Holy Basil)",
    description: "Sacred herb with respiratory and stress benefits",
    helpsWithy: "Cough, cold, stress, immunity, breathing issues",
    precautions: "May lower blood sugar. Monitor if diabetic."
  },
  {
    name: "Honey (Shahad)",
    description: "Natural antimicrobial and soothing agent",
    helpsWithy: "Cough, sore throat, wound healing, energy",
    precautions: "Not for infants under 1 year. Limit if diabetic."
  },
  {
    name: "Ajwain (Carom Seeds)",
    description: "Digestive spice with antimicrobial properties",
    helpsWithy: "Indigestion, gas, cough, cold symptoms",
    precautions: "May increase acidity in some people."
  }
];

const quickRemedies = [
  {
    title: "Common Cold Relief",
    description: "Ginger-tulsi tea with honey",
    issue: "Cold, runny nose, congestion"
  },
  {
    title: "Headache Remedy",
    description: "Peppermint oil on temples + rest",
    issue: "Tension headache, migraine"
  },
  {
    title: "Stomach Ache Solution",
    description: "Ajwain water or fennel tea",
    issue: "Indigestion, gas, stomach pain"
  },
  {
    title: "Cough Suppressant",
    description: "Warm honey-ginger mixture",
    issue: "Dry cough, throat irritation"
  },
  {
    title: "Fever Management",
    description: "Cool compress + tulsi tea",
    issue: "Mild fever, body aches"
  },
  {
    title: "Acidity Relief",
    description: "Coconut water or buttermilk",
    issue: "Heartburn, acid reflux"
  }
];

export function SideMenu({ isOpen, onClose, currentPage, onSignOut }: SideMenuProps) {
  const [ingredientsOpen, setIngredientsOpen] = useState(false);
  const [remediesOpen, setRemediesOpen] = useState(false);
  const [widgetsOpen, setWidgetsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  if (!isOpen) return null;

  const handleNavigation = (path: string) => {
    navigate(path);
    onClose();
  };

  const isWidget = location.pathname.includes('nani-') || location.pathname.includes('doctor-connect');

  // Widget navigation items
  const widgetItems = [
    { 
      title: "Nani Ke Nuske", 
      path: "/nani-ke-nuske", 
      icon: MessageCircle,
      description: "Chat remedies"
    },
    { 
      title: "Nani Ki Vani", 
      path: "/nani-ki-vani", 
      icon: Mic,
      description: "Voice assistant"
    },
    { 
      title: "Nani Wellness", 
      path: "/nani-wellness", 
      icon: Heart,
      description: "Wellness & fitness"
    },
    { 
      title: "Doctor Connect", 
      path: "/doctor-connect", 
      icon: Stethoscope,
      description: "Find doctors"
    }
  ];

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/50" onClick={onClose} />
      
      {/* Side Menu */}
      <div className="fixed left-0 top-0 h-full w-80 bg-card border-r shadow-lg z-50">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="font-semibold text-lg">Menu</h2>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        <ScrollArea className="h-[calc(100vh-4rem)]">
          <div className="p-4 space-y-2">
            {/* Dashboard/Home Navigation */}
            <Button 
              variant="ghost" 
              className="w-full justify-start" 
              onClick={() => handleNavigation(isWidget ? '/dashboard' : '/')}
            >
              <Home className="mr-2 h-4 w-4" />
              {isWidget ? 'Dashboard' : 'Home'}
            </Button>

            <Separator />

            {/* Widget Navigation - Only show if on a widget page */}
            {isWidget && (
              <>
                <Collapsible open={widgetsOpen} onOpenChange={setWidgetsOpen}>
                  <CollapsibleTrigger asChild>
                    <Button variant="ghost" className="w-full justify-between">
                      <div className="flex items-center">
                        <HeartHandshake className="mr-2 h-4 w-4" />
                        Other Features
                      </div>
                      {widgetsOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                    </Button>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="space-y-2 ml-6 mt-2">
                    {widgetItems
                      .filter(item => item.path !== location.pathname)
                      .map((item, index) => (
                        <Button
                          key={index}
                          variant="ghost"
                          className="w-full justify-start text-sm"
                          onClick={() => handleNavigation(item.path)}
                        >
                          <item.icon className="mr-2 h-4 w-4" />
                          <div className="text-left">
                            <div>{item.title}</div>
                            <div className="text-xs text-muted-foreground">{item.description}</div>
                          </div>
                        </Button>
                      ))
                    }
                  </CollapsibleContent>
                </Collapsible>

                <Separator />
              </>
            )}

            {/* Profile */}
            <Button 
              variant="ghost" 
              className="w-full justify-start" 
              onClick={() => handleNavigation('/profile')}
            >
              <User className="mr-2 h-4 w-4" />
              Profile
            </Button>

            {/* Starred */}
            <Button 
              variant="ghost" 
              className="w-full justify-start" 
              onClick={() => handleNavigation('/starred')}
            >
              <Star className="mr-2 h-4 w-4" />
              Starred
            </Button>

            {/* Browse Ingredients - Collapsible */}
            <Collapsible open={ingredientsOpen} onOpenChange={setIngredientsOpen}>
              <CollapsibleTrigger asChild>
                <Button variant="ghost" className="w-full justify-between">
                  <div className="flex items-center">
                    <Leaf className="mr-2 h-4 w-4" />
                    Browse Ingredients
                  </div>
                  {ingredientsOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent className="space-y-2 ml-6 mt-2 bg-card rounded-lg p-2 border shadow-lg z-50">
                <ScrollArea className="h-64">
                  {ingredients.map((ingredient, index) => (
                    <Card key={index} className="mb-2 bg-background">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm">{ingredient.name}</CardTitle>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <p className="text-xs text-muted-foreground mb-1">{ingredient.description}</p>
                        <p className="text-xs"><strong>Helps with:</strong> {ingredient.helpsWithy}</p>
                        <p className="text-xs text-amber-600"><strong>Precautions:</strong> {ingredient.precautions}</p>
                      </CardContent>
                    </Card>
                  ))}
                </ScrollArea>
              </CollapsibleContent>
            </Collapsible>

            {/* Quick Remedies - Collapsible */}
            <Collapsible open={remediesOpen} onOpenChange={setRemediesOpen}>
              <CollapsibleTrigger asChild>
                <Button variant="ghost" className="w-full justify-between">
                  <div className="flex items-center">
                    <HeartHandshake className="mr-2 h-4 w-4" />
                    Quick Remedies
                  </div>
                  {remediesOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent className="space-y-2 ml-6 mt-2 bg-card rounded-lg p-2 border shadow-lg z-50">
                <ScrollArea className="h-64">
                  {quickRemedies.map((remedy, index) => (
                    <Card key={index} className="mb-2 cursor-pointer hover:bg-accent bg-background" 
                          onClick={() => handleNavigation(`/nani-ke-nuske?remedy=${remedy.title}`)}>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm">{remedy.title}</CardTitle>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <p className="text-xs text-muted-foreground mb-1">{remedy.description}</p>
                        <p className="text-xs"><strong>For:</strong> {remedy.issue}</p>
                      </CardContent>
                    </Card>
                  ))}
                </ScrollArea>
              </CollapsibleContent>
            </Collapsible>

            <Separator />

            {/* Doctor Connect */}
            <Button 
              variant="ghost" 
              className="w-full justify-start" 
              onClick={() => handleNavigation('/doctor-connect')}
            >
              <Stethoscope className="mr-2 h-4 w-4" />
              Doctor Connect
            </Button>

            <Separator />

            {/* About */}
            <Button 
              variant="ghost" 
              className="w-full justify-start" 
              onClick={() => handleNavigation('/about')}
            >
              <Info className="mr-2 h-4 w-4" />
              About
            </Button>

            {/* Feedback */}
            <Button 
              variant="ghost" 
              className="w-full justify-start" 
              onClick={() => handleNavigation('/feedback')}
            >
              <MessageSquare className="mr-2 h-4 w-4" />
              Feedback
            </Button>

            {/* Privacy Policy & Terms */}
            <Button 
              variant="ghost" 
              className="w-full justify-start" 
              onClick={() => handleNavigation('/privacy-policy')}
            >
              <Shield className="mr-2 h-4 w-4" />
              Privacy Policy & Terms
            </Button>

            <Separator />

            {/* Sign Out */}
            {onSignOut && (
              <Button 
                variant="ghost" 
                className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50" 
                onClick={() => {
                  onSignOut();
                  onClose();
                }}
              >
                <LogOut className="mr-2 h-4 w-4" />
                Sign Out
              </Button>
            )}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}