import { motion } from 'framer-motion'
import { Instagram, MessageCircle, Music } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const footerSections = [
    {
      title: 'Shop',
      links: [
        { label: 'All Products', href: '/shop' },
        { label: 'Collections', href: '/collections' },
        { label: 'New Arrivals', href: '/shop?sort=new' },
      ],
    },
    {
      title: 'Help',
      links: [
        { label: 'FAQ', href: '/faq' },
        { label: 'Size Guide', href: '/size-guide' },
        { label: 'Contact Us', href: '/contact' },
        { label: 'Shipping & Returns', href: '/faq' },
      ],
    },
    {
      title: 'Company',
      links: [
        { label: 'About Us', href: '/about' },
        { label: 'Privacy Policy', href: '/privacy' },
        { label: 'Terms of Service', href: '/legal' },
      ],
    },
    {
      title: 'Connect',
      links: [
        { label: 'Instagram', href: 'https://instagram.com/ike.nationgh', external: true },
        { label: 'TikTok', href: 'https://tiktok.com/@ikenationgh8', external: true },
        { label: 'WhatsApp', href: 'https://wa.me/233557786833', external: true },
      ],
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
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

  return (
    <footer className="bg-black text-white">
      {/* Newsletter Section */}
      <section className="border-b border-gray-800 py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto text-center"
          >
            <h3 className="text-3xl font-black mb-4">Stay Updated</h3>
            <p className="text-gray-400 mb-6">
              Subscribe to get special offers and updates on new arrivals
            </p>
            <form className="flex gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg bg-gray-900 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-white text-black font-bold rounded-lg hover:bg-gray-100 transition-colors"
              >
                Subscribe
              </button>
            </form>
          </motion.div>
        </div>
      </section>

      {/* Main Footer */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12"
          >
            {/* Brand Info */}
            <motion.div variants={itemVariants} className="lg:col-span-1">
              <div className="flex items-center gap-3 mb-6">
                <img 
                  src="/ike%20nation.jpeg" 
                  alt="IkeNation Logo" 
                  className="h-12 sm:h-16 w-auto object-contain rounded-md" 
                />
                <h2 className="text-2xl font-black">IkeNation Clothing</h2>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed mb-6">
                Curating authentic urban fashion for Ghana's style-conscious community.
              </p>
              <div className="flex gap-4">
                <a
                  href="https://instagram.com/ike.nationgh"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-gray-900 rounded-lg hover:bg-gray-800 transition-colors"
                >
                  <Instagram size={20} />
                </a>
                <a
                  href="https://tiktok.com/@ikenationgh8"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-gray-900 rounded-lg hover:bg-gray-800 transition-colors"
                >
                  <Music size={20} />
                </a>
                <a
                  href="https://wa.me/233557786833"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-gray-900 rounded-lg hover:bg-gray-800 transition-colors"
                >
                  <MessageCircle size={20} />
                </a>
              </div>
            </motion.div>

            {/* Footer Links */}
            {footerSections.map((section, index) => (
              <motion.div key={index} variants={itemVariants}>
                <h4 className="font-bold text-white mb-4">{section.title}</h4>
                <ul className="space-y-3">
                  {section.links.map((link, linkIdx) => (
                    <li key={linkIdx}>
                      <a
                        href={link.href}
                        target={link.external ? '_blank' : '_self'}
                        rel={link.external ? 'noopener noreferrer' : ''}
                        className="text-gray-400 hover:text-white transition-colors text-sm"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>

          {/* Contact Info */}
          <motion.div
            variants={itemVariants}
            className="border-t border-gray-800 pt-8 mb-8"
          >
            <h4 className="font-bold text-white mb-4">Contact Us</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <p className="text-gray-400 text-sm mb-1">WhatsApp</p>
                <a
                  href="https://wa.me/233557786833"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white font-semibold hover:text-gray-300 transition-colors"
                >
                  0557786833
                </a>
              </div>
              <div>
                <p className="text-gray-400 text-sm mb-1">Phone</p>
                <a
                  href="tel:0557786833"
                  className="text-white font-semibold hover:text-gray-300 transition-colors"
                >
                  0557786833
                </a>
              </div>
              <div>
                <p className="text-gray-400 text-sm mb-1">Location</p>
                <p className="text-white font-semibold">Kantamanto, Accra, Ghana</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Bottom Bar */}
      <section className="border-t border-gray-800 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row items-center justify-between gap-4 text-gray-400 text-sm"
          >
            <p>&copy; {currentYear} IkeNation Clothing. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="/privacy" className="hover:text-white transition-colors">
                Privacy Policy
              </a>
              <a href="/legal" className="hover:text-white transition-colors">
                Terms of Service
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </footer>
  )
}
