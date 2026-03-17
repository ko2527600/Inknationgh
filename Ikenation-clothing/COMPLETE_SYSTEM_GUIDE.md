# IkeNation Clothing - Complete System Guide

## 📋 Table of Contents
1. [System Architecture](#system-architecture)
2. [File Structure](#file-structure)
3. [How Everything Works](#how-everything-works)
4. [Admin Panel Usage](#admin-panel-usage)
5. [Troubleshooting](#troubleshooting)

---

## System Architecture

### Technology Stack
- **Frontend Framework**: React 19.2.0
- **Routing**: React Router 7.13.1
- **State Management**: Zustand 5.0.11
- **Styling**: Tailwind CSS 4.2.1
- **Animations**: Framer Motion 12.34.3
- **Icons**: Lucide React 0.575.0
- **Build Tool**: Vite 7.3.1

### Core Components

```
┌─────────────────────────────────────────────────────────┐
│                    React App (App.jsx)                  │
│                                                         │
│  ┌──────────────────────────────────────────────────┐  │
│  │              Router (React Router)               │  │
│  │                                                  │  │
│  │  ┌─────────────────┐      ┌─────────────────┐  │  │
│  │  │  Public Routes  │      │  Admin Routes   │  │  │
│  │  │                 │      │                 │  │  │
│  │  │ - Home          │      │ - Dashboard     │  │  │
│  │  │ - Shop          │      │ - CMS Editor    │  │  │
│  │  │ - Collections   │      │ - Page Editors  │  │  │
│  │  │ - Checkout      │      │                 │  │  │
│  │  │ - etc.          │      │                 │  │  │
│  │  └─────────────────┘      └─────────────────┘  │  │
│  └──────────────────────────────────────────────────┘  │
│                                                         │
│  ┌──────────────────────────────────────────────────┐  │
│  │         Zustand Store (useCMSStore)             │  │
│  │                                                  │  │
│  │  cmsData: {                                      │  │
│  │    home: { heroSlides: [...], trustBar: [...] } │  │
│  │    about: { story: '', mission: '' }            │  │
│  │    contact: { email: '', phone: '' }            │  │
│  │    ... (other pages)                            │  │
│  │  }                                               │  │
│  │                                                  │  │
│  │  Methods:                                        │  │
│  │  - updateField(page, field, value)              │  │
│  │  - updateItem(page, field, index, updates)      │  │
│  │  - addItem(page, field, newItem)                │  │
│  │  - removeItem(page, field, index)               │  │
│  │  - resetData()                                  │  │
│  └──────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────┘
```

---

## File Structure

```
Ikenation-clothing/
├── src/
│   ├── components/
│   │   ├── HeroCarousel.jsx          ← Reads from CMS store
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   ├── CartDrawer.jsx
│   │   ├── ProductCard.jsx
│   │   └── ... (other components)
│   │
│   ├── pages/
│   │   ├── Home.jsx                  ← Uses HeroCarousel
│   │   ├── Shop.jsx
│   │   ├── Collections.jsx
│   │   ├── ProductDetail.jsx
│   │   ├── Checkout.jsx              ← Multi-step checkout
│   │   ├── OrderConfirmation.jsx     ← Order success page
│   │   ├── About.jsx
│   │   ├── Contact.jsx
│   │   ├── FAQ.jsx
│   │   ├── Blog.jsx
│   │   ├── Privacy.jsx
│   │   ├── Legal.jsx
│   │   ├── SizeGuide.jsx
│   │   ├── OrderTracking.jsx
│   │   ├── Collections.jsx
│   │   ├── index.js                  ← Exports all pages
│   │   │
│   │   └── Admin/
│   │       ├── AdminDashboard.jsx    ← Admin home page
│   │       ├── AdminLayout.jsx       ← Admin layout wrapper
│   │       ├── AdminSidebar.jsx      ← Admin navigation
│   │       ├── CMSEditor.jsx         ← Main CMS editor
│   │       └── index.js              ← Exports admin components
│   │
│   ├── store/
│   │   ├── useCMSStore.js            ← Zustand store (CORE)
│   │   ├── useStore.js               ← Cart store
│   │   └── index.js
│   │
│   ├── utils/
│   │   └── seoConfig.js
│   │
│   ├── App.jsx                       ← Main app with routes
│   ├── main.jsx                      ← React entry point
│   └── index.css                     ← Tailwind import
│
├── public/
│   └── vite.svg
│
├── tailwind.config.js                ← Tailwind configuration
├── postcss.config.js                 ← PostCSS configuration
├── vite.config.js                    ← Vite configuration
├── eslint.config.js
├── package.json
└── index.html                        ← HTML entry point
```

---

## How Everything Works

### 1. Homepage Hero Carousel Flow

```
User visits http://localhost:5173/
    ↓
Home.jsx renders
    ↓
HeroCarousel component loads
    ↓
HeroCarousel calls useCMSStore()
    ↓
Gets cmsData.home.heroSlides (4 slides)
    ↓
Displays slides with auto-rotation
    ↓
User sees hero carousel with images, titles, CTAs
```

### 2. Admin Edit Hero Slides Flow

```
User visits http://localhost:5173/admin/cms/home
    ↓
CMSEditor loads with pageName="home"
    ↓
CMSPageContent routes to HomeEditor
    ↓
HomeEditor displays all 4 hero slides
    ↓
User uploads image or enters URL
    ↓
handleImageUpload() or onChange() triggered
    ↓
updateItem(pageName, 'heroSlides', slideIndex, updates) called
    ↓
Zustand store updates immediately
    ↓
HeroCarousel component re-renders
    ↓
Homepage shows updated content instantly
```

### 3. Store Update Mechanism

```javascript
// When user edits a hero slide:
updateItem('home', 'heroSlides', 0, {
  title: 'New Title',
  image: 'new-image-url'
})

// Store updates:
cmsData.home.heroSlides[0] = {
  ...cmsData.home.heroSlides[0],
  title: 'New Title',
  image: 'new-image-url'
}

// All components using useCMSStore() re-render
// HeroCarousel sees new data and displays it
```

---

## Admin Panel Usage

### Accessing Admin
1. Start dev server: `npm run dev`
2. Go to: `http://localhost:5173/admin`
3. You'll see the Admin Dashboard

### Dashboard Features
- **Stats Grid**: Shows total pages, products, orders, customers
- **Quick Actions**: Links to edit different pages
- **Reset Button**: Restores all data to defaults

### Editing Hero Slides

**Path**: `/admin/cms/home`

**For each of 4 slides, you can edit:**
- Image (upload file or paste URL)
- Title
- Subtitle
- CTA Button Text

**Changes appear immediately on homepage**

### Editing Other Pages

**Available editors:**
- `/admin/cms/about` - About page
- `/admin/cms/contact` - Contact page
- `/admin/cms/faq` - FAQ items
- `/admin/cms/blog` - Blog posts
- `/admin/cms/privacy` - Privacy policy
- `/admin/cms/legal` - Terms of service
- `/admin/cms/sizeGuide` - Size guide
- `/admin/cms/collections` - Collections
- `/admin/cms/shop` - Shop settings

---

## Troubleshooting

### Issue: Hero slides not showing on homepage

**Solution:**
1. Check that you're on the home page (`/`)
2. Open browser DevTools (F12)
3. Check Console for errors
4. Verify store has data: `console.log('HeroCarousel slides:', slides)`
5. Try refreshing the page

### Issue: Admin page not loading

**Solution:**
1. Make sure dev server is running: `npm run dev`
2. Check URL is correct: `http://localhost:5173/admin`
3. Open DevTools Console and look for errors
4. Try clearing browser cache (Ctrl+Shift+Delete)
5. Restart dev server

### Issue: Changes not reflecting on homepage

**Solution:**
1. Make sure you're editing the correct page (should be "home")
2. Check that the store shows "4" hero slides
3. Go back to homepage and refresh (Ctrl+R)
4. Check browser console for errors
5. Try resetting data and editing again

### Issue: Images not loading

**Solution:**
1. If using URL: verify it's a valid image URL
2. If uploading: check file size (very large files may take time)
3. Try a different image to test
4. Check browser console for CORS errors

### Issue: Styling not working

**Solution:**
1. Verify Tailwind is imported: check `src/index.css`
2. Check `tailwind.config.js` has correct content paths
3. Restart dev server: `npm run dev`
4. Clear browser cache and refresh
5. Check for CSS errors in DevTools

---

## Key Files to Remember

| File | Purpose |
|------|---------|
| `src/store/useCMSStore.js` | Central data store for all CMS content |
| `src/components/HeroCarousel.jsx` | Displays hero slides from store |
| `src/pages/Admin/CMSEditor.jsx` | Main admin editor component |
| `src/App.jsx` | Routes and app structure |
| `tailwind.config.js` | Tailwind CSS configuration |
| `src/index.css` | Global styles and Tailwind import |

---

## Next Steps

### For Development
1. Add backend API to persist data
2. Implement user authentication
3. Add image upload to CDN
4. Create product management system
5. Add order management

### For Production
1. Set up database (MongoDB, PostgreSQL, etc.)
2. Create backend API (Node.js, Python, etc.)
3. Implement proper authentication
4. Set up image hosting (AWS S3, Cloudinary, etc.)
5. Deploy to production server

---

**System is fully operational and ready to use!** 🚀
