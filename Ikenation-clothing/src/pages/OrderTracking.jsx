import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { Package, Truck, CheckCircle, Clock, MapPin, Phone, Mail } from 'lucide-react'
import { pageMetadata } from '../utils/seoConfig'
import PageTransition from '../components/PageTransition'
import ScrollReveal from '../components/ScrollReveal'
import { useOrderStore } from '../store/useOrderStore'

export default function OrderTracking() {
  const [orderNumber, setOrderNumber] = useState('')
  const [email, setEmail] = useState('')
  const [trackingData, setTrackingData] = useState(null)
  const [isSearching, setIsSearching] = useState(false)
  const [error, setError] = useState('')

  const { orders } = useOrderStore()

  const handleSearch = (e) => {
    e.preventDefault()
    setError('')
    setIsSearching(true)

    // Simulate API call
    setTimeout(() => {
      const liveOrder = orders.find(o => o.id === orderNumber)

      if (liveOrder && liveOrder.customer.email === email) {
        // Map store order to tracking UI format
        const formattedData = {
          email: liveOrder.customer.email,
          orderNumber: liveOrder.id,
          status: liveOrder.status,
          carrier: 'IkeNation Direct',
          trackingNumber: `TRK-${liveOrder.id.split('-')[1]}`,
          estimatedDelivery: '3-5 Business Days',
          orderDate: new Date(liveOrder.date).toLocaleDateString(),
          items: liveOrder.items,
          timeline: [
            {
              status: 'Order Confirmed',
              date: new Date(liveOrder.date).toLocaleDateString(),
              time: new Date(liveOrder.date).toLocaleTimeString(),
              location: 'System',
              completed: true,
            },
            {
              status: 'Processing',
              date: 'Pending',
              time: 'Pending',
              location: 'Fulfillment Center',
              completed: ['Processing', 'Shipped', 'Delivered'].includes(liveOrder.status),
            },
            {
              status: 'Shipped',
              date: 'Pending',
              time: 'Pending',
              location: 'In Transit',
              completed: ['Shipped', 'Delivered'].includes(liveOrder.status),
            },
            {
              status: 'Delivered',
              date: 'Pending',
              time: 'Expected',
              location: 'Destination',
              completed: liveOrder.status === 'Delivered',
            },
          ],
        }
        setTrackingData(formattedData)
      } else {
        setError('Order not found. Please check your order number and email.')
        setTrackingData(null)
      }
      setIsSearching(false)
    }, 1000)
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Order Confirmed':
        return <CheckCircle size={20} className="text-green-500" />
      case 'Processing':
        return <Package size={20} className="text-blue-500" />
      case 'Shipped':
        return <Truck size={20} className="text-blue-500" />
      case 'In Transit':
        return <Truck size={20} className="text-orange-500" />
      case 'Out for Delivery':
        return <MapPin size={20} className="text-orange-500" />
      case 'Delivered':
        return <CheckCircle size={20} className="text-green-500" />
      default:
        return <Clock size={20} className="text-gray-400" />
    }
  }

  const metadata = pageMetadata.tracking || {
    title: 'Track Your Order - IkeNation Clothing',
    description: 'Track your IkeNation order in real-time with our order tracking system',
    keywords: 'order tracking, shipping status, delivery tracking',
    canonical: 'https://ikenation.com/track-order',
  }

  return (
    <>
      <Helmet>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <meta name="keywords" content={metadata.keywords} />
        <link rel="canonical" href={metadata.canonical} />
      </Helmet>

      <PageTransition>
        <main className="min-h-screen bg-white">
          {/* Hero Section */}
          <section className="bg-linear-to-br from-black to-gray-900 text-white py-16 md:py-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <ScrollReveal>
                <h1 className="text-5xl md:text-6xl font-black mb-6">Track Your Order</h1>
                <p className="text-xl text-gray-300 max-w-2xl">
                  Enter your order number and email to view real-time shipping status
                </p>
              </ScrollReveal>
            </div>
          </section>

          {/* Search Section */}
          <section className="py-16 md:py-24">
            <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.form
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                onSubmit={handleSearch}
                className="bg-gray-50 p-8 rounded-lg shadow-md"
              >
                <div className="space-y-6">
                  {/* Order Number */}
                  <div>
                    <label className="block text-sm font-bold text-gray-900 mb-2">
                      Order Number
                    </label>
                    <input
                      type="text"
                      value={orderNumber}
                      onChange={(e) => setOrderNumber(e.target.value)}
                      placeholder="e.g., ORD-1234567890"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-bold text-gray-900 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your@email.com"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                    />
                  </div>

                  {/* Error Message */}
                  {error && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg"
                    >
                      {error}
                    </motion.div>
                  )}

                  {/* Submit Button */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={isSearching}
                    className="w-full bg-black text-white py-4 rounded-lg font-bold text-lg hover:bg-gray-800 transition-colors disabled:opacity-50"
                  >
                    {isSearching ? 'Searching...' : 'Track Order'}
                  </motion.button>
                </div>
              </motion.form>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg"
              >
                <p className="text-sm text-blue-900">
                  <strong>Note:</strong> Enter your exact Order ID (e.g., ORD-1709848201923) and the email you used during checkout to view live tracking details.
                </p>
              </motion.div>
            </div>
          </section>

          {/* Tracking Results */}
          {trackingData && (
            <section className="py-16 md:py-24 bg-gray-50">
              <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="space-y-8"
                >
                  {/* Order Header */}
                  <div className="bg-white p-8 rounded-lg shadow-md">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Order Number</p>
                        <p className="text-2xl font-bold text-gray-900">{trackingData.orderNumber}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Status</p>
                        <p className="text-2xl font-bold text-orange-500">{trackingData.status}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Estimated Delivery</p>
                        <p className="text-2xl font-bold text-gray-900">{trackingData.estimatedDelivery}</p>
                      </div>
                    </div>

                    {/* Carrier Info */}
                    <div className="border-t border-gray-200 pt-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <p className="text-sm text-gray-600 mb-1">Shipping Carrier</p>
                          <p className="font-semibold text-gray-900">{trackingData.carrier}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600 mb-1">Tracking Number</p>
                          <p className="font-semibold text-gray-900">{trackingData.trackingNumber}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Timeline */}
                  <div className="bg-white p-8 rounded-lg shadow-md">
                    <h3 className="text-2xl font-bold text-gray-900 mb-8">Delivery Timeline</h3>
                    <div className="space-y-6">
                      {trackingData.timeline.map((event, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1, duration: 0.4 }}
                          className="flex gap-4"
                        >
                          {/* Timeline Dot */}
                          <div className="flex flex-col items-center">
                            <div className={`p-2 rounded-full ${event.completed ? 'bg-green-100' : 'bg-gray-100'}`}>
                              {getStatusIcon(event.status)}
                            </div>
                            {index < trackingData.timeline.length - 1 && (
                              <div className={`w-1 h-12 ${event.completed ? 'bg-green-300' : 'bg-gray-300'}`}></div>
                            )}
                          </div>

                          {/* Event Details */}
                          <div className="flex-1 pb-6">
                            <h4 className={`font-bold ${event.completed ? 'text-gray-900' : 'text-gray-600'}`}>
                              {event.status}
                            </h4>
                            <p className="text-sm text-gray-600 mt-1">
                              {event.date} at {event.time}
                            </p>
                            <p className="text-sm text-gray-600 flex items-center gap-1 mt-1">
                              <MapPin size={14} />
                              {event.location}
                            </p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Order Items */}
                  <div className="bg-white p-8 rounded-lg shadow-md">
                    <h3 className="text-2xl font-bold text-gray-900 mb-6">Order Items</h3>
                    <div className="space-y-4">
                      {trackingData.items.map((item, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: index * 0.1 }}
                          className="flex justify-between items-center pb-4 border-b border-gray-200 last:border-b-0"
                        >
                          <div>
                            <p className="font-semibold text-gray-900">{item.name}</p>
                            <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                          </div>
                          <p className="font-semibold text-gray-900">₵{item.price}</p>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Support */}
                  <div className="bg-blue-50 border border-blue-200 p-8 rounded-lg">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Need Help?</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <a href="tel:0557786833" className="flex items-center gap-3 text-blue-600 hover:text-blue-800">
                        <Phone size={20} />
                        <span>Call us: 0557786833</span>
                      </a>
                      <a href="mailto:info@ikenation.com" className="flex items-center gap-3 text-blue-600 hover:text-blue-800">
                        <Mail size={20} />
                        <span>Email: info@ikenation.com</span>
                      </a>
                    </div>
                  </div>
                </motion.div>
              </div>
            </section>
          )}
        </main>
      </PageTransition>
    </>
  )
}
