import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useCarrito } from '../contexto/CarritoContexto';
import { Container, Nav, Navbar as BootstrapNavbar } from 'react-bootstrap';
import { Coffee, ShoppingBag } from 'lucide-react';
import '../estilos/Navbar.css';

// Componente de barra de navegación
const Navbar: React.FC = () => {
  const { obtenerCantidadItems } = useCarrito();
  const cantidadItems = obtenerCantidadItems();

  return (
    <BootstrapNavbar bg="white" expand="lg" className="navbar-cafe shadow-sm" sticky="top">
      <Container>
        <Link to="/" className="navbar-brand d-flex align-items-center">
          <Coffee className="logo-icon me-2" size={28} color="#8B4513" />
          <span className="brand-name">Alfa</span>
        </Link>
        
        <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav" />
        <BootstrapNavbar.Collapse id="basic-navbar-nav">
          <Nav className="mx-auto">
            <NavLink to="/" className={({isActive}) => 
              `nav-link ${isActive ? 'active-link' : ''}`
            }>
              Inicio
            </NavLink>
            <NavLink to="/productos" className={({isActive}) => 
              `nav-link ${isActive ? 'active-link' : ''}`
            }>
              Productos
            </NavLink>
            <NavLink to="/contacto" className={({isActive}) => 
              `nav-link ${isActive ? 'active-link' : ''}`
            }>
              Contacto
            </NavLink>
          </Nav>
          
          <Link to="/carrito" className="carrito-icon position-relative ms-2">
            <ShoppingBag size={24} color="#8B4513" />
            {cantidadItems > 0 && (
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                {cantidadItems}
                <span className="visually-hidden">productos en el carrito</span>
              </span>
            )}
          </Link>
        </BootstrapNavbar.Collapse>
      </Container>
    </BootstrapNavbar>
  );
};

export default Navbar;