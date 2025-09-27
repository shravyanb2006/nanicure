import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Mic, MicOff, Volume2, VolumeX, ArrowLeft, Menu, RotateCcw, Star } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Header } from "@/components/Header";
import { SideMenu } from "@/components/SideMenu";
import { useNavigate } from "react-router-dom";
import { enhancedVoiceEngine, SessionMessage } from "@/utils/enhancedVoiceEngine";
import { profileManager } from "@/utils/profileManager";

export default function NaniKiVaniPage() {
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [response, setResponse] = useState("");
  const [sessionMessages, setSessionMessages] = useState<SessionMessage[]>([]);
  const [selectedRegion, setSelectedRegion] = useState<string>("");
  const [sideMenuOpen, setSideMenuOpen] = useState(false);
  const [waitingForClarification, setWaitingForClarification] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const profile = profileManager.getProfile();
    if (profile?.region) {
      setSelectedRegion(profile.region);
    }
  }, []);

  const headerProps = {
    onMenuClick: () => setSideMenuOpen(true),
    selectedRegion: '',
    onRegionChange: () => {},
    onLoginClick: () => {},
    isLoggedIn: true,
    userName: 'Friend'
  };

  const startListening = async () => {
    if (enhancedVoiceEngine.locked || enhancedVoiceEngine.speaking) {
      toast({
        title: "Please wait",
        description: "Nani is currently speaking. Please wait for her to finish.",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsListening(true);
      setTranscript("Listening...");
      
      await enhancedVoiceEngine.startListening(
        (transcript, isFinal) => {
          setTranscript(transcript);
          if (isFinal && transcript.trim()) {
            handleVoiceInput(transcript);
          }
        },
        (error) => {
          setIsListening(false);
          toast({
            title: "Voice Error",
            description: error,
            variant: "destructive",
          });
        }
      );
    } catch (error) {
      setIsListening(false);
      toast({
        title: "Microphone Error",
        description: "Could not access microphone. Please check permissions.",
        variant: "destructive",
      });
    }
  };

  const stopListening = () => {
    enhancedVoiceEngine.stopListening();
    setIsListening(false);
  };

  const handleVoiceInput = async (userInput: string) => {
    if (!userInput.trim()) return;
    
    setIsListening(false);
    setTranscript(userInput);
    
    try {
      const result = await enhancedVoiceEngine.processUserInput(userInput, selectedRegion);
      setResponse(result.response);
      setWaitingForClarification(result.needsClarification);
      
      // Update session messages
      setSessionMessages(enhancedVoiceEngine.getSessionMessages());
      
      await speakNaniResponse(result.response);
    } catch (error) {
      console.error('Error processing voice input:', error);
      toast({
        title: "Processing Error",
        description: "Could not process your request. Please try again.",
        variant: "destructive",
      });
    }
  };

  const speakNaniResponse = async (text: string) => {
    if (!text) return;
    
    setIsSpeaking(true);
    
    try {
      await enhancedVoiceEngine.speak(
        text,
        () => setIsSpeaking(true),
        () => setIsSpeaking(false),
        (error) => {
          console.error('TTS Error:', error);
          setIsSpeaking(false);
          toast({
            title: "Speech Error",
            description: "Could not speak the response.",
            variant: "destructive",
          });
        }
      );
    } catch (error) {
      setIsSpeaking(false);
    }
  };

  const stopSpeaking = () => {
    enhancedVoiceEngine.stopSpeaking();
    setIsSpeaking(false);
  };

  const repeatLastResponse = () => {
    if (response) {
      speakNaniResponse(response);
    }
  };

  const startNewChat = () => {
    setTranscript("");
    setResponse("");
    setIsSpeaking(false);
    setIsListening(false);
    setWaitingForClarification(false);
    setSessionMessages([]);
    enhancedVoiceEngine.stopSpeaking();
    enhancedVoiceEngine.stopListening();
    enhancedVoiceEngine.clearSession();
    
    toast({
      title: "New Chat Started",
      description: "Conversation cleared. Ready for your next question!",
    });
  };

  const starMessage = (message: SessionMessage) => {
    if (message.remedy) {
      profileManager.addStarredMessage({
        id: message.id,
        text: message.text,
        timestamp: message.timestamp,
        type: 'remedy',
        source: 'voice'
      });
      
      toast({
        title: "Remedy Starred",
        description: "Added to your starred remedies!",
      });
    }
  };

  const goToDashboard = () => {
    navigate('/dashboard');
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
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/20 to-background">
      <Header {...headerProps} />
      <SideMenu isOpen={sideMenuOpen} onClose={() => setSideMenuOpen(false)} />
      
      <main className="container mx-auto px-4 py-8">
        {/* Back Button & Menu */}
        <div className="flex items-center justify-between mb-6">
          <Button
            variant="outline"
            onClick={goToDashboard}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Button>
          
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setSideMenuOpen(true)}
              className="lg:hidden"
            >
              <Menu className="h-4 w-4" />
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

        {/* Page Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-primary mb-2">Nani Ki Vani</h1>
          <p className="text-lg text-muted-foreground">
            Voice chat with your caring virtual grandmother
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            Speak your health concerns and receive personalized home remedies
          </p>
        </div>

        {/* Session Messages */}
        {sessionMessages.length > 0 && (
          <Card className="mb-6 border-primary/20 bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-primary">Conversation with Nani</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 max-h-96 overflow-y-auto">
              {sessionMessages.map((message, index) => (
                <div
                  key={message.id}
                  className={`p-3 rounded-lg ${
                    message.sender === 'user'
                      ? 'bg-primary/10 ml-8'
                      : 'bg-accent/30 mr-8'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="font-medium mb-1">
                        {message.sender === 'user' ? 'You' : 'Nani'}
                      </div>
                      <div className="prose prose-sm max-w-none">
                        {renderResponse(message.text)}
                      </div>
                    </div>
                    {message.remedy && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => starMessage(message)}
                        className="ml-2 shrink-0"
                      >
                        <Star className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        )}

        {/* Current Response Card */}
        {response && !sessionMessages.some(m => m.text === response) && (
          <Card className="mb-6 border-primary/20 bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-primary">Nani's Latest Advice</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="prose prose-sm max-w-none">
                {renderResponse(response)}
              </div>
              
              {/* Voice Controls */}
              <div className="flex gap-2 mt-4 pt-4 border-t">
                {!isSpeaking ? (
                  <Button
                    onClick={repeatLastResponse}
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-2"
                  >
                    <Volume2 className="h-4 w-4" />
                    Repeat
                  </Button>
                ) : (
                  <Button
                    onClick={stopSpeaking}
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-2"
                  >
                    <VolumeX className="h-4 w-4" />
                    Stop
                  </Button>
                )}
                
                <Button
                  onClick={startNewChat}
                  variant="outline"
                  size="sm" 
                  className="flex items-center gap-2"
                >
                  <RotateCcw className="h-4 w-4" />
                  New Chat
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Voice Interface Card */}
        <Card className="mb-6">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Mic className="h-5 w-5 text-primary" />
              Voice Chat Interface
            </CardTitle>
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
          <CardContent className="space-y-6">
            {/* Voice Controls */}
            <div className="flex justify-center items-center gap-4">
              <Button
                size="lg"
                onClick={isListening ? stopListening : startListening}
                disabled={isSpeaking || enhancedVoiceEngine.locked}
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

              {response && (
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
              {waitingForClarification && (
                <p className="text-sm text-orange-600 font-medium">
                  💬 Nani needs more details to help you better
                </p>
              )}
              {!isListening && !isSpeaking && !waitingForClarification && (
                <p className="text-sm text-muted-foreground">
                  Click the microphone to start talking with Nani
                </p>
              )}
            </div>

            {/* Current Transcript */}
            {transcript && transcript !== "Listening..." && (
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <p className="text-sm font-medium mb-1">You said:</p>
                <p className="text-base">"{transcript}"</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Instructions */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">How to Use Voice Chat</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div>
                <h4 className="font-medium mb-2 text-primary">🎤 Voice Tips:</h4>
                <ul className="space-y-1 text-muted-foreground">
                  <li>• Speak clearly and slowly</li>
                  <li>• Use headphones to prevent echo</li>
                  <li>• Wait for Nani to finish speaking</li>
                  <li>• Try: "I have a headache since morning"</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-2 text-primary">💡 Best Results:</h4>
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
      </main>
    </div>
  );
}