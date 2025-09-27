import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, Send, Star, ArrowLeft, RotateCcw } from "lucide-react";
import { HamburgerMenu } from "@/components/HamburgerMenu";
import { comprehensiveRemedyEngine } from '@/utils/comprehensiveRemedyEngine';
import { profileManager } from '@/utils/profileManager';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
  starred?: boolean;
}

const NaniWellnessPage = () => {
  const navigate = useNavigate();
  const profile = profileManager.getProfile();
  const [selectedRegion, setSelectedRegion] = useState(profile?.region || "");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: `Namaste ${profile?.name ? profile.name + ' ' : ''}beta! I'm here to help with your wellness journey - whether it's stress, anxiety, fitness, or finding inner peace. Tell me what's weighing on your heart today? 💛`,
      isUser: false,
      timestamp: new Date(),
    }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateWellnessResponse = (userInput: string): string => {
    // Try wellness advice first
    const wellness = comprehensiveRemedyEngine.findWellnessAdvice(userInput);
    if (wellness) {
      const response = comprehensiveRemedyEngine.generateWellnessResponse(wellness);
      comprehensiveRemedyEngine.addToSessionMemory(userInput, response);
      return response;
    }

    // Try comprehensive remedy for wellness-related health issues
    const remedy = comprehensiveRemedyEngine.findComprehensiveRemedy(userInput, selectedRegion);
    if (remedy && (remedy.category === 'mental' || remedy.problem.toLowerCase().includes('stress') || remedy.problem.toLowerCase().includes('anxiety'))) {
      const response = comprehensiveRemedyEngine.generateEnhancedResponse(remedy);
      comprehensiveRemedyEngine.addToSessionMemory(userInput, response);
      return response;
    }
    
    // Enhanced default wellness response
    const sessionContext = comprehensiveRemedyEngine.getSessionContext();
    const contextualIntro = sessionContext ? 
      `Beta, I remember our wellness conversation. Let me help you further on this journey! 🤗\n\n` : '';
    
    return `${contextualIntro}**Beta, I understand you're looking for wellness guidance! 💛**

**🧘‍♀️ Mental Wellness & Emotional Health:**
• **Stress & Anxiety** - Pranayama, meditation, grounding techniques
• **Depression & Low Mood** - Mood-lifting yoga, positive affirmations  
• **Sleep Disorders** - Relaxation routines, bedtime rituals, sleep hygiene
• **Confidence Building** - Self-affirmation, body-positive exercises
• **Anger Management** - Calming breathing, emotional regulation
• **Focus & Memory** - Brain exercises, concentration techniques

**💪 Physical Wellness & Fitness:**
• **Daily Yoga Routines** - Morning energizers, evening relaxation
• **Breathing Exercises** - Pranayama for stress relief and energy
• **Posture Improvement** - Desk exercises, spine alignment
• **Energy Boosting** - Natural stamina builders, fatigue fighters
• **Weight Management** - Healthy habits, mindful eating
• **Women's Health** - Hormonal balance, cycle support

**🌱 Lifestyle & Holistic Wellness:**
• **Nutrition & Diet** - Balanced meals, therapeutic foods
• **Daily Routines** - Ayurvedic lifestyle, circadian rhythms
• **Stress Management** - Work-life balance, relaxation techniques
• **Spiritual Practices** - Meditation, mindfulness, gratitude

**✨ Try asking specific questions:**
"Nani, I feel overwhelmed with work stress"
"Help me create a morning yoga routine"
"I can't sleep at night, what should I do?"
"How to build confidence naturally?"
"Natural ways to boost energy levels"

*What's troubling your heart today, beta? I'm here to support your wellness journey! 🌿*`;
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    setTimeout(() => {
      const naniResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: generateWellnessResponse(input),
        isUser: false,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, naniResponse]);
      setIsLoading(false);
    }, 1500);
  };

  const startNewChat = () => {
    comprehensiveRemedyEngine.clearSession();
    setMessages([
      {
        id: '1',
        text: `Namaste ${profile?.name ? profile.name + ' ' : ''}beta! I'm here to help with your wellness journey - whether it's stress, anxiety, fitness, or finding inner peace. Tell me what's weighing on your heart today? 💛`,
        isUser: false,
        timestamp: new Date(),
      }
    ]);
    setInput("");
  };

  const handleStar = (message: Message) => {
    const updatedMessage = { ...message, starred: true };
    setMessages(prev => prev.map(m => m.id === message.id ? updatedMessage : m));
    
    // Save to starred remedies
    if (!message.isUser) {
      profileManager.addStarredRemedy({
        id: message.id,
        title: 'Wellness Guidance',
        content: message.text,
        timestamp: message.timestamp,
        category: 'wellness'
      });
    }
  };

  const renderMessage = (message: Message) => {
    const isMarkdown = message.text.includes('**');
    
    if (isMarkdown) {
      const formattedText = message.text
        .split('\n')
        .map((line, index) => {
          if (line.includes('**')) {
            const parts = line.split('**');
            return (
              <div key={index} className="mb-1">
                {parts.map((part, partIndex) => 
                  partIndex % 2 === 1 ? <strong key={partIndex}>{part}</strong> : part
                )}
              </div>
            );
          }
          return <div key={index} className={line.startsWith('•') ? 'ml-4 mb-1' : 'mb-1'}>{line}</div>;
        });
      
      return <div className="whitespace-pre-wrap">{formattedText}</div>;
    }
    
    return <div className="whitespace-pre-wrap">{message.text}</div>;
  };

  return (
    <div className="min-h-screen bg-background indian-motifs">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-6 flex items-center justify-between">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/dashboard')}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
          
          <div className="flex items-center gap-4">
            <HamburgerMenu currentPage="nani-wellness" />
            
            <Select value={selectedRegion} onValueChange={(value) => {
              setSelectedRegion(value);
              profileManager.updateProfile({ region: value });
            }}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Select Region" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="north">North India</SelectItem>
                <SelectItem value="south">South India</SelectItem>
                <SelectItem value="east">East India</SelectItem>
                <SelectItem value="west">West India</SelectItem>
                <SelectItem value="central">Central India</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="lotus-divider mb-8">
          <span>🌸</span>
        </div>
        
        <div className="text-center mb-8">
          <h1 className="calligraphy-title text-4xl mb-2 text-primary">
            Nani Wellness
          </h1>
          <p className="nani-description text-lg">
            Your holistic wellness companion for mind, body, and soul
          </p>
        </div>

        <Card className="h-[600px] shadow-warm">
          <CardHeader className="pb-4 flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Heart className="h-5 w-5 text-primary" />
              Wellness Chat with Nani
            </CardTitle>
            <Button
              variant="outline"
              size="sm"
              onClick={startNewChat}
              className="gap-2"
            >
              <RotateCcw className="h-4 w-4" />
              Start New Chat
            </Button>
          </CardHeader>
          
          <CardContent className="flex flex-col h-full pb-4">
            <div className="flex-1 overflow-y-auto space-y-4 mb-4">
              {messages.map((message) => (
                <div key={message.id} className={`flex gap-3 ${message.isUser ? 'justify-end' : 'justify-start'}`}>
                  <div className={`chat-bubble ${message.isUser ? 'chat-bubble-user' : 'chat-bubble-bot'} text-sm`}>
                    {renderMessage(message)}
                    {!message.isUser && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="mt-2 h-6 px-2 hover:bg-primary-foreground/10 transition-smooth"
                        onClick={() => handleStar(message)}
                      >
                        <Star className={`h-3 w-3 transition-all ${message.starred ? 'fill-current text-yellow-400 scale-110' : 'hover:text-yellow-400'}`} />
                        <span className="ml-1 text-xs">
                          {message.starred ? 'Starred' : 'Star'}
                        </span>
                      </Button>
                    )}
                  </div>
                </div>
              ))}
              
              {isLoading && (
                <div className="flex justify-start">
                  <div className="chat-bubble chat-bubble-bot">
                    <div className="thinking-dots">
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>
            
            <div className="flex gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && handleSend()}
                placeholder="Tell Nani about your wellness needs... 🌸"
                className="flex-1 border-primary/20 focus:border-primary"
                disabled={isLoading}
              />
              <Button 
                onClick={handleSend} 
                disabled={isLoading || !input.trim()}
                className="btn-nani px-6"
              >
                {isLoading ? (
                  <div className="thinking-dots">
                    <span></span><span></span><span></span>
                  </div>
                ) : (
                  <>
                    <Send className="h-4 w-4 mr-1" />
                    Send
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default NaniWellnessPage;