import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { CheckCircle, Package, Truck, MessageCircle, ArrowRight } from 'lucide-react'

export default function OrderConfirmation() {
  const navigate = useNavigate()
  const location = useLocation()
  const { orderId, whatsappUrl } = location.state || {}
  const orderNumber = orderId || `ORD-${Date.now().toString().slice(-6)}`

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Success Header */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center mb-10"
        >
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={48} className="text-green-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Order Received!</h1>
          <p className="text-xl text-gray-600">Your order {orderNumber} is pending confirmation.</p>
        </motion.div>

        {/* WhatsApp Action Card */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-black text-white rounded-2xl p-8 mb-8 text-center shadow-2xl relative overflow-hidden"
        >
          <div className="relative z-10">
            <h2 className="text-2xl font-bold mb-4">One Last Step!</h2>
            <p className="text-gray-300 mb-8 leading-relaxed">
              To finalize your order and arrange delivery, please confirm your order on WhatsApp.
              We've prepared your order summary for you!
            </p>
            
            <a
              href={whatsappUrl || 'https://wa.me/233557786833'}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all transform hover:scale-105"
            >
              <MessageCircle size={24} />
              Confirm on WhatsApp
            </a>
            
            <p className="text-xs text-gray-500 mt-6">
              If your WhatsApp didn't open automatically, click the button above.
            </p>
          </div>
          
          {/* Subtle background pattern */}
          <div className="absolute top-0 right-0 -mr-12 -mt-12 opacity-10">
            <MessageCircle size={200} />
          </div>
        </motion.div>

        {/* Order Details Card */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-8"
        >
          <div className="flex justify-between items-center mb-8 pb-8 border-b border-gray-100">
            <div>
              <p className="text-sm text-gray-500 uppercase tracking-widest font-bold mb-1">Order Number</p>
              <p className="text-2xl font-black text-gray-900">{orderNumber}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500 uppercase tracking-widest font-bold mb-1">Date</p>
              <p className="text-lg font-bold text-gray-900">{new Date().toLocaleDateString()}</p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white shrink-0">
                  <CheckCircle size={16} />
                </div>
                <div className="w-0.5 h-12 bg-green-100"></div>
              </div>
              <div>
                <h3 className="font-bold text-gray-900">Order Placed</h3>
                <p className="text-sm text-gray-600 font-medium">Order saved to our system</p>
              </div>
            </div>

            <div className="flex gap-4 opacity-50">
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-400 shrink-0">
                  <Package size={16} />
                </div>
                <div className="w-0.5 h-12 bg-gray-100"></div>
              </div>
              <div>
                <h3 className="font-bold text-gray-900">Processing</h3>
                <p className="text-sm text-gray-600 font-medium">Pending WhatsApp confirmation</p>
              </div>
            </div>

            <div className="flex gap-4 opacity-50">
              <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-400 shrink-0">
                <Truck size={16} />
              </div>
              <div>
                <h3 className="font-bold text-gray-900">Delivery</h3>
                <p className="text-sm text-gray-600 font-medium">Arranged after payment/confirmation</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Home Link */}
        <div className="text-center">
          <button
            onClick={() => navigate('/shop')}
            className="inline-flex items-center gap-2 text-gray-600 hover:text-black font-bold transition-all"
          >
            ← Continue Shopping
          </button>
        </div>
      </div>
    </div>
  )
}
