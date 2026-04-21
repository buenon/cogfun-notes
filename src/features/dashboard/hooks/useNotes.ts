import { useState, useEffect, useMemo } from "react";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  where,
} from "firebase/firestore";
import { db } from "../../../lib/firebase";
import type { SuccessNote, AgentId } from "../../../lib/types";

export function useNotes(kidId: string = "bar") {
  const [notes, setNotes] = useState<SuccessNote[]>([]);
  const [loading, setLoading] = useState(true);

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

  return { notes, stats, unreadCount, loading };
}
