import React, { useState, useEffect } from 'react';
import { Row, Col, Spinner, Alert } from 'react-bootstrap';
import TarjetaProducto from './TarjetaProducto';
import FiltroCategoria from './FiltroCategoria';
import { obtenerProductos } from '../servicios/apiProductos';
import { Producto, Categoria } from '../tipos/tipos';
import '../estilos/ListaProductos.css';

// Componente que muestra la lista de productos con filtros
const ListaProductos: React.FC = () => {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [productosFiltrados, setProductosFiltrados] = useState<Producto[]>([]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState<Categoria | null>(null);
  const [cargando, setCargando] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Cargar productos al montar el componente
  useEffect(() => {
    const cargarProductos = async () => {
      try {
        setCargando(true);
        const data = await obtenerProductos();
        setProductos(data);
        setProductosFiltrados(data);
        setCargando(false);
      } catch (err) {
        setCargando(false);
        setError('Error al cargar los productos. Por favor, intente más tarde.');
        console.error('Error al cargar productos:', err);
      }
    };

    cargarProductos();
  }, []);

  // Filtrar productos cuando cambia la categoría seleccionada
  useEffect(() => {
    if (categoriaSeleccionada) {
      setProductosFiltrados(productos.filter(producto => 
        producto.categoria === categoriaSeleccionada
      ));
    } else {
      setProductosFiltrados(productos);
    }
  }, [categoriaSeleccionada, productos]);

  // Manejar el cambio de categoría
  const handleCambioCategoria = (categoria: Categoria | null) => {
    setCategoriaSeleccionada(categoria);
  };

  // Mostrar spinner durante la carga
  if (cargando) {
    return (
      <div className="text-center py-5">
        <Spinner animation="border\" variant="primary" />
        <p className="mt-3">Cargando productos...</p>
      </div>
    );
  }

  // Mostrar mensaje de error si existe
  if (error) {
    return (
      <Alert variant="danger" className="my-4">
        {error}
      </Alert>
    );
  }

  return (
    <div className="lista-productos">
      <h2 className="titulo-seccion mb-4">Nuestros Productos</h2>
      
      <FiltroCategoria 
        categoriaSeleccionada={categoriaSeleccionada} 
        onCambioCategoria={handleCambioCategoria}
      />
      
      {productosFiltrados.length === 0 ? (
        <Alert variant="info\" className="text-center my-4">
          No se encontraron productos en esta categoría.
        </Alert>
      ) : (
        <Row className="g-4 mt-2">
          {productosFiltrados.map(producto => (
            <Col key={producto.id} xs={12} sm={6} lg={4} xl={3}>
              <TarjetaProducto producto={producto} />
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
};

export default ListaProductos;