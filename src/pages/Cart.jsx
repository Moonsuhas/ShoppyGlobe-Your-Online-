import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { selectCartItems, selectCartTotal } from '../store/cartSlice';
import CartItem from '../components/CartItem';
import { ShoppingBag, ArrowRight } from 'lucide-react';
import './Cart.css';

/**
 * Cart Page Component
 * Shows all items in the shopping cart
 * Provides checkout and continue shopping options
 */
function Cart() {
  const cartItems = useSelector(selectCartItems); // Get cart items from Redux
  const cartTotal = useSelector(selectCartTotal); // Get total price from Redux

  // If cart is empty, show empty cart message
  if (cartItems.length === 0) {
    return (
      <main className="cart-page">
        <div className="cart-container">
          <div className="empty-cart">
            <ShoppingBag size={64} color="#ccc" />
            <h2>Your cart is empty</h2>
            <p>Add some products to get started!</p>
            <Link to="/" className="continue-shopping-btn">
              Continue Shopping
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="cart-page">
      <div className="cart-container">
        <h1>Shopping Cart</h1>
        <p className="cart-count">
          {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'}
        </p>

        <div className="cart-content">
          {/* List of Cart Items */}
          <div className="cart-items">
            {cartItems.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
          </div>

          {/* Order Summary */}
          <div className="cart-summary">
            <h2>Order Summary</h2>

            <div className="summary-row">
              <span>Subtotal</span>
              <span>${cartTotal.toFixed(2)}</span>
            </div>

            <div className="summary-row">
              <span>Shipping</span>
              <span>Free</span>
            </div>

            <div className="summary-row total">
              <span>Total</span>
              <span>${cartTotal.toFixed(2)}</span>
            </div>

            <Link to="/checkout" className="checkout-btn">
              Proceed to Checkout
              <ArrowRight size={20} />
            </Link>

            <Link to="/" className="continue-shopping-link">
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Cart;
