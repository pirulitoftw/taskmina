import React, { createContext, useContext, useState, ReactNode, useEffect, useCallback } from 'react';
import { User, AuthState } from '../types';
import { authService } from '../services/authService';

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  forgotPassword: (email: string) => Promise<void>;
  resetPassword: (token: string, password: string) => Promise<void>;
  clearError: () => void;
}

const AUTH_TOKEN_KEY = 'auth_token';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
    error: null,
  });

  const clearError = useCallback(() => {
    setAuthState(prev => ({ ...prev, error: null }));
  }, []);

  const initializeAuth = useCallback(async () => {
    try {
      const token = localStorage.getItem(AUTH_TOKEN_KEY);
      
      if (!token) {
        setAuthState(prev => ({ ...prev, isLoading: false }));
        return;
      }
      
      const response = await authService.verifyToken(token);
      
      // La respuesta de /api/v1/auth/verify tiene el usuario directamente en user, no en data.user
      if (response.success === true && response.user) {
        // Verificamos si el objeto usuario tiene nombre
        if (response.user.name) {
          setAuthState({
            user: response.user,
            isAuthenticated: true,
            isLoading: false,
            error: null,
          });
          return;
        } else {
          // Si no tiene nombre, intentamos obtener el perfil completo
          try {
            const profileResponse = await authService.getUserProfile(token);
            if (profileResponse.success && profileResponse.data?.user) {
              setAuthState({
                user: profileResponse.data.user,
                isAuthenticated: true,
                isLoading: false,
                error: null,
              });
              return;
            }
          } catch (profileError) {
            // Error silencioso
          }
        }
        
        // Si llegamos aquí, tenemos un token válido pero información incompleta del usuario
        // Asignamos un nombre predeterminado al usuario para que el dashboard funcione
        const userWithName = {
          ...response.user,
          name: "Usuario"
        };
        
        setAuthState({
          user: userWithName,
          isAuthenticated: true,
          isLoading: false,
          error: null,
        });
        return;
      }
      
      // Si llegamos aquí, el token no es válido
      localStorage.removeItem(AUTH_TOKEN_KEY);
      setAuthState({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      localStorage.removeItem(AUTH_TOKEN_KEY);
      setAuthState({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
      });
    }
  }, []);

  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  const login = async (email: string, password: string): Promise<boolean> => {
    console.log('AuthContext: Starting login process');
    if (authState.isLoading) {
      console.log('AuthContext: Already loading, returning false');
      return false;
    }
    
    try {
      console.log('AuthContext: Setting loading state');
      setAuthState(prev => ({ ...prev, isLoading: true, error: null }));
      const response = await authService.login(email, password);
      console.log('AuthContext: Got response:', response);
      
      if (response.success && response.data?.token && response.data.user) {
        console.log('AuthContext: Login successful');
        localStorage.setItem(AUTH_TOKEN_KEY, response.data.token);
        setAuthState({
          user: response.data.user,
          isAuthenticated: true,
          isLoading: false,
          error: null,
        });
        return true;
      }
      
      console.log('AuthContext: Login failed');
      setAuthState(prev => ({
        ...prev,
        isLoading: false,
        error: response.error || 'Credenciales inválidas'
      }));
      return false;
    } catch (error) {
      console.error('AuthContext: Login error:', error);
      setAuthState(prev => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Error de autenticación'
      }));
      return false;
    }
  };

  const register = async (name: string, email: string, password: string) => {
    if (authState.isLoading) return;
    
    setAuthState(prev => ({ ...prev, isLoading: true, error: null }));
    try {
      const response = await authService.register(name, email, password);
      if (response.success && response.data?.token && response.data.user) {
        localStorage.setItem(AUTH_TOKEN_KEY, response.data.token);
        setAuthState({
          user: response.data.user,
          isAuthenticated: true,
          isLoading: false,
          error: null,
        });
      } else {
        throw new Error('Error al registrar usuario. Por favor, intenta nuevamente.');
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Error al registrar usuario. Por favor, intenta nuevamente.';
      setAuthState(prev => ({
        ...prev,
        isLoading: false,
        error: errorMessage,
      }));
    }
  };

  const logout = () => {
    localStorage.removeItem(AUTH_TOKEN_KEY);
    setAuthState({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
    });
  };

  const forgotPassword = async (email: string) => {
    if (authState.isLoading) return;
    
    setAuthState(prev => ({ ...prev, isLoading: true, error: null }));
    try {
      const response = await authService.forgotPassword(email);
      if (response.success) {
        setAuthState(prev => ({ ...prev, isLoading: false }));
        return;
      }
      throw new Error('Error al procesar la solicitud');
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Error al procesar la solicitud de recuperación de contraseña.';
      setAuthState(prev => ({
        ...prev,
        isLoading: false,
        error: errorMessage,
      }));
    }
  };

  const resetPassword = async (token: string, password: string) => {
    if (authState.isLoading) return;
    
    setAuthState(prev => ({ ...prev, isLoading: true, error: null }));
    try {
      const response = await authService.resetPassword(token, password);
      if (response.success) {
        setAuthState(prev => ({ ...prev, isLoading: false }));
        return;
      }
      throw new Error('Error al restablecer la contraseña');
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Error al restablecer la contraseña.';
      setAuthState(prev => ({
        ...prev,
        isLoading: false,
        error: errorMessage,
      }));
    }
  };

  return (
    <AuthContext.Provider
      value={{
        ...authState,
        login,
        register,
        logout,
        forgotPassword,
        resetPassword,
        clearError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
};

export { AuthProvider, useAuth };