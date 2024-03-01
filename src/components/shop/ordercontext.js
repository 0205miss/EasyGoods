"use client";
import { createContext, useEffect, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(
    localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : []
  );

  const checkshop = (shopid) => {
    console.log(cartItems);
    if (cartItems.length == 0) {
      return true;
    } else {
      if (cartItems[0].shop == shopid) {
        return true;
      } else {
        return false;
      }
    }
  };

  const addToCart = (item,amount) => {
    const isItemInCart = cartItems.find(
      (cartItem) => cartItem.id === item.id && cartItem.memo === item.memo
    );
    if (!checkshop(item.shop)) {
      setCartItems([item]);
    } else if (isItemInCart) {
      setCartItems(
        cartItems.map((cartItem) =>
          cartItem.id === item.id && cartItem.memo === item.memo
            ? { ...cartItem, amount: cartItem.amount + amount }
            : cartItem
        )
      );
    } else {
      setCartItems([...cartItems, item]);
    }
  };

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => parseFloat((total+item.cost * item.amount).toFixed(7)), 0);
  };

  const getCartTotalPrepare = () => {
    return cartItems.reduce((total, item) => total+item.spend * item.amount, 0);
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const removeFromCart = (item, amount) => {
    const isItemInCart = cartItems.find(
      (cartItem) => cartItem.id === item.id && cartItem.memo === item.memo
    );

    if (isItemInCart.amount === 1) {
      setCartItems(
        cartItems.filter(
          (cartItem) => cartItem.id !== item.id || cartItem.memo !== item.memo
        )
      );
    } else {
      setCartItems(
        cartItems.map((cartItem) =>
          cartItem.id === item.id && cartItem.memo === item.memo
            ? { ...cartItem, amount: cartItem.amount - amount }
            : cartItem
        )
      );
    }
  };

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    const cartItems = localStorage.getItem("cartItems");
    if (cartItems) {
      setCartItems(JSON.parse(cartItems));
    }
    console.log(cartItems)
  }, []);

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, clearCart, checkshop,getCartTotal,getCartTotalPrepare }}
    >
      {children}      
    </CartContext.Provider>
  );
};
