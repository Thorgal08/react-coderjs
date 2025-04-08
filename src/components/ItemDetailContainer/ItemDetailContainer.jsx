import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc, updateDoc } from 'firebase/firestore'; // Importar funciones de Firestore
import db from '../../firebaseConfig'; // Importar la configuración de Firebase
import { CartContext } from '../../context/CartContext'; // Importar el contexto
import './ItemDetailContainer.modules.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const ItemDetailContainer = () => {
  const { itemId } = useParams(); // Obtener el ID del producto desde la URL
  const { handleAddToCart } = useContext(CartContext); // Obtener la función para añadir al carrito
  const [producto, setProducto] = useState(null);
  const [cantidad, setCantidad] = useState(1);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducto = async () => {
      try {
        // Obtener el documento del producto desde Firestore
        const docRef = doc(db, 'items', itemId); // Referencia al documento en la colección 'items'
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setProducto({ id: docSnap.id, ...docSnap.data() }); // Guardar los datos del producto
        } else {
          throw new Error('El producto no existe en la base de datos.');
        }
      } catch (error) {
        setError(error.message);
        console.error('Error al obtener el producto:', error);
      }
    };

    fetchProducto();
  }, [itemId]);

  const handleCantidadChange = (event) => {
    const value = parseInt(event.target.value, 10);
    if (value > 0) {
      setCantidad(value);
    }
  };

  const handleAddToCartClick = async () => {
    if (cantidad > 0 && cantidad <= producto.stock) {
      const item = { ...producto, quantity: cantidad }; // Crear el objeto del producto con la cantidad seleccionada
      handleAddToCart(item); // Añadir el producto al carrito

      // Reducir el stock en Firebase
      const newStock = producto.stock - cantidad;
      const productRef = doc(db, 'items', producto.id); // Referencia al documento del producto
      try {
        await updateDoc(productRef, { stock: newStock }); // Actualizar el stock en Firebase
        setProducto((prev) => ({ ...prev, stock: newStock })); // Actualizar el estado local del producto
        console.log(`Añadido ${cantidad} de ${producto.title} al carrito. Nuevo stock: ${newStock}`);
      } catch (error) {
        console.error('Error al actualizar el stock:', error);
        alert('Hubo un error al actualizar el stock. Por favor, inténtalo de nuevo.');
      }
    } else {
      alert('Por favor, selecciona una cantidad válida.');
    }
  };

  if (error) {
    return <div className="container"><h1>Error: {error}</h1></div>;
  }

  if (!producto) {
    return <div className="container"><h1>Cargando...</h1></div>;
  }

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-6 d-flex justify-content-center align-items-center">
          <img src={producto.image} alt={producto.title} className="img-fluid product-image" />
        </div>
        <div className="col-md-6">
          <h1>{producto.title}</h1>
          <p>{producto.description}</p>
          <p><strong>Precio: ${producto.price}</strong></p>
          <p><strong>Stock disponible: {producto.stock}</strong></p> {/* Mostrar el stock disponible */}
          {producto.stock > 0 ? ( // Mostrar el selector de cantidad y botón si hay stock
            <div className="quantity-input">
              <label htmlFor="cantidad">Cantidad:</label>
              <input
                type="number"
                id="cantidad"
                name="cantidad"
                min="1"
                max={producto.stock} // Limitar la cantidad máxima al stock disponible
                value={cantidad}
                onChange={handleCantidadChange}
                className="form-control"
                style={{ width: '100px', display: 'inline-block', marginRight: '10px' }}
              />
              <button onClick={handleAddToCartClick} className="btn btn-primary">Añadir al carrito</button>
            </div>
          ) : (
            <p className="text-danger"><strong>No hay stock disponible</strong></p> // Mostrar mensaje si no hay stock
          )}
        </div>
      </div>
    </div>
  );
};

export default ItemDetailContainer;