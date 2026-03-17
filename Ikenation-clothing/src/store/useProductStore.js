import { create } from 'zustand';
import axios from 'axios';

const API_URL = `http://${window.location.hostname}:5000/api/products`;

export const useProductStore = create((set, get) => ({
  products: [],
  isLoading: false,
  error: null,

  fetchProducts: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.get(API_URL);
      set({ products: response.data, isLoading: false });
    } catch (error) {
      console.error('Error fetching products:', error);
      set({ error: error.message, isLoading: false, products: [] });
    }
  },

  addProduct: async (productData) => {
    try {
      const response = await axios.post(API_URL, productData);
      set((state) => ({ products: [response.data, ...state.products] }));
      return response.data;
    } catch (error) {
      console.error('Error adding product:', error);
      throw error;
    }
  },

  updateProduct: async (id, updatedData) => {
    try {
      const response = await axios.put(`${API_URL}/${id}`, updatedData);
      set((state) => ({
        products: state.products.map((product) =>
          product.id === id ? response.data : product
        ),
      }));
      return response.data;
    } catch (error) {
      console.error('Error updating product:', error);
      throw error;
    }
  },

  deleteProduct: async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      set((state) => ({
        products: state.products.filter((product) => product.id !== id),
      }));
    } catch (error) {
      console.error('Error deleting product:', error);
      throw error;
    }
  },

  getProduct: (id) => {
    const state = get();
    return state.products.find((product) => product.id === id);
  },

  getProductsByCategory: (category) => {
    const state = get();
    return state.products.filter((product) => product.category === category);
  },
}));
