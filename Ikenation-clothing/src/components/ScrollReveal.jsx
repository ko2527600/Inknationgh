import { motion } from 'framer-motion'

export default function ScrollReveal({
  children,
  delay = 0,
  duration = 0.6,
  direction = 'up',
}) {
  const getInitialVariant = () => {
    switch (direction) {
      case 'up':
        return { opacity: 0, y: 40 }
      case 'down':
        return { opacity: 0, y: -40 }
      case 'left':
        return { opacity: 0, x: -40 }
      case 'right':
        return { opacity: 0, x: 40 }
      default:
        return { opacity: 0, y: 40 }
    }
  }

  const variants = {
    hidden: getInitialVariant(),
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration,
        delay,
        ease: 'easeOut',
      },
    },
  }

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
      variants={variants}
    >
      {children}
    </motion.div>
  )
}
