import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { D, MOCK_PROFILE } from "@lib";
import { useNotes, usePrizes } from "@hooks";
import { Gift, Check } from "lucide-react";
import {
  AgentGrid,
  NavigationHeader,
  ProfileBadge,
  PresetDrawer,
  SuccessOverlay,
  ParentNameModal,
} from "@components";


export function ParentDashboard() {
  const {
    selectedAgent,
    showSuccess,
    isSubmitting,
    selectAgent,
    clearSelection,
    logNote,
  } = useNotes();

  const { rawClaimsList, ackPrizeReceived } = usePrizes(MOCK_PROFILE.id);
  const pendingPrizes = rawClaimsList.filter((c) => c.status === "claimed");

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="flex flex-col h-[100dvh] bg-slate-50 relative overflow-hidden"
    >
      <NavigationHeader
        center={
          <Link to="/kid" state={{ fromParent: true }}>
            <ProfileBadge
              profileName={MOCK_PROFILE.name}
              profileAvatar={MOCK_PROFILE.avatar}
              profileBgColor={MOCK_PROFILE.bgColor}
            />
          </Link>
        }
      />

      <div className="flex-1 p-4 pb-6 max-w-md mx-auto w-full flex flex-col overflow-hidden">
        {/* Pending Prizes Section */}
        {pendingPrizes.length > 0 && (
          <div className="mb-4 p-4 bg-amber-50 border-2 border-amber-200 rounded-3xl shrink-0">
            <h3 className="text-lg font-black text-amber-800 mb-3 flex items-center gap-2">
              <Gift size={20} className="text-amber-500 animate-bounce" />
              <span>פרסים שממתינים לחלוקה ({pendingPrizes.length})</span>
            </h3>
            <div className="flex flex-col gap-2 max-h-[140px] overflow-y-auto pr-1">
              {pendingPrizes.map((prize) => (
                <div
                  key={prize.checkpoint}
                  className="flex items-center justify-between bg-white p-3 rounded-2xl border border-amber-100 shadow-sm"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{prize.prizeEmoji}</span>
                    <div className="text-start">
                      <p className="font-extrabold text-sm text-slate-800 leading-tight">
                        {prize.prizeTitle}
                      </p>
                      <p className="text-xs font-bold text-slate-500">
                        {MOCK_PROFILE.name} הגיע/ה ל-{prize.checkpoint} הצלחות!
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => ackPrizeReceived(prize.checkpoint)}
                    className="flex items-center justify-center p-2 bg-emerald-500 hover:bg-emerald-600 active:scale-95 text-white rounded-xl shadow-md border-b-4 border-emerald-700 transition-all font-black text-xs gap-1 whitespace-nowrap cursor-pointer"
                  >
                    <Check size={14} strokeWidth={3} />
                    <span>קיבל/ה</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="mb-6 text-center">
          <h1 className="text-2xl font-black text-slate-800 mb-1">
            {D.parentDashboard.headerCheeringFor}
          </h1>
          <p className="text-sm text-slate-500">{D.parentDashboard.tapAgent}</p>
        </div>

        <AgentGrid onSelectAgent={selectAgent} />
      </div>


      <PresetDrawer
        agent={selectedAgent}
        onSelectPreset={logNote}
        onClose={clearSelection}
        isLoading={isSubmitting}
      />

      <SuccessOverlay
        visible={showSuccess}
        message={D.parentDashboard.successLogged}
      />

      <ParentNameModal />
    </motion.div>
  );
}
