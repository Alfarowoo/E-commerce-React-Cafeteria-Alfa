import React from 'react';
import { Outlet, useLocation, Navigate } from 'react-router-dom';
import { useAuth } from '../contexto/AuthContext';
import Navbar from './Navbar';
import Footer from './Footer';
import { Container } from 'react-bootstrap';
import '../estilos/Layout.css';

const Layout = () => {
  const { user } = useAuth();
  const location = useLocation();

  // Lista de rutas que requieren autenticación
  const rutasProtegidas = ['/carrito', '/checkout'];

  // Verificar si la ruta actual requiere autenticación
  const requiereAuth = rutasProtegidas.some(ruta => 
    location.pathname.startsWith(ruta)
  );

  // Redirigir a login si la ruta requiere autenticación y el usuario no está autenticado
  if (requiereAuth && !user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />
      <main className="flex-grow-1 py-4">
        <Container>
          <Outlet />
        </Container>
      </main>
      <Footer />
    </div>
  );
};

export default Layout;