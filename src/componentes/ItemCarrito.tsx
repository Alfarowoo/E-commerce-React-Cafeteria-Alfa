import React from 'react';
import { Row, Col, Button, InputGroup, Form } from 'react-bootstrap';
import { useCarrito } from '../contexto/CarritoContexto';
import { Producto } from '../tipos/tipos';
import { Trash2, Minus, Plus } from 'lucide-react';
import '../estilos/ItemCarrito.css';

// Props para el componente ItemCarrito
interface ItemCarritoProps {
  producto: Producto;
  cantidad: number;
}

// Componente que representa un ítem en el carrito
const ItemCarrito: React.FC<ItemCarritoProps> = ({ producto, cantidad }) => {
  const { actualizarCantidad, eliminarDelCarrito } = useCarrito();
  
  // Función para aumentar la cantidad
  const aumentarCantidad = () => {
    actualizarCantidad(producto.id, cantidad + 1);
  };
  
  // Función para disminuir la cantidad
  const disminuirCantidad = () => {
    if (cantidad > 1) {
      actualizarCantidad(producto.id, cantidad - 1);
    }
  };
  
  // Función para eliminar el producto del carrito
  const handleEliminar = () => {
    eliminarDelCarrito(producto.id);
  };
  
  // Función para manejar el cambio directo en el input
  const handleCambioCantidad = (e: React.ChangeEvent<HTMLInputElement>) => {
    const nuevaCantidad = parseInt(e.target.value);
    if (!isNaN(nuevaCantidad) && nuevaCantidad >= 1) {
      actualizarCantidad(producto.id, nuevaCantidad);
    }
  };

  return (
    <div className="item-carrito">
      <Row className="align-items-center">
        <Col xs={3} sm={2} className="imagen-contenedor">
          <img 
            src={producto.imagen} 
            alt={producto.nombre} 
            className="img-fluid rounded item-imagen"
          />
        </Col>
        
        <Col xs={9} sm={4}>
          <h5 className="item-nombre">{producto.nombre}</h5>
          <p className="item-categoria text-muted mb-0">{producto.categoria}</p>
        </Col>
        
        <Col xs={6} sm={3} className="mt-3 mt-sm-0">
          <InputGroup size="sm" className="selector-cantidad-carrito">
            <Button 
              variant="outline-secondary" 
              onClick={disminuirCantidad}
              disabled={cantidad <= 1}
            >
              <Minus size={14} />
            </Button>
            
            <Form.Control
              type="number"
              min="1"
              value={cantidad}
              onChange={handleCambioCantidad}
              className="text-center"
            />
            
            <Button 
              variant="outline-secondary" 
              onClick={aumentarCantidad}
            >
              <Plus size={14} />
            </Button>
          </InputGroup>
        </Col>
        
        <Col xs={4} sm={2} className="text-end mt-3 mt-sm-0">
          <p className="item-precio fw-bold">
            ${(producto.precio * cantidad).toFixed(2)}
          </p>
        </Col>
        
        <Col xs={2} sm={1} className="text-end mt-3 mt-sm-0">
          <Button 
            variant="outline-danger" 
            size="sm" 
            className="btn-eliminar"
            onClick={handleEliminar}
          >
            <Trash2 size={16} />
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default ItemCarrito;