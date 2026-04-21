import type { AgentId } from './types';

type ThemeClasses = {
  bg: string;
  text: string;
  border: string;
  hoverBg: string;
};

export const AGENT_THEME: Record<AgentId, ThemeClasses> = {
  stop: {
    bg: 'bg-indigo-100',
    text: 'text-indigo-900',
    border: 'border-indigo-200',
    hoverBg: 'hover:bg-indigo-50',
  },
  check: {
    bg: 'bg-orange-100',
    text: 'text-orange-900',
    border: 'border-orange-200',
    hoverBg: 'hover:bg-orange-50',
  },
  effort: {
    bg: 'bg-emerald-100',
    text: 'text-emerald-900',
    border: 'border-emerald-200',
    hoverBg: 'hover:bg-emerald-50',
  },
};
