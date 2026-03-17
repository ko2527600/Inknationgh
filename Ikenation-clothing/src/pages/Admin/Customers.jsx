import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Search, User, MapPin, Mail, Phone } from 'lucide-react'
import AdminLayout from './AdminLayout'
import { useOrderStore } from '../../store/useOrderStore'

export default function Customers() {
  const { orders } = useOrderStore()
  const [searchTerm, setSearchTerm] = useState('')

  // Derive unique customers from orders
  const customers = useMemo(() => {
    const customerMap = new Map()

    orders.forEach((order) => {
      const email = order.customer.email.toLowerCase()
      if (customerMap.has(email)) {
        const existing = customerMap.get(email)
        existing.totalSpent += order.total
        existing.orderCount += 1
        existing.lastOrderDate = new Date(Math.max(new Date(existing.lastOrderDate).getTime(), new Date(order.date).getTime())).toISOString()
      } else {
        customerMap.set(email, {
          id: email,
          ...order.customer,
          totalSpent: order.total,
          orderCount: 1,
          lastOrderDate: order.date,
        })
      }
    })

    return Array.from(customerMap.values()).sort((a, b) => b.totalSpent - a.totalSpent)
  }, [orders])

  const filteredCustomers = customers.filter(
    (customer) =>
      `${customer.firstName} ${customer.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <AdminLayout>
      <div>
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Customers</h1>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative">
            <Search size={20} className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="Search customers by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black bg-white"
            />
          </div>
        </div>

        {/* Customers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCustomers.length === 0 ? (
            <div className="col-span-full p-8 text-center bg-white rounded-lg shadow">
              <p className="text-gray-600 font-medium">No customers found.</p>
            </div>
          ) : (
            filteredCustomers.map((customer) => (
              <motion.div
                key={customer.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 hover:shadow-md transition"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center shrink-0">
                    <User size={24} className="text-gray-500" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">
                      {customer.firstName} {customer.lastName}
                    </h3>
                    <p className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                      <Mail size={14} />
                      {customer.email}
                    </p>
                    <p className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                      <Phone size={14} />
                      {customer.phone}
                    </p>
                  </div>
                </div>

                <div className="border-t border-gray-100 pt-4 mb-4">
                  <p className="text-sm text-gray-600 flex items-start gap-2">
                    <MapPin size={16} className="text-gray-400 shrink-0 mt-0.5" />
                    <span>
                      {customer.address}, {customer.city}<br />
                      {customer.state}, {customer.country}
                    </span>
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4 border-t border-gray-100 pt-4 bg-gray-50 -mx-6 -mb-6 p-6 rounded-b-lg">
                  <div>
                    <p className="text-xs text-gray-500 font-medium uppercase tracking-wider mb-1">Total Spent</p>
                    <p className="font-bold text-gray-900 text-lg">₵{customer.totalSpent.toFixed(2)}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 font-medium uppercase tracking-wider mb-1">Orders</p>
                    <p className="font-bold text-gray-900 text-lg">{customer.orderCount}</p>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </AdminLayout>
  )
}
