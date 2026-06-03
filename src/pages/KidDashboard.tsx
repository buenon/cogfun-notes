import { motion } from "framer-motion";
import { Award, ArrowLeft, ArrowRight } from "lucide-react";
import gemIcon from "../assets/icon_gem.png";
import { useNavigate, useLocation } from "react-router-dom";
import { D, AGENTS, MOCK_PROFILE, getGemImage, UI_THEME, cn } from "@lib";
import { useNotes } from "@hooks";
import { AgentStatCard, NavigationHeader, ProfileBadge, NotesList } from "@components";

export function KidDashboard() {
  const navigate = useNavigate();
  const location = useLocation();
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
      <NavigationHeader
        leftAction={
          location.state?.fromParent ? (
            <button
              onClick={() => navigate("/parent")}
              className="p-2.5 bg-white rounded-full shadow-sm text-slate-600 hover:bg-slate-50 transition-colors border border-slate-200"
            >
              <ArrowRight size={22} />
            </button>
          ) : undefined
        }
        center={
          <ProfileBadge
            profileName={MOCK_PROFILE.name}
            profileAvatar={MOCK_PROFILE.avatar}
            profileBgColor={MOCK_PROFILE.bgColor}
          />
        }
        rightAction={
          <button
            onClick={() => navigate("/kid/road")}
            className="flex items-center gap-1.5 bg-amber-100 hover:bg-amber-200 text-amber-700 px-3 py-1.5 rounded-full font-bold shadow-sm transition-colors border border-amber-200"
          >
            <img src={gemIcon} alt="gem" className="w-[18px] h-[18px] object-contain drop-shadow-sm" />
            <span>{notes.length}</span>
          </button>
        }
      />

      <div className="flex-1 p-6 max-w-md mx-auto w-full flex flex-col gap-8">
        {/* Unread Count Hero */}
        <motion.div
          className="bg-white p-6 rounded-[2.5rem] shadow-sm border border-slate-100 flex items-center gap-6"
          whileHover={{ scale: 1.02 }}
        >
          <div className={cn(
            "p-2 rounded-3xl min-w-[80px] h-[80px] flex items-center justify-center overflow-hidden",
            UI_THEME.unread.bg,
            UI_THEME.unread.accent
          )}>
            {unreadCount > 0 ? (
              <motion.img
                initial={{ scale: 0, rotate: -20 }}
                animate={{ scale: 1, rotate: 0 }}
                src={getGemImage(unreadCount) || ""}
                alt="gems"
                className="w-full h-full object-contain"
              />
            ) : (
              <img src={gemIcon} alt="gem" className="w-10 h-10 opacity-20 grayscale" />
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
          <span>{D.kidDashboard.viewAllNotes}</span>
          <ArrowLeft size={20} />
        </button>
      </div>
    </motion.div>
  );
}
