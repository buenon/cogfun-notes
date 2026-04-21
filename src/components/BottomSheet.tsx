import type { ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

type BottomSheetProps = {
  open: boolean;
  onClose: () => void;
  title?: string;
  icon?: ReactNode;
  children: ReactNode;
};

const SPRING = { type: 'spring', damping: 25, stiffness: 200 } as const;

export function BottomSheet({
  open,
  onClose,
  title,
  icon,
  children,
}: BottomSheetProps) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/40 z-40 backdrop-blur-sm"
          />
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={SPRING}
            className="fixed bottom-0 left-0 right-0 bg-white rounded-t-[2.5rem] p-6 pt-8 z-50 shadow-2xl pb-12"
          >
            <div className="absolute top-4 left-1/2 -translate-x-1/2 w-12 h-1.5 bg-slate-200 rounded-full" />

            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                {icon}
                {title && (
                  <h3 className="text-2xl font-bold text-slate-800">{title}</h3>
                )}
              </div>
              <button
                onClick={onClose}
                className="p-2 bg-slate-100 text-slate-500 rounded-full hover:bg-slate-200"
              >
                <X size={24} />
              </button>
            </div>

            {children}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
