import { motion } from "framer-motion";
import { ArrowRight, Gift, CheckCircle2, Lock, Clock } from "lucide-react";
import gemIcon from "../assets/icon_gem.png";
import stardropIcon from "../assets/stardrop.png";
import { useNavigate } from "react-router-dom";
import { D, MOCK_PROFILE, cn, PRIZES, type Prize } from "@lib";
import { useNotes, usePrizes } from "@hooks";
import { useEffect, useRef, useState } from "react";
import { NavigationHeader, BrawlStarsClaimModal } from "@components";


const MAX_NOTES = 200;
const STEP_SIZE = 20;
const STEPS = Array.from(
  { length: MAX_NOTES / STEP_SIZE },
  (_, i) => (i + 1) * STEP_SIZE,
);

export function GemRoadPage() {
  const navigate = useNavigate();
  const { notes, loading: notesLoading } = useNotes(MOCK_PROFILE.id);
  const { claims, claimPrize, loading: prizesLoading } = usePrizes(MOCK_PROFILE.id);
  const totalNotes = notes.length;
  const loading = notesLoading || prizesLoading;

  const [activeClaimPrize, setActiveClaimPrize] = useState<Prize | null>(null);
  const [modalInitialStage, setModalInitialStage] = useState<"idle" | "revealed">("idle");

  const handleNodeClick = (stepNotes: number) => {
    const isReached = totalNotes >= stepNotes;
    if (!isReached) return;

    const prize = PRIZES[stepNotes];
    if (!prize) return;

    const claimState = claims[stepNotes];
    if (!claimState) {
      setModalInitialStage("idle");
      setActiveClaimPrize(prize);
    } else {
      setModalInitialStage("revealed");
      setActiveClaimPrize(prize);
    }
  };

  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom (start of the road) when loaded
  useEffect(() => {
    if (scrollRef.current && !loading) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [loading]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-amber-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-500"></div>
      </div>
    );
  }

  return (
    <motion.div

      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="flex flex-col h-screen bg-amber-50 relative overflow-hidden"
    >
      {/* Header */}
      <NavigationHeader
        isSticky
        className="bg-white/80 border-amber-100"
        leftAction={
          <button
            onClick={() => navigate(-1)}
            className="p-2.5 bg-white rounded-full shadow-sm text-slate-600 hover:bg-slate-50 transition-colors border border-slate-200"
          >
            <ArrowRight size={22} />
          </button>
        }
        center={
          <h1 className="text-2xl font-black font-display text-amber-600">
            {D.gemRoad.title}
          </h1>
        }
        rightAction={
          <div className="flex items-center gap-2 bg-amber-100 text-amber-700 px-4 py-2 rounded-full font-bold">
            <img
              src={gemIcon}
              alt="gem"
              className="w-5 h-5 object-contain drop-shadow-sm"
            />
            <span>{totalNotes}</span>
          </div>
        }
      />

      {/* Road Container */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-8 relative flex flex-col items-center scroll-smooth"
      >
        <div className="relative w-full max-w-sm mx-auto flex flex-col items-center pb-16 pt-16">
          {/* Nodes mapped from top (200) to bottom (20) */}
          {[...STEPS].reverse().map((stepNotes) => {
            const isReached = totalNotes >= stepNotes;
            const isCurrentNext =
              stepNotes > totalNotes && stepNotes - totalNotes <= STEP_SIZE;

            const prevStep = stepNotes - STEP_SIZE;
            const isPartiallyFilled =
              totalNotes > prevStep && totalNotes < stepNotes;
            const fillPercentage = isReached
              ? 100
              : isPartiallyFilled
                ? ((totalNotes - prevStep) / STEP_SIZE) * 100
                : 0;

            const claimState = claims[stepNotes];
            const isUnclaimed = isReached && !claimState;
            const isClaimedPending = isReached && claimState?.status === "claimed";
            const isReceived = isReached && claimState?.status === "received";

            let nodeBgClass = "";
            if (isReceived) {
              nodeBgClass = "bg-emerald-500 border-white text-white shadow-lg cursor-pointer";
            } else if (isClaimedPending) {
              nodeBgClass = "bg-amber-100 border-amber-400 text-amber-600 shadow-md cursor-pointer";
            } else if (isUnclaimed) {
              nodeBgClass = "bg-gradient-to-br from-amber-400 to-yellow-500 border-white text-white cursor-pointer";
            } else {
              nodeBgClass = "bg-slate-100 border-slate-200 text-slate-400 opacity-80";
            }

            if (isCurrentNext) {
              nodeBgClass = "bg-white border-amber-400 text-amber-500 scale-110 shadow-amber-200 shadow-xl";
            }

            return (
              <div
                key={stepNotes}
                className="relative w-full flex flex-col items-center"
              >

                {/* Node */}
                <motion.div
                  whileHover={isReached ? { scale: 1.05 } : {}}
                  onClick={() => isReached && handleNodeClick(stepNotes)}
                  animate={
                    isUnclaimed
                      ? {
                          scale: [1.1, 1.18, 1.1],
                          boxShadow: [
                            "0 20px 25px -5px rgba(245, 158, 11, 0.4), 0 0 0 12px rgba(253, 224, 71, 0.2)",
                            "0 25px 30px -5px rgba(245, 158, 11, 0.7), 0 0 0 18px rgba(253, 224, 71, 0.4)",
                            "0 20px 25px -5px rgba(245, 158, 11, 0.4), 0 0 0 12px rgba(253, 224, 71, 0.2)",
                          ],
                        }
                      : {}
                  }
                  transition={
                    isUnclaimed
                      ? {
                          repeat: Infinity,
                          duration: 2,
                          ease: "easeInOut",
                        }
                      : undefined
                  }
                  className={cn(
                    "relative z-20 w-24 h-24 rounded-full border-4 flex flex-col items-center justify-center shadow-lg transition-all duration-500 select-none",
                    nodeBgClass
                  )}
                >
                  {isReceived ? (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="flex flex-col items-center"
                    >
                      <CheckCircle2 size={32} className="mb-1" />
                    </motion.div>
                  ) : isClaimedPending ? (
                    <motion.div
                      animate={{ scale: [1, 1.1, 1], rotate: [0, 360, 360] }}
                      transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                      className="flex flex-col items-center"
                    >
                      <Clock size={32} className="mb-1 text-amber-600" />
                    </motion.div>
                  ) : isUnclaimed ? (
                    <motion.img
                      src={stardropIcon}
                      alt="Starr Drop"
                      animate={{ scale: [1, 1.15, 1], rotate: [0, 6, -6, 0] }}
                      transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                      className="w-12 h-12 object-contain mb-1 drop-shadow-[0_2px_4px_rgba(0,0,0,0.15)] cursor-pointer"
                    />
                  ) : isCurrentNext ? (
                    <Gift
                      size={32}
                      className="mb-1 text-amber-400 animate-bounce"
                    />
                  ) : (
                    <Lock
                      size={32}
                      className="mb-1 text-slate-300"
                    />
                  )}
                  <span className="font-black text-2xl leading-none">{stepNotes}</span>

                  {/* Pulsing effect for the next target */}
                  {isCurrentNext && (
                    <div className="absolute inset-0 rounded-full border-4 border-amber-400 animate-ping opacity-20" />
                  )}

                  {/* Exact Match Box */}
                  {totalNotes === stepNotes && (
                    <div className="absolute top-1/2 left-full -translate-y-1/2 ml-4 bg-amber-500 text-white font-black text-lg pl-5 pr-4 py-1.5 rounded-xl border-4 border-amber-200 flex items-center justify-end gap-1.5 z-30 drop-shadow-md">
                      <div className="absolute top-1/2 -left-[11px] -translate-y-1/2 w-[18px] h-[18px] bg-amber-500 border-l-4 border-b-4 border-amber-200 rotate-45 rounded-sm z-20" />
                      <img
                        src={gemIcon}
                        alt="gem"
                        className="w-5 h-5 object-contain drop-shadow-sm relative z-10 shrink-0"
                      />
                      <span className="min-w-[1.2rem] text-center relative z-10">
                        {totalNotes}
                      </span>
                    </div>
                  )}
                </motion.div>

                {/* Track Segment (down to prevStep) */}
                <div className="w-8 h-16 relative z-0 -my-2">
                  {/* Continuous background for this segment */}
                  <div className="absolute inset-0 bg-amber-200/50" />

                  {/* Filled portion */}
                  {fillPercentage > 0 && (
                    <div
                      className="absolute bottom-0 w-full bg-amber-400 transition-all duration-1000 ease-out"
                      style={{ height: `${fillPercentage}%` }}
                    >
                      {/* Current Position Box for partially filled segment */}
                      {isPartiallyFilled && (
                        <div className="absolute top-0 left-full -translate-y-1/2 ml-4 bg-amber-500 text-white font-black text-lg pl-5 pr-4 py-1.5 rounded-xl border-4 border-amber-200 flex items-center justify-end gap-1.5 z-30 drop-shadow-md">
                          <div className="absolute top-1/2 -left-[11px] -translate-y-1/2 w-[18px] h-[18px] bg-amber-500 border-l-4 border-b-4 border-amber-200 rotate-45 rounded-sm z-20" />
                          <img
                            src={gemIcon}
                            alt="gem"
                            className="w-5 h-5 object-contain drop-shadow-sm relative z-10 shrink-0"
                          />
                          <span className="min-w-[1.2rem] text-center relative z-10">
                            {totalNotes}
                          </span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            );
          })}

          {/* Start Node (0) */}
          <div className="relative w-full flex flex-col items-center">
            <div className="relative z-20 w-20 h-20 rounded-full bg-white border-4 border-amber-200 flex flex-col items-center justify-center shadow-md text-amber-500">
              <img
                src={gemIcon}
                alt="gem"
                className="w-8 h-8 object-contain mb-1 drop-shadow-sm"
              />
              <span className="font-black text-xl">0</span>

              {/* Exact Match Box */}
              {totalNotes === 0 && (
                <div className="absolute top-1/2 left-full -translate-y-1/2 ml-4 bg-amber-500 text-white font-black text-lg pl-5 pr-4 py-1.5 rounded-xl border-4 border-amber-200 flex items-center justify-end gap-1.5 z-30 drop-shadow-md">
                  <div className="absolute top-1/2 -left-[11px] -translate-y-1/2 w-[18px] h-[18px] bg-amber-500 border-l-4 border-b-4 border-amber-200 rotate-45 rounded-sm z-20" />
                  <img
                    src={gemIcon}
                    alt="gem"
                    className="w-5 h-5 object-contain drop-shadow-sm relative z-10 shrink-0"
                  />
                  <span className="min-w-[1.2rem] text-center relative z-10">
                    {totalNotes}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {activeClaimPrize && (
        <BrawlStarsClaimModal
          isOpen={!!activeClaimPrize}
          prize={activeClaimPrize}
          initialStage={modalInitialStage}
          claimStatus={claims[activeClaimPrize.checkpoint]?.status || null}
          onClaim={() => claimPrize(activeClaimPrize.checkpoint)}
          onClose={() => setActiveClaimPrize(null)}
        />
      )}
    </motion.div>

  );
}
