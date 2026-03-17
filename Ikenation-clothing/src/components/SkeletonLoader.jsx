import { motion } from 'framer-motion'

export default function SkeletonLoader({ count = 12 }) {
  const skeletons = Array.from({ length: count })

  const shimmer = {
    initial: { backgroundPosition: '200% 0' },
    animate: { backgroundPosition: '-200% 0' },
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {skeletons.map((_, index) => (
        <motion.div
          key={index}
          variants={shimmer}
          initial="initial"
          animate="animate"
          transition={{ duration: 2, repeat: Infinity }}
          className="bg-linear-to-r from-gray-200 via-gray-100 to-gray-200 rounded-lg overflow-hidden"
          style={{
            backgroundSize: '200% 100%',
          }}
        >
          {/* Image Skeleton */}
          <div className="h-64 md:h-72 bg-gray-300"></div>

          {/* Content Skeleton */}
          <div className="p-4 space-y-3">
            <div className="h-4 bg-gray-300 rounded w-3/4"></div>
            <div className="h-3 bg-gray-300 rounded w-1/2"></div>
            <div className="h-4 bg-gray-300 rounded w-1/3"></div>
          </div>
        </motion.div>
      ))}
    </div>
  )
}
