import { CartDropdownContainer, CartItems, EmptyMessage } from './cart-dropdown.style.jsx';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

import { cartItemsSelector } from '../../store/cart/cart.selector';

import CartItem from '../cart-item/cart-item.component';
import Button from '../button/button.component.jsx';

const CartDropdown = () => {
  const cartItems = useSelector(cartItemsSelector);
  const navigate = useNavigate();

  const goToCheckoutHandler = () => {
    navigate('/checkout');
  };

  return (
    <CartDropdownContainer>
      <CartItems>
        {cartItems.length ? (
          cartItems.map((item) => {
            return <CartItem cartItem={item} key={item.id} />;
          })
        ) : (
          <EmptyMessage>Your cart is empty!</EmptyMessage>
        )}
      </CartItems>
      <Button onClick={goToCheckoutHandler}>CHECKOUT</Button>
    </CartDropdownContainer>
  );
};
export default CartDropdown;
