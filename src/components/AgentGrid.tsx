import { AGENTS, type Agent } from "@lib";
import { AgentCard } from "@components";

type AgentGridProps = {
  onSelectAgent: (agent: Agent) => void;
};

export function AgentGrid({ onSelectAgent }: AgentGridProps) {
  return (
    <div className="flex flex-col gap-6 flex-1 justify-center">
      {Object.values(AGENTS).map((agent, index) => (
        <AgentCard
          key={agent.id}
          agent={agent}
          index={index}
          onSelect={onSelectAgent}
        />
      ))}
    </div>
  );
}
