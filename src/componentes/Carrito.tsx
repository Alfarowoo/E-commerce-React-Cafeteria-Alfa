import React from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Card, Button, Alert } from 'react-bootstrap';
import { useCarrito } from '../contexto/CarritoContexto';
import ItemCarrito from './ItemCarrito';
import { ShoppingBag, ArrowRight, RefreshCw } from 'lucide-react';
import '../estilos/Carrito.css';

// Componente que muestra el carrito de compras
const Carrito: React.FC = () => {
  const { carrito, limpiarCarrito, obtenerTotal } = useCarrito();
  
  // Verificar si el carrito está vacío
  const carritoVacio = carrito.length === 0;
  
  // Calcular el total del carrito
  const totalCarrito = obtenerTotal();
  
  // Función para limpiar el carrito
  const handleLimpiarCarrito = () => {
    if (window.confirm('¿Estás seguro de que deseas vaciar el carrito?')) {
      limpiarCarrito();
    }
  };

  return (
    <div className="carrito-container">
      <h2 className="titulo-seccion mb-4">
        <ShoppingBag className="me-2" size={28} />
        Tu Carrito de Compras
      </h2>
      
      {carritoVacio ? (
        <div className="carrito-vacio text-center py-5">
          <Alert variant="info">
            <p className="mb-3">Tu carrito está vacío.</p>
            <Link to="/productos" className="btn btn-primary">
              Ver Productos
            </Link>
          </Alert>
        </div>
      ) : (
        <Row>
          <Col lg={8} className="mb-4">
            <Card className="carrito-items">
              <Card.Header className="bg-light">
                <Row className="d-none d-sm-flex">
                  <Col sm={2}><strong>Producto</strong></Col>
                  <Col sm={4}><strong>Descripción</strong></Col>
                  <Col sm={3}><strong>Cantidad</strong></Col>
                  <Col sm={2} className="text-end"><strong>Precio</strong></Col>
                  <Col sm={1}></Col>
                </Row>
              </Card.Header>
              
              <Card.Body>
                {carrito.map((item) => (
                  <div key={item.producto.id} className="mb-3 pb-3 border-bottom">
                    <ItemCarrito 
                      producto={item.producto} 
                      cantidad={item.cantidad} 
                    />
                  </div>
                ))}
                
                <div className="d-flex justify-content-end mt-3">
                  <Button 
                    variant="outline-danger" 
                    className="btn-vaciar-carrito"
                    onClick={handleLimpiarCarrito}
                  >
                    <RefreshCw size={16} className="me-2" />
                    Vaciar Carrito
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
          
          <Col lg={4}>
            <Card className="resumen-carrito">
              <Card.Header className="bg-light">
                <h5 className="mb-0">Resumen de Compra</h5>
              </Card.Header>
              
              <Card.Body>
                <div className="d-flex justify-content-between mb-2">
                  <span>Subtotal:</span>
                  <span className="fw-bold">${totalCarrito.toFixed(2)}</span>
                </div>
                
                <div className="d-flex justify-content-between mb-2">
                  <span>Envío:</span>
                  <span className="fw-bold">Gratis</span>
                </div>
                
                <hr />
                
                <div className="d-flex justify-content-between mb-4">
                  <span className="fw-bold">Total:</span>
                  <span className="total-precio">${totalCarrito.toFixed(2)}</span>
                </div>
                
                <Link 
                  to="/checkout" 
                  className="btn btn-primary w-100 btn-finalizar-compra"
                >
                  Finalizar Compra
                  <ArrowRight size={18} className="ms-2" />
                </Link>
                
                <div className="mt-3">
                  <Link to="/productos" className="btn btn-outline-secondary w-100">
                    Continuar Comprando
                  </Link>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}
    </div>
  );
};

export default Carrito;