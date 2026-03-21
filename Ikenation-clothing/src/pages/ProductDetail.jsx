import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart, Share2, MessageCircle, Minus, Plus, X } from 'lucide-react'
import { useStore } from '../store/useStore'
import { useProductStore } from '../store/useProductStore'

export default function ProductDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { products } = useProductStore()
  const product = products.find((p) => p.id === id)

  const [quantity, setQuantity] = useState(1)
  const [selectedSize, setSelectedSize] = useState(product?.sizes?.[0] || '')
  const [selectedImage, setSelectedImage] = useState(0)
  const [isZoomed, setIsZoomed] = useState(false)
  const [zoomPos, setZoomPos] = useState({ x: 0, y: 0 })
  const [showStickyButton, setShowStickyButton] = useState(false)

  const { addToCart, addToWishlist, removeFromWishlist, wishlist } = useStore()



  // Show sticky button when scrolled past the main add to cart button
  useEffect(() => {
    const handleScroll = () => {
      const mainButton = document.getElementById('main-add-to-cart')
      if (mainButton) {
        const rect = mainButton.getBoundingClientRect()
        setShowStickyButton(rect.bottom < 0)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 text-lg mb-4">Product not found</p>
          <button
            onClick={() => navigate('/shop')}
            className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition"
          >
            Back to Shop
          </button>
        </div>
      </div>
    )
  }

  const isInWishlist = wishlist.some((item) => item.id === product.id)
  const productImages = product.images && product.images.length > 0 ? product.images : [product.image]

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: productImages[0],
      quantity,
      size: selectedSize,
    })
  }

  const handleWishlist = () => {
    if (isInWishlist) {
      removeFromWishlist(product.id)
    } else {
      addToWishlist(product)
    }
  }

  const handleWhatsApp = () => {
    const message = `Hi! I'm interested in the ${product.name} (${selectedSize}) - ₵${product.price}. Can you help me with this order?`
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, '_blank')
  }

  const handleZoom = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    setZoomPos({ x, y })
    setIsZoomed(true)
  }

  return (
    <>
      <Helmet>
        <title>{product.name} - IkeNation Clothing</title>
        <meta name="description" content={product.description} />
      </Helmet>

      <main className="min-h-screen bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            {/* Left: Image Gallery */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-4"
            >
              {/* Main Image */}
              <div
                className="relative w-full aspect-square bg-gray-100 rounded-lg overflow-hidden cursor-zoom-in"
                onMouseMove={handleZoom}
                onMouseLeave={() => setIsZoomed(false)}
              >
                <img
                  src={productImages[selectedImage]}
                  crossOrigin="anonymous"
                  loading="lazy"
                  alt={product.name}
                  className={`w-full h-full object-cover transition-transform duration-300 ${
                    isZoomed ? 'scale-150' : 'scale-100'
                  }`}
                  style={
                    isZoomed
                      ? {
                          transformOrigin: `${zoomPos.x}% ${zoomPos.y}%`,
                        }
                      : {}
                  }
                />
              </div>

              {/* Thumbnail Gallery */}
              {productImages.length > 1 && (
                <div className="flex gap-3 overflow-x-auto pb-2 snap-x scrollbar-hide">
                  {productImages.map((img, idx) => (
                    <motion.button
                      key={idx}
                      whileHover={{ scale: 1.05 }}
                      onClick={() => setSelectedImage(idx)}
                      className={`min-w-[5rem] w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors snap-start shrink-0 ${
                        selectedImage === idx
                          ? 'border-black'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <img
                        src={img}
                        crossOrigin="anonymous"
                        loading="lazy"
                        alt={`View ${idx + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </motion.button>
                  ))}
                </div>
              )}
            </motion.div>

            {/* Right: Product Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              {/* Header */}
              <div>
                <p className="text-sm text-gray-600 mb-2">{product.category}</p>
                <h1 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">
                  {product.name}
                </h1>

                {/* Rating */}
                {product.rating && (
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <span
                          key={i}
                          className={`text-lg ${
                            i < Math.floor(product.rating)
                              ? 'text-yellow-400'
                              : 'text-gray-300'
                          }`}
                        >
                          ★
                        </span>
                      ))}
                    </div>
                    <span className="text-sm text-gray-600">
                      {product.rating} ({product.reviews || 0} reviews)
                    </span>
                  </div>
                )}

                {/* Price */}
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-3xl font-bold text-black">
                    ₵{product.price}
                  </span>
                </div>

                {/* Description */}
                <p className="text-gray-700 leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Size Selection */}
              {product.sizes && product.sizes.length > 0 && (
                <div className="space-y-3">
                  <label className="font-bold text-gray-900">Size:</label>
                  <div className="flex gap-2 flex-wrap">
                    {product.sizes.map((size) => (
                      <motion.button
                        key={size}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setSelectedSize(size)}
                        className={`px-4 py-2 border-2 rounded-lg font-semibold transition-colors ${
                          selectedSize === size
                            ? 'border-black bg-black text-white'
                            : 'border-gray-300 text-gray-900 hover:border-black'
                        }`}
                      >
                        {size}
                      </motion.button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity & Actions */}
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="flex items-center border border-gray-300 rounded-lg">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="p-2 hover:bg-gray-100"
                    >
                      <Minus size={18} />
                    </button>
                    <span className="px-6 py-2 font-semibold">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="p-2 hover:bg-gray-100"
                    >
                      <Plus size={18} />
                    </button>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleWishlist}
                    className={`p-3 rounded-lg border-2 transition-colors ${
                      isInWishlist
                        ? 'bg-red-50 border-red-500 text-red-500'
                        : 'border-gray-300 text-gray-700 hover:border-red-500'
                    }`}
                  >
                    <Heart
                      size={20}
                      className={isInWishlist ? 'fill-current' : ''}
                    />
                  </motion.button>
                </div>

                {/* Add to Cart Button */}
                <motion.button
                  id="main-add-to-cart"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleAddToCart}
                  className="w-full bg-black text-white py-4 rounded-lg font-bold text-lg hover:bg-gray-800 transition-colors"
                >
                  Add to Cart
                </motion.button>

                {/* WhatsApp Button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleWhatsApp}
                  className="w-full bg-green-500 text-white py-4 rounded-lg font-bold text-lg hover:bg-green-600 transition-colors flex items-center justify-center gap-2"
                >
                  <MessageCircle size={20} />
                  Order via WhatsApp
                </motion.button>

                {/* Share Button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full border-2 border-gray-300 text-gray-900 py-3 rounded-lg font-bold hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
                >
                  <Share2 size={18} />
                  Share Product
                </motion.button>
              </div>

              {/* Inventory Status */}
              <div className="p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-900">
                  ✓ {product.stock} in stock • Free shipping on orders over ₵50
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </main>

      {/* Sticky Add to Cart Button (Mobile) */}
      <AnimatePresence>
        {showStickyButton && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 z-40 md:hidden shadow-lg"
          >
            <div className="max-w-7xl mx-auto px-4 flex gap-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleWishlist}
                className={`p-3 rounded-lg border-2 transition-colors shrink-0 ${
                  isInWishlist
                    ? 'bg-red-50 border-red-500 text-red-500'
                    : 'border-gray-300 text-gray-700 hover:border-red-500'
                }`}
              >
                <Heart
                  size={20}
                  className={isInWishlist ? 'fill-current' : ''}
                />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleAddToCart}
                className="flex-1 bg-black text-white py-3 rounded-lg font-bold hover:bg-gray-800 transition-colors"
              >
                Add to Cart
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
