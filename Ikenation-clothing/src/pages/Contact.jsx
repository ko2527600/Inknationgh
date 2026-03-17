import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, MessageCircle, Instagram, Smartphone, Clock, Facebook } from 'lucide-react'
import { pageMetadata } from '../utils/seoConfig'
import PageTransition from '../components/PageTransition'
import ScrollReveal from '../components/ScrollReveal'
import { useCMSStore } from '../store/cmsData'

export default function Contact() {
  const metadata = pageMetadata.contact
  const { cmsData } = useCMSStore()
  const contactData = cmsData.contact
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
    setSubmitted(true)
    setTimeout(() => {
      setFormData({ name: '', email: '', subject: '', message: '' })
      setSubmitted(false)
    }, 3000)
  }

  // Map CMS contact methods to display format
  const contactMethods = (contactData.contactMethods || []).map(method => ({
    ...method,
    icon: method.icon === 'MessageCircle' ? MessageCircle : 
          method.icon === 'Phone' ? Phone :
          method.icon === 'Mail' ? Mail :
          method.icon === 'MapPin' ? MapPin : MessageCircle,
  }))

  const operatingHours = contactData.operatingHours || [
    { day: 'Monday - Friday', hours: '9:00 AM - 6:00 PM' },
    { day: 'Saturday', hours: '10:00 AM - 5:00 PM' },
    { day: 'Sunday', hours: 'Closed' },
  ]

  // Map CMS social media to display format
  const socialMedia = (contactData.socialMedia || []).map(social => ({
    ...social,
    icon: social.icon === 'Instagram' ? Instagram :
          social.icon === 'Music' ? Smartphone :
          social.icon === 'Facebook' ? Facebook : Instagram,
    handle: social.platform,
    name: social.platform,
  }))

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
            <ScrollReveal direction="down">
              <h1 className="text-5xl md:text-6xl font-black mb-6">{contactData.title}</h1>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                {contactData.description}
              </p>
            </ScrollReveal>
          </div>
        </section>

        {/* Contact Methods */}
        <section className="py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16"
            >
              {contactMethods.map((method, index) => {
                const Icon = method.icon
                return (
                  <motion.a
                    key={index}
                    href={method.link}
                    target={method.link.startsWith('http') ? '_blank' : '_self'}
                    rel={method.link.startsWith('http') ? 'noopener noreferrer' : ''}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ y: -5 }}
                    className="p-6 bg-gray-50 rounded-lg hover:shadow-lg transition-shadow text-center"
                  >
                    <div className="mb-4 flex justify-center">
                      <div className="p-3 bg-black rounded-lg">
                        <Icon size={24} className="text-white" />
                      </div>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">
                      {method.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-2">{method.description}</p>
                    <p className="font-semibold text-black">{method.value}</p>
                  </motion.a>
                )
              })}
            </motion.div>
          </div>
        </section>

        {/* Contact Form */}
        <section className="bg-gray-50 py-16 md:py-24">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-black text-gray-900 mb-12 text-center">
                Send us a Message
              </h2>

              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-green-50 border-2 border-green-500 rounded-lg p-8 text-center"
                >
                  <p className="text-lg font-bold text-green-700">
                    ✓ Thank you for your message!
                  </p>
                  <p className="text-green-600 mt-2">
                    We'll get back to you as soon as possible.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    viewport={{ once: true }}
                  >
                    <label className="block text-sm font-bold text-gray-900 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                      placeholder="Your name"
                    />
                  </motion.div>

                  {/* Email */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.1 }}
                    viewport={{ once: true }}
                  >
                    <label className="block text-sm font-bold text-gray-900 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                      placeholder="your@email.com"
                    />
                  </motion.div>

                  {/* Subject */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.2 }}
                    viewport={{ once: true }}
                  >
                    <label className="block text-sm font-bold text-gray-900 mb-2">
                      Subject
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                      placeholder="How can we help?"
                    />
                  </motion.div>

                  {/* Message */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.3 }}
                    viewport={{ once: true }}
                  >
                    <label className="block text-sm font-bold text-gray-900 mb-2">
                      Message
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows="6"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black resize-none"
                      placeholder="Your message..."
                    ></textarea>
                  </motion.div>

                  {/* Submit Button */}
                  <motion.button
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.4 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="w-full bg-black text-white py-4 rounded-lg font-bold text-lg hover:bg-gray-800 transition-colors"
                  >
                    Send Message
                  </motion.button>
                </form>
              )}
            </motion.div>
          </div>
        </section>

        {/* Operating Hours & Location Section */}
        <section className="bg-gray-50 py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Operating Hours */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="bg-white p-8 rounded-lg shadow-md"
              >
                <div className="flex items-center gap-3 mb-6">
                  <Clock size={32} className="text-black" />
                  <h3 className="text-2xl font-bold text-gray-900">Operating Hours</h3>
                </div>
                <div className="space-y-4">
                  {operatingHours.map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.4 }}
                      viewport={{ once: true }}
                      className="flex justify-between items-center pb-4 border-b border-gray-200 last:border-b-0"
                    >
                      <span className="font-semibold text-gray-900">{item.day}</span>
                      <span className="text-gray-600">{item.hours}</span>
                    </motion.div>
                  ))}
                </div>
                <p className="text-sm text-gray-600 mt-6 pt-6 border-t border-gray-200">
                  📞 Available for WhatsApp inquiries 24/7
                </p>
              </motion.div>

              {/* Map Section */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="bg-white p-8 rounded-lg shadow-md"
              >
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Visit Us</h3>
                <div className="relative h-64 rounded-lg overflow-hidden mb-6">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3970.8234567890123!2d-0.2!3d5.35!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sKantamanto%2C%20Accra!5e0!3m2!1sen!2sgh!4v1234567890"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="absolute inset-0"
                  ></iframe>
                </div>
                <div className="space-y-3">
                  <p className="text-gray-700">
                    <strong>IkeNation Clothing</strong><br />
                    Kantamanto Market<br />
                    Accra, Ghana
                  </p>
                  <a
                    href="https://maps.google.com/?q=Kantamanto+Accra"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block text-blue-600 hover:underline font-semibold"
                  >
                    Get Directions →
                  </a>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Social Media Section */}
        <section className="py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl font-black text-gray-900 mb-4">Follow Us</h2>
              <p className="text-lg text-gray-600">
                Stay updated with our latest collections and exclusive offers
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {socialMedia.map((social, index) => {
                const Icon = social.icon
                return (
                  <motion.a
                    key={index}
                    href={social.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.4 }}
                    viewport={{ once: true }}
                    whileHover={{ y: -8, scale: 1.05 }}
                    className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-all text-center"
                  >
                    <div className="mb-4 flex justify-center">
                      <Icon size={40} className={`text-gray-700 transition-colors ${social.color}`} />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{social.name}</h3>
                    <p className="text-sm text-gray-600">{social.handle}</p>
                  </motion.a>
                )
              })}
            </motion.div>
          </div>
        </section>

        {/* Live Chat Bubble */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.4 }}
          className="fixed bottom-6 right-6 z-40"
        >
          <motion.a
            href="https://wa.me/233557786833"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center justify-center w-16 h-16 bg-green-500 text-white rounded-full shadow-lg hover:shadow-xl transition-shadow"
            title="Chat with us on WhatsApp"
          >
            <MessageCircle size={28} />
          </motion.a>
        </motion.div>

        {/* FAQ CTA */}
        <section className="py-16 md:py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-black text-gray-900 mb-4">
                Have a Quick Question?
              </h2>
              <p className="text-gray-600 mb-8">
                Check out our FAQ section for common questions and answers.
              </p>
              <a
                href="/faq"
                className="inline-block px-8 py-3 bg-black text-white font-bold rounded-lg hover:bg-gray-800 transition-colors"
              >
                View FAQ
              </a>
            </motion.div>
          </div>
        </section>
      </main>
      </PageTransition>
    </>
  )
}
