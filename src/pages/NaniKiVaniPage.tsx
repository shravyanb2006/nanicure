import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mic, MicOff, ArrowLeft, Volume2 } from "lucide-react";
import { Header } from "@/components/Header";

const NaniKiVaniPage = () => {
  const navigate = useNavigate();
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const startListening = () => {
    setIsListening(true);
    setTranscript("");
    setResponse("");
    
    // Simulate speech recognition
    setTimeout(() => {
      setTranscript("Nani, I have a headache and feeling tired");
      setIsListening(false);
      generateVoiceResponse("headache and feeling tired");
    }, 3000);
  };

  const stopListening = () => {
    setIsListening(false);
  };

  const generateVoiceResponse = (input: string) => {
    setIsLoading(true);
    
    setTimeout(() => {
      const response = `Arre beta, headache aur tiredness ka matlab hai you need rest! 

**Immediate Relief:**
• Take rest in a dark, quiet room
• Apply cold compress on forehead
• Drink plenty of warm water
• Gently massage your temples

**Nani's Special Tea:**
• Boil ginger with tulsi leaves
• Add honey when it cools down
• Drink slowly twice today

**Important:** If headache is severe or doesn't go away, please see a doctor beta!

Rest well, main tumhare saath hun! 💛`;
      
      setResponse(response);
      setIsLoading(false);
      
      // Simulate text-to-speech
      if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance("Beta, for headache take rest and apply cold compress on forehead. Drink ginger tea with honey. If pain is severe, see doctor. Main tumhare saath hun!");
        utterance.rate = 0.8;
        utterance.pitch = 1.1;
        speechSynthesis.speak(utterance);
      }
    }, 2000);
  };

  const renderResponse = (text: string) => {
    return text.split('\n').map((line, index) => {
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
              Nani ki Vani
            </h1>
            <p className="text-lg text-muted-foreground">
              Because sometimes, healing begins with a gentle voice
            </p>
          </div>
        </div>

        <div className="grid gap-6">
          {/* Voice Input Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Volume2 className="h-5 w-5 text-primary" />
                Voice Chat with Nani
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <div className="mb-6">
                <Button
                  size="lg"
                  variant={isListening ? "destructive" : "default"}
                  onClick={isListening ? stopListening : startListening}
                  className="w-32 h-32 rounded-full"
                  disabled={isLoading}
                >
                  {isListening ? (
                    <MicOff className="h-12 w-12" />
                  ) : (
                    <Mic className="h-12 w-12" />
                  )}
                </Button>
              </div>
              
              <p className="text-sm text-muted-foreground mb-4">
                {isListening ? "Listening... Speak now" : "Press and hold to speak with Nani"}
              </p>
              
              {transcript && (
                <div className="bg-muted p-4 rounded-lg mb-4">
                  <p className="text-sm"><strong>You said:</strong> {transcript}</p>
                </div>
              )}
              
              {isLoading && (
                <div className="text-center text-muted-foreground">
                  <p>Nani is thinking... 🤔</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Response Card */}
          {response && (
            <Card>
              <CardHeader>
                <CardTitle>Nani's Voice Response</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-gradient-warm p-6 rounded-lg">
                  <div className="whitespace-pre-wrap text-sm">
                    {renderResponse(response)}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Instructions Card */}
          <Card>
            <CardHeader>
              <CardTitle>How to Use</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>• Press the microphone button and speak your health concern</p>
                <p>• Nani will listen and provide voice guidance</p>
                <p>• Responses are also shown as text for easy reference</p>
                <p>• For best results, speak clearly and mention specific symptoms</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default NaniKiVaniPage;