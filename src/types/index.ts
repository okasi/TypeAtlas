// TypeAtlas - Type Definitions

export type BloodType = 'A' | 'B' | 'AB' | 'O';

export type WesternZodiac = 
  | 'aries' | 'taurus' | 'gemini' | 'cancer' 
  | 'leo' | 'virgo' | 'libra' | 'scorpio' 
  | 'sagittarius' | 'capricorn' | 'aquarius' | 'pisces';

export type ChineseZodiac = 
  | 'rat' | 'ox' | 'tiger' | 'rabbit' | 'dragon' 
  | 'snake' | 'horse' | 'goat' | 'monkey' | 'rooster' | 'dog' | 'pig';

export type MBTIType = 
  | 'ISTJ' | 'ISFJ' | 'INFJ' | 'INTJ'
  | 'ISTP' | 'ISFP' | 'INFP' | 'INTP'
  | 'ESTP' | 'ESFP' | 'ENFP' | 'ENTP'
  | 'ESTJ' | 'ESFJ' | 'ENFJ' | 'ENTJ';

export type DoshaType = 'vata' | 'pitta' | 'kapha';
export type EnneagramType = '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9';
export type HogwartsHouse = 'gryffindor' | 'slytherin' | 'ravenclaw' | 'hufflepuff';
export type LoveLanguageType = 'words' | 'time' | 'gifts' | 'service' | 'touch';
export type ChronotypeType = 'lion' | 'bear' | 'wolf' | 'dolphin';
export type BirthstoneType =
  | 'garnet'
  | 'amethyst'
  | 'aquamarine'
  | 'diamond'
  | 'emerald'
  | 'pearl'
  | 'ruby'
  | 'peridot'
  | 'sapphire'
  | 'opal'
  | 'topaz'
  | 'turquoise';
export type FlowView =
  | 'landing'
  | 'form'
  | 'quiz-mbti'
  | 'quiz-dosha'
  | 'quiz-signals'
  | 'loading'
  | 'result'
  | 'mealplan'
  | 'closing';

export interface DoshaScores {
  vata: number;
  pitta: number;
  kapha: number;
}

export interface MBTIScores {
  E: number; // Extraversion
  I: number; // Introversion
  S: number; // Sensing
  N: number; // Intuition
  T: number; // Thinking
  F: number; // Feeling
  J: number; // Judging
  P: number; // Perceiving
}

export interface UserProfile {
  name: string;
  birthDate: string;
  birthYear: number;
  bloodType?: BloodType;
  westernZodiac: WesternZodiac;
  chineseZodiac: ChineseZodiac;
  mbti: MBTIType;
  dosha: DoshaScores;
  dominantDosha: DoshaType;
  enneagram?: EnneagramType;
  hogwartsHouse?: HogwartsHouse;
  loveLanguage?: LoveLanguageType;
  chronotype?: ChronotypeType;
  birthstone?: BirthstoneType;
}

export interface ZodiacInfo {
  name: string;
  symbol: string;
  element: 'fire' | 'earth' | 'air' | 'water';
  traits: string[];
  description: string;
  foods: {
    recommended: string[];
    limit: string[];
  };
  cookingStyles: string[];
  macros: {
    protein: number;
    carbs: number;
    fats: number;
  };
}

export interface ChineseZodiacInfo {
  name: string;
  animal: string;
  element: 'wood' | 'fire' | 'earth' | 'metal' | 'water';
  yinYang: 'yin' | 'yang';
  traits: string[];
  description: string;
  foods: {
    recommended: string[];
    limit: string[];
  };
}

export interface BloodTypeInfo {
  type: BloodType;
  traits: string[];
  description: string;
  koreanPersonality: {
    title: string;
    traits: string[];
    description: string;
  };
  foods: {
    highlyBeneficial: string[];
    neutral: string[];
    avoid: string[];
  };
  exercise: string[];
  macros: {
    protein: number;
    carbs: number;
    fats: number;
  };
}

export interface MBTIInfo {
  type: MBTIType;
  name: string;
  description: string;
  traits: string[];
  dietStyle: string;
  eatingHabits: string[];
  recommendedFoods: string[];
  foodsToLimit: string[];
  mealTiming: string;
  macros: {
    protein: number;
    carbs: number;
    fats: number;
  };
}

export interface DoshaInfo {
  type: DoshaType;
  name: string;
  elements: string;
  qualities: string[];
  description: string;
  physicalTraits: string[];
  emotionalTraits: string[];
  foods: {
    favor: string[];
    reduce: string[];
    avoid: string[];
  };
  cookingMethods: string[];
  spices: string[];
  mealTiming: string;
  macros: {
    protein: number;
    carbs: number;
    fats: number;
  };
}

export interface MealPlan {
  day: number;
  title: string;
  breakfast: string;
  lunch: string;
  dinner: string;
  snack: string;
  focus: string;
}

export interface SacredArchetype {
  name: string;
  title: string;
  description: string;
  narrative: string;
  dietStyle: string;
  signatureThemes: string[];
  mealRhythm: string;
  macros: {
    protein: number;
    carbs: number;
    fats: number;
    fiber: number;
    hydration: string;
  };
  ingredientsToPrioritize: string[];
  foodsToAvoid: string[];
  rituals: string[];
  insight: string;
}

export interface QuizQuestion {
  id: number;
  category: string;
  question: string;
  info?: string;
  options: {
    text: string;
    emoji: string;
    scores: Partial<MBTIScores> | Partial<DoshaScores>;
  }[];
}

export interface AppState {
  currentStep: number;
  userProfile: Partial<UserProfile>;
  mbtiAnswers: number[];
  doshaAnswers: number[];
  result: SacredArchetype | null;
}

export interface LiveProfileSummary {
  bloodType?: BloodType;
  westernZodiac?: WesternZodiac;
  chineseZodiac?: ChineseZodiac;
  mbti?: MBTIType;
  dominantDosha?: DoshaType;
  enneagram?: EnneagramType;
  hogwartsHouse?: HogwartsHouse;
  loveLanguage?: LoveLanguageType;
  chronotype?: ChronotypeType;
  birthstone?: BirthstoneType;
}

export interface LiveParticipant {
  sessionId: string;
  name: string;
  view: FlowView;
  progress: number;
  progressLabel: string;
  isComplete: boolean;
  updatedAt: number;
  result: SacredArchetype | null;
  profileSummary: LiveProfileSummary | null;
}

export interface LivePresenceUpdatePayload {
  sessionId: string;
  name: string;
  view: FlowView;
  progress: number;
  progressLabel: string;
  isComplete: boolean;
  result: SacredArchetype | null;
  profileSummary: LiveProfileSummary | null;
}
