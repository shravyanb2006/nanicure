import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Menu, X, MessageCircle, Mic, Heart, Stethoscope } from "lucide-react";
import { Link } from "react-router-dom";

interface HamburgerMenuProps {
  currentPage: string;
}

export function HamburgerMenu({ currentPage }: HamburgerMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { 
      id: 'nani-ke-nuske', 
      name: 'Nani ke Nuske', 
      icon: MessageCircle, 
      path: '/nani-ke-nuske',
      description: 'Chat remedies'
    },
    { 
      id: 'nani-ki-vani', 
      name: 'Nani ki Vani', 
      icon: Mic, 
      path: '/nani-ki-vani',
      description: 'Voice remedies'
    },
    { 
      id: 'nani-wellness', 
      name: 'Nani Wellness', 
      icon: Heart, 
      path: '/nani-wellness',
      description: 'Mental & physical wellness'
    },
    { 
      id: 'doctor-connect', 
      name: 'Doctor Connect', 
      icon: Stethoscope, 
      path: '/doctor-connect',
      description: 'Find doctors'
    }
  ];

  const currentPageName = menuItems.find(item => 
    currentPage.includes(item.id)
  )?.name || 'NaniCure';

  return (
    <>
      {/* Hamburger Button */}
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsOpen(true)}
        className="p-2"
      >
        <Menu className="h-5 w-5" />
        <span className="sr-only">Open menu</span>
      </Button>

      {/* Overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 z-50" onClick={() => setIsOpen(false)}>
          <div className="fixed left-0 top-0 h-full w-80 bg-background border-r shadow-lg" onClick={(e) => e.stopPropagation()}>
            <div className="p-4">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-lg font-semibold text-primary">Navigate to</h2>
                  <p className="text-sm text-muted-foreground">Currently: {currentPageName}</p>
                </div>
                <Button variant="ghost" size="sm" onClick={() => setIsOpen(false)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
              
              {/* Menu Items */}
              <div className="space-y-3">
                {menuItems
                  .filter(item => !currentPage.includes(item.id))
                  .map((item) => (
                  <Link 
                    key={item.id} 
                    to={item.path}
                    onClick={() => setIsOpen(false)}
                    className="block"
                  >
                    <Card className="hover:shadow-md transition-shadow cursor-pointer border">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3">
                          <item.icon className="h-5 w-5 text-primary" />
                          <div>
                            <h3 className="font-medium text-sm">{item.name}</h3>
                            <p className="text-xs text-muted-foreground">{item.description}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
                
                {/* Home Link */}
                <Link 
                  to="/dashboard"
                  onClick={() => setIsOpen(false)}
                  className="block"
                >
                  <Card className="hover:shadow-md transition-shadow cursor-pointer border border-primary/20">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="h-5 w-5 rounded-full bg-primary/20 flex items-center justify-center">
                          <span className="text-xs text-primary">🏠</span>
                        </div>
                        <div>
                          <h3 className="font-medium text-sm">Back to Dashboard</h3>
                          <p className="text-xs text-muted-foreground">Main widget hub</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </div>
              
              {/* Footer */}
              <div className="mt-8 pt-4 border-t">
                <p className="text-xs text-center text-muted-foreground">
                  Your caring Nani is always here for you 💛
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}