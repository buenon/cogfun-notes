import type { AgentId } from "@lib";

type ThemeClasses = {
  bg: string;
  text: string;
  border: string;
  hoverBg: string;
  accent: string;
  lightBg: string;
};

export const AGENT_THEME: Record<AgentId, ThemeClasses> = {
  stop: {
    bg: "bg-rose-100",
    text: "text-rose-900",
    border: "border-rose-200",
    hoverBg: "hover:bg-rose-50",
    accent: "text-rose-600",
    lightBg: "bg-rose-50",
  },
  check: {
    bg: "bg-orange-100",
    text: "text-orange-900",
    border: "border-orange-200",
    hoverBg: "hover:bg-orange-50",
    accent: "text-orange-600",
    lightBg: "bg-orange-50",
  },
  effort: {
    bg: "bg-emerald-100",
    text: "text-emerald-900",
    border: "border-emerald-200",
    hoverBg: "hover:bg-emerald-50",
    accent: "text-emerald-600",
    lightBg: "bg-emerald-50",
  },
  calm: {
    bg: "bg-sky-100",
    text: "text-sky-900",
    border: "border-sky-200",
    hoverBg: "hover:bg-sky-50",
    accent: "text-sky-600",
    lightBg: "bg-sky-50",
  },
};

export const UI_THEME = {
  unread: AGENT_THEME.stop,
  parent: AGENT_THEME.stop,
  kid: AGENT_THEME.check,
};
