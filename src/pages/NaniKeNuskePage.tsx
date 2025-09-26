import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageCircle, Send, Star, ArrowLeft, RotateCcw } from "lucide-react";
import { Header } from "@/components/Header";
import { HamburgerMenu } from "@/components/HamburgerMenu";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import remediesData from "@/data/remedies.json";

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
  starred?: boolean;
}

const NaniKeNuskePage = () => {
  const navigate = useNavigate();
  const [selectedRegion, setSelectedRegion] = useState("");
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

  const startNewChat = () => {
    setMessages([
      {
        id: '1',
        text: "Namaste beta! I'm your Nani, ready with home remedies for all your problems. Tell me what's troubling you today? 💛",
        isUser: false,
        timestamp: new Date(),
      }
    ]);
    setInput("");
  };

  const generateNaniResponse = (userInput: string): string => {
    const input_lower = userInput.toLowerCase();
    
    // Search through remedies data
    const matchedRemedy = remediesData.remedies.find(remedy => 
      remedy.keywords.some(keyword => input_lower.includes(keyword.toLowerCase()))
    );

    if (matchedRemedy) {
      return `**${matchedRemedy.problem.toUpperCase()} - Nani's Special Remedy! 🌿**

${matchedRemedy.remedy}

**✨ Extra Tips:**
${matchedRemedy.extra_info}

${matchedRemedy.escalation && matchedRemedy.escalation.length > 0 ? 
`**⚠️ Doctor Visit Needed:** ${matchedRemedy.escalation.join(', ')}` : ''}

*Got it beta? Your Nani is always here! 🧡*`;
    }
    
    // Default response for unknown queries
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
        <div className="mb-6 flex items-center justify-between">
          <Button 
            variant="ghost" 
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          
          <div className="flex items-center gap-4">
            <HamburgerMenu currentPage="nani-ke-nuske" />
            
            <Select value={selectedRegion} onValueChange={setSelectedRegion}>
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
        
        <div className="text-center mb-8">
          <h1 className="nani-tagline text-4xl mb-2">
            Nani ke Nuske
          </h1>
          <p className="nani-description text-lg">
            Your pocket nani, ready with a nuskha for every problem
          </p>
        </div>

        <Card className="h-[600px]">
          <CardHeader className="pb-4 flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <MessageCircle className="h-5 w-5 text-primary" />
              Chat with Nani
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
      </div>
    </div>
  );
};

export default NaniKeNuskePage;