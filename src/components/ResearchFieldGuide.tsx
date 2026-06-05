import { BookOpen, ExternalLink, Microscope } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import {
  birthstoneLabels,
  chronotypeLabels,
  enneagramTypeLabels,
  hogwartsHouseLabels,
  loveLanguageLabels,
  typologyResearchNotes,
  westernZodiacData,
  chineseZodiacData,
  mbtiData,
} from '@/data';
import type { UserProfile } from '@/types';

interface ResearchFieldGuideProps {
  userProfile: UserProfile;
}

function getProfileContext(noteId: string, userProfile: UserProfile) {
  switch (noteId) {
    case 'western-zodiac':
      return `In your reading: ${westernZodiacData[userProfile.westernZodiac].name}`;
    case 'chinese-zodiac':
      return `In your reading: Year of the ${chineseZodiacData[userProfile.chineseZodiac].name}`;
    case 'abo-blood':
      return userProfile.bloodType
        ? `In your reading: Type ${userProfile.bloodType}`
        : 'Skipped in your reading';
    case 'mbti':
      return `In your reading: ${userProfile.mbti} - ${mbtiData[userProfile.mbti].name}`;
    case 'enneagram':
      return userProfile.enneagram
        ? `In your reading: ${enneagramTypeLabels[userProfile.enneagram].name}`
        : 'Skipped in your reading';
    case 'hogwarts-houses':
      return userProfile.hogwartsHouse
        ? `In your reading: ${hogwartsHouseLabels[userProfile.hogwartsHouse].name}`
        : 'Skipped in your reading';
    case 'love-languages':
      return userProfile.loveLanguage
        ? `In your reading: ${loveLanguageLabels[userProfile.loveLanguage].name}`
        : 'Skipped in your reading';
    case 'chronotype':
      return userProfile.chronotype
        ? `In your reading: ${chronotypeLabels[userProfile.chronotype].name}`
        : 'Skipped in your reading';
    case 'birthstone':
      return userProfile.birthstone
        ? `In your reading: ${birthstoneLabels[userProfile.birthstone].month} - ${birthstoneLabels[userProfile.birthstone].name}`
        : 'Derived from birth month';
    default:
      return 'Reference only';
  }
}

function getEffectiveRole(noteId: string, userProfile: UserProfile): 'active' | 'optional' | 'reference' {
  switch (noteId) {
    case 'western-zodiac':
    case 'chinese-zodiac':
    case 'mbti':
      return 'active';
    case 'abo-blood':
      return 'optional';
    case 'birthstone':
      return userProfile.birthstone ? 'active' : 'reference';
    case 'enneagram':
      return userProfile.enneagram ? 'active' : 'optional';
    case 'hogwarts-houses':
      return userProfile.hogwartsHouse ? 'active' : 'optional';
    case 'love-languages':
      return userProfile.loveLanguage ? 'active' : 'optional';
    case 'chronotype':
      return userProfile.chronotype ? 'active' : 'optional';
    default:
      return 'reference';
  }
}

function getRoleBadgeClass(role: 'active' | 'optional' | 'reference') {
  switch (role) {
    case 'active':
      return 'border-emerald-400/20 bg-emerald-400/10 text-emerald-200';
    case 'optional':
      return 'border-amber-400/20 bg-amber-400/10 text-amber-200';
    default:
      return 'border-white/10 bg-white/[0.04] text-secondary-custom';
  }
}

function getRoleLabel(role: 'active' | 'optional' | 'reference') {
  switch (role) {
    case 'active':
      return 'Used in TypeAtlas';
    case 'optional':
      return 'Optional in TypeAtlas';
    default:
      return 'Comparison only';
  }
}

export function ResearchFieldGuide({ userProfile }: ResearchFieldGuideProps) {
  return (
    <div className="glass-card p-6 md:p-8 mb-10">
      <div className="flex items-start gap-4 mb-6">
        <div className="w-12 h-12 rounded-full bg-gold/10 border border-gold/20 flex items-center justify-center flex-none">
          <Microscope className="w-5 h-5 text-gold" />
        </div>
        <div>
          <h3 className="font-heading text-xl text-foreground mb-2">Field Guide and References</h3>
          <p className="text-secondary-custom text-sm leading-relaxed">
            TypeAtlas mixes symbolic systems, pop-psych tools, and one stronger chronobiology construct.
            This section separates the vibe from the evidence: where each model came from, how it classifies
            people, what the research says, and which sources back that summary.
          </p>
        </div>
      </div>

      <Accordion type="multiple" className="space-y-3">
        {typologyResearchNotes.map((note) => {
          const effectiveRole = getEffectiveRole(note.id, userProfile);

          return (
          <AccordionItem
            key={note.id}
            value={note.id}
            className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 last:border-b border-b-0"
          >
            <AccordionTrigger className="py-5 hover:no-underline">
              <div className="text-left">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span
                    className={`rounded-full border px-2.5 py-1 text-[11px] uppercase tracking-[0.14em] ${getRoleBadgeClass(effectiveRole)}`}
                  >
                    {getRoleLabel(effectiveRole)}
                  </span>
                  <span className="rounded-full border border-gold/15 bg-gold/10 px-2.5 py-1 text-[11px] uppercase tracking-[0.14em] text-gold">
                    {getProfileContext(note.id, userProfile)}
                  </span>
                </div>
                <div className="font-heading text-lg text-foreground">{note.name}</div>
                <p className="text-sm text-secondary-custom mt-1">{note.evidenceBand}</p>
              </div>
            </AccordionTrigger>

            <AccordionContent className="pb-5">
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                <div className="glass-card-light p-4">
                  <div className="label-mono mb-2">TypeAtlas Use</div>
                  <p className="text-sm text-secondary-custom leading-relaxed">{note.atlasUse}</p>
                </div>
                <div className="glass-card-light p-4">
                  <div className="label-mono mb-2">Origin / History</div>
                  <p className="text-sm text-secondary-custom leading-relaxed">{note.history}</p>
                </div>
                <div className="glass-card-light p-4">
                  <div className="label-mono mb-2">How It Classifies</div>
                  <p className="text-sm text-secondary-custom leading-relaxed">{note.theory}</p>
                </div>
                <div className="glass-card-light p-4">
                  <div className="label-mono mb-2">Evidence Note</div>
                  <p className="text-sm text-secondary-custom leading-relaxed">{note.evidence}</p>
                </div>
              </div>

              <div className="mt-5">
                <div className="flex items-center gap-2 mb-3">
                  <BookOpen className="w-4 h-4 text-gold" />
                  <span className="label-mono">References</span>
                </div>
                <div className="grid gap-3 md:grid-cols-2">
                  {note.references.map((reference) => (
                    <a
                      key={reference.url}
                      href={reference.url}
                      target="_blank"
                      rel="noreferrer"
                      className="rounded-2xl border border-white/10 bg-[#12151C]/70 p-4 transition-colors hover:border-gold/30"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <div className="text-sm text-foreground">{reference.label}</div>
                          <p className="text-xs text-secondary-custom mt-1 leading-relaxed">
                            {reference.description}
                          </p>
                        </div>
                        <ExternalLink className="w-4 h-4 text-gold flex-none mt-0.5" />
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
          );
        })}
      </Accordion>

      <p className="text-xs text-secondary-custom/70 mt-5 leading-relaxed">
        These notes are for cultural and research context. They are not medical advice, and TypeAtlas is still a
        playful synthesis rather than a validated diagnostic system.
      </p>
    </div>
  );
}
