import './App.modules.css'; // Importar estilos personalizados
import Navbar from './components/Navbar/Navbar';
import ItemListContainer from './components/ItemListContainer/ItemListContainer';
import ItemDetailContainer from './components/ItemDetailContainer/ItemDetailContainer';
import Cart from './components/Cart/Cart'; // Importar el componente del carrito
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartComponentContext } from './context/CartContext'; // Importar el contexto


function App() {
  return (
    <CartComponentContext>
      <Router>
        <div className="app-container">
          <Navbar />
          <div className="container mt-4">
            <Routes>
              <Route path="/" element={<ItemListContainer titulo="Bienvenido a Draconet Hardware Shop" />} />
              <Route path="/category/:categoryId" element={<ItemListContainer titulo="Productos de Categoría" />} />
              <Route path="/item/:itemId" element={<ItemDetailContainer />} />
              <Route path="/cart" element={<Cart />} /> {/* Ruta para el carrito */}
            </Routes>
          </div>
          <footer className="footer bg-dark text-white text-center py-3 mt-4">
            <p className="mb-0">© 2025 Draconet Hardware Shop. Todos los derechos reservados.</p>
          </footer>
        </div>
      </Router>
    </CartComponentContext>
  );
}

export default App;