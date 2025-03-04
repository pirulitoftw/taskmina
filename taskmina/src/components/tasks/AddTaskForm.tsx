import React, { useState } from 'react';
import { useTasks } from '../../context/TaskContext';
import Button from '../ui/Button';
import { Plus, X } from 'lucide-react';

const AddTaskForm: React.FC<{ onTaskAdded: () => void }> = ({ onTaskAdded }) => {
  const { addTask, isLoading } = useTasks();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [taskData, setTaskData] = useState({
    title: '',
    description: '',
    priority: 'medium' as 'low' | 'medium' | 'high',
    dueDate: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setTaskData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!taskData.title.trim()) return;

    await addTask({
      ...taskData,
      completed: false,
    });

    // Reset form
    setTaskData({
      title: '',
      description: '',
      priority: 'medium',
      dueDate: '',
    });
    setIsFormOpen(false);

    // Llamar a onTaskAdded después de agregar una tarea
    onTaskAdded();
  };

  const toggleForm = () => {
    setIsFormOpen(!isFormOpen);
  };

  return (
    <div className="mb-6">
      {!isFormOpen ? (
        <button
          onClick={toggleForm}
          className="flex items-center gap-2 w-full p-3 bg-white border border-dashed border-gray-300 rounded-lg text-gray-500 hover:text-teal hover:border-teal transition-colors"
        >
          <Plus size={18} />
          <span>Agregar nueva tarea</span>
        </button>
      ) : (
        <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-medium text-teal">Nueva Tarea</h3>
            <button
              onClick={toggleForm}
              className="text-gray-400 hover:text-gray-600"
            >
              <X size={18} />
            </button>
          </div>
          
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <input
                type="text"
                name="title"
                value={taskData.title}
                onChange={handleChange}
                placeholder="¿Qué necesitas hacer?"
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-teal"
                required
              />
            </div>
            
            <div className="mb-3">
              <textarea
                name="description"
                value={taskData.description}
                onChange={handleChange}
                placeholder="Descripción (opcional)"
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-teal h-20 resize-none"
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
              <div>
                <label className="block text-sm text-gray-600 mb-1">Prioridad</label>
                <select
                  name="priority"
                  value={taskData.priority}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-teal bg-white"
                >
                  <option value="low">Baja</option>
                  <option value="medium">Media</option>
                  <option value="high">Alta</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm text-gray-600 mb-1">Fecha límite (opcional)</label>
                <input
                  type="date"
                  name="dueDate"
                  value={taskData.dueDate}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-teal"
                />
              </div>
            </div>
            
            <div className="flex justify-end gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={toggleForm}
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                variant="primary"
                isLoading={isLoading}
                disabled={!taskData.title.trim()}
              >
                Guardar Tarea
              </Button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default AddTaskForm;