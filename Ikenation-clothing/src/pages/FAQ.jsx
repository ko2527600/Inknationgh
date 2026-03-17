import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { pageMetadata, getStructuredData } from '../utils/seoConfig'
import Accordion from '../components/Accordion'
import PageTransition from '../components/PageTransition'
import ScrollReveal from '../components/ScrollReveal'
import { useCMSStore } from '../store/cmsData'

export default function FAQ() {
  const metadata = pageMetadata.faq
  const structuredData = getStructuredData('faq', { items: [] })
  const { cmsData } = useCMSStore()
  
  // Convert CMS format to Accordion format
  const faqItems = cmsData.faq.items.map(item => ({
    title: item.question,
    content: item.answer,
  }))

  // Separate shipping/returns items from general FAQ
  const generalFaqItems = faqItems.slice(0, 4)
  const shippingItems = faqItems.slice(4)

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
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>

      <PageTransition>
        <main className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="bg-linear-to-br from-black to-gray-900 text-white py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <h1 className="text-5xl md:text-6xl font-black mb-6">
                Frequently Asked Questions
              </h1>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                Find answers to common questions about our products and services
              </p>
            </motion.div>
          </div>
        </section>

        {/* General FAQ */}
        <section className="py-16 md:py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-black text-gray-900 mb-12">
                General Questions
              </h2>
              <Accordion items={generalFaqItems} />
            </motion.div>
          </div>
        </section>

        {/* Shipping & Returns */}
        <section className="bg-gray-50 py-16 md:py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-black text-gray-900 mb-12">
                Shipping & Returns
              </h2>
              <Accordion items={shippingItems} />
            </motion.div>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="py-16 md:py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-black text-gray-900 mb-4">
                Didn't find your answer?
              </h2>
              <p className="text-gray-600 mb-8">
                Our team is here to help. Contact us via WhatsApp or email.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <a
                  href="https://wa.me/233557786833"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-3 bg-green-500 text-white font-bold rounded-lg hover:bg-green-600 transition-colors"
                >
                  WhatsApp Us
                </a>
                <a
                  href="/contact"
                  className="px-8 py-3 bg-black text-white font-bold rounded-lg hover:bg-gray-800 transition-colors"
                >
                  Contact Us
                </a>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      </PageTransition>
    </>
  )
}
