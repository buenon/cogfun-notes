import { motion } from "framer-motion";
import { AGENT_THEME, cn, type Agent } from "@lib";

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
        "flex flex-col items-center justify-center p-2 pb-4 rounded-3xl border-b-4 transition-all shadow-sm relative overflow-hidden text-center w-full h-full",
        theme.bg,
        theme.text,
        theme.border,
        theme.hoverBg,
      )}
    >
      <div className="z-10 bg-white/40 p-1.5 rounded-[20px] w-[80%] max-w-[150px] aspect-square flex items-center justify-center shrink-0 mb-2">
        <img
          src={agent.image}
          alt={agent.name}
          width={110}
          height={110}
          loading="eager"
          decoding="sync"
          className="w-[90%] h-[90%] object-contain aspect-square"
        />
      </div>
      <div className="z-10 flex flex-col items-center">
        <h2 className="text-2xl font-black leading-tight">{agent.name}</h2>
      </div>
    </motion.button>
  );
}
