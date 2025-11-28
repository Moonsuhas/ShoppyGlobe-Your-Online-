import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { addToCart } from '../store/cartSlice'
import { ShoppingCart, Star } from 'lucide-react'
import './ProductItem.css'

/**
 * ProductItem component - displays a single product with Add to Cart button
 * @param {Object} props - Component props
 * @param {Object} props.product - Product object containing id, title, price, thumbnail, etc.
 */
function ProductItem({ product }) {
  const dispatch = useDispatch()

  const handleAddToCart = () => {
    dispatch(addToCart(product))
  }

  const discountedPrice =
    product.discountPercentage > 0
      ? (product.price / (1 - product.discountPercentage / 100)).toFixed(2)
      : null

  return (
    <div className="product-item">
      <Link to={`/product/${product.id}`} className="product-link">
        <div className="product-image-container">
          <img 
            src={product.thumbnail} 
            alt={product.title}
            className="product-image"
            loading="lazy"
          />
          {product.discountPercentage > 0 && (
            <span className="discount-badge">-{Math.round(product.discountPercentage)}%</span>
          )}
        </div>
        
        <div className="product-info">
          <h3 className="product-title">{product.title}</h3>
          <p className="product-description">
            {product.description.length > 60
              ? product.description.substring(0, 60) + '...'
              : product.description
            }
          </p>
          
          <div className="product-rating">
            <Star size={16} fill="#ffc107" color="#ffc107" />
            <span>{product.rating.toFixed(1)}</span>
          </div>
          
          <div className="product-price">
            <span className="price">${product.price}</span>
            {discountedPrice && (
              <span className="original-price">${discountedPrice}</span>
            )}
          </div>
        </div>
      </Link>
      
      <button 
        onClick={handleAddToCart}
        className="add-to-cart-btn"
      >
        <ShoppingCart size={18} />
        Add to Cart
      </button>
    </div>
  )
}

export default ProductItem
