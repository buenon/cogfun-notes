import type { Agent, AgentId, KidProfile } from './types';
import { DICTIONARY } from './dictionary';
import mrStop from '../assets/mr-stop.png';
import mrCheck from '../assets/mr-check.png';
import mrEffort from '../assets/mr-effort.png';

export const MOCK_PROFILE: KidProfile = {
  id: 'leo',
  name: DICTIONARY.mockProfile.name,
  avatar: '🦁',
  bgColor: 'bg-blue-100 text-blue-800',
};

export const AGENTS: Record<AgentId, Agent> = {
  stop: {
    id: 'stop',
    name: DICTIONARY.agents.stop.name,
    emoji: '🐳',
    image: mrStop,
    presets: DICTIONARY.agents.stop.presets,
  },
  check: {
    id: 'check',
    name: DICTIONARY.agents.check.name,
    emoji: '🦉',
    image: mrCheck,
    presets: DICTIONARY.agents.check.presets,
  },
  effort: {
    id: 'effort',
    name: DICTIONARY.agents.effort.name,
    emoji: '🦖',
    image: mrEffort,
    presets: DICTIONARY.agents.effort.presets,
  },
};
