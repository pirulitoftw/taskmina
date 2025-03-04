import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import Button from '../ui/Button';
import Input from '../ui/Input';
import { Lock } from 'lucide-react';

interface ResetPasswordFormProps {
  token: string;
  onSuccess: () => void;
}

const ResetPasswordForm: React.FC<ResetPasswordFormProps> = ({ token, onSuccess }) => {
  const { resetPassword, isLoading, error } = useAuth();
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: ''
  });
  const [formErrors, setFormErrors] = useState({
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (name === 'password') {
      if (value.length < 6) {
        setFormErrors(prev => ({
          ...prev,
          password: 'La contraseña debe tener al menos 6 caracteres'
        }));
      } else {
        setFormErrors(prev => ({ ...prev, password: '' }));
      }
      
      if (formData.confirmPassword && value !== formData.confirmPassword) {
        setFormErrors(prev => ({
          ...prev,
          confirmPassword: 'Las contraseñas no coinciden'
        }));
      } else if (formData.confirmPassword) {
        setFormErrors(prev => ({ ...prev, confirmPassword: '' }));
      }
    }
    
    if (name === 'confirmPassword') {
      if (value !== formData.password) {
        setFormErrors(prev => ({
          ...prev,
          confirmPassword: 'Las contraseñas no coinciden'
        }));
      } else {
        setFormErrors(prev => ({ ...prev, confirmPassword: '' }));
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      setFormErrors(prev => ({
        ...prev,
        confirmPassword: 'Las contraseñas no coinciden'
      }));
      return;
    }
    
    if (formData.password.length < 6) {
      setFormErrors(prev => ({
        ...prev,
        password: 'La contraseña debe tener al menos 6 caracteres'
      }));
      return;
    }
    
    try {
      await resetPassword(token, formData.password);
      onSuccess();
    } catch (error) {
      // El error ya se maneja en el contexto
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-teal mb-6 text-center">Restablecer Contraseña</h2>

      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            <Lock size={18} />
          </div>
          <Input
            label="Nueva Contraseña"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            fullWidth
            placeholder="********"
            error={formErrors.password}
            className="pl-10"
          />
        </div>

        <div className="relative">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            <Lock size={18} />
          </div>
          <Input
            label="Confirmar Contraseña"
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            fullWidth
            placeholder="********"
            error={formErrors.confirmPassword}
            className="pl-10"
          />
        </div>

        <Button
          type="submit"
          variant="primary"
          isLoading={isLoading}
          className="w-full mt-6"
          disabled={!!formErrors.password || !!formErrors.confirmPassword}
        >
          Restablecer Contraseña
        </Button>
      </form>
    </div>
  );
};

export default ResetPasswordForm;