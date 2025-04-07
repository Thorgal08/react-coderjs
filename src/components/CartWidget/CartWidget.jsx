import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../../context/CartContext'; // Importar el contexto

const CartWidget = () => {
  const { handleCount } = useContext(CartContext); // Obtener la función para contar los productos
  const navigate = useNavigate(); // Hook para navegar a la página del carrito

  console.log('CartWidget renderizado, handleCount:', handleCount());

  return (
    <div
      className="position-relative"
      onClick={() => navigate('/cart')} // Navegar al carrito al hacer clic
      style={{ cursor: 'pointer' }}
    >
      <i className="bi bi-cart3 fs-4" style={{ color: 'white' }}></i> {/* Ícono de carrito de Bootstrap */}
      {handleCount() > 0 && (
        <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
          {handleCount()} {/* Mostrar el número total de productos */}
        </span>
      )}
    </div>
  );
};

export default CartWidget;