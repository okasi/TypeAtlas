import type {
  BirthstoneType,
  ChronotypeType,
  EnneagramType,
  HogwartsHouse,
  LoveLanguageType,
} from '@/types';

export interface AtlasSignalQuestionOption {
  value?: string;
  title: string;
  description: string;
  emoji: string;
}

export interface AtlasSignalQuestion {
  id: 'enneagram' | 'hogwartsHouse' | 'loveLanguage' | 'chronotype';
  category: string;
  question: string;
  helper: string;
  options: AtlasSignalQuestionOption[];
}

export const atlasSignalQuestions: AtlasSignalQuestion[] = [
  {
    id: 'enneagram',
    category: 'Enneagram',
    question: 'Which core motivation feels most familiar to you?',
    helper: 'This is a lightweight self-sort, not a formal Enneagram assessment.',
    options: [
      { value: '1', title: 'Type 1', description: 'I want to be good, principled, and correct.', emoji: '⚖️' },
      { value: '2', title: 'Type 2', description: 'I want to be helpful, loved, and needed.', emoji: '🤝' },
      { value: '3', title: 'Type 3', description: 'I want to succeed, perform, and be admired.', emoji: '🏁' },
      { value: '4', title: 'Type 4', description: 'I want to be authentic, expressive, and deeply myself.', emoji: '🎭' },
      { value: '5', title: 'Type 5', description: 'I want to understand, conserve energy, and stay capable.', emoji: '🔎' },
      { value: '6', title: 'Type 6', description: 'I want security, trust, and a dependable plan.', emoji: '🛡️' },
      { value: '7', title: 'Type 7', description: 'I want freedom, stimulation, and options.', emoji: '🎈' },
      { value: '8', title: 'Type 8', description: 'I want strength, autonomy, and control over my world.', emoji: '⚔️' },
      { value: '9', title: 'Type 9', description: 'I want peace, steadiness, and low conflict.', emoji: '🌿' },
      { title: 'Not Sure', description: 'Skip this signal for now.', emoji: '❔' },
    ],
  },
  {
    id: 'hogwartsHouse',
    category: 'Hogwarts House',
    question: 'Which value cluster feels most like your default mode?',
    helper: 'This is a playful identity signal rather than a psychological test.',
    options: [
      { value: 'gryffindor', title: 'Gryffindor', description: 'Bravery, nerve, initiative, heart.', emoji: '🦁' },
      { value: 'slytherin', title: 'Slytherin', description: 'Ambition, strategy, resourcefulness, drive.', emoji: '🐍' },
      { value: 'ravenclaw', title: 'Ravenclaw', description: 'Curiosity, intellect, originality, wit.', emoji: '🦅' },
      { value: 'hufflepuff', title: 'Hufflepuff', description: 'Loyalty, fairness, steadiness, care.', emoji: '🦡' },
      { title: 'Not Sure', description: 'Skip this signal for now.', emoji: '❔' },
    ],
  },
  {
    id: 'loveLanguage',
    category: 'Love Language',
    question: 'What kind of care lands most clearly for you?',
    helper: 'We treat this as a communication preference prompt, not a hard type.',
    options: [
      { value: 'words', title: 'Words of Affirmation', description: 'Encouragement, praise, and being told what I mean to someone.', emoji: '💬' },
      { value: 'time', title: 'Quality Time', description: 'Undivided attention and real presence.', emoji: '⏳' },
      { value: 'gifts', title: 'Receiving Gifts', description: 'Thoughtful tokens that show care and memory.', emoji: '🎁' },
      { value: 'service', title: 'Acts of Service', description: 'Practical help that makes life lighter.', emoji: '🛠️' },
      { value: 'touch', title: 'Physical Touch', description: 'Affection, closeness, and comforting contact.', emoji: '🤍' },
      { title: 'Not Sure', description: 'Skip this signal for now.', emoji: '❔' },
    ],
  },
  {
    id: 'chronotype',
    category: 'Chronotype',
    question: 'Which daily rhythm sounds most like your real energy curve?',
    helper: 'Chronotype has some research support, but these animal labels are the popular layer.',
    options: [
      { value: 'lion', title: 'Lion', description: 'Early, focused, best in the morning, fades by evening.', emoji: '🦁' },
      { value: 'bear', title: 'Bear', description: 'Runs fairly well on a standard daytime schedule.', emoji: '🐻' },
      { value: 'wolf', title: 'Wolf', description: 'Late-rising, late-peaking, most alive later in the day.', emoji: '🐺' },
      { value: 'dolphin', title: 'Dolphin', description: 'Light, irregular, or easily disrupted sleep and energy.', emoji: '🐬' },
      { title: 'Not Sure', description: 'Skip this signal for now.', emoji: '❔' },
    ],
  },
];

export const enneagramTypeLabels: Record<EnneagramType, { name: string; description: string }> = {
  '1': { name: 'Type 1 - The Reformer', description: 'Principled, improvement-oriented, and sensitive to what feels right.' },
  '2': { name: 'Type 2 - The Helper', description: 'Relational, giving, and tuned to what other people need.' },
  '3': { name: 'Type 3 - The Achiever', description: 'Image-aware, effective, and motivated by progress and recognition.' },
  '4': { name: 'Type 4 - The Individualist', description: 'Expressive, introspective, and drawn to authenticity and depth.' },
  '5': { name: 'Type 5 - The Investigator', description: 'Private, cerebral, and motivated by understanding and competence.' },
  '6': { name: 'Type 6 - The Loyalist', description: 'Prepared, security-aware, and attentive to trust and reliability.' },
  '7': { name: 'Type 7 - The Enthusiast', description: 'Future-focused, energetic, and drawn to variety and possibility.' },
  '8': { name: 'Type 8 - The Challenger', description: 'Direct, forceful, and motivated by autonomy and strength.' },
  '9': { name: 'Type 9 - The Peacemaker', description: 'Calm, accommodating, and motivated by harmony and steadiness.' },
};

export const hogwartsHouseLabels: Record<HogwartsHouse, { name: string; description: string }> = {
  gryffindor: { name: 'Gryffindor', description: 'Brave, energetic, and willing to move first.' },
  slytherin: { name: 'Slytherin', description: 'Strategic, ambitious, and resource-aware.' },
  ravenclaw: { name: 'Ravenclaw', description: 'Curious, inventive, and mentally exploratory.' },
  hufflepuff: { name: 'Hufflepuff', description: 'Loyal, grounded, and community-minded.' },
};

export const loveLanguageLabels: Record<LoveLanguageType, { name: string; description: string }> = {
  words: { name: 'Words of Affirmation', description: 'Care lands through language, reassurance, and explicit appreciation.' },
  time: { name: 'Quality Time', description: 'Care lands through attention, presence, and shared space.' },
  gifts: { name: 'Receiving Gifts', description: 'Care lands through symbolic gestures and thoughtful tokens.' },
  service: { name: 'Acts of Service', description: 'Care lands through practical help and follow-through.' },
  touch: { name: 'Physical Touch', description: 'Care lands through closeness, comfort, and affection.' },
};

export const chronotypeLabels: Record<ChronotypeType, { name: string; description: string }> = {
  lion: { name: 'Lion', description: 'Best early; strongest focus window tends to come before noon.' },
  bear: { name: 'Bear', description: 'Most aligned with a conventional daytime schedule.' },
  wolf: { name: 'Wolf', description: 'Energy builds later; evenings often feel cognitively easier.' },
  dolphin: { name: 'Dolphin', description: 'Sleep can be lighter or more irregular than you would like.' },
};

export const birthstoneLabels: Record<BirthstoneType, { name: string; month: string; description: string }> = {
  garnet: { name: 'Garnet', month: 'January', description: 'Traditionally associated with protection and steady devotion.' },
  amethyst: { name: 'Amethyst', month: 'February', description: 'Traditionally associated with clarity, sobriety, and calm.' },
  aquamarine: { name: 'Aquamarine', month: 'March', description: 'Traditionally associated with serenity and flowing communication.' },
  diamond: { name: 'Diamond', month: 'April', description: 'Traditionally associated with endurance, strength, and brilliance.' },
  emerald: { name: 'Emerald', month: 'May', description: 'Traditionally associated with renewal, fertility, and vitality.' },
  pearl: { name: 'Pearl', month: 'June', description: 'Traditionally associated with purity, tenderness, and emotional depth.' },
  ruby: { name: 'Ruby', month: 'July', description: 'Traditionally associated with passion, courage, and heat.' },
  peridot: { name: 'Peridot', month: 'August', description: 'Traditionally associated with brightness, luck, and growth.' },
  sapphire: { name: 'Sapphire', month: 'September', description: 'Traditionally associated with wisdom, truth, and loyalty.' },
  opal: { name: 'Opal', month: 'October', description: 'Traditionally associated with imagination, mystery, and shifting color.' },
  topaz: { name: 'Topaz', month: 'November', description: 'Traditionally associated with warmth, abundance, and confidence.' },
  turquoise: { name: 'Turquoise', month: 'December', description: 'Traditionally associated with protection, travel, and openness.' },
};

const birthstoneByMonth: BirthstoneType[] = [
  'garnet',
  'amethyst',
  'aquamarine',
  'diamond',
  'emerald',
  'pearl',
  'ruby',
  'peridot',
  'sapphire',
  'opal',
  'topaz',
  'turquoise',
];

export function getBirthstoneFromDate(value: string | Date): BirthstoneType {
  const date = typeof value === 'string' ? new Date(value) : value;
  return birthstoneByMonth[date.getMonth()];
}
