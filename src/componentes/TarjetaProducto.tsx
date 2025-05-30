import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Button } from 'react-bootstrap';
import { useCarrito } from '../contexto/CarritoContexto';
import { Producto } from '../tipos/tipos';
import { ShoppingCart, Plus } from 'lucide-react';
import '../estilos/TarjetaProducto.css';

// Props para el componente TarjetaProducto
interface TarjetaProductoProps {
  producto: Producto;
}

// Componente que muestra un producto individual en forma de tarjeta
const TarjetaProducto: React.FC<TarjetaProductoProps> = ({ producto }) => {
  const { agregarAlCarrito } = useCarrito();
  
  // Función para manejar el clic en agregar al carrito
  const handleAgregarAlCarrito = (e: React.MouseEvent) => {
    e.preventDefault(); // Evitar navegación
    agregarAlCarrito(producto, 1);
  };

  return (
    <Card className="producto-card h-100 shadow-sm">
      <div className="imagen-contenedor">
        <Card.Img 
          variant="top" 
          src={producto.imagen} 
          alt={producto.nombre} 
          className="producto-imagen"
        />
        {producto.destacado && (
          <span className="badge-destacado">Destacado</span>
        )}
      </div>
      
      <Card.Body className="d-flex flex-column">
        <span className="categoria-badge">{producto.categoria}</span>
        <Card.Title className="producto-titulo">{producto.nombre}</Card.Title>
        
        <Card.Text className="producto-descripcion text-muted mb-3">
          {producto.descripcion.length > 80 
            ? `${producto.descripcion.substring(0, 80)}...` 
            : producto.descripcion}
        </Card.Text>
        
        <div className="mt-auto d-flex justify-content-between align-items-center">
          <span className="producto-precio">${producto.precio.toFixed(2)}</span>
          
          <div className="botones-accion">
            <Button 
              variant="outline-primary" 
              className="btn-agregar-carrito me-2"
              onClick={handleAgregarAlCarrito}
            >
              <ShoppingCart size={18} />
            </Button>
            
            <Link 
              to={`/producto/${producto.id}`} 
              className="btn btn-primary btn-ver-detalles"
            >
              <Plus size={18} className="me-1" />
              Detalles
            </Link>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default TarjetaProducto;