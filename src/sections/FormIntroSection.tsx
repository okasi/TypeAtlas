import { useState } from 'react';
import { motion } from 'framer-motion';
import { SacredRings, GlowOrb } from '@/components/SacredGeometry';
import { ChevronLeft, User, Calendar } from 'lucide-react';

interface FormIntroSectionProps {
  onSubmit: (name: string, birthDate: string) => void;
  onBack: () => void;
}

function capitalizeFirstLetter(value: string) {
  if (!value) {
    return value;
  }

  return value.charAt(0).toUpperCase() + value.slice(1);
}

export function FormIntroSection({ onSubmit, onBack }: FormIntroSectionProps) {
  const [name, setName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [errors, setErrors] = useState<{ name?: string; birthDate?: string }>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { name?: string; birthDate?: string } = {};
    
    if (!name.trim()) {
      newErrors.name = 'Please enter your name';
    }
    
    if (!birthDate) {
      newErrors.birthDate = 'Please select your birth date';
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    onSubmit(name.trim(), birthDate);
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden py-20">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0B0D10] via-[#0F1218] to-[#0B0D10]" />
      
      {/* Glow behind card */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-40">
        <GlowOrb size={600} />
      </div>
      
      {/* Sacred rings */}
      <div className="absolute inset-0 flex items-center justify-center opacity-30">
        <SacredRings size={700} />
      </div>
      
      {/* Back button */}
      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        onClick={onBack}
        className="absolute top-8 left-8 flex items-center gap-2 text-secondary-custom hover:text-gold transition-colors z-20"
      >
        <ChevronLeft className="w-5 h-5" />
        <span className="font-mono text-sm uppercase tracking-wider">Back</span>
      </motion.button>
      
      {/* Main card */}
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="relative z-10 w-full max-w-xl mx-4"
      >
        <div className="glass-card p-8 md:p-12">
          {/* Label */}
          <div className="label-mono mb-4">Your Essence</div>
          
          {/* Title */}
          <h2 className="font-heading text-3xl md:text-4xl text-foreground mb-4">
            Tell us who you are
          </h2>
          
          {/* Description */}
          <p className="text-secondary-custom mb-8 leading-relaxed">
            We ask for your name to personalize the reading, and your birth date to calculate your
            Western and Chinese zodiac signs.
          </p>
          
          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name input */}
            <div>
              <label className="block text-sm text-secondary-custom mb-2">
                Your Name
              </label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-secondary-custom/50" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => {
                    setName(capitalizeFirstLetter(e.target.value));
                    if (errors.name) setErrors({ ...errors, name: undefined });
                  }}
                  placeholder="Enter your first name"
                  className="input-sacred pl-12"
                />
              </div>
              {errors.name && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-400 text-sm mt-2"
                >
                  {errors.name}
                </motion.p>
              )}
            </div>
            
            {/* Birth date input */}
            <div>
              <label className="block text-sm text-secondary-custom mb-2">
                Birth Date
              </label>
              <div className="relative">
                <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-secondary-custom/50" />
                <input
                  type="date"
                  value={birthDate}
                  onChange={(e) => {
                    setBirthDate(e.target.value);
                    if (errors.birthDate) setErrors({ ...errors, birthDate: undefined });
                  }}
                  className="input-sacred pl-12"
                  max={new Date().toISOString().split('T')[0]}
                />
              </div>
              {errors.birthDate && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-400 text-sm mt-2"
                >
                  {errors.birthDate}
                </motion.p>
              )}
            </div>
            
            {/* Submit button */}
            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full btn-gold-filled mt-8"
            >
              Continue to Questions
            </motion.button>
          </form>
          
          {/* Privacy note */}
          <p className="text-xs text-secondary-custom/50 text-center mt-6">
            Your details are not permanently saved in the cloud. Live mode temporarily shares your name, progress, and result with active visitors while you’re connected.
          </p>
        </div>
      </motion.div>
    </section>
  );
}
