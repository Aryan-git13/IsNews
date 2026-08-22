import React from 'react';
import { Cpu } from 'lucide-react';
import './common.css';

export interface AgentItem {
  name: string;
  status: string;
  detail: string;
}

export interface AgentStatusProps {
  agents: AgentItem[];
  title?: string;
}

export const AgentStatus: React.FC<AgentStatusProps> = ({
  agents,
  title = 'Multi-Agent Execution Log',
}) => {
  return (
    <div className="agent-breakdown-card">
      <h3 className="agent-breakdown-title">
        <Cpu size={20} className="header-icon" /> {title}
      </h3>
      <div className="agent-list">
        {agents.map((agent, idx) => (
          <div key={idx} className="agent-item">
            <div className="agent-header">
              <span className="agent-name">{agent.name}</span>
              <span className="agent-status">{agent.status}</span>
            </div>
            <p className="agent-detail">{agent.detail}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
