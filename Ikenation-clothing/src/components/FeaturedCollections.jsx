import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { motion } from 'framer-motion'
import ProductCard from './ProductCard'
import { useProductStore } from '../store/useProductStore'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

export default function FeaturedCollections() {
  const featuredCollections = [
    { id: 1, title: 'New Arrivals' },
    { id: 2, title: 'Bestsellers' },
  ]

  const { products } = useProductStore()

  // Filter products by tag or just take the newest
  const getFeaturedProducts = (title) => {
    if (title === 'New Arrivals') {
      return [...products].sort((a, b) => b.id - a.id).slice(0, 8) // newest 8
    } else if (title === 'Bestsellers') {
      // Mock finding bestsellers for now by reversing array
      return [...products].slice(0, 8).reverse()
    }
    return products.slice(0, 8)
  }

  const CollectionSection = ({ title, products }) => (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="py-8 md:py-20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-12">
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
            {title}
          </h2>
          <div className="w-20 h-1 bg-linear-to-r from-blue-400 to-purple-600"></div>
        </div>

        {/* Swiper */}
        <div className="relative">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={24}
            slidesPerView={1}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 4 },
            }}
            navigation={{
              prevEl: `.prev-${title.replace(/\s+/g, '-')}`,
              nextEl: `.next-${title.replace(/\s+/g, '-')}`,
            }}
            pagination={{ clickable: true }}
            autoplay={{ delay: 5000, disableOnInteraction: true }}
            className="pb-12"
          >
            {products.map((product) => (
              <SwiperSlide key={product.id}>
                <ProductCard product={product} />
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Navigation Buttons */}
          <button
            className={`prev-${title.replace(/\s+/g, '-')} absolute left-0 top-1/3 -translate-y-1/2 -translate-x-16 z-10 p-2 bg-black text-white rounded-full hover:bg-gray-800 transition-colors hidden md:flex items-center justify-center`}
          >
            <ChevronLeft size={24} />
          </button>
          <button
            className={`next-${title.replace(/\s+/g, '-')} absolute right-0 top-1/3 -translate-y-1/2 translate-x-16 z-10 p-2 bg-black text-white rounded-full hover:bg-gray-800 transition-colors hidden md:flex items-center justify-center`}
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </div>
    </motion.section>
  )

  return (
    <>
      {featuredCollections.map((collection, index) => (
        <CollectionSection 
          key={collection.id || index} 
          title={collection.title} 
          products={getFeaturedProducts(collection.title)}
        />
      ))}
    </>
  )
}
