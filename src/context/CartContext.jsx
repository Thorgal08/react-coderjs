import React, { createContext, useState } from 'react';
import { doc, updateDoc, getDoc } from 'firebase/firestore'; // Importar funciones de Firebase
import db from '../firebaseConfig'; // Importar la configuración de Firebase

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

  // Función para eliminar un producto del carrito y devolver el stock a Firebase
  const handleRemove = async (id) => {
    const itemToRemove = cart.find((item) => item.id === id);
    if (itemToRemove) {
      const productRef = doc(db, 'items', id);

      try {
        // Obtener el stock actual desde Firebase
        const productSnap = await getDoc(productRef);
        if (productSnap.exists()) {
          const currentStock = productSnap.data().stock;

          // Actualizar el stock en Firebase
          await updateDoc(productRef, {
            stock: currentStock + itemToRemove.quantity, // Sumar la cantidad eliminada al stock actual
          });
          console.log(`Stock actualizado para el producto ${id}: ${currentStock + itemToRemove.quantity}`);
        } else {
          console.error('El producto no existe en la base de datos.');
        }
      } catch (error) {
        console.error('Error al devolver el stock:', error);
      }

      // Eliminar el producto del carrito
      setCart((prevCart) => prevCart.filter((item) => item.id !== id));
    }
  };

  // Función para actualizar la cantidad de un producto en el carrito
  const handleUpdateQuantity = (id, quantity) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id ? { ...item, quantity: quantity } : item
      )
    );
  };

  // Función para vaciar el carrito y devolver el stock de todos los productos
  const handleEmptyCart = async () => {
    try {
      for (const item of cart) {
        const productRef = doc(db, 'items', item.id);
        await updateDoc(productRef, {
          stock: item.stock + item.quantity, // Devolver el stock de cada producto
        });
      }
      console.log('Stock devuelto para todos los productos del carrito');
    } catch (error) {
      console.error('Error al devolver el stock al vaciar el carrito:', error);
    }

    setCart([]); // Vaciar el carrito
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        handleCount,
        handleAddToCart,
        handleRemove,
        handleUpdateQuantity,
        handleEmptyCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};