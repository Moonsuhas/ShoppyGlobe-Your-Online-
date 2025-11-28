import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';
import productReducer from './productSlice';

// Redux Store - Combines all slices and sets up the store
// This is where the global state of the app is managed
export const store = configureStore({
  reducer: {
    cart: cartReducer,       // Handles cart items, quantity, and total
    product: productReducer, // Handles product search/filter
  },
});

