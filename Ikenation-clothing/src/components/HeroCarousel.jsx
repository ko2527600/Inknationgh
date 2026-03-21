import { useState, useEffect, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useCMSStore } from '../store/cmsData'

export default function HeroCarousel() {
  const navigate = useNavigate()
  const { cmsData, isLoading } = useCMSStore()
  const [currentSlide, setCurrentSlide] = useState(0)

  const slides = useMemo(() => cmsData?.home?.heroSlides || [], [cmsData?.home?.heroSlides])

  // Debug: Log slides
  console.log('HeroCarousel slides:', slides)

  useEffect(() => {
    if (!slides || slides.length === 0) return

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [slides, slides?.length])

  if (isLoading) {
    return (
      <section className="relative w-full h-[60vh] md:h-screen bg-black animate-pulse flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
      </section>
    )
  }

  if (!slides || slides.length === 0) {
    return (
      <section className="relative w-full h-screen bg-gray-200 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 font-semibold">No hero slides configured</p>
          <p className="text-gray-500 text-sm mt-2">Go to Admin Dashboard to add hero slides</p>
        </div>
      </section>
    )
  }

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  return (
    <section className="relative w-full h-[60vh] md:h-screen overflow-hidden bg-black">
      <AnimatePresence mode="wait">
        {slides.map((slide, index) => (
          index === currentSlide && (
            <motion.div
              key={slide.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
              className="absolute inset-0"
            >
              {/* Blurred Background Layer (for colors and atmosphere) */}
              <div className="absolute inset-0 overflow-hidden">
                <img
                  src={slide.image}
                  alt=""
                  crossOrigin="anonymous"
                  className="w-full h-full object-cover blur-2xl scale-125 opacity-60"
                />
              </div>

              {/* Landscape Image Layer */}
              <div className="absolute inset-0 overflow-hidden">
                <img
                  src={slide.image}
                  alt={slide.title}
                  crossOrigin="anonymous"
                  fetchPriority="high"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Dark Overlay for Text Readability */}
              <div className="absolute inset-0 bg-black/50 pointer-events-none"></div>

              {/* Content */}
              <div className="relative z-10 h-full flex flex-col items-center justify-center px-4 text-center">
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                  className="text-sm md:text-base font-semibold text-white uppercase tracking-widest mb-6"
                >
                  Welcome to IkeNation Clothing
                </motion.p>

                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                  className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-6 leading-tight"
                >
                  {slide.title}
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                  className="text-lg md:text-xl text-gray-100 max-w-2xl mb-8 leading-relaxed"
                >
                  {slide.subtitle}
                </motion.p>

                <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate('/shop')}
                  className="group relative px-8 md:px-12 py-4 md:py-5 bg-white text-black font-bold text-lg rounded-lg overflow-hidden transition-all duration-300"
                >
                  <div className="absolute inset-0 bg-linear-to-r from-blue-400 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative">{slide.cta}</div>
                </motion.button>
              </div>
            </motion.div>
          )
        ))}
      </AnimatePresence>

      {/* Navigation Buttons */}
      <button
        onClick={prevSlide}
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 p-3 bg-white/20 hover:bg-white/40 text-white rounded-full transition-all duration-300 backdrop-blur-sm"
      >
        <ChevronLeft size={24} />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 p-3 bg-white/20 hover:bg-white/40 text-white rounded-full transition-all duration-300 backdrop-blur-sm"
      >
        <ChevronRight size={24} />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {slides.map((_, index) => (
          <motion.button
            key={index}
            onClick={() => setCurrentSlide(index)}
            animate={{
              width: index === currentSlide ? 32 : 8,
              backgroundColor: index === currentSlide ? '#ffffff' : 'rgba(255,255,255,0.5)',
            }}
            className="h-2 rounded-full transition-all duration-300"
          />
        ))}
      </div>
    </section>
  )
}
