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
    this.generateAdditionalRemedies(); // Re-enabled with improved data
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
      // Common Health Issues
      {
        id: 'general-cold-1',
        problem: 'Common Cold and Flu',
        keywords: ['cold', 'flu', 'runny nose', 'sneezing', 'congestion', 'sardi', 'zukam', 'cough'],
        symptoms: ['runny nose', 'sneezing', 'mild fever', 'body aches', 'fatigue'],
        remedy: 'Drink warm ginger-tulsi tea with honey, take steam inhalation, and rest well',
        ingredients: ['Ginger', 'Tulsi leaves', 'Honey', 'Black pepper', 'Turmeric'],
        preparation: [
          'Boil 1 cup water with fresh ginger slices and tulsi leaves',
          'Add a pinch of black pepper and turmeric',
          'Strain and add honey when slightly cool',
          'Take steam inhalation 2-3 times daily'
        ],
        dosage: '2-3 times daily, warm',
        duration: '3-5 days',
        precautions: ['Honey not for infants under 1 year', 'If fever persists beyond 3 days, see doctor'],
        escalation: ['High fever above 101°F', 'Difficulty breathing', 'Chest pain', 'Persistent cough for over 7 days'],
        region: 'All India',
        category: 'respiratory' as const,
        severity: 'mild' as const,
        source: 'traditional' as const,
        emojis: ['🌿', '🍵', '💚']
      },
      {
        id: 'digestive-acidity-1',
        problem: 'Acidity and Heartburn',
        keywords: ['acidity', 'heartburn', 'acid reflux', 'burning sensation', 'gastritis', 'khatti dakaar'],
        symptoms: ['burning sensation in chest', 'sour taste', 'nausea', 'bloating'],
        remedy: 'Drink cool buttermilk with roasted cumin, avoid spicy foods, eat smaller meals',
        ingredients: ['Buttermilk', 'Roasted cumin powder', 'Black salt', 'Mint leaves', 'Fennel seeds'],
        preparation: [
          'Mix 1 glass buttermilk with 1/2 tsp roasted cumin powder',
          'Add a pinch of black salt and fresh mint',
          'Drink slowly after meals',
          'Chew fennel seeds after eating'
        ],
        dosage: 'After meals',
        duration: '2-3 days',
        precautions: ['Avoid citrus fruits and spicy food', 'Eat smaller, frequent meals'],
        escalation: ['Severe chest pain', 'Persistent vomiting', 'Blood in vomit', 'Difficulty swallowing'],
        region: 'All India',
        category: 'digestive' as const,
        severity: 'mild' as const,
        source: 'traditional' as const,
        emojis: ['🥛', '🌿', '💚']
      },
      {
        id: 'mental-stress-1',
        problem: 'Stress and Anxiety',
        keywords: ['stress', 'anxiety', 'tension', 'worry', 'nervousness', 'chinta', 'pareshan'],
        symptoms: ['restlessness', 'rapid heartbeat', 'sweating', 'difficulty concentrating'],
        remedy: 'Practice deep breathing, drink chamomile tea, do gentle yoga, maintain regular sleep',
        ingredients: ['Chamomile tea', 'Lavender oil', 'Ashwagandha powder', 'Brahmi leaves'],
        preparation: [
          'Drink warm chamomile tea before bed',
          'Practice 4-7-8 breathing: inhale 4, hold 7, exhale 8',
          'Take ashwagandha with warm milk',
          'Use lavender oil for aromatherapy'
        ],
        dosage: 'As needed, especially evening',
        duration: 'Regular practice',
        precautions: ['Consult doctor if symptoms persist', 'Avoid caffeine and alcohol'],
        escalation: ['Panic attacks', 'Persistent insomnia', 'Thoughts of self-harm', 'Unable to function daily'],
        region: 'All India',
        category: 'mental' as const,
        severity: 'moderate' as const,
        source: 'ayurvedic' as const,
        emojis: ['🧘‍♀️', '🌿', '💆‍♀️']
      },
      {
        id: 'skin-acne-1', 
        problem: 'Acne and Pimples',
        keywords: ['acne', 'pimples', 'blackheads', 'skin problems', 'face problems', 'spots'],
        symptoms: ['red bumps', 'blackheads', 'whiteheads', 'oily skin', 'scarring'],
        remedy: 'Apply neem paste, use turmeric face mask, maintain clean skin routine',
        ingredients: ['Neem leaves', 'Turmeric powder', 'Rose water', 'Multani mitti', 'Tea tree oil'],
        preparation: [
          'Grind fresh neem leaves with little water',
          'Mix turmeric with rose water for face mask',
          'Apply neem paste on affected areas',
          'Use multani mitti pack twice weekly'
        ],
        dosage: 'Daily for neem, 2-3 times weekly for masks',
        duration: '4-6 weeks',
        precautions: ['Patch test before use', 'Keep skin clean but dont over-wash', 'Avoid touching face'],
        escalation: ['Severe cystic acne', 'Deep scarring', 'Signs of infection', 'No improvement in 6 weeks'],
        region: 'All India',
        category: 'skin' as const,
        severity: 'moderate' as const,
        source: 'ayurvedic' as const,
        emojis: ['🌿', '✨', '🌸']
      },
      {
        id: 'womens-periods-1',
        problem: 'Menstrual Cramps and Pain',
        keywords: ['periods', 'menstruation', 'cramps', 'period pain', 'monthly cycle', 'mahavari'],
        symptoms: ['abdominal cramping', 'lower back pain', 'mood swings', 'bloating'],
        remedy: 'Apply warm compress, drink ginger tea, gentle exercise, adequate rest',
        ingredients: ['Ginger', 'Fenugreek seeds', 'Jaggery', 'Warm sesame oil', 'Cinnamon'],
        preparation: [
          'Soak fenugreek seeds overnight, drink the water',
          'Make ginger tea with jaggery',
          'Gently massage lower abdomen with warm sesame oil',
          'Apply warm compress to lower back'
        ],
        dosage: 'As needed during menstruation',
        duration: 'During menstrual cycle',
        precautions: ['Maintain hygiene', 'Stay hydrated', 'Avoid cold foods'],
        escalation: ['Extremely heavy bleeding', 'Severe pain affecting daily activities', 'Bleeding between cycles', 'Missed periods'],
        region: 'All India',
        category: 'womens_health' as const,
        severity: 'moderate' as const,
        source: 'traditional' as const,
        emojis: ['🌸', '💖', '🤗']
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
    const input = userInput.toLowerCase().trim();
    let bestMatch: ComprehensiveRemedy | null = null;
    let bestScore = 0;

    // Enhanced synonym map for better matching
    const synonyms = {
      'cold': ['flu', 'cough', 'runny nose', 'sneezing', 'congestion', 'sardi', 'zukam'],
      'headache': ['head pain', 'migraine', 'sir dard', 'brain pain'],
      'fever': ['temperature', 'bukhar', 'body heat', 'high temp'],
      'stomach': ['tummy', 'belly', 'abdomen', 'pet', 'gastric'],
      'acidity': ['heartburn', 'acid reflux', 'burning stomach', 'khatti dakaar'],
      'stress': ['anxiety', 'tension', 'worry', 'chinta', 'pareshan'],
      'periods': ['menstruation', 'monthly cycle', 'mc', 'mahavari'],
      'skin': ['face', 'complexion', 'dermal', 'chamdi'],
      'hair': ['baal', 'hair fall', 'baldness', 'hair loss']
    };

    for (const remedy of this.remedies) {
      let score = 0;

      // Exact keyword matching (highest priority)
      for (const keyword of remedy.keywords) {
        const keywordLower = keyword.toLowerCase();
        if (input.includes(keywordLower)) {
          score += 0.5;
        }
        
        // Synonym matching
        for (const [key, syns] of Object.entries(synonyms)) {
          if (keywordLower.includes(key) && syns.some(syn => input.includes(syn))) {
            score += 0.3;
          }
        }
      }

      // Problem name matching
      const problemWords = remedy.problem.toLowerCase().split(' ');
      const inputWords = input.split(' ');
      const commonWords = problemWords.filter(word => 
        inputWords.some(inputWord => 
          inputWord.includes(word) || word.includes(inputWord)
        )
      );
      if (commonWords.length > 0) {
        score += 0.4 * (commonWords.length / problemWords.length);
      }

      // Symptom matching
      for (const symptom of remedy.symptoms) {
        if (input.includes(symptom.toLowerCase())) {
          score += 0.3;
        }
      }

      // Category-based contextual matching
      const healthCategories = {
        'respiratory': ['breathing', 'chest', 'lungs', 'throat', 'nose'],
        'digestive': ['stomach', 'eating', 'food', 'digest', 'bowel'],
        'mental': ['feel', 'mood', 'sleep', 'tired', 'energy'],
        'skin': ['face', 'appearance', 'beauty', 'spots'],
        'womens_health': ['women', 'female', 'pregnancy', 'baby']
      };

      const categoryTerms = healthCategories[remedy.category as keyof typeof healthCategories] || [];
      for (const term of categoryTerms) {
        if (input.includes(term)) {
          score += 0.2;
        }
      }

      // Regional preference
      if (userRegion && remedy.region.toLowerCase().includes(userRegion.toLowerCase())) {
        score += 0.1;
      }

      // Length and specificity bonus
      if (input.length > 10 && score > 0.3) {
        score += 0.1; // Reward detailed queries
      }

      if (score > bestScore && score > 0.25) { // Increased threshold for better quality
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