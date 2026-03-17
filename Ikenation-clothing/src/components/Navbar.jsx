import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, Heart, ShoppingCart, User, Menu, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useStore } from '../store/useStore'
import { useProductStore } from '../store/useProductStore'

export default function Navbar() {
  const navigate = useNavigate()
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { cart, wishlist, toggleCart } = useStore()
  const { products } = useProductStore()

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0)
  const wishlistCount = wishlist.length

  const searchResults = searchQuery.trim() === '' 
    ? [] 
    : products.filter(product => 
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        product.category.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 5) // Limit to 5 results

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Shop', href: '/shop' },
    { label: 'Collections', href: '/collections' },
    { label: 'Blog', href: '/blog' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
  ]



  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="shrink-0">
            <button
              onClick={() => navigate('/')}
              className="flex items-center gap-2 hover:opacity-80 transition-opacity"
            >
              <img 
                src="/ike%20nation.jpeg" 
                alt="IkeNation Logo" 
                className="h-10 sm:h-12 w-auto object-contain rounded-md" 
              />
              <span className="text-xl sm:text-2xl font-bold bg-linear-to-r from-black to-gray-600 bg-clip-text text-transparent">
                IkeNation Clothing
              </span>
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => navigate(link.href)}
                className="text-gray-700 hover:text-black transition-colors duration-200 text-sm font-medium"
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Right Icons */}
          <div className="flex items-center space-x-4">
            {/* Search Bar */}
            <div className="relative hidden sm:block">
              <AnimatePresence>
                {isSearchOpen && (
                  <div className="absolute right-10 top-0">
                    <motion.input
                      initial={{ width: 0, opacity: 0 }}
                      animate={{ width: 250, opacity: 1 }}
                      exit={{ width: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search products..."
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black bg-white"
                      autoFocus
                    />
                    
                    {/* Search Results Dropdown */}
                    {searchQuery && (
                      <div className="absolute top-full mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-xl overflow-hidden z-50">
                        {searchResults.length > 0 ? (
                          <div className="max-h-96 overflow-y-auto">
                            {searchResults.map(product => (
                              <div
                                key={product.id}
                                onClick={() => {
                                  navigate(`/product/${product.id}`)
                                  setIsSearchOpen(false)
                                  setSearchQuery('')
                                }}
                                className="flex items-center gap-3 p-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-0"
                              >
                                <img src={product.image} alt={product.name} className="w-12 h-12 object-cover rounded" />
                                <div>
                                  <p className="text-sm font-semibold text-gray-900 line-clamp-1">{product.name}</p>
                                  <p className="text-xs text-gray-500">₵{product.price.toFixed(2)}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="p-4 text-center text-sm text-gray-500">
                            No products found for "{searchQuery}"
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </AnimatePresence>
              <button
                onClick={() => {
                  setIsSearchOpen(!isSearchOpen)
                  if (isSearchOpen) setSearchQuery('')
                }}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <Search size={20} className="text-gray-700" />
              </button>
            </div>

            {/* Wishlist */}
            <button className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <Heart size={20} className="text-gray-700" />
              {wishlistCount > 0 && (
                <span className="absolute top-1 right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Cart */}
            <button
              onClick={toggleCart}
              className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ShoppingCart size={20} className="text-gray-700" />
              {cartCount > 0 && (
                <span className="absolute top-1 right-1 bg-black text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                  {cartCount}
                </span>
              )}
            </button>

            {/* User Profile */}
            <button
              onClick={() => navigate('/account')}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              title="My Account"
            >
              <User size={20} className="text-gray-700" />
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              {isMobileMenuOpen ? (
                <X size={20} className="text-gray-700" />
              ) : (
                <Menu size={20} className="text-gray-700" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden border-t border-gray-200/50 bg-white/50"
            >
              <div className="px-4 py-4 space-y-3">
                {navLinks.map((link) => (
                  <button
                    key={link.label}
                    onClick={() => {
                      navigate(link.href)
                      setIsMobileMenuOpen(false)
                    }}
                    className="block w-full text-left text-gray-700 hover:text-black transition-colors py-2 font-medium"
                  >
                    {link.label}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  )
}
