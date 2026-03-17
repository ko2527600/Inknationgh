import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Search, Eye, Filter, CheckCircle, Package, Truck, Clock } from 'lucide-react'
import AdminLayout from './AdminLayout'
import { useOrderStore } from '../../store/useOrderStore'

export default function Orders() {
  const { orders, updateOrderStatus, fetchOrders, isLoading } = useOrderStore()
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')

  useEffect(() => {
    fetchOrders()
  }, [fetchOrders])

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      `${order.customer.firstName} ${order.customer.lastName}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      order.customer.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'All' || order.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const handleStatusChange = (e, orderId) => {
    updateOrderStatus(orderId, e.target.value)
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'Processing':
        return 'bg-blue-100 text-blue-800'
      case 'Shipped':
        return 'bg-purple-100 text-purple-800'
      case 'Delivered':
        return 'bg-green-100 text-green-800'
      default:
    }
  }

  return (
    <AdminLayout>
      <div>
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Orders</h1>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search size={20} className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="Search by Order ID, Name, or Email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black bg-white"
            />
          </div>
          <div className="relative shrink-0">
            <Filter size={20} className="absolute left-3 top-3 text-gray-400" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black appearance-none bg-white font-medium"
            >
              <option value="All">All Statuses</option>
              <option value="Pending">Pending</option>
              <option value="Processing">Processing</option>
              <option value="Shipped">Shipped</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
        </div>

        {/* Orders Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          {isLoading ? (
            <div className="p-8 text-center">
              <p className="text-gray-600 font-medium">Loading orders...</p>
            </div>
          ) : filteredOrders.length === 0 ? (
            <div className="p-8 text-center">
              <p className="text-gray-600 font-medium">No orders found.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Order ID</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Date</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Customer</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Total</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredOrders.map((order) => (
                    <motion.tr
                      key={order.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="hover:bg-gray-50 transition"
                    >
                      <td className="px-6 py-4 font-medium text-gray-900">{order.id}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {new Date(order.date).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4">
                        <p className="font-medium text-gray-900">
                          {order.customer.firstName} {order.customer.lastName}
                        </p>
                        <p className="text-sm text-gray-500">{order.customer.email}</p>
                      </td>
                      <td className="px-6 py-4 font-semibold text-gray-900">₵{order.total.toFixed(2)}</td>
                      <td className="px-6 py-4">
                        <select
                          value={order.status}
                          onChange={(e) => handleStatusChange(e, order.id)}
                          className={`flex items-center gap-2 pl-3 pr-8 py-1.5 rounded-full text-sm font-medium border-none focus:ring-2 focus:ring-black appearance-none cursor-pointer ${getStatusColor(
                            order.status
                          )}`}
                        >
                          <option value="Pending">Pending</option>
                          <option value="Processing">Processing</option>
                          <option value="Shipped">Shipped</option>
                          <option value="Delivered">Delivered</option>
                        </select>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-yellow-400">
            <p className="text-gray-600 text-sm font-medium">Pending Orders</p>
            <p className="text-2xl font-bold text-gray-900 mt-2">
              {orders.filter((o) => o.status === 'Pending').length}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-blue-400">
            <p className="text-gray-600 text-sm font-medium">Processing</p>
            <p className="text-2xl font-bold text-gray-900 mt-2">
              {orders.filter((o) => o.status === 'Processing').length}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-purple-400">
            <p className="text-gray-600 text-sm font-medium">Shipped</p>
            <p className="text-2xl font-bold text-gray-900 mt-2">
              {orders.filter((o) => o.status === 'Shipped').length}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-green-400">
            <p className="text-gray-600 text-sm font-medium">Delivered</p>
            <p className="text-2xl font-bold text-gray-900 mt-2">
              {orders.filter((o) => o.status === 'Delivered').length}
            </p>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}
