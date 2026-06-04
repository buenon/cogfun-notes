import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star } from "lucide-react";
import { type Prize, D } from "@lib";
import stardropIcon from "../assets/stardrop.png";

const SPARKLES_PRESETS = [
  { id: 0, left: "12%", top: "25%", duration: 2.5, size: 12 },
  { id: 1, left: "85%", top: "45%", duration: 3.1, size: 20 },
  { id: 2, left: "30%", top: "70%", duration: 2.1, size: 16 },
  { id: 3, left: "75%", top: "15%", duration: 3.8, size: 10 },
  { id: 4, left: "45%", top: "80%", duration: 2.9, size: 18 },
  { id: 5, left: "10%", top: "60%", duration: 3.4, size: 14 },
  { id: 6, left: "90%", top: "85%", duration: 2.3, size: 22 },
  { id: 7, left: "60%", top: "35%", duration: 3.6, size: 8 },
  { id: 8, left: "20%", top: "40%", duration: 2.8, size: 15 },
  { id: 9, left: "55%", top: "90%", duration: 3.3, size: 13 },
  { id: 10, left: "80%", top: "65%", duration: 2.6, size: 17 },
  { id: 11, left: "40%", top: "10%", duration: 3.0, size: 11 },
  { id: 12, left: "5%", top: "95%", duration: 3.9, size: 9 },
  { id: 13, left: "95%", top: "5%", duration: 2.2, size: 24 },
  { id: 14, left: "65%", top: "75%", duration: 3.5, size: 19 },
];

interface BrawlStarsClaimModalProps {
  isOpen: boolean;
  prize: Prize;
  onClaim: () => Promise<void>;
  onClose: () => void;
  initialStage?: "idle" | "revealed";
  claimStatus?: "claimed" | "received" | null;
}

type ClaimStage = "idle" | "shaking" | "opening" | "revealed";

export function BrawlStarsClaimModal({
  isOpen,
  prize,
  onClaim,
  onClose,
  initialStage = "idle",
  claimStatus = null,
}: BrawlStarsClaimModalProps) {
  const [stage, setStage] = useState<ClaimStage>(initialStage);
  const [prevIsOpen, setPrevIsOpen] = useState(isOpen);

  if (isOpen !== prevIsOpen) {
    setPrevIsOpen(isOpen);
    if (isOpen) {
      setStage(initialStage);
    }
  }

  const sparkles = useMemo(() => SPARKLES_PRESETS, []);


  const [particles, setParticles] = useState<{
    id: number;
    x: number;
    y: number;
    size: number;
    color: string;
    rotation: number;
    borderRadius: string;
  }[]>([]);

  if (!isOpen) return null;

  const triggerOpen = async () => {
    // Stage 1: Shake
    setStage("shaking");
    await new Promise((resolve) => setTimeout(resolve, 800));

    // Stage 2: Burst / Opening
    setStage("opening");
    
    // Generate particle burst
    const newParticles = Array.from({ length: 40 }, (_, i) => {
      const angle = Math.random() * Math.PI * 2;
      const velocity = Math.random() * 180 + 100;
      return {
        id: i,
        x: Math.cos(angle) * velocity,
        y: Math.sin(angle) * velocity,
        size: Math.random() * 16 + 8,
        color: ["#FBBF24", "#F59E0B", "#EF4444", "#10B981", "#3B82F6", "#8B5CF6", "#EC4899"][
          Math.floor(Math.random() * 7)
        ],
        rotation: Math.random() * 360,
        borderRadius: Math.random() > 0.5 ? "50%" : "20%",
      };
    });
    setParticles(newParticles);

    await new Promise((resolve) => setTimeout(resolve, 400));

    // Stage 3: Claim and Reveal
    await onClaim();
    setStage("revealed");
  };

  const handleFinish = () => {
    onClose();
    // Reset state after transition
    setTimeout(() => {
      setStage("idle");
      setParticles([]);
    }, 300);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="relative w-full max-w-sm bg-gradient-to-b from-amber-500 to-amber-700 rounded-[3rem] p-8 shadow-2xl border-4 border-amber-300 text-center overflow-hidden"
        >
          {/* Decorative Shiny Lines (Brawl Stars style) */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.15)_0%,transparent_70%)] pointer-events-none" />

          {stage !== "revealed" ? (
            <div className="flex flex-col items-center py-8">
              <h2 className="text-3xl font-black font-display text-white mb-6 drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)]">
                {D.brawlStarsClaimModal.milestoneReached}
              </h2>

              {/* Bouncy / Shaking Starr Drop Container */}
              <div className="relative w-48 h-48 flex items-center justify-center cursor-pointer select-none">
                <motion.img
                  src={stardropIcon}
                  alt="Starr Drop"
                  onClick={stage === "idle" ? triggerOpen : undefined}
                  animate={
                    stage === "shaking"
                      ? {
                          rotate: [0, -10, 10, -10, 10, -8, 8, -5, 5, 0],
                          scale: [1, 1.1, 1.1, 1.1, 1.1, 1.1, 1.1, 1.1, 1.1, 1],
                        }
                      : stage === "opening"
                        ? { scale: [1, 1.3, 0], opacity: [1, 1, 0] }
                        : { y: [0, -10, 0] }
                  }
                  transition={
                    stage === "shaking"
                      ? { duration: 0.8 }
                      : stage === "opening"
                        ? { duration: 0.4, ease: "easeInOut" }
                        : { repeat: Infinity, duration: 2, ease: "easeInOut" }
                  }
                  className="w-40 h-40 object-contain drop-shadow-2xl relative z-10"
                />

                {/* Pulsing Backlight */}
                {stage === "idle" && (
                  <motion.div
                    animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="absolute w-44 h-44 rounded-full bg-white blur-xl z-0"
                  />
                )}

                {/* Particle Burst Elements */}
                {particles.map((p) => (
                  <motion.div
                    key={p.id}
                    initial={{ x: 0, y: 0, scale: 1, rotate: 0 }}
                    animate={{ x: p.x, y: p.y, scale: 0, rotate: p.rotation }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="absolute w-4 h-4 rounded-full z-20 flex items-center justify-center"
                    style={{
                      width: p.size,
                      height: p.size,
                      backgroundColor: p.color,
                      borderRadius: p.borderRadius,
                    }}
                  />
                ))}
              </div>

              <p className="mt-8 text-lg font-black text-amber-100 bg-amber-800/40 px-6 py-2 rounded-full border border-amber-600/50">
                {stage === "shaking" ? D.brawlStarsClaimModal.opening : D.brawlStarsClaimModal.tapToOpen}
              </p>
            </div>
          ) : (
            // Revealed Stage
            <motion.div
              initial={{ scale: 0, rotateY: 180 }}
              animate={{ scale: 1, rotateY: 0 }}
              transition={{ type: "spring", damping: 15, stiffness: 100 }}
              className="flex flex-col items-center py-4"
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* Confetti/Background sparkles */}
              <div className="absolute inset-0 z-0 pointer-events-none">
                {sparkles.map((star) => (
                  <motion.div
                    key={star.id}
                    className="absolute text-yellow-300"
                    style={{
                      left: star.left,
                      top: star.top,
                    }}
                    animate={{
                      scale: [0.5, 1, 0.5],
                      opacity: [0.3, 0.8, 0.3],
                      rotate: [0, 360],
                    }}
                    transition={{
                      duration: star.duration,
                      repeat: Infinity,
                    }}
                  >
                    <Star size={star.size} fill="currentColor" />
                  </motion.div>
                ))}
              </div>

              {/* Glowing Emoji Badge */}
              <div className="relative z-10 w-32 h-32 rounded-full bg-white border-8 border-yellow-400 flex items-center justify-center text-7xl shadow-xl mb-6 transform hover:scale-110 transition-transform">
                <span className="drop-shadow-md select-none">{prize.emoji}</span>
              </div>

              {/* Prize Title */}
              <h2 className="relative z-10 text-4xl font-black font-display text-white mb-2 leading-none drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
                {prize.title}
              </h2>

              {/* Prize Description */}
              <p className="relative z-10 text-white/90 text-lg font-bold mb-8 max-w-[280px] bg-black/15 p-4 rounded-2xl border border-white/10">
                {prize.description}
              </p>

              {/* Status Indicator */}
              {claimStatus === "received" ? (
                <div className="relative z-10 bg-emerald-500 text-white font-black text-lg px-6 py-2.5 rounded-full border-4 border-emerald-300 shadow-md flex items-center justify-center gap-2 mb-8">
                  <span>{D.brawlStarsClaimModal.prizeReceived}</span>
                </div>
              ) : (
                <div className="relative z-10 bg-amber-500 text-white font-black text-lg px-6 py-2.5 rounded-full border-4 border-amber-300 shadow-md flex items-center justify-center gap-2 mb-8 animate-pulse">
                  <span>{D.brawlStarsClaimModal.waitingParentApproval}</span>
                </div>
              )}

              {/* Close Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleFinish}
                className="relative z-10 w-full py-4 bg-emerald-500 hover:bg-emerald-600 text-white font-black text-xl rounded-2xl border-b-8 border-emerald-700 shadow-lg transition-all"
              >
                {D.brawlStarsClaimModal.thankYou}
              </motion.button>
            </motion.div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
