import type { Agent } from '../../../lib/types';
import { BottomSheet } from '../../../components/BottomSheet';
import { DICTIONARY } from '../../../lib/dictionary';
import { cn } from '../../../lib/utils';

type PresetDrawerProps = {
  agent: Agent | null;
  onSelectPreset: (preset: string) => void;
  onClose: () => void;
};

export function PresetDrawer({ agent, onSelectPreset, onClose }: PresetDrawerProps) {
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
      <div className="flex flex-col gap-3">
        {agent?.presets.map((preset, index) => (
          <button
            key={index}
            onClick={() => onSelectPreset(preset)}
            className={cn(
              'p-4 rounded-2xl text-start font-semibold text-lg transition-colors border-2 border-transparent',
              'bg-slate-50 text-slate-700 hover:bg-slate-100 active:bg-slate-200',
            )}
          >
            {preset}
          </button>
        ))}

        <button className="p-4 rounded-2xl text-start font-semibold text-lg border-2 border-dashed border-slate-300 text-slate-500 mt-2 flex items-center justify-center">
          {DICTIONARY.parentDashboard.customNote}
        </button>
      </div>
    </BottomSheet>
  );
}
