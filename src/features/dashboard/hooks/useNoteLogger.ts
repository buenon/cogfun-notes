import { useState, useCallback } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../../lib/firebase";
import type { Agent } from "../../../lib/types";
import { MOCK_PROFILE } from "../../../lib/mockData";

const SUCCESS_DISPLAY_MS = 2000;

export function useNoteLogger() {
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);

  const logNote = useCallback(
    async (preset: string) => {
      if (!selectedAgent) return;

      try {
        await addDoc(collection(db, "notes"), {
          kidId: MOCK_PROFILE.id,
          agentId: selectedAgent.id,
          text: preset,
          isRead: false,
          createdAt: Date.now(), // Simplified for now, or use serverTimestamp() if preferred
        });

        setShowSuccess(true);
        setTimeout(() => {
          setShowSuccess(false);
          setSelectedAgent(null);
        }, SUCCESS_DISPLAY_MS);
      } catch (error) {
        console.error("Error logging note:", error);
      }
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
