import React from 'react';
import { NavLink } from 'react-router-dom';
import CartWidget from '../CartWidget/CartWidget';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Navbar.modules.css';
import logo from '../../assets/draconet-logo2.ico'; // Importa el logo .ico

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        {/* Logo */}
        <NavLink to="/" className="navbar-brand d-flex align-items-center">
          <img src={logo} alt="Logo" className="navbar-logo me-2" />
          Draconet Hardware Shop
        </NavLink>

        {/* Botón de hamburguesa */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Menú desplegable */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav mx-auto d-flex align-items-center">
            {/* Categorías */}
            <li className="nav-item">
              <NavLink to="/" className="nav-link">
                Inicio
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/category/hardware" className="nav-link">
                Hardware
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/category/software" className="nav-link">
                Software
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/cart" className="nav-link">
              <CartWidget />
              </NavLink>
            </li>

            {/* Carrito */}
            <li className="nav-item d-flex align-items-center">
             
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;