import { voiceRemedyEngine, VoiceRemedy } from './voiceRemedyEngine';

export interface VoiceSettings {
  rate: number;
  pitch: number;
  volume: number;
  language: string;
  voiceName?: string;
}

export interface SessionMessage {
  id: string;
  text: string;
  sender: 'user' | 'nani';
  timestamp: Date;
  remedy?: VoiceRemedy;
}

export class EnhancedVoiceEngine {
  private recognition: any = null;
  private isListening = false;
  private isSpeaking = false;
  private audioLock = false;
  private sessionMessages: SessionMessage[] = [];
  private pendingClarification = false;
  private lastUserInput = '';

  private settings: VoiceSettings = {
    rate: 0.95,
    pitch: 1.1,
    volume: 1.0,
    language: 'en-IN'
  };

  constructor() {
    this.initializeSpeechRecognition();
    this.initializeSpeechSynthesis();
  }

  private initializeSpeechRecognition() {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      this.recognition = new SpeechRecognition();
      
      this.recognition.continuous = false;
      this.recognition.interimResults = true;
      this.recognition.lang = this.settings.language;
      this.recognition.maxAlternatives = 1;
    }
  }

  private initializeSpeechSynthesis() {
    if ('speechSynthesis' in window) {
      // Wait for voices to load
      const setVoice = () => {
        const voices = speechSynthesis.getVoices();
        const preferredVoice = voices.find(voice => 
          voice.lang.includes('en-IN') && voice.name.toLowerCase().includes('female')
        ) || voices.find(voice => 
          voice.lang.includes('en') && voice.name.toLowerCase().includes('female')
        ) || voices[0];
        
        if (preferredVoice) {
          this.settings.voiceName = preferredVoice.name;
        }
      };

      if (speechSynthesis.getVoices().length > 0) {
        setVoice();
      } else {
        speechSynthesis.addEventListener('voiceschanged', setVoice);
      }
    }
  }

  public async startListening(
    onResult: (transcript: string, isFinal: boolean) => void,
    onError: (error: string) => void
  ): Promise<void> {
    if (!this.recognition) {
      onError('Speech recognition not supported in this browser');
      return;
    }

    if (this.audioLock || this.isSpeaking) {
      onError('Please wait for Nani to finish speaking');
      return;
    }

    try {
      // Request microphone permission
      await navigator.mediaDevices.getUserMedia({ audio: true });
      
      this.isListening = true;
      this.audioLock = true;

      this.recognition.onstart = () => {
        console.log('Voice recognition started');
      };

      this.recognition.onresult = (event: any) => {
        if (this.isSpeaking) return; // Ignore if we're speaking
        
        const result = event.results[event.results.length - 1];
        const transcript = result[0].transcript;
        const isFinal = result.isFinal;
        
        onResult(transcript, isFinal);
      };

      this.recognition.onend = () => {
        this.isListening = false;
        this.audioLock = false;
      };

      this.recognition.onerror = (event: any) => {
        this.isListening = false;
        this.audioLock = false;
        onError(`Speech recognition error: ${event.error}`);
      };

      this.recognition.start();

      // Auto-stop after 10 seconds of silence
      setTimeout(() => {
        if (this.isListening) {
          this.stopListening();
        }
      }, 10000);

    } catch (error) {
      onError('Microphone access denied');
      this.audioLock = false;
    }
  }

  public stopListening(): void {
    if (this.recognition && this.isListening) {
      this.recognition.stop();
    }
    this.isListening = false;
    this.audioLock = false;
  }

  public async processUserInput(
    userInput: string,
    userRegion?: string
  ): Promise<{ response: string; needsClarification: boolean; questions?: string[] }> {
    // Add to session memory
    this.sessionMessages.push({
      id: Date.now().toString(),
      text: userInput,
      sender: 'user',
      timestamp: new Date()
    });

    // Check if this is a follow-up to clarification
    if (this.pendingClarification && this.lastUserInput) {
      const combinedInput = `${this.lastUserInput} ${userInput}`;
      const remedy = voiceRemedyEngine.findBestRemedy(combinedInput, userRegion);
      
      if (remedy) {
        this.pendingClarification = false;
        this.lastUserInput = '';
        const response = voiceRemedyEngine.generateNaniResponse(remedy, true);
        
        this.sessionMessages.push({
          id: Date.now().toString(),
          text: response,
          sender: 'nani',
          timestamp: new Date(),
          remedy
        });

        return { response, needsClarification: false };
      }
    }

    // Check for ambiguous queries
    if (voiceRemedyEngine.isAmbiguousQuery(userInput)) {
      const questions = voiceRemedyEngine.generateClarifyingQuestions(userInput);
      this.pendingClarification = true;
      this.lastUserInput = userInput;
      
      const clarificationResponse = `Beta, I want to help you properly. ${questions[0]}`;
      
      this.sessionMessages.push({
        id: Date.now().toString(),
        text: clarificationResponse,
        sender: 'nani',
        timestamp: new Date()
      });

      return { 
        response: clarificationResponse, 
        needsClarification: true, 
        questions 
      };
    }

    // Find remedy
    const remedy = voiceRemedyEngine.findBestRemedy(userInput, userRegion);
    
    if (remedy) {
      const response = voiceRemedyEngine.generateNaniResponse(remedy, true);
      
      this.sessionMessages.push({
        id: Date.now().toString(),
        text: response,
        sender: 'nani',
        timestamp: new Date(),
        remedy
      });

      return { response, needsClarification: false };
    } else {
      // Fallback response
      const fallbackResponse = `Beta, I heard you say "${userInput}". While I don't have a specific remedy for this right now, here's some general guidance: rest well, stay hydrated, and if symptoms persist or worsen, please consult a doctor. Is there anything more specific you'd like to ask me about?`;
      
      this.sessionMessages.push({
        id: Date.now().toString(),
        text: fallbackResponse,
        sender: 'nani',
        timestamp: new Date()
      });

      return { response: fallbackResponse, needsClarification: false };
    }
  }

  public async speak(
    text: string,
    onStart?: () => void,
    onEnd?: () => void,
    onError?: (error: string) => void
  ): Promise<void> {
    if (!('speechSynthesis' in window)) {
      onError?.('Text-to-speech not supported');
      return;
    }

    // Stop any ongoing speech
    speechSynthesis.cancel();
    
    // Prevent feedback loop
    this.stopListening();
    this.isSpeaking = true;
    this.audioLock = true;

    const utterance = new SpeechSynthesisUtterance(text);
    
    // Apply settings
    utterance.rate = this.settings.rate;
    utterance.pitch = this.settings.pitch;
    utterance.volume = this.settings.volume;
    utterance.lang = this.settings.language;

    // Set voice if available
    if (this.settings.voiceName) {
      const voices = speechSynthesis.getVoices();
      const selectedVoice = voices.find(voice => voice.name === this.settings.voiceName);
      if (selectedVoice) {
        utterance.voice = selectedVoice;
      }
    }

    utterance.onstart = () => {
      onStart?.();
    };

    utterance.onend = () => {
      this.isSpeaking = false;
      this.audioLock = false;
      onEnd?.();
    };

    utterance.onerror = (event) => {
      this.isSpeaking = false;
      this.audioLock = false;
      onError?.(`Speech synthesis error: ${event.error}`);
    };

    speechSynthesis.speak(utterance);
  }

  public stopSpeaking(): void {
    if ('speechSynthesis' in window) {
      speechSynthesis.cancel();
    }
    this.isSpeaking = false;
    this.audioLock = false;
  }

  public updateSettings(newSettings: Partial<VoiceSettings>): void {
    this.settings = { ...this.settings, ...newSettings };
    
    if (this.recognition && newSettings.language) {
      this.recognition.lang = newSettings.language;
    }
  }

  public getSessionMessages(): SessionMessage[] {
    return [...this.sessionMessages];
  }

  public clearSession(): void {
    this.sessionMessages = [];
    this.pendingClarification = false;
    this.lastUserInput = '';
  }

  public get listening(): boolean {
    return this.isListening;
  }

  public get speaking(): boolean {
    return this.isSpeaking;
  }

  public get locked(): boolean {
    return this.audioLock;
  }

  public getAvailableVoices(): SpeechSynthesisVoice[] {
    if ('speechSynthesis' in window) {
      return speechSynthesis.getVoices();
    }
    return [];
  }
}

// Singleton instance
export const enhancedVoiceEngine = new EnhancedVoiceEngine();