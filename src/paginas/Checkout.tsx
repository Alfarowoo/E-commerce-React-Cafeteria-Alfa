import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Row, 
  Col, 
  Form, 
  Button, 
  Card, 
  ListGroup, 
  Alert 
} from 'react-bootstrap';
import { useCarrito } from '../contexto/CarritoContexto';
import { CreditCard, CheckCircle, ArrowLeft } from 'lucide-react';
import '../estilos/Checkout.css';

// Componente de la página de checkout
const Checkout: React.FC = () => {
  const navigate = useNavigate();
  const { carrito, obtenerTotal, limpiarCarrito } = useCarrito();
  
  const [validated, setValidated] = useState<boolean>(false);
  const [ordenCompletada, setOrdenCompletada] = useState<boolean>(false);
  const [formaPago, setFormaPago] = useState<string>('tarjeta');
  
  // Estado para los datos del formulario
  const [formulario, setFormulario] = useState({
    nombre: '',
    apellido: '',
    email: '',
    direccion: '',
    ciudad: '',
    codigoPostal: '',
    numeroTarjeta: '',
    fechaExpiracion: '',
    cvv: ''
  });
  
  // Verificar si el carrito está vacío
  const carritoVacio = carrito.length === 0;
  
  // Calcular el total del carrito
  const totalCarrito = obtenerTotal();
  
  // Manejar cambios en el formulario
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormulario(prevState => ({
      ...prevState,
      [name]: value
    }));
  };
  
  // Manejar cambio en forma de pago
  const handleFormaPagoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormaPago(e.target.value);
  };
  
  // Manejar envío del formulario
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    
    if (form.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true);
      return;
    }
    
    // Simulación de procesamiento de orden
    setTimeout(() => {
      setOrdenCompletada(true);
      limpiarCarrito();
      window.scrollTo(0, 0);
    }, 1500);
  };
  
  // Volver a la página anterior
  const volverAlCarrito = () => {
    navigate('/carrito');
  };
  
  // Volver a la página de inicio después de completar la orden
  const volverAInicio = () => {
    navigate('/');
  };
  
  // Si el carrito está vacío, redirigir al carrito
  React.useEffect(() => {
    if (carritoVacio && !ordenCompletada) {
      navigate('/carrito');
    }
  }, [carritoVacio, ordenCompletada, navigate]);

  // Si la orden fue completada, mostrar mensaje de éxito
  if (ordenCompletada) {
    return (
      <div className="orden-completada text-center py-5">
        <div className="icono-exito mb-4">
          <CheckCircle size={64} color="#28a745" />
        </div>
        
        <h2 className="mb-3">¡Gracias por tu compra!</h2>
        <p className="mb-4">
          Tu orden ha sido procesada exitosamente. Hemos enviado un correo electrónico 
          con los detalles de tu compra a {formulario.email}.
        </p>
        
        <Alert variant="success" className="mx-auto mb-4" style={{ maxWidth: '500px' }}>
          <p className="mb-0">
            Número de referencia: <strong>#{Math.floor(Math.random() * 1000000)}</strong>
          </p>
        </Alert>
        
        <Button 
          variant="primary" 
          size="lg" 
          onClick={volverAInicio}
          className="btn-volver-inicio"
        >
          Volver al Inicio
        </Button>
      </div>
    );
  }

  return (
    <div className="pagina-checkout">
      <Button 
        variant="outline-secondary" 
        className="mb-4 btn-volver"
        onClick={volverAlCarrito}
      >
        <ArrowLeft size={18} className="me-2" />
        Volver al Carrito
      </Button>
      
      <h2 className="titulo-seccion mb-4">Finalizar Compra</h2>
      
      <Row>
        <Col lg={8} className="mb-4">
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Card className="mb-4">
              <Card.Header className="bg-light">
                <h5 className="mb-0">Información Personal</h5>
              </Card.Header>
              <Card.Body>
                <Row>
                  <Col md={6} className="mb-3">
                    <Form.Group controlId="formNombre">
                      <Form.Label>Nombre</Form.Label>
                      <Form.Control
                        type="text"
                        name="nombre"
                        value={formulario.nombre}
                        onChange={handleChange}
                        required
                      />
                      <Form.Control.Feedback type="invalid">
                        Por favor ingresa tu nombre.
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  
                  <Col md={6} className="mb-3">
                    <Form.Group controlId="formApellido">
                      <Form.Label>Apellido</Form.Label>
                      <Form.Control
                        type="text"
                        name="apellido"
                        value={formulario.apellido}
                        onChange={handleChange}
                        required
                      />
                      <Form.Control.Feedback type="invalid">
                        Por favor ingresa tu apellido.
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>
                
                <Form.Group className="mb-3" controlId="formEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={formulario.email}
                    onChange={handleChange}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    Por favor ingresa un email válido.
                  </Form.Control.Feedback>
                </Form.Group>
              </Card.Body>
            </Card>
            
            <Card className="mb-4">
              <Card.Header className="bg-light">
                <h5 className="mb-0">Dirección de Entrega</h5>
              </Card.Header>
              <Card.Body>
                <Form.Group className="mb-3" controlId="formDireccion">
                  <Form.Label>Dirección</Form.Label>
                  <Form.Control
                    type="text"
                    name="direccion"
                    value={formulario.direccion}
                    onChange={handleChange}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    Por favor ingresa tu dirección.
                  </Form.Control.Feedback>
                </Form.Group>
                
                <Row>
                  <Col md={6} className="mb-3">
                    <Form.Group controlId="formCiudad">
                      <Form.Label>Ciudad</Form.Label>
                      <Form.Control
                        type="text"
                        name="ciudad"
                        value={formulario.ciudad}
                        onChange={handleChange}
                        required
                      />
                      <Form.Control.Feedback type="invalid">
                        Por favor ingresa tu ciudad.
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  
                  <Col md={6} className="mb-3">
                    <Form.Group controlId="formCodigoPostal">
                      <Form.Label>Código Postal</Form.Label>
                      <Form.Control
                        type="text"
                        name="codigoPostal"
                        value={formulario.codigoPostal}
                        onChange={handleChange}
                        required
                      />
                      <Form.Control.Feedback type="invalid">
                        Por favor ingresa tu código postal.
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
            
            <Card className="mb-4">
              <Card.Header className="bg-light">
                <h5 className="mb-0">Método de Pago</h5>
              </Card.Header>
              <Card.Body>
                <Form.Group className="mb-4">
                  <div className="d-flex flex-wrap gap-3">
                    <Form.Check
                      type="radio"
                      id="pago-tarjeta"
                      name="formaPago"
                      value="tarjeta"
                      checked={formaPago === 'tarjeta'}
                      onChange={handleFormaPagoChange}
                      label={
                        <span className="d-flex align-items-center">
                          <CreditCard size={20} className="me-2" />
                          <span>Tarjeta de Crédito/Débito</span>
                        </span>
                      }
                      className="forma-pago-option"
                    />
                    
                    <Form.Check
                      type="radio"
                      id="pago-paypal"
                      name="formaPago"
                      value="paypal"
                      checked={formaPago === 'paypal'}
                      onChange={handleFormaPagoChange}
                      label={
                        <span className="d-flex align-items-center">
                          <svg width="20\" height="20\" viewBox="0 0 24 24\" fill="none\" stroke="currentColor\" strokeWidth="2\" strokeLinecap="round\" strokeLinejoin="round\" className="me-2">
                            <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                            <rect width="18" height="12" x="3" y="11" rx="2"></rect>
                          </svg>
                          <span>PayPal</span>
                        </span>
                      }
                      className="forma-pago-option"
                    />
                  </div>
                </Form.Group>
                
                {formaPago === 'tarjeta' && (
                  <div className="detalles-tarjeta">
                    <Form.Group className="mb-3" controlId="formNumeroTarjeta">
                      <Form.Label>Número de Tarjeta</Form.Label>
                      <Form.Control
                        type="text"
                        name="numeroTarjeta"
                        value={formulario.numeroTarjeta}
                        onChange={handleChange}
                        placeholder="XXXX XXXX XXXX XXXX"
                        required
                      />
                      <Form.Control.Feedback type="invalid">
                        Por favor ingresa el número de tu tarjeta.
                      </Form.Control.Feedback>
                    </Form.Group>
                    
                    <Row>
                      <Col md={6} className="mb-3">
                        <Form.Group controlId="formFechaExpiracion">
                          <Form.Label>Fecha de Expiración</Form.Label>
                          <Form.Control
                            type="text"
                            name="fechaExpiracion"
                            value={formulario.fechaExpiracion}
                            onChange={handleChange}
                            placeholder="MM/AA"
                            required
                          />
                          <Form.Control.Feedback type="invalid">
                            Por favor ingresa la fecha de expiración.
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                      
                      <Col md={6} className="mb-3">
                        <Form.Group controlId="formCVV">
                          <Form.Label>CVV</Form.Label>
                          <Form.Control
                            type="text"
                            name="cvv"
                            value={formulario.cvv}
                            onChange={handleChange}
                            placeholder="XXX"
                            required
                          />
                          <Form.Control.Feedback type="invalid">
                            Por favor ingresa el código CVV.
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                    </Row>
                  </div>
                )}
                
                {formaPago === 'paypal' && (
                  <Alert variant="info">
                    Al hacer clic en "Completar Compra", serás redirigido a PayPal para completar tu pago de manera segura.
                  </Alert>
                )}
              </Card.Body>
            </Card>
            
            <Button 
              type="submit" 
              variant="primary" 
              size="lg" 
              className="w-100 btn-completar-compra"
              disabled={carritoVacio}
            >
              Completar Compra
            </Button>
          </Form>
        </Col>
        
        <Col lg={4}>
          <Card className="resumen-orden">
            <Card.Header className="bg-light">
              <h5 className="mb-0">Resumen de tu Orden</h5>
            </Card.Header>
            
            <ListGroup variant="flush">
              {carrito.map(item => (
                <ListGroup.Item key={item.producto.id} className="producto-resumen">
                  <div className="d-flex justify-content-between">
                    <div className="d-flex">
                      <span className="cantidad-resumen">{item.cantidad}x</span>
                      <span className="nombre-producto-resumen">{item.producto.nombre}</span>
                    </div>
                    <span className="precio-producto-resumen">
                      ${(item.producto.precio * item.cantidad).toFixed(2)}
                    </span>
                  </div>
                </ListGroup.Item>
              ))}
            </ListGroup>
            
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
              
              <div className="d-flex justify-content-between mb-0">
                <span className="fw-bold">Total:</span>
                <span className="total-precio-checkout">${totalCarrito.toFixed(2)}</span>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Checkout;