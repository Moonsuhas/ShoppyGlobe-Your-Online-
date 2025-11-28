import { useDispatch, useSelector } from 'react-redux'
import { useProductFetch } from '../hooks/useProductFetch'
import { setSearchQuery, selectSearchQuery } from '../store/productSlice'
import { Search } from 'lucide-react'
import ProductItem from './ProductItem'    // ← Normal import (fast)
import './ProductList.css'

/**
 * ProductList component - displays products with search functionality
 */
function ProductList() {
  const dispatch = useDispatch()
  const { products, loading, error } = useProductFetch()
  const searchQuery = useSelector(selectSearchQuery)

  // Filter products based on search query
  const filteredProducts = products.filter(product =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.description.toLowerCase().includes(searchQuery.toLowerCase())
  )

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading products...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="error-container">
        <h2>Error Loading Products</h2>
        <p>{error}</p>
        <button onClick={() => window.location.reload()}>Retry</button>
      </div>
    )
  }

  return (
    <div className="product-list-container">
      <div className="search-container">
        <div className="search-box">
          <Search size={20} />
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => dispatch(setSearchQuery(e.target.value))}
            className="search-input"
          />
        </div>
        <p className="results-count">
          {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'} found
        </p>
      </div>

      {/* Product Grid */}
      <div className="product-grid">
        {filteredProducts.map(product => (
          <ProductItem key={product.id} product={product} />
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="no-results">
          <p>No products found matching "{searchQuery}"</p>
        </div>
      )}
    </div>
  )
}

export default ProductList
