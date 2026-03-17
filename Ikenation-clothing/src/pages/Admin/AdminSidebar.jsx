import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, FileText, Users, Settings, BookOpen, Lock, ShoppingBag } from 'lucide-react';

const menuItems = [
  { label: 'Dashboard', path: '/admin', icon: Home },
  { label: 'Pages', icon: FileText, submenu: [
    { label: 'Home', path: '/admin/cms/home' },
    { label: 'About', path: '/admin/cms/about' },
    { label: 'Contact', path: '/admin/cms/contact' },
    { label: 'FAQ', path: '/admin/cms/faq' },
    { label: 'Blog', path: '/admin/cms/blog' },
    { label: 'Collections', path: '/admin/cms/collections' },
    { label: 'Shop', path: '/admin/cms/shop' },
    { label: 'Size Guide', path: '/admin/cms/sizeGuide' },
  ]},
  { label: 'Legal', icon: Lock, submenu: [
    { label: 'Privacy Policy', path: '/admin/cms/privacy' },
    { label: 'Terms of Service', path: '/admin/cms/legal' },
  ]},
  { label: 'Products', path: '/admin/products', icon: ShoppingBag },
  { label: 'Orders', path: '/admin/orders', icon: BookOpen },
  { label: 'Customers', path: '/admin/customers', icon: Users },
  { label: 'Exit to Site', path: '/', icon: Settings },
];

export default function AdminSidebar({ isOpen }) {
  const location = useLocation();
  const [expandedMenu, setExpandedMenu] = useState(null);

  const isActive = (path) => location.pathname === path;

  return (
    <aside
      className={`${
        isOpen ? 'w-64' : 'w-0'
      } bg-gray-900 text-white transition-all duration-300 overflow-hidden flex flex-col`}
    >
      {/* Logo */}
      <div className="p-6 border-b border-gray-800">
        <h1 className="text-xl font-bold">IkeNation Clothing</h1>
        <p className="text-xs text-gray-400 mt-1">CMS Dashboard</p>
      </div>

      {/* Menu */}
      <nav className="flex-1 overflow-y-auto p-4 space-y-2">
        {menuItems.map((item) => (
          <div key={item.label}>
            {item.submenu ? (
              <div>
                <button
                  onClick={() => setExpandedMenu(expandedMenu === item.label ? null : item.label)}
                  className="w-full flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-800 transition text-left"
                >
                  <item.icon size={20} />
                  <span className="flex-1">{item.label}</span>
                  <span className={`transition-transform ${expandedMenu === item.label ? 'rotate-180' : ''}`}>
                    ▼
                  </span>
                </button>
                {expandedMenu === item.label && (
                  <div className="ml-4 mt-2 space-y-1 border-l border-gray-700 pl-4">
                    {item.submenu.map((subitem) => (
                      <Link
                        key={subitem.path}
                        to={subitem.path}
                        className={`block px-4 py-2 rounded-lg text-sm transition ${
                          isActive(subitem.path)
                            ? 'bg-blue-600 text-white'
                            : 'hover:bg-gray-800 text-gray-300'
                        }`}
                      >
                        {subitem.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <Link
                to={item.path}
                className={`flex items-center gap-3 px-4 py-2 rounded-lg transition ${
                  isActive(item.path)
                    ? 'bg-blue-600 text-white'
                    : 'hover:bg-gray-800 text-gray-300'
                }`}
              >
                <item.icon size={20} />
                <span>{item.label}</span>
              </Link>
            )}
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-800 text-xs text-gray-400">
        <p>© 2026 IkeNation Clothing</p>
      </div>
    </aside>
  );
}
