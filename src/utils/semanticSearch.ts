// Semantic search utilities for remedy matching
import remediesData from '@/data/remedies_expanded_500.json';
import wellnessData from '@/data/wellness_improved.json';

interface Remedy {
  id: string;
  problem: string;
  region: string;
  keywords: string[];
  remedy: string;
}

interface WellnessItem {
  id: string;
  title: string;
  category: string;
  keywords: string[];
  description: string;
  duration?: string;
  difficulty?: string;
}

// Normalize text for matching
function normalizeText(text: string): string {
  return text.toLowerCase()
    .replace(/[^\w\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

// Create n-grams from text
function createNGrams(text: string, n: number = 2): string[] {
  const words = normalizeText(text).split(' ');
  if (words.length < n) return words;
  
  const ngrams: string[] = [];
  for (let i = 0; i <= words.length - n; i++) {
    ngrams.push(words.slice(i, i + n).join(' '));
  }
  return ngrams;
}

// Calculate TF-IDF-like scoring
function calculateSimilarity(query: string, keywords: string[], text: string): number {
  const queryWords = normalizeText(query).split(' ');
  const queryNGrams = createNGrams(query);
  const allKeywords = keywords.map(k => normalizeText(k));
  const normalizedText = normalizeText(text);
  
  let score = 0;
  
  // Exact keyword matches (highest weight)
  queryWords.forEach(word => {
    if (allKeywords.some(keyword => keyword.includes(word))) {
      score += 3;
    }
  });
  
  // N-gram matches
  queryNGrams.forEach(ngram => {
    if (allKeywords.some(keyword => keyword.includes(ngram))) {
      score += 2;
    }
  });
  
  // Text content matches
  queryWords.forEach(word => {
    if (normalizedText.includes(word)) {
      score += 1;
    }
  });
  
  // Phrase matching bonus
  if (allKeywords.some(keyword => keyword.includes(normalizeText(query)))) {
    score += 5;
  }
  
  return score;
}

// Symptom and condition synonyms
const synonyms: Record<string, string[]> = {
  'headache': ['head pain', 'migraine', 'tension headache', 'head ache'],
  'cold': ['flu', 'runny nose', 'congestion', 'nasal congestion', 'blocked nose'],
  'cough': ['coughing', 'throat irritation', 'dry cough', 'wet cough'],
  'fever': ['temperature', 'high temperature', 'body heat', 'pyrexia'],
  'stomach ache': ['stomach pain', 'belly pain', 'abdominal pain', 'tummy ache'],
  'acidity': ['acid reflux', 'heartburn', 'gastric', 'stomach burning'],
  'stress': ['anxiety', 'tension', 'worry', 'mental pressure'],
  'insomnia': ['sleep problems', 'sleeplessness', 'cannot sleep', 'sleep disorder']
};

// Expand query with synonyms
function expandQuery(query: string): string[] {
  const words = normalizeText(query).split(' ');
  const expandedQueries = [query];
  
  Object.entries(synonyms).forEach(([key, syns]) => {
    if (words.some(word => key.includes(word) || syns.some(syn => syn.includes(word)))) {
      expandedQueries.push(...syns);
      expandedQueries.push(key);
    }
  });
  
  return expandedQueries;
}

// Main search function for remedies
export function searchRemedies(query: string, userRegion?: string): Remedy[] {
  const remedies = (remediesData as any).remedies as Remedy[];
  const expandedQueries = expandQuery(query);
  
  const scoredRemedies = remedies.map(remedy => {
    let totalScore = 0;
    
    expandedQueries.forEach(expandedQuery => {
      totalScore += calculateSimilarity(expandedQuery, remedy.keywords, remedy.remedy);
    });
    
    // Region bonus
    if (userRegion && remedy.region.toLowerCase().includes(userRegion.toLowerCase())) {
      totalScore += 2;
    }
    
    return { ...remedy, score: totalScore };
  });
  
  return scoredRemedies
    .filter(remedy => remedy.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 5);
}

// Search wellness content
export function searchWellness(query: string): WellnessItem[] {
  const wellness = wellnessData as WellnessItem[];
  const expandedQueries = expandQuery(query);
  
  const scoredWellness = wellness.map(item => {
    let totalScore = 0;
    
    expandedQueries.forEach(expandedQuery => {
      totalScore += calculateSimilarity(expandedQuery, item.keywords, item.description);
    });
    
    return { ...item, score: totalScore };
  });
  
  return scoredWellness
    .filter(item => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);
}

// Generate clarifying questions based on query
export function generateClarifyingQuestions(query: string): string[] {
  const normalizedQuery = normalizeText(query);
  const questions: string[] = [];
  
  // Duration-based questions
  if (!normalizedQuery.includes('since') && !normalizedQuery.includes('for')) {
    questions.push("Since when are you experiencing this, beta?");
  }
  
  // Severity questions
  if (!normalizedQuery.includes('severe') && !normalizedQuery.includes('mild') && !normalizedQuery.includes('pain')) {
    if (normalizedQuery.includes('headache') || normalizedQuery.includes('pain')) {
      questions.push("How severe is the pain on a scale of 1 to 10?");
    }
  }
  
  // Associated symptoms
  if (normalizedQuery.includes('fever') && !normalizedQuery.includes('temperature')) {
    questions.push("Do you have any other symptoms like body aches or chills?");
  }
  
  if (normalizedQuery.includes('cough') && !normalizedQuery.includes('dry') && !normalizedQuery.includes('wet')) {
    questions.push("Is it a dry cough or are you bringing up mucus?");
  }
  
  // Red flag questions
  if (normalizedQuery.includes('chest pain') || normalizedQuery.includes('difficulty breathing')) {
    questions.push("Are you having trouble breathing or severe chest pain? If yes, please see a doctor immediately!");
  }
  
  return questions.slice(0, 2); // Limit to 2 questions max
}

// Format remedy response
export function formatRemedyResponse(remedy: Remedy, userQuery: string): string {
  const empathetic_openings = [
    "Arre beta, I understand what you're going through.",
    "Don't worry beta, Nani has a gentle remedy for this.",
    "Beta, let me share a time-tested nuskha that can help.",
    "I know this is bothering you, beta. Here's what Nani suggests:"
  ];
  
  const opening = empathetic_openings[Math.floor(Math.random() * empathetic_openings.length)];
  const closing = "\n\n💛 *Remember beta, if symptoms persist or worsen, please consult a doctor. Nani's remedies are gentle support, not medical treatment.*";
  
  return `${opening}\n\n${remedy.remedy}${closing}`;
}