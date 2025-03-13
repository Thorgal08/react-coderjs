import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import './ItemListContainer.modules.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const ItemListContainer = ({ titulo }) => {
  const { categoryId } = useParams();
  const [productos, setProductos] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        let url = 'https://fakestoreapi.com/products';
        if (categoryId) {
          url = `https://fakestoreapi.com/products/category/${categoryId}`;
        }
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Error HTTP! estado: ${response.status}`);
        }
        const data = await response.json();
        if (Array.isArray(data)) {
          setProductos(data);
        } else {
          throw new Error('Los datos no son un array');
        }
      } catch (error) {
        setError(error.message);
        console.error('Error al obtener los productos:', error);
      }
    };

    fetchProductos();
  }, [categoryId]);

  if (error) {
    return <div className="container"><h1>Error: {error}</h1></div>;
  }

  return (
    <div className="container mt-4">
      <h1>{titulo}</h1>
      <div className="row">
        {productos.length > 0 ? (
          productos.map((producto) => (
            <div key={producto.id} className="col-md-3 mb-4">
              <div className="card h-100">
                <img src={producto.image} alt={producto.title} className="card-img-top product-image" />
                <div className="card-body">
                  <h5 className="card-title">{producto.title}</h5>
                  <p className="card-text"><strong>Precio: ${producto.price}</strong></p>
                  <Link to={`/item/${producto.id}`} className="btn btn-primary">Descripción del producto</Link>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No hay productos disponibles</p>
        )}
      </div>
    </div>
  );
};

export default ItemListContainer;