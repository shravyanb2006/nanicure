import doctorsData from "@/data/doctors_expanded.json";

interface Doctor {
  id: string;
  name: string;
  specialty: string;
  region: string;
  state: string;
  contact: string;
  email: string;
  keywords: string[];
}

interface ScoredDoctor extends Doctor {
  score: number;
  rationale: string;
}

// Synonym mapping for better matching
const synonyms: { [key: string]: string[] } = {
  "heart": ["cardiac", "cardio", "chest", "heart attack", "myocardial"],
  "brain": ["neuro", "head", "neurological", "mental"],
  "stomach": ["gastro", "digestive", "abdominal", "belly"],
  "bone": ["orthopedic", "ortho", "joint", "fracture"],
  "skin": ["dermatology", "rash", "acne", "eczema"],
  "eye": ["vision", "sight", "ophthalmology"],
  "child": ["pediatric", "kids", "baby", "infant"],
  "women": ["gynecology", "female", "pregnancy", "obstetrics"],
  "mental": ["psychiatry", "depression", "anxiety", "stress"],
  "blood": ["hematology", "anemia", "bleeding"],
  "kidney": ["nephrology", "renal", "urine"],
  "lung": ["pulmonology", "breathing", "respiratory", "cough"],
  "diabetes": ["sugar", "insulin", "endocrine"],
  "fever": ["temperature", "infection", "viral"],
  "pain": ["ache", "hurt", "sore"]
};

// Normalize text for better matching
function normalizeText(text: string): string {
  return text.toLowerCase()
    .replace(/[^\w\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

// Expand keywords with synonyms
function expandKeywords(keywords: string[]): string[] {
  const expanded = new Set(keywords.map(k => k.toLowerCase()));
  
  keywords.forEach(keyword => {
    const normalized = normalizeText(keyword);
    Object.entries(synonyms).forEach(([key, values]) => {
      if (values.includes(normalized) || normalized.includes(key)) {
        expanded.add(key);
        values.forEach(v => expanded.add(v));
      }
    });
  });
  
  return Array.from(expanded);
}

// Calculate similarity score between user input and doctor
function calculateScore(userInput: string, doctor: Doctor, userRegion?: string): number {
  const normalizedInput = normalizeText(userInput);
  const inputTokens = normalizedInput.split(' ').filter(t => t.length > 2);
  
  let score = 0;
  
  // Region matching (35% weight)
  if (userRegion && doctor.region.toLowerCase().includes(userRegion.toLowerCase())) {
    score += 0.35;
  } else if (userRegion && doctor.state.toLowerCase().includes(userRegion.toLowerCase())) {
    score += 0.2; // Same state but different region
  }
  
  // Specialty and keyword matching (45% weight)
  const expandedKeywords = expandKeywords(doctor.keywords);
  const specialtyTokens = normalizeText(doctor.specialty).split(' ');
  
  let keywordMatches = 0;
  let totalPossibleMatches = inputTokens.length;
  
  inputTokens.forEach(token => {
    // Check direct keyword matches
    if (expandedKeywords.some(k => k.includes(token) || token.includes(k))) {
      keywordMatches += 1;
    }
    // Check specialty matches
    if (specialtyTokens.some(s => s.includes(token) || token.includes(s))) {
      keywordMatches += 0.8;
    }
  });
  
  if (totalPossibleMatches > 0) {
    score += (keywordMatches / totalPossibleMatches) * 0.45;
  }
  
  // Exact phrase matching bonus (20% weight)
  const fullText = `${doctor.specialty} ${doctor.keywords.join(' ')}`.toLowerCase();
  if (fullText.includes(normalizedInput)) {
    score += 0.2;
  }
  
  return Math.min(score, 1.0); // Cap at 1.0
}

// Generate rationale for why doctor was suggested
function generateRationale(doctor: Doctor, userInput: string, score: number): string {
  const reasons = [];
  
  if (score >= 0.7) {
    reasons.push("Strong specialty match");
  } else if (score >= 0.4) {
    reasons.push("Good relevance match");
  }
  
  const normalizedInput = normalizeText(userInput);
  const matchedKeywords = doctor.keywords.filter(k => 
    normalizedInput.includes(k.toLowerCase()) || k.toLowerCase().includes(normalizedInput)
  );
  
  if (matchedKeywords.length > 0) {
    reasons.push(`matches: ${matchedKeywords.slice(0, 2).join(', ')}`);
  }
  
  reasons.push(`${doctor.specialty.toLowerCase()} specialist`);
  
  return reasons.join(', ');
}

// Main search function
export function searchDoctors(
  userInput: string, 
  userRegion?: string, 
  limit: number = 5
): ScoredDoctor[] {
  if (!userInput.trim()) {
    return [];
  }
  
  // Score all doctors
  const scoredDoctors: ScoredDoctor[] = doctorsData.doctors.map(doctor => {
    const score = calculateScore(userInput, doctor, userRegion);
    const rationale = generateRationale(doctor, userInput, score);
    
    return {
      ...doctor,
      score,
      rationale
    };
  });
  
  // Sort by score (highest first)
  scoredDoctors.sort((a, b) => b.score - a.score);
  
  // Always return at least 5 doctors
  let results = scoredDoctors.slice(0, limit);
  
  // If no good matches, include fallback doctors
  if (results.length < limit || results[0].score < 0.3) {
    // Get regional generalists as fallback
    const regionPattern = userRegion ? userRegion.toLowerCase() : '';
    const fallbackDoctors = doctorsData.doctors
      .filter(d => !results.some(r => r.id === d.id))
      .filter(d => {
        const isGeneralist = d.specialty.toLowerCase().includes('general') || 
                           d.specialty.toLowerCase().includes('family') ||
                           d.specialty.toLowerCase().includes('internal');
        const matchesRegion = !regionPattern || d.region.toLowerCase().includes(regionPattern);
        return isGeneralist && matchesRegion;
      })
      .slice(0, 2)
      .map(doctor => ({
        ...doctor,
        score: 0.25,
        rationale: "General practitioner, available in your region"
      }));
    
    // Fill remaining slots with top specialists
    const remainingSlots = limit - results.length - fallbackDoctors.length;
    const topSpecialists = scoredDoctors
      .filter(d => !results.some(r => r.id === d.id))
      .filter(d => !fallbackDoctors.some(f => f.id === d.id))
      .slice(0, Math.max(remainingSlots, 0));
    
    results = [...results, ...fallbackDoctors, ...topSpecialists].slice(0, limit);
  }
  
  return results;
}

// Get doctor recommendations by region
export function getDoctorsByRegion(region: string, limit: number = 10): Doctor[] {
  return doctorsData.doctors
    .filter(doctor => doctor.region.toLowerCase().includes(region.toLowerCase()))
    .slice(0, limit);
}

// Get doctor by specialty
export function getDoctorsBySpecialty(specialty: string, limit: number = 10): Doctor[] {
  const normalizedSpecialty = normalizeText(specialty);
  
  return doctorsData.doctors
    .filter(doctor => 
      normalizeText(doctor.specialty).includes(normalizedSpecialty) ||
      doctor.keywords.some(k => normalizeText(k).includes(normalizedSpecialty))
    )
    .slice(0, limit);
}