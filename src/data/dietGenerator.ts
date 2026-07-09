import type { BloodType, DoshaType, SacredArchetype, UserProfile } from '@/types';
import { bloodTypeData } from './bloodType';
import { doshaData } from './dosha';
import { mbtiData } from './mbti';
import { chineseZodiacData, westernZodiacData } from './zodiac';

type IngredientSource =
  | 'dosha'
  | 'secondary-dosha'
  | 'blood'
  | 'mbti'
  | 'zodiac'
  | 'chinese'
  | 'spice';

type AvoidSource =
  | 'dosha-avoid'
  | 'dosha-reduce'
  | 'secondary-avoid'
  | 'blood'
  | 'mbti'
  | 'zodiac'
  | 'chinese';

interface ScoredLabel<Source extends string> {
  label: string;
  score: number;
  sources: Set<Source>;
  concrete: boolean;
}

interface MacroProfile {
  protein: number;
  carbs: number;
  fats: number;
}

const archetypePrefixesByElement = {
  fire: ['Solar', 'Radiant', 'Emberlit', 'Sunforged', 'Lionhearted'],
  earth: ['Verdant', 'Rooted', 'Harvest', 'Stoneborn', 'Golden'],
  air: ['Celestial', 'Starlit', 'Whispering', 'Mercurial', 'Aerial'],
  water: ['Moonlit', 'Tidal', 'Riverborn', 'Pearl', 'Velvet']
} as const;

const bloodToneDescriptors: Record<BloodType, string[]> = {
  A: ['Graceful', 'Thoughtful', 'Harmonic', 'Refined'],
  B: ['Vivid', 'Untamed', 'Playful', 'Freeform'],
  AB: ['Rare', 'Dual', 'Liminal', 'Balanced'],
  O: ['Primal', 'Bold', 'Steadfast', 'Driven']
};

const doshaEssences: Record<DoshaType, string[]> = {
  vata: ['Whisper', 'Current', 'Aether', 'Feather', 'Drift'],
  pitta: ['Ember', 'Forge', 'Flare', 'Sun', 'Cinder'],
  kapha: ['Grove', 'Harbor', 'Stone', 'Bloom', 'Meadow']
};

const chineseSymbols = {
  rat: ['Rat', 'Lantern', 'Quickstep'],
  ox: ['Ox', 'Pillar', 'Field'],
  tiger: ['Tiger', 'Stride', 'Claw'],
  rabbit: ['Rabbit', 'Garden', 'Silk'],
  dragon: ['Dragon', 'Comet', 'Crown'],
  snake: ['Snake', 'Cipher', 'Velvet'],
  horse: ['Horse', 'Trail', 'Windrunner'],
  goat: ['Goat', 'Canvas', 'Meadow'],
  monkey: ['Monkey', 'Spark', 'Trickster'],
  rooster: ['Rooster', 'Dawn', 'Herald'],
  dog: ['Dog', 'Compass', 'Emberguard'],
  pig: ['Pig', 'Orchard', 'Abundance']
} as const;

const mbtiRolePools = {
  I: ['Oracle', 'Keeper', 'Seer', 'Anchor'],
  E: ['Catalyst', 'Beacon', 'Conductor', 'Trailblazer'],
  S: ['Craftsperson', 'Steward', 'Builder', 'Keeper'],
  N: ['Visionary', 'Wayfinder', 'Dreamer', 'Alchemist'],
  T: ['Strategist', 'Architect', 'Analyst', 'Tactician'],
  F: ['Nurturer', 'Harmonizer', 'Empath', 'Heartkeeper'],
  J: ['Guardian', 'Curator', 'Founder', 'Planner'],
  P: ['Explorer', 'Dancer', 'Wanderer', 'Improviser']
} as const;

const doshaThemeBanks: Record<DoshaType, string[]> = {
  vata: ['Warm grounding comfort', 'Soft cooked ease', 'Steady nourishing bowls'],
  pitta: ['Cooling bright balance', 'Fresh herbal calm', 'Crisp soothing contrast'],
  kapha: ['Light spiced lift', 'Energizing clean edges', 'Dry vibrant contrast']
};

const introDoshaThemeBanks: Record<DoshaType, string[]> = {
  vata: ['Grounded steadiness', 'Calm sensory grounding', 'Soft inner steadiness'],
  pitta: ['Composed clarity'],
  kapha: ['Light activation', 'Clear momentum', 'Awake steadiness']
};

const accentThemeBanks: Record<DoshaType, string[]> = {
  vata: ['Curious variety', 'Airy movement', 'Flexible textures'],
  pitta: ['Cooling restraint', 'Bright clean finish', 'Fresh mineral lift'],
  kapha: ['Spiced activation', 'Lighter portions', 'More crunch and lift']
};

const introAccentThemeBanks: Record<DoshaType, string[]> = {
  vata: ['Curious flexibility', 'Easy movement', 'Adaptive pacing'],
  pitta: ['Fresh perspective', 'Clean mental space', 'Balanced restraint'],
  kapha: ['Responsive lightness']
};

const elementThemeBanks = {
  fire: ['Charred bright flavors', 'Solar citrus lift', 'Bold celebratory plating'],
  earth: ['Roasted earthy depth', 'Rooted savory comfort', 'Slow-built richness'],
  air: ['Herbaceous lightness', 'Fresh layered textures', 'Quick vivid contrasts'],
  water: ['Brothy soothing depth', 'Silky mineral freshness', 'Comforting fluid textures']
} as const;

const introElementThemeBanks = {
  fire: ['Bold expression', 'Solar confidence', 'Celebratory energy'],
  earth: ['Rooted reliability', 'Patient depth', 'Slow-built trust'],
  air: ['Lively curiosity', 'Layered perspective', 'Quick adaptability'],
  water: ['Emotional spaciousness']
} as const;

const structureThemeBanks = {
  J: ['Structured meal rhythm', 'Planned weekly staples', 'Consistent anchor meals'],
  P: ['Flexible appetite pacing', 'Open-ended meal flow', 'Room for instinct and curiosity']
} as const;

const introStructureThemeBanks = {
  J: ['Planned stability'],
  P: ['Flexible daily flow', 'Open-ended pacing', 'Room for instinct']
} as const;

const decisionThemeBanks = {
  T: ['Performance-minded choices', 'Clean functional fuel', 'Strategic nourishment'],
  F: ['Mood-aware nourishment', 'Comfort with meaning', 'Emotionally resonant meals']
} as const;

const introDecisionThemeBanks = {
  T: ['Performance-minded focus'],
  F: ['Emotional resonance', 'Meaningful comfort', 'Mood-aware intuition']
} as const;

const socialThemeBanks = {
  I: ['Quiet ritual focus', 'Low-noise nourishment', 'Protected solo meal time'],
  E: ['Shared table energy', 'Social meal moments', 'Conversation-friendly plates']
} as const;

const introSocialThemeBanks = {
  I: ['Quiet ritual focus', 'Low-noise recharge', 'Protected solo time'],
  E: ['Shared energy', 'Social momentum', 'Conversation-friendly presence']
} as const;

const bloodThemeBanks: Record<BloodType, string[]> = {
  A: ['Plant-forward calm focus', 'Gentle digestive support', 'Ordered restorative meals'],
  B: ['Wide-spectrum variety', 'Creative menu freedom', 'Balanced omnivore energy'],
  AB: ['Balanced mixed plates', 'Adaptive smaller portions', 'Dual-source harmony'],
  O: ['Protein-led stamina', 'Bold mineral density', 'Steady athletic recovery']
};

const introBloodThemeBanks: Record<BloodType, string[]> = {
  A: ['Calm focus', 'Gentle steadiness', 'Ordered restoration'],
  B: ['Creative range', 'Adaptive freedom', 'Balanced range'],
  AB: ['Integrated balance', 'Adaptive nuance', 'Dual-pattern harmony'],
  O: ['Driven stamina', 'Bold resilience', 'Steady recovery']
};

const chineseElementMacros = {
  water: { protein: 24, carbs: 48, fats: 28 },
  earth: { protein: 27, carbs: 42, fats: 31 },
  wood: { protein: 26, carbs: 46, fats: 28 },
  fire: { protein: 29, carbs: 42, fats: 29 },
  metal: { protein: 28, carbs: 43, fats: 29 }
} as const;

const koreanStyleMacros: Record<BloodType, { protein: number; carbs: number; fats: number }> = {
  A: { protein: 23, carbs: 51, fats: 26 },
  B: { protein: 27, carbs: 46, fats: 27 },
  AB: { protein: 25, carbs: 48, fats: 27 },
  O: { protein: 31, carbs: 41, fats: 28 }
};

const abstractFoodTerms = [
  'meal',
  'meals',
  'presentation',
  'presentations',
  'diet',
  'diets',
  'choice',
  'choices',
  'option',
  'options',
  'nutrition',
  'prep',
  'preparation',
  'preparations',
  'cooking',
  'method',
  'methods',
  'environment',
  'environments',
  'routine',
  'routines'
];

function hashString(value: string): number {
  let hash = 2166136261;

  for (let index = 0; index < value.length; index += 1) {
    hash ^= value.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }

  return hash >>> 0;
}

function getProfileSeed(profile: UserProfile, salt = ''): number {
  return hashString(
    [
      profile.name,
      profile.birthDate,
      profile.birthYear,
      profile.bloodType,
      profile.westernZodiac,
      profile.chineseZodiac,
      profile.mbti,
      profile.dominantDosha,
      profile.dosha.vata,
      profile.dosha.pitta,
      profile.dosha.kapha,
      salt
    ].join('|')
  );
}

function uniqueStrings(values: string[]): string[] {
  return [...new Set(values)];
}

function normalizeLabel(label: string): string {
  return label.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
}

function isConcreteIngredient(label: string): boolean {
  const normalized = normalizeLabel(label);
  return !abstractFoodTerms.some(term => normalized.includes(term));
}

function pickDeterministic<T>(items: readonly T[], seed: number, salt: string): T {
  return items[hashString(`${seed}:${salt}`) % items.length];
}

function sortDeterministically<T>(
  items: readonly T[],
  seed: number,
  salt: string,
  getLabel: (item: T) => string = value => String(value)
): T[] {
  return [...items].sort((left, right) => {
    const leftScore = hashString(`${salt}:${seed}:${getLabel(left)}`);
    const rightScore = hashString(`${salt}:${seed}:${getLabel(right)}`);
    return leftScore - rightScore || getLabel(left).localeCompare(getLabel(right));
  });
}

function getDoshaRanking(profile: UserProfile): DoshaType[] {
  const doshas: DoshaType[] = ['vata', 'pitta', 'kapha'];

  return doshas.sort((left, right) => {
    return profile.dosha[right] - profile.dosha[left] || left.localeCompare(right);
  });
}

function getDoshaBlend(profile: UserProfile) {
  const [primary, secondary, tertiary] = getDoshaRanking(profile);
  const primaryScore = profile.dosha[primary];
  const secondaryScore = profile.dosha[secondary];

  return {
    primary,
    secondary,
    tertiary,
    isHybrid: primaryScore - secondaryScore <= 2
  };
}

function addScoredLabels<Source extends string>(
  map: Map<string, ScoredLabel<Source>>,
  labels: string[],
  weight: number,
  source: Source
): void {
  for (const rawLabel of labels) {
    const label = rawLabel.trim();

    if (!label) {
      continue;
    }

    const existing = map.get(label) ?? {
      label,
      score: 0,
      sources: new Set<Source>(),
      concrete: isConcreteIngredient(label)
    };

    existing.score += weight;
    existing.sources.add(source);
    map.set(label, existing);
  }
}

function rankLabels<Source extends string>(
  map: Map<string, ScoredLabel<Source>>,
  seed: number,
  salt: string,
  blocked = new Set<string>()
): ScoredLabel<Source>[] {
  return [...map.values()]
    .map(entry => ({
      ...entry,
      sources: new Set(entry.sources),
      score:
        entry.score +
        (entry.sources.size - 1) * 1.2 +
        (entry.concrete ? 0.4 : -1.5) +
        (entry.label.includes('(') ? 0.35 : 0) +
        (blocked.has(normalizeLabel(entry.label)) ? -4 : 0)
    }))
    .sort((left, right) => {
      if (right.score !== left.score) {
        return right.score - left.score;
      }

      const leftTie = hashString(`${salt}:${seed}:${left.label}`);
      const rightTie = hashString(`${salt}:${seed}:${right.label}`);
      return leftTie - rightTie || left.label.localeCompare(right.label);
    });
}

function takeRankedLabels<Source extends string>(
  ranked: ScoredLabel<Source>[],
  selected: Set<string>,
  limit: number,
  predicate: (entry: ScoredLabel<Source>) => boolean
): string[] {
  const picks: string[] = [];

  for (const entry of ranked) {
    if (picks.length >= limit) {
      break;
    }

    if (!predicate(entry) || selected.has(entry.label)) {
      continue;
    }

    selected.add(entry.label);
    picks.push(entry.label);
  }

  return picks;
}

function buildAvoidSet(profile: UserProfile): Set<string> {
  const { primary, secondary } = getDoshaBlend(profile);
  const labels = [
    ...doshaData[primary].foods.avoid,
    ...doshaData[primary].foods.reduce,
    ...doshaData[secondary].foods.avoid,
    ...mbtiData[profile.mbti].foodsToLimit,
    ...westernZodiacData[profile.westernZodiac].foods.limit,
    ...chineseZodiacData[profile.chineseZodiac].foods.limit
  ];

  if (profile.bloodType) {
    labels.push(...bloodTypeData[profile.bloodType].foods.avoid);
  }

  return new Set(labels.map(normalizeLabel));
}

function generateArchetypeName(profile: UserProfile): string {
  const seed = getProfileSeed(profile, 'archetype-name');
  const { primary } = getDoshaBlend(profile);
  const prefixPool = uniqueStrings([
    ...archetypePrefixesByElement[westernZodiacData[profile.westernZodiac].element],
    ...(profile.bloodType ? bloodToneDescriptors[profile.bloodType] : [])
  ]);
  const essencePool = uniqueStrings([
    ...doshaEssences[primary],
    ...chineseSymbols[profile.chineseZodiac]
  ]);
  const rolePool = uniqueStrings([
    ...mbtiRolePools[profile.mbti[0] as keyof typeof mbtiRolePools],
    ...mbtiRolePools[profile.mbti[1] as keyof typeof mbtiRolePools],
    ...mbtiRolePools[profile.mbti[2] as keyof typeof mbtiRolePools],
    ...mbtiRolePools[profile.mbti[3] as keyof typeof mbtiRolePools]
  ]);

  const prefix = pickDeterministic(prefixPool, seed, 'prefix');
  const filteredEssencePool = essencePool.filter(option => option !== prefix);
  const essence = pickDeterministic(filteredEssencePool.length > 0 ? filteredEssencePool : essencePool, seed, 'essence');
  const role = pickDeterministic(rolePool, seed, 'role');

  return `${prefix} ${essence} ${role}`;
}

function generateSignatureThemes(profile: UserProfile): string[] {
  const seed = getProfileSeed(profile, 'signature-themes');
  const { primary, secondary } = getDoshaBlend(profile);
  const zodiacInfo = westernZodiacData[profile.westernZodiac];
  const themes = [
    pickDeterministic(doshaThemeBanks[primary], seed, 'base-theme'),
    pickDeterministic(accentThemeBanks[secondary], seed, 'accent-theme'),
    pickDeterministic(elementThemeBanks[zodiacInfo.element], seed, 'element-theme'),
    pickDeterministic(structureThemeBanks[profile.mbti[3] as keyof typeof structureThemeBanks], seed, 'structure-theme'),
    pickDeterministic(decisionThemeBanks[profile.mbti[2] as keyof typeof decisionThemeBanks], seed, 'decision-theme'),
    pickDeterministic(socialThemeBanks[profile.mbti[0] as keyof typeof socialThemeBanks], seed, 'social-theme')
  ];

  if (profile.bloodType) {
    themes.push(pickDeterministic(bloodThemeBanks[profile.bloodType], seed, 'blood-theme'));
  }

  return uniqueStrings(themes).slice(0, 5);
}

function generateIntroThemes(profile: UserProfile): string[] {
  const seed = getProfileSeed(profile, 'intro-themes');
  const { primary, secondary } = getDoshaBlend(profile);
  const zodiacInfo = westernZodiacData[profile.westernZodiac];
  const themes = [
    pickDeterministic(introDoshaThemeBanks[primary], seed, 'base-theme'),
    pickDeterministic(introAccentThemeBanks[secondary], seed, 'accent-theme'),
    pickDeterministic(introElementThemeBanks[zodiacInfo.element], seed, 'element-theme'),
    pickDeterministic(introStructureThemeBanks[profile.mbti[3] as keyof typeof introStructureThemeBanks], seed, 'structure-theme'),
    pickDeterministic(introDecisionThemeBanks[profile.mbti[2] as keyof typeof introDecisionThemeBanks], seed, 'decision-theme'),
    pickDeterministic(introSocialThemeBanks[profile.mbti[0] as keyof typeof introSocialThemeBanks], seed, 'social-theme')
  ];

  if (profile.bloodType) {
    themes.push(pickDeterministic(introBloodThemeBanks[profile.bloodType], seed, 'blood-theme'));
  }

  return uniqueStrings(themes).slice(0, 5);
}

function calculateMacros(profile: UserProfile): { protein: number; carbs: number; fats: number; fiber: number; hydration: string } {
  const blend = getDoshaBlend(profile);
  const doshaMacros = doshaData[blend.primary].macros;
  const mbtiMacros = mbtiData[profile.mbti].macros;
  const zodiacMacros = westernZodiacData[profile.westernZodiac].macros;
  const chineseMacros = chineseElementMacros[chineseZodiacData[profile.chineseZodiac].element];
  const weightedMacros: Array<{ weight: number; macros: MacroProfile }> = [
    { weight: 0.3, macros: doshaMacros },
    { weight: 0.15, macros: mbtiMacros },
    { weight: 0.15, macros: zodiacMacros },
    { weight: 0.1, macros: chineseMacros }
  ];

  if (profile.bloodType) {
    weightedMacros.push(
      { weight: 0.2, macros: bloodTypeData[profile.bloodType].macros },
      { weight: 0.1, macros: koreanStyleMacros[profile.bloodType] },
    );
  }

  const totalWeight = weightedMacros.reduce((sum, entry) => sum + entry.weight, 0);
  const protein = weightedMacros.reduce((sum, entry) => sum + entry.macros.protein * (entry.weight / totalWeight), 0);
  const carbs = weightedMacros.reduce((sum, entry) => sum + entry.macros.carbs * (entry.weight / totalWeight), 0);
  const fats = weightedMacros.reduce((sum, entry) => sum + entry.macros.fats * (entry.weight / totalWeight), 0);

  const rounded = {
    protein: Math.round(protein),
    carbs: Math.round(carbs),
    fats: Math.round(fats)
  };

  const total = rounded.protein + rounded.carbs + rounded.fats;
  rounded.carbs += 100 - total;

  const fiberBase = {
    vata: 28,
    pitta: 32,
    kapha: 35
  }[blend.primary];

  const fiberAdjustment = {
    vata: -1,
    pitta: 1,
    kapha: 2
  }[blend.secondary];

  const hydrationMap = {
    vata: {
      vata: '2.7-3 L warm water + calming teas',
      pitta: '2.6-3 L warm water, mint, or fennel',
      kapha: '2.5-2.8 L warm water + gentle spice'
    },
    pitta: {
      vata: '2.5-2.8 L cooling herbs + steady sips',
      pitta: '2.3-2.7 L cucumber, mint, or aloe',
      kapha: '2.3-2.6 L cooling water, lighter evenings'
    },
    kapha: {
      vata: '2.2-2.5 L warm water, regular sips',
      pitta: '2.2-2.5 L ginger-fennel or coriander tea',
      kapha: '2-2.4 L warm water + herbal teas'
    }
  } as const;

  return {
    protein: rounded.protein,
    carbs: rounded.carbs,
    fats: rounded.fats,
    fiber: fiberBase + fiberAdjustment,
    hydration: hydrationMap[blend.primary][blend.secondary]
  };
}

function generateIngredientsToPrioritize(profile: UserProfile): string[] {
  const seed = getProfileSeed(profile, 'priority-ingredients');
  const blend = getDoshaBlend(profile);
  const avoidSet = buildAvoidSet(profile);
  const scored = new Map<string, ScoredLabel<IngredientSource>>();

  addScoredLabels(scored, doshaData[blend.primary].foods.favor, 4.8, 'dosha');
  addScoredLabels(scored, doshaData[blend.secondary].foods.favor, 2.2, 'secondary-dosha');
  if (profile.bloodType) {
    addScoredLabels(scored, bloodTypeData[profile.bloodType].foods.highlyBeneficial, 4.2, 'blood');
  }
  addScoredLabels(scored, mbtiData[profile.mbti].recommendedFoods, 2.5, 'mbti');
  addScoredLabels(scored, westernZodiacData[profile.westernZodiac].foods.recommended, 2.8, 'zodiac');
  addScoredLabels(scored, chineseZodiacData[profile.chineseZodiac].foods.recommended, 2.4, 'chinese');
  addScoredLabels(scored, doshaData[blend.primary].spices, 3.1, 'spice');
  addScoredLabels(scored, doshaData[blend.secondary].spices, 1.6, 'spice');

  const ranked = rankLabels(scored, seed, 'priority-ingredients', avoidSet).filter(entry => entry.concrete);
  const selected = new Set<string>();

  const choices = [
    ...takeRankedLabels(ranked, selected, 5, entry => entry.sources.size > 1),
    ...takeRankedLabels(ranked, selected, 3, entry => entry.sources.has('zodiac') || entry.sources.has('chinese')),
    ...takeRankedLabels(ranked, selected, profile.bloodType ? 3 : 0, entry => entry.sources.has('blood')),
    ...takeRankedLabels(ranked, selected, 3, entry => entry.sources.has('dosha') || entry.sources.has('secondary-dosha')),
    ...takeRankedLabels(ranked, selected, 3, entry => entry.sources.has('spice'))
  ];

  const remaining = 16 - choices.length;
  if (remaining > 0) {
    choices.push(...takeRankedLabels(ranked, selected, remaining, () => true));
  }

  return sortDeterministically(choices.slice(0, 16), seed, 'priority-order');
}

function generateFoodsToAvoid(profile: UserProfile): string[] {
  const seed = getProfileSeed(profile, 'foods-to-avoid');
  const { primary, secondary } = getDoshaBlend(profile);
  const scored = new Map<string, ScoredLabel<AvoidSource>>();

  addScoredLabels(scored, doshaData[primary].foods.avoid, 4.5, 'dosha-avoid');
  addScoredLabels(scored, doshaData[primary].foods.reduce, 2.6, 'dosha-reduce');
  addScoredLabels(scored, doshaData[secondary].foods.avoid, 2.2, 'secondary-avoid');
  if (profile.bloodType) {
    addScoredLabels(scored, bloodTypeData[profile.bloodType].foods.avoid, 4.1, 'blood');
  }
  addScoredLabels(scored, mbtiData[profile.mbti].foodsToLimit, 3.1, 'mbti');
  addScoredLabels(scored, westernZodiacData[profile.westernZodiac].foods.limit, 2.6, 'zodiac');
  addScoredLabels(scored, chineseZodiacData[profile.chineseZodiac].foods.limit, 2.4, 'chinese');

  const ranked = rankLabels(scored, seed, 'foods-to-avoid');
  const selected = new Set<string>();

  const choices = [
    ...takeRankedLabels(ranked, selected, 4, entry => entry.sources.size > 1),
    ...takeRankedLabels(ranked, selected, profile.bloodType ? 2 : 0, entry => entry.sources.has('blood')),
    ...takeRankedLabels(ranked, selected, 2, entry => entry.sources.has('dosha-avoid') || entry.sources.has('secondary-avoid')),
    ...takeRankedLabels(ranked, selected, 2, entry => entry.sources.has('mbti'))
  ];

  const remaining = 10 - choices.length;
  if (remaining > 0) {
    choices.push(...takeRankedLabels(ranked, selected, remaining, () => true));
  }

  return sortDeterministically(choices.slice(0, 10), seed, 'avoid-order');
}

function generateMealRhythm(profile: UserProfile): string {
  const { primary, secondary } = getDoshaBlend(profile);
  const primaryRhythm = {
    vata: 'Keep meals warm, regular, and difficult to skip, especially when the day gets noisy.',
    pitta: 'Anchor the day with a satisfying lunch and enough cooling foods to stop intensity from turning into irritability.',
    kapha: 'Keep breakfast light, lunch decisive, and dinner earlier than your comfort zone would naturally choose.'
  }[primary];

  const structureRhythm =
    profile.mbti[3] === 'J'
      ? 'Repeatable meal windows will help your energy feel stable instead of negotiable.'
      : 'Leave one meal window flexible so appetite, curiosity, or schedule can steer the details without breaking the plan.';

  const accentRhythm = {
    vata: 'A warm snack or soup in late afternoon helps prevent scatter and skipped dinners.',
    pitta: 'Lean on crisp herbs, watery produce, or a calmer evening plate when heat starts building.',
    kapha: 'Use spice, bitterness, and lighter textures whenever meals start feeling too dense or sleepy.'
  }[secondary];

  const socialRhythm =
    profile.mbti[0] === 'E'
      ? 'One shared meal most days will make the rhythm easier to sustain.'
      : 'One quiet, distraction-free meal each day will make the signals easier to read.';

  return `${primaryRhythm} ${structureRhythm} ${accentRhythm} ${socialRhythm}`;
}

function generateDietStyle(profile: UserProfile, introThemes: string[]): string {
  const seed = getProfileSeed(profile, 'diet-style');
  const themes = introThemes.slice(0, 3).map(theme => theme.toLowerCase());
  const templates = [
    `Think ${themes[0]}, ${themes[1]}, and ${themes[2]} first. Your recommendations work best when they serve that broader pattern instead of leading with specifics.`,
    `Your profile reads strongest through ${themes[0]}, supported by ${themes[1]} and ${themes[2]}. Let those signals guide rhythm, energy, and sensory preference before the practical details begin.`,
    `You respond best when ${themes[0]} is backed by ${themes[1]} and ${themes[2]}. Start with that orientation, then use the guidance below as its translation.`
  ];

  return pickDeterministic(templates, seed, 'diet-style-template');
}

function generateNarrative(profile: UserProfile, ingredients: string[], mealRhythm: string, signatureThemes: string[]): string {
  const seed = getProfileSeed(profile, 'narrative');
  const blend = getDoshaBlend(profile);
  const doshaName = doshaData[blend.primary].name;
  const secondaryName = doshaData[blend.secondary].name;
  const zodiacInfo = westernZodiacData[profile.westernZodiac];
  const chineseInfo = chineseZodiacData[profile.chineseZodiac];
  const mbtiInfo = mbtiData[profile.mbti];
  const ingredientFocus = ingredients.slice(0, 4).join(', ');
  const bloodTypeBridge = profile.bloodType
    ? `Layer in your ${mbtiInfo.name} wiring and the type ${profile.bloodType} folklore layer, and foods like ${ingredientFocus} start to make sense as repeat anchors rather than random recommendations.`
    : `Layer in your ${mbtiInfo.name} wiring, and foods like ${ingredientFocus} start to make sense as repeat anchors even without a blood-type input.`;
  const bloodTypeMethodNote = profile.bloodType
    ? 'That extra blood-type layer sharpens the recommendation set rather than reinventing it.'
    : 'Leaving blood type blank simply shifts more of the weighting onto the patterns that do repeat across dosha, zodiac, and personality.';
  const hybridSentence = blend.isHybrid
    ? `You are not a single-note ${doshaName.toLowerCase()} type. ${secondaryName} keeps surfacing in the background, which is why ${signatureThemes[0].toLowerCase()} and ${signatureThemes[1].toLowerCase()} both matter.`
    : `Your strongest nutritional signal is ${doshaName.toLowerCase()}, with just enough ${secondaryName.toLowerCase()} underneath to keep your plate adaptive rather than rigid.`;
  const storyVariants = [
    `Dear ${profile.name}, your profile points toward a plate that feels distinct on purpose. ${hybridSentence}\n\n${zodiacInfo.name} adds ${zodiacInfo.traits.slice(0, 2).join(' and ').toLowerCase()} ${zodiacInfo.element} energy, while the Year of the ${chineseInfo.name} reinforces ${chineseInfo.traits.slice(0, 2).join(' and ').toLowerCase()} instincts. ${bloodTypeBridge}\n\n${mealRhythm}`,
    `Dear ${profile.name}, the interesting part of your chart is not any single label. It is the way your ${doshaName.toLowerCase()} base interacts with ${secondaryName.toLowerCase()} undertones, ${zodiacInfo.name}'s ${zodiacInfo.element} expression, and the ${chineseInfo.name}'s ${chineseInfo.traits[0].toLowerCase()} pull. Together they push you toward ${ingredientFocus} and away from flat, one-size-fits-all advice.\n\nAs a ${mbtiInfo.name}, you need food to match both temperament and function. That is why ${signatureThemes[2].toLowerCase()}, ${signatureThemes[3].toLowerCase()}, and ${signatureThemes[4].toLowerCase()} show up so clearly in your result. ${bloodTypeMethodNote}\n\n${mealRhythm}`,
    `Dear ${profile.name}, your sacred plate works because several systems are agreeing from different angles. ${hybridSentence}\n\n${zodiacInfo.name} wants ${zodiacInfo.cookingStyles[0].toLowerCase()}, the ${chineseInfo.name} wants foods that support ${chineseInfo.traits[0].toLowerCase()} momentum, and your ${mbtiInfo.name} nature wants meals that feel psychologically aligned instead of merely correct. The overlap lands on ${ingredientFocus}. ${bloodTypeMethodNote}\n\n${mealRhythm}`
  ];

  return pickDeterministic(storyVariants, seed, 'narrative-template');
}

function generateRituals(profile: UserProfile, ingredients: string[]): string[] {
  const seed = getProfileSeed(profile, 'rituals');
  const blend = getDoshaBlend(profile);
  const mbtiInfo = mbtiData[profile.mbti];
  const zodiacInfo = westernZodiacData[profile.westernZodiac];
  const socialMeal = profile.mbti[0] === 'E' ? 'shared' : 'quiet';

  const primaryIngredients = ingredients.slice(0, 2).map(ingredient => ingredient.toLowerCase()).join(' and ');
  const morningStart = {
    vata: 'Start the day with warm lemon water and a few minutes of slow movement before caffeine.',
    pitta: 'Start the day with cool or room-temperature water and a slower morning before screens or heat.',
    kapha: 'Start the day with warm ginger water and brisk movement before your first real meal.'
  }[blend.primary];
  const secondaryBalance = {
    vata: 'When your energy scatters, return to warmer snacks, soups, and repeatable timing before you chase novelty.',
    pitta: 'When intensity rises, lower the heat, acidity, and speed of the meal before adding more stimulation.',
    kapha: 'When heaviness builds, cut portion size slightly and add more spice, crunch, or bitterness.'
  }[blend.secondary];
  const movementRitual = profile.bloodType
    ? `Pair your main meal with ${pickDeterministic(bloodTypeData[profile.bloodType].exercise, seed, 'exercise').toLowerCase()} or another short movement block later in the day.`
    : 'Pair your main meal with a short walk, mobility block, or easy strength session so energy and digestion stay in sync.';

  return [
    morningStart,
    `Keep ${primaryIngredients} in weekly rotation; that is where several of your systems overlap.`,
    `Use "${pickDeterministic(mbtiInfo.eatingHabits, seed, 'habit').toLowerCase()}" as your anchor habit when the week gets chaotic.`,
    `Lean on ${pickDeterministic(zodiacInfo.cookingStyles, seed, 'cooking-style').toLowerCase()} once or twice a week so the food still feels like you.`,
    movementRitual,
    `${secondaryBalance} Protect one ${socialMeal} meal each day so your body can actually register the difference.`
  ];
}

function generateInsight(profile: UserProfile, ingredients: string[], signatureThemes: string[]): string {
  const seed = getProfileSeed(profile, 'insight');
  const blend = getDoshaBlend(profile);
  const zodiacInfo = westernZodiacData[profile.westernZodiac];
  const mbtiInfo = mbtiData[profile.mbti];

  const firstIngredient = ingredients[0].toLowerCase();
  const secondIngredient = ingredients[1].toLowerCase();
  const insights = [
    `Your strongest overlap is where ${signatureThemes[0].toLowerCase()} meets ${signatureThemes[3].toLowerCase()}; ${firstIngredient} and ${secondIngredient} are two of the clearest expressions of that.`,
    `The profile becomes much more distinctive once you stop treating ${doshaData[blend.primary].name.toLowerCase()} as your only signal. ${doshaData[blend.secondary].name} is quietly shaping the details.`,
    `Your ${zodiacInfo.name} expression wants meals that feel alive, but your ${mbtiInfo.name} side still needs them to feel coherent. That tension is a strength when you design around it instead of ignoring it.`
  ];

  return pickDeterministic(insights, seed, 'insight-template');
}

export function generateSacredArchetype(profile: UserProfile): SacredArchetype {
  const signatureThemes = generateSignatureThemes(profile);
  const introThemes = generateIntroThemes(profile);
  const ingredientsToPrioritize = generateIngredientsToPrioritize(profile);
  const mealRhythm = generateMealRhythm(profile);
  const narrative = generateNarrative(profile, ingredientsToPrioritize, mealRhythm, signatureThemes);

  return {
    name: generateArchetypeName(profile),
    title: `${profile.name}'s TypeAtlas Profile`,
    description: narrative,
    narrative,
    dietStyle: generateDietStyle(profile, introThemes),
    introThemes,
    signatureThemes,
    mealRhythm,
    macros: calculateMacros(profile),
    ingredientsToPrioritize,
    foodsToAvoid: generateFoodsToAvoid(profile),
    rituals: generateRituals(profile, ingredientsToPrioritize),
    insight: generateInsight(profile, ingredientsToPrioritize, signatureThemes)
  };
}
