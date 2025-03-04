import axios from 'axios';
import axiosInstance from '../config/axios';
import { ENDPOINTS } from '../config/endpoints';
import { Task } from '../types';

interface TaskResponse {
  success: boolean;
  data?: Task | Task[];
  message?: string;
  error?: string;
}

export const taskService = {
  async createTask(
    title: string,
    description: string | undefined,
    dueDate: string | undefined,
    priority: 'high' | 'medium' | 'low'
  ): Promise<TaskResponse> {
    try {
      const response = await axiosInstance.post(ENDPOINTS.TASK_CREATE, {
        title,
        description,
        dueDate,
        priority
      });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.data) {
        return {
          success: false,
          error: error.response.data.error || 'Error al crear la tarea.'
        };
      }
      return {
        success: false,
        error: 'Error de conexión. Por favor, intenta nuevamente.'
      };
    }
  },

  async updateTask(
    id: string,
    title: string,
    description: string | undefined,
    completed: boolean,
    dueDate: string | undefined,
    priority: 'high' | 'medium' | 'low'
  ): Promise<TaskResponse> {
    if (!id) {
      return {
        success: false,
        error: 'ID de tarea no válido'
      };
    }

    try {
      const response = await axiosInstance.put(`${ENDPOINTS.TASK_UPDATE.replace(':id', id)}`, {
        title,
        description,
        completed,
        dueDate,
        priority
      });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.data) {
        return {
          success: false,
          error: error.response.data.error || 'Error al actualizar la tarea.'
        };
      }
      return {
        success: false,
        error: 'Error de conexión. Por favor, intenta nuevamente.'
      };
    }
  },

  async deleteTask(id: string): Promise<TaskResponse> {
    try {
      const response = await axiosInstance.delete(ENDPOINTS.TASK_DELETE.replace(':id', id));
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.data) {
        return {
          success: false,
          error: error.response.data.error || 'Error al eliminar la tarea.'
        };
      }
      return {
        success: false,
        error: 'Error de conexión. Por favor, intenta nuevamente.'
      };
    }
  },

  async getTask(id: string): Promise<TaskResponse> {
    try {
      const response = await axiosInstance.get(ENDPOINTS.TASK_GET.replace(':id', id));
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.data) {
        return {
          success: false,
          error: error.response.data.error || 'Error al obtener la tarea.'
        };
      }
      return {
        success: false,
        error: 'Error de conexión. Por favor, intenta nuevamente.'
      };
    }
  },

  async getAllTasks(): Promise<TaskResponse> {
    try {
      const response = await axiosInstance.get(ENDPOINTS.TASK_GET);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.data) {
        return {
          success: false,
          error: error.response.data.error || 'Error al obtener las tareas.'
        };
      }
      return {
        success: false,
        error: 'Error de conexión. Por favor, intenta nuevamente.'
      };
    }
  },

  async completeTask(id: string): Promise<TaskResponse> {
    try {
      const response = await axiosInstance.patch(ENDPOINTS.TASK_COMPLETE.replace(':id', id));
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.data) {
        return {
          success: false,
          error: error.response.data.error || 'Error al marcar la tarea como completada.'
        };
      }
      return {
        success: false,
        error: 'Error de conexión. Por favor, intenta nuevamente.'
      };
    }
  },

  async incompleteTask(id: string): Promise<TaskResponse> {
    try {
      const response = await axiosInstance.patch(ENDPOINTS.TASK_INCOMPLETE.replace(':id', id));
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.data) {
        return {
          success: false,
          error: error.response.data.error || 'Error al marcar la tarea como no completada.'
        };
      }
      return {
        success: false,
        error: 'Error de conexión. Por favor, intenta nuevamente.'
      };
    }
  },

  async getTasksByPriority(priority: 'high' | 'medium' | 'low'): Promise<TaskResponse> {
    try {
      const response = await axiosInstance.get(ENDPOINTS.TASK_BY_PRIORITY.replace(':priority', priority));
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.data) {
        return {
          success: false,
          error: error.response.data.error || 'Error al obtener las tareas por prioridad.'
        };
      }
      return {
        success: false,
        error: 'Error de conexión. Por favor, intenta nuevamente.'
      };
    }
  },

  async getTasksByDueDate(date: string): Promise<TaskResponse> {
    try {
      const response = await axiosInstance.get(ENDPOINTS.TASK_BY_DUE_DATE.replace(':date', date));
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.data) {
        return {
          success: false,
          error: error.response.data.error || 'Error al obtener las tareas por fecha.'
        };
      }
      return {
        success: false,
        error: 'Error de conexión. Por favor, intenta nuevamente.'
      };
    }
  }
};