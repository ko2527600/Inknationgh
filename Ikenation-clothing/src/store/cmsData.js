import { create } from 'zustand';
import axios from 'axios';

const API_URL = `${import.meta.env.VITE_API_URL}/cms`;

const initialData = {
  home: {
    heroSlides: [],
    trustBar: [],
  },
  about: { story: 'IkeNation - Premium African Fashion', mission: 'Empower through style' },
  contact: { email: 'hello@ikenation.com', phone: '+233 55 778 6833', location: 'Accra, Ghana', whatsapp: '233557786833' },
  faq: { title: 'Frequently Asked Questions', items: [] },
  sizeGuide: { title: 'Size Guide', description: '', mensizes: [], womensizes: [], shoeSizes: [], tips: [] },
  privacy: {
    title: 'Privacy Policy',
    content: 'At IkeNation Clothing, we are committed to protecting your privacy and ensuring the security of your personal information.',
    sections: [
      {
        title: '1. Information We Collect',
        content: 'We collect information you provide directly to us when you create an account, make a purchase, or contact us. This includes your name, email address, physical address, phone number, and payment information. We also automatically collect certain information about your device when you browse our site, such as your IP address, browser type, and interactions with our store.',
      },
      {
        title: '2. How We Use Your Information',
        content: 'We use the collected information to process your orders, communicate with you about your purchases, provide customer support, and improve our website experience. With your consent, we may also send you marketing communications about new collections, promotions, and brand updates.',
      },
      {
        title: '3. Information Sharing and Disclosure',
        content: 'We do not sell your personal information to third parties. We only share your data with trusted service providers who assist us in operating our business, such as payment processors and delivery partners. These partners are required to keep your information secure and confidential.',
      },
      {
        title: '4. Data Security',
        content: 'We implement rigorous security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. All payment transactions are encrypted using secure socket layer technology (SSL) and processed through secure gateway providers.',
      },
      {
        title: '5. Your Rights and Choices',
        content: 'You have the right to access, update, or delete your personal information stored with us at any time. You can also opt out of receiving promotional communications by following the unsubscribe instructions included in our emails or by contacting our support team directly.',
      },
      {
        title: '6. Cookies and Tracking Technologies',
        content: 'Our website uses cookies and similar tracking technologies to enhance your browsing experience, analyze site traffic, and personalize content. You can manage your cookie preferences through your browser settings, though disabling certain cookies may affect site functionality.',
      },
      {
        title: '7. Changes to This Policy',
        content: 'We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements. We will notify you of any significant updates by posting the new policy on our website with an updated revision date.',
      },
      {
        title: '8. Contact Us',
        content: 'If you have any questions or concerns about this Privacy Policy or how we handle your data, please contact us at info@ikenation.com or reach out via WhatsApp at +233 55 778 6833.',
      },
    ],
  },
  legal: {
    title: 'Terms of Service',
    content: 'Welcome to IkeNation Clothing. These are our terms of service.',
    sections: [
      {
        title: '1. Introduction',
        content: 'Welcome to IkeNation Clothing. By accessing our website, purchasing our products, or using our services, you agree to be bound by these Terms of Service. Please read them carefully. If you do not agree to all the terms and conditions, then you may not access the website or use any services.',
      },
      {
        title: '2. Online Store Terms',
        content: 'By agreeing to these Terms of Service, you represent that you are at least the age of majority in your state or province of residence. You may not use our products for any illegal or unauthorized purpose nor may you, in the use of the Service, violate any laws in your jurisdiction (including but not limited to copyright laws).',
      },
      {
        title: '3. Products and Pricing',
        content: 'Our curated urban fashion pieces are subject to limited quantities. We have made every effort to display as accurately as possible the colors and images of our products. Prices for our products are subject to change without notice. We reserve the right at any time to modify or discontinue the Service (or any part or content thereof) without notice.',
      },
      {
        title: '4. Returns and Exchanges',
        content: 'We take pride in the quality of IkeNation apparel. If you receive a defective or damaged item, you may request an exchange within 7 days of receiving your order. Due to the limited nature of our collections, all other sales are final. Please review our Size Guide carefully before making a purchase. Items returned must be unworn, unwashed, and in their original packaging.',
      },
      {
        title: '5. Shipping and Delivery',
        content: 'We provide nationwide delivery across Ghana. Delivery times are estimates and commence from the date of shipping, rather than the date of order. We are not responsible for delays caused by third-party delivery services or factors outside our control. You will be responsible for paying your own shipping costs for returning your item unless the item is defective.',
      },
      {
        title: '6. User Comments and Feedback',
        content: 'If you send certain specific submissions (for example contest entries) or without a request from us you send creative ideas, suggestions, proposals, or other materials, you agree that we may, at any time, without restriction, edit, copy, publish, distribute, translate, and otherwise use in any medium any comments that you forward to us.',
      },
      {
        title: '7. Governing Law',
        content: 'These Terms of Service and any separate agreements whereby we provide you Services shall be governed by and construed in accordance with the laws of Ghana.',
      },
      {
        title: '8. Contact Information',
        content: 'Questions about the Terms of Service should be sent to us via WhatsApp at +233 55 778 6833 or by reaching out to our customer support team.',
      },
    ],
  },
  shop: { title: 'Shop All', description: 'Browse our entire collection', products: [] },
  collections: { title: 'Our Collections', description: 'Curated styles for every occasion', items: [] },
  blog: { title: 'Journal', description: 'News, styling tips, and brand stories', posts: [] },
}

export const useCMSStore = create((set, get) => ({
  cmsData: initialData,
  isLoading: true,
  error: null,

  // Fetch a specific page from PostgreSQL
  fetchCMSPage: async (pageName) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.get(`${API_URL}/${pageName}`);
      set((state) => ({
        cmsData: {
          ...state.cmsData,
          [pageName]: response.data
        },
        isLoading: false
      }));
    } catch (error) {
      if (axios.isCancel(error) || error.code === 'ERR_CANCELED') {
        return; // Silent return for cancelled requests
      }
      console.error(`Error fetching CMS page ${pageName}:`, error);
      // Fallback to initialData if not found in DB yet
      set({ error: error.message, isLoading: false });
    }
  },

  // Generic DB Sync helper
  syncToDatabase: async (pageName, newPageData) => {
    try {
      await axios.put(`${API_URL}/${pageName}`, { data: newPageData });
    } catch (error) {
      console.error(`Failed to sync ${pageName} to database:`, error);
    }
  },

  updateCMSData: (newData) => set((state) => ({ cmsData: { ...state.cmsData, ...newData } })),
  
  updatePageData: (page, data) => set((state) => {
    const newPageData = { ...state.cmsData[page], ...data };
    get().syncToDatabase(page, newPageData);
    return { cmsData: { ...state.cmsData, [page]: newPageData } };
  }),

  resetCMSData: () => set({ cmsData: initialData }),

  updateField: (page, field, value) => set((state) => {
    const newPageData = {
      ...state.cmsData[page],
      [field]: value
    };
    get().syncToDatabase(page, newPageData);
    return {
      cmsData: {
        ...state.cmsData,
        [page]: newPageData
      }
    };
  }),

  addItem: (page, field, item) => set((state) => {
    const newPageData = {
      ...state.cmsData[page],
      [field]: [...(state.cmsData[page]?.[field] || []), item]
    };
    get().syncToDatabase(page, newPageData);
    return {
      cmsData: {
        ...state.cmsData,
        [page]: newPageData
      }
    };
  }),

  removeItem: (page, field, index) => set((state) => {
    const newArray = [...(state.cmsData[page]?.[field] || [])];
    newArray.splice(index, 1);
    const newPageData = {
      ...state.cmsData[page],
      [field]: newArray
    };
    get().syncToDatabase(page, newPageData);
    return {
      cmsData: {
        ...state.cmsData,
        [page]: newPageData
      }
    };
  }),

  updateItem: (page, field, index, item) => set((state) => {
    const newArray = [...(state.cmsData[page]?.[field] || [])];
    newArray[index] = item;
    const newPageData = {
      ...state.cmsData[page],
      [field]: newArray
    };
    get().syncToDatabase(page, newPageData);
    return {
      cmsData: {
        ...state.cmsData,
        [page]: newPageData
      }
    };
  }),
}));
