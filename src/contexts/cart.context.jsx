import { createContext, useReducer } from 'react';
import createAction from '../utils/reducer/reducer.utils';

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
const removeCartItemById = (cartItems = [], productToRemove) => {
  const { id = 0 } = productToRemove ?? {};
  return cartItems.filter((cartItem) => {
    return cartItem.id !== id;
  });
};

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  removeItemFromCart: () => {},
  clearItemFromCart: () => {},
  cartCount: 0,
  totalCount: 0
});

const INITIAL_STATE = {
  isCartOpen: false,
  cartItems: [],
  cartCount: 0,
  totalCount: 0
};

const CART_ACTION_TYPES = {
  SET_CART_ITEMS: 'SET_CART_ITEMS',
  SET_CART_IS_OPEN: 'SET_CART_IS_OPEN'
};

const cartReducer = (state, action) => {
  const { type, payload } = action ?? {};
  switch (type) {
    case CART_ACTION_TYPES.SET_CART_ITEMS:
      return {
        ...state,
        ...payload
      };
    case CART_ACTION_TYPES.SET_CART_IS_OPEN:
      return {
        ...state,
        ...payload
      };

    default:
      throw new Error(`Unhandled action type in cartReducer: ${type}`);
  }
};

export const CartProvider = ({ children }) => {
  const [{ isCartOpen, cartItems, cartCount, totalCount }, dispatch] = useReducer(
    cartReducer,
    INITIAL_STATE
  );

  const updateCartItemsReducer = (newCartItems) => {
    const newCartCount = newCartItems.reduce((total, { quantity }) => {
      return total + quantity;
    }, 0);
    const newTotalCount = newCartItems.reduce((total, { quantity, price }) => {
      return total + price * quantity;
    }, 0);

    dispatch(
      createAction(CART_ACTION_TYPES.SET_CART_ITEMS, {
        cartItems: newCartItems,
        cartCount: newCartCount,
        totalCount: newTotalCount
      })
    );
  };
  const updateCartOpenStatus = (isOpen) => {
    dispatch(
      createAction(CART_ACTION_TYPES.SET_CART_IS_OPEN, {
        isCartOpen: isOpen
      })
    );
  };

  const addItemToCart = (productToAdd = {}) => {
    updateCartItemsReducer(addCartItem(cartItems, productToAdd));
  };
  const removeItemFromCart = (productToRemove = {}) => {
    updateCartItemsReducer(removeCartItem(cartItems, productToRemove));
  };
  const clearItemFromCart = (productToRemove = {}) => {
    updateCartItemsReducer(removeCartItemById(cartItems, productToRemove));
  };
  const setIsCartOpen = (isOpen = false) => {
    updateCartOpenStatus(isOpen);
  };

  const value = {
    isCartOpen,
    setIsCartOpen,
    addItemToCart,
    removeItemFromCart,
    cartItems,
    cartCount,
    clearItemFromCart,
    totalCount
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
