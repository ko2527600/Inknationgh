import { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { pageMetadata, getStructuredData } from '../utils/seoConfig'
import ProductCard from '../components/ProductCard'
import PageTransition from '../components/PageTransition'
import ScrollReveal from '../components/ScrollReveal'
import { useProductStore } from '../store/useProductStore'

export default function Shop() {
  const { products } = useProductStore()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 300)
    return () => clearTimeout(timer)
  }, [])

  const metadata = pageMetadata.shop
  const breadcrumbData = getStructuredData('breadcrumb', {
    items: [
      { name: 'Home', url: 'https://ikenation.com' },
      { name: 'Shop', url: 'https://ikenation.com/shop' },
    ],
  })

  return (
    <>
      <Helmet>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <meta name="keywords" content={metadata.keywords} />
        <link rel="canonical" href={metadata.canonical} />

        <meta property="og:type" content="website" />
        <meta property="og:title" content={metadata.title} />
        <meta property="og:description" content={metadata.description} />
        <meta property="og:url" content={metadata.canonical} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={metadata.title} />
        <meta name="twitter:description" content={metadata.description} />

        <script type="application/ld+json">
          {JSON.stringify(breadcrumbData)}
        </script>
      </Helmet>

      <PageTransition>
        <main className="min-h-screen bg-white">
          {/* Header */}
          <section className="bg-gray-50 py-12 border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <ScrollReveal>
                <h1 className="text-4xl md:text-5xl font-black text-gray-900">Shop</h1>
                <p className="text-gray-600 mt-2">Browse our collection of premium clothing</p>
              </ScrollReveal>
            </div>
          </section>

          {/* Products Grid */}
          <section className="py-12 md:py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              {isLoading ? (
                <div className="text-center py-12">
                  <p className="text-gray-600">Loading products...</p>
                </div>
              ) : products.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-600 text-lg">No products available yet</p>
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                >
                  {(products || []).map((product, index) => (
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
              )}
            </div>
          </section>
        </main>
      </PageTransition>
    </>
  )
}
