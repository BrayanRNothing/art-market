import { motion, AnimatePresence } from 'framer-motion';
import { X, User, Lock, LogOut, ArrowRight, Loader2 } from 'lucide-react';
import { useState } from 'react';
import axios from 'axios';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  isLoggedIn: boolean;
  onLogin: (userData: any) => void;
  onLogout: () => void;
  onError: () => void;
}

const API_URL = 'http://localhost:5000/api/auth';

const AuthModal = ({ isOpen, onClose, isLoggedIn, onLogin, onLogout, onError }: AuthModalProps) => {
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  // Form states
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    fullName: '',
    email: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (authMode === 'register' && formData.password !== formData.confirmPassword) {
      setError('Las contraseñas no coinciden');
      setLoading(false);
      return;
    }

    try {
      const endpoint = authMode === 'login' ? '/login' : '/register';
      const payload = authMode === 'login' 
        ? { username: formData.username, password: formData.password }
        : { 
            username: formData.username, 
            password: formData.password, 
            full_name: formData.fullName, 
            email: formData.email 
          };

      const response = await axios.post(`${API_URL}${endpoint}`, payload);
      
      // Save token to localStorage
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      
      onLogin(response.data.user);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error en la conexión');
      onError();
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[150] cursor-none"
          />

          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-screen w-full md:w-[35%] lg:w-[30%] bg-[#080808] border-l border-white/10 z-[151] p-8 md:p-10 flex flex-col shadow-2xl pointer-events-auto"
          >
            <button onClick={onClose} className="absolute top-6 right-6 text-gray-500 hover:text-primary transition-colors z-[160]">
              <X size={20} />
            </button>

            <div className="flex-1 flex flex-col justify-center">
              {!isLoggedIn ? (
                <div className="flex flex-col">
                  <div className="mb-8">
                    <h2 className="text-3xl md:text-4xl font-medium text-primary italic font-serif mb-2">
                      {authMode === 'login' ? 'Bienvenido.' : 'Crear Cuenta.'}
                    </h2>
                    <p className="text-gray-500 text-xs">
                      {authMode === 'login' ? 'Accede para gestionar tu arte.' : 'Publica tus obras y gestiona tu galería.'}
                    </p>
                  </div>

                  {error && <p className="text-red-500 text-[10px] mb-4 uppercase tracking-wider">{error}</p>}

                  <form className="space-y-6" onSubmit={handleSubmit}>
                    <div className={authMode === 'register' ? 'grid grid-cols-1 sm:grid-cols-2 gap-5' : 'space-y-6'}>
                      {authMode === 'register' && (
                        <div className="space-y-1">
                          <label className="text-[9px] uppercase tracking-[0.2em] text-gray-500 font-bold">Nombre</label>
                          <input 
                            name="fullName"
                            type="text" 
                            value={formData.fullName}
                            onChange={handleChange}
                            placeholder="Tu nombre"
                            className="w-full bg-transparent border-b border-white/10 py-2 focus:border-primary outline-none text-primary transition-colors placeholder:text-gray-800 text-sm"
                          />
                        </div>
                      )}

                      <div className="space-y-1">
                        <label className="text-[9px] uppercase tracking-[0.2em] text-gray-500 font-bold">Usuario</label>
                        <input 
                          name="username"
                          type="text" 
                          value={formData.username}
                          onChange={handleChange}
                          placeholder="usuario"
                          className="w-full bg-transparent border-b border-white/10 py-2 focus:border-primary outline-none text-primary transition-colors placeholder:text-gray-800 text-sm"
                          required
                        />
                      </div>
                    </div>

                    {authMode === 'register' && (
                      <div className="space-y-1">
                        <label className="text-[9px] uppercase tracking-[0.2em] text-gray-500 font-bold">Email (Opcional)</label>
                        <input 
                          name="email"
                          type="email" 
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="correo@ejemplo.com"
                          className="w-full bg-transparent border-b border-white/10 py-2 focus:border-primary outline-none text-primary transition-colors placeholder:text-gray-800 text-sm"
                        />
                      </div>
                    )}

                    <div className={authMode === 'register' ? 'grid grid-cols-1 sm:grid-cols-2 gap-5' : 'space-y-6'}>
                      <div className="space-y-1">
                        <label className="text-[9px] uppercase tracking-[0.2em] text-gray-500 font-bold">
                          Contraseña
                        </label>
                        <input 
                          name="password"
                          type="password" 
                          value={formData.password}
                          onChange={handleChange}
                          placeholder="••••••••"
                          className="w-full bg-transparent border-b border-white/10 py-2 focus:border-primary outline-none text-primary transition-colors placeholder:text-gray-800 text-sm"
                          required
                        />
                      </div>

                      {authMode === 'register' && (
                        <div className="space-y-1">
                          <label className="text-[9px] uppercase tracking-[0.2em] text-gray-500 font-bold">Confirmar Contraseña</label>
                          <input 
                            name="confirmPassword"
                            type="password" 
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            placeholder="••••••••"
                            className="w-full bg-transparent border-b border-white/10 py-2 focus:border-primary outline-none text-primary transition-colors placeholder:text-gray-800 text-sm"
                            required
                          />
                        </div>
                      )}
                    </div>

                    <div className="pt-4">
                      <button 
                        disabled={loading}
                        className="group w-full py-4 bg-primary text-black rounded-xl flex items-center justify-center gap-3 transition-all duration-300 font-bold uppercase tracking-widest text-[10px] disabled:opacity-50"
                      >
                        {loading ? <Loader2 size={14} className="animate-spin" /> : (authMode === 'login' ? 'Iniciar Sesión' : 'Registrarse')}
                        {!loading && <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />}
                      </button>
                    </div>
                  </form>

                  <div className="mt-8 pt-6 text-center border-t border-white/5">
                    <p className="text-gray-600 text-[10px] mb-3">
                      {authMode === 'login' ? '¿No tienes cuenta?' : '¿Ya eres parte?'}
                    </p>
                    <button 
                      onClick={() => setAuthMode(authMode === 'login' ? 'register' : 'login')}
                      className="text-primary text-[10px] font-bold uppercase tracking-widest hover:underline underline-offset-4"
                    >
                      {authMode === 'login' ? 'Regístrate aquí' : 'Inicia Sesión'}
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center text-center">
                  <div className="w-20 h-20 rounded-full border border-primary/20 p-1 mb-6">
                    <div className="w-full h-full rounded-full overflow-hidden bg-white/5 flex items-center justify-center">
                      <User size={32} className="text-primary/20" />
                    </div>
                  </div>
                  <h3 className="text-2xl text-primary font-serif italic mb-1">
                    {JSON.parse(localStorage.getItem('user') || '{}').full_name || JSON.parse(localStorage.getItem('user') || '{}').username}
                  </h3>
                  <p className="text-gray-500 text-[10px] uppercase tracking-widest mb-10">Artista Verificado</p>
                  
                  <div className="w-full space-y-3 max-w-xs">
                    <button className="w-full py-4 bg-white/5 hover:bg-white/10 text-primary border border-white/10 rounded-xl transition-all text-[10px] font-bold uppercase tracking-widest">
                      Ir a Mi Perfil
                    </button>
                    <button 
                      onClick={() => {
                        localStorage.removeItem('token');
                        localStorage.removeItem('user');
                        onLogout();
                      }}
                      className="w-full py-4 text-red-500/50 hover:text-red-500 transition-all flex items-center justify-center gap-2 text-[10px] font-bold uppercase tracking-widest"
                    >
                      <LogOut size={14} /> Cerrar Sesión
                    </button>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default AuthModal;
