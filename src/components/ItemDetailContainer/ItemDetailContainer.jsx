import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './ItemDetailContainer.modules.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const ItemDetailContainer = () => {
  const { itemId } = useParams();
  const [producto, setProducto] = useState(null);
  const [cantidad, setCantidad] = useState(1);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducto = async () => {
      try {
        const response = await fetch(`https://fakestoreapi.com/products/${itemId}`);
        if (!response.ok) {
          throw new Error(`Error HTTP! estado: ${response.status}`);
        }
        const data = await response.json();
        setProducto(data);
      } catch (error) {
        setError(error.message);
        console.error('Error al obtener el producto:', error);
      }
    };

    fetchProducto();
  }, [itemId]);

  const handleCantidadChange = (event) => {
    setCantidad(event.target.value);
  };

  const handleAddToCart = () => {
    console.log(`Añadido ${cantidad} de ${producto.title} al carrito`);
    // Aquí puedes añadir la lógica para añadir el producto al carrito
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
          <div className="quantity-input">
            <label htmlFor="cantidad">Cantidad:</label>
            <input
              type="number"
              id="cantidad"
              name="cantidad"
              min="1"
              value={cantidad}
              onChange={handleCantidadChange}
              className="form-control"
              style={{ width: '100px', display: 'inline-block', marginRight: '10px' }}
            />
            <button onClick={handleAddToCart} className="btn btn-primary">Añadir al carrito</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemDetailContainer;