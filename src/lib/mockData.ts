import { DICTIONARY } from './dictionary';

export type KidProfile = {
  id: string;
  name: string;
  avatar: string;
  bgColor: string;
};

export type AgentId = 'stop' | 'check' | 'effort';

export type Agent = {
  id: AgentId;
  name: string;
  emoji: string;
  theme: string;
  presets: string[];
};

export const MOCK_PROFILE: KidProfile = {
  id: 'leo',
  name: DICTIONARY.mockProfile.name,
  avatar: '🦁',
  bgColor: 'bg-blue-100 text-blue-800'
};

export const AGENTS: Record<AgentId, Agent> = {
  stop: {
    id: 'stop',
    name: DICTIONARY.agents.stop.name,
    emoji: '🐳',
    theme: 'stop',
    presets: DICTIONARY.agents.stop.presets,
  },
  check: {
    id: 'check',
    name: DICTIONARY.agents.check.name,
    emoji: '🦉',
    theme: 'check',
    presets: DICTIONARY.agents.check.presets,
  },
  effort: {
    id: 'effort',
    name: DICTIONARY.agents.effort.name,
    emoji: '🦖',
    theme: 'effort',
    presets: DICTIONARY.agents.effort.presets,
  },
};
