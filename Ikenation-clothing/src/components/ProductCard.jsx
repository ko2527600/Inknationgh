import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Heart, ShoppingCart } from 'lucide-react'
import { motion } from 'framer-motion'
import { useStore } from '../store/useStore'

export default function ProductCard({ product }) {
  const [isHovered, setIsHovered] = useState(false)
  const { addToCart, addToWishlist, removeFromWishlist, wishlist } = useStore()

  const isInWishlist = wishlist.some((item) => item.id === product.id)

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
    })
  }

  const handleWishlist = () => {
    if (isInWishlist) {
      removeFromWishlist(product.id)
    } else {
      addToWishlist(product)
    }
  }

  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300"
    >
      {/* Image Container */}
      <Link to={`/product/${product.id}`} className="block relative h-64 md:h-72 bg-gray-200 overflow-hidden">
        <img
          src={product.images?.length > 0 ? product.images[0] : product.image}
          alt={product.name}
          crossOrigin="anonymous"
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />

        {/* Badge */}
        {product.badge && (
          <div className="absolute top-4 left-4 bg-black text-white px-3 py-1 rounded-full text-xs font-bold uppercase z-10">
            {product.badge}
          </div>
        )}

        {/* Inventory Badge */}
        {product.stock === 0 ? (
          <div className="absolute top-4 left-4 bg-red-600 text-white px-3 py-1 rounded-full text-xs font-bold uppercase z-10">
            Out of Stock
          </div>
        ) : product.stock <= 3 ? (
          <div className="absolute top-4 left-4 bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold uppercase z-10">
            Only {product.stock} Left!
          </div>
        ) : null}

        {/* Wishlist Button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleWishlist}
          className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-md hover:shadow-lg transition-all"
        >
          <Heart
            size={20}
            className={`transition-colors ${
              isInWishlist ? 'fill-red-500 text-red-500' : 'text-gray-700'
            }`}
          />
        </motion.button>

        {/* Add to Cart Button (Mobile Always Visible, Desktop Hover) */}
        <motion.button
          initial={false}
          animate={{ y: isHovered ? 0 : 20 }}
          transition={{ duration: 0.3 }}
          onClick={(e) => { e.preventDefault(); handleAddToCart(); }}
          className={`absolute bottom-4 left-1/2 transform -translate-x-1/2 w-4/5 bg-black text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2 hover:bg-gray-800 transition-all md:opacity-0 md:group-hover:opacity-100 z-10 ${isHovered ? 'opacity-100' : 'opacity-100'}`}
        >
          <ShoppingCart size={18} />
          Add to Cart
        </motion.button>
      </Link>

      {/* Product Info */}
      <Link to={`/product/${product.id}`} className="block p-4">
        <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
          {product.name}
        </h3>
        <p className="text-sm text-gray-600 mb-3 line-clamp-1">
          {product.category}
        </p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold text-black">
              ₵{product.price}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-gray-500 line-through">
                ₵{product.originalPrice}
              </span>
            )}
          </div>
          {product.rating && (
            <div className="flex items-center gap-1">
              <span className="text-yellow-400">★</span>
              <span className="text-sm font-semibold text-gray-700">
                {product.rating}
              </span>
            </div>
          )}
        </div>
      </Link>
    </motion.div>
  )
}
