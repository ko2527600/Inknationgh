import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { Calendar, User, ArrowRight, Search } from 'lucide-react'
import { pageMetadata } from '../utils/seoConfig'
import PageTransition from '../components/PageTransition'
import ScrollReveal from '../components/ScrollReveal'
import { useCMSStore } from '../store/cmsData'

export default function Blog() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const { cmsData } = useCMSStore()
  const blogData = cmsData.blog

  const blogPosts = blogData.posts

  const categories = ['All', ...new Set(blogPosts.map(post => post.category || 'Uncategorized'))]

  const filteredPosts = blogPosts.filter((post) => {
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const metadata = pageMetadata.blog || {
    title: 'Blog - IkeNation Clothing',
    description: 'Fashion tips, style guides, and behind-the-scenes stories from IkeNation',
    keywords: 'fashion blog, style guide, fashion trends, lookbook',
    canonical: 'https://ikenation.com/blog',
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
                <h1 className="text-5xl md:text-6xl font-black mb-6">
                  {blogData.title}
                </h1>
                <p className="text-xl text-gray-300 max-w-2xl">
                  {blogData.description}
                </p>
              </ScrollReveal>
            </div>
          </section>

          {/* Search & Filter Section */}
          <section className="py-12 border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              {/* Search Bar */}
              <div className="mb-8">
                <div className="relative">
                  <Search className="absolute left-4 top-3.5 text-gray-400" size={20} />
                  <input
                    type="text"
                    placeholder="Search articles..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                  />
                </div>
              </div>

              {/* Category Filter */}
              <div className="flex flex-wrap gap-3">
                {categories.map((category) => (
                  <motion.button
                    key={category}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-6 py-2 rounded-full font-semibold transition-all ${
                      selectedCategory === category
                        ? 'bg-black text-white'
                        : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                    }`}
                  >
                    {category}
                  </motion.button>
                ))}
              </div>
            </div>
          </section>

          {/* Blog Posts Grid */}
          <section className="py-16 md:py-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              {filteredPosts.length > 0 ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                  {filteredPosts.map((post, index) => (
                    <motion.article
                      key={post.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.5 }}
                      className="group bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
                    >
                      {/* Image */}
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={post.image}
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                        <div className="absolute top-4 left-4">
                          <span className="bg-black text-white px-3 py-1 rounded-full text-xs font-bold">
                            {post.category}
                          </span>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-6">
                        <h2 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                          {post.title}
                        </h2>
                        <p className="text-gray-600 mb-4 line-clamp-2">
                          {post.excerpt}
                        </p>

                        {/* Meta */}
                        <div className="flex items-center gap-4 text-sm text-gray-600 mb-4 pb-4 border-b border-gray-200">
                          <div className="flex items-center gap-1">
                            <Calendar size={16} />
                            {post.date}
                          </div>
                          <span>{post.readTime}</span>
                        </div>

                        {/* Author & CTA */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <User size={16} className="text-gray-600" />
                            <span className="text-sm text-gray-600">{post.author}</span>
                          </div>
                          <motion.button
                            whileHover={{ x: 5 }}
                            className="text-black font-semibold flex items-center gap-1 hover:gap-2 transition-all"
                          >
                            Read <ArrowRight size={16} />
                          </motion.button>
                        </div>
                      </div>
                    </motion.article>
                  ))}
                </motion.div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-lg text-gray-600">No articles found matching your search.</p>
                </div>
              )}
            </div>
          </section>
        </main>
      </PageTransition>
    </>
  )
}
