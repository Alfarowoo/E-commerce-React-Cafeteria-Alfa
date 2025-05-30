import React from 'react';
import ListaProductos from '../componentes/ListaProductos';
import '../estilos/Productos.css';

// Componente de la página de productos
const Productos: React.FC = () => {
  return (
    <div className="pagina-productos">
      <div className="banner-productos mb-4">
        <div className="banner-contenido">
          <h1 className="banner-titulo">Nuestros Productos</h1>
          <p className="banner-texto">
            Descubre nuestra selección de cafés, pasteles y platillos preparados con los mejores ingredientes.
          </p>
        </div>
      </div>
      
      <ListaProductos />
    </div>
  );
};

export default Productos;