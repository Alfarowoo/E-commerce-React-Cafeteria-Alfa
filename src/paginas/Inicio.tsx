import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Button, Spinner, Carousel } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import TarjetaProducto from '../componentes/TarjetaProducto';
import { obtenerProductosDestacados } from '../servicios/apiProductos';
import { Producto } from '../tipos/tipos';
import { Coffee, ArrowRight } from 'lucide-react';
import '../estilos/Inicio.css';

// Componente de la página de inicio
const Inicio: React.FC = () => {
  const [productosDestacados, setProductosDestacados] = useState<Producto[]>([]);
  const [cargando, setCargando] = useState<boolean>(true);
  
  // Cargar productos destacados al montar el componente
  useEffect(() => {
    const cargarDestacados = async () => {
      try {
        setCargando(true);
        const data = await obtenerProductosDestacados();
        setProductosDestacados(data);
      } catch (error) {
        console.error('Error al cargar productos destacados:', error);
      } finally {
        setCargando(false);
      }
    };

    cargarDestacados();
  }, []);

  return (
    <div className="pagina-inicio">
      {/* Sección Hero */}
      <section className="seccion-hero mb-5">
        <Carousel fade className="hero-carousel">
          <Carousel.Item>
            <img
              className="d-block w-100 hero-imagen"
              src="https://images.pexels.com/photos/683039/pexels-photo-683039.jpeg"
              alt="Café de especialidad"
            />
            <Carousel.Caption className="hero-caption">
              <h1 className="hero-titulo">Bienvenido a Cafetería Alfa</h1>
              <p className="hero-subtitulo">Donde cada taza cuenta una historia</p>
              <Link to="/productos" className="btn btn-primary btn-lg hero-boton">
                Ver Productos
              </Link>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100 hero-imagen"
              src="https://images.pexels.com/photos/1233530/pexels-photo-1233530.jpeg"
              alt="Nuestros pasteles"
            />
            <Carousel.Caption className="hero-caption">
              <h1 className="hero-titulo">Deliciosa Pastelería Artesanal</h1>
              <p className="hero-subtitulo">Descubre nuestras creaciones diarias</p>
              <Link to="/productos" className="btn btn-primary btn-lg hero-boton">
                Probar Ahora
              </Link>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </section>

      {/* Sección Acerca de */}
      <section className="seccion-acerca mb-5">
        <Row className="align-items-center">
          <Col md={6} className="mb-4 mb-md-0">
            <div className="acerca-imagen-container">
              <img 
                src="https://images.pexels.com/photos/1055054/pexels-photo-1055054.jpeg" 
                alt="Nuestra historia" 
                className="img-fluid rounded acerca-imagen"
              />
            </div>
          </Col>
          <Col md={6}>
            <div className="acerca-contenido">
              <h2 className="titulo-seccion mb-3">Nuestra Historia</h2>
              <p className="acerca-texto">
                Fundada en 2018, Cafetería Alfa nace de la pasión por el buen café y la gastronomía de calidad. 
                Seleccionamos los mejores granos de café y los ingredientes más frescos para ofrecerte una 
                experiencia única en cada visita.
              </p>
              <p className="acerca-texto">
                Nuestro equipo de baristas expertos se dedica a preparar cada bebida con precisión y cuidado, 
                asegurando que cada taza sea perfecta. Complementamos nuestra oferta con deliciosa pastelería 
                artesanal y opciones gastronómicas para todos los gustos.
              </p>
              <Link to="/contacto" className="btn btn-outline-primary">
                Conoce Más
                <ArrowRight size={18} className="ms-2" />
              </Link>
            </div>
          </Col>
        </Row>
      </section>

      {/* Sección Categorías */}
      <section className="seccion-categorias mb-5">
        <h2 className="titulo-seccion text-center mb-4">Nuestras Categorías</h2>
        <Row className="g-4">
          <Col md={3} sm={6}>
            <Card className="categoria-card">
              <Card.Img 
                variant="top" 
                src="https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg" 
                alt="Bebidas Calientes" 
                className="categoria-imagen"
              />
              <Card.Body className="text-center">
                <Card.Title className="categoria-titulo">Bebidas Calientes</Card.Title>
                <Link 
                  to="/productos" 
                  className="btn btn-outline-primary btn-sm categoria-boton"
                >
                  Explorar
                </Link>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3} sm={6}>
            <Card className="categoria-card">
              <Card.Img 
                variant="top" 
                src="https://images.pexels.com/photos/2983099/pexels-photo-2983099.jpeg" 
                alt="Bebidas Frías" 
                className="categoria-imagen"
              />
              <Card.Body className="text-center">
                <Card.Title className="categoria-titulo">Bebidas Frías</Card.Title>
                <Link 
                  to="/productos" 
                  className="btn btn-outline-primary btn-sm categoria-boton"
                >
                  Explorar
                </Link>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3} sm={6}>
            <Card className="categoria-card">
              <Card.Img 
                variant="top" 
                src="https://images.pexels.com/photos/2144112/pexels-photo-2144112.jpeg" 
                alt="Pastelería" 
                className="categoria-imagen"
              />
              <Card.Body className="text-center">
                <Card.Title className="categoria-titulo">Pastelería</Card.Title>
                <Link 
                  to="/productos" 
                  className="btn btn-outline-primary btn-sm categoria-boton"
                >
                  Explorar
                </Link>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3} sm={6}>
            <Card className="categoria-card">
              <Card.Img 
                variant="top" 
                src="https://images.pexels.com/photos/1600711/pexels-photo-1600711.jpeg" 
                alt="Comida" 
                className="categoria-imagen"
              />
              <Card.Body className="text-center">
                <Card.Title className="categoria-titulo">Comida</Card.Title>
                <Link 
                  to="/productos" 
                  className="btn btn-outline-primary btn-sm categoria-boton"
                >
                  Explorar
                </Link>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </section>

      {/* Sección Productos Destacados */}
      <section className="seccion-destacados mb-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="titulo-seccion mb-0">Productos Destacados</h2>
          <Link to="/productos" className="btn btn-link destacados-ver-todos">
            Ver Todos
            <ArrowRight size={16} className="ms-1" />
          </Link>
        </div>
        
        {cargando ? (
          <div className="text-center py-4">
            <Spinner animation="border" variant="primary" />
            <p className="mt-2">Cargando productos destacados...</p>
          </div>
        ) : (
          <Row className="g-4">
            {productosDestacados.map(producto => (
              <Col key={producto.id} md={3} sm={6}>
                <TarjetaProducto producto={producto} />
              </Col>
            ))}
          </Row>
        )}
      </section>

      {/* Sección Características */}
      <section className="seccion-caracteristicas mb-5">
        <h2 className="titulo-seccion text-center mb-4">¿Por qué elegirnos?</h2>
        <Row className="g-4">
          <Col md={4}>
            <div className="caracteristica-item text-center">
              <div className="caracteristica-icono">
                <Coffee size={40} />
              </div>
              <h3 className="caracteristica-titulo">Café de Especialidad</h3>
              <p className="caracteristica-texto">
                Seleccionamos y tostamos los mejores granos de café para ofrecerte una experiencia única.
              </p>
            </div>
          </Col>
          <Col md={4}>
            <div className="caracteristica-item text-center">
              <div className="caracteristica-icono">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2L7 7H5a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V8a1 1 0 0 0-1-1h-2l-5-5Z"></path>
                  <path d="M9 13v-3"></path>
                  <path d="M12 13v-6"></path>
                  <path d="M15 13v-3"></path>
                  <path d="M3 21h18"></path>
                </svg>
              </div>
              <h3 className="caracteristica-titulo">Ingredientes Frescos</h3>
              <p className="caracteristica-texto">
                Utilizamos ingredientes frescos y de alta calidad en todas nuestras preparaciones.
              </p>
            </div>
          </Col>
          <Col md={4}>
            <div className="caracteristica-item text-center">
              <div className="caracteristica-icono">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V7l-8-5-8 5v5c0 6 8 10 8 10z"></path>
                  <path d="m9 12 2 2 4-4"></path>
                </svg>
              </div>
              <h3 className="caracteristica-titulo">Ambiente Acogedor</h3>
              <p className="caracteristica-texto">
                Un espacio diseñado para tu comodidad, ideal para trabajar, estudiar o compartir.
              </p>
            </div>
          </Col>
        </Row>
      </section>
    </div>
  );
};

export default Inicio;