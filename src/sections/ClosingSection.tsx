import { motion } from 'framer-motion';
import { SacredRings, GlowOrb } from '@/components/SacredGeometry';
import type { SacredArchetype } from '@/types';
import { ChevronLeft, Download, Share2, RotateCcw, Sparkles, Heart } from 'lucide-react';

interface ClosingSectionProps {
  result: SacredArchetype;
  onBack: () => void;
  onRestart: () => void;
  onShare: () => void;
  onDownloadPDF: () => void;
}

export function ClosingSection({ result, onBack, onRestart, onShare, onDownloadPDF }: ClosingSectionProps) {
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
      <div className="relative z-10 w-full max-w-2xl mx-4">
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="glass-card p-8 md:p-12 text-center"
        >
          {/* Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: 'spring' }}
            className="w-20 h-20 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-6"
          >
            <Sparkles className="w-10 h-10 text-gold" />
          </motion.div>
          
          {/* Title */}
          <h1 className="font-heading text-3xl md:text-4xl text-foreground mb-4">
            Your plate is a practice.
          </h1>
          
          {/* Description */}
          <p className="text-secondary-custom mb-8 leading-relaxed">
            Come back anytime to regenerate, adjust for seasons, or save a new profile. 
            Your sacred archetype <span className="text-gold">{result.name}</span> will 
            continue to guide your nourishment journey.
          </p>
          
          {/* Action buttons */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onDownloadPDF}
              className="flex items-center justify-center gap-3 px-6 py-4 rounded-xl bg-secondary-dark border border-white/10 hover:border-gold/30 transition-colors"
            >
              <Download className="w-5 h-5 text-gold" />
              <span className="text-foreground">Print / PDF</span>
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
          
          {/* Restart link */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onRestart}
            className="flex items-center justify-center gap-2 text-secondary-custom hover:text-gold transition-colors mx-auto mb-10"
          >
            <RotateCcw className="w-4 h-4" />
            <span className="font-mono text-sm uppercase tracking-wider">Restart the Ritual</span>
          </motion.button>
          
          {/* Divider */}
          <div className="border-t border-white/10 pt-8">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Sparkles className="w-4 h-4 text-gold" />
              <span className="font-heading text-lg text-foreground">TypeAtlas</span>
              <Sparkles className="w-4 h-4 text-gold" />
            </div>
            
            <p className="text-xs text-secondary-custom/60 mb-4">
              Built from symbols, stories, and selected science.
            </p>
            
            <div className="flex items-center justify-center gap-1 text-xs text-secondary-custom/40">
              <span>Made with</span>
              <Heart className="w-3 h-3 text-red-400 fill-red-400" />
              <span>for your sacred journey</span>
            </div>
          </div>
        </motion.div>
        
        {/* Footer links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center mt-8"
        >
          <div className="flex flex-wrap justify-center gap-4 text-xs text-secondary-custom/50">
            <span>Astrology</span>
            <span>•</span>
            <span>Ayurveda</span>
            <span>•</span>
            <span>Blood Type</span>
            <span>•</span>
            <span>MBTI</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
