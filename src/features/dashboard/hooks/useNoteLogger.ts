import { useState, useCallback } from 'react';
import type { Agent } from '../../../lib/types';
import { MOCK_PROFILE } from '../../../lib/mockData';

const SUCCESS_DISPLAY_MS = 2000;

export function useNoteLogger() {
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);

  const logNote = useCallback(
    (preset: string) => {
      if (!selectedAgent) return;

      console.log(
        `Logged note for ${MOCK_PROFILE.name} with ${selectedAgent.name}: ${preset}`,
      );

      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        setSelectedAgent(null);
      }, SUCCESS_DISPLAY_MS);
    },
    [selectedAgent],
  );

  const clearSelection = useCallback(() => setSelectedAgent(null), []);

  return {
    selectedAgent,
    showSuccess,
    selectAgent: setSelectedAgent,
    clearSelection,
    logNote,
  } as const;
}
