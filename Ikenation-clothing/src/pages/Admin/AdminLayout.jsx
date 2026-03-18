import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, X, LogOut } from 'lucide-react';
import { AdminSidebar } from './';
import { useAuthStore } from '../../store/useAuthStore';

export default function AdminLayout({ children }) {
  // Collapse sidebar by default on smaller screens
  const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth > 768);
  const navigate = useNavigate();
  const { user, logout, logoutAsync } = useAuthStore();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };



  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <AdminSidebar isOpen={sidebarOpen} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="flex items-center justify-between px-6 py-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 hover:bg-gray-100 rounded-lg transition"
            >
              {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            
            <div className="flex items-center gap-4">
              <div className="flex flex-col items-end mr-2">
                <span className="text-sm font-bold text-gray-900">
                  {user ? `${user.firstName} ${user.lastName}` : 'Admin'}
                </span>
                <span className="text-[10px] text-gray-500 uppercase tracking-widest font-black">
                  {user?.role || 'Admin'}
                </span>
              </div>
              <button 
                onClick={handleLogout}
                className="p-2 hover:bg-red-50 rounded-lg transition group" 
                title="Logout"
              >
                <LogOut size={20} className="text-gray-600 group-hover:text-red-500 transition-colors" />
              </button>
            </div>

          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-auto">
          <div className="p-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
