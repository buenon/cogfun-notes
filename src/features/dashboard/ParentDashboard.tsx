import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, CheckCircle2, X } from 'lucide-react';
import { AGENTS, MOCK_PROFILE } from '../../lib/mockData';
import type { Agent } from '../../lib/mockData';
import { cn } from '../../lib/utils';
import { DICTIONARY } from '../../lib/dictionary';

export function ParentDashboard() {
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);

  const profile = MOCK_PROFILE;

  const handleLogNote = (preset: string) => {
    console.log(`Logged note for ${profile.name} with ${selectedAgent?.name}: ${preset}`);
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      setSelectedAgent(null);
    }, 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="flex flex-col min-h-screen bg-slate-50 relative"
    >
      {/* Header */}
      <header className="p-6 pb-2 flex items-center justify-between">
        <a
          href="/"
          className="p-3 bg-white rounded-full shadow-sm text-slate-500 hover:text-slate-800 transition-colors"
        >
          <ArrowLeft size={24} />
        </a>
        <div className={cn("px-4 py-1.5 rounded-full text-sm font-bold flex items-center gap-2", profile.bgColor)}>
          <span>{profile.avatar}</span>
          {profile.name}
        </div>
      </header>

      <div className="flex-1 p-6 max-w-md mx-auto w-full flex flex-col">
        <div className="mb-10 text-center">
          <h1 className="text-3xl font-extrabold text-slate-800 mb-2">
            {DICTIONARY.parentDashboard.headerCheeringFor}
          </h1>
          <p className="text-slate-500">{DICTIONARY.parentDashboard.tapAgent}</p>
        </div>

        {/* Big 3 Agent Buttons */}
        <div className="flex flex-col gap-6 flex-1 justify-center pb-12">
          {Object.values(AGENTS).map((agent, i) => (
            <motion.button
              key={agent.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSelectedAgent(agent)}
              className={cn(
                "flex items-center p-6 rounded-3xl border-b-4 transition-all shadow-sm relative overflow-hidden",
                agent.theme === 'stop' && "bg-indigo-100 text-indigo-900 border-indigo-200 hover:bg-indigo-50",
                agent.theme === 'check' && "bg-orange-100 text-orange-900 border-orange-200 hover:bg-orange-50",
                agent.theme === 'effort' && "bg-emerald-100 text-emerald-900 border-emerald-200 hover:bg-emerald-50",
              )}
            >
              <div className="text-6xl me-6 z-10 bg-white/40 p-4 rounded-2xl">
                {agent.emoji}
              </div>
              <div className="text-start z-10">
                <h2 className="text-2xl font-black mb-1">{agent.name}</h2>
                <p className="text-sm font-semibold opacity-70">{DICTIONARY.parentDashboard.logMoment} {agent.name}</p>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Slide-up Drawer for Presets */}
      <AnimatePresence>
        {selectedAgent && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedAgent(null)}
              className="fixed inset-0 bg-slate-900/40 z-40 backdrop-blur-sm"
            />
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed bottom-0 left-0 right-0 bg-white rounded-t-[2.5rem] p-6 pt-8 z-50 shadow-2xl pb-12"
            >
              <div className="absolute top-4 left-1/2 -translate-x-1/2 w-12 h-1.5 bg-slate-200 rounded-full" />
              
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <span className="text-4xl bg-slate-100 p-2 rounded-xl">{selectedAgent.emoji}</span>
                  <h3 className="text-2xl font-bold text-slate-800">{selectedAgent.name}</h3>
                </div>
                <button 
                  onClick={() => setSelectedAgent(null)}
                  className="p-2 bg-slate-100 text-slate-500 rounded-full hover:bg-slate-200"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="flex flex-col gap-3">
                {selectedAgent.presets.map((preset, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleLogNote(preset)}
                    className={cn(
                      "p-4 rounded-2xl text-start font-semibold text-lg transition-colors border-2 border-transparent",
                      "bg-slate-50 text-slate-700 hover:bg-slate-100 active:bg-slate-200"
                    )}
                  >
                    {preset}
                  </button>
                ))}
                
                <button
                  className="p-4 rounded-2xl text-start font-semibold text-lg border-2 border-dashed border-slate-300 text-slate-500 mt-2 flex items-center justify-center"
                >
                  {DICTIONARY.parentDashboard.customNote}
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Success Overlay */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 backdrop-blur-md"
          >
            <motion.div
              initial={{ y: 20 }}
              animate={{ y: 0 }}
              className="bg-emerald-100 text-emerald-800 p-8 rounded-3xl flex flex-col items-center shadow-xl"
            >
              <CheckCircle2 size={64} className="mb-4 text-emerald-600" />
              <h2 className="text-2xl font-bold">{DICTIONARY.parentDashboard.successLogged}</h2>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
