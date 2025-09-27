import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageCircle, Send, Star, ArrowLeft, RotateCcw } from "lucide-react";
import { HamburgerMenu } from "@/components/HamburgerMenu";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { comprehensiveRemedyEngine } from '@/utils/comprehensiveRemedyEngine';
import { profileManager } from '@/utils/profileManager';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
  starred?: boolean;
}

const NaniKeNuskePage = () => {
  const navigate = useNavigate();
  const profile = profileManager.getProfile();
  const [selectedRegion, setSelectedRegion] = useState(profile?.region || "");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: `Namaste ${profile?.name ? profile.name + ' ' : ''}beta! I'm your Nani, ready with home remedies for all your problems. Tell me what's troubling you today? 💛`,
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
    comprehensiveRemedyEngine.clearSession();
    setMessages([
      {
        id: '1',
        text: `Namaste ${profile?.name ? profile.name + ' ' : ''}beta! I'm your Nani, ready with home remedies for all your problems. Tell me what's troubling you today? 💛`,
        isUser: false,
        timestamp: new Date(),
      }
    ]);
    setInput("");
  };

  const generateNaniResponse = (userInput: string): string => {
    const inputLower = userInput.toLowerCase();
    
    // Import and use original remedies format
    const findMatchingRemedy = (input: string): string => {
      // Simple keyword matching for common health issues
      if (input.includes('cold') || input.includes('cough') || input.includes('fever')) {
        return `**Arre beta, cold aur cough ka nuskha! 🤧**

**सरल घरेलू नुस्खा:**
• **1 चम्मच शहद + 1/4 चम्मच हल्दी + चुटकी भर काली मिर्च** को गुनगुने पानी में मिलाएं
• दिन में **3 बार** पिएं  
• हर 2 घंटे में **नमक के गुनगुने पानी** से गरारे करें
• **अदरक की चाय** पिएं
• भाप लें और आराम करें

**⏰ कब तक:** 3-5 दिन
**⚠️ सावधानी:** 1 साल से छोटे बच्चों को शहद न दें

Beta, ठंड से बचें और गर्म कपड़े पहनें! 💛`;
      }
      
      if (input.includes('headache') || input.includes('head pain') || input.includes('sir') || input.includes('dard')) {
        return `**Arre beta, sir dard ki samasyaa! 🤕**

**तुरंत आराम के लिए:**
• सिर पर **ठंडी या गर्म पट्टी** रखें (जो आराम दे)
• **कनपटी पर हल्की मालिश** करें
• **अदरक की चाय** पिएं
• अंधेरे कमरे में **आराम** करें
• पर्याप्त **पानी** पिएं

**⚠️ डॉक्टर से मिलें अगर:** अचानक तेज़ दर्द हो या उल्टी के साथ हो

Beta, stress kam karo aur proper neend lo! 💛`;
      }
      
      if (input.includes('stomach') || input.includes('pet') || input.includes('acidity') || input.includes('gas')) {
        return `**Beta, pet ki taklif ka ilaaj! 🤱**

**घरेलू उपाय:**
• **अजवाइन** को गुनगुने पानी में उबालकर पिएं
• **जीरा पाउडर + नींबू** पानी में मिलाकर लें
• **छाछ** पिएं
• हल्का खाना खाएं (**खिचड़ी, दलिया**)
• **पेट की मालिश** हल्के हाथों से करें

**बचें:** तली हुई चीज़ों से, मसालेदार खाने से

Beta, khana dhire dhire khao aur paani zyada piyo! 💛`;
      }

      if (input.includes('throat') || input.includes('gala') || input.includes('sore')) {
        return `**Beta, gale ki kharash ka nuskha! 😷**

**गले को राहत देने के लिए:**
• **नमक के गुनगुने पानी** से दिन में 3-4 बार गरारे करें
• **शहद + हल्दी** चाटें
• **अदरक की चाय** में **शहद** मिलाकर पिएं
• **गर्म पानी** पिते रहें
• बर्फ़ या ठंडी चीज़ें न लें

**⚠️ सावधानी:** निगलने में परेशानी हो तो डॉक्टर से मिलें

Beta, garam paani se gargle zaroor karna! 💛`;
      }

      // Generic helpful response for other queries
      return `Arre beta, I want to help you with that! Can you tell me more specifically about what health problem you're facing? For example:

• **"Nani, mere sir mein dard hai"** (headache)
• **"Mera pet kharab hai"** (stomach upset)  
• **"Mujhe neend nahi aa rahi"** (can't sleep)
• **"Mujhe zukam-khansi hai"** (cold and cough)

The more details you give, the better remedy I can suggest! 💛

**मैं इन समस्याओं में मदद कर सकती हूं:**
🌿 सर दर्द, बुखार, जुकाम-खांसी
🌿 पेट की समस्याएं, acidity, कब्ज़ 
🌿 त्वचा की समस्याएं, बाल झड़ना
🌿 नींद न आना, तनाव, कमज़ोरी

**बस विस्तार से बताएं कि क्या समस्या है!** 🤗`;
    };
    
    return findMatchingRemedy(inputLower);
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
    
    // Save to starred remedies
    if (!message.isUser) {
      profileManager.addStarredRemedy({
        id: message.id,
        title: 'Nani ka Nuskha',
        content: message.text,
        timestamp: message.timestamp,
        category: 'remedy'
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
            onClick={() => navigate('/')}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
          
          <div className="flex items-center gap-4">
            <HamburgerMenu currentPage="nani-ke-nuske" />
            
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
          <span>🌿</span>
        </div>
        
        <div className="text-center mb-8">
          <h1 className="calligraphy-title text-4xl mb-2 text-primary">
            Nani ke Nuske
          </h1>
          <p className="nani-description text-lg">
            Your pocket nani, ready with a nuskha for every problem
          </p>
        </div>

        <Card className="h-[600px] shadow-warm">
          <CardHeader className="pb-4 flex flex-row items-center justify-between">
            <div className="flex items-center gap-3">
              <MessageCircle className="h-5 w-5 text-primary" />
              <div>
                <CardTitle>Chat with Nani</CardTitle>
                <p className="text-sm text-muted-foreground">Your pocket grandmother 💛</p>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={startNewChat}
              className="gap-2"
            >
              <RotateCcw className="h-4 w-4" />
              New Chat
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
                placeholder="Ask Nani about any health problem... 💛"
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

export default NaniKeNuskePage;