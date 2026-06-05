import type { MBTIType, MBTIInfo, QuizQuestion, MBTIScores } from '@/types';

export const mbtiData: Record<MBTIType, MBTIInfo> = {
  ISTJ: {
    type: 'ISTJ',
    name: 'The Logistician',
    description: 'Practical, fact-minded, and reliable. You value tradition and order in all aspects of life.',
    traits: ['Responsible', 'Organized', 'Practical', 'Reliable', 'Detail-oriented'],
    dietStyle: 'Structured and consistent meal planning with traditional, proven nutrition approaches.',
    eatingHabits: [
      'Prefers regular meal times',
      'Enjoys familiar foods',
      'Plans meals in advance',
      'Values nutritional information',
      'Sticks to what works'
    ],
    recommendedFoods: [
      'Whole grains',
      'Lean proteins',
      'Root vegetables',
      'Traditional dishes',
      'Meal-prepped foods',
      'Reliable staples'
    ],
    foodsToLimit: [
      'Trendy superfoods',
      'Unfamiliar cuisines',
      'Overly complex recipes',
      'Spontaneous eating'
    ],
    mealTiming: 'Three consistent meals daily at set times',
    macros: { protein: 30, carbs: 45, fats: 25 }
  },
  ISFJ: {
    type: 'ISFJ',
    name: 'The Defender',
    description: 'Warm, caring, and protective. You find joy in nurturing others and creating comfort.',
    traits: ['Nurturing', 'Reliable', 'Patient', 'Supportive', 'Detail-oriented'],
    dietStyle: 'Comforting, home-cooked meals that nurture both body and soul.',
    eatingHabits: [
      'Enjoys cooking for others',
      'Prefers home meals',
      'Values family recipes',
      'Eats mindfully',
      'Creates cozy eating environments'
    ],
    recommendedFoods: [
      'Comfort foods',
      'Home-cooked meals',
      'Soups and stews',
      'Family recipes',
      'Nourishing ingredients',
      'Warm foods'
    ],
    foodsToLimit: [
      'Fast food',
      'Eating alone',
      'Cold meals',
      'Overly spicy foods'
    ],
    mealTiming: 'Relaxed meals with family or loved ones',
    macros: { protein: 25, carbs: 50, fats: 25 }
  },
  INFJ: {
    type: 'INFJ',
    name: 'The Advocate',
    description: 'Quiet, mystical, and idealistic. You seek meaning and connection in everything.',
    traits: ['Insightful', 'Idealistic', 'Compassionate', 'Determined', 'Complex'],
    dietStyle: 'Mindful, ethical eating aligned with personal values and spiritual wellbeing.',
    eatingHabits: [
      'Eats with intention',
      'Values food origins',
      'May prefer plant-based options',
      'Creates ritual around meals',
      'Seeks deeper meaning in nutrition'
    ],
    recommendedFoods: [
      'Plant-based proteins',
      'Organic vegetables',
      'Ancient grains',
      'Ethically sourced foods',
      'Mediterranean diet',
      'Anti-inflammatory foods'
    ],
    foodsToLimit: [
      'Factory-farmed meats',
      'Processed foods',
      'Unethical sources',
      'Mindless eating'
    ],
    mealTiming: 'Mindful eating when truly hungry',
    macros: { protein: 25, carbs: 50, fats: 25 }
  },
  INTJ: {
    type: 'INTJ',
    name: 'The Architect',
    description: 'Strategic, logical, and independent. You approach everything with a long-term plan.',
    traits: ['Strategic', 'Independent', 'Analytical', 'Determined', 'Visionary'],
    dietStyle: 'Data-driven, optimized nutrition based on research and efficiency.',
    eatingHabits: [
      'Researches nutrition thoroughly',
      'Optimizes for performance',
      'Meal preps systematically',
      'Tracks nutrients',
      'Values efficiency'
    ],
    recommendedFoods: [
      'High-performance foods',
      'Nutrient-dense options',
      'Brain-boosting nutrients',
      'Optimized macros',
      'Scientifically-backed choices',
      'Efficient proteins'
    ],
    foodsToLimit: [
      'Empty calories',
      'Unnecessary snacks',
      'Inefficient foods',
      'Emotional eating'
    ],
    mealTiming: 'Strategic meal timing for optimal performance',
    macros: { protein: 35, carbs: 35, fats: 30 }
  },
  ISTP: {
    type: 'ISTP',
    name: 'The Virtuoso',
    description: 'Practical, observant, and spontaneous. You live in the moment and master tools.',
    traits: ['Practical', 'Adaptable', 'Independent', 'Action-oriented', 'Observant'],
    dietStyle: 'Flexible, practical nutrition that adapts to your active lifestyle.',
    eatingHabits: [
      'Eats when convenient',
      'Prefers simple preparation',
      'Adapts to situations',
      'Values portability',
      'Practical choices'
    ],
    recommendedFoods: [
      'Portable proteins',
      'Quick vegetables',
      'Simple grains',
      'Grab-and-go options',
      'Minimal prep foods',
      'Energy-dense snacks'
    ],
    foodsToLimit: [
      'Complex recipes',
      'Rigid meal plans',
      'Time-consuming prep',
      'Restrictive diets'
    ],
    mealTiming: 'Flexible, eating when hungry or convenient',
    macros: { protein: 30, carbs: 45, fats: 25 }
  },
  ISFP: {
    type: 'ISFP',
    name: 'The Adventurer',
    description: 'Flexible, charming, and artistic. You live for new experiences and beauty.',
    traits: ['Artistic', 'Flexible', 'Spontaneous', 'Sensitive', 'Present-focused'],
    dietStyle: 'Sensory-rich, aesthetically pleasing meals that delight the senses.',
    eatingHabits: [
      'Appreciates beautiful presentation',
      'Enjoys new flavors',
      'Eats based on mood',
      'Values sensory experience',
      'Flexible approach'
    ],
    recommendedFoods: [
      'Colorful vegetables',
      'Artistic presentations',
      'International cuisines',
      'Fresh ingredients',
      'Beautiful fruits',
      'Sensory-rich meals'
    ],
    foodsToLimit: [
      'Boring presentations',
      'Repetitive meals',
      'Rigid structures',
      'Uninspiring foods'
    ],
    mealTiming: 'Spontaneous, eating when inspired or hungry',
    macros: { protein: 25, carbs: 50, fats: 25 }
  },
  INFP: {
    type: 'INFP',
    name: 'The Mediator',
    description: 'Poetic, kind, and altruistic. You seek harmony and meaning in life.',
    traits: ['Idealistic', 'Compassionate', 'Creative', 'Authentic', 'Harmony-seeking'],
    dietStyle: 'Gentle, intuitive eating that honors your emotions and values.',
    eatingHabits: [
      'Eats based on feelings',
      'Values ethical choices',
      'Creates comfort through food',
      'Intuitive approach',
      'Emotional connection to meals'
    ],
    recommendedFoods: [
      'Comforting foods',
      'Plant-based options',
      'Gentle flavors',
      'Soul-nourishing meals',
      'Ethical ingredients',
      'Warm, cozy foods'
    ],
    foodsToLimit: [
      'Harsh stimulants',
      'Conflict-inducing foods',
      'Overly processed items',
      'Stressful eating environments'
    ],
    mealTiming: 'Intuitive eating based on hunger and emotions',
    macros: { protein: 22, carbs: 53, fats: 25 }
  },
  INTP: {
    type: 'INTP',
    name: 'The Logician',
    description: 'Innovative, curious, and analytical. You love theories and abstract thinking.',
    traits: ['Analytical', 'Curious', 'Objective', 'Independent', 'Theoretical'],
    dietStyle: 'Intellectually stimulating nutrition that satisfies your analytical mind.',
    eatingHabits: [
      'Experiments with nutrition',
      'Researches extensively',
      'Forgets to eat when focused',
      'Values understanding',
      'Theoretical approach'
    ],
    recommendedFoods: [
      'Brain-boosting foods',
      'Novel ingredients',
      'Scientifically interesting options',
      'Cognitive enhancers',
      'Omega-rich foods',
      'Antioxidant-dense choices'
    ],
    foodsToLimit: [
      'Overly simple meals',
      'Uninteresting foods',
      'Mindless eating',
      'Nutritionally empty options'
    ],
    mealTiming: 'Irregular, often forgetting meals when engrossed',
    macros: { protein: 30, carbs: 40, fats: 30 }
  },
  ESTP: {
    type: 'ESTP',
    name: 'The Entrepreneur',
    description: 'Energetic, perceptive, and action-oriented. You live for the here and now.',
    traits: ['Energetic', 'Practical', 'Spontaneous', 'Perceptive', 'Action-oriented'],
    dietStyle: 'High-energy, convenient nutrition that keeps up with your fast-paced life.',
    eatingHabits: [
      'Eats on the go',
      'Prefers quick meals',
      'Seeks immediate satisfaction',
      'Values convenience',
      'Spontaneous choices'
    ],
    recommendedFoods: [
      'Quick proteins',
      'Energy-boosting foods',
      'Portable options',
      'Immediate gratification',
      'High-energy snacks',
      'Fast fuel'
    ],
    foodsToLimit: [
      'Slow-cooking meals',
      'Complex preparation',
      'Waiting for food',
      'Low-energy options'
    ],
    mealTiming: 'Frequent, quick meals throughout the day',
    macros: { protein: 30, carbs: 50, fats: 20 }
  },
  ESFP: {
    type: 'ESFP',
    name: 'The Entertainer',
    description: 'Spontaneous, energetic, and enthusiastic. You love life and people.',
    traits: ['Spontaneous', 'Energetic', 'Sociable', 'Playful', 'Present-focused'],
    dietStyle: 'Social, fun eating experiences shared with others.',
    eatingHabits: [
      'Eats socially',
      'Enjoys trying new restaurants',
      'Loves shared meals',
      'Values experience',
      'Fun approach'
    ],
    recommendedFoods: [
      'Social foods',
      'Shared plates',
      'Restaurant experiences',
      'Fun presentations',
      'Party foods (healthy)',
      'Celebration meals'
    ],
    foodsToLimit: [
      'Eating alone',
      'Boring meals',
      'Restrictive diets',
      'Unsocial eating'
    ],
    mealTiming: 'Social eating with friends and family',
    macros: { protein: 25, carbs: 50, fats: 25 }
  },
  ENFP: {
    type: 'ENFP',
    name: 'The Campaigner',
    description: 'Enthusiastic, creative, and sociable. You see life as full of possibilities.',
    traits: ['Enthusiastic', 'Creative', 'Sociable', 'Imaginative', 'Spontaneous'],
    dietStyle: 'Varied, exciting nutrition that matches your enthusiasm for life.',
    eatingHabits: [
      'Loves variety',
      'Tries new foods constantly',
      'Eats based on excitement',
      'Values novelty',
      'Enthusiastic approach'
    ],
    recommendedFoods: [
      'Diverse cuisines',
      'Colorful meals',
      'Novel ingredients',
      'Exciting flavors',
      'International foods',
      'Creative combinations'
    ],
    foodsToLimit: [
      'Boring routines',
      'Repetitive meals',
      'Restrictive plans',
      'Uninspiring foods'
    ],
    mealTiming: 'Varied, eating when excited or social',
    macros: { protein: 25, carbs: 50, fats: 25 }
  },
  ENTP: {
    type: 'ENTP',
    name: 'The Debater',
    description: 'Smart, curious, and intellectual. You love mental challenges and debate.',
    traits: ['Innovative', 'Curious', 'Intellectual', 'Spontaneous', 'Resourceful'],
    dietStyle: 'Experimental, cutting-edge nutrition that challenges conventional wisdom.',
    eatingHabits: [
      'Experiments with diets',
      'Debates nutrition theories',
      'Tries biohacking',
      'Values innovation',
      'Challenges norms'
    ],
    recommendedFoods: [
      'Cutting-edge superfoods',
      'Biohacking ingredients',
      'Novel nutrition approaches',
      'Experimental options',
      'Nootropic foods',
      'Performance enhancers'
    ],
    foodsToLimit: [
      'Conventional wisdom',
      'Boring traditions',
      'Unchallenged beliefs',
      'Outdated approaches'
    ],
    mealTiming: 'Irregular, based on experiments and curiosity',
    macros: { protein: 30, carbs: 40, fats: 30 }
  },
  ESTJ: {
    type: 'ESTJ',
    name: 'The Executive',
    description: 'Efficient, organized, and natural leaders. You value tradition and order.',
    traits: ['Efficient', 'Organized', 'Direct', 'Traditional', 'Leadership-oriented'],
    dietStyle: 'Disciplined, structured nutrition with clear rules and results.',
    eatingHabits: [
      'Follows clear plans',
      'Values discipline',
      'Sets nutrition goals',
      'Structured approach',
      'Results-focused'
    ],
    recommendedFoods: [
      'High-performance foods',
      'Structured meal plans',
      'Proven nutrition',
      'Goal-supporting choices',
      'Efficient proteins',
      'Results-driven options'
    ],
    foodsToLimit: [
      'Unstructured eating',
      'Unclear guidelines',
      'Inefficient choices',
      'Wasted calories'
    ],
    mealTiming: 'Structured, disciplined meal schedule',
    macros: { protein: 35, carbs: 40, fats: 25 }
  },
  ESFJ: {
    type: 'ESFJ',
    name: 'The Consul',
    description: 'Caring, social, and popular. You are always eager to help others.',
    traits: ['Caring', 'Social', 'Popular', 'Supportive', 'Traditional'],
    dietStyle: 'Nurturing, social nutrition that brings people together.',
    eatingHabits: [
      'Cooks for others',
      'Hosts gatherings',
      'Values tradition',
      'Social approach',
      'Nurturing through food'
    ],
    recommendedFoods: [
      'Traditional meals',
      'Crowd-pleasing foods',
      'Comfort classics',
      'Social dishes',
      'Family recipes',
      'Nourishing options'
    ],
    foodsToLimit: [
      'Eating alone',
      'Unsocial meals',
      'Breaking traditions',
      'Isolating foods'
    ],
    mealTiming: 'Regular social meals with community',
    macros: { protein: 25, carbs: 50, fats: 25 }
  },
  ENFJ: {
    type: 'ENFJ',
    name: 'The Protagonist',
    description: 'Charismatic, inspiring, and natural leaders. You help others grow.',
    traits: ['Charismatic', 'Inspiring', 'Altruistic', 'Natural leader', 'Empathetic'],
    dietStyle: 'Inspiring, altruistic nutrition that sets a positive example.',
    eatingHabits: [
      'Leads by example',
      'Inspires healthy choices',
      'Values community health',
      'Influential approach',
      'Teaching through food'
    ],
    recommendedFoods: [
      'Inspiring healthy foods',
      'Community-supported options',
      'Sustainable choices',
      'Ethical ingredients',
      'Health-forward meals',
      'Example-setting options'
    ],
    foodsToLimit: [
      'Unethical sources',
      'Poor examples',
      'Harmful choices',
      'Uninspiring options'
    ],
    mealTiming: 'Shared meals that inspire and connect',
    macros: { protein: 28, carbs: 47, fats: 25 }
  },
  ENTJ: {
    type: 'ENTJ',
    name: 'The Commander',
    description: 'Bold, imaginative, and strong-willed. You are natural-born leaders.',
    traits: ['Bold', 'Strategic', 'Efficient', 'Natural leader', 'Ambitious'],
    dietStyle: 'High-performance, strategic nutrition optimized for success.',
    eatingHabits: [
      'Optimizes for performance',
      'Strategic meal planning',
      'Values efficiency',
      'Results-driven',
      'Leadership approach'
    ],
    recommendedFoods: [
      'High-performance foods',
      'Strategic nutrition',
      'Success-supporting choices',
      'Elite ingredients',
      'Optimized macros',
      'Victory meals'
    ],
    foodsToLimit: [
      'Inefficient foods',
      'Performance-limiting choices',
      'Weak options',
      'Unstrategic eating'
    ],
    mealTiming: 'Strategic fueling for peak performance',
    macros: { protein: 35, carbs: 35, fats: 30 }
  }
};

export const mbtiQuizQuestions: QuizQuestion[] = [
  {
    id: 1,
    category: 'Energy & Social Style',
    question: 'After a long week, how do you prefer to recharge?',
    info: 'Your recharge ritual is a quiet signal of where your nervous system goes to feel like itself again.',
    options: [
      { text: 'Spend quiet time alone reading or reflecting', emoji: '📚', scores: { I: 3, E: 0 } },
      { text: 'Have a deep one-on-one conversation', emoji: '💬', scores: { I: 2, E: 1 } },
      { text: 'Meet a small group of friends', emoji: '👥', scores: { I: 1, E: 2 } },
      { text: 'Go to a social gathering or event', emoji: '🎉', scores: { I: 0, E: 3 } }
    ]
  },
  {
    id: 2,
    category: 'Information & Decisions',
    question: 'When learning something new and making decisions, what appeals to you most?',
    info: 'Some minds trust what can be held in the hand; others follow the pattern hiding behind the facts.',
    options: [
      { text: 'Concrete facts, practical applications, and logical analysis', emoji: '📊', scores: { S: 2, N: 0, T: 2, F: 0 } },
      { text: 'Proven methods, step-by-step details, and objective criteria', emoji: '📋', scores: { S: 3, N: 0, T: 1, F: 1 } },
      { text: 'Big picture thinking, future possibilities, and how it affects people', emoji: '🔮', scores: { S: 0, N: 2, T: 0, F: 2 } },
      { text: 'Abstract concepts, innovative theories, and personal values', emoji: '💡', scores: { S: 0, N: 3, T: 0, F: 3 } }
    ]
  },
  {
    id: 3,
    category: 'Problem Solving',
    question: 'When facing a challenge, your approach is to:',
    info: 'Your first instinct often points to the known path, the hidden door, or a new map entirely.',
    options: [
      { text: 'Focus on practical, immediate solutions using proven methods', emoji: '🔧', scores: { S: 3, N: 0 } },
      { text: 'Use tried-and-true approaches that have worked before', emoji: '🛠️', scores: { S: 2, N: 1 } },
      { text: 'Brainstorm creative alternatives and new possibilities', emoji: '🎨', scores: { S: 1, N: 2 } },
      { text: 'Look for innovative, unconventional approaches', emoji: '🚀', scores: { S: 0, N: 3 } }
    ]
  },
  {
    id: 4,
    category: 'Lifestyle & Organization',
    question: 'How do you prefer to organize your daily life?',
    info: 'The way you hold time says a lot about whether structure steadies you or possibility keeps you alive.',
    options: [
      { text: 'Detailed schedules and clear plans with deadlines', emoji: '📅', scores: { J: 3, P: 0 } },
      { text: 'To-do lists and structured routines', emoji: '✅', scores: { J: 2, P: 1 } },
      { text: 'Flexible plans that can adapt to changes', emoji: '🌊', scores: { J: 1, P: 2 } },
      { text: 'Go with the flow and stay spontaneous', emoji: '🦋', scores: { J: 0, P: 3 } }
    ]
  },
  {
    id: 5,
    category: 'Work & Social Environment',
    question: 'What environment helps you thrive?',
    info: 'Your best environment is less about productivity and more about the conditions that let your instincts sharpen.',
    options: [
      { text: 'Clear deadlines, structured processes, and time to observe', emoji: '🏢', scores: { J: 2, P: 0, I: 2, E: 0 } },
      { text: 'Organized space with defined goals and thoughtful contribution', emoji: '📐', scores: { J: 3, P: 0, I: 1, E: 1 } },
      { text: 'Freedom to explore and actively engaging with others', emoji: '🌈', scores: { J: 0, P: 2, I: 0, E: 2 } },
      { text: 'Dynamic, ever-changing challenges and leading the group', emoji: '⚡', scores: { J: 0, P: 3, I: 0, E: 3 } }
    ]
  }
];

export function calculateMBTI(answers: number[]): MBTIType {
  const scores: MBTIScores = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 };
  
  answers.forEach((answerIndex, questionIndex) => {
    const question = mbtiQuizQuestions[questionIndex];
    if (question) {
      const selectedOption = question.options[answerIndex];
      if (selectedOption) {
        Object.entries(selectedOption.scores).forEach(([trait, score]) => {
          scores[trait as keyof MBTIScores] += score;
        });
      }
    }
  });
  
  const type = 
    (scores.E >= scores.I ? 'E' : 'I') +
    (scores.S >= scores.N ? 'S' : 'N') +
    (scores.T >= scores.F ? 'T' : 'F') +
    (scores.J >= scores.P ? 'J' : 'P');
  
  return type as MBTIType;
}
