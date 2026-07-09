import { useEffect, useState } from 'react';
import { ArrowUpRight, Check, Lock, Target } from 'lucide-react';
import { getTierBadgeClass } from '@/components/EvidenceInsights';
import { evidenceTierLabels, generateEvidenceInsights } from '@/data';
import type { UserProfile } from '@/types';

const STORAGE_KEY = 'typeatlas-habit-experiment';
const EXPERIMENT_DAYS = 7;

interface ExperimentState {
  insightId: string;
  action: string;
  anchor: string;
  startDate: string; // yyyy-mm-dd, local time
  checkedDays: string[];
}

function toDateKey(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function parseDateKey(key: string): Date {
  const [year, month, day] = key.split('-').map(Number);
  return new Date(year, month - 1, day);
}

function addDays(key: string, days: number): string {
  const date = parseDateKey(key);
  date.setDate(date.getDate() + days);
  return toDateKey(date);
}

function loadExperiment(): ExperimentState | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);

    if (!raw) {
      return null;
    }

    const parsed = JSON.parse(raw);

    if (
      typeof parsed?.insightId !== 'string' ||
      typeof parsed?.action !== 'string' ||
      typeof parsed?.startDate !== 'string' ||
      !/^\d{4}-\d{2}-\d{2}$/.test(parsed.startDate) ||
      !Array.isArray(parsed.checkedDays)
    ) {
      return null;
    }

    return {
      insightId: parsed.insightId,
      action: parsed.action,
      anchor: typeof parsed.anchor === 'string' ? parsed.anchor : '',
      startDate: parsed.startDate,
      checkedDays: parsed.checkedDays.filter(
        (day: unknown): day is string => typeof day === 'string',
      ),
    };
  } catch {
    return null;
  }
}

function getCompletionSummary(doneCount: number): string {
  if (doneCount === EXPERIMENT_DAYS) {
    return 'A perfect run. That is a strong sign this action fits your life as-is — keep going and let it fade into routine.';
  }

  if (doneCount >= 4) {
    return 'That is a real signal: the action works on a normal week, misses and all. Repetition is what turns it into a habit, so run it again.';
  }

  return 'That is data too, not failure. An action that landed fewer than half the days usually needs a smaller version or a better anchor — shrink it, re-anchor it, and retry.';
}

interface HabitExperimentProps {
  userProfile: UserProfile;
}

export function HabitExperiment({ userProfile }: HabitExperimentProps) {
  const insights = generateEvidenceInsights(userProfile);
  const [experiment, setExperiment] = useState<ExperimentState | null>(loadExperiment);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [confirmingAbandon, setConfirmingAbandon] = useState(false);

  useEffect(() => {
    if (experiment) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(experiment));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, [experiment]);

  const todayKey = toDateKey(new Date());

  const startExperiment = (insightId: string) => {
    const insight = insights.find((candidate) => candidate.id === insightId);

    if (!insight) {
      return;
    }

    setExperiment({
      insightId,
      action: insight.action,
      anchor: '',
      startDate: todayKey,
      checkedDays: [],
    });
    setSelectedId(null);
    setConfirmingAbandon(false);
  };

  const abandonExperiment = () => {
    setExperiment(null);
    setConfirmingAbandon(false);
  };

  const toggleDay = (dayKey: string) => {
    if (dayKey > todayKey) {
      return;
    }

    setExperiment((prev) =>
      prev
        ? {
            ...prev,
            checkedDays: prev.checkedDays.includes(dayKey)
              ? prev.checkedDays.filter((day) => day !== dayKey)
              : [...prev.checkedDays, dayKey],
          }
        : prev,
    );
  };

  const dayKeys = experiment
    ? Array.from({ length: EXPERIMENT_DAYS }, (_, index) => addDays(experiment.startDate, index))
    : [];
  const endKey = experiment ? dayKeys[EXPERIMENT_DAYS - 1] : null;
  const isFinished = Boolean(experiment && endKey && todayKey > endKey);
  const doneCount = experiment
    ? experiment.checkedDays.filter((day) => dayKeys.includes(day)).length
    : 0;
  const dayNumber = experiment
    ? Math.min(dayKeys.filter((day) => day <= todayKey).length, EXPERIMENT_DAYS)
    : 0;

  return (
    <div className="glass-card p-6 md:p-8 mb-10 print-hidden">
      <div className="flex items-start gap-4 mb-5">
        <div className="w-12 h-12 rounded-full bg-violet-400/10 border border-violet-400/20 flex items-center justify-center flex-none">
          <Target className="w-5 h-5 text-violet-300" />
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="font-heading text-xl text-foreground mb-2">One-Week Habit Experiment</h3>
          <p className="text-secondary-custom text-sm leading-relaxed">
            Pick a single action from the insights above and run it for seven days — one variable,
            one week, like a proper experiment. A week will not make it automatic (habit formation
            averages around 66 days), but it will tell you whether the action fits your life.
          </p>
        </div>
      </div>

      {!experiment && (
        <>
          <div className="space-y-2.5" role="radiogroup" aria-label="Choose an action to test">
            {insights.map((insight) => {
              const isSelected = selectedId === insight.id;

              return (
                <button
                  key={insight.id}
                  type="button"
                  role="radio"
                  aria-checked={isSelected}
                  onClick={() => setSelectedId(insight.id)}
                  className={`w-full rounded-xl border p-3.5 text-left transition-colors ${
                    isSelected
                      ? 'border-violet-400/40 bg-violet-400/10'
                      : 'border-white/[0.06] bg-white/[0.02] hover:border-white/20'
                  }`}
                >
                  <span
                    className={`mb-1.5 inline-block rounded-full border px-2 py-0.5 text-[10px] uppercase tracking-[0.12em] ${getTierBadgeClass(insight.tier)}`}
                  >
                    {evidenceTierLabels[insight.tier]}
                  </span>
                  <p className="text-sm text-foreground/90 leading-relaxed">{insight.action}</p>
                </button>
              );
            })}
          </div>

          <button
            type="button"
            disabled={!selectedId}
            onClick={() => selectedId && startExperiment(selectedId)}
            className="mt-5 w-full rounded-xl border border-violet-400/30 bg-violet-400/15 px-6 py-3.5 text-sm font-mono uppercase tracking-wider text-violet-100 transition-colors hover:bg-violet-400/25 disabled:cursor-not-allowed disabled:opacity-40"
          >
            {selectedId ? 'Start the 7-day experiment' : 'Select an action to begin'}
          </button>
        </>
      )}

      {experiment && !isFinished && (
        <>
          <div className="rounded-xl border border-violet-400/25 bg-violet-400/[0.08] p-4 mb-4">
            <div className="label-mono mb-1.5">Testing · Day {dayNumber} of {EXPERIMENT_DAYS}</div>
            <p className="text-sm text-foreground leading-relaxed">{experiment.action}</p>
          </div>

          <label className="block mb-5">
            <span className="text-xs text-secondary-custom">
              Anchor it (optional): the if-then form roughly doubles follow-through.
            </span>
            <input
              type="text"
              value={experiment.anchor}
              onChange={(event) => {
                const anchor = event.target.value;
                setExperiment((prev) => (prev ? { ...prev, anchor } : prev));
              }}
              placeholder='e.g. "After I pour my morning coffee, then I will…"'
              className="mt-1.5 w-full rounded-xl border border-white/10 bg-white/[0.03] px-3.5 py-2.5 text-sm text-foreground placeholder:text-secondary-custom/50 focus:border-violet-400/40 focus:outline-none"
            />
          </label>

          <div className="flex flex-wrap justify-between gap-2 mb-4">
            {dayKeys.map((dayKey) => {
              const date = parseDateKey(dayKey);
              const isChecked = experiment.checkedDays.includes(dayKey);
              const isFuture = dayKey > todayKey;
              const isToday = dayKey === todayKey;

              return (
                <button
                  key={dayKey}
                  type="button"
                  disabled={isFuture}
                  aria-pressed={isChecked}
                  aria-label={`${date.toLocaleDateString([], { weekday: 'long', month: 'long', day: 'numeric' })}${isChecked ? ', done' : ''}`}
                  onClick={() => toggleDay(dayKey)}
                  className={`flex h-16 w-12 flex-col items-center justify-center gap-1 rounded-xl border transition-colors ${
                    isChecked
                      ? 'border-emerald-400/40 bg-emerald-400/15 text-emerald-100'
                      : isFuture
                        ? 'border-white/[0.05] bg-white/[0.01] text-secondary-custom/40'
                        : 'border-white/10 bg-white/[0.03] text-secondary-custom hover:border-emerald-400/30'
                  } ${isToday ? 'ring-1 ring-gold/50' : ''}`}
                >
                  <span className="text-[9px] font-mono uppercase tracking-wider">
                    {date.toLocaleDateString([], { weekday: 'short' })}
                  </span>
                  {isChecked ? (
                    <Check className="w-4 h-4" />
                  ) : isFuture ? (
                    <Lock className="w-3 h-3" />
                  ) : (
                    <span className="text-sm">{date.getDate()}</span>
                  )}
                </button>
              );
            })}
          </div>

          <div className="flex items-center justify-between gap-3">
            <p className="text-xs text-secondary-custom">
              {doneCount} of {EXPERIMENT_DAYS} days done · tap today once the action happened
            </p>
            {confirmingAbandon ? (
              <span className="flex items-center gap-3 text-xs whitespace-nowrap">
                <button
                  type="button"
                  onClick={abandonExperiment}
                  className="text-red-300 hover:text-red-200 transition-colors"
                >
                  Yes, clear it
                </button>
                <button
                  type="button"
                  onClick={() => setConfirmingAbandon(false)}
                  className="text-secondary-custom hover:text-foreground transition-colors"
                >
                  Keep going
                </button>
              </span>
            ) : (
              <button
                type="button"
                onClick={() => setConfirmingAbandon(true)}
                className="text-xs text-secondary-custom/70 hover:text-red-300 transition-colors whitespace-nowrap"
              >
                Abandon experiment
              </button>
            )}
          </div>
        </>
      )}

      {experiment && isFinished && (
        <>
          <div className="rounded-xl border border-emerald-400/25 bg-emerald-400/[0.07] p-5 mb-5 text-center">
            <div className="font-heading text-3xl text-foreground mb-1">
              {doneCount} / {EXPERIMENT_DAYS} days
            </div>
            <p className="text-sm text-secondary-custom leading-relaxed max-w-md mx-auto mb-2">
              &ldquo;{experiment.action}&rdquo;
            </p>
            <p className="text-sm text-foreground/90 leading-relaxed max-w-md mx-auto">
              {getCompletionSummary(doneCount)}
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <button
              type="button"
              onClick={() => startExperiment(experiment.insightId)}
              className="rounded-xl border border-emerald-400/30 bg-emerald-400/10 px-6 py-3 text-sm font-mono uppercase tracking-wider text-emerald-100 transition-colors hover:bg-emerald-400/20"
            >
              Run it again
            </button>
            <button
              type="button"
              onClick={abandonExperiment}
              className="rounded-xl border border-white/10 bg-white/[0.03] px-6 py-3 text-sm font-mono uppercase tracking-wider text-secondary-custom transition-colors hover:border-violet-400/30 hover:text-foreground"
            >
              Choose a different action
            </button>
          </div>
        </>
      )}

      <p className="text-xs text-secondary-custom/70 mt-5 leading-relaxed">
        The one-variable framing comes from implementation-intentions research (Gollwitzer &amp;
        Sheeran 2006); the ~66-day habit timeline is from{' '}
        <a
          href="https://doi.org/10.1002/ejsp.674"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-0.5 underline decoration-white/20 underline-offset-2 hover:text-gold transition-colors"
        >
          Lally et al. (2010)
          <ArrowUpRight className="w-3 h-3" />
        </a>
        . Progress is saved only in this browser.
      </p>
    </div>
  );
}
