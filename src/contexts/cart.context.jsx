import { createContext, useState, useEffect, useReducer } from 'react';

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

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    const newCartCount = cartItems.reduce((total, { quantity }) => {
      return total + quantity;
    }, 0);
    const newTotalCount = cartItems.reduce((total, { quantity, price }) => {
      return total + price * quantity;
    }, 0);

    setCartCount(newCartCount);
    setTotalCount(newTotalCount);
  }, [cartItems]);

  const addItemToCart = (productToAdd = {}) => {
    setCartItems(addCartItem(cartItems, productToAdd));
  };
  const removeItemFromCart = (productToRemove = {}) => {
    setCartItems(removeCartItem(cartItems, productToRemove));
  };
  const clearItemFromCart = (productToRemove = {}) => {
    setCartItems(removeCartItemById(cartItems, productToRemove));
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
