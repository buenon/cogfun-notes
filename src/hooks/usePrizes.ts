import { useState, useEffect, useCallback, useMemo } from "react";
import {
  collection,
  query,
  onSnapshot,
  setDoc,
  updateDoc,
  doc,
  where,
} from "firebase/firestore";
import {
  db,
  PRIZES_COLLECTION,
  MOCK_PROFILE,
  PRIZES,
  type PrizeClaim,
} from "@lib";

export function usePrizes(kidId: string = MOCK_PROFILE.id) {
  const [claims, setClaims] = useState<PrizeClaim[]>([]);
  const [loading, setLoading] = useState(true);

  // Sync prizes from Firestore
  useEffect(() => {
    const q = query(
      collection(db, PRIZES_COLLECTION),
      where("kidId", "==", kidId)
    );

    console.debug(`DEBUG: Syncing prize claims for kidId[${kidId}]...`);

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const claimsData = snapshot.docs.map((doc) => {
          return {
            id: doc.id,
            ...doc.data(),
          } as PrizeClaim;
        });

        console.debug(`DEBUG: Synced ${claimsData.length} prize claims.`);
        setClaims(claimsData);
        setLoading(false);
      },
      (error) => {
        console.error("DEBUG: Firestore prizes error:", error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [kidId]);

  // Map of checkpoint -> PrizeClaim
  const claimsMap = useMemo(() => {
    const map: Record<number, PrizeClaim> = {};
    claims.forEach((claim) => {
      map[claim.checkpoint] = claim;
    });
    return map;
  }, [claims]);

  // Claim a prize (Kid action)
  const claimPrize = useCallback(
    async (checkpoint: number) => {
      const prizeConf = PRIZES[checkpoint];
      if (!prizeConf) {
        console.error(`No prize configuration found for checkpoint ${checkpoint}`);
        return;
      }

      const docId = `${kidId}_${checkpoint}`;
      const claimData: Omit<PrizeClaim, "id"> = {
        kidId,
        checkpoint,
        status: "claimed",
        claimedAt: Date.now(),
        receivedAt: null,
        prizeTitle: prizeConf.title,
        prizeEmoji: prizeConf.emoji,
      };

      try {
        console.debug(`DEBUG: Claiming prize for checkpoint ${checkpoint}...`);
        await setDoc(doc(db, PRIZES_COLLECTION, docId), claimData);
      } catch (error) {
        console.error("Error claiming prize:", error);
      }
    },
    [kidId]
  );

  // Acknowledge receipt of a prize (Parent action)
  const ackPrizeReceived = useCallback(
    async (checkpoint: number) => {
      const docId = `${kidId}_${checkpoint}`;
      try {
        console.debug(`DEBUG: Acknowledging receipt for checkpoint ${checkpoint}...`);
        await updateDoc(doc(db, PRIZES_COLLECTION, docId), {
          status: "received",
          receivedAt: Date.now(),
        });
      } catch (error) {
        console.error("Error acknowledging prize receipt:", error);
      }
    },
    [kidId]
  );

  return {
    claims: claimsMap,
    rawClaimsList: claims,
    loading,
    claimPrize,
    ackPrizeReceived,
  };
}
