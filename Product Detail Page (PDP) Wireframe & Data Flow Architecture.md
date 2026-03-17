# Product Detail Page (PDP) Wireframe & Data Flow Architecture

This document provides a detailed wireframe for the Product Detail Page (PDP) and a comprehensive data flow architecture diagram, illustrating how information moves through the premium clothing e-commerce platform.

---

## 1. Product Detail Page (PDP) Wireframe

The PDP is designed to be highly interactive and informative, guiding the user from product discovery to purchase with advanced features.

### Visual Wireframe

![Product Detail Page Wireframe](https://private-us-east-1.manuscdn.com/sessionFile/tZfurQk9aMoQPdGzsdUshc/sandbox/BKmB54YBrh0ixhGhHaB3Fp-images_1772341649577_na1fn_L2hvbWUvdWJ1bnR1L3BkcF93aXJlZnJhbWU.png?Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvdFpmdXJRazlhTW9RUGRHenNkVXNoYy9zYW5kYm94L0JLbUI1NFlCcmgwaXhoR2hIYUIzRnAtaW1hZ2VzXzE3NzIzNDE2NDk1NzdfbmExZm5fTDJodmJXVXZkV0oxYm5SMUwzQmtjRjkzYVhKbFpuSmhiV1UucG5nIiwiQ29uZGl0aW9uIjp7IkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNzk4NzYxNjAwfX19XX0_&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=HK-edhw~X-q4y1Kpqw3fLyAdTHyozmTNn~ti8ZqdR7ZZ0REnVvcyYtp4XVwCrvrsB6HsCFPhroI~PH06ZL6HceG54cqjuvfxqU014ub6HB34VJixvdSQBxonp-r9zSBWL13RnjYRdmaGY~ycE8~PwfuEpaphetMoChF66IhQaoFyVY1gzB7K2KFtBTXMeX6WX32YJM30V2oO0mCMTRizraGFbqE1eNhlFNs3ij-p6HzXTxjv2x-F4hL6kDXiwl1II8z9fhSM6x-0mY4NBpRnD6W3oF83qf6dqYEyWEwKd~RyrN4pdY2FPLC8yMbS46oWQBaobqUUHBo7fxrsME6mOA__)

### Key Components & Interactions

*   **Header (Sticky):** Remains visible at the top, providing access to global navigation, search, and cart.
*   **Breadcrumbs:** Helps users understand their location within the site hierarchy (e.g., Home > Category > Product Name).
*   **Image Gallery (Left Side):**
    *   **Multiple High-Res Images:** Displays various angles and details of the product. Supports zoom-on-hover for close-up inspection.
    *   **Video Embeds:** Optional product showcase videos to provide a dynamic view of the clothing.
*   **Product Info & Actions (Right Side):**
    *   **Product Name & Price:** Clearly displayed for immediate recognition.
    *   **Inventory Badge:** Dynamic text like "Only X Left!" or "Out of Stock" to create urgency or manage expectations.
    *   **Color & Size Selectors:** Intuitive options for selecting product variants.
    *   **Size Guide Link:** Direct access to the dedicated Size Guide page to help customers choose the correct fit.
    *   **Quantity Selector:** Allows users to specify the number of items.
    *   **Add to Cart Button:** The primary call-to-action, designed to be sticky on mobile for easy access.
    *   **Wishlist Icon:** Enables users to save products for later, encouraging return visits.
    *   **WhatsApp Order Button:** A prominent button for direct inquiries or orders via WhatsApp, pre-filling messages with product details.
    *   **Social Proof:** Dynamic messages (e.g., "🔥 12 people are looking at this") to build trust and urgency.
    *   **Product Description & Details:** Comprehensive information about the material, fit, care instructions, and unique selling points.
    *   **Customer Reviews/Ratings:** Displays user-generated content to build credibility and aid purchasing decisions.
*   **Related Products / Recommendations:** Suggests complementary items or similar styles to increase average order value.
*   **Footer (Sticky):** Provides essential links (legal, contact, social media) and remains accessible.

---

## 2. Data Flow Architecture

This diagram illustrates the flow of data and interactions between the Frontend, Backend, Admin Dashboard, and various External Services, ensuring a robust and scalable system.

### Visual Architecture

![Data Flow Architecture](https://private-us-east-1.manuscdn.com/sessionFile/tZfurQk9aMoQPdGzsdUshc/sandbox/BKmB54YBrh0ixhGhHaB3Fp-images_1772341649577_na1fn_L2hvbWUvdWJ1bnR1L2RhdGFfZmxvd19hcmNoaXRlY3R1cmU.png?Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvdFpmdXJRazlhTW9RUGRHenNkVXNoYy9zYW5kYm94L0JLbUI1NFlCcmgwaXhoR2hIYUIzRnAtaW1hZ2VzXzE3NzIzNDE2NDk1NzdfbmExZm5fTDJodmJXVXZkV0oxYm5SMUwyUmhkR0ZmWm14dmQxOWhjbU5vYVhSbFkzUjFjbVUucG5nIiwiQ29uZGl0aW9uIjp7IkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNzk4NzYxNjAwfX19XX0_&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=iwf5DAspdFnS7T58~wvJREkiYVuMv5JNZ6sc3lCe8g~S4nTODYbzUtCpBptcj9ovoxPSutAS71FVOVCpKCNmLgsvaTjfHVMDygawVsWRzOD8-p3HPn94BFrGtIbIgeov3K1ZvyfdhE716eWOlVWgR7RWW-k2wn4-Qz9XTzx2g-8kLr16p9zut8OKl7~X789DkVLm7U-pomI9epTORz895gzuVjkkV5cthC3pXURugo1AA~dzTU~Oevt6mCrzTxzdBKLegGXTEtweoMinr9nY~KXP7XfsjxqxwTLOna33KYfo-dCCX3v~-iJrWOB3wF~FAmeB-MYYenM8dL8VOlD2Lw__)

### Explanation of Data Flow

#### Frontend (React/Vite)
*   **User Interaction:** All user actions (browsing, searching, adding to cart, checking out) originate here.
*   **State Management (Zustand):** Manages the application's global state, including the shopping cart, wishlist, and UI states (e.g., `isCartOpen`).
*   **API Calls (Axios):** Handles communication with the Backend for fetching product data, submitting orders, and user authentication.
*   **Display Data:** Renders product information, order confirmations, and other dynamic content to the user.
*   **WhatsApp Integration:** Directs user inquiries or order requests to the WhatsApp API.
*   **Payment Gateway (Stripe/PayPal):** Facilitates secure payment processing by interacting with external payment APIs.

#### Backend (Node.js/Express)
*   **API Endpoints:** Receives requests from the Frontend and Admin Dashboard.
*   **Authentication (JWT):** Verifies user and admin identities for secure access to resources.
*   **Product Service:** Manages product-related logic, including fetching, creating, updating, and deleting products.
*   **Order Service:** Handles order creation, status updates, and retrieval.
*   **User Service:** Manages user accounts and profiles.
*   **Database (MongoDB):** Stores all persistent data, including products, orders, user information, and inventory levels.
*   **Image Storage (Cloudinary):** Stores and optimizes product images, providing URLs to the Frontend.
*   **Email Service (Nodemailer/SendGrid):** Sends automated transactional emails (e.g., order confirmations, shipping updates).

#### Admin Dashboard (React/Vite)
*   **Admin Login:** Secure access for the brother to manage the store.
*   **Admin API Calls:** Interacts with the Backend's authenticated endpoints for product, order, and user management.
*   **Product Management:** Allows adding new products, editing existing ones, and managing inventory.
*   **Order Management:** Provides tools to view, update, and process customer orders.
*   **Image Upload:** Utilizes Cloudinary for seamless multi-image uploads.

#### External Services
*   **WhatsApp API:** Enables real-time messaging and order communication.
*   **Payment Gateway API:** Processes secure credit card and other payment transactions.
*   **Cloudinary CDN:** Delivers optimized images globally for fast loading times.
*   **Email Provider:** Handles the actual sending of emails initiated by the Email Service.

---

## 📚 References
[1] Elementor. (n.d.). *How to Create a Clothing Website: The Ultimate Guide for 2026*. Retrieved from https://elementor.com/blog/how-to-create-a-clothing-website/
[2] ActiveCampaign. (2025, November 20). *The Complete Guide to WhatsApp for Ecommerce: Sales, Support & Marketing*. Retrieved from https://www.activecampaign.com/blog/whatsapp-ecommerce-complete-guide
[3] Salesforce. (n.d.). *Ecommerce Checkout: 10 Best Practices for 2026*. Retrieved from https://www.salesforce.com/commerce/online-payment-solution/checkout-guide/
[4] DesignRush. (n.d.). *Best Fashion & Beauty Website Designs of 2026*. Retrieved from https://www.designrush.com/best-designs/websites/fashion-beauty
[5] Medium. (n.d.). *2026 UX/UI Design Trends that will be everywhere*. Retrieved from https://medium.com/@tanmayvatsa1507/2026-ux-ui-design-trends-that-will-be-everywhere-0cb83b572319
[6] Tailwind CSS. (n.d.). *Installing Tailwind CSS with Vite*. Retrieved from https://tailwindcss.com/docs
[7] DigitalOcean. (2025, May 13). *How To Set Up a React Project with Vite for Fast Development*. Retrieved from https://www.digitalocean.com/community/tutorials/how-to-set-up-a-react-project-with-vite
[8] LinkedIn. (n.d.). *Modern React Project Setup: Vite + Tailwind CSS + Router*. Retrieved from https://www.linkedin.com/pulse/modern-react-project-setup-vite-tailwind-css-router-s-heaven--z4w2c
[9] Nike. (n.d.). *Official Website*. Retrieved from https://www.nike.com
[10] Zara. (n.d.). *Official Website*. Retrieved from https://www.zara.com
[11] H&M. (n.d.). *Official Website*. Retrieved from https://www.hm.com
[12] Sneakersnstuff. (n.d.). *Official Website*. Retrieved from https://www.sneakersnstuff.com
