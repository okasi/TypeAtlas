import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown, ChevronUp, Eye, Signal, SignalHigh, Users } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import type { LiveParticipant } from '@/types';

interface LivePresencePanelProps {
  isConnected: boolean;
  participants: LiveParticipant[];
  sessionId: string;
}

function getStatusLabel(participant: LiveParticipant) {
  if (participant.isComplete) {
    return 'Result ready';
  }

  return participant.progressLabel;
}

export function LivePresencePanel({
  isConnected,
  participants,
  sessionId,
}: LivePresencePanelProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedParticipant, setSelectedParticipant] = useState<LiveParticipant | null>(null);
  const sortedParticipants = participants;
  const connectedCount = sortedParticipants.length;

  return (
    <>
      <div className="fixed right-4 bottom-4 z-40">
        <button
          type="button"
          onClick={() => setIsOpen((current) => !current)}
          className="glass-card-light px-4 py-3 min-w-[220px] max-w-[calc(100vw-2rem)] flex items-center justify-between gap-4 hover:border-gold/25 transition-colors"
        >
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-full bg-gold/10 border border-gold/20 flex items-center justify-center flex-none">
              <Users className="w-4 h-4 text-gold" />
            </div>
            <div className="min-w-0 text-left">
              <div className="label-mono mb-1">Live Now</div>
              <div className="text-sm text-foreground truncate">
                {connectedCount} active {connectedCount === 1 ? 'visitor' : 'visitors'}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-none">
            {isConnected ? (
              <SignalHigh className="w-4 h-4 text-emerald-300" />
            ) : (
              <Signal className="w-4 h-4 text-secondary-custom" />
            )}
            {isOpen ? (
              <ChevronDown className="w-4 h-4 text-secondary-custom" />
            ) : (
              <ChevronUp className="w-4 h-4 text-secondary-custom" />
            )}
          </div>
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.aside
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            className="fixed right-4 bottom-20 z-40 w-[calc(100vw-2rem)] sm:w-[360px] max-h-[min(70vh,640px)]"
          >
            <div className="glass-card p-5 h-full overflow-hidden">
              <div className="flex items-start justify-between gap-3 mb-4">
                <div>
                  <div className="label-mono mb-1">Active Visitors</div>
                  <h2 className="font-heading text-2xl text-foreground">Site activity</h2>
                </div>
                <div className="text-right">
                  <div className={`text-xs ${isConnected ? 'text-emerald-300' : 'text-secondary-custom'}`}>
                    {isConnected ? 'Connected' : 'Reconnecting'}
                  </div>
                </div>
              </div>

              <p className="text-sm text-secondary-custom mb-5">
                Everyone currently connected to this app instance appears here with their current progress.
              </p>

              <div className="space-y-3 overflow-y-auto max-h-[calc(min(70vh,640px)-10rem)] pr-1">
                {sortedParticipants.map((participant) => {
                  const isSelf = participant.sessionId === sessionId;

                  return (
                    <div
                      key={participant.sessionId}
                      className={`rounded-2xl border p-4 ${
                        isSelf
                          ? 'border-gold/25 bg-gold/5'
                          : 'border-white/10 bg-white/[0.03]'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3 mb-3">
                        <div className="min-w-0">
                          <div className="font-heading text-lg text-foreground truncate">
                            {isSelf ? `${participant.name} (You)` : participant.name}
                          </div>
                          <div className="text-sm text-secondary-custom">{getStatusLabel(participant)}</div>
                        </div>

                        {participant.isComplete && participant.result ? (
                          <button
                            type="button"
                            onClick={() => setSelectedParticipant(participant)}
                            className="inline-flex items-center gap-2 px-3 py-2 rounded-full border border-gold/20 bg-gold/10 text-xs uppercase tracking-[0.12em] text-gold hover:border-gold/35 transition-colors"
                          >
                            <Eye className="w-3.5 h-3.5" />
                            <span>View</span>
                          </button>
                        ) : (
                          <span className="text-xs text-secondary-custom flex-none">
                            {participant.progress}%
                          </span>
                        )}
                      </div>

                      <div className="progress-bar mb-2">
                        <div
                          className="progress-fill"
                          style={{ width: `${Math.max(4, participant.progress)}%` }}
                        />
                      </div>

                      <div className="flex items-center justify-between gap-3 text-xs text-secondary-custom">
                        <span className="capitalize">{participant.view.replace('-', ' ')}</span>
                        <span>{participant.progress}%</span>
                      </div>

                      {participant.isComplete && participant.result && (
                        <div className="mt-3 text-sm text-secondary-custom">
                          <span className="text-foreground">{participant.result.name}</span>
                          {' · '}
                          {participant.result.signatureThemes.slice(0, 2).join(' • ')}
                        </div>
                      )}
                    </div>
                  );
                })}

                {sortedParticipants.length === 0 && (
                  <div className="rounded-2xl border border-dashed border-white/10 bg-white/[0.02] p-5 text-sm text-secondary-custom">
                    No active visitors yet.
                  </div>
                )}
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      <Dialog
        open={Boolean(selectedParticipant)}
        onOpenChange={(open) => {
          if (!open) {
            setSelectedParticipant(null);
          }
        }}
      >
        <DialogContent className="glass-card border-white/10 bg-[#0F1218] text-foreground max-w-2xl max-h-[85vh] overflow-y-auto">
          {selectedParticipant?.result && (
            <>
              <DialogHeader className="text-left">
                <div className="label-mono">Completed Result</div>
                <DialogTitle className="font-heading text-3xl text-foreground">
                  {selectedParticipant.name}
                </DialogTitle>
                <DialogDescription className="text-secondary-custom">
                  {selectedParticipant.result.name}
                </DialogDescription>
              </DialogHeader>

              <div className="grid gap-4 md:grid-cols-[1.1fr_0.9fr]">
                <div className="glass-card-light p-5">
                  <h3 className="font-heading text-xl text-foreground mb-3">
                    {selectedParticipant.result.name}
                  </h3>
                  <p className="text-secondary-custom leading-relaxed mb-4">
                    {selectedParticipant.result.dietStyle}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {selectedParticipant.result.signatureThemes.map((theme) => (
                      <span
                        key={theme}
                        className="px-3 py-1.5 rounded-full border border-gold/20 bg-gold/10 text-xs uppercase tracking-[0.12em] text-gold"
                      >
                        {theme}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="glass-card-light p-5">
                  <div className="label-mono mb-3">Profile Summary</div>
                  <div className="space-y-2 text-sm text-secondary-custom">
                    {selectedParticipant.profileSummary?.westernZodiac && (
                      <div>Western zodiac: {selectedParticipant.profileSummary.westernZodiac}</div>
                    )}
                    {selectedParticipant.profileSummary?.chineseZodiac && (
                      <div>Chinese zodiac: {selectedParticipant.profileSummary.chineseZodiac}</div>
                    )}
                    {selectedParticipant.profileSummary?.bloodType && (
                      <div>Blood type: {selectedParticipant.profileSummary.bloodType}</div>
                    )}
                    {selectedParticipant.profileSummary?.mbti && (
                      <div>MBTI: {selectedParticipant.profileSummary.mbti}</div>
                    )}
                    {selectedParticipant.profileSummary?.enneagram && (
                      <div>Enneagram: {selectedParticipant.profileSummary.enneagram}</div>
                    )}
                    {selectedParticipant.profileSummary?.hogwartsHouse && (
                      <div>House: {selectedParticipant.profileSummary.hogwartsHouse}</div>
                    )}
                    {selectedParticipant.profileSummary?.loveLanguage && (
                      <div>Love language: {selectedParticipant.profileSummary.loveLanguage}</div>
                    )}
                    {selectedParticipant.profileSummary?.chronotype && (
                      <div>Chronotype: {selectedParticipant.profileSummary.chronotype}</div>
                    )}
                    {selectedParticipant.profileSummary?.birthstone && (
                      <div>Birthstone: {selectedParticipant.profileSummary.birthstone}</div>
                    )}
                    {selectedParticipant.profileSummary?.dominantDosha && (
                      <div>Dosha: {selectedParticipant.profileSummary.dominantDosha}</div>
                    )}
                  </div>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="glass-card-light p-5">
                  <div className="label-mono mb-3">Prioritize</div>
                  <div className="space-y-2 text-sm text-secondary-custom">
                    {selectedParticipant.result.ingredientsToPrioritize.slice(0, 6).map((item) => (
                      <div key={item}>{item}</div>
                    ))}
                  </div>
                </div>

                <div className="glass-card-light p-5">
                  <div className="label-mono mb-3">Limit</div>
                  <div className="space-y-2 text-sm text-secondary-custom">
                    {selectedParticipant.result.foodsToAvoid.slice(0, 6).map((item) => (
                      <div key={item}>{item}</div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="glass-card-light p-5">
                <div className="label-mono mb-3">Meal Rhythm</div>
                <p className="text-secondary-custom leading-relaxed">
                  {selectedParticipant.result.mealRhythm}
                </p>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
