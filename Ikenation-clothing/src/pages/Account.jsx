import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { ShoppingBag, Heart, User, Package, MapPin, ChevronRight, ArrowLeft, LogIn } from 'lucide-react'
import { useStore } from '../store/useStore'
import { useOrderStore } from '../store/useOrderStore'
import PageTransition from '../components/PageTransition'

export default function Account() {
  const navigate = useNavigate()
  const { cart, wishlist, removeFromWishlist } = useStore()
  const { orders, fetchOrders } = useOrderStore()
  const [activeTab, setActiveTab] = useState('overview')

  // Fetch orders on mount (shows any orders from the current session)
  useState(() => {
    fetchOrders()
  }, [])

  const tabs = [
    { id: 'overview', label: 'Overview', icon: User },
    { id: 'orders', label: 'My Orders', icon: ShoppingBag },
    { id: 'wishlist', label: 'Wishlist', icon: Heart },
  ]

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return (
    <>
      <Helmet>
        <title>My Account | IkeNation Clothing</title>
        <meta name="description" content="View your orders, wishlist, and account details." />
      </Helmet>

      <PageTransition>
        <main className="min-h-screen bg-gray-50 pt-8 pb-16">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

            {/* Back button */}
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-gray-500 hover:text-black transition-colors mb-8 text-sm font-medium"
            >
              <ArrowLeft size={16} />
              Back
            </button>

            {/* Page Header */}
            <div className="mb-8">
              <h1 className="text-4xl font-black text-gray-900">My Account</h1>
              <p className="text-gray-500 mt-2">Manage your orders, wishlist, and preferences</p>
            </div>

            {/* Tab Navigation */}
            <div className="flex gap-2 mb-8 bg-white rounded-xl p-1.5 shadow-sm border border-gray-100 w-fit">
              {tabs.map((tab) => {
                const Icon = tab.icon
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 ${
                      activeTab === tab.id
                        ? 'bg-black text-white shadow'
                        : 'text-gray-600 hover:text-black hover:bg-gray-50'
                    }`}
                  >
                    <Icon size={16} />
                    {tab.label}
                  </button>
                )
              })}
            </div>

            {/* ── OVERVIEW TAB ── */}
            {activeTab === 'overview' && (
              <motion.div
                key="overview"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                {/* Stats Row */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {[
                    { label: 'Cart Items', value: cart.length, sub: `₵${cartTotal.toFixed(2)} total`, icon: ShoppingBag, color: 'from-blue-500 to-blue-600', action: () => navigate('/shop') },
                    { label: 'Wishlist', value: wishlist.length, sub: 'saved items', icon: Heart, color: 'from-pink-500 to-rose-600', action: () => setActiveTab('wishlist') },
                    { label: 'Orders', value: orders.length, sub: 'placed orders', icon: Package, color: 'from-purple-500 to-purple-700', action: () => setActiveTab('orders') },
                  ].map((stat) => {
                    const Icon = stat.icon
                    return (
                      <motion.button
                        key={stat.label}
                        onClick={stat.action}
                        whileHover={{ y: -3 }}
                        className={`bg-gradient-to-br ${stat.color} text-white rounded-2xl p-6 text-left shadow-md hover:shadow-lg transition-shadow`}
                      >
                        <div className="flex items-start justify-between">
                          <div>
                            <p className="text-sm font-medium text-white/80">{stat.label}</p>
                            <p className="text-4xl font-black mt-1">{stat.value}</p>
                            <p className="text-xs text-white/70 mt-1">{stat.sub}</p>
                          </div>
                          <div className="bg-white/20 rounded-xl p-2.5">
                            <Icon size={20} />
                          </div>
                        </div>
                      </motion.button>
                    )
                  })}
                </div>

                {/* Quick Actions */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                  <div className="px-6 py-4 border-b border-gray-100">
                    <h2 className="font-bold text-gray-900">Quick Actions</h2>
                  </div>
                  {[
                    { label: 'Continue Shopping', sub: 'Browse our latest collections', icon: ShoppingBag, path: '/shop' },
                    { label: 'Track My Order', sub: 'Enter your order ID to get live updates', icon: Package, path: '/track-order' },
                    { label: 'Size Guide', sub: 'Find your perfect fit', icon: MapPin, path: '/size-guide' },
                  ].map((action) => {
                    const Icon = action.icon
                    return (
                      <button
                        key={action.label}
                        onClick={() => navigate(action.path)}
                        className="w-full flex items-center justify-between px-6 py-4 hover:bg-gray-50 transition-colors border-b border-gray-50 last:border-0 group"
                      >
                        <div className="flex items-center gap-4">
                          <div className="p-2 bg-gray-100 rounded-lg group-hover:bg-black group-hover:text-white transition-colors">
                            <Icon size={18} className="text-gray-600 group-hover:text-white transition-colors" />
                          </div>
                          <div className="text-left">
                            <p className="font-semibold text-gray-900 text-sm">{action.label}</p>
                            <p className="text-xs text-gray-500">{action.sub}</p>
                          </div>
                        </div>
                        <ChevronRight size={16} className="text-gray-400 group-hover:text-black transition-colors" />
                      </button>
                    )
                  })}
                </div>

                {/* Auth notice banner */}
                <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 flex items-start gap-4">
                  <div className="p-2 bg-amber-100 rounded-lg mt-0.5">
                    <LogIn size={18} className="text-amber-700" />
                  </div>
                  <div>
                    <p className="font-semibold text-amber-900 text-sm">Sign in coming soon</p>
                    <p className="text-amber-700 text-xs mt-1">
                      Full account features (saved addresses, order history) will be available once login is set up. Your cart and wishlist are already saved locally!
                    </p>
                  </div>
                </div>
              </motion.div>
            )}

            {/* ── ORDERS TAB ── */}
            {activeTab === 'orders' && (
              <motion.div
                key="orders"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                {orders.length === 0 ? (
                  <div className="text-center py-20 bg-white rounded-2xl shadow-sm border border-gray-100">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <ShoppingBag size={28} className="text-gray-400" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">No orders yet</h3>
                    <p className="text-gray-500 text-sm mb-6">When you place an order it will appear here.</p>
                    <button
                      onClick={() => navigate('/shop')}
                      className="px-6 py-3 bg-black text-white rounded-lg font-semibold text-sm hover:bg-gray-800 transition-colors"
                    >
                      Start Shopping
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {orders.map((order) => (
                      <motion.div
                        key={order.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6"
                      >
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <p className="font-bold text-gray-900">{order.id}</p>
                            <p className="text-xs text-gray-500 mt-1">
                              {order.date ? new Date(order.date).toLocaleDateString('en-GH', { year: 'numeric', month: 'long', day: 'numeric' }) : '—'}
                            </p>
                          </div>
                          <span className={`text-xs font-semibold px-3 py-1.5 rounded-full ${
                            order.status === 'Delivered' ? 'bg-green-100 text-green-700' :
                            order.status === 'Shipped' ? 'bg-purple-100 text-purple-700' :
                            order.status === 'Processing' ? 'bg-blue-100 text-blue-700' :
                            'bg-yellow-100 text-yellow-700'
                          }`}>
                            {order.status}
                          </span>
                        </div>

                        <div className="space-y-2 mb-4">
                          {(Array.isArray(order.items) ? order.items : []).map((item, idx) => (
                            <div key={idx} className="flex justify-between text-sm">
                              <span className="text-gray-600">{item.name} × {item.quantity}</span>
                              <span className="font-medium">₵{(item.price * item.quantity).toFixed(2)}</span>
                            </div>
                          ))}
                        </div>

                        <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                          <p className="text-sm text-gray-500">Total</p>
                          <p className="font-black text-gray-900 text-lg">₵{(order.total || 0).toFixed(2)}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </motion.div>
            )}

            {/* ── WISHLIST TAB ── */}
            {activeTab === 'wishlist' && (
              <motion.div
                key="wishlist"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                {wishlist.length === 0 ? (
                  <div className="text-center py-20 bg-white rounded-2xl shadow-sm border border-gray-100">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Heart size={28} className="text-gray-400" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">Your wishlist is empty</h3>
                    <p className="text-gray-500 text-sm mb-6">Save items you love and come back to them anytime.</p>
                    <button
                      onClick={() => navigate('/shop')}
                      className="px-6 py-3 bg-black text-white rounded-lg font-semibold text-sm hover:bg-gray-800 transition-colors"
                    >
                      Browse Products
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {wishlist.map((item) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden group"
                      >
                        <div
                          className="relative aspect-square bg-gray-100 cursor-pointer overflow-hidden"
                          onClick={() => navigate(`/product/${item.id}`)}
                        >
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                        <div className="p-4">
                          <p
                            className="font-semibold text-gray-900 text-sm mb-1 cursor-pointer hover:underline line-clamp-1"
                            onClick={() => navigate(`/product/${item.id}`)}
                          >
                            {item.name}
                          </p>
                          <p className="text-gray-900 font-black">₵{item.price?.toFixed(2)}</p>
                          <div className="mt-3 flex gap-2">
                            <button
                              onClick={() => navigate(`/product/${item.id}`)}
                              className="flex-1 py-2 bg-black text-white rounded-lg text-xs font-semibold hover:bg-gray-800 transition-colors"
                            >
                              View Item
                            </button>
                            <button
                              onClick={() => removeFromWishlist(item.id)}
                              className="px-3 py-2 border border-gray-200 rounded-lg text-xs text-red-500 hover:bg-red-50 hover:border-red-200 transition-colors"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </motion.div>
            )}

          </div>
        </main>
      </PageTransition>
    </>
  )
}
