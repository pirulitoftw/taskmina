import axios from 'axios';
import axiosInstance from '../config/axios';
import { User } from '../types';
import { ENDPOINTS } from '../config/endpoints';

interface AuthResponse {
  success: boolean;
  data?: {
    token?: string;
    user?: User;
  };
  message?: string;
  error?: string;
}

export const authService = {
  async login(email: string, password: string): Promise<AuthResponse> {
    try {
      const response = await axiosInstance.post(ENDPOINTS.AUTH_LOGIN, {
        email,
        password,
      });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.data) {
        return {
          success: false,
          error: error.response.data.error || 'Credenciales inválidas'
        };
      }
      return {
        success: false,
        error: 'Error de conexión. Por favor, intenta nuevamente.'
      };
    }
  },

  async register(name: string, email: string, password: string): Promise<AuthResponse> {
    try {
      const response = await axiosInstance.post(ENDPOINTS.AUTH_REGISTER, {
        name,
        email,
        password,
        type: 'user'
      });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.data) {
        return {
          success: false,
          error: error.response.data.error || 'Error al registrar usuario. Por favor, intenta nuevamente.'
        };
      }
      return {
        success: false,
        error: 'Error de conexión. Por favor, intenta nuevamente.'
      };
    }
  },

  async verifyToken(token: string): Promise<AuthResponse> {
    try {
      const response = await axiosInstance.get(ENDPOINTS.AUTH_VERIFY, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.data) {
        return {
          success: false,
          error: error.response.data.error || 'Error al verificar el token'
        };
      }
      return {
        success: false,
        error: 'Error de conexión. Por favor, intenta nuevamente.'
      };
    }
  },

  async forgotPassword(email: string): Promise<AuthResponse> {
    try {
      const response = await axiosInstance.post(ENDPOINTS.AUTH_FORGOT_PASSWORD, {
        email
      });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.data) {
        return {
          success: false,
          error: error.response.data.error || 'Error al procesar la solicitud de recuperación de contraseña.'
        };
      }
      return {
        success: false,
        error: 'Error de conexión. Por favor, intenta nuevamente.'
      };
    }
  },

  async resetPassword(token: string, password: string): Promise<AuthResponse> {
    try {
      const response = await axiosInstance.post(ENDPOINTS.AUTH_RESET_PASSWORD, {
        token,
        password
      });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.data) {
        return {
          success: false,
          error: error.response.data.error || 'Error al restablecer la contraseña.'
        };
      }
      return {
        success: false,
        error: 'Error de conexión. Por favor, intenta nuevamente.'
      };
    }
  },

  async getUserProfile(token: string): Promise<AuthResponse> {
    try {
      const response = await axiosInstance.get(ENDPOINTS.AUTH_PROFILE, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.data) {
        return {
          success: false,
          error: error.response.data.error || 'Error al obtener el perfil del usuario'
        };
      }
      return {
        success: false,
        error: 'Error de conexión. Por favor, intenta nuevamente.'
      };
    }
  }
};