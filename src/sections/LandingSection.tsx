import { motion } from 'framer-motion';
import { SacredRings, StarField, GlowOrb } from '@/components/SacredGeometry';

interface LandingSectionProps {
  onStart: () => void;
  onResume?: () => void;
  hasSavedProfile?: boolean;
}

const landingFeatureChips = [
  'Western Zodiac',
  'Chinese Zodiac',
  'Birthstone',
  'Blood Type',
  'MBTI',
  'Ayurvedic Dosha',
  'Enneagram',
  'Hogwarts House',
  'Love Language',
  'Chronotype',
  'Evidence-Based Insights',
];

export function LandingSection({ onStart, onResume, hasSavedProfile = false }: LandingSectionProps) {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0B0D10] via-[#0F1218] to-[#0B0D10]" />

      {/* Star field */}
      <StarField />

      {/* Sacred geometry background */}
      <div className="absolute inset-0 flex items-center justify-center opacity-85 pointer-events-none">
        <SacredRings size={600} />
      </div>

      {/* Glow orb behind content */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <GlowOrb size={500} />
      </div>

      {/* Floating zodiac symbols */}
      <motion.div
        className="absolute top-20 left-20 text-gold/30 text-4xl"
        animate={{ y: [0, -10, 0], rotate: [0, 5, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      >
        ☽
      </motion.div>

      <motion.div
        className="absolute top-32 right-24 text-gold/25 text-3xl"
        animate={{ y: [0, 8, 0], rotate: [0, -5, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
      >
        ☉
      </motion.div>

      <motion.div
        className="absolute bottom-32 left-28 text-gold/20 text-2xl"
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
      >
        ✦
      </motion.div>

      <motion.div
        className="absolute bottom-24 right-20 text-gold/25 text-3xl"
        animate={{ y: [0, 10, 0], rotate: [0, 10, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
      >
        ✧
      </motion.div>

      {/* Main content */}
      <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
        <div className="landing-copy-halo" />
        <div className="landing-copy-panel" />

        {/* Main headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: 'easeOut' }}
          className="font-heading text-5xl md:text-7xl font-semibold text-foreground mb-6 tracking-wider hero-title-shadow"
        >
          <span className="text-gold">TYPE</span>ATLAS
        </motion.h1>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
          className="font-heading text-xl md:text-2xl text-foreground mb-4 tracking-wide hero-copy-shadow"
        >
          Understand what supports your nature.
        </motion.p>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: 'easeOut' }}
          className="text-foreground/82 text-base md:text-lg max-w-xl mx-auto mb-10 leading-relaxed hero-copy-shadow"
        >
          Explore ancient wisdom, personality patterns, and body-type traditions,
          with transparent sourcing that separates symbolic meaning from scientific
          evidence.
        </motion.p>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7, ease: 'easeOut' }}
          className="flex flex-col items-center gap-4"
        >
          <button
            onClick={onStart}
            className="btn-gold text-lg px-12 py-5"
          >
            Begin Your TypeAtlas Reading
          </button>

          {hasSavedProfile && onResume && (
            <button
              onClick={onResume}
              className="text-sm font-mono uppercase tracking-[0.14em] text-foreground/72 hover:text-gold transition-colors hero-copy-shadow"
            >
              Open Your Last Result
            </button>
          )}
        </motion.div>

        {/* Microcopy */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="mt-6 text-sm text-foreground/68 hero-copy-shadow"
        >
          Takes about ~6 minutes • No signup required
        </motion.p>

        {/* Feature pills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1, ease: 'easeOut' }}
          className="mt-12 flex flex-wrap justify-center gap-2.5 md:gap-3"
        >
          {landingFeatureChips.map((item) => (
            <span
              key={item}
              className="px-3 py-2 md:px-4 rounded-full text-[11px] md:text-xs font-mono uppercase tracking-wider border border-white/10 bg-black/20 text-foreground/76 hero-copy-shadow"
            >
              {item}
            </span>
          ))}
        </motion.div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0B0D10] to-transparent" />
    </section>
  );
}
