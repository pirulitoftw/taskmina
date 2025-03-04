import React from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { TaskProvider } from './context/TaskContext';
import { ThemeProvider } from './context/ThemeContext';
import AuthPage from './pages/AuthPage';
import DashboardPage from './pages/DashboardPage';
import { Routes, Route, Navigate } from 'react-router-dom';
import Toast from './components/ui/Toast';

const AppContent: React.FC = () => {
  const { isAuthenticated, isLoading } = useAuth();
  
  if (isLoading) {
    return (
      <div className="min-h-screen bg-antiflash-white dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal dark:border-cyan-400 mx-auto"></div>
          <p className="mt-4 text-teal dark:text-cyan-400">Cargando...</p>
        </div>
      </div>
    );
  }
  
  return (
    <Routes>
      <Route path="/" element={isAuthenticated ? <DashboardPage /> : <Navigate to="/login" replace />} />
      <Route path="/login" element={isAuthenticated ? <Navigate to="/" replace /> : <AuthPage />} />
    </Routes>
  );
};

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <TaskProvider>
          <Toast />
          <AppContent />
        </TaskProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;