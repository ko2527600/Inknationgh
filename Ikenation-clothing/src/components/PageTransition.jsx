import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

export default function PageTransition({ children }) {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate page load
    const timer = setTimeout(() => setIsLoading(false), 300)
    return () => clearTimeout(timer)
  }, [])

  const pageVariants = {
    initial: {
      opacity: 0,
      y: 20,
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
      },
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.3,
        ease: 'easeIn',
      },
    },
  }

  const loadingVariants = {
    initial: { opacity: 1 },
    animate: { opacity: 0 },
    exit: { opacity: 0 },
  }

  return (
    <>
      {isLoading && (
        <motion.div
          variants={loadingVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 0.3 }}
          className="fixed inset-0 bg-white z-50 pointer-events-none"
        >
          <div className="flex items-center justify-center h-full">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              className="w-8 h-8 border-3 border-gray-300 border-t-black rounded-full"
            />
          </div>
        </motion.div>
      )}

      <motion.div
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        {children}
      </motion.div>
    </>
  )
}
