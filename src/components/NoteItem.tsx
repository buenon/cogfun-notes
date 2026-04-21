import { motion } from "framer-motion";
import { CheckCircle2, Clock } from "lucide-react";
import { type SuccessNote, AGENTS, AGENT_THEME, cn } from "@lib";

type NoteItemProps = {
  note: SuccessNote;
  onMarkAsRead?: (id: string) => void;
  showStatus?: boolean;
};

export function NoteItem({
  note,
  onMarkAsRead,
  showStatus = false,
}: NoteItemProps) {
  const agent = AGENTS[note.agentId];
  const theme = AGENT_THEME[note.agentId];

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className={cn(
        "flex items-center gap-4 p-4 rounded-3xl border transition-all",
        note.isRead
          ? "bg-white border-slate-100 opacity-70"
          : cn(theme.bg, "border-transparent shadow-sm"),
      )}
    >
      <div
        className={cn(
          "w-12 h-12 rounded-2xl flex items-center justify-center shrink-0",
          note.isRead ? "bg-slate-50" : "bg-white/50",
        )}
      >
        <img
          src={agent.image}
          alt={agent.name}
          width={32}
          height={32}
          loading="eager"
          decoding="sync"
          className="w-8 h-8 object-contain aspect-square"
        />
      </div>

      <div className="flex-1 min-w-0">
        <p
          className={cn(
            "font-bold text-sm leading-tight",
            note.isRead ? "text-slate-500" : theme.text,
          )}
        >
          {note.text}
        </p>
        {showStatus && (
          <div className="flex items-center gap-1 mt-1">
            <Clock size={12} className="text-slate-400" />
            <span className="text-[10px] font-medium text-slate-400">
              {new Date(note.createdAt).toLocaleDateString("he-IL", {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
          </div>
        )}
      </div>

      {!note.isRead && onMarkAsRead && (
        <button
          onClick={() => onMarkAsRead(note.id)}
          className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-emerald-500 shadow-sm hover:scale-110 transition-transform active:scale-95"
        >
          <CheckCircle2 size={24} />
        </button>
      )}

      {note.isRead && (
        <div className="w-10 h-10 flex items-center justify-center text-slate-300">
          <CheckCircle2 size={20} />
        </div>
      )}
    </motion.div>
  );
}
