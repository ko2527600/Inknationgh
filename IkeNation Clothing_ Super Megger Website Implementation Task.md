# IkeNation Clothing: Super Megger Website Implementation Task

This document provides structured instructions for an AI code editor (Cursor, Windsurf, etc.) to build the **IkeNation Clothing** premium e-commerce brand experience. Follow these steps sequentially to ensure a high-conversion, professional result.

---

## 🛠️ Project Foundation & Environment
- **Tech Stack:** React (Vite), Tailwind CSS, Lucide React (Icons), Framer Motion (Animations), Swiper.js (Sliders), Zustand (State), React Router Dom.
- **Goal:** Build a premium, "Nike/Zara" style frontend with a robust 10-page architecture.

---

## 🏁 Phase 1: Project Setup & Clean Slate
1.  **Dependencies:** Ensure `lucide-react`, `framer-motion`, `swiper`, `react-router-dom`, `zustand`, `axios`, and `react-helmet-async` are installed.
2.  **Folder Structure:**
    - `src/components/`: Reusable UI elements (Navbar, Footer, ProductCard).
    - `src/pages/`: Page-level components (Home, Shop, ProductDetail).
    - `src/store/`: Zustand state management.
    - `src/hooks/`: Custom React hooks.
3.  **Clean Up:** Remove `App.css`, `index.css` boilerplate (keep Tailwind directives), and default Vite assets.

---

## 💎 Phase 2: Core Global Components
### 1. Premium Navbar (`src/components/Navbar.jsx`)
- **Design:** Glassmorphism (`bg-white/80 backdrop-blur-md`), sticky top.
- **Features:**
    - Animated search bar (expand on click).
    - Wishlist heart icon with badge.
    - Cart icon with dynamic badge (connected to Zustand).
    - User profile icon.
    - Mobile menu drawer for responsive navigation.

### 2. Global State (`src/store/useStore.js`)
- Implement Zustand store for:
    - `cart`: Array of items with quantity.
    - `wishlist`: Array of saved items.
    - `isCartOpen`: Boolean for side drawer.
    - Actions: `addToCart`, `removeFromCart`, `updateQuantity`, `toggleCart`.

---

## 🏠 Phase 3: Homepage (Digital Flagship)
### 1. Hero Section
- Full-screen high-impact visuals.
- Bold typography with Framer Motion fade-in-up animations.
- Primary "Shop Now" CTA.

### 2. Featured Collections
- Use **Swiper.js** for horizontal sliding product showcases.
- Implement "New Arrivals" and "Bestsellers" sections.

### 3. Trust Bar
- Minimalist bar with icons for "Free Shipping," "Secure Payment," and "24/7 Support."

---

## 🛍️ Phase 4: Shopping Experience
### 1. Product Listing Page (PLP)
- 3-4 column responsive grid.
- **Skeleton Loaders:** Match grid shape for zero layout shift.
- **Product Card:**
    - Image hover effect (swap to second image).
    - "Quick Add" overlay button.
    - Inventory badges ("Only 2 Left!").

### 2. Product Detail Page (PDP)
- Split layout: Left (Multi-image gallery + Zoom), Right (Info + Actions).
- **WhatsApp Integration:** "Order via WhatsApp" button with pre-filled product details.
- Sticky "Add to Cart" for mobile.
- Size Guide modal/link.

### 3. Side Drawer Cart
- Slides in from the right.
- Real-time subtotal calculation.
- Quantity adjusters inside the drawer.

---

## 🛡️ Phase 5: Trust & Legal Pages
- Implement clean, typography-focused layouts for:
    - **About Us:** Brand story and mission.
    - **Contact Us:** Form + WhatsApp link.
    - **FAQ / Shipping & Returns:** Accordion-style sections.
    - **Size Guide:** Detailed measurement tables.
    - **Legal:** Privacy Policy and Terms of Service.

---

## ✨ Premium Polish
- **SEO:** Use `react-helmet-async` for dynamic page titles and meta descriptions.
- **Animations:** Subtle scroll reveals using `framer-motion`.
- **Loading States:** Smooth transitions between pages.

---

## 🚀 AI Prompt for Generation
> "Read the `task.md` and the provided documentation. Based on the Phase 2 requirements, generate a professional, responsive `Navbar.jsx` using Tailwind CSS and Lucide icons. Ensure it has a glassmorphism effect and is sticky. Then, set up the Zustand store in `src/store/useStore.js` as described."
