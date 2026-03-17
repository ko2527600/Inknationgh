import { useEffect } from 'react';
import AdminLayout from './AdminLayout';
import { useCMSStore } from '../../store/cmsData';
import { useProductStore } from '../../store/useProductStore';
import { useOrderStore } from '../../store/useOrderStore';
import { BarChart3, FileText, ShoppingCart, Users } from 'lucide-react';

export default function AdminDashboard() {
  const { resetData } = useCMSStore();
  const { products } = useProductStore();
  const { orders, fetchOrders } = useOrderStore();

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  // Count unique customers from orders
  const uniqueCustomerEmails = new Set(
    orders.map((o) => o.customer?.email).filter(Boolean)
  );
  
  const handleResetData = () => {
    if (window.confirm('Are you sure you want to reset all CMS data to defaults? This cannot be undone.')) {
      resetData();
      window.location.reload();
    }
  };

  const stats = [
    { label: 'Total Pages', value: '13', icon: FileText, color: 'bg-blue-500' },
    { label: 'Products', value: products.length.toString(), icon: ShoppingCart, color: 'bg-green-500' },
    { label: 'Orders', value: orders.length.toString(), icon: BarChart3, color: 'bg-purple-500' },
    { label: 'Customers', value: uniqueCustomerEmails.size.toString(), icon: Users, color: 'bg-orange-500' },
  ];


  return (
    <AdminLayout>
      <div>
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <button
            onClick={handleResetData}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition text-sm"
          >
            Reset All Data
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium">{stat.label}</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
                </div>
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <stat.icon size={24} className="text-white" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <a href="/admin/cms/home" className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition">
              <p className="font-semibold text-gray-900">Edit Homepage</p>
              <p className="text-sm text-gray-600 mt-1">Update hero, collections, trust bar</p>
            </a>
            <a href="/admin/cms/faq" className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition">
              <p className="font-semibold text-gray-900">Manage FAQ</p>
              <p className="text-sm text-gray-600 mt-1">Add, edit, or remove FAQ items</p>
            </a>
            <a href="/admin/cms/blog" className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition">
              <p className="font-semibold text-gray-900">Write Blog Post</p>
              <p className="text-sm text-gray-600 mt-1">Create new blog content</p>
            </a>
            <a href="/admin/cms/about" className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition">
              <p className="font-semibold text-gray-900">Update About Page</p>
              <p className="text-sm text-gray-600 mt-1">Edit brand story and team info</p>
            </a>
            <a href="/admin/cms/contact" className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition">
              <p className="font-semibold text-gray-900">Contact Information</p>
              <p className="text-sm text-gray-600 mt-1">Update contact details</p>
            </a>
            <a href="/admin/cms/privacy" className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition">
              <p className="font-semibold text-gray-900">Legal Pages</p>
              <p className="text-sm text-gray-600 mt-1">Edit privacy & terms</p>
            </a>
            <a href="/admin/products" className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition">
              <p className="font-semibold text-gray-900">Manage Products</p>
              <p className="text-sm text-gray-600 mt-1">Add, edit, or delete products</p>
            </a>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
