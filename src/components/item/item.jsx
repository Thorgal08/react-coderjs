/* eslint-disable react/prop-types */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import '..//item/Item.modules.css'; // Importar el CSS

const Item = ({ product }) => {
  const navigate = useNavigate();

  const handleDetailsClick = () => {
    navigate(`/item/${product.id}`); // Navegar a la página de detalles del producto
  };

  return (
    <div className="card h-100">
      <img
        src={product.image}
        alt={product.title}
        className="card-img-top"
        style={{ objectFit: 'cover', height: '150px' }}
      />
      <div className="card-body d-flex flex-column">
        <h5 className="card-title text-center">{product.title}</h5>
        <p className="card-text text-center"><strong>Precio: ${product.price}</strong></p>
        <button
          onClick={handleDetailsClick}
          className="btn btn-primary mt-auto"
        >
          Ver detalles
        </button>
      </div>
    </div>
  );
};

export default Item;