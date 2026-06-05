import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft } from 'lucide-react';
import { GlowOrb, SacredRings } from '@/components/SacredGeometry';
import { atlasSignalQuestions } from '@/data';
import { useArrowOptionNavigation } from '@/hooks/use-arrow-option-navigation';
import type { UserProfile } from '@/types';

type AtlasSignals = Pick<UserProfile, 'enneagram' | 'hogwartsHouse' | 'loveLanguage' | 'chronotype'>;
type AtlasSignalKey = keyof AtlasSignals;
type AtlasSignalSelection = AtlasSignals[AtlasSignalKey] | 'skip';

const stepCardVariants = {
  enter: (direction: number) => ({
    opacity: 0,
    x: direction > 0 ? 48 : -48,
  }),
  center: {
    opacity: 1,
    x: 0,
  },
  exit: (direction: number) => ({
    opacity: 0,
    x: direction > 0 ? -48 : 48,
  }),
};

interface AtlasSignalsSectionProps {
  userProfile: Partial<UserProfile>;
  initialStep?: number;
  initialSignalSelections?: Partial<Record<AtlasSignalKey, AtlasSignalSelection>>;
  onStateChange?: (details: {
    currentStep: number;
    signals: AtlasSignals;
    signalSelections: Partial<Record<AtlasSignalKey, AtlasSignalSelection>>;
  }) => void;
  onComplete: (signals: AtlasSignals) => void;
  onBack: () => void;
  onProgressChange?: (details: { progress: number; label: string }) => void;
}

const AUTO_ADVANCE_DELAY = 377;

export function AtlasSignalsSection({
  userProfile,
  initialStep = 0,
  initialSignalSelections = {},
  onStateChange,
  onComplete,
  onBack,
  onProgressChange,
}: AtlasSignalsSectionProps) {
  const totalSteps = atlasSignalQuestions.length;
  const [currentStep, setCurrentStep] = useState(() => Math.min(Math.max(initialStep, 0), totalSteps - 1));
  const [direction, setDirection] = useState<1 | -1>(1);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const selectionLockRef = useRef(false);
  const [signalSelections, setSignalSelections] =
    useState<Partial<Record<AtlasSignalKey, AtlasSignalSelection>>>(initialSignalSelections);
  const [answeredQuestions, setAnsweredQuestions] = useState<Set<keyof AtlasSignals>>(
    () =>
      new Set(
        (['enneagram', 'hogwartsHouse', 'loveLanguage', 'chronotype'] as Array<keyof AtlasSignals>).filter(
          (key) => Boolean(userProfile[key]) || Boolean(initialSignalSelections[key]),
        ),
      ),
  );
  const initialEnneagram = initialSignalSelections.enneagram;
  const initialHogwartsHouse = initialSignalSelections.hogwartsHouse;
  const initialLoveLanguage = initialSignalSelections.loveLanguage;
  const initialChronotype = initialSignalSelections.chronotype;
  const [signals, setSignals] = useState<AtlasSignals>({
    enneagram:
      initialEnneagram === 'skip'
        ? undefined
        : (initialEnneagram as AtlasSignals['enneagram'] | undefined) ?? userProfile.enneagram,
    hogwartsHouse:
      initialHogwartsHouse === 'skip'
        ? undefined
        : (initialHogwartsHouse as AtlasSignals['hogwartsHouse'] | undefined) ?? userProfile.hogwartsHouse,
    loveLanguage:
      initialLoveLanguage === 'skip'
        ? undefined
        : (initialLoveLanguage as AtlasSignals['loveLanguage'] | undefined) ?? userProfile.loveLanguage,
    chronotype:
      initialChronotype === 'skip'
        ? undefined
        : (initialChronotype as AtlasSignals['chronotype'] | undefined) ?? userProfile.chronotype,
  });

  const currentQuestion = atlasSignalQuestions[currentStep];
  const progress = ((currentStep + 1) / totalSteps) * 100;
  const selectedValue = signals[currentQuestion.id];
  const hasAnsweredCurrent = answeredQuestions.has(currentQuestion.id);
  const selectedOptionIndex = currentQuestion.options.findIndex((option) =>
    option.value ? option.value === selectedValue : hasAnsweredCurrent && !selectedValue,
  );

  const { setOptionRef } = useArrowOptionNavigation({
    enabled: !isTransitioning,
    optionCount: currentQuestion.options.length,
    selectedIndex: selectedOptionIndex,
  });

  useEffect(() => {
    if (!onProgressChange) {
      return;
    }

    onProgressChange({
      progress,
      label: `Signals: ${currentQuestion.category} (${currentStep + 1}/${totalSteps})`,
    });
  }, [currentQuestion.category, currentStep, onProgressChange, progress, totalSteps]);

  useEffect(() => {
    onStateChange?.({
      currentStep,
      signals,
      signalSelections,
    });
  }, [currentStep, onStateChange, signalSelections, signals]);

  function handleSelect(value?: string) {
    if (isTransitioning || selectionLockRef.current) {
      return;
    }
    selectionLockRef.current = true;
    setDirection(1);

    const nextSignals = {
      ...signals,
      [currentQuestion.id]: value,
    } as AtlasSignals;
    const nextSignalSelections = {
      ...signalSelections,
      [currentQuestion.id]: value ?? 'skip',
    } as Partial<Record<AtlasSignalKey, AtlasSignalSelection>>;

    setSignals(nextSignals);
    setSignalSelections(nextSignalSelections);
    setAnsweredQuestions((prev) => {
      const next = new Set(prev);
      next.add(currentQuestion.id);
      return next;
    });

    window.setTimeout(() => {
      setIsTransitioning(true);
      window.setTimeout(() => {
        if (currentStep < totalSteps - 1) {
          setCurrentStep(currentStep + 1);
          selectionLockRef.current = false;
          setIsTransitioning(false);
          return;
        }

        onComplete(nextSignals);
      }, AUTO_ADVANCE_DELAY);
    }, 50);
  }

  function handleBack() {
    if (isTransitioning || selectionLockRef.current) {
      return;
    }

    if (currentStep > 0) {
      setDirection(-1);
      setCurrentStep(currentStep - 1);
      return;
    }

    onBack();
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden py-20">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0B0D10] via-[#0F1218] to-[#0B0D10]" />

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-30">
        <GlowOrb size={500} />
      </div>

      <div className="absolute inset-0 flex items-center justify-center opacity-20">
        <SacredRings size={600} />
      </div>

      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        onClick={handleBack}
        disabled={isTransitioning}
        className="absolute top-8 left-8 flex items-center gap-2 text-secondary-custom hover:text-gold transition-colors z-20 disabled:opacity-50"
      >
        <ChevronLeft className="w-5 h-5" />
        <span className="font-mono text-sm uppercase tracking-wider">Back</span>
      </motion.button>

      <div className="absolute top-8 right-8 z-20">
        <span className="font-mono text-sm text-secondary-custom">
          Step {currentStep + 1} of {totalSteps}
        </span>
      </div>

      <div className="relative z-10 w-full max-w-2xl mx-4">
        <div className="progress-bar mb-8">
          <motion.div
            className="progress-fill"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>

        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentQuestion.id}
            custom={direction}
            variants={stepCardVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.4 }}
            className="glass-card p-8 md:p-10"
          >
            <div className="label-mono mb-4">{currentQuestion.category}</div>
            <h2 className="font-heading text-xl md:text-2xl text-foreground mb-3">
              {currentQuestion.question}
            </h2>
            <p className="text-secondary-custom mb-8">
              {currentQuestion.helper}
            </p>

            <div className="space-y-3" role="radiogroup" aria-label={currentQuestion.question}>
              {currentQuestion.options.map((option, index) => (
                <motion.button
                  key={`${currentQuestion.id}-${option.title}`}
                  ref={(node) => {
                    setOptionRef(index, node);
                  }}
                  type="button"
                  role="radio"
                  aria-checked={
                    option.value ? selectedValue === option.value : hasAnsweredCurrent && !selectedValue
                  }
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.06 }}
                  whileHover={{ scale: isTransitioning ? 1 : 1.01 }}
                  whileTap={{ scale: isTransitioning ? 1 : 0.99 }}
                  onClick={() => handleSelect(option.value)}
                  disabled={isTransitioning}
                  className={`option-card w-full text-left flex items-start gap-4 transition-all ${
                    (option.value ? selectedValue === option.value : hasAnsweredCurrent && !selectedValue)
                      ? 'selected ring-2 ring-gold'
                      : ''
                  } ${isTransitioning ? 'opacity-70' : ''}`}
                >
                  <span className="text-2xl flex-shrink-0">{option.emoji}</span>
                  <span className="flex-1">
                    <span className="block text-foreground">{option.title}</span>
                    <span className="block mt-1 text-sm text-secondary-custom">{option.description}</span>
                  </span>
                </motion.button>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  );
}
