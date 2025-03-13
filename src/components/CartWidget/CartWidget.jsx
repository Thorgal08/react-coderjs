import { FaShoppingCart } from 'react-icons/fa';
import './CartWidget.modules.css';

const CartWidget = () => {
  return (
    <div className="cart-widget">
      <FaShoppingCart className="cart-icon" />
      <span className="cart-badge">1</span>
    </div>
  );
}

export default CartWidget;