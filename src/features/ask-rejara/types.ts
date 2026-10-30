/**
 * Ask Rejara Conversational Types
 * Synchronized with GuidanceModule & AskRejaraHome (rejara-frontend)
 */

export type MessageRole = 'user' | 'assistant' | 'system';

export interface HistoryTurn {
  role: 'user' | 'assistant';
  content: string;
}

export interface AskRejaraRequestPayload {
  query: string;
  user_key: string;
  platform_id?: number | null;
  platform?: string;
  history?: HistoryTurn[];
  context?: {
    category?: string;
    careRecipientId?: string;
  };
}

export interface SuggestedAction {
  id: string;
  label: string;
  actionType: 'task' | 'navigation' | 'inquiry' | 'plan';
  payload?: Record<string, unknown>;
}

export interface AskRejaraStreamEvent {
  phase?: 'lookup' | 'plan' | 'complete' | 'error';
  text?: string;
  detail?: string;
  listings?: unknown[];
  actions?: SuggestedAction[];
  plan?: Record<string, unknown>;
}

export interface ConversationMessage {
  id: string;
  role: MessageRole;
  content: string;
  createdAt: string;
  isError?: boolean;
  suggestedActions?: SuggestedAction[];
}

export interface ConversationHistoryItem {
  id: string;
  user_id: string;
  query: string;
  response: string;
  created_at: string;
  actions?: SuggestedAction[];
}
