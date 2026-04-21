import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { D, MOCK_PROFILE } from "@lib";
import { useNoteLogger } from "@hooks";
import {
  AgentGrid,
  DashboardHeader,
  PresetDrawer,
  SuccessOverlay,
} from "@components";

export function ParentDashboard() {
  const { selectedAgent, showSuccess, selectAgent, clearSelection, logNote } =
    useNoteLogger();

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="flex flex-col min-h-screen bg-slate-50 relative"
    >
      <div className="flex-1 p-6 max-w-md mx-auto w-full flex flex-col">
        <div className="mb-10 text-center">
          <Link to="/kid">
            <DashboardHeader
              profileName={MOCK_PROFILE.name}
              profileAvatar={MOCK_PROFILE.avatar}
              profileBgColor={MOCK_PROFILE.bgColor}
            />
          </Link>
          <h1 className="text-3xl font-extrabold text-slate-800 mb-2">
            {D.parentDashboard.headerCheeringFor}
          </h1>
          <p className="text-slate-500">{D.parentDashboard.tapAgent}</p>
        </div>

        <AgentGrid onSelectAgent={selectAgent} />
      </div>

      <PresetDrawer
        agent={selectedAgent}
        onSelectPreset={logNote}
        onClose={clearSelection}
      />

      <SuccessOverlay
        visible={showSuccess}
        message={D.parentDashboard.successLogged}
      />
    </motion.div>
  );
}
