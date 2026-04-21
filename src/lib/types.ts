export type AgentId = "stop" | "check" | "effort";

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
};
