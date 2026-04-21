import { motion } from 'framer-motion';
import { Inbox, Award } from 'lucide-react';
import { DashboardHeader } from '../../components/DashboardHeader';
import { AgentStatCard } from './components/AgentStatCard';
import { AGENTS, MOCK_PROFILE } from '../../lib/mockData';
import { DICTIONARY } from '../../lib/dictionary';
import type { AgentId } from '../../lib/types';

// TODO: Replace with real data source
const MOCK_STATS: Record<AgentId, number> = { stop: 12, check: 8, effort: 15 };
const MOCK_UNREAD = 3;

export function KidDashboard() {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className="flex flex-col min-h-screen bg-slate-50 relative"
    >
      <DashboardHeader
        profileName={MOCK_PROFILE.name}
        profileAvatar={MOCK_PROFILE.avatar}
        profileBgColor={MOCK_PROFILE.bgColor}
        label={DICTIONARY.kidDashboard.box}
      />

      <div className="flex-1 p-6 max-w-md mx-auto w-full flex flex-col gap-8">
        <motion.div
          className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-100 flex items-center gap-6"
          whileHover={{ scale: 1.02 }}
        >
          <div className="bg-blue-100 text-blue-600 p-4 rounded-2xl">
            <Inbox size={32} />
          </div>
          <div>
            <h2 className="text-3xl font-black text-slate-800">
              {MOCK_UNREAD}
            </h2>
            <p className="text-slate-500 font-semibold">
              {DICTIONARY.kidDashboard.newNotes}
            </p>
          </div>
        </motion.div>

        <div>
          <h3 className="text-xl font-extrabold text-slate-800 mb-4 flex items-center gap-2">
            <Award className="text-amber-500" />
            {DICTIONARY.kidDashboard.lifetimeSuccesses}
          </h3>
          <div className="grid grid-cols-1 gap-4">
            {Object.values(AGENTS).map((agent, index) => (
              <AgentStatCard
                key={agent.id}
                agent={agent}
                count={MOCK_STATS[agent.id]}
                index={index}
              />
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
