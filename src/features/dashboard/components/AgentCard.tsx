import { motion } from "framer-motion";
import type { Agent } from "../../../lib/types";
import { AGENT_THEME } from "../../../lib/theme";
import { cn } from "../../../lib/utils";
import { D } from "../../../lib/dictionary";

type AgentCardProps = {
  agent: Agent;
  index: number;
  onSelect: (agent: Agent) => void;
};

export function AgentCard({ agent, index, onSelect }: AgentCardProps) {
  const theme = AGENT_THEME[agent.id];

  return (
    <motion.button
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => onSelect(agent)}
      className={cn(
        "flex items-center p-6 rounded-3xl border-b-4 transition-all shadow-sm relative overflow-hidden",
        theme.bg,
        theme.text,
        theme.border,
        theme.hoverBg,
      )}
    >
      <div className="me-6 z-10 bg-white/40 p-4 rounded-2xl w-32 h-32 flex items-center justify-center shrink-0">
        <img
          src={agent.image}
          alt={agent.name}
          className="w-24 h-24 object-contain"
        />
      </div>
      <div className="text-start z-10">
        <h2 className="text-2xl font-black mb-1">{agent.name}</h2>
        <p className="text-sm font-semibold opacity-70">
          {D.parentDashboard.logMoment} {agent.name}
        </p>
      </div>
    </motion.button>
  );
}
