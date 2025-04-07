import React, { createContext, useState } from 'react';

// Crear el contexto
export const CartContext = createContext();

// Componente proveedor del contexto
export const CartComponentContext = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Función para contar los productos en el carrito
  const handleCount = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  // Función para agregar un producto al carrito
  const handleAddToCart = (item) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem.id === item.id);
      if (existingItem) {
        return prevCart.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + item.quantity }
            : cartItem
        );
      }
      return [...prevCart, item];
    });
  };

  // Función para eliminar un producto del carrito
  const handleRemove = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  // **Nueva función para actualizar la cantidad de un producto**
  const handleUpdateQuantity = (id, quantity) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id ? { ...item, quantity: quantity } : item
      )
    );
  };

  // Función para vaciar el carrito
  const handleEmptyCart = () => {
    setCart([]); // Vaciar el carrito
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        handleCount,
        handleAddToCart,
        handleRemove,
        handleUpdateQuantity, // Asegúrate de incluir esta función en el contexto
        handleEmptyCart, // Asegúrate de incluir esta función en el contexto
      }}
    >
      {children}
    </CartContext.Provider>
  );
};