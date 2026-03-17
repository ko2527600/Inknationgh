import express from 'express';
import { createOrder, getOrders, updateOrderStatus } from '../controllers/orderController.js';

const router = express.Router();

router.route('/')
  .post(createOrder)
  .get(getOrders); // In production, getOrders should have an admin middleware

router.route('/:id/status')
  .put(updateOrderStatus); // In production, this should have an admin middleware

export default router;
