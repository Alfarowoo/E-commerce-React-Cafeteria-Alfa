import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexto/AuthContext';
import { CarritoProvider } from './contexto/CarritoContexto';
import ProtectedRoute from './componentes/ProtectedRoute';
import Layout from './componentes/Layout';
import Inicio from './paginas/Inicio';
import Productos from './paginas/Productos';
import DetalleProducto from './componentes/DetalleProducto';
import Carrito from './componentes/Carrito';
import Checkout from './paginas/Checkout';
import Contacto from './paginas/Contacto';
import Login from './paginas/Login';
import './index.css';

function App() {
  return (
    <AuthProvider>
      <CarritoProvider>
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Layout />}>
              <Route index element={<Inicio />} />
              <Route path="productos" element={<Productos />} />
              <Route path="producto/:id" element={<DetalleProducto />} />
              <Route
                path="carrito"
                element={
                  <ProtectedRoute>
                    <Carrito />
                  </ProtectedRoute>
                }
              />
              <Route
                path="checkout"
                element={
                  <ProtectedRoute>
                    <Checkout />
                  </ProtectedRoute>
                }
              />
              <Route path="contacto" element={<Contacto />} />
            </Route>
          </Routes>
        </Router>
      </CarritoProvider>
    </AuthProvider>
  );
}

export default App;