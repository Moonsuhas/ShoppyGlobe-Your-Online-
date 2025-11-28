import { Link } from 'react-router-dom'
import { ShoppingCart } from 'lucide-react'
import { useSelector } from 'react-redux'
import { selectCartItemCount } from '../store/cartSlice'
import './Header.css'

/**
 * Header component with navigation and cart icon
 */
function Header() {
  const cartItemCount = useSelector(selectCartItemCount)

  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo">
          <h1>ShoppyGlobe</h1>
        </Link>
        
        <nav className="nav">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/cart" className="nav-link cart-link" aria-label={`Shopping cart with ${cartItemCount} items`}>
            <ShoppingCart size={24} />
            {cartItemCount > 0 && (
              <span className="cart-badge">{cartItemCount}</span>
            )}
          </Link>
        </nav>
      </div>
    </header>
  )
}

export default Header
