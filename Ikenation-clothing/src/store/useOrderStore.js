import { create } from 'zustand';
import axios from 'axios';

const API_URL = `${import.meta.env.VITE_API_URL}/orders`;

export const useOrderStore = create((set, get) => ({
  orders: [],
  isLoading: false,
  error: null,

  fetchOrders: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.get(API_URL);
      set({ orders: response.data, isLoading: false });
    } catch (error) {
      console.error('Error fetching orders:', error);
      set({ error: error.message, isLoading: false, orders: [] });
    }
  },

  addOrder: async (orderData) => {
    try {
      const response = await axios.post(API_URL, orderData);
      set((state) => ({ orders: [response.data, ...state.orders] }));
      return response.data;
    } catch (error) {
      console.error('Error adding order:', error);
      throw error;
    }
  },

  updateOrderStatus: async (id, status) => {
    try {
      const response = await axios.put(`${API_URL}/${id}/status`, { status });
      set((state) => ({
        orders: state.orders.map((order) =>
          order.id === id ? response.data : order
        ),
      }));
      return response.data;
    } catch (error) {
      console.error('Error updating order:', error);
      throw error;
    }
  },

  deleteOrder: async (id) => {
    set((state) => ({
      orders: state.orders.filter((order) => order.id !== id),
    }));
  },
}));
