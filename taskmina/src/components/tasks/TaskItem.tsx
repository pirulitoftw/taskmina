import React, { useState } from 'react';
import { Task } from '../../types';
import { useTasks } from '../../context/TaskContext';
import { CheckCircle, Circle, Pencil, Trash2, Clock, X, MoreVertical } from 'lucide-react';

interface TaskItemProps {
  task: Task;
}

const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
  const { toggleTaskStatus, deleteTask, updateTask, completeTask, incompleteTask } = useTasks();
  const [isEditing, setIsEditing] = useState(false);
  const [showActions, setShowActions] = useState(false);
  const [editedTask, setEditedTask] = useState({
    title: task.title,
    description: task.description || '',
    dueDate: task.dueDate ? new Date(task.dueDate).toISOString().split('T')[0] : '',
    priority: task.priority
  });

  const handleToggleStatus = () => {
    toggleTaskStatus(task.id);
  };

  const handleDelete = () => {
    if (window.confirm('¿Estás seguro de que deseas eliminar esta tarea?')) {
      deleteTask(task.id);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    if (editedTask.title.trim() && task.id) {
      updateTask(task.id, {
        ...editedTask,
        dueDate: editedTask.dueDate || undefined
      });
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedTask({
      title: task.title,
      description: task.description || '',
      dueDate: task.dueDate ? new Date(task.dueDate).toISOString().split('T')[0] : '',
      priority: task.priority
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEditedTask(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCompleteTask = async () => {
    await completeTask(task.id);
    setShowActions(false);
  };

  const handleIncompleteTask = async () => {
    await incompleteTask(task.id);
    setShowActions(false);
  };

  const priorityColors = {
    low: 'bg-green-100 text-green-800',
    medium: 'bg-yellow-100 text-yellow-800',
    high: 'bg-red-100 text-red-800',
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  if (isEditing) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-4 mb-3 border border-gray-200">
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-medium text-teal">Editar Tarea</h3>
          <button
            onClick={handleCancel}
            className="text-gray-400 hover:text-gray-600"
          >
            <X size={18} />
          </button>
        </div>

        <div className="space-y-3">
          <div>
            <label className="block text-sm text-gray-600 mb-1">Título</label>
            <input
              type="text"
              name="title"
              value={editedTask.title}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-teal"
              required
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">Descripción</label>
            <textarea
              name="description"
              value={editedTask.description}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-teal h-20 resize-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm text-gray-600 mb-1">Fecha límite</label>
              <input
                type="date"
                name="dueDate"
                value={editedTask.dueDate}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-teal"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-1">Prioridad</label>
              <select
                name="priority"
                value={editedTask.priority}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-teal bg-white"
              >
                <option value="low">Baja</option>
                <option value="medium">Media</option>
                <option value="high">Alta</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end gap-2 mt-4">
            <button
              onClick={handleCancel}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Cancelar
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 text-sm font-medium text-white bg-teal rounded-md hover:bg-turquoise"
              disabled={!editedTask.title.trim()}
            >
              Guardar
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-white rounded-lg shadow-sm p-4 mb-3 border-l-4 ${
      task.completed ? 'border-l-turquoise opacity-70' : 
      task.priority === 'high' ? 'border-l-red-500' :
      task.priority === 'medium' ? 'border-l-gold' : 'border-l-green-500'
    }`}>
      <div className="flex items-start gap-3">
        <button 
          onClick={handleToggleStatus}
          className="mt-1 flex-shrink-0 text-teal hover:text-turquoise transition-colors"
        >
          {task.completed ? (
            <CheckCircle size={20} />
          ) : (
            <Circle size={20} />
          )}
        </button>
        
        <div className="flex-grow">
          <h3 className={`text-lg font-medium ${task.completed ? 'line-through text-gray-500' : 'text-jet'}`}>
            {task.title}
          </h3>
          
          {task.description && (
            <p className={`mt-1 text-sm ${task.completed ? 'text-gray-400' : 'text-gray-600'}`}>
              {task.description}
            </p>
          )}
          
          <div className="mt-2 flex flex-wrap items-center gap-2 text-xs">
            {task.dueDate && (
              <span className="flex items-center gap-1 text-gray-500">
                <Clock size={14} />
                {formatDate(task.dueDate)}
              </span>
            )}
            
            <span className={`px-2 py-1 rounded-full ${priorityColors[task.priority]}`}>
              {task.priority === 'low' ? 'Baja' : task.priority === 'medium' ? 'Media' : 'Alta'}
            </span>
          </div>
        </div>
        
        <div className="flex gap-1 flex-shrink-0 relative">
          <button
            onClick={handleEdit}
            className="p-1 text-gray-500 hover:text-teal rounded-full hover:bg-gray-100 transition-colors"
            title="Editar"
          >
            <Pencil size={16} />
          </button>
          <button
            onClick={handleDelete}
            className="p-1 text-gray-500 hover:text-red-500 rounded-full hover:bg-gray-100 transition-colors"
            title="Eliminar"
          >
            <Trash2 size={16} />
          </button>
          <div className="relative">
            <button
              onClick={() => setShowActions(!showActions)}
              className="p-1 text-gray-500 hover:text-teal rounded-full hover:bg-gray-100 transition-colors"
              title="Más acciones"
            >
              <MoreVertical size={16} />
            </button>
            
            {showActions && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 border border-gray-200">
                {!task.completed && (
                  <button
                    onClick={handleCompleteTask}
                    className="w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-100"
                  >
                    Marcar como completada
                  </button>
                )}
                {task.completed && (
                  <button
                    onClick={handleIncompleteTask}
                    className="w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-100"
                  >
                    Marcar como no completada
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskItem;