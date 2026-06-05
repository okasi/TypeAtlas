import { motion } from 'framer-motion';
import { SacredRings, GlowOrb } from '@/components/SacredGeometry';
import type { SacredArchetype } from '@/types';
import { ChevronLeft, ChevronRight, Leaf, AlertTriangle, Star, Sparkles } from 'lucide-react';

interface MealPlanSectionProps {
  result: SacredArchetype;
  onViewClosing: () => void;
  onBack: () => void;
}

export function MealPlanSection({ result, onViewClosing, onBack }: MealPlanSectionProps) {
  return (
    <section className="relative min-h-screen overflow-hidden py-20">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0B0D10] via-[#0F1218] to-[#0B0D10]" />
      
      {/* Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 opacity-30">
        <GlowOrb size={600} />
      </div>
      
      {/* Sacred rings */}
      <div className="absolute inset-0 flex items-center justify-center opacity-15">
        <SacredRings size={800} />
      </div>
      
      {/* Back button */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        onClick={onBack}
        className="absolute top-8 left-8 flex items-center gap-2 text-secondary-custom hover:text-gold transition-colors z-20"
      >
        <ChevronLeft className="w-5 h-5" />
        <span className="font-mono text-sm uppercase tracking-wider">Back to Results</span>
      </motion.button>
      
      {/* Main content */}
      <div className="relative z-10 w-full max-w-4xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 pt-16"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Sparkles className="w-5 h-5 text-gold" />
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-secondary-custom">
              Your TypeAtlas Profile
            </span>
            <Sparkles className="w-5 h-5 text-gold" />
          </div>
          
          <h1 className="font-heading text-3xl md:text-4xl text-foreground mb-4">
            Your Sacred Ingredients
          </h1>
          
          <p className="text-secondary-custom max-w-xl mx-auto">
            These ingredients are specifically chosen to harmonize with your unique constitution 
            across all five sacred systems.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="glass-card-light p-6 md:p-8 mb-8"
        >
          <div className="grid gap-6 md:grid-cols-[1.1fr_0.9fr]">
            <div>
              <h3 className="font-heading text-lg text-foreground mb-4">Signature Themes</h3>
              <div className="flex flex-wrap gap-2">
                {result.signatureThemes.map((theme) => (
                  <span
                    key={theme}
                    className="px-3 py-1.5 rounded-full border border-gold/25 bg-gold/10 text-xs uppercase tracking-[0.14em] text-gold"
                  >
                    {theme}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-heading text-lg text-foreground mb-4">Meal Rhythm</h3>
              <p className="text-secondary-custom text-sm leading-relaxed">
                {result.mealRhythm}
              </p>
            </div>
          </div>
        </motion.div>
        
        {/* Ingredients to Prioritize */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="glass-card p-6 md:p-8 mb-8"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
              <Leaf className="w-5 h-5 text-green-400" />
            </div>
            <h3 className="font-heading text-xl text-foreground">Ingredients to Prioritize</h3>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {result.ingredientsToPrioritize.map((ingredient, index) => (
              <motion.span
                key={ingredient}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 + index * 0.03 }}
                className="px-4 py-2 rounded-full text-sm bg-green-500/10 text-green-300 border border-green-500/30"
              >
                {ingredient}
              </motion.span>
            ))}
          </div>
        </motion.div>
        
        {/* Foods to Avoid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="glass-card p-6 md:p-8 mb-8"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-red-400" />
            </div>
            <h3 className="font-heading text-xl text-foreground">Foods and Habits to Limit</h3>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {result.foodsToAvoid.map((food, index) => (
              <motion.span
                key={food}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 + index * 0.05 }}
                className="px-4 py-2 rounded-full text-sm bg-red-500/10 text-red-300 border border-red-500/30"
              >
                {food}
              </motion.span>
            ))}
          </div>
        </motion.div>
        
        {/* Macro summary */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="glass-card-light p-6 mb-10"
        >
          <h3 className="font-heading text-lg text-foreground mb-4 text-center">Your Optimal Nutrition Balance</h3>
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
              <div className="text-xs text-secondary-custom uppercase tracking-wider">Daily</div>
            </div>
          </div>
        </motion.div>
        
        {/* Sacred rituals */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="glass-card p-6 mb-10"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center">
              <Star className="w-5 h-5 text-gold" />
            </div>
            <h3 className="font-heading text-lg text-foreground">Sacred Wellness Rituals</h3>
          </div>
          <ul className="space-y-3">
            {result.rituals.map((ritual, index) => (
              <li key={index} className="flex items-start gap-3">
                <span className="text-gold mt-1">✦</span>
                <span className="text-secondary-custom text-sm">{ritual}</span>
              </li>
            ))}
          </ul>
        </motion.div>
        
        {/* Insight */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="text-center mb-12"
        >
          <div className="inline-block glass-card-light px-6 py-4">
            <span className="text-gold text-sm">✦ Sacred Insight:</span>
            <span className="text-secondary-custom text-sm ml-2">{result.insight}</span>
          </div>
        </motion.div>
        
        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center pb-12"
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
