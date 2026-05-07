import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User } from "lucide-react";
import { D } from "@lib";

export function ParentNameModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");

  useEffect(() => {
    const storedName = localStorage.getItem("parentName");
    if (!storedName) {
      setIsOpen(true);
    }
  }, []);

  const handleSave = () => {
    if (name.trim()) {
      localStorage.setItem("parentName", name.trim());
      setIsOpen(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm" dir="rtl">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="bg-white rounded-[2.5rem] p-8 w-full max-w-sm shadow-2xl flex flex-col items-center text-center border-2 border-indigo-100"
          >
            <div className="w-20 h-20 bg-indigo-100 rounded-3xl flex items-center justify-center text-indigo-500 mb-6 shadow-inner">
              <User size={40} />
            </div>
            
            <h2 className="text-2xl font-black text-slate-800 mb-3">
              {D.parentNameModal.title}
            </h2>
            
            <p className="text-slate-500 font-medium mb-8 leading-relaxed">
              {D.parentNameModal.description}
            </p>

            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={D.parentNameModal.inputPlaceholder}
              className="w-full bg-slate-50 border-2 border-slate-200 rounded-2xl p-4 text-center font-bold text-slate-800 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/20 outline-none transition-all mb-6"
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSave();
              }}
              autoFocus
            />

            <button
              onClick={handleSave}
              disabled={!name.trim()}
              className="w-full bg-indigo-600 text-white font-black py-4 rounded-2xl shadow-lg shadow-indigo-600/20 hover:bg-indigo-700 active:scale-95 transition-all disabled:opacity-50 disabled:active:scale-100"
            >
              {D.parentNameModal.saveButton}
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
