import React, { useState } from 'react';
import { useTasks } from '../../context/TaskContext';
import TaskItem from './TaskItem';
import TaskFilters from './TaskFilters';
import { ListFilter } from 'lucide-react';

const TaskList: React.FC = () => {
  const { tasks, isLoading, error } = useTasks();
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');
  const [sortBy, setSortBy] = useState<'dueDate' | 'priority' | 'createdAt'>('createdAt');
  const [showFilters, setShowFilters] = useState(false);

  const priorityOptions = [
    { id: 'high', label: 'Alta' },
    { id: 'medium', label: 'Media' },
    { id: 'low', label: 'Baja' }
  ];

  const filterOptions = [
    { id: 'all', label: 'Todas' },
    { id: 'active', label: 'Pendientes' },
    { id: 'completed', label: 'Completadas' }
  ];

  const sortOptions = [
    { id: 'createdAt', label: 'Recientes' },
    { id: 'dueDate', label: 'Fecha límite' },
    { id: 'priority', label: 'Prioridad' }
  ];

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-teal"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
        <p>{error}</p>
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">No hay tareas disponibles. ¡Agrega una nueva tarea!</p>
      </div>
    );
  }

  const filteredTasks = tasks.filter(task => {
    if (filter === 'all') return true;
    if (filter === 'active') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true;
  });

  const sortedTasks = [...filteredTasks].sort((a, b) => {
    if (sortBy === 'dueDate') {
      if (!a.dueDate) return 1;
      if (!b.dueDate) return -1;
      return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
    }
    
    if (sortBy === 'priority') {
      const priorityValue = { high: 3, medium: 2, low: 1 };
      return priorityValue[b.priority] - priorityValue[a.priority];
    }
    
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <div className="text-lg font-medium text-teal">
          {filter === 'all' ? 'Todas las tareas' : 
           filter === 'active' ? 'Tareas pendientes' : 'Tareas completadas'}
        </div>
        
        <button 
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-1 text-sm text-gray-600 hover:text-teal"
        >
          <ListFilter size={16} />
          Filtros
        </button>
      </div>
      
      {showFilters && (
        <div className="bg-antiflash-white p-4 rounded-lg mb-4">
          <TaskFilters />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Estado</label>
              <div className="flex gap-2">
                {filterOptions.map(option => (
                  <button
                    key={`filter-${option.id}`}
                    onClick={() => setFilter(option.id as 'all' | 'active' | 'completed')}
                    className={`px-3 py-1 text-sm rounded-full ${
                      filter === option.id 
                        ? 'bg-teal text-white' 
                        : 'bg-white text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Ordenar por</label>
              <div className="flex gap-2">
                {sortOptions.map(option => (
                  <button
                    key={`sort-${option.id}`}
                    onClick={() => setSortBy(option.id as 'createdAt' | 'dueDate' | 'priority')}
                    className={`px-3 py-1 text-sm rounded-full ${
                      sortBy === option.id 
                        ? 'bg-teal text-white' 
                        : 'bg-white text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
      
      <div>
        {sortedTasks.map(task => (
          <TaskItem key={task.id} task={task} />
        ))}
      </div>
      
      <div className="mt-4 text-sm text-gray-500 text-right">
        {filteredTasks.length} tarea{filteredTasks.length !== 1 ? 's' : ''} • {tasks.filter(t => t.completed).length} completada{tasks.filter(t => t.completed).length !== 1 ? 's' : ''}
      </div>
    </div>
  );
};

export default TaskList;