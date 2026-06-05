import type { DoshaType, DoshaInfo, DoshaScores, QuizQuestion } from '@/types';

export const doshaData: Record<DoshaType, DoshaInfo> = {
  vata: {
    type: 'vata',
    name: 'Vata',
    elements: 'Air + Space',
    qualities: ['Light', 'Dry', 'Cold', 'Mobile', 'Subtle', 'Clear'],
    description: 'Vata governs movement and communication. When balanced, you are creative, enthusiastic, and adaptable. When imbalanced, you may experience anxiety, dryness, and irregular digestion.',
    physicalTraits: [
      'Light, thin build',
      'Dry skin and hair',
      'Cold hands and feet',
      'Irregular appetite',
      'Light, interrupted sleep',
      'Quick, energetic movements'
    ],
    emotionalTraits: [
      'Creative and imaginative',
      'Enthusiastic when balanced',
      'Anxious when stressed',
      'Changeable moods',
      'Quick to learn and forget'
    ],
    foods: {
      favor: [
        'Warm, cooked foods',
        'Soups and stews',
        'Healthy fats (ghee, olive oil)',
        'Sweet, sour, salty tastes',
        'Root vegetables',
        'Rice and wheat',
        'Bananas and mangoes',
        'Nuts and seeds',
        'Warm spices (ginger, cinnamon)'
      ],
      reduce: [
        'Raw vegetables',
        'Dry, crunchy foods',
        'Cold foods and drinks',
        'Bitter and astringent tastes',
        'Legumes (in excess)',
        'Caffeine'
      ],
      avoid: [
        'Ice-cold beverages',
        'Excessive raw foods',
        'Dried fruits',
        'Popcorn and crackers',
        'Frozen foods'
      ]
    },
    cookingMethods: [
      'Slow cooking',
      'Steaming',
      'Light sautéing',
      'Baking',
      'Stewing'
    ],
    spices: [
      'Fresh ginger',
      'Cinnamon',
      'Cardamom',
      'Cumin',
      'Fennel',
      'Turmeric',
      'Black pepper'
    ],
    mealTiming: 'Regular meal times are crucial. Eat warm, nourishing meals at consistent hours.',
    macros: { protein: 20, carbs: 55, fats: 25 }
  },
  pitta: {
    type: 'pitta',
    name: 'Pitta',
    elements: 'Fire + Water',
    qualities: ['Hot', 'Sharp', 'Light', 'Oily', 'Liquid', 'Spreading'],
    description: 'Pitta governs transformation and metabolism. When balanced, you are focused, intelligent, and have strong digestion. When imbalanced, you may experience irritability, inflammation, and excess heat.',
    physicalTraits: [
      'Medium build',
      'Warm skin temperature',
      'Strong appetite',
      'Good digestion',
      'Bright eyes',
      'Tendency toward redness'
    ],
    emotionalTraits: [
      'Focused and determined',
      'Natural leaders',
      'Sharp intellect',
      'Can be critical when stressed',
      'Passionate and competitive'
    ],
    foods: {
      favor: [
        'Cool or warm (not hot) foods',
        'Sweet, bitter, astringent tastes',
        'Fresh fruits',
        'Leafy greens',
        'Cucumber and melons',
        'Coconut',
        'Sweet grains',
        'White meat',
        'Cooling herbs'
      ],
      reduce: [
        'Hot, spicy foods',
        'Sour foods',
        'Fermented foods',
        'Tomatoes and citrus',
        'Red meat',
        'Alcohol',
        'Coffee'
      ],
      avoid: [
        'Extremely spicy foods',
        'Chili peppers',
        'Vinegar',
        'Hard alcohol',
        'Fried foods',
        'Excessive salt'
      ]
    },
    cookingMethods: [
      'Steaming',
      'Blanching',
      'Raw preparations',
      'Light sautéing',
      'Poaching'
    ],
    spices: [
      'Cilantro',
      'Mint',
      'Fennel',
      'Cardamom',
      'Coriander',
      'Turmeric',
      'Saffron'
    ],
    mealTiming: 'Eat when hungry but avoid skipping meals. Three regular meals work best.',
    macros: { protein: 25, carbs: 50, fats: 25 }
  },
  kapha: {
    type: 'kapha',
    name: 'Kapha',
    elements: 'Earth + Water',
    qualities: ['Heavy', 'Slow', 'Cool', 'Oily', 'Smooth', 'Dense', 'Soft', 'Stable'],
    description: 'Kapha governs structure and stability. When balanced, you are calm, nurturing, and have excellent stamina. When imbalanced, you may experience lethargy, weight gain, and attachment.',
    physicalTraits: [
      'Solid, sturdy build',
      'Smooth, oily skin',
      'Thick hair',
      'Steady appetite',
      'Deep, heavy sleep',
      'Slow, graceful movements'
    ],
    emotionalTraits: [
      'Calm and grounded',
      'Nurturing and supportive',
      'Patient and steady',
      'Can be possessive when stressed',
      'Resistant to change'
    ],
    foods: {
      favor: [
        'Light, warm foods',
        'Pungent, bitter, astringent tastes',
        'Leafy greens',
        'Light grains (barley, millet)',
        'Honey (in moderation)',
        'Spicy foods',
        'Light fruits (apples, pears)',
        'Lean proteins',
        'Stimulating herbs'
      ],
      reduce: [
        'Heavy, oily foods',
        'Sweet tastes',
        'Dairy products',
        'Wheat and rice',
        'Red meat',
        'Tropical fruits',
        'Cold foods'
      ],
      avoid: [
        'Fried foods',
        'Excessive dairy',
        'Ice cream',
        'Heavy desserts',
        'Processed sugars',
        'Overeating'
      ]
    },
    cookingMethods: [
      'Baking',
      'Broiling',
      'Grilling',
      'Light sautéing',
      'Steaming'
    ],
    spices: [
      'Ginger',
      'Black pepper',
      'Cayenne',
      'Mustard seeds',
      'Turmeric',
      'Cinnamon',
      'Cloves'
    ],
    mealTiming: 'Light breakfast, main meal at lunch, light early dinner. Avoid eating late.',
    macros: { protein: 30, carbs: 40, fats: 30 }
  }
};

export const doshaQuizQuestions: QuizQuestion[] = [
  {
    id: 1,
    category: 'Body & Build',
    question: 'Which best describes your natural body frame and skin?',
    info: 'Ayurveda reads the body as a climate map, with lightness, heat, and steadiness each leaving their trace.',
    options: [
      { text: 'Thin, light build; dry skin; difficulty gaining weight', emoji: '🌬️', scores: { vata: 3, pitta: 0, kapha: 0 } },
      { text: 'Medium build; warm skin; can gain or lose weight easily', emoji: '🔥', scores: { vata: 0, pitta: 3, kapha: 0 } },
      { text: 'Solid, sturdy build; smooth, oily skin; tendency to gain weight', emoji: '🏔️', scores: { vata: 0, pitta: 0, kapha: 3 } },
      { text: 'Balanced build with mixed characteristics', emoji: '⚖️', scores: { vata: 1, pitta: 1, kapha: 1 } }
    ]
  },
  {
    id: 2,
    category: 'Energy & Digestion',
    question: 'How would you describe your typical energy and digestion?',
    info: 'Digestion is treated as a central fire in Ayurveda, shaping mood, stamina, and how well the day lands in you.',
    options: [
      { text: 'Variable energy with bursts and crashes; irregular appetite, gas/bloating', emoji: '⚡', scores: { vata: 3, pitta: 0, kapha: 0 } },
      { text: 'Strong, focused energy; sharp digestion, strong appetite, can get heartburn', emoji: '🌶️', scores: { vata: 0, pitta: 3, kapha: 0 } },
      { text: 'Steady, enduring energy; slow digestion, feels heavy after meals', emoji: '🐢', scores: { vata: 0, pitta: 0, kapha: 3 } },
      { text: 'Moderate energy with good balance; generally good digestion', emoji: '☯️', scores: { vata: 1, pitta: 1, kapha: 1 } }
    ]
  },
  {
    id: 3,
    category: 'Climate & Environment',
    question: 'Which climate and conditions do you feel most comfortable in?',
    info: 'The weather you crave can mirror what your system is trying to balance.',
    options: [
      { text: 'Warm, humid climates; dislike cold, wind, and dryness', emoji: '🌴', scores: { vata: 3, pitta: 0, kapha: 0 } },
      { text: 'Cool climates; dislike heat, strong sun, and humidity', emoji: '❄️', scores: { vata: 0, pitta: 3, kapha: 0 } },
      { text: 'Warm, dry climates; dislike cold, damp, and heavy conditions', emoji: '🏜️', scores: { vata: 0, pitta: 0, kapha: 3 } },
      { text: 'Adaptable to various climates and conditions', emoji: '🌍', scores: { vata: 1, pitta: 1, kapha: 1 } }
    ]
  },
  {
    id: 4,
    category: 'Mind & Emotions',
    question: 'Which emotional and mental patterns resonate with you most?',
    info: 'Your mental rhythm points to the element that moves you.',
    options: [
      { text: 'Creative, enthusiastic, quick to learn but prone to worry and changeability', emoji: '🎭', scores: { vata: 3, pitta: 0, kapha: 0 } },
      { text: 'Focused, passionate, sharp intellect but can be critical and intense', emoji: '🎯', scores: { vata: 0, pitta: 3, kapha: 0 } },
      { text: 'Calm, nurturing, patient but can be possessive and resistant to change', emoji: '🧘', scores: { vata: 0, pitta: 0, kapha: 3 } },
      { text: 'Balanced emotional expression with good adaptability and steady mind', emoji: '☮️', scores: { vata: 1, pitta: 1, kapha: 1 } }
    ]
  }
];

export function calculateDosha(answers: number[]): DoshaScores {
  const scores: DoshaScores = { vata: 0, pitta: 0, kapha: 0 };
  
  answers.forEach((answerIndex, questionIndex) => {
    const question = doshaQuizQuestions[questionIndex];
    if (question) {
      const selectedOption = question.options[answerIndex];
      if (selectedOption) {
        Object.entries(selectedOption.scores).forEach(([dosha, score]) => {
          scores[dosha as DoshaType] += score;
        });
      }
    }
  });
  
  return scores;
}

export function getDominantDosha(scores: DoshaScores): DoshaType {
  const { vata, pitta, kapha } = scores;
  
  if (vata >= pitta && vata >= kapha) return 'vata';
  if (pitta >= vata && pitta >= kapha) return 'pitta';
  return 'kapha';
}

export function getDoshaPercentages(scores: DoshaScores): Record<DoshaType, number> {
  const total = scores.vata + scores.pitta + scores.kapha;
  if (total === 0) return { vata: 33, pitta: 33, kapha: 34 };
  
  return {
    vata: Math.round((scores.vata / total) * 100),
    pitta: Math.round((scores.pitta / total) * 100),
    kapha: Math.round((scores.kapha / total) * 100)
  };
}
