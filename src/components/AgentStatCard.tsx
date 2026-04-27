import { motion } from "framer-motion";
import { type Agent, getGemImage, AGENT_THEME, cn } from "@lib";

type AgentStatCardProps = {
  agent: Agent;
  count: number;
  index: number;
};

export function AgentStatCard({ agent, count, index }: AgentStatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className={cn(
        "bg-white p-4 rounded-3xl shadow-sm border-2 flex items-center justify-between",
        AGENT_THEME[agent.id].border,
      )}
    >
      <div className="flex items-center gap-4">
        <img
          src={agent.image}
          alt={agent.name}
          width={64}
          height={64}
          loading="eager"
          decoding="sync"
          className="w-16 h-16 object-contain aspect-square bg-slate-50 p-2 rounded-2xl"
        />
        <span className="font-bold text-lg text-slate-700">{agent.name}</span>
      </div>
      <div className="flex items-center gap-2">
        <div className="text-2xl font-black font-display text-slate-400 w-10 text-center">
          {count}
        </div>
        <div className="w-16 h-16 flex items-center justify-center shrink-0">
          {count > 0 && (
            <img
              src={getGemImage(count) || ""}
              alt="gem"
              className="w-full h-full object-contain"
            />
          )}
        </div>
      </div>
    </motion.div>
  );
}
