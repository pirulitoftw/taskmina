export interface Task {
  id: string;      // Para uso en el frontend
  _id: string;     // ID original de MongoDB
  title: string;
  description: string;
  dueDate: string;
  priority: 'high' | 'medium' | 'low';
  completed: boolean;
  userId: string;
  createdAt: string;
  updatedAt: string;
}
