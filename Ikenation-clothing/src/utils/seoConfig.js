// SEO configuration for all pages
export const pageMetadata = {
  home: {
    title: 'IkeNation Clothing - Premium Urban Fashion | Super Megger Collection',
    description:
      'Discover authentic urban fashion at IkeNation. Premium thrift clothing, nationwide delivery in Ghana. Shop the Super Megger collection today.',
    keywords: 'fashion, thrift, urban wear, Ghana, clothing, Super Megger',
    canonical: 'https://ikenation-clothing.vercel.app',
  },
  shop: {
    title: 'Shop - IkeNation Clothing | Premium Urban Wear',
    description:
      'Browse our curated collection of premium urban fashion. Fast nationwide delivery across Ghana.',
    keywords: 'shop, clothing, urban wear, thrift, Ghana',
    canonical: 'https://ikenation-clothing.vercel.app/shop',
  },
  about: {
    title: 'About Us - IkeNation Clothing | Our Story & Mission',
    description:
      "Learn about IkeNation - Ghana's premier online thrift store. Discover our mission to make quality fashion accessible.",
    keywords: 'about, brand story, mission, IkeNation, Ghana',
    canonical: 'https://ikenation-clothing.vercel.app/about',
  },
  contact: {
    title: 'Contact Us - IkeNation Clothing | Get in Touch',
    description:
      "Contact IkeNation for support. WhatsApp, phone, email, and contact form available. We're here to help.",
    keywords: 'contact, support, WhatsApp, customer service',
    canonical: 'https://ikenation-clothing.vercel.app/contact',
  },
  faq: {
    title: 'FAQ - IkeNation Clothing | Shipping, Returns & More',
    description:
      'Find answers to common questions about orders, shipping, returns, sizing, and more at IkeNation.',
    keywords: 'FAQ, shipping, returns, sizing, customer support',
    canonical: 'https://ikenation-clothing.vercel.app/faq',
  },
  sizeGuide: {
    title: 'Size Guide - IkeNation Clothing | Find Your Perfect Fit',
    description:
      'Detailed size charts for men, women, and shoes. Measurement tips and international size conversions.',
    keywords: 'size guide, measurements, sizing chart, fit',
    canonical: 'https://ikenation-clothing.vercel.app/size-guide',
  },
  privacy: {
    title: 'Privacy Policy - IkeNation Clothing',
    description:
      'Read our privacy policy to understand how IkeNation collects, uses, and protects your personal information.',
    keywords: 'privacy policy, data protection, personal information',
    canonical: 'https://ikenation-clothing.vercel.app/privacy',
  },
  legal: {
    title: 'Terms of Service - IkeNation Clothing',
    description:
      'Review our terms of service, including product policies, shipping, returns, and user conduct guidelines.',
    keywords: 'terms of service, legal, conditions, policies',
    canonical: 'https://ikenation-clothing.vercel.app/legal',
  },
}

// Backward compatibility
export const seoConfig = pageMetadata

// Helper function to generate structured data for SEO
export const generateStructuredData = (type, data = {}) => {
  const baseUrl = 'https://ikenation-clothing.vercel.app'
  const schemas = {
    organization: {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'IkeNation Clothing',
      url: baseUrl,
      logo: `${baseUrl}/ike nation.jpeg`,
      description: 'Premium urban fashion thrift store in Ghana',
      sameAs: [
        'https://instagram.com/ike.nationgh',
        'https://tiktok.com/@ikenationgh8',
      ],
      contactPoint: {
        '@type': 'ContactPoint',
        contactType: 'Customer Service',
        telephone: '+233557786833',
        url: 'https://wa.me/233557786833',
      },
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Kantamanto',
        addressLocality: 'Accra',
        addressCountry: 'GH',
      },
    },
    product: {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: data.name || 'IkeNation Product',
      description: data.description || '',
      image: data.image || '',
      price: data.price || '',
      priceCurrency: 'GHS',
      availability: 'https://schema.org/InStock',
      brand: {
        '@type': 'Brand',
        name: 'IkeNation Clothing',
      },
    },
    breadcrumb: {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: data.items || [],
    },
  }

  return schemas[type] || null
}

// Alias for backward compatibility
export const getStructuredData = generateStructuredData
