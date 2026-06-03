export type AgentId = "stop" | "check" | "effort" | "calm";

export type Agent = {
  id: AgentId;
  name: string;
  image: string;
  presets: string[];
};

export type KidProfile = {
  id: string;
  name: string;
  avatar: string;
  bgColor: string;
};

export type SuccessNote = {
  id: string;
  kidId: string;
  agentId: AgentId;
  text: string;
  createdAt: number;
  isRead: boolean;
  parentName?: string;
};

export type Prize = {
  checkpoint: number;
  title: string;
  description: string;
  emoji: string;
};

export type PrizeClaim = {
  id: string;
  kidId: string;
  checkpoint: number;
  status: "claimed" | "received";
  claimedAt: number;
  receivedAt: number | null;
  prizeTitle: string;
  prizeEmoji: string;
};

