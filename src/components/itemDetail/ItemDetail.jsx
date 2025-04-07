import React, { useContext, useState } from 'react';
import ItemQuantitySelector from './ItemQuantitySelector';
import { CartContext } from '../../context/CartContext'; // Importar el contexto

const ItemDetail = ({ product }) => {
  const { handleAddToCart } = useContext(CartContext); // Obtener la función para agregar al carrito
  const [quantity, setQuantity] = useState(); // Estado para manejar la cantidad seleccionada

  const handleAdd = () => {
    if (quantity > product.stock) {
      alert('La cantidad seleccionada excede el stock disponible.');
      return;
    }
    const item = { ...product, quantity }; // Crear un objeto con el producto y la cantidad
    handleAddToCart(item); // Agregar el producto al carrito
    alert(`${quantity} unidades de ${product.title} añadidas al carrito.`);
  };

  return (
    <div className="item-detail">
      <h2>{product.title}</h2>
      <img src={product.image} alt={product.title} />
      <p>{product.description}</p>
      <p>Precio: ${product.price}</p>
      <ItemQuantitySelector
        stock={product.stock}
        onQuantityChange={(newQuantity) => setQuantity(newQuantity)} // Actualizar la cantidad seleccionada
      />
      <button onClick={handleAdd}>Añadir al carrito</button>
    </div>
  );
};

export default ItemDetail;