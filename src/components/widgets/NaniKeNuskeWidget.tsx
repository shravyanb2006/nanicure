import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageCircle, Send, Star, BookOpen } from "lucide-react";

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
  starred?: boolean;
}

interface NaniKeNuskeWidgetProps {
  onStarMessage: (message: Message) => void;
}

export function NaniKeNuskeWidget({ onStarMessage }: NaniKeNuskeWidgetProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Namaste beta! I'm your Nani, ready with home remedies for all your problems. Tell me what's troubling you today? 💛",
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

  const generateNaniResponse = (userInput: string): string => {
    const input_lower = userInput.toLowerCase();
    
    if (input_lower.includes('cold') || input_lower.includes('cough') || input_lower.includes('fever')) {
      return `**Arre beta, cold aur cough ka nuskha! 🤧**

**Immediate Relief:**
• Mix **1 tsp honey + 1/4 tsp turmeric + pinch of black pepper** in warm water
• Drink this **3 times daily**
• Gargle with **warm salt water** every 2 hours

**Nani's Special Kadha:**
• Boil **ginger, tulsi leaves, black pepper, cinnamon** in water for 10 minutes
• Add honey when cool
• Drink **twice daily**

**Rest Tips:**
• Sleep with head slightly elevated
• Steam inhalation with eucalyptus oil
• Keep body warm, avoid cold drinks

**⚠️ Doctor Visit:** If fever above 101°F for 3+ days, see a doctor immediately!

*Got it beta? Your Nani is always here! 🧡*`;
    }
    
    if (input_lower.includes('headache') || input_lower.includes('head pain')) {
      return `**Beta, headache ka instant relief! 🤕**

**Quick Remedies:**
• Apply **peppermint oil** or **balm** on temples
• Drink **1 glass warm water** immediately 
• **Head massage** with coconut oil for 5 minutes

**Nani's Pressure Points:**
• Gently press area between **thumb and index finger** for 2 minutes
• Massage **temples** in circular motion
• Press **center of forehead** gently

**Natural Relief:**
• **Cold compress** on forehead for 15 minutes
• **Ginger tea** with honey
• Rest in **dark, quiet room**

**⚠️ Warning:** Severe headaches or with vision problems - see doctor immediately!

*Tension kam karo beta, everything will be fine! 🙏*`;
    }

    if (input_lower.includes('stomach') || input_lower.includes('acidity') || input_lower.includes('gas')) {
      return `**Stomach problems ka nuskha, mere pyare! 🤱**

**Instant Relief:**
• **Hing (asafoetida)** pinch with warm water
• **Jeera water** - boil and drink when cool
• **Ginger + lemon** in warm water

**Nani's Digestive Mix:**
• **1 tsp fennel seeds** after meals
• **Buttermilk** with roasted cumin powder
• **Mint leaves** chew or make tea

**For Acidity:**
• **Cold milk** with 1 tsp ghee
• **Coconut water** - very cooling
• Avoid spicy, oily foods

**Gentle Position:**
• Lie on **left side** for gas relief
• Light walking after meals
• Eat smaller, frequent meals

*Dhyan rakho beta, khana time pe khana! 💛*`;
    }

    // Default response for other queries
    return `**Beta, main samjhi! Let me help you! 💛**

**Common Home Remedies I Know:**
• **Colds & Cough** - Honey, turmeric, ginger
• **Headaches** - Peppermint oil, head massage  
• **Stomach Issues** - Jeera water, hing, mint
• **Skin Problems** - Turmeric, neem, rose water
• **Sleep Issues** - Warm milk, meditation
• **Minor Cuts** - Turmeric, honey, clean cloth

**Ask me specifically about:**
"Nani, I have a headache"
"How to cure cold naturally?"
"Home remedy for acidity"

**⚠️ Remember:** For serious symptoms, always consult a doctor first!

*What specific problem do you have beta? Main help karungi! 🧡*`;
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

    // Simulate AI thinking time
    setTimeout(() => {
      const naniResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: generateNaniResponse(input),
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
    onStarMessage(updatedMessage);
  };

  const renderMessage = (message: Message) => {
    const isMarkdown = message.text.includes('**');
    
    if (isMarkdown) {
      // Simple markdown parsing for bold text
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
    <Card className="widget-card h-96">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2">
          <MessageCircle className="h-5 w-5 text-primary" />
          Nani ke Nuske
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Your pocket nani, ready with a nuskha for every problem
        </p>
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
                    <Star className={`h-3 w-3 ${message.starred ? 'fill-current text-primary' : ''}`} />
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
            placeholder="Ask Nani about any health problem..."
            className="flex-1"
            disabled={isLoading}
          />
          <Button onClick={handleSend} disabled={isLoading || !input.trim()}>
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}