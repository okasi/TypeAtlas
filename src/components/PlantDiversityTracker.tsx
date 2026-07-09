import { useEffect, useMemo, useState } from 'react';
import { RotateCcw, Sprout } from 'lucide-react';

const STORAGE_KEY = 'typeatlas-plant-week';
const WEEKLY_TARGET = 30;

interface PlantGroup {
  label: string;
  emoji: string;
  plants: string[];
}

const plantGroups: PlantGroup[] = [
  {
    label: 'Vegetables',
    emoji: '🥦',
    plants: [
      'Broccoli', 'Spinach', 'Carrot', 'Tomato', 'Onion', 'Garlic', 'Bell pepper',
      'Zucchini', 'Kale', 'Cauliflower', 'Cucumber', 'Beetroot', 'Mushroom', 'Cabbage',
    ],
  },
  {
    label: 'Fruits',
    emoji: '🫐',
    plants: [
      'Blueberries', 'Banana', 'Apple', 'Orange', 'Strawberries', 'Grapes',
      'Avocado', 'Lemon', 'Mango', 'Kiwi', 'Raspberries', 'Pear',
    ],
  },
  {
    label: 'Whole grains',
    emoji: '🌾',
    plants: ['Oats', 'Brown rice', 'Quinoa', 'Whole-grain bread', 'Barley', 'Buckwheat', 'Corn'],
  },
  {
    label: 'Legumes',
    emoji: '🫘',
    plants: ['Chickpeas', 'Lentils', 'Black beans', 'Peas', 'Edamame', 'Kidney beans'],
  },
  {
    label: 'Nuts & seeds',
    emoji: '🥜',
    plants: ['Almonds', 'Walnuts', 'Chia seeds', 'Flaxseed', 'Pumpkin seeds', 'Peanuts', 'Sunflower seeds'],
  },
  {
    label: 'Herbs & spices',
    emoji: '🌿',
    plants: ['Basil', 'Coriander', 'Parsley', 'Ginger', 'Turmeric', 'Cinnamon', 'Cumin', 'Mint', 'Chili', 'Oregano'],
  },
];

function getWeekKey(date = new Date()): string {
  // ISO week number: Thursday of the current week determines the year/week
  const target = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const dayNumber = (target.getUTCDay() + 6) % 7;
  target.setUTCDate(target.getUTCDate() - dayNumber + 3);
  const firstThursday = new Date(Date.UTC(target.getUTCFullYear(), 0, 4));
  const firstDayNumber = (firstThursday.getUTCDay() + 6) % 7;
  firstThursday.setUTCDate(firstThursday.getUTCDate() - firstDayNumber + 3);
  const week = 1 + Math.round((target.getTime() - firstThursday.getTime()) / (7 * 24 * 3600 * 1000));
  return `${target.getUTCFullYear()}-W${String(week).padStart(2, '0')}`;
}

function loadSelection(weekKey: string): string[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);

    if (!raw) {
      return [];
    }

    const parsed = JSON.parse(raw);

    if (parsed?.weekKey !== weekKey || !Array.isArray(parsed.selected)) {
      return [];
    }

    return parsed.selected.filter((item: unknown): item is string => typeof item === 'string');
  } catch {
    return [];
  }
}

export function PlantDiversityTracker() {
  const weekKey = useMemo(() => getWeekKey(), []);
  const [selected, setSelected] = useState<string[]>(() => loadSelection(weekKey));

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ weekKey, selected }));
  }, [selected, weekKey]);

  const count = selected.length;
  const progress = Math.min((count / WEEKLY_TARGET) * 100, 100);
  const reachedTarget = count >= WEEKLY_TARGET;

  function togglePlant(plant: string) {
    setSelected((prev) =>
      prev.includes(plant) ? prev.filter((item) => item !== plant) : [...prev, plant],
    );
  }

  return (
    <div className="glass-card p-6 md:p-8 mb-10 print-hidden">
      <div className="flex items-start gap-4 mb-5">
        <div className="w-12 h-12 rounded-full bg-green-400/10 border border-green-400/20 flex items-center justify-center flex-none">
          <Sprout className="w-5 h-5 text-green-300" />
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="font-heading text-xl text-foreground mb-2">Your 30-Plant Week</h3>
          <p className="text-secondary-custom text-sm leading-relaxed">
            The plant-diversity insight above, made practical: tick every distinct plant you eat this
            week — herbs and spices count. The list resets each Monday. It lives only in your browser.
          </p>
        </div>
      </div>

      <div className="flex items-center gap-4 mb-6">
        <div
          className="flex-1 h-2 rounded-full bg-white/[0.06] overflow-hidden"
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={WEEKLY_TARGET}
          aria-valuenow={count}
          aria-label="Distinct plants eaten this week"
        >
          <div
            className={`h-full rounded-full transition-all duration-500 ${reachedTarget ? 'bg-emerald-400/80' : 'bg-gold/70'}`}
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="font-mono text-sm text-foreground whitespace-nowrap">
          {count} / {WEEKLY_TARGET}
          {reachedTarget && <span className="ml-2 text-emerald-300">🎉</span>}
        </div>
      </div>

      <div className="space-y-5">
        {plantGroups.map((group) => (
          <div key={group.label}>
            <div className="label-mono mb-2.5">
              <span className="mr-1.5">{group.emoji}</span>
              {group.label}
            </div>
            <div className="flex flex-wrap gap-2">
              {group.plants.map((plant) => {
                const isSelected = selected.includes(plant);

                return (
                  <button
                    key={plant}
                    type="button"
                    aria-pressed={isSelected}
                    onClick={() => togglePlant(plant)}
                    className={`rounded-full border px-3 py-1.5 text-xs transition-colors ${
                      isSelected
                        ? 'border-emerald-400/40 bg-emerald-400/15 text-emerald-100'
                        : 'border-white/10 bg-white/[0.03] text-secondary-custom hover:border-gold/30 hover:text-foreground'
                    }`}
                  >
                    {plant}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between gap-3 mt-6">
        <p className="text-xs text-secondary-custom/70 leading-relaxed">
          Week {weekKey.split('-W')[1]} · Ate something not listed? It still counts toward your real
          total — this list is just a prompt.
        </p>
        {count > 0 && (
          <button
            type="button"
            onClick={() => setSelected([])}
            className="flex items-center gap-1.5 text-xs text-secondary-custom hover:text-gold transition-colors whitespace-nowrap"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset week
          </button>
        )}
      </div>
    </div>
  );
}
