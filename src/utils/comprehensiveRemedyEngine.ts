// Removed voiceRemedyEngine import to rely solely on JSON data sources
import remediesData from '@/data/remedies.json';
import wellnessData from '@/data/wellness.json';
import remediesExpandedData from '@/data/remedies_expanded_500.json';
import wellnessImprovedData from '@/data/wellness_improved.json';

export interface ComprehensiveRemedy {
  id: string;
  problem: string;
  keywords: string[];
  symptoms: string[];
  remedy: string;
  ingredients: string[];
  preparation: string[];
  dosage: string;
  duration: string;
  precautions: string[];
  escalation: string[];
  region: string;
  category: 'physical' | 'mental' | 'digestive' | 'respiratory' | 'skin' | 'womens_health' | 'chronic';
  severity: 'mild' | 'moderate' | 'serious';
  source: 'traditional' | 'ayurvedic' | 'modern';
  emojis?: string[];
}

export interface WellnessAdvice {
  id: string;
  topic: string;
  category: 'exercise' | 'meditation' | 'lifestyle' | 'nutrition' | 'sleep' | 'stress';
  description: string;
  steps: string[];
  benefits: string[];
  duration: string;
  frequency: string;
  precautions: string[];
  keywords: string[];
}

class ComprehensiveRemedyEngine {
  private remedies: ComprehensiveRemedy[] = [];
  private wellnessAdvice: WellnessAdvice[] = [];
  private sessionMemory: Array<{query: string, response: string, timestamp: Date}> = [];

  constructor() {
    this.loadAllData();
  }

  private loadAllData() {
    this.loadBasicRemedies();
    this.loadExpandedRemedies();
    this.loadWellnessData();
    // this.generateAdditionalRemedies(); // Disabled to use only user's JSON datasets
  }

  private loadBasicRemedies() {
    if (remediesData.remedies) {
      remediesData.remedies.forEach((remedy: any, index: number) => {
        this.remedies.push({
          id: `basic-${index}`,
          problem: remedy.problem,
          keywords: remedy.keywords || [],
          symptoms: [],
          remedy: remedy.remedy,
          ingredients: this.extractIngredients(remedy.remedy),
          preparation: [remedy.remedy],
          dosage: 'As needed',
          duration: '2-3 days',
          precautions: remedy.escalation || [],
          escalation: remedy.escalation || [],
          region: 'All India',
          category: this.categorizeRemedy(remedy.problem),
          severity: 'mild',
          source: 'traditional',
          emojis: this.getEmojiForCategory(this.categorizeRemedy(remedy.problem))
        });
      });
    }
  }

  private loadExpandedRemedies() {
    try {
      if (remediesExpandedData.remedies) {
        remediesExpandedData.remedies.forEach((remedy: any, index: number) => {
          this.remedies.push({
            id: `expanded-${index}`,
            problem: remedy.problem || remedy.title || 'General Health',
            keywords: [...(remedy.keywords || []), ...(remedy.symptoms || [])],
            symptoms: remedy.symptoms || [],
            remedy: remedy.remedy || remedy.description || '',
            ingredients: remedy.ingredients || this.extractIngredients(remedy.remedy || ''),
            preparation: remedy.steps || [remedy.remedy || remedy.description || ''],
            dosage: remedy.dosage || 'As recommended',
            duration: remedy.duration || '3-5 days',
            precautions: remedy.precautions || [],
            escalation: remedy.escalation || remedy.when_to_see_doctor || [],
            region: remedy.region || 'All India',
            category: this.categorizeRemedy(remedy.problem || remedy.title || ''),
            severity: remedy.severity || 'moderate',
            source: 'ayurvedic',
            emojis: this.getEmojiForCategory(this.categorizeRemedy(remedy.problem || ''))
          });
        });
      }
    } catch (error) {
      console.log('Could not load expanded remedies data');
    }
  }

  private loadWellnessData() {
    if (wellnessData.wellness) {
      wellnessData.wellness.forEach((item: any, index: number) => {
        this.wellnessAdvice.push({
          id: `wellness-${index}`,
          topic: item.problem,
          category: this.categorizeWellness(item.problem),
          description: item.exercise,
          steps: [item.exercise],
          benefits: [item.extra_info],
          duration: '10-15 minutes',
          frequency: 'Daily',
          precautions: item.escalation || [],
          keywords: item.keywords || []
        });
      });
    }

    try {
      if (Array.isArray(wellnessImprovedData)) {
        wellnessImprovedData.forEach((item: any, index: number) => {
          this.wellnessAdvice.push({
            id: `improved-${index}`,
            topic: item.title || item.problem || 'Wellness Routine',
            category: this.categorizeWellness(item.title || item.problem || ''),
            description: item.description || item.exercise || '',
            steps: [item.description || item.exercise || ''],
            benefits: [item.description || ''],
            duration: item.duration || '15-20 minutes',
            frequency: 'Daily',
            precautions: [],
            keywords: item.keywords || []
          });
        });
      }
    } catch (error) {
      console.log('Could not load improved wellness data');
    }
  }

  private generateAdditionalRemedies() {
    const additionalRemedies = [
      {
        id: 'diabetes-1',
        problem: 'Diabetes Management',
        keywords: ['diabetes', 'blood sugar', 'sugar problem', 'madhumeh'],
        symptoms: ['high blood sugar', 'frequent urination', 'excessive thirst'],
        remedy: 'Karela (bitter gourd) juice with amla and jamun helps control blood sugar naturally',
        ingredients: ['Karela', 'Amla', 'Jamun', 'Methi seeds'],
        preparation: ['Blend fresh karela with amla', 'Add jamun powder', 'Soak methi seeds overnight and consume'],
        dosage: 'Empty stomach in morning',
        duration: 'Daily for 3 months',
        precautions: ['Monitor blood sugar regularly', 'Continue prescribed medication'],
        escalation: ['If sugar levels remain high after 2 weeks', 'Any diabetic emergency symptoms'],
        region: 'All India',
        category: 'chronic' as const,
        severity: 'moderate' as const,
        source: 'ayurvedic' as const,
        emojis: ['🍃', '💚', '🌿']
      },
      {
        id: 'hypertension-1',
        problem: 'High Blood Pressure',
        keywords: ['hypertension', 'high bp', 'blood pressure', 'bp problem'],
        symptoms: ['headache', 'dizziness', 'chest pain'],
        remedy: 'Garlic, lemon water, and ashwagandha help naturally lower blood pressure',
        ingredients: ['Garlic', 'Lemon', 'Ashwagandha powder', 'Arjuna bark'],
        preparation: ['Consume 2 garlic cloves daily', 'Drink lemon water', 'Take ashwagandha with warm milk'],
        dosage: 'Twice daily',
        duration: 'Regular use',
        precautions: ['Monitor BP regularly', 'Reduce salt intake', 'Regular exercise'],
        escalation: ['BP consistently above 140/90', 'Chest pain or breathing difficulty'],
        region: 'All India',
        category: 'chronic' as const,
        severity: 'moderate' as const,
        source: 'ayurvedic' as const,
        emojis: ['💚', '🧄', '🍋']
      }
    ];

    this.remedies.push(...additionalRemedies);
  }

  private extractIngredients(remedy: string): string[] {
    const commonIngredients = [
      'honey', 'ginger', 'turmeric', 'lemon', 'garlic', 'tulsi', 'neem', 'amla',
      'haldi', 'adrak', 'shahad', 'nimbu', 'ajwain', 'jeera', 'hing', 'methi'
    ];
    
    return commonIngredients.filter(ingredient => 
      remedy.toLowerCase().includes(ingredient.toLowerCase())
    );
  }

  private categorizeRemedy(problem: string): ComprehensiveRemedy['category'] {
    const p = problem.toLowerCase();
    
    if (p.includes('cough') || p.includes('cold') || p.includes('breathing')) return 'respiratory';
    if (p.includes('stomach') || p.includes('acidity') || p.includes('digestion')) return 'digestive';
    if (p.includes('skin') || p.includes('hair') || p.includes('face')) return 'skin';
    if (p.includes('anxiety') || p.includes('stress') || p.includes('depression')) return 'mental';
    if (p.includes('periods') || p.includes('pregnancy') || p.includes('women')) return 'womens_health';
    if (p.includes('diabetes') || p.includes('bp') || p.includes('pressure')) return 'chronic';
    
    return 'physical';
  }

  private categorizeWellness(problem: string): WellnessAdvice['category'] {
    const p = problem.toLowerCase();
    
    if (p.includes('exercise') || p.includes('yoga') || p.includes('workout')) return 'exercise';
    if (p.includes('meditation') || p.includes('mindfulness') || p.includes('breathing')) return 'meditation';
    if (p.includes('sleep') || p.includes('insomnia') || p.includes('rest')) return 'sleep';
    if (p.includes('stress') || p.includes('anxiety') || p.includes('tension')) return 'stress';
    if (p.includes('diet') || p.includes('nutrition') || p.includes('food')) return 'nutrition';
    
    return 'lifestyle';
  }

  private getEmojiForCategory(category: string): string[] {
    const emojiMap: Record<string, string[]> = {
      respiratory: ['🌬️', '💨', '🌿'],
      digestive: ['🌱', '🍃', '💚'],
      skin: ['✨', '🌸', '💆‍♀️'],
      mental: ['🧘‍♀️', '💆‍♀️', '🌸'],
      womens_health: ['🌸', '💖', '🤱'],
      chronic: ['💚', '🌿', '🩺'],
      physical: ['💪', '🌟', '⚡']
    };
    
    return emojiMap[category] || ['🌿', '💛', '🤗'];
  }

  public findComprehensiveRemedy(userInput: string, userRegion?: string): ComprehensiveRemedy | null {
    // Removed voice engine fallback to prevent generic responses; rely on comprehensive remedies only

    const input = userInput.toLowerCase();
    let bestMatch: ComprehensiveRemedy | null = null;
    let bestScore = 0;

    for (const remedy of this.remedies) {
      let score = 0;

      for (const keyword of remedy.keywords) {
        if (input.includes(keyword.toLowerCase())) {
          score += 0.4;
        }
      }

      if (input.includes(remedy.problem.toLowerCase())) {
        score += 0.3;
      }

      for (const symptom of remedy.symptoms) {
        if (input.includes(symptom.toLowerCase())) {
          score += 0.2;
        }
      }

      if (userRegion && remedy.region.toLowerCase().includes(userRegion.toLowerCase())) {
        score += 0.1;
      }

      if (score > bestScore && score > 0.2) {
        bestScore = score;
        bestMatch = remedy;
      }
    }

    return bestMatch;
  }

  public findWellnessAdvice(userInput: string): WellnessAdvice | null {
    const input = userInput.toLowerCase();
    let bestMatch: WellnessAdvice | null = null;
    let bestScore = 0;

    for (const advice of this.wellnessAdvice) {
      let score = 0;

      for (const keyword of advice.keywords) {
        if (input.includes(keyword.toLowerCase())) {
          score += 0.4;
        }
      }

      if (input.includes(advice.topic.toLowerCase())) {
        score += 0.3;
      }

      if (input.includes(advice.category)) {
        score += 0.2;
      }

      if (score > bestScore && score > 0.15) {
        bestScore = score;
        bestMatch = advice;
      }
    }

    return bestMatch;
  }

  // Removed convertVoiceRemedy; chat now uses only comprehensive JSON remedies

  public generateEnhancedResponse(remedy: ComprehensiveRemedy, isVoice: boolean = false): string {
    let response = `${remedy.emojis?.join(' ') || '🌿'} **${remedy.problem}** ${remedy.emojis?.join(' ') || '🌿'}\n\n`;
    
    response += `*My child, ${remedy.remedy}* 💛\n\n`;

    if (remedy.ingredients.length > 0) {
      response += "**🌱 Ingredients needed:**\n";
      remedy.ingredients.forEach(ingredient => {
        response += `• ${ingredient}\n`;
      });
      response += "\n";
    }

    if (remedy.preparation.length > 0) {
      response += "**✨ How to prepare:**\n";
      remedy.preparation.forEach((step, index) => {
        response += `${index + 1}. ${step}\n`;
      });
      response += "\n";
    }

    if (remedy.dosage) {
      response += `**⏰ When to take:** ${remedy.dosage}\n\n`;
    }

    if (remedy.precautions.length > 0) {
      response += "**⚠️ Precautions:**\n";
      remedy.precautions.forEach(precaution => {
        response += `• ${precaution}\n`;
      });
      response += "\n";
    }

    if (remedy.escalation.length > 0) {
      response += "**🩺 See a doctor if:**\n";
      remedy.escalation.forEach(rule => {
        response += `• ${rule}\n`;
      });
      response += "\n";
    }

    response += "*Nani's blessings are with you. Get well soon! 🤗*";

    if (isVoice) {
      response = response.replace(/\*\*/g, '');
      response = response.replace(/🌿|🌱|✨|⏰|⚠️|🩺|💛|🤗/g, '');
      response = response.replace(/\n\n/g, '... ');
      response = `My child, ${response.replace(/\*/g, '')} Remember, Nani is always here to help you!`;
    }

    return response.trim();
  }

  public generateWellnessResponse(advice: WellnessAdvice): string {
    let response = `🌸 **${advice.topic}** 🌸\n\n`;
    
    response += `*${advice.description}* 💛\n\n`;

    if (advice.steps.length > 0) {
      response += "**✨ Steps to follow:**\n";
      advice.steps.forEach((step, index) => {
        response += `${index + 1}. ${step}\n`;
      });
      response += "\n";
    }

    if (advice.benefits.length > 0) {
      response += "**🌟 Benefits:**\n";
      advice.benefits.forEach(benefit => {
        response += `• ${benefit}\n`;
      });
      response += "\n";
    }

    response += `**⏰ Duration:** ${advice.duration}\n`;
    response += `**🔄 Frequency:** ${advice.frequency}\n\n`;

    if (advice.precautions.length > 0) {
      response += "**⚠️ Keep in mind:**\n";
      advice.precautions.forEach(precaution => {
        response += `• ${precaution}\n`;
      });
      response += "\n";
    }

    response += "*Wellness is a journey, not a destination. Take it one step at a time! 🤗*";

    return response.trim();
  }

  public addToSessionMemory(query: string, response: string) {
    this.sessionMemory.push({
      query,
      response,
      timestamp: new Date()
    });

    if (this.sessionMemory.length > 10) {
      this.sessionMemory = this.sessionMemory.slice(-10);
    }
  }

  public getSessionContext(): string {
    if (this.sessionMemory.length === 0) return '';
    
    const recent = this.sessionMemory.slice(-2);
    return recent.map(item => `Q: ${item.query} A: ${item.response.substring(0, 100)}...`).join('\n');
  }

  public clearSession() {
    this.sessionMemory = [];
  }
}

export const comprehensiveRemedyEngine = new ComprehensiveRemedyEngine();