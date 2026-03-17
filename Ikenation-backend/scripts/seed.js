import 'dotenv/config';
import prisma from '../config/prisma.js';

const initialProducts = [
  {
    name: 'Premium Black T-Shirt',
    price: 89.99,
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=500&fit=crop',
    images: ['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=500&fit=crop'],
    description: 'High-quality black t-shirt made from 100% organic cotton',
    category: 'Tops',
    stock: 50,
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Black', 'White', 'Navy'],
    rating: 4.5,
    reviews: 12,
  },
  {
    name: 'Classic Denim Jeans',
    price: 129.99,
    image: 'https://images.unsplash.com/photo-1542272604-787c62d465d1?w=500&h=500&fit=crop',
    images: ['https://images.unsplash.com/photo-1542272604-787c62d465d1?w=500&h=500&fit=crop'],
    description: 'Timeless denim jeans with perfect fit and comfort',
    category: 'Bottoms',
    stock: 35,
    sizes: ['28', '30', '32', '34', '36', '38'],
    colors: ['Dark Blue', 'Light Blue', 'Black'],
    rating: 4.8,
    reviews: 28,
  },
];

const initialCMSData = {
  home: {
    heroSlides: [
      { id: 1, title: 'Elevate Your Style', subtitle: 'Premium Fashion', image: 'https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=1200&h=600&fit=crop', cta: 'Shop Now' },
      { id: 2, title: 'New Collection', subtitle: 'Limited Edition', image: 'https://images.unsplash.com/photo-1556821552-5f63b1c2c723?w=1200&h=600&fit=crop', cta: 'Explore' },
      { id: 3, title: 'Summer 2026', subtitle: 'Fresh Styles', image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=1200&h=600&fit=crop', cta: 'View' },
      { id: 4, title: 'Streetwear Essentials', subtitle: 'Urban Comfort', image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=1200&h=600&fit=crop', cta: 'Shop Basics' },
    ],
    trustBar: [
      { icon: 'Truck', text: 'Free Shipping', description: 'On all orders above ₵100 nationwide.' },
      { icon: 'Shield', text: 'Secure Payment', description: '100% encrypted transactions.' },
      { icon: 'Clock', text: '24/7 Support', description: 'We are here to help anytime.' },
    ],
  },
  about: { story: 'IkeNation - Premium African Fashion', mission: 'Empower through style' },
  contact: { email: 'hello@ikenation.com', phone: '+233 XXX XXX XXXX', location: 'Accra, Ghana', whatsapp: '233XXXXXXXXX' }
};

const seedDatabase = async () => {
  try {
    console.log('Clearing old data...');
    await prisma.product.deleteMany();
    await prisma.cMSData.deleteMany();

    console.log('Seeding Products...');
    for (const product of initialProducts) {
      await prisma.product.create({ data: product });
    }

    console.log('Seeding CMS Data (Home, About, Contact)...');
    for (const [pageName, data] of Object.entries(initialCMSData)) {
      await prisma.cMSData.create({
        data: {
          pageName,
          data
        }
      });
    }

    console.log('Seed completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
