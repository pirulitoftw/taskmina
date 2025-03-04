import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Task, TasksState } from '../types';
import { useAuth } from './AuthContext';
import { taskService } from '../services/taskService';
import { dashboardService } from '../services/dashboardService';
import { UrgentTasksResponse, PrioritySummaryResponse, WeeklyProgressResponse } from '../types/dashboard';

interface TaskContextType extends TasksState {
  addTask: (task: Omit<Task, 'id' | 'userId' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  updateTask: (id: string, updates: Partial<Task>) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
  toggleTaskStatus: (id: string) => Promise<void>;
  completeTask: (id: string) => Promise<void>;
  incompleteTask: (id: string) => Promise<void>;
  getTasksByPriority: (priority: 'high' | 'medium' | 'low') => Promise<void>;
  getTasksByDueDate: (date: string) => Promise<void>;
  getUrgentTasks: () => Promise<UrgentTasksResponse>;
  getPrioritySummary: () => Promise<PrioritySummaryResponse>;
  getWeeklyProgress: () => Promise<WeeklyProgressResponse>;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

const TaskProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { user, isAuthenticated } = useAuth();
  const [tasksState, setTasksState] = useState<TasksState>({
    tasks: [],
    isLoading: false,
    error: null,
  });

  // Cargar tareas cuando el usuario está autenticado
  useEffect(() => {
    if (isAuthenticated && user) {
      fetchTasks();
    } else {
      setTasksState({
        tasks: [],
        isLoading: false,
        error: null,
      });
    }
  }, [isAuthenticated, user]);

  const fetchTasks = async () => {
    setTasksState({ ...tasksState, isLoading: true });
    try {
      const response = await taskService.getAllTasks();
      
      if (response.success && response.data) {
        const tasks = Array.isArray(response.data) ? response.data : [];
        // Validar solo los campos necesarios
        if (tasks.every(task => 
          '_id' in task && 
          'title' in task && 
          'description' in task && 
          'priority' in task && 
          'completed' in task
        )) {
          const transformedTasks = tasks.map(task => ({
            ...task,
            id: task._id,
          }));
          setTasksState({
            tasks: transformedTasks,
            isLoading: false,
            error: null,
          });
        } else {
          throw new Error('Formato de tareas inválido');
        }
      } else {
        throw new Error(response.error || 'Error al cargar las tareas');
      }
    } catch (error) {
      setTasksState({
        ...tasksState,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Error al cargar las tareas',
      });
    }
  };

  const addTask = async (taskData: Omit<Task, 'id' | 'userId' | 'createdAt' | 'updatedAt'>) => {
    setTasksState({ ...tasksState, isLoading: true });
    try {
      const response = await taskService.createTask(
        taskData.title,
        taskData.description,
        taskData.dueDate,
        taskData.priority
      );

      if (response.success && response.data) {
        const newTask = response.data as Task;
        setTasksState({
          tasks: [...tasksState.tasks, newTask],
          isLoading: false,
          error: null,
        });
      } else {
        throw new Error(response.error || 'Error al crear la tarea');
      }
    } catch (error) {
      setTasksState({
        ...tasksState,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Error al crear la tarea. Por favor, intenta nuevamente.',
      });
    }
  };

  const updateTask = async (id: string, updates: Partial<Task>) => {
    if (!id) {
      setTasksState({
        ...tasksState,
        error: 'ID de tarea no válido'
      });
      return;
    }

    setTasksState({ ...tasksState, isLoading: true });
    try {
      const taskToUpdate = tasksState.tasks.find(task => task.id === id);
      if (!taskToUpdate) {
        throw new Error('Tarea no encontrada');
      }

      const response = await taskService.updateTask(
        id,
        updates.title || taskToUpdate.title,
        updates.description ?? taskToUpdate.description,
        updates.completed ?? taskToUpdate.completed,
        updates.dueDate ?? taskToUpdate.dueDate,
        updates.priority || taskToUpdate.priority
      );

      if (response.success && response.data) {
        const updatedTasks = tasksState.tasks.map(task =>
          task.id === id ? response.data as Task : task
        );

        setTasksState({
          tasks: updatedTasks,
          isLoading: false,
          error: null,
        });
      } else {
        throw new Error(response.error || 'Error al actualizar la tarea');
      }
    } catch (error) {
      setTasksState({
        ...tasksState,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Error al actualizar la tarea. Por favor, intenta nuevamente.',
      });
    }
  };

  const deleteTask = async (id: string) => {
    setTasksState({ ...tasksState, isLoading: true });
    try {
      const response = await taskService.deleteTask(id);
      
      if (response.success) {
        const filteredTasks = tasksState.tasks.filter(task => task.id !== id);
        setTasksState({
          tasks: filteredTasks,
          isLoading: false,
          error: null,
        });
      } else {
        throw new Error(response.error || 'Error al eliminar la tarea');
      }
    } catch (error) {
      setTasksState({
        ...tasksState,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Error al eliminar la tarea. Por favor, intenta nuevamente.',
      });
    }
  };

  const completeTask = async (id: string) => {
    setTasksState({ ...tasksState, isLoading: true });
    try {
      const response = await taskService.completeTask(id);
      
      if (response.success && response.data) {
        const updatedTasks = tasksState.tasks.map(task =>
          task.id === id ? { ...task, completed: true } : task
        );
        
        setTasksState({
          tasks: updatedTasks,
          isLoading: false,
          error: null,
        });
      } else {
        throw new Error(response.error || 'Error al completar la tarea');
      }
    } catch (error) {
      setTasksState({
        ...tasksState,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Error al completar la tarea. Por favor, intenta nuevamente.',
      });
    }
  };

  const incompleteTask = async (id: string) => {
    setTasksState({ ...tasksState, isLoading: true });
    try {
      const response = await taskService.incompleteTask(id);
      
      if (response.success && response.data) {
        const updatedTasks = tasksState.tasks.map(task =>
          task.id === id ? { ...task, completed: false } : task
        );
        
        setTasksState({
          tasks: updatedTasks,
          isLoading: false,
          error: null,
        });
      } else {
        throw new Error(response.error || 'Error al marcar la tarea como no completada');
      }
    } catch (error) {
      setTasksState({
        ...tasksState,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Error al marcar la tarea como no completada. Por favor, intenta nuevamente.',
      });
    }
  };

  const toggleTaskStatus = async (id: string) => {
    const task = tasksState.tasks.find(t => t.id === id);
    if (task) {
      if (task.completed) {
        await incompleteTask(id);
      } else {
        await completeTask(id);
      }
    }
  };

  const getTasksByPriority = async (priority: 'high' | 'medium' | 'low') => {
    setTasksState({ ...tasksState, isLoading: true });
    try {
      const response = await taskService.getTasksByPriority(priority);
      
      if (response.success && response.data) {
        const tasks = Array.isArray(response.data) ? response.data : [];
        const transformedTasks = tasks.map(task => ({
          ...task,
          id: task._id,
        }));
        setTasksState({
          tasks: transformedTasks,
          isLoading: false,
          error: null,
        });
      } else {
        throw new Error(response.error || 'Error al obtener las tareas por prioridad');
      }
    } catch (error) {
      setTasksState({
        ...tasksState,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Error al obtener las tareas por prioridad',
      });
    }
  };

  const getTasksByDueDate = async (date: string) => {
    setTasksState({ ...tasksState, isLoading: true });
    try {
      const response = await taskService.getTasksByDueDate(date);
      
      if (response.success && response.data) {
        const tasks = Array.isArray(response.data) ? response.data : [];
        const transformedTasks = tasks.map(task => ({
          ...task,
          id: task._id,
        }));
        setTasksState({
          tasks: transformedTasks,
          isLoading: false,
          error: null,
        });
      } else {
        throw new Error(response.error || 'Error al obtener las tareas por fecha');
      }
    } catch (error) {
      setTasksState({
        ...tasksState,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Error al obtener las tareas por fecha',
      });
    }
  };

  const getUrgentTasks = async () => {
    try {
      return await dashboardService.getUrgentTasks();
    } catch (error) {
      throw new Error('Error al obtener tareas urgentes');
    }
  };

  const getPrioritySummary = async () => {
    try {
      return await dashboardService.getPrioritySummary();
    } catch (error) {
      throw new Error('Error al obtener resumen de prioridades');
    }
  };

  const getWeeklyProgress = async () => {
    try {
      return await dashboardService.getWeeklyProgress();
    } catch (error) {
      throw new Error('Error al obtener progreso semanal');
    }
  };

  return (
    <TaskContext.Provider
      value={{
        ...tasksState,
        addTask,
        updateTask,
        deleteTask,
        toggleTaskStatus,
        completeTask,
        incompleteTask,
        getTasksByPriority,
        getTasksByDueDate,
        getUrgentTasks,
        getPrioritySummary,
        getWeeklyProgress,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

const useTasks = () => {
  const context = useContext(TaskContext);
  if (context === undefined) {
    throw new Error('useTasks debe ser usado dentro de un TaskProvider');
  }
  return context;
};

// Cambiar las exportaciones
export { TaskProvider, useTasks };