import React, { useState } from 'react';
import { Row, Col, Form, Button, Card, Alert } from 'react-bootstrap';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import '../estilos/Contacto.css';

// Componente de la página de contacto
const Contacto: React.FC = () => {
  const [validated, setValidated] = useState<boolean>(false);
  const [enviado, setEnviado] = useState<boolean>(false);
  const [formulario, setFormulario] = useState({
    nombre: '',
    email: '',
    asunto: '',
    mensaje: ''
  });

  // Manejar cambios en el formulario
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormulario(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  // Manejar envío del formulario
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    
    if (form.checkValidity() === false) {
      e.stopPropagation();
    } else {
      // Simulación de envío exitoso
      setTimeout(() => {
        setEnviado(true);
        setFormulario({
          nombre: '',
          email: '',
          asunto: '',
          mensaje: ''
        });
        
        // Ocultar el mensaje después de 5 segundos
        setTimeout(() => {
          setEnviado(false);
        }, 5000);
      }, 1000);
    }
    
    setValidated(true);
  };

  return (
    <div className="pagina-contacto">
      <div className="banner-contacto mb-5">
        <div className="banner-contenido">
          <h1 className="banner-titulo">Contáctanos</h1>
          <p className="banner-texto">
            Estamos aquí para atender tus consultas, sugerencias o reservas.
          </p>
        </div>
      </div>
      
      <Row>
        <Col lg={6} className="mb-4 mb-lg-0">
          <h2 className="titulo-seccion mb-4">Envíanos un Mensaje</h2>
          
          {enviado && (
            <Alert variant="success" className="mb-4">
              ¡Tu mensaje ha sido enviado con éxito! Te contactaremos pronto.
            </Alert>
          )}
          
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Row>
              <Col md={6} className="mb-3">
                <Form.Group controlId="formNombre">
                  <Form.Label>Nombre</Form.Label>
                  <Form.Control
                    type="text"
                    name="nombre"
                    value={formulario.nombre}
                    onChange={handleChange}
                    placeholder="Tu nombre"
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    Por favor ingresa tu nombre.
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              
              <Col md={6} className="mb-3">
                <Form.Group controlId="formEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={formulario.email}
                    onChange={handleChange}
                    placeholder="tucorreo@ejemplo.com"
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    Por favor ingresa un email válido.
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>
            
            <Form.Group className="mb-3" controlId="formAsunto">
              <Form.Label>Asunto</Form.Label>
              <Form.Control
                type="text"
                name="asunto"
                value={formulario.asunto}
                onChange={handleChange}
                placeholder="Asunto del mensaje"
                required
              />
              <Form.Control.Feedback type="invalid">
                Por favor ingresa el asunto.
              </Form.Control.Feedback>
            </Form.Group>
            
            <Form.Group className="mb-3" controlId="formMensaje">
              <Form.Label>Mensaje</Form.Label>
              <Form.Control
                as="textarea"
                rows={5}
                name="mensaje"
                value={formulario.mensaje}
                onChange={handleChange}
                placeholder="Escribe tu mensaje aquí..."
                required
              />
              <Form.Control.Feedback type="invalid">
                Por favor ingresa tu mensaje.
              </Form.Control.Feedback>
            </Form.Group>
            
            <Button type="submit" variant="primary" className="w-100 btn-enviar">
              <Send size={18} className="me-2" />
              Enviar Mensaje
            </Button>
          </Form>
        </Col>
        
        <Col lg={6}>
          <h2 className="titulo-seccion mb-4">Información de Contacto</h2>
          
          <Card className="mb-4 info-contacto">
            <Card.Body>
              <div className="d-flex mb-3">
                <div className="contacto-icono">
                  <MapPin size={24} />
                </div>
                <div className="contacto-info">
                  <h5 className="mb-1">Dirección</h5>
                  <p className="mb-0">Av. Principal 123, Ciudad</p>
                </div>
              </div>
              
              <div className="d-flex mb-3">
                <div className="contacto-icono">
                  <Phone size={24} />
                </div>
                <div className="contacto-info">
                  <h5 className="mb-1">Teléfono</h5>
                  <p className="mb-0">(123) 456-7890</p>
                </div>
              </div>
              
              <div className="d-flex mb-3">
                <div className="contacto-icono">
                  <Mail size={24} />
                </div>
                <div className="contacto-info">
                  <h5 className="mb-1">Email</h5>
                  <p className="mb-0">info@cafealfa.com</p>
                </div>
              </div>
              
              <div className="d-flex">
                <div className="contacto-icono">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <polyline points="12 6 12 12 16 14"></polyline>
                  </svg>
                </div>
                <div className="contacto-info">
                  <h5 className="mb-1">Horario</h5>
                  <p className="mb-0">Lunes - Viernes: 7:00 - 20:00</p>
                  <p className="mb-0">Sábado: 8:00 - 20:00</p>
                  <p className="mb-0">Domingo: 9:00 - 18:00</p>
                </div>
              </div>
            </Card.Body>
          </Card>
          
          <div className="mapa-container">
            <h5 className="mb-3">Encuéntranos</h5>
            <div className="embed-responsive embed-responsive-4by3">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3763.4321341416423!2d-99.16883582412909!3d19.397757845874147!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85d1ff0fb38033f5%3A0x7b3b27a8a3049fb6!2sAv.%20%C3%81lvaro%20Obreg%C3%B3n%2C%20Roma%20Nte.%2C%20Ciudad%20de%20M%C3%A9xico%2C%20CDMX!5e0!3m2!1ses-419!2smx!4v1690254560493!5m2!1ses-419!2smx" 
                width="100%" 
                height="300" 
                style={{ border: 0 }} 
                allowFullScreen 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Ubicación Cafetería Alfa"
              ></iframe>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Contacto;