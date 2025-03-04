import React, { useEffect, useState, useCallback } from 'react';
import Header from '../components/layout/Header';
import AddTaskForm from '../components/tasks/AddTaskForm';
import TaskList from '../components/tasks/TaskList';
import { useAuth } from '../context/AuthContext';
import { CheckCircle, Clock, AlertTriangle } from 'lucide-react';
import { dashboardService } from '../services/dashboardService';
import { useNavigate } from 'react-router-dom';
import { toast } from '../components/ui/Toast';

const DashboardPage: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [completedTasks, setCompletedTasks] = useState<string | number>('-');
  const [pendingTasks, setPendingTasks] = useState<string | number>('-');
  const [urgentTasks, setUrgentTasks] = useState<string | number>('-');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('auth_token');
    if (!token) {
      navigate('/login');
      return;
    }
    
    if (!user) {
      navigate('/login');
      return;
    }
  }, [navigate, user]);

  const fetchDashboardData = useCallback(async () => {
    try {
      const [weeklyProgress, prioritySummary, urgentTasks] = await Promise.all([
        dashboardService.getWeeklyProgress(),
        dashboardService.getPrioritySummary(),
        dashboardService.getUrgentTasks()
      ]);
      setCompletedTasks(weeklyProgress.data.weeklyStats.completed);
      setPendingTasks(prioritySummary.pendingTasks);
      setUrgentTasks(urgentTasks.data.count);
    } catch (err) {
      setCompletedTasks('-');
      setPendingTasks('-');
      setUrgentTasks('-');
      toast.error('No se pudieron cargar las estadísticas');
    }
  }, []);

  useEffect(() => {
    setIsLoading(true);
    fetchDashboardData().finally(() => {
      setIsLoading(false);
    });
  }, [fetchDashboardData]);

  const handleTaskAdded = async () => {
    await fetchDashboardData();
  };

  if (isLoading) {
    return (
      <div className="min-h-screen !bg-[rgb(240,240,240)] dark:!bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal dark:border-cyan-400 mx-auto"></div>
          <p className="mt-4 text-teal dark:text-cyan-400">Cargando estadísticas...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }
  
  const getGreeting = () => {
    if (user?.name) {
      return `Hola, ${user.name.split(' ')[0]}!`;
    }
    const hour = new Date().getHours();
    if (hour < 12) return "¡Buenos días!";
    if (hour < 18) return "¡Buenas tardes!";
    return "¡Buenas noches!";
  };
  
  return (
    <div className="min-h-screen !bg-[rgb(240,240,240)] dark:!bg-gray-900 flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-6">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-jet dark:text-white">{getGreeting()}</h2>
          <p className="text-gray-600 dark:text-gray-400">Gestiona tus tareas y mantente productivo.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border-t-4 border-t-turquoise">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle size={18} className="text-turquoise" />
              <h3 className="font-medium dark:text-white">Tareas Completadas</h3>
            </div>
            <p className="text-2xl font-bold dark:text-white">{completedTasks}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">Esta semana</p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border-t-4 border-t-gold">
            <div className="flex items-center gap-2 mb-2">
              <Clock size={18} className="text-gold" />
              <h3 className="font-medium dark:text-white">Tareas Pendientes</h3>
            </div>
            <p className="text-2xl font-bold dark:text-white">{pendingTasks}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">Por hacer</p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border-t-4 border-t-red-500">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle size={18} className="text-red-500" />
              <h3 className="font-medium dark:text-white">Tareas Urgentes</h3>
            </div>
            <p className="text-2xl font-bold dark:text-white">{urgentTasks}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">Alta prioridad</p>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
          <h3 className="text-xl font-bold text-teal dark:text-cyan-400 mb-4">Mis Tareas</h3>
          <AddTaskForm onTaskAdded={handleTaskAdded} />
          <TaskList />
        </div>
      </main>
      
      <footer className="bg-footer-light dark:bg-footer-dark text-white py-3 text-center text-sm">
        <p>&copy; 2025 Taskmina - Creado por Josibell Guerrero</p>
      </footer>
    </div>
  );
};

export default DashboardPage;