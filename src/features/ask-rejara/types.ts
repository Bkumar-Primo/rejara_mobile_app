export type MessageRole = 'user' | 'assistant' | 'system';

export interface SuggestedAction {
  id: string;
  label: string;
  actionType: 'task' | 'navigation' | 'inquiry';
  payload?: Record<string, unknown>;
}

export interface ConversationMessage {
  id: string;
  role: MessageRole;
  content: string;
  createdAt: string;
  suggestedActions?: SuggestedAction[];
}

export interface ConversationThread {
  id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  lastMessageSnippet?: string;
}

export interface AskRejaraSendPayload {
  message: string;
  threadId?: string;
  context?: {
    careRecipientId?: string;
    category?: string;
  };
}
