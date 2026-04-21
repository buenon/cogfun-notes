import { motion } from "framer-motion";
import { type Agent } from "@lib";

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
      className="bg-white p-4 rounded-3xl shadow-sm border border-slate-50 flex items-center justify-between"
    >
      <div className="flex items-center gap-4">
        <img
          src={agent.image}
          alt={agent.name}
          className="w-16 h-16 object-contain bg-slate-50 p-2 rounded-2xl"
        />
        <span className="font-bold text-lg text-slate-700">{agent.name}</span>
      </div>
      <div className="text-2xl font-black font-display px-4 text-slate-400">
        {count}
      </div>
    </motion.div>
  );
}
