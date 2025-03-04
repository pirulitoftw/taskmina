import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import LoginForm from '../components/auth/LoginForm';
import RegisterForm from '../components/auth/RegisterForm';
import ForgotPasswordForm from '../components/auth/ForgotPasswordForm';
import ResetPasswordForm from '../components/auth/ResetPasswordForm';
import { CheckSquare } from 'lucide-react';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

type FormType = 'login' | 'register' | 'forgot-password' | 'reset-password';

const AuthPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const resetToken = searchParams.get('token');
  
  const [currentForm, setCurrentForm] = useState<FormType>(
    resetToken ? 'reset-password' : 'login'
  );
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleToggleForm = () => {
    setCurrentForm(current => current === 'login' ? 'register' : 'login');
  };

  const handleForgotPassword = () => {
    setCurrentForm('forgot-password');
  };

  const handleBackToLogin = () => {
    setCurrentForm('login');
  };

  const handleResetSuccess = () => {
    setCurrentForm('login');
  };

  const handleLoginError = (message: string) => {
    console.log('AuthPage: Attempting to show toast:', message);
    try {
      toast.error(message, {
        position: "top-right",
        autoClose: 5000,
        pauseOnHover: true,
        draggable: true,
        closeOnClick: false,
        onOpen: () => console.log('Toast opened'),
        onClose: () => console.log('Toast closed')
      });
      console.log('AuthPage: Toast called successfully');
    } catch (error) {
      console.error('AuthPage: Error showing toast:', error);
    }
  };

  // Cambiar slide cada 5 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);
  
  // Testimonios ficticios
  const testimonials = [
    {
      quote: "Taskmina transformó mi forma de trabajar. Ahora puedo organizar mis tareas de manera eficiente.",
      author: "María González",
      role: "Diseñadora Gráfica",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80"
    },
    {
      quote: "Desde que uso Taskmina, nunca olvido una fecha límite. ¡Mi productividad ha aumentado un 40%!",
      author: "Carlos Mendoza",
      role: "Desarrollador de Software",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80"
    },
    {
      quote: "La interfaz intuitiva y las opciones de priorización hacen que gestionar proyectos sea muy sencillo.",
      author: "Laura Sánchez",
      role: "Project Manager",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80"
    }
  ];
  
  return (
    <div className="min-h-screen bg-antiflash-white flex flex-col">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        style={{ zIndex: 9999 }}
      />
      <div className="bg-teal text-white py-4">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center gap-2">
            <CheckSquare size={28} className="text-turquoise" />
            <h1 className="text-2xl font-bold">Taskmina</h1>
          </div>
        </div>
      </div>
      
      <div className="flex-1 flex flex-col md:flex-row">
        <div className="w-full md:w-1/2 bg-teal relative overflow-hidden">
          {/* Formas abstractas animadas */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-[10%] left-[20%] w-32 h-32 bg-turquoise rounded-lg rotate-12 animate-float"></div>
            <div className="absolute top-[30%] right-[15%] w-24 h-24 bg-gold rounded-full animate-float-delay"></div>
            <div className="absolute bottom-[20%] left-[30%] w-40 h-20 bg-turquoise rounded-lg -rotate-12 animate-float-slow"></div>
            <div className="absolute bottom-[35%] right-[25%] w-16 h-16 bg-white/30 rounded-lg rotate-45 animate-pulse"></div>
            <div className="absolute top-[60%] left-[10%] w-20 h-20 bg-white/20 rounded-full animate-float-delay-slow"></div>
            <div className="absolute top-[15%] right-[30%] w-28 h-14 bg-gold/40 rounded-lg -rotate-6 animate-float-slow"></div>
          </div>
          
          {/* Contenido principal */}
          <div className="relative z-10 flex items-center justify-center h-full p-8">
            <div className="max-w-md text-white">
              <h2 className="text-3xl font-bold mb-4">Gestiona tus tareas de forma eficiente</h2>
              <p className="mb-6 text-turquoise">
                Organiza tu día, establece prioridades y aumenta tu productividad con Taskmina.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-2">
                  <CheckSquare size={20} className="text-turquoise mt-1" />
                  <span>Crea y organiza tus tareas fácilmente</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckSquare size={20} className="text-turquoise mt-1" />
                  <span>Establece prioridades y fechas límite</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckSquare size={20} className="text-turquoise mt-1" />
                  <span>Visualiza tu progreso y mantente motivado</span>
                </li>
              </ul>
              
              {/* Carrusel de testimonios */}
              <div className="bg-teal-700/30 backdrop-blur-sm rounded-lg p-4 border border-turquoise/20">
                <div className="relative overflow-hidden">
                  <div 
                    className="transition-transform duration-500 ease-in-out flex"
                    style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                  >
                    {testimonials.map((testimonial, index) => (
                      <div key={index} className="w-full flex-shrink-0">
                        <p className="italic text-white/90 mb-3">"{testimonial.quote}"</p>
                        <div className="flex items-center gap-3">
                          <img 
                            src={testimonial.image} 
                            alt={testimonial.author} 
                            className="w-10 h-10 rounded-full object-cover border-2 border-turquoise"
                          />
                          <div>
                            <p className="font-medium">{testimonial.author}</p>
                            <p className="text-xs text-turquoise">{testimonial.role}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Indicadores del carrusel */}
                <div className="flex justify-center gap-2 mt-4">
                  {testimonials.map((_, index) => (
                    <button 
                      key={index}
                      onClick={() => setCurrentSlide(index)}
                      className={`w-2 h-2 rounded-full transition-colors ${
                        currentSlide === index ? 'bg-turquoise' : 'bg-white/30'
                      }`}
                      aria-label={`Ver testimonio ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="w-full md:w-1/2 flex items-center justify-center p-4 md:p-8 bg-gradient-to-br from-antiflash-white to-gray-100">
          <div className="w-full max-w-md">
            <div className="bg-white/80 backdrop-blur-sm p-8 rounded-lg shadow-xl border border-gray-200">
              {currentForm === 'login' && (
                <LoginForm 
                  onToggleForm={handleToggleForm} 
                  onForgotPassword={handleForgotPassword}
                  onError={handleLoginError}
                />
              )}
              
              {currentForm === 'register' && (
                <RegisterForm onToggleForm={handleToggleForm} />
              )}
              
              {currentForm === 'forgot-password' && (
                <ForgotPasswordForm onBack={handleBackToLogin} />
              )}
              
              {currentForm === 'reset-password' && resetToken && (
                <ResetPasswordForm 
                  token={resetToken} 
                  onSuccess={handleResetSuccess}
                />
              )}
            </div>
          </div>
        </div>
      </div>
      
      <footer className="bg-jet text-white py-3 text-center text-sm">
        <p>&copy; 2025 Taskmina - Creado por Josibell Guerrero</p>
      </footer>
    </div>
  );
};

export default AuthPage;