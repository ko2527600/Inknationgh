import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { Heart, Users, Globe, Award, Leaf } from 'lucide-react'
import { pageMetadata, getStructuredData } from '../utils/seoConfig'
import PageTransition from '../components/PageTransition'
import ScrollReveal from '../components/ScrollReveal'
import { useCMSStore } from '../store/cmsData'

export default function About() {
  const metadata = pageMetadata.about
  const structuredData = getStructuredData('organization')
  const { cmsData } = useCMSStore()
  const aboutData = cmsData.about

  const values = aboutData.values || [
    {
      icon: Heart,
      title: 'Quality First',
      description: 'We curate every piece to ensure premium quality and authentic style.',
    },
    {
      icon: Users,
      title: 'Community Driven',
      description: 'Supporting local fashion enthusiasts and sustainable thrift culture.',
    },
    {
      icon: Globe,
      title: 'Nationwide Reach',
      description: 'Delivering authentic urban wear to every corner of Ghana.',
    },
    {
      icon: Award,
      title: 'Trusted Brand',
      description: 'Over 1,900 posts and thousands of satisfied customers.',
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  }

  const teamMembers = aboutData.team || []

  const sustainabilityPoints = aboutData.sustainabilityPoints || [
    {
      title: 'Eco-Friendly Materials',
      description: 'We prioritize organic cotton, recycled fabrics, and sustainable production methods.',
    },
    {
      title: 'Ethical Sourcing',
      description: 'All our suppliers meet strict ethical standards and fair labor practices.',
    },
    {
      title: 'Reduced Waste',
      description: 'Minimal packaging, recyclable materials, and zero-waste initiatives.',
    },
    {
      title: 'Community Impact',
      description: 'Supporting local artisans and giving back to communities we serve.',
    },
  ]

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
                  {aboutData.title}
                </h1>
                <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                  Curating authentic urban fashion for Ghana's style-conscious community
                </p>
              </motion.div>
            </div>
          </section>

          {/* Story Section */}
          <section className="py-16 md:py-24">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <ScrollReveal>
                <motion.div className="space-y-6">
                  <h2 className="text-4xl font-black text-gray-900 mb-8">Our Story</h2>
                  <p className="text-lg text-gray-700 leading-relaxed">
                    {aboutData.story}
                  </p>
                  <p className="text-lg text-gray-700 leading-relaxed">
                    {aboutData.mission}
                  </p>
                </motion.div>
              </ScrollReveal>
            </div>
          </section>

          {/* Values Section */}
          <section className="bg-gray-50 py-16 md:py-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <ScrollReveal>
                <h2 className="text-4xl font-black text-gray-900 mb-12 text-center">
                  Our Values
                </h2>
              </ScrollReveal>

              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
              >
                {values.map((value, index) => {
                  const iconMap = { Heart, Users, Globe, Award, Leaf }
                  const Icon = iconMap[value.icon] || Heart
                  return (
                    <motion.div
                      key={index}
                      variants={itemVariants}
                      className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow"
                    >
                      <div className="mb-4 p-3 bg-black rounded-lg w-fit">
                        <Icon size={24} className="text-white" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-3">
                        {value.title}
                      </h3>
                      <p className="text-gray-600">{value.description}</p>
                    </motion.div>
                  )
                })}
              </motion.div>
            </div>
          </section>

          {/* Stats Section */}
          <section className="py-16 md:py-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center"
              >
                {[
                  { number: '1,928', label: 'Posts' },
                  { number: '7,741', label: 'TikTok Followers' },
                  { number: '118.6K', label: 'Total Likes' },
                  { number: 'Nationwide', label: 'Delivery Coverage' },
                ].map((stat, index) => (
                  <ScrollReveal key={index} delay={index * 0.1}>
                    <div>
                      <div className="text-4xl md:text-5xl font-black text-black mb-2">
                        {stat.number}
                      </div>
                      <div className="text-gray-600 font-medium">{stat.label}</div>
                    </div>
                  </ScrollReveal>
                ))}
              </motion.div>
            </div>
          </section>

          {/* Sustainability Section */}
          <section className="py-16 md:py-24 bg-green-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <ScrollReveal>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                  {/* Left: Image */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="relative h-96 rounded-lg overflow-hidden"
                  >
                    <img
                      src="https://images.unsplash.com/photo-1559027615-cd2628902d4a?w=600&h=600&fit=crop"
                      alt="Sustainability"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent"></div>
                  </motion.div>

                  {/* Right: Content */}
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="space-y-6"
                  >
                    <div className="flex items-center gap-3">
                      <Leaf size={32} className="text-green-600" />
                      <h2 className="text-4xl font-black text-gray-900">
                        Our Sustainability Commitment
                      </h2>
                    </div>

                    <p className="text-lg text-gray-700 leading-relaxed">
                      At IkeNation, sustainability isn't just a buzzword—it's core to who we are. We believe
                      fashion should be beautiful, accessible, and responsible.
                    </p>

                    <div className="space-y-4">
                      {sustainabilityPoints.map((point, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: 20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1, duration: 0.5 }}
                          viewport={{ once: true }}
                          className="flex gap-4"
                        >
                          <div className="shrink-0">
                            <div className="flex items-center justify-center h-8 w-8 rounded-full bg-green-600 text-white">
                              ✓
                            </div>
                          </div>
                          <div>
                            <h3 className="font-bold text-gray-900">{point.title}</h3>
                            <p className="text-gray-600">{point.description}</p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                </div>
              </ScrollReveal>
            </div>
          </section>

          {/* Team Section */}
          <section className="py-16 md:py-24 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <ScrollReveal>
                <h2 className="text-4xl font-black text-gray-900 mb-12 text-center">
                  Meet Our Team
                </h2>
              </ScrollReveal>

              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
              >
                {teamMembers.map((member) => (
                  <motion.div
                    key={member.id}
                    variants={itemVariants}
                    whileHover={{ y: -8 }}
                    className="text-center"
                  >
                    {/* Image */}
                    <div className="relative h-64 rounded-lg overflow-hidden mb-6">
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
                        <p className="text-white text-sm">{member.bio}</p>
                      </div>
                    </div>

                    {/* Info */}
                    <h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
                    <p className="text-sm text-green-600 font-semibold mb-3">{member.role}</p>
                    <p className="text-gray-600 text-sm line-clamp-2">{member.bio}</p>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="bg-black text-white py-16 md:py-24">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <ScrollReveal>
                <h2 className="text-4xl font-black mb-6">Join Our Community</h2>
                <p className="text-xl text-gray-300 mb-8">
                  Follow us on social media for the latest drops and exclusive offers
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <a
                    href="https://instagram.com/ike.nationgh"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-8 py-3 bg-white text-black font-bold rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    Instagram
                  </a>
                  <a
                    href="https://tiktok.com/@ikenationgh8"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-8 py-3 bg-white text-black font-bold rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    TikTok
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
              </ScrollReveal>
            </div>
          </section>
        </main>
      </PageTransition>
    </>
  )
}
