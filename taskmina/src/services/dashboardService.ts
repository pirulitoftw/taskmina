import { apiClient } from '../utils/apiClient.ts';
import { UrgentTasksResponse, PrioritySummaryResponse, WeeklyProgressResponse } from '../types/dashboard';

export const dashboardService = {
  getUrgentTasks: async () => {
    const token = localStorage.getItem('auth_token');
    const response = await apiClient.get<{ success: boolean; data: UrgentTasksResponse }>('/tasks/urgent', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  },

  getPrioritySummary: async () => {
    const token = localStorage.getItem('auth_token');
    const response = await apiClient.get<{ success: boolean; data: PrioritySummaryResponse }>('/tasks/priority-summary', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    if(response.data.success === true) {
        let { high, medium, low } = response.data.data
        const pendingTasks = high.pending + medium.pending + low.pending;
        return { ...response.data, pendingTasks };
     }
        return response.data;
   
  },

  getWeeklyProgress: async () => {
    const token = localStorage.getItem('auth_token');
    try {
      const response = await apiClient.get<{ success: boolean; data: WeeklyProgressResponse }>('/tasks/weekly-progress', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};
