import { motion } from 'framer-motion';
import { SacredRings, GlowOrb } from '@/components/SacredGeometry';
import { ResearchFieldGuide } from '@/components/ResearchFieldGuide';
import type {
  BirthstoneType,
  ChronotypeType,
  EnneagramType,
  HogwartsHouse,
  LoveLanguageType,
  MBTIType,
  SacredArchetype,
  UserProfile,
} from '@/types';
import {
  birthstoneLabels,
  chronotypeLabels,
  enneagramTypeLabels,
  hogwartsHouseLabels,
  loveLanguageLabels,
  westernZodiacData,
  chineseZodiacData,
  mbtiData,
  koreanBloodTypePersonality,
  bloodTypeData,
} from '@/data';
import { Sparkles, ChevronLeft, ChevronRight, Leaf, Flame, Droplets, Wind, Mountain, AlertTriangle, Star } from 'lucide-react';

const cardBadgeClassName =
  'flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-2xl leading-none shadow-[0_0_24px_rgba(243,184,85,0.08)]';

const enneagramSymbols: Record<EnneagramType, string> = {
  '1': '⚖️',
  '2': '🤝',
  '3': '🏁',
  '4': '🎭',
  '5': '🔎',
  '6': '🛡️',
  '7': '🎈',
  '8': '⚔️',
  '9': '🌿',
};

const hogwartsHouseSymbols: Record<HogwartsHouse, string> = {
  gryffindor: '🦁',
  slytherin: '🐍',
  ravenclaw: '🦅',
  hufflepuff: '🦡',
};

const loveLanguageSymbols: Record<LoveLanguageType, string> = {
  words: '💬',
  time: '⏳',
  gifts: '🎁',
  service: '🛠️',
  touch: '🤍',
};

const chronotypeSymbols: Record<ChronotypeType, string> = {
  lion: '🦁',
  bear: '🐻',
  wolf: '🐺',
  dolphin: '🐬',
};

const birthstoneSymbols: Record<BirthstoneType, string> = {
  garnet: '🛡️',
  amethyst: '🔮',
  aquamarine: '🌊',
  diamond: '💎',
  emerald: '🍃',
  pearl: '🐚',
  ruby: '❤️',
  peridot: '🌞',
  sapphire: '🔷',
  opal: '🌈',
  topaz: '✨',
  turquoise: '🌀',
};

const diplomatMbtiTypes = new Set<MBTIType>(['INFJ', 'INFP', 'ENFJ', 'ENFP']);
const analystMbtiTypes = new Set<MBTIType>(['INTJ', 'INTP', 'ENTJ', 'ENTP']);
const sentinelMbtiTypes = new Set<MBTIType>(['ISTJ', 'ISFJ', 'ESTJ', 'ESFJ']);

function getMbtiSymbol(mbti: MBTIType) {
  if (diplomatMbtiTypes.has(mbti)) {
    return '✨';
  }

  if (analystMbtiTypes.has(mbti)) {
    return '♟️';
  }

  if (sentinelMbtiTypes.has(mbti)) {
    return '🛡️';
  }

  return '⚡';
}

interface ResultSectionProps {
  result: SacredArchetype;
  userProfile: UserProfile;
  onViewClosing: () => void;
  onBack: () => void;
}

export function ResultSection({ result, userProfile, onViewClosing, onBack }: ResultSectionProps) {
  const introThemes = result.introThemes?.length ? result.introThemes : result.signatureThemes;
  const { westernZodiac, chineseZodiac, mbti, bloodType, enneagram, hogwartsHouse, loveLanguage, chronotype, birthstone } = userProfile;
  const bloodTypeInfo = bloodType ? bloodTypeData[bloodType] : null;
  const bloodTypePersonality = bloodType ? koreanBloodTypePersonality[bloodType] : null;
  const birthstoneInfo = birthstone ? birthstoneLabels[birthstone] : null;

  const getElementIcon = (element: string) => {
    switch (element) {
      case 'fire': return <Flame className="w-4 h-4 text-orange-400" />;
      case 'water': return <Droplets className="w-4 h-4 text-blue-400" />;
      case 'air': return <Wind className="w-4 h-4 text-cyan-400" />;
      case 'earth': return <Mountain className="w-4 h-4 text-green-400" />;
      default: return null;
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden py-20">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0B0D10] via-[#0F1218] to-[#0B0D10]" />
      
      {/* Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-40">
        <GlowOrb size={500} />
      </div>
      
      {/* Sacred rings */}
      <div className="absolute inset-0 flex items-center justify-center opacity-20">
        <SacredRings size={600} />
      </div>

      {/* Back button */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        onClick={onBack}
        className="absolute top-8 left-8 flex items-center gap-2 text-secondary-custom hover:text-gold transition-colors z-20"
      >
        <ChevronLeft className="w-5 h-5" />
        <span className="font-mono text-sm uppercase tracking-wider">Back</span>
      </motion.button>
      
      {/* Main content */}
      <div className="relative z-10 w-full max-w-4xl mx-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-10"
        >
          {/* Archetype title */}
          <div className="flex items-center justify-center gap-3 mb-4">
            <Sparkles className="w-5 h-5 text-gold" />
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-secondary-custom">
              Your Sacred Archetype
            </span>
            <Sparkles className="w-5 h-5 text-gold" />
          </div>
          
          <h1 className="font-heading text-4xl md:text-5xl text-foreground mb-4">
            {result.name}
          </h1>
          
          <p className="text-secondary-custom text-lg max-w-xl mx-auto">
            {result.dietStyle}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-2 max-w-3xl mx-auto mt-5">
            {introThemes.map((theme) => (
              <span
                key={theme}
                className="px-3 py-1.5 rounded-full border border-gold/25 bg-gold/10 text-xs uppercase tracking-[0.14em] text-gold"
              >
                {theme}
              </span>
            ))}
          </div>
        </motion.div>
        
        {/* Profile cards grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-10"
        >
          {/* Western Zodiac */}
          <div className="glass-card-light p-5">
            <div className="label-mono mb-2">Western Zodiac</div>
            <div className="flex items-center gap-3">
              <span className="text-3xl">{westernZodiacData[westernZodiac].symbol}</span>
              <div>
                <div className="font-heading text-lg text-foreground">{westernZodiacData[westernZodiac].name}</div>
                <div className="text-xs text-secondary-custom capitalize flex items-center gap-1">
                  {getElementIcon(westernZodiacData[westernZodiac].element)}
                  {westernZodiacData[westernZodiac].element} Element
                </div>
              </div>
            </div>
            <p className="text-xs text-secondary-custom mt-2 leading-relaxed">
              {westernZodiacData[westernZodiac].traits.slice(0, 3).join(' • ')}
            </p>
          </div>
          
          {/* Chinese Zodiac */}
          <div className="glass-card-light p-5">
            <div className="label-mono mb-2">Chinese Zodiac</div>
            <div className="flex items-center gap-3">
              <span className="text-3xl">{chineseZodiacData[chineseZodiac].animal}</span>
              <div>
                <div className="font-heading text-lg text-foreground">Year of the {chineseZodiacData[chineseZodiac].name}</div>
                <div className="text-xs text-secondary-custom capitalize">
                  {chineseZodiacData[chineseZodiac].element} · {chineseZodiacData[chineseZodiac].yinYang}
                </div>
              </div>
            </div>
            <p className="text-xs text-secondary-custom mt-2 leading-relaxed">
              {chineseZodiacData[chineseZodiac].traits.slice(0, 3).join(' • ')}
            </p>
          </div>
          
          {/* Blood Type */}
          <div className="glass-card-light p-5">
            <div className="label-mono mb-2">Blood Type</div>
            <div className="flex items-center gap-3">
              <span className="font-heading text-3xl text-gold">{bloodType ?? '?'}</span>
              <div>
                <div className="font-heading text-lg text-foreground">
                  {bloodTypePersonality?.title ?? 'Not provided'}
                </div>
                <div className="text-xs text-secondary-custom">
                  {bloodType ? 'Optional blood-type layer included' : 'Optional blood-type layer skipped'}
                </div>
              </div>
            </div>
            <p className="text-xs text-secondary-custom mt-2 leading-relaxed">
              {bloodTypeInfo
                ? bloodTypeInfo.traits.slice(0, 3).join(' • ')
                : 'No ABO guess was made, so the reading leans harder on your other profile signals and habit patterns.'}
            </p>
          </div>
          
          {/* MBTI */}
          <div className="glass-card-light p-5">
            <div className="flex items-start justify-between gap-3 mb-2">
              <div className="label-mono">Personality Type</div>
              <span className={cardBadgeClassName} aria-hidden="true">
                {getMbtiSymbol(mbti)}
              </span>
            </div>
            <div>
              <div className="font-heading text-xl text-foreground">{mbti}</div>
              <div className="text-xs text-gold">{mbtiData[mbti].name}</div>
            </div>
            <p className="text-xs text-secondary-custom mt-2 leading-relaxed">
              {mbtiData[mbti].traits.slice(0, 3).join(' • ')}
            </p>
          </div>

          <div className="glass-card-light p-5">
            <div className="flex items-start justify-between gap-3 mb-2">
              <div className="label-mono">Enneagram</div>
              <span className={cardBadgeClassName} aria-hidden="true">
                {enneagram ? enneagramSymbols[enneagram] : '◎'}
              </span>
            </div>
            <div className="font-heading text-lg text-foreground">
              {enneagram ? enneagramTypeLabels[enneagram].name : 'Skipped'}
            </div>
            <p className="text-xs text-secondary-custom mt-2 leading-relaxed">
              {enneagram
                ? enneagramTypeLabels[enneagram].description
                : 'Not every reflective framework needs a forced label, so this stayed blank.'}
            </p>
          </div>

          <div className="glass-card-light p-5">
            <div className="flex items-start justify-between gap-3 mb-2">
              <div className="label-mono">Hogwarts House</div>
              <span className={cardBadgeClassName} aria-hidden="true">
                {hogwartsHouse ? hogwartsHouseSymbols[hogwartsHouse] : '🏰'}
              </span>
            </div>
            <div className="font-heading text-lg text-foreground">
              {hogwartsHouse ? hogwartsHouseLabels[hogwartsHouse].name : 'Skipped'}
            </div>
            <p className="text-xs text-secondary-custom mt-2 leading-relaxed">
              {hogwartsHouse
                ? hogwartsHouseLabels[hogwartsHouse].description
                : 'House stayed optional, so TypeAtlas did not invent a fandom identity for you.'}
            </p>
          </div>

          <div className="glass-card-light p-5">
            <div className="flex items-start justify-between gap-3 mb-2">
              <div className="label-mono">Love Language</div>
              <span className={cardBadgeClassName} aria-hidden="true">
                {loveLanguage ? loveLanguageSymbols[loveLanguage] : '♡'}
              </span>
            </div>
            <div className="font-heading text-lg text-foreground">
              {loveLanguage ? loveLanguageLabels[loveLanguage].name : 'Skipped'}
            </div>
            <p className="text-xs text-secondary-custom mt-2 leading-relaxed">
              {loveLanguage
                ? loveLanguageLabels[loveLanguage].description
                : 'This stayed blank, so TypeAtlas leaves it as an open communication preference rather than a type.'}
            </p>
          </div>

          <div className="glass-card-light p-5">
            <div className="flex items-start justify-between gap-3 mb-2">
              <div className="label-mono">Chronotype</div>
              <span className={cardBadgeClassName} aria-hidden="true">
                {chronotype ? chronotypeSymbols[chronotype] : '☾'}
              </span>
            </div>
            <div className="font-heading text-lg text-foreground">
              {chronotype ? chronotypeLabels[chronotype].name : 'Skipped'}
            </div>
            <p className="text-xs text-secondary-custom mt-2 leading-relaxed">
              {chronotype
                ? chronotypeLabels[chronotype].description
                : 'Chronotype stayed optional, so your timing pattern was left unspecified.'}
            </p>
          </div>

          <div className="glass-card-light p-5">
            <div className="flex items-start justify-between gap-3 mb-2">
              <div className="label-mono">Birthstone</div>
              <span className={cardBadgeClassName} aria-hidden="true">
                {birthstone ? birthstoneSymbols[birthstone] : '💠'}
              </span>
            </div>
            <div className="font-heading text-lg text-foreground">
              {birthstoneInfo ? `${birthstoneInfo.month} - ${birthstoneInfo.name}` : 'Unavailable'}
            </div>
            <p className="text-xs text-secondary-custom mt-2 leading-relaxed">
              {birthstoneInfo
                ? birthstoneInfo.description
                : 'Birthstone is normally derived from birth month and used as a symbolic identity marker.'}
            </p>
          </div>
        </motion.div>

        {/* How Each Factor Shapes Your Plate */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="glass-card p-6 md:p-8 mb-10"
        >
          <h3 className="font-heading text-xl text-foreground mb-6">How Each Factor Shapes Your TypeAtlas Profile</h3>
          
          <div className="space-y-5">
            {/* Blood Type influence */}
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center flex-shrink-0">
                <span className="text-gold text-lg">🩸</span>
              </div>
              <div>
                <h4 className="font-heading text-gold text-sm mb-1">
                  {bloodType ? `Your Type ${bloodType} Blood` : 'Blood Type Input'}
                </h4>
                <p className="text-secondary-custom text-sm leading-relaxed">
                  {bloodTypeInfo && bloodTypePersonality
                    ? `When supplied, Type ${bloodType} adds a low-confidence ABO layer built from popular diet and Korean personality lore. That nudges foods like ${bloodTypeInfo.foods.highlyBeneficial.slice(0, 3).join(', ')} upward and pairs well with ${bloodTypeInfo.exercise.slice(0, 2).join(' and ')}.`
                    : 'You left ABO blank, so TypeAtlas did not invent a category. Instead, it leaned more heavily on the other signals you actually gave us.'}
                </p>
              </div>
            </div>

            {/* MBTI influence */}
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center flex-shrink-0">
                <span className="text-gold text-lg">🧠</span>
              </div>
              <div>
                <h4 className="font-heading text-gold text-sm mb-1">Your {mbti} Personality</h4>
                <p className="text-secondary-custom text-sm leading-relaxed">
                  As {mbtiData[mbti].name}, you naturally {mbtiData[mbti].eatingHabits[0].toLowerCase()}. 
                  Your ideal approach: {mbtiData[mbti].dietStyle}
                </p>
              </div>
            </div>

            {/* Western Zodiac influence */}
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center flex-shrink-0">
                <span className="text-gold text-lg">☉</span>
              </div>
              <div>
                <h4 className="font-heading text-gold text-sm mb-1">Your {westernZodiacData[westernZodiac].name} Sun Sign</h4>
                <p className="text-secondary-custom text-sm leading-relaxed">
                  Born under the {westernZodiacData[westernZodiac].element} sign of {westernZodiacData[westernZodiac].name}, 
                  you resonate with {westernZodiacData[westernZodiac].foods.recommended.slice(0, 3).join(', ')}. 
                  {westernZodiacData[westernZodiac].cookingStyles[0]} brings out your best.
                </p>
              </div>
            </div>

            {/* Chinese Zodiac influence */}
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center flex-shrink-0">
                <span className="text-gold text-lg">🐉</span>
              </div>
              <div>
                <h4 className="font-heading text-gold text-sm mb-1">Your Year of the {chineseZodiacData[chineseZodiac].name}</h4>
                <p className="text-secondary-custom text-sm leading-relaxed">
                  The {chineseZodiacData[chineseZodiac].element} {chineseZodiacData[chineseZodiac].name} brings {chineseZodiacData[chineseZodiac].traits.slice(0, 2).join(' and ')} energy to your nutrition. 
                  You benefit from {chineseZodiacData[chineseZodiac].foods.recommended.slice(0, 3).join(', ')}.
                </p>
              </div>
            </div>

            {bloodTypeInfo && bloodTypePersonality && (
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-gold text-lg">🇰🇷</span>
                </div>
                <div>
                  <h4 className="font-heading text-gold text-sm mb-1">Your Korean Blood Type Profile</h4>
                  <p className="text-secondary-custom text-sm leading-relaxed">
                    In Korean pop theory, Type {bloodType} maps to the {bloodTypePersonality.title}. That points toward a
                    {` ${bloodTypePersonality.traits.slice(0, 3).join(', ').toLowerCase()} `}
                    style and keeps
                    {` ${bloodTypePersonality.career.split(' ').slice(0, 5).join(' ').toLowerCase()} `}
                    in the background of the reading.
                  </p>
                </div>
              </div>
            )}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <ResearchFieldGuide userProfile={userProfile} />
        </motion.div>
        
        {/* Macros */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="glass-card-light p-6 mb-10"
        >
          <h3 className="font-heading text-lg text-foreground mb-3">Meal Rhythm That Fits You</h3>
          <p className="text-secondary-custom leading-relaxed">
            {result.mealRhythm}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.55 }}
          className="glass-card-light p-6 mb-10"
        >
          <h3 className="font-heading text-lg text-foreground mb-4">Your Optimal Nutrition</h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className="text-center">
              <div className="font-heading text-2xl text-gold">{result.macros.protein}%</div>
              <div className="text-xs text-secondary-custom uppercase tracking-wider">Protein</div>
            </div>
            <div className="text-center">
              <div className="font-heading text-2xl text-gold">{result.macros.carbs}%</div>
              <div className="text-xs text-secondary-custom uppercase tracking-wider">Carbs</div>
            </div>
            <div className="text-center">
              <div className="font-heading text-2xl text-gold">{result.macros.fats}%</div>
              <div className="text-xs text-secondary-custom uppercase tracking-wider">Fats</div>
            </div>
            <div className="text-center">
              <div className="font-heading text-2xl text-gold">{result.macros.fiber}g</div>
              <div className="text-xs text-secondary-custom uppercase tracking-wider">Fiber</div>
            </div>
            <div className="text-center col-span-2 md:col-span-1">
              <div className="font-heading text-sm text-gold">{result.macros.hydration}</div>
              <div className="text-xs text-secondary-custom uppercase tracking-wider">Hydration</div>
            </div>
          </div>
        </motion.div>
        
        {/* Suggested ingredients */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.65 }}
          className="glass-card p-6 md:p-8 mb-10"
        >
          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
                  <Leaf className="w-5 h-5 text-green-400" />
                </div>
                <h3 className="font-heading text-xl text-foreground">Suggested Ingredients</h3>
              </div>

              <div className="flex flex-wrap gap-2">
                {result.ingredientsToPrioritize.slice(0, 12).map((ingredient) => (
                  <span
                    key={ingredient}
                    className="px-3 py-1.5 rounded-full text-xs bg-green-500/10 text-green-300 border border-green-500/30"
                  >
                    {ingredient}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center">
                  <AlertTriangle className="w-5 h-5 text-red-400" />
                </div>
                <h3 className="font-heading text-xl text-foreground">Limit or Avoid</h3>
              </div>

              <div className="flex flex-wrap gap-2">
                {result.foodsToAvoid.slice(0, 8).map((food) => (
                  <span
                    key={food}
                    className="px-3 py-1.5 rounded-full text-xs bg-red-500/10 text-red-300 border border-red-500/30"
                  >
                    {food}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-7 border-t border-white/10 pt-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center">
                <Star className="w-5 h-5 text-gold" />
              </div>
              <h3 className="font-heading text-xl text-foreground">Simple Rituals</h3>
            </div>

            <ul className="grid gap-3 md:grid-cols-2">
              {result.rituals.slice(0, 4).map((ritual) => (
                <li key={ritual} className="flex items-start gap-3 text-sm text-secondary-custom">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-gold flex-shrink-0" />
                  <span>{ritual}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.75 }}
          className="text-center"
        >
          <button
            onClick={onViewClosing}
            className="btn-gold-filled inline-flex items-center gap-3"
          >
            <span>Continue Your Journey</span>
            <ChevronRight className="w-5 h-5" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
