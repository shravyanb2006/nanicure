import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  User, 
  HelpCircle, 
  Leaf, 
  Star, 
  Info, 
  MessageSquare, 
  Settings, 
  LogOut,
  Shield,
  FileText,
  X
} from "lucide-react";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  userName: string;
  starredMessages: Array<{ id: string; text: string; timestamp: Date; }>;
  onSignOut: () => void;
}

const commonProblems = [
  { id: 'cold-cough', name: 'Cold & Cough', remedy: '**Honey + Turmeric + Ginger** in warm water. Gargle with salt water. Steam inhalation.' },
  { id: 'headache', name: 'Headache', remedy: '**Peppermint oil** on temples. **Cold compress**. Head massage with coconut oil.' },
  { id: 'acidity', name: 'Acidity', remedy: '**Cold milk with ghee**. **Coconut water**. **Fennel seeds** after meals.' },
  { id: 'fever', name: 'Fever', remedy: '**Tulsi tea**. **Wet cloth** on forehead. Rest and hydration. See doctor if high fever.' },
  { id: 'insomnia', name: 'Sleep Issues', remedy: '**Warm milk** with nutmeg. **Lavender oil**. No screens 1hr before bed.' },
  { id: 'stomach-ache', name: 'Stomach Pain', remedy: '**Hing water**. **Jeera water**. **Ginger tea**. Light, warm foods only.' }
];

const ingredients = [
  { name: 'Turmeric', uses: 'Anti-inflammatory, wound healing', precaution: 'Avoid with blood thinners' },
  { name: 'Ginger', uses: 'Nausea, digestion, cold relief', precaution: 'Limit if stomach ulcers' },
  { name: 'Honey', uses: 'Cough suppressant, wound healing', precaution: 'Not for babies under 1 year' },
  { name: 'Tulsi', uses: 'Immunity, respiratory issues', precaution: 'May lower blood sugar' },
  { name: 'Neem', uses: 'Skin problems, antibacterial', precaution: 'Bitter taste, use in moderation' },
  { name: 'Fennel Seeds', uses: 'Digestion, gas relief', precaution: 'May cause allergic reactions' }
];

export function Sidebar({ isOpen, onClose, userName, starredMessages, onSignOut }: SidebarProps) {
  const [activeSection, setActiveSection] = useState('profile');

  if (!isOpen) return null;

  const renderQuickHelp = () => (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">
        Common problems with instant remedies:
      </p>
      {commonProblems.map((problem) => (
        <Card key={problem.id} className="p-3 border shadow-sm">
          <h4 className="font-medium text-sm text-primary mb-2">{problem.name}</h4>
          <p className="text-xs text-muted-foreground leading-relaxed">
            {problem.remedy}
          </p>
          <p className="text-xs text-primary mt-2 font-medium">Got it, Nani! Thanks 🧡</p>
        </Card>
      ))}
    </div>
  );

  const renderBrowseIngredients = () => (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">
        Common ingredients and their uses:
      </p>
      {ingredients.map((ingredient) => (
        <Card key={ingredient.name} className="p-3 border shadow-sm">
          <h4 className="font-medium text-sm text-primary mb-1">{ingredient.name}</h4>
          <p className="text-xs text-muted-foreground mb-2">
            <strong>Uses:</strong> {ingredient.uses}
          </p>
          <p className="text-xs text-orange-600">
            <strong>Precaution:</strong> {ingredient.precaution}
          </p>
          <p className="text-xs text-primary mt-2 font-medium">Stay safe beta! 💛</p>
        </Card>
      ))}
    </div>
  );

  const renderStarredNuske = () => (
    <div className="space-y-4">
      {starredMessages.length > 0 ? (
        <>
          <p className="text-sm text-muted-foreground">
            Your saved Nani's remedies:
          </p>
          {starredMessages.map((message) => (
            <Card key={message.id} className="p-3 border shadow-sm">
              <p className="text-xs leading-relaxed text-muted-foreground">
                {message.text.slice(0, 150)}...
              </p>
              <p className="text-xs text-primary mt-2">
                {message.timestamp.toLocaleDateString()}
              </p>
            </Card>
          ))}
        </>
      ) : (
        <div className="text-center py-8">
          <Star className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-sm text-muted-foreground">
            Star Nani's messages to save them here!
          </p>
        </div>
      )}
    </div>
  );

  const renderAbout = () => (
    <div className="space-y-4">
      <Card className="p-4 border shadow-sm gradient-warm">
        <h4 className="font-medium text-primary mb-3">About NaniCure</h4>
        <p className="text-sm text-muted-foreground leading-relaxed">
          NaniCure is a unique wellness platform blending timeless grandmother wisdom with modern AI. 
          It offers home remedies, soothing voice guidance, mental wellness support, and fitness routines 
          — all wrapped in warmth and love.
        </p>
        <p className="text-sm text-muted-foreground leading-relaxed mt-3">
          Whether you're battling a cold, stressed, or seeking healthier habits, NaniCure is your 24/7 
          virtual nani — caring, wise, and ready with a remedy.
        </p>
      </Card>
      
      <Card className="p-4 border shadow-sm">
        <h4 className="font-medium text-primary mb-2">Features</h4>
        <ul className="text-sm text-muted-foreground space-y-1">
          <li>• Chat remedies for 200+ common problems</li>
          <li>• Voice-guided healing with caring tone</li>
          <li>• Mental wellness and fitness guidance</li>
          <li>• Doctor recommendations by region</li>
          <li>• Personalized advice based on location</li>
        </ul>
      </Card>
    </div>
  );

  const renderFeedback = () => (
    <div className="space-y-4">
      <Card className="p-4 border shadow-sm">
        <h4 className="font-medium text-primary mb-3">We'd Love to Hear from You! 💛</h4>
        <p className="text-sm text-muted-foreground mb-4">
          Your feedback helps us make NaniCure better for everyone.
        </p>
        
        <div className="space-y-3">
          <div>
            <p className="text-sm font-medium mb-1">Email Us:</p>
            <p className="text-sm text-primary">support@nanicure.com</p>
          </div>
          
          <div>
            <p className="text-sm font-medium mb-2">Quick Feedback:</p>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">😊 Great</Button>
              <Button variant="outline" size="sm">😐 Good</Button>
              <Button variant="outline" size="sm">😔 Needs Work</Button>
            </div>
          </div>
        </div>
        
        <p className="text-xs text-muted-foreground mt-4">
          We read every message and value your suggestions!
        </p>
      </Card>
    </div>
  );

  const renderPrivacy = () => (
    <div className="space-y-4">
      <Card className="p-4 border shadow-sm">
        <h4 className="font-medium text-primary mb-3">Privacy Policy</h4>
        <div className="text-sm text-muted-foreground space-y-2">
          <p><strong>Data Collection:</strong> We collect only basic profile information and conversation data to provide personalized remedies.</p>
          <p><strong>Data Storage:</strong> Your information is stored securely and never shared with third parties without consent.</p>
          <p><strong>Confidentiality:</strong> All health discussions remain private and confidential.</p>
        </div>
      </Card>
      
      <Card className="p-4 border shadow-sm">
        <h4 className="font-medium text-primary mb-3">Terms of Use</h4>
        <div className="text-sm text-muted-foreground space-y-2">
          <p><strong>Medical Disclaimer:</strong> NaniCure provides educational information only, not medical advice.</p>
          <p><strong>Professional Care:</strong> Always consult licensed healthcare providers for serious conditions.</p>
          <p><strong>Use Responsibly:</strong> Home remedies are complementary to, not replacement for, professional medical care.</p>
        </div>
      </Card>
      
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
        <p className="text-xs text-yellow-800 font-medium">
          ⚠️ Important: All remedies and advice provided by NaniCure are for informational purposes only. 
          Always consult a licensed healthcare provider for serious health concerns.
        </p>
      </div>
    </div>
  );

  const sidebarSections = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'quick-help', label: 'Quick Help', icon: HelpCircle },
    { id: 'ingredients', label: 'Browse Ingredients', icon: Leaf },
    { id: 'starred', label: 'Starred Nuske', icon: Star },
    { id: 'about', label: 'About', icon: Info },
    { id: 'feedback', label: 'Feedback', icon: MessageSquare },
    { id: 'settings', label: 'Settings', icon: Settings },
    { id: 'privacy', label: 'Privacy & Terms', icon: Shield },
  ];

  return (
    <div className="fixed inset-0 bg-black/50 z-50 lg:hidden">
      <div className="fixed right-0 top-0 h-full w-80 bg-background border-l shadow-lg overflow-y-auto">
        <div className="p-4">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-primary">Menu</h2>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
          
          {/* Navigation */}
          <div className="mb-6">
            <div className="grid grid-cols-2 gap-2">
              {sidebarSections.map((section) => (
                <Button
                  key={section.id}
                  variant={activeSection === section.id ? "default" : "outline"}
                  size="sm"
                  className="justify-start text-xs p-2 h-auto"
                  onClick={() => setActiveSection(section.id)}
                >
                  <section.icon className="h-3 w-3 mr-1" />
                  {section.label}
                </Button>
              ))}
            </div>
          </div>
          
          {/* Content */}
          <div className="space-y-4">
            {activeSection === 'profile' && (
              <Card className="p-4 border shadow-sm gradient-sage">
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-3">
                    <User className="h-8 w-8 text-primary-foreground" />
                  </div>
                  <h3 className="font-medium text-primary">Namaste, {userName}! 🙏</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Your caring Nani is here for you
                  </p>
                  <div className="mt-4 space-y-2 text-xs text-muted-foreground">
                    <p>• Remedies shared: {starredMessages.length}</p>
                    <p>• Member since today</p>
                    <p>• Region: Selected in header</p>
                  </div>
                </div>
              </Card>
            )}
            
            {activeSection === 'quick-help' && renderQuickHelp()}
            {activeSection === 'ingredients' && renderBrowseIngredients()}
            {activeSection === 'starred' && renderStarredNuske()}
            {activeSection === 'about' && renderAbout()}
            {activeSection === 'feedback' && renderFeedback()}
            {activeSection === 'privacy' && renderPrivacy()}
            
            {activeSection === 'settings' && (
              <div className="space-y-4">
                <Card className="p-4 border shadow-sm">
                  <h4 className="font-medium text-primary mb-3">Settings</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Notifications</span>
                      <Button variant="outline" size="sm">Enable</Button>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Voice Speed</span>
                      <Button variant="outline" size="sm">Normal</Button>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Language</span>
                      <Button variant="outline" size="sm">English</Button>
                    </div>
                  </div>
                </Card>
              </div>
            )}
          </div>
          
          {/* Sign Out */}
          <div className="mt-8 pt-4 border-t">
            <Button 
              onClick={onSignOut}
              variant="outline" 
              className="w-full hover:bg-destructive hover:text-destructive-foreground"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}