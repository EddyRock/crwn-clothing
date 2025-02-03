import createAction from '../../utils/reducer/reducer.utils';
import { CART_ACTION_TYPES } from './cart.types';

const updateCartItemsReducer = (newCartItems) => {
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};

const addCartItem = (cartItems = [], productToAdd = {}) => {
  const { id: productToAddId = 0 } = productToAdd ?? {};
  const isCartItemsContainsProduct = Boolean(
    cartItems.find(({ id }) => {
      return productToAddId === id;
    })
  );

  if (isCartItemsContainsProduct) {
    return cartItems.map((cartItem) => {
      if (cartItem.id === productToAdd.id) {
        return { ...cartItem, quantity: cartItem.quantity + 1 };
      } else {
        return cartItem;
      }
    });
  }
  return [...cartItems, { ...productToAdd, quantity: 1 }];
};
const removeCartItem = (cartItems = [], productToRemove = {}) => {
  const { id: productToRemoveId = 0 } = productToRemove ?? {};

  const result = [];
  cartItems.forEach((cartItem) => {
    if (cartItem.id === productToRemoveId) {
      if (cartItem.quantity - 1 !== 0) {
        result.push({ ...cartItem, quantity: cartItem.quantity - 1 });
      }
    } else {
      result.push(cartItem);
    }
  });

  return result;
};
const clearCartItem = (cartItems = [], productToRemove) => {
  const { id = 0 } = productToRemove ?? {};
  return cartItems.filter((cartItem) => {
    return cartItem.id !== id;
  });
};

export const addItemToCart = (cartItems, productToAdd = {}) => {
  return updateCartItemsReducer(addCartItem(cartItems, productToAdd));
};
export const removeItemFromCart = (cartItems, productToRemove = {}) => {
  return updateCartItemsReducer(removeCartItem(cartItems, productToRemove));
};
export const clearItemFromCart = (cartItems, productToRemove = {}) => {
  return updateCartItemsReducer(clearCartItem(cartItems, productToRemove));
};
export const setIsCartOpen = (boolean) => {
  return createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, boolean);
};
