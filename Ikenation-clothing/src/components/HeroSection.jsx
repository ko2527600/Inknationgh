import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

export default function HeroSection() {
  const navigate = useNavigate()
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  }

  return (
    <section className="relative w-full h-screen bg-linear-to-br from-black via-gray-900 to-black overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-white rounded-full mix-blend-multiply filter blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gray-500 rounded-full mix-blend-multiply filter blur-3xl"></div>
      </div>

      {/* Content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 h-full flex flex-col items-center justify-center px-4 text-center"
      >
        {/* Subtitle */}
        <motion.p
          variants={itemVariants}
          className="text-sm md:text-base font-semibold text-gray-400 uppercase tracking-widest mb-6"
        >
          Welcome to IkeNation Clothing
        </motion.p>

        {/* Main Heading */}
        <motion.h1
          variants={itemVariants}
          className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-6 leading-tight"
        >
          Super Megger
          <br />
          <span className="bg-linear-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
            Collection
          </span>
        </motion.h1>

        {/* Description */}
        <motion.p
          variants={itemVariants}
          className="text-lg md:text-xl text-gray-300 max-w-2xl mb-8 leading-relaxed"
        >
          Elevate your style with our premium clothing collection. Crafted for those who demand excellence.
        </motion.p>

        {/* CTA Button */}
        <motion.button
          variants={itemVariants}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate('/shop')}
          className="group relative px-8 md:px-12 py-4 md:py-5 bg-white text-black font-bold text-lg rounded-lg overflow-hidden transition-all duration-300"
        >
          <div className="absolute inset-0 bg-linear-to-r from-blue-400 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="relative flex items-center gap-2">
            Shop Now
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </div>
        </motion.button>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <div className="w-6 h-10 border-2 border-white rounded-full flex items-start justify-center p-2">
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-1 h-2 bg-white rounded-full"
            ></motion.div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}
