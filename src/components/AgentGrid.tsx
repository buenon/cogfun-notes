import { AGENTS, type Agent } from "@lib";
import { AgentCard } from "@components";

type AgentGridProps = {
  onSelectAgent: (agent: Agent) => void;
};

export function AgentGrid({ onSelectAgent }: AgentGridProps) {
  return (
    <div className="grid grid-cols-2 grid-rows-2 gap-3 flex-1">
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
