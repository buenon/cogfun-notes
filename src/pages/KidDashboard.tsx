import { motion } from "framer-motion";
import { Inbox, Award, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { D, AGENTS, MOCK_PROFILE, getGemImage } from "@lib";
import { useNotes } from "@hooks";
import { AgentStatCard, DashboardHeader, NotesList } from "@components";

export function KidDashboard() {
  const navigate = useNavigate();
  const { notes, stats, unreadCount, loading, markAsRead } = useNotes(
    MOCK_PROFILE.id,
  );

  const unreadNotes = notes.filter((n) => !n.isRead);

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className="flex flex-col min-h-screen bg-slate-50 relative pb-20"
    >
      <DashboardHeader
        profileName={MOCK_PROFILE.name}
        profileAvatar={MOCK_PROFILE.avatar}
        profileBgColor={MOCK_PROFILE.bgColor}
      />

      <div className="flex-1 p-6 max-w-md mx-auto w-full flex flex-col gap-8">
        {/* Unread Count Hero */}
        <motion.div
          className="bg-white p-6 rounded-[2.5rem] shadow-sm border border-slate-100 flex items-center gap-6"
          whileHover={{ scale: 1.02 }}
        >
          <div className="bg-indigo-100 text-indigo-600 p-2 rounded-3xl min-w-[80px] h-[80px] flex items-center justify-center overflow-hidden">
            {unreadCount > 0 ? (
              <motion.img
                initial={{ scale: 0, rotate: -20 }}
                animate={{ scale: 1, rotate: 0 }}
                src={getGemImage(unreadCount) || ""}
                alt="gems"
                className="w-full h-full object-contain"
              />
            ) : (
              <Inbox size={40} />
            )}
          </div>
          <div>
            <h2 className="text-4xl font-black font-display text-slate-800 leading-none">
              {loading ? "..." : unreadCount}
            </h2>
            <p className="text-slate-500 font-bold text-lg">
              {D.kidDashboard.newNotes}
            </p>
          </div>
        </motion.div>

        {/* New Notes List */}
        <NotesList notes={unreadNotes} onMarkAsRead={markAsRead} />

        {/* Lifetime Stats */}
        <div>
          <h3 className="text-xl font-extrabold text-slate-800 mb-4 flex items-center gap-2">
            <Award className="text-amber-500" />
            {D.kidDashboard.lifetimeSuccesses}
          </h3>
          <div className="grid grid-cols-1 gap-4">
            {Object.values(AGENTS).map((agent, index) => (
              <AgentStatCard
                key={agent.id}
                agent={agent}
                count={stats[agent.id] || 0}
                index={index}
              />
            ))}
          </div>
        </div>

        {/* View All Button */}
        <button
          onClick={() => navigate("/kid/notes")}
          className="mt-4 flex items-center justify-center gap-2 p-5 bg-slate-200 text-slate-600 rounded-3xl font-black font-display text-lg hover:bg-slate-300 transition-colors"
        >
          <span>לכל הפתקים שלי</span>
          <ArrowLeft size={20} />
        </button>
      </div>
    </motion.div>
  );
}
