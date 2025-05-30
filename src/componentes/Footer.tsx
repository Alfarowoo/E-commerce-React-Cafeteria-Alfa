import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react';
import '../estilos/Footer.css';

// Componente de pie de página
const Footer: React.FC = () => {
  return (
    <footer className="bg-dark text-light footer-cafe py-4">
      <Container>
        <Row className="py-4">
          <Col md={4} className="mb-4 mb-md-0">
            <h5 className="footer-heading">Cafetería Alfa</h5>
            <p className="footer-text">
              Disfrutando del mejor café desde 2018. Productos de calidad y un ambiente acogedor para nuestros clientes.
            </p>
            <div className="social-icons">
              <a href="#" className="social-icon">
                <Facebook size={20} />
              </a>
              <a href="#" className="social-icon">
                <Instagram size={20} />
              </a>
              <a href="#" className="social-icon">
                <Twitter size={20} />
              </a>
            </div>
          </Col>
          
          <Col md={4} className="mb-4 mb-md-0">
            <h5 className="footer-heading">Horario</h5>
            <ul className="list-unstyled footer-list">
              <li>Lunes - Viernes: 7:00 - 20:00</li>
              <li>Sábado: 8:00 - 20:00</li>
              <li>Domingo: 9:00 - 18:00</li>
            </ul>
          </Col>
          
          <Col md={4}>
            <h5 className="footer-heading">Contacto</h5>
            <ul className="list-unstyled footer-contact">
              <li>
                <MapPin size={16} className="me-2" />
                <span>Av. Principal 123, Ciudad</span>
              </li>
              <li>
                <Phone size={16} className="me-2" />
                <span>(123) 456-7890</span>
              </li>
              <li>
                <Mail size={16} className="me-2" />
                <span>info@cafealfa.com</span>
              </li>
            </ul>
          </Col>
        </Row>
        
        <hr className="footer-divider" />
        
        <div className="text-center py-2">
          <p className="mb-0 footer-copyright">
            &copy; {new Date().getFullYear()} Cafetería Alfa. Todos los derechos reservados.
          </p>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;