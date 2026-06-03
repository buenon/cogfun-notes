import { motion } from "framer-motion";
import { ArrowRight, History } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { D, MOCK_PROFILE, getGemImage, UI_THEME, cn, PRIZES } from "@lib";
import { useNotes, usePrizes } from "@hooks";
import { NotesList, NavigationHeader, ProfileBadge } from "@components";
import gemIcon from "../assets/icon_gem.png";

export function AllNotesPage() {
  const navigate = useNavigate();
  const { notes, markAsRead, loading, unreadCount } = useNotes(MOCK_PROFILE.id);
  const { claims } = usePrizes(MOCK_PROFILE.id);
  const hasPendingPrize = Object.keys(PRIZES)
    .map(Number)
    .some((checkpoint) => notes.length >= checkpoint && !claims[checkpoint]);

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="flex flex-col min-h-screen bg-slate-50 relative"
    >
      <NavigationHeader
        leftAction={
          <button
            onClick={() => navigate("/kid")}
            className="p-2.5 bg-white rounded-full shadow-sm text-slate-600 hover:bg-slate-50 transition-colors border border-slate-200"
          >
            <ArrowRight size={22} />
          </button>
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
            className="relative flex items-center gap-1.5 bg-amber-100 hover:bg-amber-200 text-amber-700 px-3 py-1.5 rounded-full font-bold shadow-sm transition-colors border border-amber-200"
          >
            <img
              src={gemIcon}
              alt="gem"
              className="w-[18px] h-[18px] object-contain drop-shadow-sm"
            />
            <span>{notes.length}</span>
            {hasPendingPrize && (
              <span className="absolute -top-1 -right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500 border border-white"></span>
              </span>
            )}
          </button>
        }
      />

      <div className="flex-1 p-6 max-w-md mx-auto w-full flex flex-col gap-6">

        <div className="flex items-center gap-3 mb-2">
          <div className="bg-amber-100 text-amber-600 p-2 rounded-xl">
            <History size={24} />
          </div>
          <h1 className="text-2xl font-black text-slate-800">
            {D.allNotesPage.title}
          </h1>
        </div>

        {!loading && unreadCount > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className={cn(
              "border p-4 rounded-3xl flex items-center gap-4",
              UI_THEME.unread.lightBg,
              UI_THEME.unread.border
            )}
          >
            <img
              src={getGemImage(unreadCount) || ""}
              alt="gems"
              className="w-20 h-20 object-contain"
            />
            <div>
              <p className={cn("font-black text-xl leading-tight", UI_THEME.unread.text)}>
                {unreadCount}
              </p>
              <p className={cn("font-bold text-sm", UI_THEME.unread.accent)}>
                {D.allNotesPage.unreadNotes}
              </p>
            </div>
          </motion.div>
        )}

        {loading ? (
          <div className="flex justify-center p-12 text-slate-400 font-bold">
            {D.allNotesPage.loading}
          </div>
        ) : (
          <NotesList
            notes={notes}
            onMarkAsRead={markAsRead}
            showStatus={true}
            emptyMessage={D.allNotesPage.emptyMessage}
          />
        )}
      </div>
    </motion.div>
  );
}
