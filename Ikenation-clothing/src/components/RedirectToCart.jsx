import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../store/useStore';

export default function RedirectToCart() {
  const navigate = useNavigate();
  const { toggleCart, isCartOpen } = useStore();

  useEffect(() => {
    // If the cart isn't already open, open it
    if (!isCartOpen) {
      toggleCart();
    }
    // Briefly delay the navigate to let the animation start
    const timer = setTimeout(() => {
      navigate('/', { replace: true });
    }, 100);
    
    return () => clearTimeout(timer);
  }, [navigate, toggleCart, isCartOpen]);

  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black"></div>
    </div>
  );
}
