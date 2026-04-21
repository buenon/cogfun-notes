export type AgentId = 'stop' | 'check' | 'effort';

export type Agent = {
  id: AgentId;
  name: string;
  emoji: string;
  image: string;
  presets: string[];
};

export type KidProfile = {
  id: string;
  name: string;
  avatar: string;
  bgColor: string;
};
