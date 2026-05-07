import { collection, addDoc, getDocs, writeBatch } from "firebase/firestore";
import { db, NOTES_COLLECTION, AGENTS, MOCK_PROFILE } from "@lib";

/**
 * Generates random notes for development testing
 */
export async function generateNotes(count: number = 5) {
  console.debug(`Generating ${count} notes in ${NOTES_COLLECTION}...`);

  const agentIds = Object.keys(AGENTS) as (keyof typeof AGENTS)[];
  const parentNames = ["Mom", "Dad", "Teacher", "Grandma"];

  for (let i = 0; i < count; i++) {
    const agentId = agentIds[Math.floor(Math.random() * agentIds.length)];
    const agent = AGENTS[agentId];
    const preset =
      agent.presets[Math.floor(Math.random() * agent.presets.length)];
    const parentName =
      parentNames[Math.floor(Math.random() * parentNames.length)];

    // Stagger timestamps a bit
    const createdAt = Date.now() - i * 1000 * 60 * 60; // Subtract hours

    await addDoc(collection(db, NOTES_COLLECTION), {
      kidId: MOCK_PROFILE.id,
      agentId: agentId,
      text: preset,
      isRead: Math.random() > 0.5,
      createdAt: createdAt,
      parentName: parentName,
    });
  }

  console.debug("Generation complete!");
}

/**
 * Clears all notes from the current environment's collection
 */
export async function clearNotes() {
  console.debug("🚀 Clearing all notes...");

  console.debug(`DEBUG: Target collection: ${NOTES_COLLECTION}`);
  const querySnapshot = await getDocs(collection(db, NOTES_COLLECTION));

  if (querySnapshot.empty) {
    console.debug("No notes found to clear.");
    return;
  }

  console.debug(
    `Clearing ${querySnapshot.size} notes from ${NOTES_COLLECTION}...`,
  );

  // Firestore batches have a limit of 500 operations
  const BATCH_LIMIT = 500;
  const docs = querySnapshot.docs;

  for (let i = 0; i < docs.length; i += BATCH_LIMIT) {
    const batch = writeBatch(db);
    const chunk = docs.slice(i, i + BATCH_LIMIT);

    chunk.forEach((doc) => {
      batch.delete(doc.ref);
    });

    await batch.commit();
    console.debug(`Progress: Deleted ${i + chunk.length}/${docs.length}`);
  }

  console.debug("Collection cleared successfully!");
}
