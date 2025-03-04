import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import Button from '../ui/Button';
import Input from '../ui/Input';
import { Mail, Lock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface LoginFormProps {
  onToggleForm: () => void;
  onForgotPassword: () => void;
  onError?: (message: string) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onToggleForm, onForgotPassword, onError }) => {
  const { login, isLoading, error, clearError } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  // Limpiar errores al desmontar
  useEffect(() => {
    return () => {
      if (error) clearError();
    };
  }, [clearError, error]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (error) clearError();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('1. Form submitted');
    if (isLoading) {
      console.log('Loading state active, returning');
      return;
    }

    try {
      console.log('2. Attempting login...');
      const success = await login(formData.email, formData.password);
      console.log('3. Login result:', success);
      
      if (success) {
        console.log('4. Login successful, waiting before navigation');
        onError?.("Login exitoso!");  // Prueba si el toast funciona en caso positivo
        setTimeout(() => {
          console.log('5. Navigating...');
          navigate('/');
        }, 2000);
      } else {
        console.log('4. Login failed, showing error');
        onError?.("Credenciales incorrectas");
      }
    } catch (err) {
      console.error('4. Login error:', err);
      onError?.("Error al iniciar sesión: " + (err instanceof Error ? err.message : "Error desconocido"));
    }
  };

  return (
    <div className="relative">
      {isLoading && (
        <div className="absolute inset-0 bg-white/50 backdrop-blur-sm flex items-center justify-center rounded-lg z-10">
          <div className="w-8 h-8 border-4 border-teal border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      <h2 className="text-2xl font-bold text-teal mb-6 text-center">Iniciar Sesión</h2>
      
      {error && (
        <div 
          className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded animate-fadeIn"
          role="alert"
        >
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd"/>
            </svg>
            <span>{error}</span>
          </div>
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            <Mail size={18} />
          </div>
          <Input
            label="Correo Electrónico"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            fullWidth
            placeholder="tu@email.com"
            className="pl-10"
          />
        </div>
        
        <div className="relative">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            <Lock size={18} />
          </div>
          <Input
            label="Contraseña"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            fullWidth
            placeholder="********"
            className="pl-10"
          />
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              className="h-4 w-4 text-teal focus:ring-teal border-gray-300 rounded"
            />
            <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
              Recordarme
            </label>
          </div>
          
          <div className="text-sm">
            <button
              type="button"
              onClick={onForgotPassword}
              className="text-teal hover:underline focus:outline-none"
            >
              ¿Olvidaste tu contraseña?
            </button>
          </div>
        </div>
        
        <Button
          type="submit"
          variant="primary"
          isLoading={isLoading}
          className="w-full mt-6"
          disabled={isLoading}
        >
          {isLoading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
        </Button>
      </form>
      
      <p className="mt-6 text-center text-sm text-gray-600">
        ¿No tienes una cuenta?{' '}
        <button
          onClick={onToggleForm}
          className="text-teal hover:underline focus:outline-none font-medium"
        >
          Regístrate
        </button>
      </p>
    </div>
  );
};

export default LoginForm;