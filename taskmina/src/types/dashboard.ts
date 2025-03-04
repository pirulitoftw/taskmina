export interface UrgentTasksResponse {
  tasks: Task[];
  count: number;
}

export interface PrioritySummary {
  total: number;
  completed: number;
  pending: number;
}

export interface PrioritySummaryResponse {
  high: PrioritySummary;
  medium: PrioritySummary;
  low: PrioritySummary;
}

export interface DailyProgress {
  date: string;
  completed: number;
  created: number;
}

export interface WeeklyProgressResponse {
  weeklyStats: {
    totalCreated: number;
    completed: number;
    completionRate: number;
    dailyProgress: DailyProgress[];
  };
}
