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
import { useContext } from 'react';

import { CartContext } from '../../contexts/cart.context';

const CheckoutItem = ({ cartItem }) => {
  const { name = '', imageUrl = '', price = 0, quantity = 0 } = cartItem ?? {};

  const { clearItemFromCart, addItemToCart, removeItemFromCart } = useContext(CartContext);

  const clearItemHandler = () => {
    return clearItemFromCart(cartItem);
  };
  const addItemHandler = () => {
    return addItemToCart(cartItem);
  };
  const removeItemHandler = () => {
    return removeItemFromCart(cartItem);
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
