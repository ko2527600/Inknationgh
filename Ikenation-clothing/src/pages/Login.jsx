import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, LogIn, UserPlus, ArrowRight, AlertCircle, ShoppingBag } from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';
import { Helmet } from 'react-helmet-async';
import PageTransition from '../components/PageTransition';

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, register, isAuthenticated, isLoading, error, clearError } = useAuthStore();
  
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
  });

  useEffect(() => {
    if (isAuthenticated) {
      const from = location.state?.from?.pathname || '/admin';
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, location]);

  useEffect(() => {
    clearError();
  }, [isLogin, clearError]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isLogin) {
        await login(formData.email, formData.password);
      } else {
        await register(formData);
      }
    } catch (err) {
      console.error('Auth error:', err);
    }
  };

  return (
    <>
      <Helmet>
        <title>{isLogin ? 'Login' : 'Register'} | IkeNation Admin</title>
      </Helmet>

      <PageTransition>
        <div className="min-h-screen flex flex-col md:flex-row bg-black overflow-hidden font-sans">
          
          {/* LEFT SIDE: Cinematic Brand Experience */}
          <div className="relative w-full md:w-1/2 lg:w-[60%] h-[30vh] md:h-screen overflow-hidden border-b md:border-b-0 md:border-r border-white/5">
            {/* High-End Background Image */}
            <motion.div 
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              transition={{ duration: 10, ease: "easeOut" }}
              className="absolute inset-0 bg-cover bg-center grayscale-[30%] hover:grayscale-0 transition-all duration-1000"
              style={{ backgroundImage: 'url("/assets/auth-bg.jpg")' }}
            />
            
            {/* Luxury Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-black/80 via-black/20 to-transparent z-10" />
            
            {/* Brand content */}
            <div className="absolute inset-0 z-20 flex flex-col justify-end p-8 md:p-16 lg:p-24">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="max-w-xl"
              >
                <div className="w-16 h-px bg-white/40 mb-8" />
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-extralight text-white tracking-[0.2em] uppercase leading-tight">
                   The New <br />
                   <span className="font-black text-white/90">Standard</span>
                </h1>
                <p className="mt-6 text-xs md:text-sm text-white/40 font-bold uppercase tracking-[0.4em] leading-relaxed">
                   IkeNation Global Administrative Terminal — Est. 2026
                </p>
              </motion.div>
            </div>

            {/* Logo in corner */}
            <div className="absolute top-8 left-8 md:top-12 md:left-12 z-30">
               <img src="/assets/auth-logo.png" className="w-12 h-12 md:w-16 md:h-16 rounded-xl border border-white/10 shadow-2xl" alt="IK" />
            </div>
          </div>

          {/* RIGHT SIDE: Authentication Terminal */}
          <div className="w-full md:w-1/2 lg:w-[40%] h-auto md:h-screen bg-[#0a0a0a] flex items-center justify-center p-8 md:p-12 lg:p-20 relative">
            
            {/* Subtle light effect */}
            <div className="absolute top-0 right-0 w-full h-full bg-blue-500/5 blur-[120px] rounded-full pointer-events-none" />

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="w-full max-w-md relative z-10"
            >
              <div className="mb-10 text-center md:text-left">
                <h2 className="text-3xl font-light text-white tracking-[0.1em] uppercase mb-1">
                  {isLogin ? 'Welcome Back' : 'Create Profile'}
                </h2>
                <div className="h-0.5 w-12 bg-white/10 mt-4 hidden md:block" />
                <p className="mt-4 text-[10px] text-white/30 font-bold uppercase tracking-[0.2em]">
                  {isLogin ? 'Entry identification required for system access' : 'Initialize a new administrative node'}
                </p>
              </div>

              {/* Error Message */}
              {error && (
                <motion.div 
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="mb-8 bg-red-500/10 border-l-2 border-red-500/50 p-4 flex items-center gap-3 transition-all"
                >
                  <AlertCircle className="text-red-500 shrink-0" size={16} />
                  <p className="text-[10px] text-red-200 uppercase tracking-widest font-bold">{error}</p>
                </motion.div>
              )}

              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="space-y-4">
                  {!isLogin && (
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-[9px] text-white/30 font-black uppercase tracking-widest ml-1">First Name</label>
                        <input
                          name="firstName"
                          type="text"
                          required
                          value={formData.firstName}
                          onChange={handleChange}
                          className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-white/30 focus:bg-white/10 transition-all text-white font-light tracking-wide text-sm"
                          placeholder="EX: ISAAC"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[9px] text-white/30 font-black uppercase tracking-widest ml-1">Last Name</label>
                        <input
                          name="lastName"
                          type="text"
                          required
                          value={formData.lastName}
                          onChange={handleChange}
                          className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-white/30 focus:bg-white/10 transition-all text-white font-light tracking-wide text-sm"
                          placeholder="EX: ADDO"
                        />
                      </div>
                    </div>
                  )}

                  <div className="space-y-2 relative group">
                    <label className="text-[9px] text-white/30 font-black uppercase tracking-widest ml-1 group-focus-within:text-white transition-colors">Identification (Email)</label>
                    <div className="relative">
                      <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-white/20" size={16} />
                      <input
                        name="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="block w-full pl-14 pr-5 py-4 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-white/30 focus:bg-white/10 transition-all text-white font-light tracking-wide text-sm"
                        placeholder="ADMIN@IKENATION.COM"
                      />
                    </div>
                  </div>

                  <div className="space-y-2 relative group">
                    <label className="text-[9px] text-white/30 font-black uppercase tracking-widest ml-1 group-focus-within:text-white transition-colors">Access Key (Password)</label>
                    <div className="relative">
                      <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-white/20" size={16} />
                      <input
                        name="password"
                        type="password"
                        required
                        value={formData.password}
                        onChange={handleChange}
                        className="block w-full pl-14 pr-5 py-4 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-white/30 focus:bg-white/10 transition-all text-white font-light tracking-wide text-sm"
                        placeholder="••••••••"
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="relative w-full py-5 rounded-xl text-[10px] font-black uppercase tracking-[0.4em] text-black bg-white hover:bg-white/90 active:scale-[0.98] transition-all disabled:opacity-30 disabled:cursor-not-allowed group/btn overflow-hidden"
                  >
                    {isLoading ? (
                      <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: 'linear' }} className="w-5 h-5 border-2 border-black border-t-transparent rounded-full mx-auto" />
                    ) : (
                      <span className="flex items-center justify-center gap-3">
                        {isLogin ? 'Initiate Access' : 'Create Profile'}
                        <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                      </span>
                    )}
                  </button>
                </div>
              </form>

              <div className="mt-12 pt-8 border-t border-white/5 flex flex-col items-center gap-6">
                <button
                  type="button"
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-[9px] font-bold text-white/20 hover:text-white transition-all uppercase tracking-[0.2em]"
                >
                  {isLogin ? "No Access? Request Credentials" : "Existing Admin? Return to Entry"}
                </button>
                
                <div className="flex items-center gap-6">
                   <button onClick={() => navigate('/')} className="text-white/20 hover:text-white transition-colors text-[9px] font-black uppercase tracking-[0.3em]">
                      Retail Terminal
                   </button>
                   <div className="h-1 w-1 rounded-full bg-white/10" />
                   <p className="text-white/10 text-[9px] font-black uppercase tracking-[0.3em]">
                      IKN GLOBAL © 2026
                   </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </PageTransition>
    </>
  );
}


