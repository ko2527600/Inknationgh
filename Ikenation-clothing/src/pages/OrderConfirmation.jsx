import React, { useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { CheckCircle, Package, Truck, Mail } from 'lucide-react'

export default function OrderConfirmation() {
  const navigate = useNavigate()
  const location = useLocation()
  const [orderNumber] = React.useState(() => location.state?.orderId || `ORD-${Date.now()}`)

  useEffect(() => {
    // Auto-redirect after 10 seconds
    const timer = setTimeout(() => {
      navigate('/shop')
    }, 10000)
    return () => clearTimeout(timer)
  }, [navigate])

  return (
    <div className="min-h-screen bg-linear-to-b from-green-50 to-white pt-24 pb-12">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Success Animation */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, type: 'spring' }}
          className="text-center mb-8"
        >
          <CheckCircle size={80} className="text-green-500 mx-auto mb-6" />
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Order Confirmed!</h1>
          <p className="text-xl text-gray-600">Thank you for your purchase</p>
        </motion.div>

        {/* Order Details */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="bg-white rounded-lg shadow-lg p-8 mb-8"
        >
          <div className="grid grid-cols-2 gap-6 mb-8 pb-8 border-b border-gray-200">
            <div>
              <p className="text-sm text-gray-600 mb-1">Order Number</p>
              <p className="text-2xl font-bold text-gray-900">{orderNumber}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">Order Date</p>
              <p className="text-2xl font-bold text-gray-900">{new Date().toLocaleDateString()}</p>
            </div>
          </div>

          {/* Timeline */}
          <div className="space-y-6 mb-8">
            <div className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center text-white mb-2">
                  <CheckCircle size={20} />
                </div>
                <div className="w-1 h-12 bg-green-200"></div>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Order Confirmed</h3>
                <p className="text-sm text-gray-600">Your order has been received</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-gray-600 mb-2">
                  <Package size={20} />
                </div>
                <div className="w-1 h-12 bg-gray-200"></div>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Processing</h3>
                <p className="text-sm text-gray-600">We're preparing your items</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-gray-600">
                  <Truck size={20} />
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Shipped</h3>
                <p className="text-sm text-gray-600">On its way to you</p>
              </div>
            </div>
          </div>

          {/* Next Steps */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <div className="flex gap-3">
              <Mail size={24} className="text-blue-600 shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Confirmation Email Sent</h3>
                <p className="text-sm text-gray-700">
                  A confirmation email with your order details and tracking information has been sent to your email address.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <button
            onClick={() => navigate('/shop')}
            className="flex-1 px-6 py-3 bg-black text-white rounded-lg font-semibold hover:bg-gray-800 transition-colors"
          >
            Continue Shopping
          </button>
          <button
            onClick={() => navigate('/')}
            className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-900 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
          >
            Back to Home
          </button>
        </motion.div>

        {/* Auto-redirect message */}
        <p className="text-center text-sm text-gray-600 mt-8">
          Redirecting to shop in 10 seconds...
        </p>
      </div>
    </div>
  )
}
