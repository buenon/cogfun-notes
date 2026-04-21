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
  name: 'Leo',
  avatar: '🦁',
  bgColor: 'bg-blue-100 text-blue-800'
};

export const AGENTS: Record<AgentId, Agent> = {
  stop: {
    id: 'stop',
    name: 'Mr. Stop',
    emoji: '🐳',
    theme: 'stop',
    presets: [
      'Stopped to think before acting',
      'Took a deep breath when frustrated',
      'Waited patiently for a turn'
    ],
  },
  check: {
    id: 'check',
    name: 'Mr. Check',
    emoji: '🦉',
    theme: 'check',
    presets: [
      'Checked work carefully',
      'Noticed a mistake and fixed it',
      'Followed all instructions'
    ],
  },
  effort: {
    id: 'effort',
    name: 'Mr. Effort',
    emoji: '🦖',
    theme: 'effort',
    presets: [
      'Kept trying when it was hard',
      'Finished a difficult task',
      'Showed great energy and focus'
    ],
  },
};
