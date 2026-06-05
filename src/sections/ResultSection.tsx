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
import {
  Sparkles,
  ChevronLeft,
  Leaf,
  Flame,
  Droplets,
  Wind,
  Mountain,
  AlertTriangle,
  Star,
  Printer,
  Share2,
  RotateCcw,
} from 'lucide-react';

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
  onBack: () => void;
  onRestart: () => void;
  onShare: () => void;
  onPrint: () => void;
}

export function ResultSection({
  result,
  userProfile,
  onBack,
  onRestart,
  onShare,
  onPrint,
}: ResultSectionProps) {
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
        className="print-hidden absolute top-8 left-8 flex items-center gap-2 text-secondary-custom hover:text-gold transition-colors z-20"
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
          
          <p className="text-secondary-custom text-lg max-w-2xl mx-auto">
            {result.dietStyle}
          </p>
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

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <ResearchFieldGuide userProfile={userProfile} />
        </motion.div>
        
        {/* Nutrition guidance */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="glass-card p-5 md:p-7 mb-10"
        >
          <div className="space-y-6">
            <div>
              <h3 className="font-heading text-lg text-foreground mb-2">Meal Rhythm That Fits You</h3>
              <p className="text-sm text-secondary-custom leading-relaxed">
                {result.mealRhythm}
              </p>
            </div>

            <hr className="border-white/10" />

            <div>
              <h3 className="font-heading text-lg text-foreground mb-3">Your Optimal Nutrition</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div>
                  <div className="font-heading text-xl text-gold">{result.macros.protein}%</div>
                  <div className="text-[10px] text-secondary-custom uppercase tracking-wider">Protein</div>
                </div>
                <div>
                  <div className="font-heading text-xl text-gold">{result.macros.carbs}%</div>
                  <div className="text-[10px] text-secondary-custom uppercase tracking-wider">Carbs</div>
                </div>
                <div>
                  <div className="font-heading text-xl text-gold">{result.macros.fats}%</div>
                  <div className="text-[10px] text-secondary-custom uppercase tracking-wider">Fats</div>
                </div>
                <div>
                  <div className="font-heading text-xl text-gold">{result.macros.fiber}g</div>
                  <div className="text-[10px] text-secondary-custom uppercase tracking-wider">Fiber</div>
                </div>
                <div className="col-span-2 sm:col-span-4 flex items-start gap-3 rounded-md border border-cyan-300/15 bg-cyan-300/5 p-3">
                  <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-cyan-300/10 text-cyan-200">
                    <Droplets className="h-4 w-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-[10px] text-secondary-custom uppercase tracking-wider">Hydration</div>
                    <div className="font-heading text-sm text-gold leading-snug">{result.macros.hydration}</div>
                  </div>
                </div>
              </div>
            </div>

            <hr className="border-white/10" />

            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center">
                  <Leaf className="w-4 h-4 text-green-400" />
                </div>
                <h3 className="font-heading text-lg text-foreground">Suggested Ingredients</h3>
              </div>

              <ul className="grid gap-x-6 gap-y-2 sm:grid-cols-2">
                {result.ingredientsToPrioritize.slice(0, 10).map((ingredient) => (
                  <li
                    key={ingredient}
                    className="border-l border-green-500/30 pl-3 text-sm text-secondary-custom"
                  >
                    {ingredient}
                  </li>
                ))}
              </ul>
            </div>

            <hr className="border-white/10" />

            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center">
                  <AlertTriangle className="w-4 h-4 text-red-400" />
                </div>
                <h3 className="font-heading text-lg text-foreground">Limit or Avoid</h3>
              </div>

              <ul className="grid gap-x-6 gap-y-2 sm:grid-cols-2">
                {result.foodsToAvoid.slice(0, 6).map((food) => (
                  <li
                    key={food}
                    className="border-l border-red-500/30 pl-3 text-sm text-secondary-custom"
                  >
                    {food}
                  </li>
                ))}
              </ul>
            </div>

            <hr className="border-white/10" />

            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center">
                  <Star className="w-4 h-4 text-gold" />
                </div>
                <h3 className="font-heading text-lg text-foreground">Simple Rituals</h3>
              </div>

              <ul className="space-y-2">
                {result.rituals.slice(0, 4).map((ritual) => (
                  <li key={ritual} className="flex items-start gap-2.5 text-sm text-secondary-custom">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-gold flex-shrink-0" />
                    <span>{ritual}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Closing actions */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.75 }}
          className="print-hidden glass-card p-8 md:p-12 text-center max-w-2xl mx-auto"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.9, type: 'spring' }}
            className="w-20 h-20 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-6"
          >
            <Sparkles className="w-10 h-10 text-gold" />
          </motion.div>

          <h3 className="font-heading text-3xl md:text-4xl text-foreground mb-4">
            Your plate is a practice.
          </h3>

          <p className="text-secondary-custom mb-8 leading-relaxed">
            Come back anytime to regenerate, adjust for seasons, or save a new profile.
            Your sacred archetype <span className="text-gold">{result.name}</span> will
            continue to guide your nourishment journey.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onPrint}
              className="flex items-center justify-center gap-3 px-6 py-4 rounded-xl bg-secondary-dark border border-white/10 hover:border-gold/30 transition-colors"
            >
              <Printer className="w-5 h-5 text-gold" />
              <span className="text-foreground">Print</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onShare}
              className="flex items-center justify-center gap-3 px-6 py-4 rounded-xl bg-secondary-dark border border-white/10 hover:border-gold/30 transition-colors"
            >
              <Share2 className="w-5 h-5 text-gold" />
              <span className="text-foreground">Share</span>
            </motion.button>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onRestart}
            className="flex items-center justify-center gap-2 text-secondary-custom hover:text-gold transition-colors mx-auto mb-10"
          >
            <RotateCcw className="w-4 h-4" />
            <span className="font-mono text-sm uppercase tracking-wider">Restart the Ritual</span>
          </motion.button>

          <div className="border-t border-white/10 pt-8">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Sparkles className="w-4 h-4 text-gold" />
              <span className="font-heading text-lg text-foreground">TypeAtlas</span>
              <Sparkles className="w-4 h-4 text-gold" />
            </div>

            <p className="text-xs text-secondary-custom/60 mb-4">
              Built from symbols, stories, and selected science.
            </p>

            <p className="mx-auto max-w-xs text-xs leading-relaxed text-secondary-custom/40">
              Made with 💗 in Stockholm, for your sacred journey
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
