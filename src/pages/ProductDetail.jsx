import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { addToCart } from '../store/cartSlice'
import { ShoppingCart, Star, ArrowLeft } from 'lucide-react'
import './ProductDetail.css'

/**
 * ProductDetail page component - displays detailed information for a single product
 */
function ProductDetail() {
  const { id } = useParams()
  const dispatch = useDispatch()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedImage, setSelectedImage] = useState(0)

  // Fetch product details from API
  useEffect(() => {
    const fetchProductDetail = async () => {
      try {
        setLoading(true)
        const response = await fetch(`https://dummyjson.com/products/${id}`)
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)
        const data = await response.json()
        setProduct(data)
        setError(null)
      } catch (err) {
        setError(err.message || 'Failed to fetch product details')
        setProduct(null)
      } finally {
        setLoading(false)
      }
    }

    fetchProductDetail()
  }, [id])

  // Add product to cart
  const handleAddToCart = () => {
    if (product) {
      dispatch(addToCart(product))
    }
  }

  // Loading state
  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading product details...</p>
      </div>
    )
  }

  // Error state
  if (error) {
    return (
      <div className="error-container">
        <h2>Error Loading Product</h2>
        <p>{error}</p>
        <Link to="/" className="back-link">
          <ArrowLeft size={20} /> Back to Home
        </Link>
      </div>
    )
  }

  // Product not found
  if (!product) {
    return (
      <div className="error-container">
        <h2>Product Not Found</h2>
        <Link to="/" className="back-link">
          <ArrowLeft size={20} /> Back to Home
        </Link>
      </div>
    )
  }

  return (
    <main className="product-detail-page">
      <div className="product-detail-container">
        {/* Back link */}
        <Link to="/" className="back-link">
          <ArrowLeft size={20} /> Back to Products
        </Link>

        {/* Product images & details */}
        <div className="product-detail-content">
          {/* Images section */}
          <div className="product-images">
            <div className="main-image">
              <img
                src={product.images?.[selectedImage] || product.thumbnail}
                alt={product.title}
              />
            </div>

            {/* Thumbnails */}
            {product.images?.length > 1 && (
              <div className="image-thumbnails">
                {product.images.map((img, index) => (
                  <img
                    key={index}
                    src={img}
                    alt={`${product.title} ${index + 1}`}
                    className={selectedImage === index ? 'active' : ''}
                    onClick={() => setSelectedImage(index)}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Details section */}
          <div className="product-details">
            <h1>{product.title}</h1>

            <div className="product-meta">
              <div className="rating">
                <Star size={20} fill="#ffc107" color="#ffc107" />
                <span>{product.rating.toFixed(1)}</span>
                <span className="reviews">({product.reviews?.length || 0} reviews)</span>
              </div>
              <span className="brand">Brand: {product.brand || 'N/A'}</span>
              <span className="category">Category: {product.category}</span>
            </div>

            <p className="description">{product.description}</p>

            {/* Price & stock info */}
            <div className="price-section">
              <div className="price-info">
                <span className="current-price">${product.price}</span>
                {product.discountPercentage > 0 && (
                  <>
                    <span className="original-price">
                      ${(product.price / (1 - product.discountPercentage / 100)).toFixed(2)}
                    </span>
                    <span className="discount">
                      -{Math.round(product.discountPercentage)}% OFF
                    </span>
                  </>
                )}
              </div>
              <p className="stock-info">
                {product.stock > 0 ? (
                  <span className="in-stock">In Stock ({product.stock} available)</span>
                ) : (
                  <span className="out-of-stock">Out of Stock</span>
                )}
              </p>
            </div>

            {/* Add to cart button */}
            <button
              onClick={handleAddToCart}
              className="add-to-cart-btn"
              disabled={product.stock === 0}
            >
              <ShoppingCart size={20} /> Add to Cart
            </button>
          </div>
        </div>
      </div>
    </main>
  )
}

export default ProductDetail
