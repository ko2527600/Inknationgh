import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { AlertCircle } from 'lucide-react'

import PageTransition from '../components/PageTransition'
import { useCMSStore } from '../store/cmsData'

export default function SizeGuide() {

  const { cmsData } = useCMSStore()
  const sizeGuideData = cmsData.sizeGuide
  
  const mensizes = sizeGuideData.mensizes
  const womenSizes = sizeGuideData.womensizes
  const shoeSize = sizeGuideData.shoeSizes || []
  const tips = sizeGuideData.tips.map((tip, index) => ({
    title: `Tip ${index + 1}`,
    description: tip,
  })) || []

  return (
    <>
      <Helmet>
        <title>Size Guide - IkeNation Clothing</title>
        <meta
          name="description"
          content="IkeNation Clothing Size Guide. Find your perfect fit with our detailed measurement charts and sizing tips."
        />
      </Helmet>

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
              <h1 className="text-5xl md:text-6xl font-black mb-6">{sizeGuideData.title}</h1>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                {sizeGuideData.description}
              </p>
            </motion.div>
          </div>
        </section>

        {/* Alert */}
        <section className="bg-blue-50 border-l-4 border-blue-500 py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex gap-4">
            <AlertCircle className="text-blue-500 shrink-0" size={24} />
            <div>
              <h3 className="font-bold text-blue-900 mb-2">Sizing Tip</h3>
              <p className="text-blue-800">
                Sizes can vary between brands and origins. We recommend measuring yourself
                and comparing with our charts. Contact us on WhatsApp for personalized help.
              </p>
            </div>
          </div>
        </section>

        {/* Men's Sizes */}
        <section className="py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-black text-gray-900 mb-12">Men's Sizes</h2>

              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-black text-white">
                      <th className="px-6 py-4 text-left font-bold">Size</th>
                      <th className="px-6 py-4 text-left font-bold">Chest</th>
                      <th className="px-6 py-4 text-left font-bold">Waist</th>
                      <th className="px-6 py-4 text-left font-bold">Length</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mensizes.map((row, index) => (
                      <motion.tr
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.05 }}
                        viewport={{ once: true }}
                        className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
                      >
                        <td className="px-6 py-4 font-bold text-gray-900 border-b border-gray-200">
                          {row.size}
                        </td>
                        <td className="px-6 py-4 text-gray-700 border-b border-gray-200">
                          {row.chest}
                        </td>
                        <td className="px-6 py-4 text-gray-700 border-b border-gray-200">
                          {row.waist}
                        </td>
                        <td className="px-6 py-4 text-gray-700 border-b border-gray-200">
                          {row.length}
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Women's Sizes */}
        <section className="bg-gray-50 py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-black text-gray-900 mb-12">Women's Sizes</h2>

              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-black text-white">
                      <th className="px-6 py-4 text-left font-bold">Size</th>
                      <th className="px-6 py-4 text-left font-bold">Bust</th>
                      <th className="px-6 py-4 text-left font-bold">Waist</th>
                      <th className="px-6 py-4 text-left font-bold">Length</th>
                    </tr>
                  </thead>
                  <tbody>
                    {womenSizes.map((row, index) => (
                      <motion.tr
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.05 }}
                        viewport={{ once: true }}
                        className={index % 2 === 0 ? 'bg-white' : 'bg-gray-100'}
                      >
                        <td className="px-6 py-4 font-bold text-gray-900 border-b border-gray-300">
                          {row.size}
                        </td>
                        <td className="px-6 py-4 text-gray-700 border-b border-gray-300">
                          {row.bust}
                        </td>
                        <td className="px-6 py-4 text-gray-700 border-b border-gray-300">
                          {row.waist}
                        </td>
                        <td className="px-6 py-4 text-gray-700 border-b border-gray-300">
                          {row.length}
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Shoe Sizes */}
        <section className="py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-black text-gray-900 mb-12">Shoe Sizes</h2>

              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-black text-white">
                      <th className="px-6 py-4 text-left font-bold">US Size</th>
                      <th className="px-6 py-4 text-left font-bold">EU Size</th>
                      <th className="px-6 py-4 text-left font-bold">Length (cm)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {shoeSize.map((row, index) => (
                      <motion.tr
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.05 }}
                        viewport={{ once: true }}
                        className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
                      >
                        <td className="px-6 py-4 font-bold text-gray-900 border-b border-gray-200">
                          {row.us}
                        </td>
                        <td className="px-6 py-4 text-gray-700 border-b border-gray-200">
                          {row.eu}
                        </td>
                        <td className="px-6 py-4 text-gray-700 border-b border-gray-200">
                          {row.cm}
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Sizing Tips */}
        <section className="bg-gray-50 py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-4xl font-black text-gray-900 mb-12 text-center"
            >
              Sizing Tips
            </motion.h2>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {tips.map((tip, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow"
                >
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{tip.title}</h3>
                  <p className="text-gray-700 leading-relaxed">{tip.description}</p>
                </motion.div>
              ))}
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
                Still Not Sure About Your Size?
              </h2>
              <p className="text-gray-600 mb-8">
                Our team is here to help you find the perfect fit. Reach out anytime.
              </p>
              <a
                href="https://wa.me/233557786833"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-8 py-3 bg-green-500 text-white font-bold rounded-lg hover:bg-green-600 transition-colors"
              >
                Chat with Us on WhatsApp
              </a>
            </motion.div>
          </div>
        </section>
      </main>
    </>
  )
}
