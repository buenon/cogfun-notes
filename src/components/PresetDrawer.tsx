import { useState, useEffect } from "react";
import { Send, Loader2 } from "lucide-react";
import { BottomSheet } from "@components";
import { D, cn, type Agent } from "@lib";

type PresetDrawerProps = {
  agent: Agent | null;
  onSelectPreset: (preset: string) => void;
  onClose: () => void;
  isLoading?: boolean;
};

export function PresetDrawer({
  agent,
  onSelectPreset,
  onClose,
  isLoading = false,
}: PresetDrawerProps) {
  const [customText, setCustomText] = useState("");

  // Reset text when drawer closes or agent changes
  useEffect(() => {
    if (!agent) setCustomText("");
  }, [agent]);

  const handleSubmitCustom = () => {
    if (customText.trim() && !isLoading) {
      onSelectPreset(customText.trim());
      setCustomText("");
    }
  };

  return (
    <BottomSheet
      open={agent !== null}
      onClose={onClose}
      title={agent?.name}
      icon={
        agent && (
          <img
            src={agent.image}
            alt={agent.name}
            className="w-16 h-16 object-contain bg-slate-100 p-2 rounded-xl"
          />
        )
      }
    >
      <div className={cn("flex flex-col gap-3 transition-opacity", isLoading && "opacity-60 pointer-events-none")}>
        <div className="flex flex-col gap-2">
          {agent?.presets.map((preset, index) => (
            <button
              key={index}
              disabled={isLoading}
              onClick={() => onSelectPreset(preset)}
              className={cn(
                "p-4 rounded-2xl text-start font-semibold text-lg transition-colors border-2 border-transparent",
                "bg-slate-50 text-slate-700 hover:bg-slate-100 active:bg-slate-200 disabled:cursor-not-allowed",
              )}
            >
              {preset}
            </button>
          ))}
        </div>

        <div className="mt-4 pt-4 border-t border-slate-100">
          <div className="relative">
            <input
              type="text"
              disabled={isLoading}
              value={customText}
              onChange={(e) => setCustomText(e.target.value)}
              placeholder={D.parentDashboard.customNote}
              className="w-full p-4 pr-14 rounded-2xl bg-slate-50 border-2 border-slate-100 focus:border-indigo-500 focus:bg-white outline-none font-semibold text-lg transition-all disabled:cursor-not-allowed"
              onKeyDown={(e) => e.key === "Enter" && handleSubmitCustom()}
            />
            <button
              onClick={handleSubmitCustom}
              disabled={!customText.trim() || isLoading}
              className="absolute left-2 top-2 bottom-2 w-10 flex items-center justify-center bg-indigo-600 text-white rounded-xl disabled:bg-slate-200 disabled:text-slate-400 transition-colors"
            >
              {isLoading ? (
                <Loader2 size={20} className="animate-spin" />
              ) : (
                <Send size={20} />
              )}
            </button>
          </div>
        </div>
      </div>
    </BottomSheet>
  );
}
