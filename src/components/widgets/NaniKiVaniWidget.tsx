import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mic, MicOff, Volume2, VolumeX } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Extend Window interface for speech recognition
declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

export function NaniKiVaniWidget() {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const [lastResponse, setLastResponse] = useState("");
  const recognitionRef = useRef<any>(null);
  const { toast } = useToast();

  const startListening = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      toast({
        title: "Sorry beta!",
        description: "Voice recognition not supported in this browser",
        variant: "destructive",
      });
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.lang = 'en-IN';

    recognition.onstart = () => {
      setIsListening(true);
      setTranscript("Listening...");
    };

    recognition.onresult = (event) => {
      const result = event.results[0][0].transcript;
      setTranscript(result);
    };

    recognition.onend = () => {
      setIsListening(false);
      if (transcript && transcript !== "Listening...") {
        generateVoiceResponse(transcript);
      }
    };

    recognition.onerror = (event) => {
      setIsListening(false);
      toast({
        title: "Nani couldn't hear you",
        description: "Please try again, speak clearly beta",
        variant: "destructive",
      });
    };

    recognitionRef.current = recognition;
    recognition.start();
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
  };

  const generateVoiceResponse = (userInput: string) => {
    const input_lower = userInput.toLowerCase();
    let response = "";
    
    if (input_lower.includes('cold') || input_lower.includes('cough')) {
      response = `Beta, for cold and cough, take one teaspoon honey with quarter teaspoon turmeric and a pinch of black pepper in warm water. Drink this three times daily. Also prepare Nani's special kadha by boiling ginger, tulsi leaves, black pepper and cinnamon in water for ten minutes. Add honey when cool and drink twice daily. Keep your body warm and avoid cold drinks. Get well soon beta!`;
    } else if (input_lower.includes('headache')) {
      response = `Arre beta, for headache, apply peppermint oil or balm on your temples. Drink one glass of warm water immediately. Gently massage your head with coconut oil for five minutes. Press the area between your thumb and index finger for two minutes. Rest in a dark, quiet room. Your headache will go away soon, don't worry!`;
    } else if (input_lower.includes('stomach') || input_lower.includes('acidity')) {
      response = `Beta, for stomach problems, take a pinch of hing with warm water. Drink jeera water - boil cumin seeds and drink when cool. Take ginger and lemon in warm water. After meals, chew fennel seeds. Drink buttermilk with roasted cumin powder. For acidity, drink cold milk with one teaspoon ghee or coconut water. Take care of your eating habits beta!`;
    } else {
      response = `Beta, I heard you say ${userInput}. Let me help you with home remedies. For any health problem, I have natural solutions. You can ask me about cold, cough, headache, stomach problems, skin issues, or sleep problems. I'm your caring Nani, always here to help you feel better with love and traditional wisdom!`;
    }

    setLastResponse(response);
    speakResponse(response);
  };

  const speakResponse = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.8;
      utterance.pitch = 1.0;
      utterance.volume = 1.0;
      
      // Try to use an Indian English voice
      const voices = speechSynthesis.getVoices();
      const indianVoice = voices.find(voice => 
        voice.lang.includes('en-IN') || 
        voice.name.includes('Indian') ||
        voice.name.includes('Ravi') ||
        voice.name.includes('female')
      );
      
      if (indianVoice) {
        utterance.voice = indianVoice;
      }

      utterance.onstart = () => setIsPlaying(true);
      utterance.onend = () => setIsPlaying(false);
      
      speechSynthesis.speak(utterance);
    }
  };

  const stopSpeaking = () => {
    speechSynthesis.cancel();
    setIsPlaying(false);
  };

  return (
    <Card className="widget-card h-96">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2">
          <Volume2 className="h-5 w-5 text-primary" />
          Nani ki Vani
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Because sometimes, healing begins with a gentle voice
        </p>
      </CardHeader>
      
      <CardContent className="flex flex-col h-full pb-4">
        <div className="flex-1 flex flex-col items-center justify-center space-y-6">
          {/* Voice Animation */}
          <div className={`w-24 h-24 rounded-full bg-primary/20 flex items-center justify-center ${isListening ? 'voice-pulse' : ''}`}>
            {isListening ? (
              <Mic className="h-12 w-12 text-primary" />
            ) : (
              <MicOff className="h-12 w-12 text-muted-foreground" />
            )}
          </div>

          {/* Status Text */}
          <div className="text-center">
            {isListening && (
              <p className="text-lg font-medium text-primary mb-2">
                Listening... 👂
              </p>
            )}
            
            {transcript && (
              <p className="text-sm text-muted-foreground bg-muted p-3 rounded-lg max-w-xs">
                "{transcript}"
              </p>
            )}
            
            {isPlaying && (
              <p className="text-lg font-medium text-primary">
                Nani is speaking... 🗣️
              </p>
            )}
          </div>

          {/* Last Response */}
          {lastResponse && !isPlaying && (
            <div className="text-xs text-muted-foreground text-center max-w-xs bg-accent/50 p-2 rounded">
              Last advice: "{lastResponse.slice(0, 100)}..."
            </div>
          )}
        </div>
        
        {/* Controls */}
        <div className="flex gap-4 justify-center">
          {!isListening ? (
            <Button onClick={startListening} className="btn-nani">
              <Mic className="h-4 w-4 mr-2" />
              Speak to Nani
            </Button>
          ) : (
            <Button onClick={stopListening} variant="outline">
              <MicOff className="h-4 w-4 mr-2" />
              Stop Listening
            </Button>
          )}
          
          {isPlaying && (
            <Button onClick={stopSpeaking} variant="outline">
              <VolumeX className="h-4 w-4 mr-2" />
              Stop Speaking
            </Button>
          )}
          
          {lastResponse && !isPlaying && (
            <Button onClick={() => speakResponse(lastResponse)} variant="secondary">
              <Volume2 className="h-4 w-4 mr-2" />
              Repeat
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}