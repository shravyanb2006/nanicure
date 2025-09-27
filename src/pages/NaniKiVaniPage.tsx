import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mic, MicOff, Volume2, VolumeX, ArrowLeft, RotateCcw, Menu } from "lucide-react";
import { Header } from "@/components/Header";
import { SideMenu } from "@/components/SideMenu";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { generateVoiceResponse, speakText } from "@/utils/voiceEngine";

const NaniKiVaniPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedRegion, setSelectedRegion] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [response, setResponse] = useState("");
  const [lastResponse, setLastResponse] = useState("");
  const [audioLock, setAudioLock] = useState(false);
  const [showSideMenu, setShowSideMenu] = useState(false);
  
  const recognitionRef = useRef<any>(null);
  const silenceTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      stopListening();
      stopSpeaking();
    };
  }, []);

  const startListening = async () => {
    if (audioLock || isSpeaking) {
      toast({
        title: "Please wait beta",
        description: "Nani is still speaking, please wait for her to finish",
      });
      return;
    }

    try {
      // Request microphone permission
      await navigator.mediaDevices.getUserMedia({ audio: true });
      
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      
      if (!SpeechRecognition) {
        toast({
          title: "Speech recognition not supported",
          description: "Please try typing your question instead",
          variant: "destructive",
        });
        return;
      }

      const recognition = new SpeechRecognition();
      recognitionRef.current = recognition;

      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'en-IN';

      recognition.onstart = () => {
        setIsListening(true);
        setTranscript("");
        setResponse("");
      };

      recognition.onresult = (event) => {
        if (audioLock) return; // Prevent processing during TTS
        
        let interimTranscript = '';
        let finalTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += transcript;
          } else {
            interimTranscript += transcript;
          }
        }

        setTranscript(finalTranscript + interimTranscript);

        // Clear previous timeout
        if (silenceTimeoutRef.current) {
          clearTimeout(silenceTimeoutRef.current);
        }

        // Auto-stop after 3 seconds of silence
        silenceTimeoutRef.current = setTimeout(() => {
          if (finalTranscript.trim()) {
            handleVoiceInput(finalTranscript);
          }
        }, 3000);
      };

      recognition.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
        
        if (event.error === 'no-speech') {
          toast({
            title: "I didn't catch that",
            description: "Could you repeat slowly beta?",
          });
        }
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.start();
      
    } catch (error) {
      console.error('Microphone error:', error);
      toast({
        title: "Microphone access needed",
        description: "Please allow microphone access to talk with Nani",
        variant: "destructive",
      });
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      recognitionRef.current = null;
    }
    if (silenceTimeoutRef.current) {
      clearTimeout(silenceTimeoutRef.current);
    }
    setIsListening(false);
  };

  const handleVoiceInput = async (userInput: string) => {
    if (!userInput.trim()) return;

    stopListening();
    setAudioLock(true);

    try {
      const naniResponse = generateVoiceResponse(userInput, selectedRegion);
      setResponse(naniResponse);
      setLastResponse(naniResponse);
      
      await speakNaniResponse(naniResponse);
    } catch (error) {
      console.error('Voice processing error:', error);
      toast({
        title: "Something went wrong",
        description: "Please try again beta",
        variant: "destructive",
      });
    } finally {
      setAudioLock(false);
    }
  };

  const speakNaniResponse = async (text: string) => {
    setIsSpeaking(true);
    
    try {
      // Use the voice engine utility
      await speakText(text, {
        onStart: () => setIsSpeaking(true),
        onEnd: () => setIsSpeaking(false),
        onError: () => {
          setIsSpeaking(false);
          toast({
            title: "Speech playback failed",
            description: "Text response is still available above",
          });
        }
      });
    } catch (error) {
      setIsSpeaking(false);
      console.error('TTS Error:', error);
    }
  };

  const stopSpeaking = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setIsSpeaking(false);
  };

  const repeatLastResponse = () => {
    if (lastResponse && !isSpeaking) {
      speakNaniResponse(lastResponse);
    }
  };

  const startNewChat = () => {
    stopListening();
    stopSpeaking();
    setTranscript("");
    setResponse("");
    setLastResponse("");
    setAudioLock(false);
    
    toast({
      title: "New conversation started",
      description: "Nani is ready to help you again!",
    });
  };

  const renderResponse = (text: string) => {
    const formattedText = text
      .split('\n')
      .map((line, index) => {
        if (line.includes('**')) {
          const parts = line.split('**');
          return (
            <div key={index} className="mb-2">
              {parts.map((part, partIndex) => 
                partIndex % 2 === 1 ? <strong key={partIndex}>{part}</strong> : part
              )}
            </div>
          );
        }
        return <div key={index} className={line.startsWith('•') ? 'ml-4 mb-1' : 'mb-2'}>{line}</div>;
      });
    
    return <div className="whitespace-pre-wrap">{formattedText}</div>;
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
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowSideMenu(true)}
              className="p-2"
            >
              <Menu className="h-5 w-5" />
            </Button>
            
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
            Nani ki Vani
          </h1>
          <p className="nani-description text-lg">
            Voice chat with your caring virtual grandmother
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            Start a conversation and receive grandmother-approved cures for everyday ailments
          </p>
        </div>

        <div className="grid gap-6">
          {/* Voice Chat Interface */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Mic className="h-5 w-5 text-primary" />
                Voice Chat with Nani
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
            <CardContent className="space-y-6">
              {/* Voice Controls */}
              <div className="flex justify-center items-center gap-4">
                <Button
                  size="lg"
                  onClick={isListening ? stopListening : startListening}
                  disabled={isSpeaking || audioLock}
                  className={`h-16 w-16 rounded-full ${
                    isListening 
                      ? 'bg-red-500 hover:bg-red-600' 
                      : 'bg-primary hover:bg-primary/90'
                  }`}
                >
                  {isListening ? (
                    <MicOff className="h-6 w-6" />
                  ) : (
                    <Mic className="h-6 w-6" />
                  )}
                </Button>

                {lastResponse && (
                  <Button
                    variant="outline"
                    onClick={repeatLastResponse}
                    disabled={isSpeaking || isListening}
                    className="gap-2"
                  >
                    <Volume2 className="h-4 w-4" />
                    Repeat
                  </Button>
                )}

                {isSpeaking && (
                  <Button
                    variant="outline"
                    onClick={stopSpeaking}
                    className="gap-2 text-red-600"
                  >
                    <VolumeX className="h-4 w-4" />
                    Stop
                  </Button>
                )}
              </div>

              {/* Status */}
              <div className="text-center">
                {isListening && (
                  <p className="text-sm text-blue-600 font-medium">
                    🎤 Listening... speak your health concern
                  </p>
                )}
                {isSpeaking && (
                  <p className="text-sm text-green-600 font-medium">
                    🗣️ Nani is speaking...
                  </p>
                )}
                {!isListening && !isSpeaking && (
                  <p className="text-sm text-muted-foreground">
                    Click the microphone to start talking with Nani
                  </p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Transcript */}
          {transcript && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">What you said:</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-base bg-blue-50 p-4 rounded-lg border border-blue-200">
                  "{transcript}"
                </p>
              </CardContent>
            </Card>
          )}

          {/* Nani's Response */}
          {response && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  💛 Nani's Advice
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                  {renderResponse(response)}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Instructions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">How to Use</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div>
                  <h4 className="font-medium mb-2">🎤 Voice Tips:</h4>
                  <ul className="space-y-1 text-muted-foreground">
                    <li>• Speak clearly and slowly</li>
                    <li>• Use headphones to prevent echo</li>
                    <li>• Wait for Nani to finish speaking</li>
                    <li>• Try: "I have a headache"</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium mb-2">💡 Best Results:</h4>
                  <ul className="space-y-1 text-muted-foreground">
                    <li>• Be specific about symptoms</li>
                    <li>• Mention duration if relevant</li>
                    <li>• Ask about one problem at a time</li>
                    <li>• Follow safety recommendations</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <SideMenu 
        currentPage="nani-ki-vani"
        isOpen={showSideMenu}
        onClose={() => setShowSideMenu(false)}
      />
    </div>
  );
};

export default NaniKiVaniPage;