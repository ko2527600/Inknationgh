import prisma from '../config/prisma.js';

// @desc    Create new order
// @route   POST /api/orders
// @access  Public
export const createOrder = async (req, res) => {
  try {
    const { orderId, customer, items, total, status, paymentMethod } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ message: 'No order items' });
    }

    // 1. Check if customer exists by email, otherwise create
    let dbCustomer = await prisma.customer.findUnique({
      where: { email: customer.email }
    });

    if (!dbCustomer) {
      dbCustomer = await prisma.customer.create({
        data: {
          firstName: customer.firstName,
          lastName: customer.lastName,
          email: customer.email,
          phone: customer.phone,
          address: {
            street: customer.address || '',
            city: customer.city || '',
            state: customer.state || '',
            zipCode: customer.zipCode || '',
            country: customer.country || ''
          }
        }
      });
    }

    // 2. Create the Order linked to the customer
    const order = await prisma.order.create({
      data: {
        orderNumber: orderId, // using the generated ID from frontend
        customerId: dbCustomer.id,
        items: items, // JSON snapshot
        totalAmount: total,
        status: status || 'Pending',
        paymentMethod: paymentMethod
      }
    });

    // Map back for the frontend
    const mappedOrder = {
      id: order.orderNumber,
      dbId: order.id,
      date: order.createdAt,
      customer: dbCustomer,
      items: order.items,
      total: order.totalAmount,
      status: order.status,
      paymentMethod: order.paymentMethod
    };

    res.status(201).json(mappedOrder);
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ message: 'Error creating order', error: error.message });
  }
};

// @desc    Get all orders
// @route   GET /api/orders
// @access  Private/Admin
export const getOrders = async (req, res) => {
  try {
    const orders = await prisma.order.findMany({
      include: {
        customer: true // include customer details in response
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    const mappedOrders = orders.map(o => ({
       id: o.orderNumber,
       dbId: o.id,
       date: o.createdAt,
       customer: o.customer,
       items: o.items,
       total: o.totalAmount,
       status: o.status,
       paymentMethod: o.paymentMethod
    }));

    res.json(mappedOrders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ message: 'Error fetching orders', error: error.message });
  }
};

// @desc    Update order status
// @route   PUT /api/orders/:id/status
// @access  Private/Admin
export const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    
    // allow find by the uuid id or the orderNumber
    let order = await prisma.order.findUnique({
      where: { id: req.params.id }
    });

    if (!order) {
       // fallback check by orderNumber just in case
       order = await prisma.order.findUnique({
          where: { orderNumber: req.params.id }
       });
    }

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    const updatedOrder = await prisma.order.update({
      where: { id: order.id },
      data: { status }
    });

    const mappedOrder = {
       id: updatedOrder.orderNumber,
       dbId: updatedOrder.id,
       date: updatedOrder.createdAt,
       items: updatedOrder.items,
       total: updatedOrder.totalAmount,
       status: updatedOrder.status,
       paymentMethod: updatedOrder.paymentMethod
    }

    res.json(mappedOrder);
  } catch (error) {
    console.error('Error updating order status:', error);
    res.status(500).json({ message: 'Error updating order status', error: error.message });
  }
};
