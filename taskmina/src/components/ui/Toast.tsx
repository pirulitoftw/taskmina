import React from 'react';
import { Toaster, toast } from 'react-hot-toast';

// Exportar directamente la función toast para usarla en toda la aplicación
export { toast };

// Componente para mostrar las notificaciones toast
const Toast = () => {
  return (
    <Toaster
      position="top-right"
      reverseOrder={false}
      gutter={8}
      toastOptions={{
        // Estilos para todos los toasts
        duration: 5000,
        style: {
          background: 'var(--toast-bg)',
          color: 'var(--toast-text)',
          maxWidth: '500px',
        },
        // Configuración para toast de éxito
        success: {
          duration: 3000,
          iconTheme: {
            primary: '#10B981',
            secondary: 'white',
          },
        },
        // Configuración para toast de error
        error: {
          duration: 5000,
          iconTheme: {
            primary: '#EF4444',
            secondary: 'white',
          },
        },
      }}
    />
  );
};

export default Toast;