import type { ChronotypeType, DoshaType, UserProfile } from '@/types';

export type EvidenceTier = 'strong' | 'emerging' | 'self-report';

export interface EvidenceInsight {
  id: string;
  tier: EvidenceTier;
  title: string;
  body: string;
  action: string;
  source: {
    label: string;
    url: string;
  };
}

export const evidenceTierLabels: Record<EvidenceTier, string> = {
  strong: 'Established science',
  emerging: 'Emerging evidence',
  'self-report': 'From your answers',
};

export const evidenceInsightsDisclaimer =
  'These insights summarize peer-reviewed research in plain language. They are general education, not medical advice; individual needs vary, especially with health conditions.';

export function getAgeFromBirthDate(birthDate: string, now = new Date()): number {
  const birth = new Date(birthDate);
  let age = now.getFullYear() - birth.getFullYear();
  const hadBirthdayThisYear =
    now.getMonth() > birth.getMonth() ||
    (now.getMonth() === birth.getMonth() && now.getDate() >= birth.getDate());

  if (!hadBirthdayThisYear) {
    age -= 1;
  }

  return Math.max(age, 0);
}

function buildAgeInsight(profile: UserProfile): EvidenceInsight {
  const age = getAgeFromBirthDate(profile.birthDate);

  if (age < 30) {
    return {
      id: 'age',
      tier: 'strong',
      title: `At ${age}, you are still building peak bone mass`,
      body:
        'Your birth date cannot predict personality, but it does tell us your age, and that matters. Bone density peaks by around age 30, and the calcium, vitamin D, and load-bearing exercise you get now set your skeletal reserve for the rest of your life.',
      action:
        'Prioritize calcium-rich foods (dairy, fortified alternatives, leafy greens), get vitamin D checked if you live at a high latitude, and do some resistance or impact exercise most weeks.',
      source: {
        label: 'NIH: bone health and osteoporosis',
        url: 'https://www.niams.nih.gov/health-topics/osteoporosis',
      },
    };
  }

  if (age < 50) {
    return {
      id: 'age',
      tier: 'strong',
      title: `At ${age}, muscle maintenance quietly becomes a nutrition goal`,
      body:
        'Adults lose roughly 3-8% of muscle mass per decade after age 30, mostly without noticing. The countermeasure is well established: adequate protein spread across the day (about 25-30 g per meal works better than one large dose) plus regular resistance training.',
      action:
        'Aim for a palm-sized protein source at each meal rather than back-loading protein at dinner, and treat two strength sessions a week as part of your diet plan.',
      source: {
        label: 'Volpi et al. (2004): muscle tissue changes with aging',
        url: 'https://doi.org/10.1097/01.mco.0000134362.76653.b2',
      },
    };
  }

  if (age < 65) {
    return {
      id: 'age',
      tier: 'strong',
      title: `At ${age}, your protein and B12 needs are drifting upward`,
      body:
        'Research groups studying aging recommend 1.0-1.2 g of protein per kg of body weight for adults over 50 — noticeably above the standard 0.8 g/kg RDA. Stomach acid production also declines with age, which can reduce vitamin B12 absorption from food.',
      action:
        'Distribute protein across all meals (about 25-30 g each), and mention B12 at your next routine bloodwork, especially if you eat little meat.',
      source: {
        label: 'Bauer et al. (2013): PROT-AGE protein recommendations',
        url: 'https://doi.org/10.1016/j.jamda.2013.05.021',
      },
    };
  }

  return {
    id: 'age',
    tier: 'strong',
    title: `At ${age}, protein and strength work protect independence`,
    body:
      'Past 65, sarcopenia (age-related muscle loss) accelerates and becomes the strongest nutrition-related predictor of staying independent. Expert consensus recommends 1.0-1.2 g of protein per kg of body weight daily, adequate vitamin D, and resistance exercise — the combination outperforms any of the three alone.',
    action:
      'Anchor every meal around a protein source, ask your doctor about vitamin D status, and treat strength training as non-negotiable maintenance rather than optional fitness.',
    source: {
      label: 'Bauer et al. (2013): PROT-AGE protein recommendations',
      url: 'https://doi.org/10.1016/j.jamda.2013.05.021',
    },
  };
}

const doshaSelfReportInsights: Record<DoshaType, EvidenceInsight> = {
  vata: {
    id: 'dosha-self-report',
    tier: 'self-report',
    title: 'You described an irregular appetite — regularity is the evidence-based fix',
    body:
      'Set the Ayurvedic framing aside for a moment: your dosha answers are real self-reports, and yours described irregular appetite and lighter, more easily disrupted energy. Controlled studies link irregular meal timing to worse appetite regulation and cardiometabolic markers, independent of what is eaten.',
    action:
      'Pick fixed meal windows (even approximate ones) and defend them for two weeks. Consistency of timing is the intervention — the menu matters less than the rhythm.',
    source: {
      label: 'Pot et al. (2016): meal irregularity and cardiometabolic consequences',
      url: 'https://doi.org/10.1017/S0029665116000239',
    },
  },
  pitta: {
    id: 'dosha-self-report',
    tier: 'self-report',
    title: 'You described strong hunger and irritability when meals slip — that is real',
    body:
      'Your dosha answers described a strong appetite and a short fuse when food is late. "Hanger" has actual lab support: lower blood glucose measurably increases irritability and aggression between partners in controlled studies. The fix is not more willpower; it is not letting glucose crash in the first place.',
    action:
      'Do not schedule demanding work or difficult conversations across a delayed lunch. Front-load protein and fiber at midday so the afternoon dip is shallower.',
    source: {
      label: 'Bushman et al. (2014): low glucose and aggression, PNAS',
      url: 'https://doi.org/10.1073/pnas.1400619111',
    },
  },
  kapha: {
    id: 'dosha-self-report',
    tier: 'self-report',
    title: 'You described post-meal heaviness — short walks measurably counter it',
    body:
      'Your dosha answers described steady energy but noticeable heaviness after meals. The best-supported countermeasure is almost comically simple: light walking after eating. In controlled trials, three 15-minute post-meal walks controlled blood sugar better than one continuous 45-minute walk.',
    action:
      'Attach a 10-15 minute walk to your largest meal of the day. Treat it as part of the meal, not as separate exercise.',
    source: {
      label: 'DiPietro et al. (2013): post-meal walking and glycemic control',
      url: 'https://doi.org/10.2337/dc13-0084',
    },
  },
};

const chronotypeInsights: Record<ChronotypeType, EvidenceInsight> = {
  lion: {
    id: 'timing',
    tier: 'strong',
    title: 'Early chronotype: your biology already favors front-loaded eating',
    body:
      'Chronotype is one of the genuinely research-backed inputs here. Studies of meal timing found that people who ate their main meal earlier lost significantly more weight than late eaters on identical diets. As an early type, eating your largest meals before evening is the path of least resistance for you.',
    action:
      'Keep your biggest meal at breakfast or lunch, and let dinner stay light. Protect your early sleep window from late caffeine and heavy evening meals.',
    source: {
      label: 'Garaulet et al. (2013): food timing and weight loss',
      url: 'https://doi.org/10.1038/ijo.2012.229',
    },
  },
  bear: {
    id: 'timing',
    tier: 'strong',
    title: 'Standard chronotype: daylight and meal regularity are your levers',
    body:
      'You reported running well on a conventional schedule, which is the easiest chronotype to feed. The evidence that matters for you is about meal timing: earlier, regular main meals track with better weight and glucose outcomes, and daylight exposure keeps that rhythm anchored.',
    action:
      'Eat lunch as a real meal rather than a snack at your desk, get outside light before noon, and keep weekend meal times within an hour or two of weekday ones.',
    source: {
      label: 'Garaulet et al. (2013): food timing and weight loss',
      url: 'https://doi.org/10.1038/ijo.2012.229',
    },
  },
  wolf: {
    id: 'timing',
    tier: 'strong',
    title: 'Late chronotype: late-night eating is your main metabolic risk',
    body:
      'Evening types reliably eat later, and late eating is associated with poorer weight and glucose outcomes even when calories are identical. You do not need to become a morning person — the leverage is in when eating stops, and in morning light, which gently pulls your body clock earlier.',
    action:
      'Set a personal kitchen-closed time 2-3 hours before bed, and get bright light within an hour of waking. Both nudge a late clock without fighting it.',
    source: {
      label: 'Garaulet et al. (2013): food timing and weight loss',
      url: 'https://doi.org/10.1038/ijo.2012.229',
    },
  },
  dolphin: {
    id: 'timing',
    tier: 'strong',
    title: 'Light sleeper: your caffeine cutoff matters more than your menu',
    body:
      'You reported light, easily disrupted sleep. The clearest food-related lever for that is caffeine timing: in a controlled trial, caffeine taken even six hours before bed measurably degraded sleep — and participants did not notice the disruption themselves.',
    action:
      'Move your last caffeine to at least 8 hours before bedtime for two weeks and judge by how you feel in the morning, not at night. Keep a consistent wake time even after bad nights.',
    source: {
      label: 'Drake et al. (2013): caffeine 6 hours before bed disrupts sleep',
      url: 'https://doi.org/10.5664/jcsm.3170',
    },
  },
};

const mealRegularityFallbackInsight: EvidenceInsight = {
  id: 'timing',
  tier: 'strong',
  title: 'Meal timing is a real lever, whatever your chronotype',
  body:
    'You skipped the chronotype question, so here is the timing finding that holds regardless: people who eat their main meal earlier in the day show better weight and glucose outcomes than late eaters on identical diets, and irregular meal timing tracks with worse metabolic markers.',
  action:
    'Shift more of your calories toward the first two-thirds of your day, and keep meal times roughly consistent across the week — including weekends.',
  source: {
    label: 'Garaulet et al. (2013): food timing and weight loss',
    url: 'https://doi.org/10.1038/ijo.2012.229',
  },
};

const fiberInsight: EvidenceInsight = {
  id: 'fiber',
  tier: 'strong',
  title: 'The single highest-value change for most people: close the fiber gap',
  body:
    'Most adults eat roughly 15 g of fiber a day against a recommended 25-38 g — one of the largest, best-documented gaps in modern diets. Higher fiber intake is consistently associated with lower risk of heart disease, type 2 diabetes, and colorectal cancer, with a dose-response relationship.',
  action:
    'Add one fiber source per meal (beans, oats, berries, whole grains, vegetables) instead of overhauling everything. Increase gradually and drink water with it.',
  source: {
    label: 'Quagliani & Felt-Gunderson (2017): closing the fiber gap',
    url: 'https://doi.org/10.1177/1559827615588079',
  },
};

const plantDiversityInsight: EvidenceInsight = {
  id: 'plant-diversity',
  tier: 'emerging',
  title: 'Variety count beats perfection: aim for ~30 different plants a week',
  body:
    'In the American Gut Project — one of the largest microbiome datasets collected — people who ate more than 30 different plant types per week had markedly more diverse gut microbiomes than people who ate 10 or fewer, regardless of whether they were vegetarian. Diversity of plants mattered more than any single "superfood".',
  action:
    'Count plant types, not calories, for one week: every distinct vegetable, fruit, grain, legume, nut, seed, herb, and spice scores one point. Herbs and spices count, which makes 30 easier than it sounds.',
  source: {
    label: 'McDonald et al. (2018): American Gut Project, mSystems',
    url: 'https://doi.org/10.1128/mSystems.00031-18',
  },
};

const hydrationInsight: EvidenceInsight = {
  id: 'hydration',
  tier: 'strong',
  title: 'Hydration is simpler than the wellness industry suggests',
  body:
    'The European Food Safety Authority puts adequate total water intake at about 2.0 L/day for women and 2.5 L/day for men — and that includes the water in food, which typically covers 20-30% of it. There is no evidence that most healthy people need to force extra water beyond thirst.',
  action:
    'Use pale-yellow urine as your practical gauge, and add extra fluids mainly around exercise, heat, and alcohol. No special temperature, infusion, or schedule required.',
  source: {
    label: 'EFSA (2010): dietary reference values for water',
    url: 'https://doi.org/10.2903/j.efsa.2010.1459',
  },
};

function buildHabitDesignInsight(profile: UserProfile): EvidenceInsight {
  const prefersStructure = profile.mbti[3] === 'J';
  const isExtraverted = profile.mbti[0] === 'E';

  const structureBody = prefersStructure
    ? 'You told us you prefer structure and planning. That preference maps directly onto the best-supported behavior-change tool in psychology: implementation intentions — concrete "if situation X, then I do Y" plans. Across dozens of studies they show a medium-to-large effect on actually following through on health goals.'
    : 'You told us you prefer flexibility over rigid plans. For you, the evidence points away from strict meal plans (which flexible types abandon) and toward environment design: making the good choice the easy, visible default so no in-the-moment decision is needed.';

  const structureAction = prefersStructure
    ? 'Write two or three if-then rules ("If it is Sunday afternoon, then I prep lunches"; "If I order delivery, then I add a vegetable side") instead of a full meal plan.'
    : 'Change defaults, not rules: fruit visible on the counter, a prepped protein in the fridge, the snack shelf out of eye line. Let the environment decide for you.';

  const socialNote = isExtraverted
    ? ' One more finding worth knowing as a social eater: meals eaten with others are substantially larger than meals eaten alone, so let company drive enjoyment while you keep an eye on the portion drift it causes.'
    : ' As someone who recharges alone, use that: eating without screens or company is the easiest setting in which to actually notice fullness cues.';

  return {
    id: 'habit-design',
    tier: 'self-report',
    title: prefersStructure
      ? 'Your planning preference is a real asset — use if-then rules'
      : 'Your flexibility preference is fine — design the environment instead',
    body: structureBody + socialNote,
    action: structureAction,
    source: {
      label: 'Gollwitzer & Sheeran (2006): implementation intentions meta-analysis',
      url: 'https://doi.org/10.1016/S0065-2601(06)38002-1',
    },
  };
}

export function generateEvidenceInsights(profile: UserProfile): EvidenceInsight[] {
  const timingInsight = profile.chronotype
    ? chronotypeInsights[profile.chronotype]
    : mealRegularityFallbackInsight;

  return [
    buildAgeInsight(profile),
    timingInsight,
    doshaSelfReportInsights[profile.dominantDosha],
    fiberInsight,
    plantDiversityInsight,
    buildHabitDesignInsight(profile),
    hydrationInsight,
  ];
}
