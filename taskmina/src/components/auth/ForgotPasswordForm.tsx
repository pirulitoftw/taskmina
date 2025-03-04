import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import Button from '../ui/Button';
import Input from '../ui/Input';
import { Mail } from 'lucide-react';

interface ForgotPasswordFormProps {
  onBack: () => void;
}

const ForgotPasswordForm: React.FC<ForgotPasswordFormProps> = ({ onBack }) => {
  const { forgotPassword, isLoading, error } = useAuth();
  const [email, setEmail] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await forgotPassword(email);
      setSuccessMessage('Se ha enviado un correo con las instrucciones para restablecer tu contraseña.');
      setEmail('');
    } catch (error) {
      // El error ya se maneja en el contexto
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-teal mb-6 text-center">Recuperar Contraseña</h2>

      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      {successMessage && (
        <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
          {successMessage}
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
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            fullWidth
            placeholder="tu@email.com"
            className="pl-10"
          />
        </div>

        <Button
          type="submit"
          variant="primary"
          isLoading={isLoading}
          className="w-full mt-6"
        >
          Enviar Instrucciones
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-gray-600">
        <button
          onClick={onBack}
          className="text-teal hover:underline focus:outline-none font-medium"
        >
          Volver al inicio de sesión
        </button>
      </p>
    </div>
  );
};

export default ForgotPasswordForm;