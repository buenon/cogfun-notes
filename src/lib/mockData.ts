import { DICTIONARY } from './dictionary';
import mrStop from '../assets/mr-stop.png';
import mrCheck from '../assets/mr-check.png';
import mrEffort from '../assets/mr-effort.png';

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
  image: string;
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
    image: mrStop,
    theme: 'stop',
    presets: DICTIONARY.agents.stop.presets,
  },
  check: {
    id: 'check',
    name: DICTIONARY.agents.check.name,
    emoji: '🦉',
    image: mrCheck,
    theme: 'check',
    presets: DICTIONARY.agents.check.presets,
  },
  effort: {
    id: 'effort',
    name: DICTIONARY.agents.effort.name,
    emoji: '🦖',
    image: mrEffort,
    theme: 'effort',
    presets: DICTIONARY.agents.effort.presets,
  },
};
