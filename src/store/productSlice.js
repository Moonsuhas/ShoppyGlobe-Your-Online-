import { createSlice } from '@reduxjs/toolkit'

// Product Slice - Keeps track of product search/filter
// Allows updating or clearing the search query

const initialState = {
  searchQuery: '', // Current search text entered by the user
}

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    // Update the search text
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload
    },

    // Clear the search text
    clearSearchQuery: (state) => {
      state.searchQuery = ''
    },
  },
})

// Export actions to use in components
export const { setSearchQuery, clearSearchQuery } = productSlice.actions

// Selector to get current search query
export const selectSearchQuery = (state) => state.product.searchQuery

// Export reducer to add to store
export default productSlice.reducer
