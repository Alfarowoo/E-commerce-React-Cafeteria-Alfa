import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CarritoProvider } from './contexto/CarritoContexto';
import Layout from './componentes/Layout';
import Inicio from './paginas/Inicio';
import Productos from './paginas/Productos';
import DetalleProducto from './componentes/DetalleProducto';
import Carrito from './componentes/Carrito';
import Checkout from './paginas/Checkout';
import Contacto from './paginas/Contacto';
import './index.css';

// Componente principal de la aplicación
function App() {
  return (
    <CarritoProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Inicio />} />
            <Route path="productos" element={<Productos />} />
            <Route path="producto/:id" element={<DetalleProducto />} />
            <Route path="carrito" element={<Carrito />} />
            <Route path="checkout" element={<Checkout />} />
            <Route path="contacto" element={<Contacto />} />
          </Route>
        </Routes>
      </Router>
    </CarritoProvider>
  );
}

export default App;