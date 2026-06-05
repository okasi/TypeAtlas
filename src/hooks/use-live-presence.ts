import { useEffect, useEffectEvent, useState } from 'react';
import type {
  FlowView,
  LiveParticipant,
  LivePresenceUpdatePayload,
  SacredArchetype,
  UserProfile,
} from '@/types';

const SESSION_STORAGE_KEY = 'typeatlas-live-session-id';
const LEGACY_SESSION_STORAGE_KEY = 'sacred-plate-live-session-id';
const HEARTBEAT_MS = 10_000;

interface UseLivePresenceOptions {
  view: FlowView;
  progress: number;
  progressLabel: string;
  userProfile: Partial<UserProfile>;
  result: SacredArchetype | null;
}

function getSessionId() {
  if (typeof window === 'undefined') {
    return 'server-render';
  }

  const existing = window.sessionStorage.getItem(SESSION_STORAGE_KEY);

  if (existing) {
    return existing;
  }

  const legacy = window.sessionStorage.getItem(LEGACY_SESSION_STORAGE_KEY);

  if (legacy) {
    window.sessionStorage.setItem(SESSION_STORAGE_KEY, legacy);
    window.sessionStorage.removeItem(LEGACY_SESSION_STORAGE_KEY);
    return legacy;
  }

  const created =
    typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function'
      ? crypto.randomUUID()
      : `session-${Date.now()}-${Math.random().toString(16).slice(2)}`;

  window.sessionStorage.setItem(SESSION_STORAGE_KEY, created);
  return created;
}

function getFallbackName(sessionId: string) {
  return `Visitor ${sessionId.slice(-4).toUpperCase()}`;
}

function buildPayload({
  sessionId,
  view,
  progress,
  progressLabel,
  userProfile,
  result,
}: UseLivePresenceOptions & { sessionId: string }): LivePresenceUpdatePayload {
  return {
    sessionId,
    name: userProfile.name?.trim() || getFallbackName(sessionId),
    view,
    progress,
    progressLabel,
    isComplete: Boolean(result),
    result,
    profileSummary: userProfile.name
      ? {
          bloodType: userProfile.bloodType,
          westernZodiac: userProfile.westernZodiac,
          chineseZodiac: userProfile.chineseZodiac,
          mbti: userProfile.mbti,
          dominantDosha: userProfile.dominantDosha,
          enneagram: userProfile.enneagram,
          hogwartsHouse: userProfile.hogwartsHouse,
          loveLanguage: userProfile.loveLanguage,
          chronotype: userProfile.chronotype,
          birthstone: userProfile.birthstone,
        }
      : null,
  };
}

export function useLivePresence(options: UseLivePresenceOptions) {
  const [sessionId] = useState(getSessionId);
  const [participants, setParticipants] = useState<LiveParticipant[]>([]);
  const [isConnected, setIsConnected] = useState(false);

  const publishPresence = useEffectEvent(async (keepalive = false) => {
    const payload = buildPayload({ sessionId, ...options });

    try {
      const response = await fetch('/api/live-presence/update', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
        keepalive,
      });

      if (!response.ok) {
        throw new Error(`Failed to publish presence: ${response.status}`);
      }
    } catch (error) {
      console.error('Failed to publish live presence:', error);
    }
  });

  const leavePresence = useEffectEvent(async () => {
    try {
      await fetch('/api/live-presence/leave', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ sessionId }),
        keepalive: true,
      });
    } catch (error) {
      console.error('Failed to leave live presence:', error);
    }
  });

  useEffect(() => {
    publishPresence();
  }, [
    options.progress,
    options.progressLabel,
    options.result,
    options.userProfile,
    options.view,
  ]);

  useEffect(() => {
    const heartbeat = window.setInterval(() => {
      publishPresence();
    }, HEARTBEAT_MS);

    return () => {
      window.clearInterval(heartbeat);
    };
  }, []);

  useEffect(() => {
    const eventSource = new EventSource('/api/live-presence/stream');

    eventSource.onopen = () => {
      setIsConnected(true);
    };

    eventSource.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data) as { participants?: LiveParticipant[] };

        setParticipants(Array.isArray(data.participants) ? data.participants : []);
      } catch (error) {
        console.error('Failed to parse live presence payload:', error);
      }
    };

    eventSource.onerror = () => {
      setIsConnected(false);
    };

    return () => {
      eventSource.close();
    };
  }, []);

  useEffect(() => {
    const handlePageHide = () => {
      leavePresence();
    };

    window.addEventListener('pagehide', handlePageHide);

    return () => {
      window.removeEventListener('pagehide', handlePageHide);
    };
  }, []);

  return {
    sessionId,
    participants,
    isConnected,
  };
}
