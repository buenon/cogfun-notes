import { motion } from "framer-motion";
import { ArrowRight, History } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { MOCK_PROFILE, getGemImage } from "@lib";
import { useNotes } from "@hooks";
import { NotesList, DashboardHeader } from "@components";

export function AllNotesPage() {
  const navigate = useNavigate();
  const { notes, markAsRead, loading, unreadCount } = useNotes(MOCK_PROFILE.id);

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="flex flex-col min-h-screen bg-slate-50 relative"
    >
      <DashboardHeader
        profileName={MOCK_PROFILE.name}
        profileAvatar={MOCK_PROFILE.avatar}
        profileBgColor={MOCK_PROFILE.bgColor}
      />

      <div className="flex-1 p-6 max-w-md mx-auto w-full flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <button
            onClick={() => navigate("/kid")}
            className="flex items-center gap-2 text-slate-500 font-bold hover:text-slate-800 transition-colors"
          >
            <ArrowRight size={20} />
            <span>חזרה</span>
          </button>
        </div>

        <div className="flex items-center gap-3 mb-2">
          <div className="bg-amber-100 text-amber-600 p-2 rounded-xl">
            <History size={24} />
          </div>
          <h1 className="text-2xl font-black text-slate-800">
            היסטוריית הצלחות
          </h1>
        </div>

        {!loading && unreadCount > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-indigo-50 border border-indigo-100 p-4 rounded-3xl flex items-center gap-4"
          >
            <img
              src={getGemImage(unreadCount) || ""}
              alt="gems"
              className="w-20 h-20 object-contain"
            />
            <div>
              <p className="font-black text-indigo-900 text-xl leading-tight">
                {unreadCount}
              </p>
              <p className="text-indigo-600 font-bold text-sm">
                פתקים שעדיין לא נקראו
              </p>
            </div>
          </motion.div>
        )}

        {loading ? (
          <div className="flex justify-center p-12 text-slate-400 font-bold">
            טוען...
          </div>
        ) : (
          <NotesList
            notes={notes}
            onMarkAsRead={markAsRead}
            showStatus={true}
            emptyMessage="עדיין אין הצלחות רשומות. המשיכו לנסות!"
          />
        )}
      </div>
    </motion.div>
  );
}
