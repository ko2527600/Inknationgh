import { create } from 'zustand'

export const useStore = create((set) => ({
  // Cart state
  cart: [],
  isCartOpen: false,

  // Wishlist state
  wishlist: [],

  // Cart actions
  addToCart: (product) =>
    set((state) => {
      const existingItem = state.cart.find((item) => item.id === product.id)
      if (existingItem) {
        return {
          cart: state.cart.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + (product.quantity || 1) }
              : item
          ),
        }
      }
      return {
        cart: [...state.cart, { ...product, quantity: product.quantity || 1 }],
      }
    }),

  removeFromCart: (productId) =>
    set((state) => ({
      cart: state.cart.filter((item) => item.id !== productId),
    })),

  updateQuantity: (productId, quantity) =>
    set((state) => ({
      cart: state.cart.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      ),
    })),

  toggleCart: () =>
    set((state) => ({
      isCartOpen: !state.isCartOpen,
    })),

  clearCart: () =>
    set({
      cart: [],
      isCartOpen: false,
    }),

  // Wishlist actions
  addToWishlist: (product) =>
    set((state) => {
      const exists = state.wishlist.find((item) => item.id === product.id)
      if (exists) return state
      return {
        wishlist: [...state.wishlist, product],
      }
    }),

  removeFromWishlist: (productId) =>
    set((state) => ({
      wishlist: state.wishlist.filter((item) => item.id !== productId),
    })),

  isInWishlist: (productId) => (state) =>
    state.wishlist.some((item) => item.id === productId),
}))
