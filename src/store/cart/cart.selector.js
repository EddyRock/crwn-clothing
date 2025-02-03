import { createSelector } from 'reselect';

const selectCartItemsReducer = (state) => {
  return state.cart.cartItems;
};
const selectIsOpenCartReducer = (state) => {
  return state.cart.isCartOpen;
};

export const cartCountSelector = createSelector([selectCartItemsReducer], (cartItems) => {
  return cartItems.reduce((total, { quantity }) => {
    return total + quantity;
  }, 0);
});
export const totalCountSelector = createSelector([selectCartItemsReducer], (cartItems) => {
  return cartItems.reduce((total, { quantity, price }) => {
    return total + price * quantity;
  }, 0);
});
export const isCartOpenSelector = createSelector(
  [selectIsOpenCartReducer],
  (isCartOpen) => isCartOpen
);
export const cartItemsSelector = createSelector([selectCartItemsReducer], (cartItems) => cartItems);
