// Enhanced voice engine with anti-feedback and Nani personality

interface VoiceSettings {
  rate: number;
  pitch: number;
  volume: number;
  lang: string;
}

class NaniVoiceEngine {
  private recognition: any = null;
  private synthesis: SpeechSynthesis;
  private isListening: boolean = false;
  private isSpeaking: boolean = false;
  private audioLock: boolean = false;
  private lastUtterance: SpeechSynthesisUtterance | null = null;
  
  private settings: VoiceSettings = {
    rate: 0.95,
    pitch: 1.1,
    volume: 1.0,
    lang: 'en-IN'
  };

  constructor() {
    this.synthesis = window.speechSynthesis;
    
    // Initialize speech recognition if available
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      this.recognition = new SpeechRecognition();
      this.setupRecognition();
    }
  }

  private setupRecognition() {
    if (!this.recognition) return;
    
    this.recognition.continuous = false;
    this.recognition.interimResults = true;
    this.recognition.lang = this.settings.lang;
    this.recognition.maxAlternatives = 1;
  }

  // Get the best available voice for Nani
  private getBestVoice(): SpeechSynthesisVoice | null {
    const voices = this.synthesis.getVoices();
    
    // Prefer Indian English voices
    let preferredVoice = voices.find(voice => 
      voice.lang.includes('en-IN') && voice.name.includes('female')
    ) || voices.find(voice => 
      voice.lang.includes('en-IN')
    );
    
    // Fallback to English voices with female preference
    if (!preferredVoice) {
      preferredVoice = voices.find(voice => 
        voice.lang.includes('en') && 
        (voice.name.toLowerCase().includes('female') || 
         voice.name.toLowerCase().includes('woman') ||
         voice.name.toLowerCase().includes('sarah') ||
         voice.name.toLowerCase().includes('alice'))
      );
    }
    
    // Final fallback to any English voice
    if (!preferredVoice) {
      preferredVoice = voices.find(voice => voice.lang.includes('en'));
    }
    
    return preferredVoice || voices[0] || null;
  }

  // Start listening with feedback prevention
  async startListening(
    onResult: (transcript: string, isFinal: boolean) => void,
    onError: (error: string) => void
  ): Promise<boolean> {
    
    if (!this.recognition) {
      onError("Voice recognition not supported in this browser, beta!");
      return false;
    }

    if (this.isListening || this.audioLock) {
      return false;
    }

    try {
      // Request microphone permission
      await navigator.mediaDevices.getUserMedia({ audio: true });
      
      // Stop any ongoing speech first
      this.stopSpeaking();
      
      // Set audio lock to prevent TTS feedback
      this.audioLock = true;
      this.isListening = true;

      this.recognition.onstart = () => {
        console.log('Voice recognition started');
      };

      this.recognition.onresult = (event: any) => {
        const result = event.results[event.results.length - 1];
        const transcript = result.transcript;
        const isFinal = result.isFinal;
        
        // Only process if not in audio lock
        if (!this.isSpeaking) {
          onResult(transcript, isFinal);
        }
        
        if (isFinal) {
          this.stopListening();
        }
      };

      this.recognition.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        this.stopListening();
        
        if (event.error === 'no-speech') {
          onError("I didn't hear anything, beta. Could you try again?");
        } else if (event.error === 'audio-capture') {
          onError("Microphone not available. Please check permissions.");
        } else {
          onError("Sorry beta, there was an issue with voice recognition. Please try typing instead.");
        }
      };

      this.recognition.onend = () => {
        this.isListening = false;
        this.audioLock = false;
      };

      // Start recognition with a small delay to avoid immediate feedback
      setTimeout(() => {
        if (this.recognition && !this.isSpeaking) {
          this.recognition.start();
        }
      }, 100);

      return true;
      
    } catch (error) {
      this.isListening = false;
      this.audioLock = false;
      onError("Microphone permission denied. Please allow microphone access.");
      return false;
    }
  }

  // Stop listening
  stopListening(): void {
    if (this.recognition && this.isListening) {
      this.recognition.stop();
    }
    this.isListening = false;
    // Keep audio lock briefly to prevent immediate restart
    setTimeout(() => {
      this.audioLock = false;
    }, 500);
  }

  // Speak with Nani's voice characteristics
  async speak(
    text: string,
    onStart?: () => void,
    onEnd?: () => void,
    onError?: (error: string) => void
  ): Promise<void> {
    
    // Stop any ongoing speech and listening
    this.stopSpeaking();
    this.stopListening();
    
    // Set speaking lock
    this.isSpeaking = true;
    this.audioLock = true;

    return new Promise((resolve, reject) => {
      try {
        // Process text for more natural speech
        const processedText = this.processTextForSpeech(text);
        
        const utterance = new SpeechSynthesisUtterance(processedText);
        
        // Apply Nani voice settings
        utterance.rate = this.settings.rate;
        utterance.pitch = this.settings.pitch;
        utterance.volume = this.settings.volume;
        utterance.lang = this.settings.lang;
        
        // Set the best available voice
        const voice = this.getBestVoice();
        if (voice) {
          utterance.voice = voice;
        }

        utterance.onstart = () => {
          onStart?.();
        };

        utterance.onend = () => {
          this.isSpeaking = false;
          setTimeout(() => {
            this.audioLock = false;
          }, 200); // Small delay before allowing new input
          onEnd?.();
          resolve();
        };

        utterance.onerror = (event) => {
          this.isSpeaking = false;
          this.audioLock = false;
          const error = `Speech synthesis error: ${event.error}`;
          onError?.(error);
          reject(new Error(error));
        };

        this.lastUtterance = utterance;
        this.synthesis.speak(utterance);
        
      } catch (error) {
        this.isSpeaking = false;
        this.audioLock = false;
        const errorMsg = `Error initializing speech: ${error}`;
        onError?.(errorMsg);
        reject(new Error(errorMsg));
      }
    });
  }

  // Stop speaking
  stopSpeaking(): void {
    if (this.synthesis.speaking) {
      this.synthesis.cancel();
    }
    this.isSpeaking = false;
    // Brief delay before clearing audio lock
    setTimeout(() => {
      this.audioLock = false;
    }, 100);
  }

  // Process text to sound more natural and grandmotherly
  private processTextForSpeech(text: string): string {
    let processed = text;
    
    // Remove markdown formatting
    processed = processed.replace(/\*\*(.*?)\*\*/g, '$1');
    processed = processed.replace(/\*(.*?)\*/g, '$1');
    
    // Add natural pauses
    processed = processed.replace(/\./g, '. ');
    processed = processed.replace(/:/g, ': ');
    processed = processed.replace(/•/g, '. ');
    
    // Replace some text with more natural speech
    processed = processed.replace(/beta/g, 'beta, ');
    processed = processed.replace(/Nani/g, 'Nani ');
    
    // Add emphasis markers if browser supports SSML
    processed = processed.replace(/(Important|Warning|Note):/g, '<emphasis level="strong">$1:</emphasis>');
    
    return processed;
  }

  // Update voice settings
  updateSettings(newSettings: Partial<VoiceSettings>): void {
    this.settings = { ...this.settings, ...newSettings };
    if (this.recognition) {
      this.recognition.lang = this.settings.lang;
    }
  }

  // Check if currently listening
  get listening(): boolean {
    return this.isListening;
  }

  // Check if currently speaking
  get speaking(): boolean {
    return this.isSpeaking;
  }

  // Check if audio system is locked (preventing feedback)
  get locked(): boolean {
    return this.audioLock;
  }

  // Get available voices
  getAvailableVoices(): SpeechSynthesisVoice[] {
    return this.synthesis.getVoices();
  }
}

// Export singleton instance
export const naniVoice = new NaniVoiceEngine();

// Legacy exports for compatibility
export const generateVoiceResponse = (userInput: string, region?: string): string => {
  // Simple remedy matching for now
  const input = userInput.toLowerCase();
  if (input.includes('headache')) {
    return `**Arre beta, headache ho raha hai? Let Nani help!**

**Quick Relief:**
• Rest in a dark, quiet room
• Apply cold compress on forehead  
• Drink warm water slowly
• Gently massage temples

**Nani's Special:**
• Ginger tea with honey
• Peppermint oil on temples

**⚠️ See doctor if:** Severe pain, fever, or doesn't improve in 24 hours

*Rest well beta, main tumhare saath hun! 💛*`;
  }
  
  return `**Beta, I heard you! Let me help.**

For best results, please be specific about your symptoms. 
Ask me about headaches, stomach issues, cold, cough, or other common problems.

*Main yahan hun tumhare liye! 💛*`;
};

export const speakText = async (text: string, callbacks?: {
  onStart?: () => void;
  onEnd?: () => void;
  onError?: () => void;
}) => {
  return naniVoice.speak(text, callbacks?.onStart, callbacks?.onEnd, callbacks?.onError);
};

// Wait for voices to be loaded
if (typeof window !== 'undefined') {
  window.speechSynthesis.onvoiceschanged = () => {
    console.log('Voices loaded:', naniVoice.getAvailableVoices().length);
  };
}
