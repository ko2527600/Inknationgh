import { useState } from 'react'
import { motion } from 'framer-motion'
import { X, Upload } from 'lucide-react'
import { useProductStore } from '../../store/useProductStore'

export default function ProductForm({ product, onClose }) {
  const { addProduct, updateProduct } = useProductStore()
  const [formData, setFormData] = useState(
    product || {
      name: '',
      price: '',
      description: '',
      category: 'Tops',
      stock: '',
      image: '',
      rating: 5,
      reviews: 0,
      sizes: ['S', 'M', 'L'],
      colors: ['Black'],
    }
  )

  const [imagePreview, setImagePreview] = useState(product?.image || '')

  const categories = ['Tops', 'Bottoms', 'Shoes', 'Accessories']

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result)
        setFormData(prev => ({
          ...prev,
          image: reader.result,
        }))
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (!formData.name || !formData.price || !formData.stock || !formData.image) {
      alert('Please fill in all required fields and upload an image')
      return
    }

    if (product) {
      updateProduct(product.id, formData)
    } else {
      addProduct(formData)
    }
    
    onClose()
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-lg shadow-xl max-w-lg w-full max-h-[90vh] flex flex-col"
      >
        {/* Header */}
        <div className="bg-white border-b border-gray-200 p-6 flex items-center justify-between flex-shrink-0">
          <h2 className="text-2xl font-bold text-gray-900">
            {product ? 'Edit Product' : 'Add Product'}
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg">
            <X size={24} />
          </button>
        </div>

        {/* Form - Scrollable */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 overflow-y-auto flex-1">
          {/* Image Upload */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">Product Image *</label>
            <label className="flex items-center justify-center w-full px-4 py-8 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-gray-400 transition">
              <div className="text-center">
                <Upload size={24} className="mx-auto text-gray-400 mb-2" />
                <p className="text-sm text-gray-600">Click to upload</p>
              </div>
              <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
            </label>
            {imagePreview && (
              <div className="mt-3 w-20 h-20 rounded-lg overflow-hidden">
                <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
              </div>
            )}
          </div>

          {/* Product Name */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-1">Product Name *</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="e.g., Black T-Shirt"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-1">Category *</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          {/* Price */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-1">Price (₵) *</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              placeholder="0.00"
              step="0.01"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          {/* Stock */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-1">Stock Quantity *</label>
            <input
              type="number"
              name="stock"
              value={formData.stock}
              onChange={handleInputChange}
              placeholder="0"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-1">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Describe your product..."
              rows="2"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>
        </form>

        {/* Buttons - Fixed at bottom */}
        <div className="flex gap-3 p-6 border-t border-gray-200 bg-white flex-shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 px-4 py-2 border-2 border-gray-300 text-gray-900 rounded-lg font-semibold hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            onClick={(e) => {
              e.preventDefault()
              const form = document.querySelector('form')
              form.dispatchEvent(new Event('submit', { bubbles: true }))
            }}
            className="flex-1 px-4 py-2 bg-black text-white rounded-lg font-semibold hover:bg-gray-800"
          >
            {product ? 'Update' : 'Add'}
          </button>
        </div>
      </motion.div>
    </motion.div>
  )
}
