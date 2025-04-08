import React, { useContext, useState } from 'react';
import { CartContext } from '../../context/CartContext'; // Importar el contexto
import { collection, addDoc } from 'firebase/firestore'; // Importar Firestore
import db from '../../firebaseConfig'; // Configuración de Firebase
import './Cart.modules.css'; // Importar estilos personalizados si es necesario

const Cart = () => {
  const { cart, handleRemove, handleUpdateQuantity, handleEmptyCart } = useContext(CartContext); // Obtener las funciones del contexto
  const [buyer, setBuyer] = useState({
    name: '',
    email: '',
    phone: '',
  }); // Estado para los datos del comprador
  const [orderId, setOrderId] = useState(null); // Estado para almacenar el ID de la orden
  const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0); // Calcular el total

  // Manejar cambios en el formulario
  const handleInputChange = (e) => {
    setBuyer({ ...buyer, [e.target.name]: e.target.value });
  };

  // Confirmar la compra y generar el ID de la orden
  const handleConfirmPurchase = async () => {
    // Validar que los datos del comprador estén completos
    if (!buyer.name || !buyer.email || !buyer.phone) {
      alert('Por favor, completa todos los campos del formulario.');
      return;
    }

    // Validar que el carrito no esté vacío
    if (cart.length === 0) {
      alert('El carrito está vacío. Agrega productos antes de confirmar la compra.');
      return;
    }

    // Construir el objeto de la orden
    const order = {
      buyer,
      items: cart.map((item) => ({
        id: item.id,
        title: item.title,
        price: item.price,
        quantity: item.quantity,
      })),
      total: totalPrice,
      date: new Date().toISOString(),
    };

    try {
      // Enviar la orden a Firebase
      const docRef = await addDoc(collection(db, 'orders'), order);
      setOrderId(docRef.id); // Almacenar el ID de la orden
      handleEmptyCart(); // Vaciar el carrito después de confirmar la compra
      alert(`¡Compra confirmada! Tu ID de orden es: ${docRef.id}`);
    } catch (error) {
      console.error('Error al confirmar la compra:', error);
      alert('Hubo un error al confirmar la compra. Por favor, inténtalo de nuevo.');
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Carrito de compras</h2>
      {cart.length === 0 ? (
        <div className="alert alert-warning text-center" role="alert">
          {orderId ? (
            <p>
              ¡Gracias por tu compra! Tu ID de orden es: <strong>{orderId}</strong>
            </p>
          ) : (
            'El carrito está vacío.'
          )}
        </div>
      ) : (
        <>
          <div className="table-responsive">
            <table className="table table-bordered">
              <thead className="table-dark">
                <tr>
                  <th scope="col">Producto</th>
                  <th scope="col">Cantidad</th>
                  <th scope="col">Precio</th>
                  <th scope="col">Subtotal</th>
                  <th scope="col">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item) => (
                  <tr key={item.id}>
                    <td>{item.title}</td>
                    <td>
                      <input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(event) =>
                          handleUpdateQuantity(item.id, parseInt(event.target.value, 10))
                        }
                        className="form-control form-control-sm"
                        style={{ width: '80px' }}
                      />
                    </td>
                    <td>${item.price}</td>
                    <td>${item.price * item.quantity}</td>
                    <td>
                      <button
                        onClick={() => handleRemove(item.id)} // Usar handleRemove para eliminar el producto
                        className="btn btn-danger btn-sm"
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="text-end mt-4">
            <h3>Total: ${totalPrice}</h3>
          </div>
          <div className="mt-4">
            <h4>Datos del comprador</h4>
            <form>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Nombre
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  name="name"
                  value={buyer.name}
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Correo electrónico
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  value={buyer.email}
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="phone" className="form-label">
                  Teléfono
                </label>
                <input
                  type="tel"
                  className="form-control"
                  id="phone"
                  name="phone"
                  value={buyer.phone}
                  onChange={handleInputChange}
                />
              </div>
              <button
                type="button"
                className="btn btn-success"
                onClick={handleConfirmPurchase}
              >
                Confirmar compra
              </button>
            </form>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;