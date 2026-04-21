import { CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type SuccessOverlayProps = {
  visible: boolean;
  message: string;
};

export function SuccessOverlay({ visible, message }: SuccessOverlayProps) {
  return (
    <AnimatePresence>
      {visible && (
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
            <h2 className="text-2xl font-bold">{message}</h2>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
