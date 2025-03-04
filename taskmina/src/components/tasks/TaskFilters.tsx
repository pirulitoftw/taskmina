import React, { useState } from 'react';
import { useTasks } from '../../context/TaskContext';
import { Calendar } from 'lucide-react';

const TaskFilters: React.FC = () => {
  const { getTasksByPriority, getTasksByDueDate, isLoading } = useTasks();
  const [selectedDate, setSelectedDate] = useState('');

  const handlePriorityFilter = async (priority: 'high' | 'medium' | 'low') => {
    await getTasksByPriority(priority);
  };

  const handleDateFilter = async (date: string) => {
    if (date) {
      setSelectedDate(date);
      // Convert the date to UTC at midnight
      const utcDate = new Date(date);
      utcDate.setUTCHours(0, 0, 0, 0);
      await getTasksByDueDate(utcDate.toISOString().split('T')[0]);
    }
  };

  const handleClearFilters = () => {
    setSelectedDate('');
    window.location.reload();
  };

  return (
    <div className="space-y-4">
      <div>
        <div className="flex items-center gap-2 mb-2">
          <span className="text-sm text-gray-600">Filtrar por prioridad:</span>
          <div className="flex gap-2">
            <button
              onClick={() => handlePriorityFilter('high')}
              disabled={isLoading}
              className="px-3 py-1 text-sm rounded-full bg-red-100 text-red-800 hover:bg-red-200"
            >
              Alta
            </button>
            <button
              onClick={() => handlePriorityFilter('medium')}
              disabled={isLoading}
              className="px-3 py-1 text-sm rounded-full bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
            >
              Media
            </button>
            <button
              onClick={() => handlePriorityFilter('low')}
              disabled={isLoading}
              className="px-3 py-1 text-sm rounded-full bg-green-100 text-green-800 hover:bg-green-200"
            >
              Baja
            </button>
          </div>
        </div>
      </div>

      <div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">Filtrar por fecha:</span>
          <div className="flex gap-2 items-center">
            <div className="relative">
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => handleDateFilter(e.target.value)}
                className="px-3 py-1 text-sm rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-teal"
              />
              <Calendar className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          onClick={handleClearFilters}
          disabled={isLoading}
          className="px-3 py-1 text-sm rounded-full bg-gray-100 text-gray-800 hover:bg-gray-200"
        >
          Limpiar filtros
        </button>
      </div>
    </div>
  );
};

export default TaskFilters;