import './App.css';
import Navbar from './components/Navbar/Navbar';
import ItemListContainer from './components/ItemListContainer/ItemListContainer';
import ItemDetailContainer from './components/ItemDetailContainer/ItemDetailContainer';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// rutas y componentes
// import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<ItemListContainer titulo='Bienvenido a Draconet Hardware Shop' />} />
        <Route path="/category/:categoryId" element={<ItemListContainer titulo='Productos de Categoría' />} />
        <Route path="/item/:itemId" element={<ItemDetailContainer />} />
      </Routes>
    </Router>
  );
}

export default App;