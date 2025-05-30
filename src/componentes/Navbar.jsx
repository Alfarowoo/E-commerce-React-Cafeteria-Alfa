import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useCarrito } from '../contexto/CarritoContexto';
import { useAuth } from '../contexto/AuthContext';
import { Container, Nav, Navbar as BootstrapNavbar, Button } from 'react-bootstrap';
import { Coffee, ShoppingBag, LogOut, User } from 'lucide-react';
import '../estilos/Navbar.css';

const Navbar = () => {
  const { obtenerCantidadItems } = useCarrito();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const cantidadItems = obtenerCantidadItems();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

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
          
          <div className="d-flex align-items-center">
            {user ? (
              <>
                <div className="me-3 d-flex align-items-center">
                  <User size={18} className="me-2" />
                  <span className="usuario-nombre">{user.username}</span>
                </div>
                <Link to="/carrito" className="carrito-icon position-relative me-3">
                  <ShoppingBag size={24} color="#8B4513" />
                  {cantidadItems > 0 && (
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                      {cantidadItems}
                      <span className="visually-hidden">productos en el carrito</span>
                    </span>
                  )}
                </Link>
                <Button 
                  variant="outline-danger" 
                  size="sm" 
                  className="btn-logout"
                  onClick={handleLogout}
                >
                  <LogOut size={18} className="me-1" />
                  Salir
                </Button>
              </>
            ) : (
              <Link to="/login" className="btn btn-primary btn-login">
                <User size={18} className="me-1" />
                Iniciar Sesión
              </Link>
            )}
          </div>
        </BootstrapNavbar.Collapse>
      </Container>
    </BootstrapNavbar>
  );
};

export default Navbar;