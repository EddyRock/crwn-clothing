import { CartIconContainer, ShoppingIcon, ItemCount } from './cart-icon.style.jsx';

import { useSelector, useDispatch } from 'react-redux';
import { isCartOpenSelector, cartCountSelector } from '../../store/cart/cart.selector';
import { setIsCartOpen } from '../../store/cart/cart.action';

const CartIcon = () => {
  const dispatch = useDispatch();

  const isCartOpen = useSelector(isCartOpenSelector);
  const cartCount = useSelector(cartCountSelector);
  const toggleIsCartOpen = () => {
    dispatch(setIsCartOpen(!isCartOpen));
  };

  return (
    <CartIconContainer onClick={toggleIsCartOpen}>
      <ShoppingIcon />
      <ItemCount>{cartCount}</ItemCount>
    </CartIconContainer>
  );
};

export default CartIcon;
