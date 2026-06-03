import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { D, MOCK_PROFILE } from "@lib";
import { useNotes } from "@hooks";
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
