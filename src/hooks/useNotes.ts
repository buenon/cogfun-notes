import { useMemo, useState, useEffect, useCallback } from "react";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  where,
  addDoc,
} from "firebase/firestore";
import { db, MOCK_PROFILE, type SuccessNote, type AgentId, type Agent } from "@lib";

const SUCCESS_DISPLAY_MS = 2000;

export function useNotes(kidId: string = MOCK_PROFILE.id) {
  // Data state
  const [notes, setNotes] = useState<SuccessNote[]>([]);
  const [loading, setLoading] = useState(true);

  // UI state for logging
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);

  // Fetching
  useEffect(() => {
    const q = query(
      collection(db, "notes"),
      where("kidId", "==", kidId),
      orderBy("createdAt", "desc"),
    );

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const notesData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as SuccessNote[];

        setNotes(notesData);
        setLoading(false);
      },
      (error) => {
        console.error("Error fetching notes:", error);
        setLoading(false);
      },
    );

    return () => unsubscribe();
  }, [kidId]);

  // Derived stats
  const stats = useMemo(() => {
    const counts: Record<AgentId, number> = {
      stop: 0,
      check: 0,
      effort: 0,
    };

    notes.forEach((note) => {
      if (counts[note.agentId] !== undefined) {
        counts[note.agentId]++;
      }
    });

    return counts;
  }, [notes]);

  const unreadCount = useMemo(() => {
    return notes.filter((n) => !n.isRead).length;
  }, [notes]);

  // Logging actions
  const logNote = useCallback(
    async (preset: string) => {
      if (!selectedAgent) return;

      try {
        await addDoc(collection(db, "notes"), {
          kidId: kidId,
          agentId: selectedAgent.id,
          text: preset,
          isRead: false,
          createdAt: Date.now(),
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
    [selectedAgent, kidId],
  );

  const clearSelection = useCallback(() => setSelectedAgent(null), []);

  return {
    // Data
    notes,
    stats,
    unreadCount,
    loading,
    // Logging state
    selectedAgent,
    showSuccess,
    // Methods
    selectAgent: setSelectedAgent,
    clearSelection,
    logNote,
  };
}
