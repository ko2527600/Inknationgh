import { Truck, Lock, Headphones, Package, Shield, Clock } from 'lucide-react'
import { motion } from 'framer-motion'
import { useCMSStore } from '../store/cmsData'

const iconMap = {
  Truck,
  Lock,
  Headphones,
  Package,
  Shield,
  Clock,
}

export default function TrustBar() {
  const { cmsData } = useCMSStore()
  const rawTrustItems = cmsData?.home?.trustBar || []
  
  if (rawTrustItems.length === 0) return null

  const trustItems = rawTrustItems.map(item => ({
    ...item,
    icon: iconMap[item.icon] || Truck,
  }))

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  }

  return (
    <motion.section
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="bg-gray-50 py-12 md:py-16 border-y border-gray-200"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {trustItems.map((item, index) => {
            const Icon = item.icon
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                className="flex flex-col items-center text-center"
              >
                {/* Icon */}
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                  className="mb-4 p-3 bg-white rounded-full shadow-md"
                >
                  <Icon size={32} className="text-black" />
                </motion.div>

                {/* Title */}
                <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2">
                  {item.text}
                </h3>

                {/* Description */}
                <p className="text-sm md:text-base text-gray-600">
                  {item.description || 'Experience our premium service.'}
                </p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </motion.section>
  )
}
