import voiceRemediesData from '@/data/voice_assistant_remedies_500.json';

export interface VoiceRemedy {
  id: string;
  problem: string;
  region: string;
  keywords: string[];
  sample_utterances: string[];
  response: {
    title: string;
    short: string;
    steps: string[];
    precautions: string[];
    escalation: string[];
  };
}

export class VoiceRemedyEngine {
  private remedies: VoiceRemedy[] = [];
  private normalizedKeywords: Map<string, string[]> = new Map();
  private synonymMap: Map<string, string[]> = new Map();

  constructor() {
    this.loadRemedies();
    this.buildSynonymMap();
    this.preprocessKeywords();
  }

  private loadRemedies() {
    this.remedies = voiceRemediesData.voice_remedies || [];
  }

  private buildSynonymMap() {
    // Common health-related synonyms
    this.synonymMap.set('vomiting', ['nausea', 'throwing up', 'retching', 'sick', 'queasy']);
    this.synonymMap.set('headache', ['head pain', 'migraine', 'head ache', 'cranial pain']);
    this.synonymMap.set('fever', ['temperature', 'high temp', 'pyrexia', 'hot body']);
    this.synonymMap.set('cold', ['flu', 'cough', 'sneezing', 'runny nose', 'congestion']);
    this.synonymMap.set('stomach', ['tummy', 'belly', 'abdomen', 'gastric', 'digestive']);
    this.synonymMap.set('acidity', ['heartburn', 'acid reflux', 'gastritis', 'burning stomach']);
    this.synonymMap.set('diarrhea', ['loose motions', 'loose stools', 'stomach upset', 'running stomach']);
    this.synonymMap.set('constipation', ['hard stools', 'difficulty passing', 'blocked stomach']);
    this.synonymMap.set('hair fall', ['hair loss', 'baldness', 'thinning hair', 'alopecia']);
    this.synonymMap.set('skin', ['dermal', 'cutaneous', 'epidermal', 'complexion']);
  }

  private preprocessKeywords() {
    this.remedies.forEach(remedy => {
      const normalized = remedy.keywords.map(keyword => 
        keyword.toLowerCase().trim()
      );
      this.normalizedKeywords.set(remedy.id, normalized);
    });
  }

  private calculateSimilarity(userInput: string, remedy: VoiceRemedy): number {
    const input = userInput.toLowerCase().trim();
    const keywords = this.normalizedKeywords.get(remedy.id) || [];
    
    let score = 0;

    // Direct keyword matching (highest weight)
    for (const keyword of keywords) {
      if (input.includes(keyword)) {
        score += 0.4;
      }
    }

    // Problem name matching
    if (input.includes(remedy.problem.toLowerCase())) {
      score += 0.3;
    }

    // Synonym matching
    for (const [term, synonyms] of this.synonymMap.entries()) {
      if (input.includes(term) || synonyms.some(syn => input.includes(syn))) {
        if (keywords.some(k => k.includes(term))) {
          score += 0.2;
        }
      }
    }

    // Sample utterance similarity
    for (const utterance of remedy.sample_utterances) {
      const utteranceWords = utterance.toLowerCase().split(' ');
      const inputWords = input.split(' ');
      const intersection = utteranceWords.filter(word => inputWords.includes(word));
      if (intersection.length > 2) {
        score += 0.1 * (intersection.length / utteranceWords.length);
      }
    }

    // N-gram overlap for sentence-level matching
    const ngramScore = this.calculateNgramSimilarity(input, keywords.join(' '));
    score += ngramScore * 0.15;

    return Math.min(score, 1.0);
  }

  private calculateNgramSimilarity(text1: string, text2: string, n: number = 2): number {
    const getNgrams = (text: string, n: number) => {
      const words = text.split(' ');
      const ngrams = [];
      for (let i = 0; i <= words.length - n; i++) {
        ngrams.push(words.slice(i, i + n).join(' '));
      }
      return ngrams;
    };

    const ngrams1 = getNgrams(text1, n);
    const ngrams2 = getNgrams(text2, n);
    
    const intersection = ngrams1.filter(gram => ngrams2.includes(gram));
    const union = [...new Set([...ngrams1, ...ngrams2])];
    
    return union.length > 0 ? intersection.length / union.length : 0;
  }

  public findBestRemedy(userInput: string, userRegion?: string): VoiceRemedy | null {
    if (!userInput.trim()) return null;

    let bestMatch: VoiceRemedy | null = null;
    let bestScore = 0;

    for (const remedy of this.remedies) {
      let score = this.calculateSimilarity(userInput, remedy);
      
      // Regional bonus
      if (userRegion && remedy.region.toLowerCase().includes(userRegion.toLowerCase())) {
        score += 0.1;
      }

      if (score > bestScore && score > 0.2) { // Minimum threshold
        bestScore = score;
        bestMatch = remedy;
      }
    }

    return bestMatch;
  }

  public findMultipleRemedies(userInput: string, userRegion?: string, limit: number = 3): VoiceRemedy[] {
    const results: Array<{remedy: VoiceRemedy, score: number}> = [];

    for (const remedy of this.remedies) {
      let score = this.calculateSimilarity(userInput, remedy);
      
      if (userRegion && remedy.region.toLowerCase().includes(userRegion.toLowerCase())) {
        score += 0.1;
      }

      if (score > 0.15) {
        results.push({remedy, score});
      }
    }

    return results
      .sort((a, b) => b.score - a.score)
      .slice(0, limit)
      .map(r => r.remedy);
  }

  public generateNaniResponse(remedy: VoiceRemedy, isVoice: boolean = false): string {
    const { title, short, steps, precautions, escalation } = remedy.response;
    
    let response = `${short}\n\n`;
    
    if (steps.length > 0) {
      response += "**Nani ke nuskhe:**\n";
      steps.forEach((step, index) => {
        response += `${index + 1}. ${step}\n`;
      });
      response += "\n";
    }

    if (precautions.length > 0) {
      response += "**Dhyan rakhiye beta:**\n";
      precautions.forEach(precaution => {
        response += `• ${precaution}\n`;
      });
      response += "\n";
    }

    if (escalation.length > 0) {
      response += "**Doctor ko kab dikhana hai:**\n";
      escalation.forEach(rule => {
        response += `• ${rule}\n`;
      });
    }

    if (isVoice) {
      // For voice, add natural pauses and warm tone
      response = response.replace(/\*\*/g, ''); // Remove markdown
      response = response.replace(/\n\n/g, '... '); // Add pauses
      response = `Beta, ${response} Take care, and remember Nani is always here for you!`;
    }

    return response.trim();
  }

  public isAmbiguousQuery(userInput: string): boolean {
    const input = userInput.toLowerCase();
    const ambiguousIndicators = [
      'sometimes', 'occasionally', 'little bit', 'maybe', 'might be',
      'not sure', 'confused', 'don\'t know', 'could be', 'feeling weird'
    ];
    
    return ambiguousIndicators.some(indicator => input.includes(indicator)) ||
           input.split(' ').length < 3; // Very short queries are often ambiguous
  }

  public generateClarifyingQuestions(userInput: string): string[] {
    const input = userInput.toLowerCase();
    const questions: string[] = [];

    if (input.includes('pain') || input.includes('hurt')) {
      questions.push("Beta, how long have you been experiencing this pain?");
      questions.push("Is the pain sharp or dull?");
    }

    if (input.includes('fever') || input.includes('temperature')) {
      questions.push("Since when do you have fever, beta?");
      questions.push("Are you also feeling body aches?");
    }

    if (input.includes('stomach') || input.includes('tummy')) {
      questions.push("Beta, when did the stomach problem start?");
      questions.push("Are you having any other symptoms like nausea?");
    }

    if (questions.length === 0) {
      questions.push("Beta, can you tell me more about when this started?");
      questions.push("Are there any other symptoms you're experiencing?");
    }

    return questions.slice(0, 2); // Maximum 2 questions
  }
}

// Singleton instance
export const voiceRemedyEngine = new VoiceRemedyEngine();