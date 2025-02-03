import {
  CheckoutItemContainer,
  ImageContainer,
  Img,
  SpanBase,
  Quantity,
  Arrow,
  Value,
  RemoveButton
} from './checkout-item.style.jsx';

import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { addItemToCart, removeItemFromCart, clearItemFromCart } from '../../store/cart/cart.action';
import { cartItemsSelector } from '../../store/cart/cart.selector';

const CheckoutItem = ({ cartItem }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector(cartItemsSelector);
  const { name = '', imageUrl = '', price = 0, quantity = 0 } = cartItem ?? {};

  const clearItemHandler = () => {
    return dispatch(clearItemFromCart(cartItems, cartItem));
  };
  const addItemHandler = () => {
    return dispatch(addItemToCart(cartItems, cartItem));
  };
  const removeItemHandler = () => {
    return dispatch(removeItemFromCart(cartItems, cartItem));
  };

  return (
    <CheckoutItemContainer>
      <ImageContainer>
        <Img src={imageUrl} alt={name} />
      </ImageContainer>
      <SpanBase>{name}</SpanBase>
      <Quantity>
        <Arrow onClick={addItemHandler}>&#10094;</Arrow>
        <Value>{quantity}</Value>
        <Arrow onClick={removeItemHandler}>&#10095;</Arrow>
      </Quantity>
      <SpanBase>{price}</SpanBase>
      <RemoveButton onClick={clearItemHandler}>&#10005;</RemoveButton>
    </CheckoutItemContainer>
  );
};

export default CheckoutItem;
