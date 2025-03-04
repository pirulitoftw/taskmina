import React, { useEffect, useState } from 'react';
import { useTasks } from '../../context/TaskContext';
import { UrgentTasksResponse, PrioritySummaryResponse, WeeklyProgressResponse } from '../../types/dashboard';

export const DashboardStats: React.FC = () => {
  const { getUrgentTasks, getPrioritySummary, getWeeklyProgress } = useTasks();
  const [urgentTasks, setUrgentTasks] = useState<UrgentTasksResponse | null>(null);
  const [prioritySummary, setPrioritySummary] = useState<PrioritySummaryResponse | null>(null);
  const [weeklyProgress, setWeeklyProgress] = useState<WeeklyProgressResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setIsLoading(true);
        const [urgent, priority, weekly] = await Promise.all([
          getUrgentTasks(),
          getPrioritySummary(),
          getWeeklyProgress()
        ]);
        
        setUrgentTasks(urgent);
        setPrioritySummary(priority);
        setWeeklyProgress(weekly);
      } catch (err) {
        setError('Error al cargar los datos del dashboard');
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (isLoading) {
    return <div>Cargando estadísticas...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {/* Tareas Completadas */}
      <div className="bg-white p-4 rounded-lg shadow-sm border-t-4 border-t-turquoise">
        <div className="flex items-center gap-2 mb-2">
          <h3 className="font-medium">Tareas Completadas</h3>
        </div>
        <p className="text-2xl font-bold">{weeklyProgress?.weeklyStats?.completed || 0}</p>
        <p className="text-sm text-gray-500">Esta semana</p>
      </div>

      {/* Tareas Pendientes */}
      <div className="bg-white p-4 rounded-lg shadow-sm border-t-4 border-t-gold">
        <div className="flex items-center gap-2 mb-2">
          <h3 className="font-medium">Tareas Pendientes</h3>
        </div>
        <p className="text-2xl font-bold">{prioritySummary?.medium?.total || 0}</p>
        <p className="text-sm text-gray-500">Por hacer</p>
      </div>

      {/* Tareas Urgentes */}
      <div className="bg-white p-4 rounded-lg shadow-sm border-t-4 border-t-red-500">
        <div className="flex items-center gap-2 mb-2">
          <h3 className="font-medium">Tareas Urgentes</h3>
        </div>
        <p className="text-2xl font-bold">{urgentTasks?.count || 0}</p>
        <p className="text-sm text-gray-500">Alta prioridad</p>
      </div>
    </div>
  );
};

export default DashboardStats;
