import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import PageTransition from '../components/PageTransition';

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <>
      <Helmet>
        <title>404 | IkeNation</title>
      </Helmet>

      <PageTransition>
        <main className="min-h-[80vh] flex flex-col items-center justify-center px-4 bg-white font-sans">
          
          {/* Visual indicator */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mb-12"
          >
            <h1 className="text-[120px] md:text-[200px] font-black text-gray-50 leading-none select-none">
              404
            </h1>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-center max-w-md"
          >
            <h2 className="text-3xl font-black text-black uppercase tracking-[0.2em] mb-4">
              Lost in Transition
            </h2>
            <p className="text-gray-500 mb-10 font-medium leading-relaxed">
              The page you are looking for has been moved or no longer exists in our current collection.
            </p>

            <button
              onClick={() => navigate('/')}
              className="group relative inline-flex items-center gap-3 px-8 py-4 bg-black text-white text-[10px] font-black uppercase tracking-[0.4em] rounded-full hover:bg-gray-800 transition-all active:scale-[0.98]"
            >
              <Home size={16} />
              Return Home
              <div className="absolute inset-0 rounded-full border border-black group-hover:scale-110 opacity-0 group-hover:opacity-20 transition-all duration-500" />
            </button>
          </motion.div>

          {/* Luxury background decorations */}
          <div className="fixed inset-0 pointer-events-none -z-10 mix-blend-overlay opacity-30">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_transparent_0%,_#000000_100%)]" />
          </div>
        </main>
      </PageTransition>
    </>
  );
}
