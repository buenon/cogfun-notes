import { useMemo, useState, useEffect, useCallback } from "react";
import {
  collection,
  query,
  onSnapshot,
  addDoc,
  updateDoc,
  doc,
} from "firebase/firestore";
import {
  db,
  MOCK_PROFILE,
  type SuccessNote,
  type AgentId,
  type Agent,
} from "@lib";

const SUCCESS_DISPLAY_MS = 2000;

export function useNotes(kidId: string = MOCK_PROFILE.id) {
  // Data state
  const [notes, setNotes] = useState<SuccessNote[]>([]);
  const [loading, setLoading] = useState(true);

  // UI state for logging
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetching
  useEffect(() => {
    const q = query(
      collection(db, "notes"),
      // where("kidId", "==", kidId) // Temporarily disabled to check if notes exist at all
    );

    console.log("DEBUG: Fetching all notes from Firestore...");

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        console.log(
          "DEBUG: Snapshot received. Doc count:",
          snapshot.docs.length,
        );
        const notesData = snapshot.docs.map((doc) => {
          const data = doc.data();
          console.log(`DEBUG: Doc[${doc.id}] data:`, data);
          return {
            id: doc.id,
            ...data,
          } as SuccessNote;
        });

        // Filter and sort manually for now to diagnose filtering issues
        const filteredNotes = notesData.filter((n) => n.kidId === kidId);
        console.log(
          `DEBUG: Filtered notes for kidId[${kidId}]:`,
          filteredNotes.length,
        );

        // Sort manually and handle both number and Firestore Timestamp
        filteredNotes.sort((a, b) => {
          const timeA =
            typeof a.createdAt === "number"
              ? a.createdAt
              : (a.createdAt as any)?.toMillis?.() || 0;
          const timeB =
            typeof b.createdAt === "number"
              ? b.createdAt
              : (b.createdAt as any)?.toMillis?.() || 0;
          return timeB - timeA;
        });

        setNotes(filteredNotes);
        setLoading(false);
      },
      (error) => {
        console.error("DEBUG: Firestore error:", error);
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
      if (!selectedAgent || isSubmitting) return;

      setIsSubmitting(true);
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
          setIsSubmitting(false);
        }, SUCCESS_DISPLAY_MS);
      } catch (error) {
        console.error("Error logging note:", error);
        setIsSubmitting(false);
      }
    },
    [selectedAgent, kidId, isSubmitting],
  );

  const clearSelection = useCallback(() => {
    setSelectedAgent(null);
    setIsSubmitting(false);
  }, []);

  const markAsRead = useCallback(async (noteId: string) => {
    try {
      const noteRef = doc(db, "notes", noteId);
      await updateDoc(noteRef, {
        isRead: true,
      });
    } catch (error) {
      console.error("Error marking note as read:", error);
    }
  }, []);

  return {
    // Data
    notes,
    stats,
    unreadCount,
    loading,
    // Logging state
    selectedAgent,
    showSuccess,
    isSubmitting,
    // Methods
    selectAgent: setSelectedAgent,
    clearSelection,
    logNote,
    markAsRead,
  };
}
