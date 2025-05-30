// Definición de tipos para la aplicación

// Tipo para los productos
export interface Producto {
  id: number;
  nombre: string;
  categoria: Categoria;
  precio: number;
  descripcion: string;
  imagen: string;
  disponible: boolean;
  ingredientes: string[];
  destacado?: boolean;
}

// Enum para las categorías de productos
export enum Categoria {
  BEBIDAS_CALIENTES = "Bebidas Calientes",
  BEBIDAS_FRIAS = "Bebidas Frías",
  PASTELERIA = "Pastelería",
  COMIDA = "Comida"
}