import { ArrowUpRight, ClipboardList, FlaskConical, Lightbulb } from 'lucide-react';
import { toast } from 'sonner';
import {
  evidenceInsightsDisclaimer,
  evidenceTierLabels,
  generateEvidenceInsights,
} from '@/data';
import type { EvidenceInsight, EvidenceTier } from '@/data';
import type { UserProfile } from '@/types';

interface EvidenceInsightsProps {
  userProfile: UserProfile;
}

export function getTierBadgeClass(tier: EvidenceTier) {
  switch (tier) {
    case 'strong':
      return 'border-emerald-400/25 bg-emerald-400/10 text-emerald-200';
    case 'emerging':
      return 'border-sky-400/25 bg-sky-400/10 text-sky-200';
    default:
      return 'border-violet-400/25 bg-violet-400/10 text-violet-200';
  }
}

function buildChecklistText(userProfile: UserProfile, insights: EvidenceInsight[]): string {
  const lines = insights.map(
    (insight) => `[ ] ${insight.action}\n    Source: ${insight.source.label} — ${insight.source.url}`,
  );

  return [
    `Evidence-based actions for ${userProfile.name} (via TypeAtlas)`,
    '',
    ...lines,
    '',
    evidenceInsightsDisclaimer,
  ].join('\n');
}

export function EvidenceInsights({ userProfile }: EvidenceInsightsProps) {
  const insights = generateEvidenceInsights(userProfile);

  const handleCopyChecklist = async () => {
    const text = buildChecklistText(userProfile, insights);
    let copied = false;

    if (navigator.clipboard?.writeText) {
      copied = await navigator.clipboard.writeText(text).then(
        () => true,
        () => false,
      );
    }

    if (!copied) {
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.setAttribute('readonly', '');
      textArea.style.position = 'fixed';
      textArea.style.opacity = '0';
      document.body.appendChild(textArea);
      textArea.select();
      copied = document.execCommand('copy');
      document.body.removeChild(textArea);
    }

    if (copied) {
      toast.success('Action checklist copied — paste it into your notes app.');
    } else {
      toast.error('Could not copy. Your browser may be blocking clipboard access.');
    }
  };

  return (
    <div className="glass-card p-6 md:p-8 mb-10">
      <div className="flex items-start gap-4 mb-6">
        <div className="w-12 h-12 rounded-full bg-emerald-400/10 border border-emerald-400/20 flex items-center justify-center flex-none">
          <FlaskConical className="w-5 h-5 text-emerald-300" />
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="font-heading text-xl text-foreground mb-2">What the Science Actually Supports</h3>
          <p className="text-secondary-custom text-sm leading-relaxed mb-3">
            Most of TypeAtlas is symbolic play, and we label it that way. This section is different:
            each insight below comes from peer-reviewed research, applied to the two things your inputs
            genuinely tell us — your age and your own self-reported habits.
          </p>
          <button
            type="button"
            onClick={handleCopyChecklist}
            className="print-hidden inline-flex items-center gap-2 rounded-full border border-emerald-400/25 bg-emerald-400/10 px-3.5 py-1.5 text-xs font-mono uppercase tracking-wider text-emerald-200 hover:bg-emerald-400/20 transition-colors"
          >
            <ClipboardList className="w-3.5 h-3.5" />
            Copy action checklist
          </button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {insights.map((insight) => (
          <div key={insight.id} className="glass-card-light p-5 flex flex-col">
            <span
              className={`self-start rounded-full border px-2.5 py-1 text-[11px] uppercase tracking-[0.14em] mb-3 ${getTierBadgeClass(insight.tier)}`}
            >
              {evidenceTierLabels[insight.tier]}
            </span>

            <h4 className="font-heading text-base text-foreground mb-2 leading-snug">
              {insight.title}
            </h4>

            <p className="text-sm text-secondary-custom leading-relaxed mb-4">
              {insight.body}
            </p>

            <div className="mt-auto space-y-3">
              <div className="flex items-start gap-2.5 rounded-xl border border-gold/15 bg-gold/[0.06] p-3">
                <Lightbulb className="w-4 h-4 text-gold flex-none mt-0.5" />
                <p className="text-sm text-foreground/90 leading-relaxed">{insight.action}</p>
              </div>

              <a
                href={insight.source.url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-secondary-custom hover:text-gold transition-colors"
              >
                <span>{insight.source.label}</span>
                <ArrowUpRight className="w-3.5 h-3.5 flex-none" />
              </a>
            </div>
          </div>
        ))}
      </div>

      <p className="text-xs text-secondary-custom/70 mt-5 leading-relaxed">
        {evidenceInsightsDisclaimer}
      </p>
    </div>
  );
}
