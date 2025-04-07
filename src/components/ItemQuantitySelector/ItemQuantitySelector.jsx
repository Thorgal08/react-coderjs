import React, { useState } from 'react';

const ItemQuantitySelector = ({ stock = 10, initial = 1, onQuantityChange }) => {
  const [quantity, setQuantity] = useState(() => {
    return initial > stock ? stock : initial; // Validar que el valor inicial no exceda el stock
  });

  const handleIncrease = () => {
    if (quantity < stock) {
      const newQuantity = quantity + 1;
      setQuantity(newQuantity);
      onQuantityChange(newQuantity); // Notificar al componente padre
    }
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      onQuantityChange(newQuantity); // Notificar al componente padre
    }
  };

  return (
    <div className="quantity-selector">
      <button onClick={handleDecrease} disabled={quantity <= 1}>
        -
      </button>
      <span>{quantity}</span>
      <button onClick={handleIncrease} disabled={quantity >= stock}>
        +
      </button>
    </div>
  );
};

export default ItemQuantitySelector;