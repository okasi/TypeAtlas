import type { LiveParticipant, LivePresenceUpdatePayload } from '@/types';

const STALE_AFTER_MS = 30_000;

interface LivePresenceRecord extends LivePresenceUpdatePayload {
  updatedAt: number;
}

interface LivePresenceState {
  participants: Map<string, LivePresenceRecord>;
  listeners: Set<() => void>;
}

declare global {
  var __typeAtlasLivePresenceState__: LivePresenceState | undefined;
  var __sacredPlateLivePresenceState__: LivePresenceState | undefined;
}

function getState() {
  if (!globalThis.__typeAtlasLivePresenceState__) {
    globalThis.__typeAtlasLivePresenceState__ = globalThis.__sacredPlateLivePresenceState__ ?? {
      participants: new Map<string, LivePresenceRecord>(),
      listeners: new Set<() => void>(),
    };
    globalThis.__sacredPlateLivePresenceState__ = undefined;
  }

  return globalThis.__typeAtlasLivePresenceState__;
}

function notifyListeners() {
  const state = getState();

  for (const listener of state.listeners) {
    listener();
  }
}

function cleanupStaleParticipants() {
  const state = getState();
  const now = Date.now();
  let removedAny = false;

  for (const [sessionId, participant] of state.participants.entries()) {
    if (now - participant.updatedAt > STALE_AFTER_MS) {
      state.participants.delete(sessionId);
      removedAny = true;
    }
  }

  if (removedAny) {
    notifyListeners();
  }
}

function sortParticipants(participants: LiveParticipant[]) {
  return participants.sort((left, right) => {
    if (left.isComplete !== right.isComplete) {
      return Number(right.isComplete) - Number(left.isComplete);
    }

    if (left.progress !== right.progress) {
      return right.progress - left.progress;
    }

    return right.updatedAt - left.updatedAt;
  });
}

export const livePresenceStore = {
  upsert(payload: LivePresenceUpdatePayload) {
    cleanupStaleParticipants();

    const state = getState();
    state.participants.set(payload.sessionId, {
      ...payload,
      updatedAt: Date.now(),
    });
    notifyListeners();

    return this.getSnapshot();
  },

  remove(sessionId: string) {
    const state = getState();

    if (!state.participants.delete(sessionId)) {
      return this.getSnapshot();
    }

    notifyListeners();
    return this.getSnapshot();
  },

  getSnapshot() {
    cleanupStaleParticipants();

    const state = getState();
    return sortParticipants(
      Array.from(state.participants.values()).map((participant) => ({
        sessionId: participant.sessionId,
        name: participant.name,
        view: participant.view,
        progress: participant.progress,
        progressLabel: participant.progressLabel,
        isComplete: participant.isComplete,
        updatedAt: participant.updatedAt,
        result: participant.result,
        profileSummary: participant.profileSummary,
      })),
    );
  },

  subscribe(listener: () => void) {
    const state = getState();
    state.listeners.add(listener);

    return () => {
      state.listeners.delete(listener);
    };
  },
};
