import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Menu, X, User, Star, Leaf, Zap, Stethoscope, 
  Info, MessageCircle, Shield, FileText, ChevronDown, ChevronRight
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

interface SideMenuProps {
  currentPage: string;
  isOpen: boolean;
  onClose: () => void;
}

export function SideMenu({ currentPage, isOpen, onClose }: SideMenuProps) {
  const navigate = useNavigate();
  const [browseIngredientsOpen, setBrowseIngredientsOpen] = useState(false);
  const [quickRemediesOpen, setQuickRemediesOpen] = useState(false);

  const mainMenuItems = [
    { 
      id: 'profile', 
      name: 'Profile', 
      icon: User, 
      path: '/profile',
      description: 'Your settings & preferences'
    },
    { 
      id: 'starred', 
      name: 'Starred Remedies', 
      icon: Star, 
      path: '/starred',
      description: 'Your saved remedies'
    }
  ];

  const navigatorItems = [
    { 
      id: 'doctor-connect', 
      name: 'Doctor Connect', 
      icon: Stethoscope, 
      path: '/doctor-connect',
      description: 'Find healthcare providers'
    }
  ];

  const infoItems = [
    { 
      id: 'about', 
      name: 'About', 
      icon: Info, 
      path: '/about',
      description: 'Learn about NaniCure'
    },
    { 
      id: 'feedback', 
      name: 'Feedback', 
      icon: MessageCircle, 
      path: '/feedback',
      description: 'Share your thoughts'
    },
    { 
      id: 'privacy', 
      name: 'Privacy & Terms', 
      icon: Shield, 
      path: '/privacy-policy',
      description: 'Our policies'
    }
  ];

  const ingredientsData = [
    { name: 'Ginger', description: 'Anti-nausea & digestive aid', helps: 'Nausea, cold, inflammation', precaution: 'May increase bleeding risk' },
    { name: 'Turmeric', description: 'Natural anti-inflammatory', helps: 'Joint pain, wounds, skin issues', precaution: 'Can stain clothes and may thin blood' },
    { name: 'Honey', description: 'Natural antimicrobial', helps: 'Cough, wounds, sore throat', precaution: 'Not for children under 1 year' },
    { name: 'Tulsi', description: 'Sacred herb for immunity', helps: 'Respiratory issues, stress, fever', precaution: 'May lower blood sugar' },
    { name: 'Mint', description: 'Cooling & digestive', helps: 'Indigestion, headaches, nausea', precaution: 'May worsen acid reflux in some' },
    { name: 'Fennel', description: 'Digestive & breath freshener', helps: 'Bloating, gas, bad breath', precaution: 'May trigger allergies in some' }
  ];

  const quickRemedies = [
    { problem: 'Common Cold', remedy: 'Ginger-honey tea + turmeric milk + rest', duration: '3-7 days' },
    { problem: 'Headache', remedy: 'Peppermint oil on temples + hydration + rest', duration: '30 min - 2 hours' },
    { problem: 'Stomach Ache', remedy: 'Jeera water + fennel tea + light food', duration: '1-4 hours' },
    { problem: 'Sore Throat', remedy: 'Salt water gargle + honey + warm fluids', duration: '2-5 days' },
    { problem: 'Acidity', remedy: 'Cold milk + banana + avoid spicy food', duration: '30 min - 2 hours' },
    { problem: 'Minor Cut', remedy: 'Clean with water + turmeric paste + bandage', duration: '3-7 days healing' }
  ];

  const handleIngredientClick = (ingredient: any) => {
    // Navigate to a detailed view or show more info
    navigate(`/ingredient/${ingredient.name.toLowerCase()}`);
    onClose();
  };

  const handleRemedyClick = (remedy: any) => {
    // Navigate to detailed remedy or start a chat with this topic
    navigate(`/nani-ke-nuske?remedy=${encodeURIComponent(remedy.problem)}`);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50" onClick={onClose}>
      <div className="fixed left-0 top-0 h-full w-80 bg-background border-r shadow-lg overflow-hidden" onClick={(e) => e.stopPropagation()}>
        <ScrollArea className="h-full">
          <div className="p-4">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-lg font-semibold text-primary">NaniCure Menu</h2>
                <p className="text-sm text-muted-foreground">Your wellness companion</p>
              </div>
              <Button variant="ghost" size="sm" onClick={onClose}>
                <X className="h-4 w-4" />
              </Button>
            </div>

            {/* Main Menu Items */}
            <div className="space-y-4 mb-6">
              <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">Personal</h3>
              {mainMenuItems.map((item) => (
                <Link 
                  key={item.id} 
                  to={item.path}
                  onClick={onClose}
                  className="block"
                >
                  <Card className="hover:shadow-md transition-shadow cursor-pointer border">
                    <CardContent className="p-3">
                      <div className="flex items-center gap-3">
                        <item.icon className="h-4 w-4 text-primary" />
                        <div>
                          <h4 className="font-medium text-sm">{item.name}</h4>
                          <p className="text-xs text-muted-foreground">{item.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>

            {/* Browse Ingredients Dropdown */}
            <div className="mb-6">
              <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide mb-3">Knowledge</h3>
              
              <Collapsible open={browseIngredientsOpen} onOpenChange={setBrowseIngredientsOpen}>
                <CollapsibleTrigger asChild>
                  <Card className="hover:shadow-md transition-shadow cursor-pointer border mb-2">
                    <CardContent className="p-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Leaf className="h-4 w-4 text-primary" />
                          <div>
                            <h4 className="font-medium text-sm">Browse Ingredients</h4>
                            <p className="text-xs text-muted-foreground">Natural remedies database</p>
                          </div>
                        </div>
                        {browseIngredientsOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                      </div>
                    </CardContent>
                  </Card>
                </CollapsibleTrigger>
                
                <CollapsibleContent className="ml-4 space-y-2">
                  {ingredientsData.map((ingredient, index) => (
                    <Card key={index} className="hover:shadow-sm transition-shadow cursor-pointer border-l-2 border-l-primary/20" onClick={() => handleIngredientClick(ingredient)}>
                      <CardContent className="p-2">
                        <h5 className="font-medium text-xs">{ingredient.name}</h5>
                        <p className="text-xs text-muted-foreground mb-1">{ingredient.description}</p>
                        <p className="text-xs text-green-600">Helps: {ingredient.helps}</p>
                        <p className="text-xs text-amber-600">Caution: {ingredient.precaution}</p>
                      </CardContent>
                    </Card>
                  ))}
                </CollapsibleContent>
              </Collapsible>

              {/* Quick Remedies Dropdown */}
              <Collapsible open={quickRemediesOpen} onOpenChange={setQuickRemediesOpen}>
                <CollapsibleTrigger asChild>
                  <Card className="hover:shadow-md transition-shadow cursor-pointer border">
                    <CardContent className="p-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Zap className="h-4 w-4 text-primary" />
                          <div>
                            <h4 className="font-medium text-sm">Quick Remedies</h4>
                            <p className="text-xs text-muted-foreground">Instant solutions for common issues</p>
                          </div>
                        </div>
                        {quickRemediesOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                      </div>
                    </CardContent>
                  </Card>
                </CollapsibleTrigger>
                
                <CollapsibleContent className="ml-4 space-y-2">
                  {quickRemedies.map((remedy, index) => (
                    <Card key={index} className="hover:shadow-sm transition-shadow cursor-pointer border-l-2 border-l-primary/20" onClick={() => handleRemedyClick(remedy)}>
                      <CardContent className="p-2">
                        <h5 className="font-medium text-xs text-red-600">{remedy.problem}</h5>
                        <p className="text-xs text-muted-foreground mb-1">{remedy.remedy}</p>
                        <p className="text-xs text-blue-600">Duration: {remedy.duration}</p>
                      </CardContent>
                    </Card>
                  ))}
                </CollapsibleContent>
              </Collapsible>
            </div>

            {/* Navigator Items */}
            <div className="space-y-4 mb-6">
              <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">Services</h3>
              {navigatorItems.map((item) => (
                <Link 
                  key={item.id} 
                  to={item.path}
                  onClick={onClose}
                  className="block"
                >
                  <Card className="hover:shadow-md transition-shadow cursor-pointer border">
                    <CardContent className="p-3">
                      <div className="flex items-center gap-3">
                        <item.icon className="h-4 w-4 text-primary" />
                        <div>
                          <h4 className="font-medium text-sm">{item.name}</h4>
                          <p className="text-xs text-muted-foreground">{item.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>

            {/* Info Items */}
            <div className="space-y-4 mb-6">
              <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">Information</h3>
              {infoItems.map((item) => (
                <Link 
                  key={item.id} 
                  to={item.path}
                  onClick={onClose}
                  className="block"
                >
                  <Card className="hover:shadow-md transition-shadow cursor-pointer border">
                    <CardContent className="p-3">
                      <div className="flex items-center gap-3">
                        <item.icon className="h-4 w-4 text-primary" />
                        <div>
                          <h4 className="font-medium text-sm">{item.name}</h4>
                          <p className="text-xs text-muted-foreground">{item.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>

            {/* Back to Home */}
            <div className="pt-4 border-t">
              <Link 
                to="/"
                onClick={onClose}
                className="block"
              >
                <Card className="hover:shadow-md transition-shadow cursor-pointer border border-primary/20">
                  <CardContent className="p-3">
                    <div className="flex items-center gap-3">
                      <div className="h-4 w-4 rounded-full bg-primary/20 flex items-center justify-center">
                        <span className="text-xs text-primary">🏠</span>
                      </div>
                      <div>
                        <h4 className="font-medium text-sm">Back to Home</h4>
                        <p className="text-xs text-muted-foreground">Main dashboard</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </div>

            {/* Footer */}
            <div className="mt-6 pt-4 border-t">
              <p className="text-xs text-center text-muted-foreground">
                Your caring Nani is always here for you 💛
              </p>
            </div>
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}