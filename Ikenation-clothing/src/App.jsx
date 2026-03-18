import { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { useProductStore } from './store/useProductStore'
import { useCMSStore } from './store/cmsData'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import CartDrawer from './components/CartDrawer'
import Home from './pages/Home'
import Shop from './pages/Shop'
import Collections from './pages/Collections'
import ProductDetail from './pages/ProductDetail'
import About from './pages/About'
import Contact from './pages/Contact'
import Blog from './pages/Blog'
import OrderTracking from './pages/OrderTracking'
import FAQ from './pages/FAQ'
import SizeGuide from './pages/SizeGuide'
import Privacy from './pages/Privacy'
import Legal from './pages/Legal'
import Checkout from './pages/Checkout'
import OrderConfirmation from './pages/OrderConfirmation'
import { AdminDashboard, CMSEditor, ProductManagement, AddProduct, EditProduct, Orders, Customers } from './pages/Admin'
import Account from './pages/Account'
import Login from './pages/Login'
import NotFound from './pages/NotFound'
import RedirectToCart from './components/RedirectToCart'
import ProtectedRoute from './components/ProtectedRoute'
import axios from 'axios'
import { useAuthStore } from './store/useAuthStore'

// Axios Interceptors
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('ikenation-auth') 
      ? JSON.parse(localStorage.getItem('ikenation-auth')).state.token 
      : null;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      const { logout } = useAuthStore.getState();
      logout();
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);


function App() {
  const { fetchProducts } = useProductStore()
  const { fetchCMSPage } = useCMSStore()

  useEffect(() => {
    fetchProducts()
    fetchCMSPage('home')
    fetchCMSPage('about')
    fetchCMSPage('contact')
  }, [fetchProducts, fetchCMSPage])

  return (
    <HelmetProvider>
      <Router>
        <Routes>
          {/* Auth Routes */}
          <Route path="/login" element={<Login />} />

          {/* Admin Routes (Protected) */}
          <Route path="/admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
          <Route path="/admin/cms/home" element={<ProtectedRoute><CMSEditor pageName="home" pageTitle="Edit Homepage" /></ProtectedRoute>} />
          <Route path="/admin/cms/about" element={<ProtectedRoute><CMSEditor pageName="about" pageTitle="Edit About Page" /></ProtectedRoute>} />
          <Route path="/admin/cms/contact" element={<ProtectedRoute><CMSEditor pageName="contact" pageTitle="Edit Contact Page" /></ProtectedRoute>} />
          <Route path="/admin/cms/faq" element={<ProtectedRoute><CMSEditor pageName="faq" pageTitle="Edit FAQ" /></ProtectedRoute>} />
          <Route path="/admin/cms/blog" element={<ProtectedRoute><CMSEditor pageName="blog" pageTitle="Edit Blog" /></ProtectedRoute>} />
          <Route path="/admin/cms/privacy" element={<ProtectedRoute><CMSEditor pageName="privacy" pageTitle="Edit Privacy Policy" /></ProtectedRoute>} />
          <Route path="/admin/cms/legal" element={<ProtectedRoute><CMSEditor pageName="legal" pageTitle="Edit Terms of Service" /></ProtectedRoute>} />
          <Route path="/admin/cms/sizeGuide" element={<ProtectedRoute><CMSEditor pageName="sizeGuide" pageTitle="Edit Size Guide" /></ProtectedRoute>} />
          <Route path="/admin/cms/collections" element={<ProtectedRoute><CMSEditor pageName="collections" pageTitle="Edit Collections" /></ProtectedRoute>} />
          <Route path="/admin/cms/shop" element={<ProtectedRoute><CMSEditor pageName="shop" pageTitle="Edit Shop" /></ProtectedRoute>} />
          <Route path="/admin/products" element={<ProtectedRoute><ProductManagement /></ProtectedRoute>} />
          <Route path="/admin/products/add" element={<ProtectedRoute><AddProduct /></ProtectedRoute>} />
          <Route path="/admin/products/edit/:id" element={<ProtectedRoute><EditProduct /></ProtectedRoute>} />
          <Route path="/admin/orders" element={<ProtectedRoute><Orders /></ProtectedRoute>} />
          <Route path="/admin/customers" element={<ProtectedRoute><Customers /></ProtectedRoute>} />


          {/* Public Routes */}
          <Route
            path="/*"
            element={
              <>
                <Navbar />
                <CartDrawer />
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/shop" element={<Shop />} />
                  <Route path="/collections" element={<Collections />} />
                  <Route path="/product/:id" element={<ProductDetail />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/blog" element={<Blog />} />
                  <Route path="/track-order" element={<OrderTracking />} />
                  <Route path="/faq" element={<FAQ />} />
                  <Route path="/size-guide" element={<SizeGuide />} />
                  <Route path="/privacy" element={<Privacy />} />
                  <Route path="/legal" element={<Legal />} />
                  <Route path="/checkout" element={<Checkout />} />
                  <Route path="/order-confirmation" element={<OrderConfirmation />} />
                  <Route path="/account" element={<Account />} />
                  <Route path="/cart" element={<RedirectToCart />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
                <Footer />
              </>
            }
          />
        </Routes>
      </Router>
    </HelmetProvider>
  )
}

export default App
