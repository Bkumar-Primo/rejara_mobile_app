/**
 * Rejara Care Tasks & Plans Types
 * Synchronized with TaskListing and Tasks API (rejara-frontend)
 */

export type TaskPriority = 'low' | 'medium' | 'high';
export type TaskStatus = 'open' | 'completed' | 'pending' | 'in_progress';

export interface CareTask {
  id: string;
  taskId?: string;
  taskInstanceId?: string;
  title: string;
  taskName?: string;
  description?: string;
  dueDate?: string | null;
  dueTime?: string | null;
  priority: TaskPriority;
  status: TaskStatus;
  category?: string;
  planKey?: string | null;
  planLabel?: string;
  assigneeId?: string | null;
  assigneeName?: string | null;
  createdById?: string;
  createdByName?: string | null;
  notes?: string;
  isReminder?: boolean;
  createdAt?: string;
}

export interface CreateTaskPayload {
  taskName: string;
  description?: string;
  dueDate?: string | null;
  priority?: TaskPriority;
  assigneeId?: string | null;
  planKey?: string;
  category?: string;
}
