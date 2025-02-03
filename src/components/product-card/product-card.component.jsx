import { ProductCardContainer, Footer, Name, Price } from './product-card.style.jsx';
import Button, { BUTTON_TYPES_CLASSES } from '../button/button.component';

import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { addItemToCart } from '../../store/cart/cart.action';
import { cartItemsSelector } from '../../store/cart/cart.selector.js';

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const catItems = useSelector(cartItemsSelector);
  const { name, price, imageUrl } = product ?? {};

  const addProductToCart = () => dispatch(addItemToCart(catItems, product));

  return (
    <ProductCardContainer>
      <img src={imageUrl} alt={`${name}`} />

      <Footer>
        <Name>{name}</Name>
        <Price>{price}</Price>
      </Footer>
      <Button onClick={addProductToCart} buttonType={BUTTON_TYPES_CLASSES.inverted}>
        Add to card
      </Button>
    </ProductCardContainer>
  );
};

export default ProductCard;
