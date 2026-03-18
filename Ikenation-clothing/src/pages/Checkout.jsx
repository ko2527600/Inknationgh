import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Lock, Check, ChevronRight, ArrowLeft, MessageCircle } from 'lucide-react'
import { useStore } from '../store/useStore'
import { useOrderStore } from '../store/useOrderStore'
import { useCMSStore } from '../store/cmsData'

export default function Checkout() {
  const navigate = useNavigate()
  const { cart, clearCart } = useStore()
  const { addOrder } = useOrderStore()
  const { cmsData } = useCMSStore()
  const [step, setStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    paymentMethod: 'momo',
  })

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shipping = subtotal > 100 ? 0 : 15
  const total = subtotal + shipping

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleNextStep = () => {
    if (step < 3) setStep(step + 1)
  }

  const handlePrevStep = () => {
    if (step > 1) setStep(step - 1)
  }

  const handlePlaceOrder = async () => {
    setIsSubmitting(true)
    const orderId = `ORD-${Date.now().toString().slice(-6)}${Math.floor(10 + Math.random() * 90)}` 
    const newOrder = {
      orderId: orderId,
      date: new Date().toISOString(),
      customer: {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        city: formData.city,
        state: formData.state,
        zipCode: formData.zipCode,
        country: formData.country,
      },
      items: [...cart],
      total: total,
      status: 'Pending',
      paymentMethod: formData.paymentMethod,
    }

    try {
      // 1. Save to Database for admin tracking
      await addOrder(newOrder)

      // 2. Prepare WhatsApp Message
      const rawWhatsapp = cmsData.contact?.whatsapp || '233557786833'
      const whatsappNumber = rawWhatsapp.replace(/\D/g, '')
      
      const itemLines = cart.map(item => `- ${item.name} x${item.quantity} (₵${(item.price * item.quantity).toFixed(2)})`).join('\n')
      
      const message = `🚨 *URGENT ORDER ALERT* 🚨\n` +
                      `----------------------------\n` +
                      `📦 *Order ID:* ${orderId}\n` +
                      `👤 *Name:* ${formData.firstName} ${formData.lastName}\n` +
                      `💳 *Paid via:* ${formData.paymentMethod.toUpperCase()}\n` +
                      `💰 *Amount:* ₵${total.toFixed(2)}\n\n` +
                      `📍 *Location:* ${formData.city}, ${formData.address}\n\n` +
                      `🛍️ *Items:* \n${itemLines}\n` +
                      `----------------------------\n` +
                      `Please check my payment and confirm delivery! Thank you.`

      const encodedMessage = encodeURIComponent(message)
      const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`

      // 3. Clear Cart and Redirect Locally
      clearCart()
      
      // 4. Open WhatsApp in new tab and navigate to confirmation
      window.open(whatsappUrl, '_blank')
      navigate('/order-confirmation', { state: { orderId, whatsappUrl } })
      
    } catch (error) {
      console.error("Order failed:", error)
      alert("There was an issue processing your order. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Your cart is empty</h1>
          <p className="text-gray-600 mb-8">Add items before proceeding to checkout</p>
          <button
            onClick={() => navigate('/shop')}
            className="bg-black text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-600 hover:text-black transition-colors mb-6"
          >
            <ArrowLeft size={20} />
            Back
          </button>
          <h1 className="text-4xl font-bold text-gray-900">Secure Checkout</h1>
          <div className="flex items-center gap-2 mt-2 text-sm text-gray-600">
            <Lock size={16} />
            <span>Your payment information is secure and encrypted</span>
          </div>
        </div>

        {/* Progress Indicator */}
        <div className="mb-12">
          <div className="flex items-center justify-between max-w-md">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center">
                <motion.div
                  animate={{
                    backgroundColor: s <= step ? '#000000' : '#e5e7eb',
                    color: s <= step ? '#ffffff' : '#6b7280',
                  }}
                  className="w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all"
                >
                  {s < step ? <Check size={20} /> : s}
                </motion.div>
                {s < 3 && (
                  <div
                    className={`w-12 h-1 mx-2 ${
                      s < step ? 'bg-black' : 'bg-gray-300'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between max-w-md mt-4 text-sm font-medium">
            <span className={step >= 1 ? 'text-black' : 'text-gray-500'}>Shipping</span>
            <span className={step >= 2 ? 'text-black' : 'text-gray-500'}>Payment</span>
            <span className={step >= 3 ? 'text-black' : 'text-gray-500'}>Review</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-lg p-8 shadow-sm"
            >
              {/* Step 1: Shipping */}
              {step === 1 && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-gray-900">Shipping Address</h2>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      name="firstName"
                      placeholder="First Name"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="col-span-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                    />
                    <input
                      type="text"
                      name="lastName"
                      placeholder="Last Name"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="col-span-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                    />
                  </div>

                  <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                  />

                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                  />

                  <input
                    type="text"
                    name="address"
                    placeholder="Street Address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                  />

                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      name="city"
                      placeholder="City"
                      value={formData.city}
                      onChange={handleInputChange}
                      className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                    />
                    <input
                      type="text"
                      name="state"
                      placeholder="State/Province"
                      value={formData.state}
                      onChange={handleInputChange}
                      className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      name="zipCode"
                      placeholder="ZIP Code"
                      value={formData.zipCode}
                      onChange={handleInputChange}
                      className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                    />
                    <input
                      type="text"
                      name="country"
                      placeholder="Country"
                      value={formData.country}
                      onChange={handleInputChange}
                      className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                    />
                  </div>
                </div>
              )}

              {/* Step 2: Payment */}
              {step === 2 && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-gray-900">Payment Method</h2>

                  <div className="space-y-3">
                    {['momo', 'card', 'paypal', 'bank'].map((method) => (
                      <label key={method} className="flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all" style={{
                        borderColor: formData.paymentMethod === method ? '#000' : '#e5e7eb',
                        backgroundColor: formData.paymentMethod === method ? '#f9fafb' : '#fff'
                      }}>
                        <input
                          type="radio"
                          name="paymentMethod"
                          value={method}
                          checked={formData.paymentMethod === method}
                          onChange={handleInputChange}
                          className="w-4 h-4"
                        />
                        <span className="ml-3 font-medium text-gray-900 capitalize">
                          {method === 'momo' && 'Mobile Money'}
                          {method === 'card' && 'Credit/Debit Card'}
                          {method === 'paypal' && 'PayPal'}
                          {method === 'bank' && 'Bank Transfer'}
                        </span>
                      </label>
                    ))}
                  </div>

                  {formData.paymentMethod === 'momo' && (
                    <div className="mt-6 pt-6 border-t border-gray-200 bg-green-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-700">
                        <strong>Pay via Mobile Money (MoMo):</strong><br/><br/>
                        1. Send <strong>₵{total.toFixed(2)}</strong> to <strong>055 778 6833</strong> (Merchant: IkeNation Clothing).<br/>
                        2. Use your phone number as the reference.<br/>
                        3. Click "Place Order" below once payment is sent.
                      </p>
                    </div>
                  )}

                  {formData.paymentMethod === 'card' && (
                    <div className="space-y-4 mt-6 pt-6 border-t border-gray-200">
                      <input
                        type="text"
                        placeholder="Card Number"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                      />
                      <div className="grid grid-cols-2 gap-4">
                        <input
                          type="text"
                          placeholder="MM/YY"
                          className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                        />
                        <input
                          type="text"
                          placeholder="CVV"
                          className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                        />
                      </div>
                    </div>
                  )}

                  {formData.paymentMethod === 'bank' && (
                    <div className="mt-6 pt-6 border-t border-gray-200 bg-blue-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-700">
                        <strong>Bank Transfer Details:</strong><br/>
                        Account Name: IkeNation Clothing<br/>
                        Account Number: 1234567890<br/>
                        Bank: Example Bank<br/>
                        Reference: Your Order ID
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* Step 3: Review */}
              {step === 3 && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-gray-900">Final Confirmation</h2>

                  <div className="bg-gray-50 p-6 rounded-lg space-y-4">
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">Shipping To:</h3>
                      <p className="text-gray-700">
                        {formData.firstName} {formData.lastName}<br/>
                        {formData.address}<br/>
                        {formData.city}, {formData.state} {formData.zipCode}
                      </p>
                    </div>

                    <div className="border-t border-gray-200 pt-4">
                      <h3 className="font-semibold text-gray-900 mb-2">Payment Instructions:</h3>
                      {formData.paymentMethod === 'momo' ? (
                        <div className="bg-green-100 p-4 rounded-lg border border-green-200">
                           <p className="text-sm text-green-900">
                             Please send <strong>₵{total.toFixed(2)}</strong> to <strong>055 778 6833</strong>.<br/>
                             Confirm on WhatsApp after sending!
                           </p>
                        </div>
                      ) : (
                        <p className="text-gray-700 capitalize">
                          {formData.paymentMethod === 'card' && 'Credit/Debit Card'}
                          {formData.paymentMethod === 'paypal' && 'PayPal'}
                          {formData.paymentMethod === 'bank' && 'Bank Transfer'}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="border-t border-gray-200 pt-6">
                    <h3 className="font-semibold text-gray-900 mb-4">Order Items:</h3>
                    <div className="space-y-3">
                      {cart.map((item) => (
                        <div key={item.id} className="flex justify-between items-center">
                          <div>
                            <p className="font-medium text-gray-900">{item.name}</p>
                            <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                          </div>
                          <p className="font-semibold text-gray-900">₵{(item.price * item.quantity).toFixed(2)}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex gap-4 mt-8 pt-8 border-t border-gray-200">
                {step > 1 && (
                  <button
                    onClick={handlePrevStep}
                    className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-900 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                  >
                    Back
                  </button>
                )}
                {step < 3 ? (
                  <button
                    onClick={handleNextStep}
                    className="flex-1 px-6 py-3 bg-black text-white rounded-lg font-semibold hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
                  >
                    Continue <ChevronRight size={20} />
                  </button>
                ) : (
                  <button
                    onClick={handlePlaceOrder}
                    disabled={isSubmitting}
                    className={`flex-1 px-6 py-3 bg-black text-white rounded-lg font-semibold transition-colors flex items-center justify-center gap-3 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-800'}`}
                  >
                    {isSubmitting ? (
                      'Processing...'
                    ) : (
                      <>
                        <MessageCircle size={20} />
                        Confirm Order on WhatsApp
                      </>
                    )}
                  </button>
                )}
              </div>
            </motion.div>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg p-6 shadow-sm sticky top-24">
              <h3 className="text-lg font-bold text-gray-900 mb-6">Order Summary</h3>

              <div className="space-y-3 mb-6 pb-6 border-b border-gray-200">
                {cart.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="text-gray-600">{item.name} x{item.quantity}</span>
                    <span className="font-medium text-gray-900">₵{(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-3 mb-6 pb-6 border-b border-gray-200">
                <div className="flex justify-between text-gray-700">
                  <span>Subtotal</span>
                  <span>₵{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? 'FREE' : `₵${shipping.toFixed(2)}`}</span>
                </div>
              </div>

              <div className="flex justify-between items-center text-lg font-bold text-gray-900">
                <span>Total</span>
                <span>₵{total.toFixed(2)}</span>
              </div>

              {shipping === 0 && (
                <p className="text-xs text-green-600 mt-4 text-center">Free shipping on orders over ₵100</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
