import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import ReactMarkdown from 'react-markdown'
import { pageMetadata } from '../utils/seoConfig'
import PageTransition from '../components/PageTransition'
import ScrollReveal from '../components/ScrollReveal'
import { useCMSStore } from '../store/cmsData'

export default function Privacy() {
  const metadata = pageMetadata.privacy
  const { cmsData } = useCMSStore()
  const privacyData = cmsData.privacy

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
                <h1 className="text-5xl md:text-6xl font-black mb-6">{privacyData.title}</h1>
                <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                  Your privacy is important to us. Learn how we protect your data.
                </p>
              </motion.div>
            </div>
          </section>

          {/* Last Updated */}
          <section className="bg-gray-50 border-b border-gray-200 py-4">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <p className="text-sm text-gray-600">
                Last Updated: {privacyData.lastUpdated}
              </p>
            </div>
          </section>

          {/* Content Sections */}
          <section className="py-16 md:py-24">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="prose prose-lg max-w-none">
                {/* Fallback for the old single-string format */}
                {privacyData.content && !privacyData.sections?.length && (
                  <ReactMarkdown>{typeof privacyData.content === 'string' ? privacyData.content : ''}</ReactMarkdown>
                )}

                {/* Render the sections array */}
                {privacyData.sections?.map((section, index) => (
                  <div key={index} className="mb-12">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">{section.title}</h2>
                    <p className="text-gray-700 leading-relaxed">{section.content}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Contact CTA */}
          <section className="bg-gray-50 py-16 md:py-24">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl font-black text-gray-900 mb-4">
                  Questions About Our Privacy Policy?
                </h2>
                <p className="text-gray-600 mb-8">
                  Contact us anytime for clarification or concerns.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <a
                    href="mailto:info@ikenation.com"
                    className="px-8 py-3 bg-black text-white font-bold rounded-lg hover:bg-gray-800 transition-colors"
                  >
                    Email Us
                  </a>
                  <a
                    href="https://wa.me/233557786833"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-8 py-3 bg-green-500 text-white font-bold rounded-lg hover:bg-green-600 transition-colors"
                  >
                    WhatsApp
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
