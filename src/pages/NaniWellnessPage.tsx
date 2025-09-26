import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, Send, Star, ArrowLeft } from "lucide-react";
import { Header } from "@/components/Header";
import wellnessData from "@/data/wellness.json";

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
  starred?: boolean;
}

const NaniWellnessPage = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Namaste beta! I'm here to help with your wellness journey - whether it's stress, anxiety, fitness, or finding inner peace. Tell me what's weighing on your heart today? 💛",
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
    const input_lower = userInput.toLowerCase();
    
    // Search through wellness data
    const matchedWellness = wellnessData.wellness.find(item => 
      item.keywords.some(keyword => input_lower.includes(keyword.toLowerCase()))
    );

    if (matchedWellness) {
      return `**${matchedWellness.problem.toUpperCase()} - Nani's Wellness Guide! 🌸**

${matchedWellness.exercise}

**💡 Additional Tips:**
${matchedWellness.extra_info}

${matchedWellness.escalation && matchedWellness.escalation.length > 0 ? 
`**⚠️ Professional Help Needed:** ${matchedWellness.escalation.join(', ')}` : ''}

*Remember beta, wellness is a journey, not a destination. I'm here with you! 🧡*`;
    }
    
    // Default wellness response
    return `**Beta, I understand you're looking for wellness guidance! 💛**

**Mental Wellness I Can Help With:**
• **Stress & Anxiety** - Breathing exercises, grounding techniques
• **Low Mood** - Mood-lifting practices, positive habits
• **Sleep Issues** - Relaxation routines, bedtime rituals
• **Confidence** - Self-affirmation exercises
• **Anger Management** - Calming techniques

**Physical Wellness & Fitness:**
• **Gentle Yoga** - Morning stretches, evening relaxation
• **Breathing Exercises** - Pranayama, stress relief
• **Posture Improvement** - Simple exercises for back and neck
• **Energy Boosting** - Natural ways to feel more active
• **Women's Health** - Holistic wellness approaches

**Try asking:**
"Nani, I feel stressed"
"Help me with morning yoga"
"I can't sleep well"
"How to boost my confidence"

*What's troubling your heart today, beta? 🌿*`;
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

  const handleStar = (message: Message) => {
    const updatedMessage = { ...message, starred: true };
    setMessages(prev => prev.map(m => m.id === message.id ? updatedMessage : m));
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
              Nani Wellness
            </h1>
            <p className="text-lg text-muted-foreground">
              Your holistic wellness companion for mind, body, and soul
            </p>
          </div>
        </div>

        <Card className="h-[600px]">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2">
              <Heart className="h-5 w-5 text-primary" />
              Wellness Chat with Nani
            </CardTitle>
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
                        className="mt-2 h-6 px-2 hover:bg-primary-foreground/10"
                        onClick={() => handleStar(message)}
                      >
                        <Star className={`h-3 w-3 ${message.starred ? 'fill-current text-yellow-400' : ''}`} />
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
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Tell Nani about your wellness needs..."
                className="flex-1"
                disabled={isLoading}
              />
              <Button onClick={handleSend} disabled={isLoading || !input.trim()}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default NaniWellnessPage;