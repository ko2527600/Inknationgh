import { useState, useMemo } from 'react'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { Filter, X } from 'lucide-react'
import { pageMetadata, getStructuredData } from '../utils/seoConfig'
import ProductCard from '../components/ProductCard'
import PageTransition from '../components/PageTransition'
import ScrollReveal from '../components/ScrollReveal'
import { useCMSStore } from '../store/cmsData'
import { useProductStore } from '../store/useProductStore'

export default function Collections() {
  const { cmsData } = useCMSStore()
  const { products } = useProductStore()
  const collectionsData = cmsData?.collections || { title: 'Our Collections', description: '' }
  
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedSize, setSelectedSize] = useState('All')
  const [selectedColor, setSelectedColor] = useState('All')
  const [selectedMaterial, setSelectedMaterial] = useState('All')
  const [isNewOnly, setIsNewOnly] = useState(false)
  const [priceRange, setPriceRange] = useState([0, 300])
  const [sortBy, setSortBy] = useState('newest')
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false)

  // All products from Admin store
  const allProducts = useMemo(() => products || [], [products])

  const categories = ['All', 'T-Shirts', 'Jackets', 'Pants', 'Shirts', 'Hoodies', 'Sweaters']

  // Extract unique sizes, colors, materials
  const sizes = ['All', ...new Set(allProducts.flatMap(p => p.sizes))]
  const colors = ['All', ...new Set(allProducts.flatMap(p => p.colors))]
  const materials = ['All', ...new Set(allProducts.map(p => p.material))]

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let filtered = allProducts.filter((product) => {
      const categoryMatch = selectedCategory === 'All' || product.category === selectedCategory
      const priceMatch = product.price >= priceRange[0] && product.price <= priceRange[1]
      const sizeMatch = selectedSize === 'All' || product.sizes.includes(selectedSize)
      const colorMatch = selectedColor === 'All' || product.colors.includes(selectedColor)
      const materialMatch = selectedMaterial === 'All' || product.material === selectedMaterial
      const newMatch = !isNewOnly || product.isNew
      
      return categoryMatch && priceMatch && sizeMatch && colorMatch && materialMatch && newMatch
    })

    // Sort
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price)
        break
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price)
        break
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating)
        break
      default:
        break
    }

    return filtered
  }, [allProducts, selectedCategory, selectedSize, selectedColor, selectedMaterial, isNewOnly, priceRange, sortBy])

  const metadata = pageMetadata.shop
  const breadcrumbData = getStructuredData('breadcrumb', {
    items: [
      { name: 'Home', url: 'https://ikenation.com' },
      { name: 'Collections', url: 'https://ikenation.com/collections' },
    ],
  })

  return (
    <>
      <Helmet>
        <title>Collections - {metadata.title}</title>
        <meta name="description" content="Browse our curated collections by category" />
        <link rel="canonical" href="https://ikenation.com/collections" />
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbData)}
        </script>
      </Helmet>

      <PageTransition>
        <main className="min-h-screen bg-white pt-24">
          {/* Header */}
          <section className="bg-gray-50 py-12 border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <ScrollReveal>
                <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-2">
                  {collectionsData.title}
                </h1>
                <p className="text-gray-600">
                  {collectionsData.description}
                </p>
              </ScrollReveal>
            </div>
          </section>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* Sidebar Filters */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className={`lg:col-span-1 ${
                  isMobileFilterOpen ? 'block' : 'hidden lg:block'
                } bg-gray-50 p-6 rounded-lg h-fit sticky top-24`}
              >
                <div className="flex items-center justify-between mb-6 lg:hidden">
                  <h3 className="text-lg font-bold text-gray-900">Filters</h3>
                  <button
                    onClick={() => setIsMobileFilterOpen(false)}
                    className="p-1 hover:bg-gray-200 rounded"
                  >
                    <X size={20} />
                  </button>
                </div>

                {/* Category Filter */}
                <div className="mb-8">
                  <h4 className="font-bold text-gray-900 mb-4">Category</h4>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <button
                        key={category}
                        onClick={() => {
                          setSelectedCategory(category)
                          setIsMobileFilterOpen(false)
                        }}
                        className={`w-full text-left px-4 py-2 rounded-lg transition-all ${
                          selectedCategory === category
                            ? 'bg-black text-white font-semibold'
                            : 'bg-white text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Price Filter */}
                <div className="mb-8">
                  <h4 className="font-bold text-gray-900 mb-4">Price Range</h4>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm text-gray-600">Min: ₵{priceRange[0]}</label>
                      <input
                        type="range"
                        min="0"
                        max="300"
                        value={priceRange[0]}
                        onChange={(e) =>
                          setPriceRange([parseInt(e.target.value), priceRange[1]])
                        }
                        className="w-full"
                      />
                    </div>
                    <div>
                      <label className="text-sm text-gray-600">Max: ₵{priceRange[1]}</label>
                      <input
                        type="range"
                        min="0"
                        max="300"
                        value={priceRange[1]}
                        onChange={(e) =>
                          setPriceRange([priceRange[0], parseInt(e.target.value)])
                        }
                        className="w-full"
                      />
                    </div>
                  </div>
                </div>

                {/* Size Filter */}
                <div className="mb-8">
                  <h4 className="font-bold text-gray-900 mb-4">Size</h4>
                  <div className="space-y-2">
                    {sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`w-full text-left px-4 py-2 rounded-lg transition-all ${
                          selectedSize === size
                            ? 'bg-black text-white font-semibold'
                            : 'bg-white text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Color Filter */}
                <div className="mb-8">
                  <h4 className="font-bold text-gray-900 mb-4">Color</h4>
                  <div className="space-y-2">
                    {colors.map((color) => (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={`w-full text-left px-4 py-2 rounded-lg transition-all ${
                          selectedColor === color
                            ? 'bg-black text-white font-semibold'
                            : 'bg-white text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Material Filter */}
                <div className="mb-8">
                  <h4 className="font-bold text-gray-900 mb-4">Material</h4>
                  <div className="space-y-2">
                    {materials.map((material) => (
                      <button
                        key={material}
                        onClick={() => setSelectedMaterial(material)}
                        className={`w-full text-left px-4 py-2 rounded-lg transition-all ${
                          selectedMaterial === material
                            ? 'bg-black text-white font-semibold'
                            : 'bg-white text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        {material}
                      </button>
                    ))}
                  </div>
                </div>

                {/* New Arrivals Filter */}
                <div className="mb-8">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isNewOnly}
                      onChange={(e) => setIsNewOnly(e.target.checked)}
                      className="w-4 h-4 rounded border-gray-300"
                    />
                    <span className="font-semibold text-gray-900">New Arrivals Only</span>
                  </label>
                </div>

                {/* Reset Filters */}
                <button
                  onClick={() => {
                    setSelectedCategory('All')
                    setSelectedSize('All')
                    setSelectedColor('All')
                    setSelectedMaterial('All')
                    setIsNewOnly(false)
                    setPriceRange([0, 300])
                    setSortBy('newest')
                  }}
                  className="w-full px-4 py-2 border-2 border-gray-300 text-gray-900 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                >
                  Reset Filters
                </button>
              </motion.div>

              {/* Products Section */}
              <div className="lg:col-span-3">
                {/* Top Bar */}
                <div className="flex items-center justify-between gap-4 mb-8 pb-6 border-b border-gray-200">
                  <button
                    onClick={() => setIsMobileFilterOpen(true)}
                    className="lg:hidden flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <Filter size={20} />
                    Filters
                  </button>

                  <div className="flex items-center gap-2 ml-auto">
                    <label className="text-sm font-medium text-gray-700">Sort by:</label>
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                    >
                      <option value="newest">Newest</option>
                      <option value="price-low">Price: Low to High</option>
                      <option value="price-high">Price: High to Low</option>
                      <option value="rating">Highest Rated</option>
                    </select>
                  </div>

                  <div className="text-sm text-gray-600">
                    {filteredProducts.length} products
                  </div>
                </div>

                {/* Products Grid */}
                {filteredProducts.length > 0 ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                  >
                    {filteredProducts.map((product, index) => (
                      <motion.div
                        key={product.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                      >
                        <ProductCard product={product} />
                      </motion.div>
                    ))}
                  </motion.div>
                ) : (
                  <div className="text-center py-12">
                    <p className="text-lg text-gray-600 mb-4">No products found</p>
                    <button
                      onClick={() => {
                        setSelectedCategory('All')
                        setPriceRange([0, 300])
                      }}
                      className="px-6 py-2 bg-black text-white rounded-lg font-semibold hover:bg-gray-800 transition-colors"
                    >
                      Clear Filters
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>
      </PageTransition>
    </>
  )
}
