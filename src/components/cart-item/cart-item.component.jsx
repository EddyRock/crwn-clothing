import { CartItemContainer, CartImg, ItemDetails, Name } from './cart-item.style.jsx';

const CartItem = ({ cartItem }) => {
  const { name = '', imageUrl = '', price = 0, quantity = 0 } = cartItem ?? {};

  return (
    <CartItemContainer>
      <CartImg src={imageUrl} alt={name} />
      <ItemDetails>
        <Name>{name}</Name>
        <Name>
          {quantity} * ${price}
        </Name>
      </ItemDetails>
    </CartItemContainer>
  );
};

export default CartItem;
