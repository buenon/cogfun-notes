import { motion, AnimatePresence } from "framer-motion";
import { type SuccessNote } from "@lib";
import { NoteItem } from "./NoteItem";
import { Inbox } from "lucide-react";

type NotesListProps = {
  notes: SuccessNote[];
  onMarkAsRead?: (id: string) => void;
  showStatus?: boolean;
  emptyMessage?: string;
};

export function NotesList({
  notes,
  onMarkAsRead,
  showStatus = false,
  emptyMessage,
}: NotesListProps) {
  if (notes.length === 0 && emptyMessage) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-col items-center justify-center p-12 text-slate-300 gap-4"
      >
        <Inbox size={48} strokeWidth={1} />
        <p className="font-bold text-center">{emptyMessage}</p>
      </motion.div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      <AnimatePresence mode="popLayout">
        {notes.map((note) => (
          <NoteItem
            key={note.id}
            note={note}
            onMarkAsRead={onMarkAsRead}
            showStatus={showStatus}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}
