import { createSlice } from '@reduxjs/toolkit'

// Cart Slice - Keeps track of the shopping cart
// Stores items, lets us add, remove, change quantity, and clear cart

const initialState = {
  items: [], // List of products in the cart: { id, title, price, quantity, thumbnail }
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // Add product to cart
    addToCart: (state, action) => {
      const product = action.payload
      const existingItem = state.items.find(item => item.id === product.id)
      
      if (existingItem) {
        // If product already in cart, just increase quantity
        existingItem.quantity += 1
      } else {
        // Otherwise, add new product to cart
        state.items.push({
          id: product.id,
          title: product.title,
          price: product.price,
          thumbnail: product.thumbnail,
          quantity: 1,
        })
      }
    },

    // Remove product from cart
    removeFromCart: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload)
    },

    // Update product quantity
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload
      const item = state.items.find(item => item.id === id)
      if (item && quantity >= 1) {
        item.quantity = quantity
      }
    },

    // Empty the entire cart
    clearCart: (state) => {
      state.items = []
    },
  },
})

// Export actions to use in components
export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions

// Selectors to get cart data from state
export const selectCartItems = (state) => state.cart.items
export const selectCartTotal = (state) => 
  state.cart.items.reduce((total, item) => total + (item.price * item.quantity), 0)
export const selectCartItemCount = (state) => 
  state.cart.items.reduce((count, item) => count + item.quantity, 0)

// Export reducer to add to store
export default cartSlice.reducer
