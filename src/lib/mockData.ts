import type { Agent, AgentId, KidProfile } from "./types";
import { D } from "./dictionary";
import mrStop from "../assets/mr-stop.png";
import mrCheck from "../assets/mr-check.png";
import mrEffort from "../assets/mr-effort.png";

export const MOCK_PROFILE: KidProfile = {
  id: "bar",
  name: D.mockProfile.name,
  avatar: "🦁",
  bgColor: "bg-blue-100 text-blue-800",
};

export const AGENTS: Record<AgentId, Agent> = {
  stop: {
    id: "stop",
    name: D.agents.stop.name,
    image: mrStop,
    presets: D.agents.stop.presets,
  },
  check: {
    id: "check",
    name: D.agents.check.name,
    image: mrCheck,
    presets: D.agents.check.presets,
  },
  effort: {
    id: "effort",
    name: D.agents.effort.name,
    image: mrEffort,
    presets: D.agents.effort.presets,
  },
};
