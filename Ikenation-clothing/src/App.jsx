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
          {/* Admin Routes */}
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/cms/home" element={<CMSEditor pageName="home" pageTitle="Edit Homepage" />} />
          <Route path="/admin/cms/about" element={<CMSEditor pageName="about" pageTitle="Edit About Page" />} />
          <Route path="/admin/cms/contact" element={<CMSEditor pageName="contact" pageTitle="Edit Contact Page" />} />
          <Route path="/admin/cms/faq" element={<CMSEditor pageName="faq" pageTitle="Edit FAQ" />} />
          <Route path="/admin/cms/blog" element={<CMSEditor pageName="blog" pageTitle="Edit Blog" />} />
          <Route path="/admin/cms/privacy" element={<CMSEditor pageName="privacy" pageTitle="Edit Privacy Policy" />} />
          <Route path="/admin/cms/legal" element={<CMSEditor pageName="legal" pageTitle="Edit Terms of Service" />} />
          <Route path="/admin/cms/sizeGuide" element={<CMSEditor pageName="sizeGuide" pageTitle="Edit Size Guide" />} />
          <Route path="/admin/cms/collections" element={<CMSEditor pageName="collections" pageTitle="Edit Collections" />} />
          <Route path="/admin/cms/shop" element={<CMSEditor pageName="shop" pageTitle="Edit Shop" />} />
          <Route path="/admin/products" element={<ProductManagement />} />
          <Route path="/admin/products/add" element={<AddProduct />} />
          <Route path="/admin/products/edit/:id" element={<EditProduct />} />
          <Route path="/admin/orders" element={<Orders />} />
          <Route path="/admin/customers" element={<Customers />} />

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
