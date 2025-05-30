import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Row, 
  Col, 
  Button, 
  Spinner, 
  Alert, 
  Card, 
  ListGroup, 
  InputGroup, 
  Form 
} from 'react-bootstrap';
import { useCarrito } from '../contexto/CarritoContexto';
import { obtenerProductoPorId } from '../servicios/apiProductos';
import { Producto } from '../tipos/tipos';
import { ShoppingCart, ArrowLeft, Minus, Plus } from 'lucide-react';
import '../estilos/DetalleProducto.css';

// Componente para mostrar el detalle de un producto
const DetalleProducto: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { agregarAlCarrito } = useCarrito();
  
  const [producto, setProducto] = useState<Producto | null>(null);
  const [cantidad, setCantidad] = useState<number>(1);
  const [cargando, setCargando] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Cargar el producto según el ID de la URL
  useEffect(() => {
    const cargarProducto = async () => {
      if (!id) return;
      
      try {
        setCargando(true);
        const data = await obtenerProductoPorId(parseInt(id));
        if (data) {
          setProducto(data);
        } else {
          setError('Producto no encontrado');
        }
      } catch (err) {
        setError('Error al cargar el producto. Por favor, intente más tarde.');
        console.error('Error al cargar el producto:', err);
      } finally {
        setCargando(false);
      }
    };

    cargarProducto();
  }, [id]);

  // Función para aumentar la cantidad
  const aumentarCantidad = () => {
    setCantidad(prev => prev + 1);
  };

  // Función para disminuir la cantidad
  const disminuirCantidad = () => {
    setCantidad(prev => (prev > 1 ? prev - 1 : 1));
  };

  // Función para agregar al carrito
  const handleAgregarAlCarrito = () => {
    if (producto) {
      agregarAlCarrito(producto, cantidad);
      // Mostrar un mensaje de éxito (se podría implementar con un toast)
    }
  };

  // Volver a la página anterior
  const volverAtras = () => {
    navigate(-1);
  };

  // Mostrar spinner durante la carga
  if (cargando) {
    return (
      <div className="text-center py-5">
        <Spinner animation="border\" variant="primary" />
        <p className="mt-3">Cargando producto...</p>
      </div>
    );
  }

  // Mostrar mensaje de error si existe
  if (error || !producto) {
    return (
      <div>
        <Button 
          variant="outline-secondary" 
          className="mb-4"
          onClick={volverAtras}
        >
          <ArrowLeft size={18} className="me-2" />
          Volver
        </Button>
        
        <Alert variant="danger">
          {error || 'Producto no encontrado'}
        </Alert>
      </div>
    );
  }

  return (
    <div className="detalle-producto">
      <Button 
        variant="outline-secondary" 
        className="mb-4 btn-volver"
        onClick={volverAtras}
      >
        <ArrowLeft size={18} className="me-2" />
        Volver
      </Button>
      
      <Row>
        <Col md={6} className="mb-4 mb-md-0">
          <div className="producto-imagen-container">
            <img 
              src={producto.imagen} 
              alt={producto.nombre} 
              className="img-fluid rounded producto-imagen-detalle"
            />
            {producto.destacado && (
              <span className="badge-destacado-detalle">Destacado</span>
            )}
          </div>
        </Col>
        
        <Col md={6}>
          <div className="producto-info">
            <span className="categoria-badge-detalle">{producto.categoria}</span>
            <h2 className="producto-titulo-detalle">{producto.nombre}</h2>
            <p className="producto-precio-detalle">${producto.precio.toFixed(2)}</p>
            
            <div className="producto-disponibilidad mb-3">
              <span className={`disponibilidad-indicador ${producto.disponible ? 'disponible' : 'no-disponible'}`}>
                {producto.disponible ? 'En stock' : 'No disponible'}
              </span>
            </div>
            
            <p className="producto-descripcion-detalle">{producto.descripcion}</p>
            
            <Card className="mb-4 ingredientes-card">
              <Card.Header className="bg-light">
                <h5 className="mb-0">Ingredientes</h5>
              </Card.Header>
              <ListGroup variant="flush">
                {producto.ingredientes.map((ingrediente, index) => (
                  <ListGroup.Item key={index} className="ingrediente-item">
                    {ingrediente}
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Card>
            
            <div className="acciones-producto">
              <div className="selector-cantidad mb-3">
                <label htmlFor="cantidad" className="form-label">Cantidad:</label>
                <InputGroup>
                  <Button 
                    variant="outline-secondary" 
                    onClick={disminuirCantidad}
                    disabled={cantidad <= 1}
                  >
                    <Minus size={16} />
                  </Button>
                  
                  <Form.Control
                    id="cantidad"
                    type="number"
                    min="1"
                    value={cantidad}
                    onChange={(e) => setCantidad(parseInt(e.target.value) || 1)}
                    className="text-center"
                  />
                  
                  <Button 
                    variant="outline-secondary" 
                    onClick={aumentarCantidad}
                  >
                    <Plus size={16} />
                  </Button>
                </InputGroup>
              </div>
              
              <Button 
                variant="primary" 
                size="lg" 
                className="w-100 btn-agregar-carrito-detalle"
                onClick={handleAgregarAlCarrito}
                disabled={!producto.disponible}
              >
                <ShoppingCart size={20} className="me-2" />
                Agregar al Carrito
              </Button>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default DetalleProducto;