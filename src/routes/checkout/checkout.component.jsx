import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';

import { CheckoutContainer, CheckoutHeader, HeaderBlock, Total } from './checkout.style.jsx';

import CheckoutItem from '../../components/checkout-item/checkout-item.components';

const Checkout = () => {
  const { cartItems, totalCount } = useContext(CartContext);

  return (
    <CheckoutContainer>
      <CheckoutHeader>
        <HeaderBlock>
          <span>Product</span>
        </HeaderBlock>
        <HeaderBlock>
          <span>Description</span>
        </HeaderBlock>
        <HeaderBlock>
          <span>Quantity</span>
        </HeaderBlock>
        <HeaderBlock>
          <span>Price</span>
        </HeaderBlock>
        <HeaderBlock>
          <span>Remove</span>
        </HeaderBlock>
      </CheckoutHeader>
      {cartItems.map((cartItem) => {
        return <CheckoutItem key={cartItem.id} cartItem={cartItem} />;
      })}
      <Total>Total: ${totalCount}</Total>
    </CheckoutContainer>
  );
};

export default Checkout;
