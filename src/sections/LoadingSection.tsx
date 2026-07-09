import { motion } from 'framer-motion';
import { RotatingGeometry, GlowOrb } from '@/components/SacredGeometry';
import { ChevronLeft } from 'lucide-react';

interface LoadingSectionProps {
  onBack: () => void;
}

export function LoadingSection({ onBack }: LoadingSectionProps) {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0B0D10] via-[#0F1218] to-[#0B0D10]" />

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
      
      {/* Central glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <GlowOrb size={400} />
      </div>
      
      {/* Rotating geometry */}
      <motion.div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: 'easeOut' }}
      >
        <div className="w-64 h-64 md:w-80 md:h-80">
          <RotatingGeometry />
        </div>
      </motion.div>
      
      {/* Secondary rotating ring */}
      <motion.div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ delay: 0.5, duration: 1 }}
      >
        <motion.svg
          viewBox="0 0 300 300"
          className="w-80 h-80 md:w-96 md:h-96"
          animate={{ rotate: -360 }}
          transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
        >
          <circle
            cx="150"
            cy="150"
            r="140"
            fill="none"
            stroke="rgba(243, 184, 85, 0.2)"
            strokeWidth="1"
            strokeDasharray="20 10"
          />
          <circle
            cx="150"
            cy="150"
            r="120"
            fill="none"
            stroke="rgba(243, 184, 85, 0.15)"
            strokeWidth="0.5"
          />
        </motion.svg>
      </motion.div>
      
      {/* Loading text */}
      <div className="relative z-10 text-center mt-64 md:mt-80">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="font-heading text-2xl md:text-3xl text-foreground mb-4"
        >
          Reading the signs...
        </motion.h2>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="text-secondary-custom max-w-md mx-auto px-4"
        >
          Mapping your stars, type, and energy into a TypeAtlas profile personalized from your answers.
        </motion.p>
        
        {/* Animated dots */}
        <motion.div 
          className="flex justify-center gap-2 mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-2 h-2 rounded-full bg-gold"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.3
              }}
            />
          ))}
        </motion.div>
        
        {/* Processing steps */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="mt-12 space-y-2"
        >
          {[
            'Mapping your symbolic layers...',
            'Scoring your self-reported signals...',
            'Matching research-backed insights...',
            'Sorting evidence from tradition...',
            'Building your TypeAtlas profile...'
          ].map((step, index) => (
            <motion.p
              key={step}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: [0, 1, 0.5], x: 0 }}
              transition={{
                delay: 0.7 + index * 0.35,
                duration: 0.8,
                times: [0, 0.3, 1]
              }}
              className="text-xs font-mono uppercase tracking-wider text-secondary-custom/60"
            >
              {step}
            </motion.p>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
