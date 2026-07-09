import { useEffect, useMemo, useState } from 'react';
import {
  BedDouble,
  Brain,
  Clock,
  Coffee,
  Footprints,
  Moon,
  Sunrise,
  Utensils,
  UtensilsCrossed,
} from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import { chronotypeLabels } from '@/data';
import type { ChronotypeType } from '@/types';
import type { LucideIcon } from 'lucide-react';

const STORAGE_KEY = 'typeatlas-day-plan';
const AWAKE_MINUTES = 16 * 60; // 8h sleep target
const WAKE_MIN = 4 * 60 + 30;
const WAKE_MAX = 11 * 60;

interface ChronoParams {
  defaultWake: number; // minutes from midnight
  focusStart: number; // minutes after wake
  focusEnd: number;
  largestMeal: number; // minutes after wake
  caffeineCutoffHours: number; // hours before bed
  headline: string;
  focusNote: string;
  mealNote: string;
}

const defaultParams: ChronoParams = {
  defaultWake: 7 * 60,
  focusStart: 180,
  focusEnd: 360,
  largestMeal: 330,
  caffeineCutoffHours: 8,
  headline:
    'You skipped the chronotype question, so this uses a general template. Answering it tunes the whole plan.',
  focusNote: 'Most people focus best in the late morning; protect it for the hardest work.',
  mealNote: 'Earlier main meals track with better weight and glucose outcomes on identical diets.',
};

const chronoParams: Record<ChronotypeType, ChronoParams> = {
  lion: {
    defaultWake: 5 * 60 + 30,
    focusStart: 90,
    focusEnd: 300,
    largestMeal: 300,
    caffeineCutoffHours: 8,
    headline: 'Tuned for a Lion: your biology front-loads the day, so this plan leans into it.',
    focusNote: 'Your sharpest hours come early — spend them on the hardest work, not email.',
    mealNote: 'Make lunch the big meal; your early clock makes front-loaded eating easy.',
  },
  bear: {
    defaultWake: 7 * 60,
    focusStart: 180,
    focusEnd: 360,
    largestMeal: 330,
    caffeineCutoffHours: 8,
    headline: 'Tuned for a Bear: a conventional schedule fits you — the wins are regularity and daylight.',
    focusNote: 'Late morning is your steadiest window; guard it from meetings when you can.',
    mealNote: 'A real lunch (not a desk snack) is the anchor of a Bear day.',
  },
  wolf: {
    defaultWake: 8 * 60 + 30,
    focusStart: 480,
    focusEnd: 720,
    largestMeal: 360,
    caffeineCutoffHours: 8,
    headline: 'Tuned for a Wolf: everything shifts later — but the kitchen still closes well before bed.',
    focusNote: 'Your peak arrives in the late afternoon and evening; schedule deep work there guilt-free.',
    mealNote: 'Late types drift into late-night eating; keeping the main meal at midday is your best counterweight.',
  },
  dolphin: {
    defaultWake: 7 * 60,
    focusStart: 180,
    focusEnd: 330,
    largestMeal: 330,
    caffeineCutoffHours: 9,
    headline:
      'Tuned for a Dolphin: for light sleepers, the fixed wake time and early caffeine cutoff matter most.',
    focusNote: 'Energy can be uneven — aim your important work at mid-morning and keep the slot consistent.',
    mealNote: 'Regular, unhurried meals help stabilize a system that runs a little wired.',
  },
};

interface ScheduleItem {
  icon: LucideIcon;
  label: string;
  start: number; // minutes after wake
  end?: number;
  detail: string;
}

function formatClock(minutesFromMidnight: number): string {
  const normalized = ((minutesFromMidnight % 1440) + 1440) % 1440;
  const date = new Date();
  date.setHours(Math.floor(normalized / 60), normalized % 60, 0, 0);
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

function loadWakeTime(fallback: number): number {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);

    if (!raw) {
      return fallback;
    }

    const parsed = JSON.parse(raw);

    if (
      typeof parsed?.wakeMinutes === 'number' &&
      parsed.wakeMinutes >= WAKE_MIN &&
      parsed.wakeMinutes <= WAKE_MAX
    ) {
      return parsed.wakeMinutes;
    }

    return fallback;
  } catch {
    return fallback;
  }
}

function useNowMinutes(): number {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const timer = window.setInterval(() => setNow(new Date()), 60_000);
    return () => window.clearInterval(timer);
  }, []);

  return now.getHours() * 60 + now.getMinutes();
}

interface CircadianPlannerProps {
  chronotype?: ChronotypeType;
}

export function CircadianPlanner({ chronotype }: CircadianPlannerProps) {
  const params = chronotype ? chronoParams[chronotype] : defaultParams;
  const [wake, setWake] = useState<number>(() => loadWakeTime(params.defaultWake));
  const nowMinutes = useNowMinutes();

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ wakeMinutes: wake }));
  }, [wake]);

  const bed = wake + AWAKE_MINUTES;
  const caffeineCutoff = AWAKE_MINUTES - params.caffeineCutoffHours * 60;
  const eatingStart = 60;
  const kitchenClosed = AWAKE_MINUTES - 150;
  const dinner = AWAKE_MINUTES - 210;
  const minutesSinceWake = (((nowMinutes - wake) % 1440) + 1440) % 1440;
  const nowPosition = minutesSinceWake <= AWAKE_MINUTES ? minutesSinceWake / AWAKE_MINUTES : null;

  const schedule = useMemo<ScheduleItem[]>(
    () => [
      {
        icon: Sunrise,
        label: 'Wake + daylight',
        start: 0,
        detail: 'Get bright light within the first hour — it anchors every other time below.',
      },
      {
        icon: Utensils,
        label: 'Breakfast',
        start: eatingStart,
        detail: 'A protein source here starts the day-long 25-30 g per meal rhythm.',
      },
      {
        icon: Brain,
        label: 'Focus peak',
        start: params.focusStart,
        end: params.focusEnd,
        detail: params.focusNote,
      },
      {
        icon: Utensils,
        label: 'Largest meal',
        start: params.largestMeal,
        detail: params.mealNote,
      },
      {
        icon: Footprints,
        label: '10-15 min walk',
        start: params.largestMeal + 30,
        detail: 'Light movement right after the biggest meal measurably flattens the glucose curve.',
      },
      {
        icon: Coffee,
        label: 'Last caffeine',
        start: caffeineCutoff,
        detail: `Caffeine within ${params.caffeineCutoffHours} hours of bed disrupts sleep even when you don't feel it.`,
      },
      {
        icon: UtensilsCrossed,
        label: 'Dinner, then kitchen closes',
        start: dinner,
        end: kitchenClosed,
        detail: 'Finishing food 2-3 hours before bed avoids the late-eating metabolic penalty.',
      },
      {
        icon: Moon,
        label: 'Wind down',
        start: AWAKE_MINUTES - 60,
        detail: 'Dim light and screens; the goal is a downhill glide, not a hard stop.',
      },
      {
        icon: BedDouble,
        label: 'Lights out',
        start: AWAKE_MINUTES,
        detail: 'Sixteen hours after waking, on an 8-hour sleep budget.',
      },
    ],
    [caffeineCutoff, dinner, eatingStart, kitchenClosed, params],
  );

  const windows = [
    {
      label: 'Eating window',
      start: eatingStart,
      end: kitchenClosed,
      barClass: 'bg-gold/50',
    },
    {
      label: 'Caffeine OK',
      start: 0,
      end: caffeineCutoff,
      barClass: 'bg-emerald-400/50',
    },
  ];

  return (
    <div className="glass-card p-6 md:p-8 mb-10 print-hidden">
      <div className="flex items-start gap-4 mb-5">
        <div className="w-12 h-12 rounded-full bg-sky-400/10 border border-sky-400/20 flex items-center justify-center flex-none">
          <Clock className="w-5 h-5 text-sky-300" />
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="font-heading text-xl text-foreground mb-2">
            Your Day, on Your Clock
            {chronotype && (
              <span className="ml-2 align-middle rounded-full border border-emerald-400/25 bg-emerald-400/10 px-2 py-0.5 text-[10px] font-mono uppercase tracking-[0.12em] text-emerald-200">
                {chronotypeLabels[chronotype].name} chronotype
              </span>
            )}
          </h3>
          <p className="text-secondary-custom text-sm leading-relaxed">{params.headline}</p>
        </div>
      </div>

      {/* Wake time control */}
      <div className="glass-card-light p-4 mb-6">
        <div className="flex items-center justify-between gap-3 mb-3">
          <label htmlFor="wake-slider" className="text-sm text-foreground">
            I usually wake around <span className="font-mono text-gold">{formatClock(wake)}</span>
          </label>
          {wake !== params.defaultWake && (
            <button
              type="button"
              onClick={() => setWake(params.defaultWake)}
              className="text-xs text-secondary-custom hover:text-gold transition-colors whitespace-nowrap"
            >
              Reset to {formatClock(params.defaultWake)}
            </button>
          )}
        </div>
        <Slider
          id="wake-slider"
          aria-label="Wake time"
          value={[wake]}
          onValueChange={([value]) => setWake(value)}
          min={WAKE_MIN}
          max={WAKE_MAX}
          step={15}
        />
        <div className="mt-1.5 flex justify-between text-[10px] font-mono text-secondary-custom/70">
          <span>{formatClock(WAKE_MIN)}</span>
          <span>{formatClock(WAKE_MAX)}</span>
        </div>
      </div>

      {/* Window bars */}
      <div
        className="mb-6"
        role="img"
        aria-label={`Eating window ${formatClock(wake + eatingStart)} to ${formatClock(wake + kitchenClosed)}; caffeine until ${formatClock(wake + caffeineCutoff)}`}
      >
        <div className="space-y-2.5">
          {windows.map((window) => (
            <div key={window.label} className="flex items-center gap-3">
              <span className="w-28 flex-none text-right text-[10px] font-mono uppercase tracking-wider text-secondary-custom">
                {window.label}
              </span>
              <div className="relative flex-1 h-2.5 rounded-full bg-white/[0.05]">
                <div
                  className={`absolute inset-y-0 rounded-full ${window.barClass}`}
                  style={{
                    left: `${(window.start / AWAKE_MINUTES) * 100}%`,
                    width: `${((window.end - window.start) / AWAKE_MINUTES) * 100}%`,
                  }}
                />
                {nowPosition !== null && (
                  <div
                    className="absolute -inset-y-1 w-0.5 bg-red-400/80 rounded-full"
                    style={{ left: `${nowPosition * 100}%` }}
                  />
                )}
              </div>
              <span className="w-12 flex-none text-[10px] font-mono text-secondary-custom">
                {formatClock(wake + window.end)}
              </span>
            </div>
          ))}
        </div>
        <div className="mt-2 flex justify-between pl-[7.75rem] pr-12 text-[10px] font-mono text-secondary-custom/70">
          <span>wake {formatClock(wake)}</span>
          <span className="flex items-center gap-3">
            {nowPosition !== null && (
              <span className="flex items-center gap-1 text-red-300/90">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-red-400/80" />
                now
              </span>
            )}
            bed {formatClock(bed)}
          </span>
        </div>
      </div>

      {/* Schedule list */}
      <ul className="grid gap-x-6 gap-y-3 md:grid-cols-2">
        {schedule.map((item) => {
          const Icon = item.icon;
          const isNow =
            nowPosition !== null &&
            minutesSinceWake >= item.start &&
            minutesSinceWake < (item.end ?? item.start + 60);

          return (
            <li
              key={item.label}
              className={`flex items-start gap-3 rounded-xl border p-3 transition-colors ${
                isNow ? 'border-gold/30 bg-gold/[0.06]' : 'border-white/[0.06] bg-white/[0.02]'
              }`}
            >
              <Icon className={`w-4 h-4 flex-none mt-0.5 ${isNow ? 'text-gold' : 'text-secondary-custom'}`} />
              <div className="min-w-0">
                <div className="flex flex-wrap items-baseline gap-x-2">
                  <span className="font-mono text-xs text-gold">
                    {formatClock(wake + item.start)}
                    {item.end !== undefined && ` – ${formatClock(wake + item.end)}`}
                  </span>
                  <span className="text-sm text-foreground">{item.label}</span>
                  {isNow && (
                    <span className="text-[10px] font-mono uppercase tracking-wider text-gold">now</span>
                  )}
                </div>
                <p className="text-xs text-secondary-custom mt-0.5 leading-relaxed">{item.detail}</p>
              </div>
            </li>
          );
        })}
      </ul>

      <p className="text-xs text-secondary-custom/70 mt-5 leading-relaxed">
        Built from the meal-timing, caffeine, and post-meal-walking research cited above, on an
        8-hour sleep budget. It is a starting template — shift it to fit real life, and keep the
        relative spacing rather than the exact clock times.
      </p>
    </div>
  );
}
