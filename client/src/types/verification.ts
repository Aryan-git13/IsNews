/**
 * Verification input source types supported by the platform.
 */
export type SourceType = 'TEXT' | 'IMAGE' | 'URL';

/**
 * Individual AI agent assessment verdict.
 */
export type AgentVerdict = 'SUPPORTS' | 'CONTRADICTS' | 'INSUFFICIENT';

/**
 * Consolidated final verification verdict by the Consensus Engine.
 */
export type FinalVerdict = 'REAL' | 'FAKE' | 'UNCERTAIN';

/**
 * Evidence item extracted during search or cross-referencing.
 */
export interface Evidence {
  title: string;
  url: string;
  source: string;
  sourceType?: string;
  publishedAt?: string;
  relevance?: number;
  supportsClaim?: boolean;
  summary: string;
}

/**
 * Analysis output from a single AI verification agent.
 */
export interface AgentResult {
  agent: string;
  verdict: AgentVerdict;
  confidence: number;
  summary: string;
  evidence?: Evidence[];
  sources?: string[];
}

/**
 * Complete multi-agent consensus verification output.
 */
export interface VerificationResult {
  verificationId: string;
  verdict: FinalVerdict;
  confidence: number;
  summary: string;
  claims?: string[];
  agentResults: AgentResult[];
  keyEvidence: Evidence[];
  explanation: string;
  factCheckTips?: string[];
  createdAt: string;
  sourceType?: SourceType;
  ocrText?: string;
  ocrConfidence?: number;
}
