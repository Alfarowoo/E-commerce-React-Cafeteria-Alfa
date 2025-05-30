import React from 'react';
import { ButtonGroup, Button } from 'react-bootstrap';
import { Categoria } from '../tipos/tipos';
import '../estilos/FiltroCategoria.css';

// Props para el componente FiltroCategoria
interface FiltroCategoriaProps {
  categoriaSeleccionada: Categoria | null;
  onCambioCategoria: (categoria: Categoria | null) => void;
}

// Componente para filtrar productos por categoría
const FiltroCategoria: React.FC<FiltroCategoriaProps> = ({ 
  categoriaSeleccionada, 
  onCambioCategoria 
}) => {
  // Array con todas las categorías disponibles
  const categorias = Object.values(Categoria);

  return (
    <div className="filtro-categoria mb-4">
      <h5 className="mb-3">Filtrar por categoría:</h5>
      
      <ButtonGroup className="filtro-botones">
        <Button 
          variant={categoriaSeleccionada === null ? "primary" : "outline-primary"}
          onClick={() => onCambioCategoria(null)}
          className="filtro-boton"
        >
          Todos
        </Button>
        
        {categorias.map((categoria) => (
          <Button 
            key={categoria}
            variant={categoriaSeleccionada === categoria ? "primary" : "outline-primary"}
            onClick={() => onCambioCategoria(categoria)}
            className="filtro-boton"
          >
            {categoria}
          </Button>
        ))}
      </ButtonGroup>
    </div>
  );
};

export default FiltroCategoria;