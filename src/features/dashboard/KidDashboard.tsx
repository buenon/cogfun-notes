import { motion } from 'framer-motion';
import { ArrowLeft, Inbox, Award } from 'lucide-react';
import { AGENTS, MOCK_PROFILE } from '../../lib/mockData';
import { cn } from '../../lib/utils';
import { DICTIONARY } from '../../lib/dictionary';

export function KidDashboard() {
  const profile = MOCK_PROFILE;

  // Mock stats
  const unreadNotes = 3;
  const stats = { stop: 12, check: 8, effort: 15 };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className="flex flex-col min-h-screen bg-slate-50 relative"
    >
      <header className="p-6 pb-2 flex items-center justify-between">
        <a
          href="/"
          className="p-3 bg-white rounded-full shadow-sm text-slate-500 hover:text-slate-800 transition-colors"
        >
          <ArrowLeft size={24} />
        </a>
        <div className={cn("px-4 py-1.5 rounded-full text-sm font-bold flex items-center gap-2", profile.bgColor)}>
          <span>{profile.avatar}</span>
          {DICTIONARY.kidDashboard.box} {profile.name}
        </div>
      </header>

      <div className="flex-1 p-6 max-w-md mx-auto w-full flex flex-col gap-8">
        {/* Unread Box */}
        <motion.div 
          className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-100 flex items-center gap-6"
          whileHover={{ scale: 1.02 }}
        >
          <div className="bg-blue-100 text-blue-600 p-4 rounded-2xl">
            <Inbox size={32} />
          </div>
          <div>
            <h2 className="text-3xl font-black text-slate-800">{unreadNotes}</h2>
            <p className="text-slate-500 font-semibold">{DICTIONARY.kidDashboard.newNotes}</p>
          </div>
        </motion.div>

        {/* Agents Stats */}
        <div>
          <h3 className="text-xl font-extrabold text-slate-800 mb-4 flex items-center gap-2">
            <Award className="text-amber-500" />
            {DICTIONARY.kidDashboard.lifetimeSuccesses}
          </h3>
          <div className="grid grid-cols-1 gap-4">
            {Object.values(AGENTS).map((agent, i) => (
              <motion.div
                key={agent.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white p-4 rounded-3xl shadow-sm border border-slate-50 flex items-center justify-between"
              >
                <div className="flex items-center gap-4">
                  <span className="text-4xl bg-slate-50 p-3 rounded-2xl">{agent.emoji}</span>
                  <span className="font-bold text-lg text-slate-700">{agent.name}</span>
                </div>
                <div className="text-2xl font-black px-4 text-slate-400">
                  {stats[agent.id]}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
