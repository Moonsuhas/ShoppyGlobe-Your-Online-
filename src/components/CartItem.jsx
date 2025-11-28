import { useDispatch } from 'react-redux'
import { removeFromCart, updateQuantity } from '../store/cartSlice'
import { Trash2, Plus, Minus } from 'lucide-react'
import './CartItem.css'

/**
 * CartItem component - represents a single item in the cart
 * @param {Object} props - Component props
 * @param {Object} props.item - Cart item object containing id, title, price, quantity, thumbnail
 */
function CartItem({ item }) {
  const dispatch = useDispatch()

  const handleRemove = () => {
    dispatch(removeFromCart(item.id))
  }

  const handleIncrement = () => {
    dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }))
  }

  const handleDecrement = () => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }))
    }
  }

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value)
    if (value >= 1) {
      dispatch(updateQuantity({ id: item.id, quantity: value }))
    }
  }

  return (
    <div className="cart-item">
      <img src={item.thumbnail} alt={item.title} className="cart-item-image" />
      
      <div className="cart-item-info">
        <h3>{item.title}</h3>
        <p className="cart-item-price">${item.price.toFixed(2)}</p>
      </div>

      <div className="cart-item-quantity">
        <button 
          onClick={handleDecrement}
          className="quantity-btn"
          disabled={item.quantity <= 1}
        >
          <Minus size={16} />
        </button>
        <input
          type="number"
          min="1"
          value={item.quantity}
          onChange={handleQuantityChange}
          className="quantity-input"
        />
        <button 
          onClick={handleIncrement}
          className="quantity-btn"
        >
          <Plus size={16} />
        </button>
      </div>

      <div className="cart-item-total">
        <p>${(item.price * item.quantity).toFixed(2)}</p>
      </div>

      <button 
        onClick={handleRemove}
        className="remove-btn"
        aria-label="Remove item"
      >
        <Trash2 size={20} />
      </button>
    </div>
  )
}

export default CartItem
