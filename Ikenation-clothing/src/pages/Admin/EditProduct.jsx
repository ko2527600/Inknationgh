import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Upload } from 'lucide-react'
import AdminLayout from './AdminLayout'
import { useProductStore } from '../../store/useProductStore'

export default function EditProduct() {
  const navigate = useNavigate()
  const { id } = useParams()
  const { products, updateProduct } = useProductStore()
  const product = products.find((p) => p.id === id)

  const [formData, setFormData] = useState({
    name: product?.name || '',
    price: product?.price || '',
    description: product?.description || '',
    category: product?.category || 'Tops',
    stock: product?.stock || '',
    images: product?.images?.length > 0 ? product?.images : (product?.image ? [product.image] : []), // Load existing images
    sizes: product?.sizes || [],
    colors: product?.colors || [],
  })

  const categories = ['Tops', 'Bottoms', 'Shoes', 'Accessories', 'Outerwear']
  const availableSizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL']
  const availableColors = ['Black', 'White', 'Navy', 'Red', 'Blue', 'Green', 'Gray', 'Brown']


  if (!product) {
    return (
      <AdminLayout>
        <div className="text-center py-12">
          <p className="text-gray-600 font-medium">Product not found</p>
          <button
            onClick={() => navigate('/admin/products')}
            className="mt-4 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition"
          >
            Back to Products
          </button>
        </div>
      </AdminLayout>
    )
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files)
    if (files.length > 0) {
      // Convert all files to Base64 using Promises
      const base64Promises = files.map((file) => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader()
          reader.onloadend = () => resolve(reader.result)
          reader.onerror = reject
          reader.readAsDataURL(file)
        })
      })

      try {
        const base64Images = await Promise.all(base64Promises)
        // Batch update state to prevent race conditions
        setFormData((prev) => ({
          ...prev,
          images: [...prev.images, ...base64Images]
        }))
      } catch (error) {
        console.error("Error reading files:", error)
        alert("There was an error processing your images.")
      }
    }
  }

  const handleImageUrl = (e) => {
    const url = e.target.value
    if (url) {
      setFormData((prev) => ({ 
        ...prev, 
        images: [...prev.images, url] 
      }))
      e.target.value = '' // clear input
    }
  }

  const removeImage = (indexToRemove) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, index) => index !== indexToRemove)
    }))
  }

  const toggleSize = (size) => {
    setFormData((prev) => ({
      ...prev,
      sizes: prev.sizes.includes(size)
        ? prev.sizes.filter((s) => s !== size)
        : [...prev.sizes, size],
    }))
  }

  const toggleColor = (color) => {
    setFormData((prev) => ({
      ...prev,
      colors: prev.colors.includes(color)
        ? prev.colors.filter((c) => c !== color)
        : [...prev.colors, color],
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!formData.name || !formData.price || formData.images.length === 0 || !formData.stock) {
      alert('Please fill in all required fields and have at least one image')
      return
    }

    updateProduct(product.id, {
      name: formData.name,
      price: parseFloat(formData.price),
      description: formData.description,
      category: formData.category,
      stock: parseInt(formData.stock),
      image: formData.images[0], // Keep for backward compatibility/thumbnail
      images: formData.images,
      sizes: formData.sizes.length > 0 ? formData.sizes : availableSizes,
      colors: formData.colors.length > 0 ? formData.colors : ['Black'],
    })

    alert('Product updated successfully!')
    navigate('/admin/products')
  }

  return (
    <AdminLayout>
      <div>
        {/* Header */}
        <button
          onClick={() => navigate('/admin/products')}
          className="flex items-center gap-2 text-gray-600 hover:text-black transition mb-6"
        >
          <ArrowLeft size={20} />
          Back to Products
        </button>

        <h1 className="text-3xl font-bold text-gray-900 mb-8">Edit Product</h1>

        {/* Form */}
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          onSubmit={handleSubmit}
          className="bg-white rounded-lg shadow p-8 max-w-2xl"
        >
          {/* Product Name */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Product Name *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          {/* Price & Stock */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Price (₵) *
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                step="0.01"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Stock Quantity *
              </label>
              <input
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>
          </div>

          {/* Category */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Category
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Description */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows="4"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          {/* Image Upload */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Product Image *
            </label>
            <div className="space-y-4">
              {/* File Upload */}
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-black transition cursor-pointer">
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageUpload}
                  className="hidden"
                  id="image-upload"
                />
                <label htmlFor="image-upload" className="cursor-pointer">
                  <Upload size={32} className="mx-auto text-gray-400 mb-2" />
                  <p className="text-sm text-gray-600">Click to upload multiple images</p>
                </label>
              </div>

              {/* Or Image URL */}
              <div>
                <p className="text-sm text-gray-600 mb-2">Or add image by URL:</p>
                <div className="flex gap-2">
                  <input
                    type="url"
                    id="url-input"
                    placeholder="https://example.com/image.jpg"
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                  />
                  <button 
                    type="button" 
                    onClick={() => {
                      const input = document.getElementById('url-input');
                      handleImageUrl({ target: { value: input.value } });
                      input.value = '';
                    }}
                    className="px-4 py-2 bg-black text-white rounded-lg font-semibold"
                  >
                    Add
                  </button>
                </div>
              </div>

              {/* Image Previews Gallery */}
              {formData.images.length > 0 && (
                <div className="mt-4">
                  <p className="text-sm text-gray-600 mb-2">Gallery ({formData.images.length} images):</p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {formData.images.map((img, idx) => (
                      <div key={idx} className="relative group aspect-square">
                        <img
                          src={img}
                          alt={`Preview ${idx + 1}`}
                          className="w-full h-full object-cover rounded-lg border border-gray-200"
                        />
                        {/* Delete Button */}
                        <button
                          type="button"
                          onClick={() => removeImage(idx)}
                          className="absolute top-2 right-2 bg-red-500 text-white w-6 h-6 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          ×
                        </button>
                        {/* Primary Badge */}
                        {idx === 0 && (
                          <span className="absolute bottom-2 left-2 bg-black text-white text-xs px-2 py-1 rounded">Primary</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Sizes */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-900 mb-3">
              Available Sizes
            </label>
            <div className="flex flex-wrap gap-2">
              {availableSizes.map((size) => (
                <button
                  key={size}
                  type="button"
                  onClick={() => toggleSize(size)}
                  className={`px-4 py-2 rounded-lg font-medium transition ${
                    formData.sizes.includes(size)
                      ? 'bg-black text-white'
                      : 'bg-gray-200 text-gray-900 hover:bg-gray-300'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Colors */}
          <div className="mb-8">
            <label className="block text-sm font-semibold text-gray-900 mb-3">
              Available Colors
            </label>
            <div className="flex flex-wrap gap-2">
              {availableColors.map((color) => (
                <button
                  key={color}
                  type="button"
                  onClick={() => toggleColor(color)}
                  className={`px-4 py-2 rounded-lg font-medium transition ${
                    formData.colors.includes(color)
                      ? 'bg-black text-white'
                      : 'bg-gray-200 text-gray-900 hover:bg-gray-300'
                  }`}
                >
                  {color}
                </button>
              ))}
            </div>
          </div>

          {/* Submit Buttons */}
          <div className="flex gap-4">
            <button
              type="submit"
              className="flex-1 px-6 py-3 bg-black text-white rounded-lg font-semibold hover:bg-gray-800 transition"
            >
              Update Product
            </button>
            <button
              type="button"
              onClick={() => navigate('/admin/products')}
              className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-900 rounded-lg font-semibold hover:bg-gray-50 transition"
            >
              Cancel
            </button>
          </div>
        </motion.form>
      </div>
    </AdminLayout>
  )
}
