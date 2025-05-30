// Servicio de API para productos (simulado)
import { Producto, Categoria } from '../tipos/tipos';

// Datos mock para simular respuesta de API
const productosMock: Producto[] = [
  {
    id: 1,
    nombre: "Cappuccino Clásico",
    categoria: Categoria.BEBIDAS_CALIENTES,
    precio: 45.00,
    descripcion: "Espresso con leche vaporizada y espuma, el balance perfecto entre intensidad y cremosidad.",
    imagen: "https://images.pexels.com/photos/312418/pexels-photo-312418.jpeg",
    disponible: true,
    ingredientes: ["Café espresso", "Leche", "Espuma de leche"],
    destacado: true
  },
  {
    id: 2,
    nombre: "Latte Vainilla",
    categoria: Categoria.BEBIDAS_CALIENTES,
    precio: 50.00,
    descripcion: "Suave espresso con leche vaporizada y un toque de vainilla natural.",
    imagen: "https://images.pexels.com/photos/685527/pexels-photo-685527.jpeg",
    disponible: true,
    ingredientes: ["Café espresso", "Leche", "Jarabe de vainilla"]
  },
  {
    id: 3,
    nombre: "Americano",
    categoria: Categoria.BEBIDAS_CALIENTES,
    precio: 35.00,
    descripcion: "Espresso con agua caliente, conservando todo el aroma del café.",
    imagen: "https://images.pexels.com/photos/1477851/pexels-photo-1477851.jpeg",
    disponible: true,
    ingredientes: ["Café espresso", "Agua caliente"]
  },
  {
    id: 4,
    nombre: "Frappé Caramelo",
    categoria: Categoria.BEBIDAS_FRIAS,
    precio: 65.00,
    descripcion: "Deliciosa bebida helada con café, leche, hielo, caramelo y crema batida.",
    imagen: "https://images.pexels.com/photos/4788612/pexels-photo-4788612.jpeg",
    disponible: true,
    ingredientes: ["Café", "Leche", "Hielo", "Jarabe de caramelo", "Crema batida"],
    destacado: true
  },
  {
    id: 5,
    nombre: "Smoothie de Frutas",
    categoria: Categoria.BEBIDAS_FRIAS,
    precio: 55.00,
    descripcion: "Refrescante mezcla de frutas naturales, yogurt y hielo.",
    imagen: "https://images.pexels.com/photos/1028714/pexels-photo-1028714.jpeg",
    disponible: true,
    ingredientes: ["Fresa", "Plátano", "Yogurt natural", "Hielo"]
  },
  {
    id: 6,
    nombre: "Croissant Tradicional",
    categoria: Categoria.PASTELERIA,
    precio: 30.00,
    descripcion: "Auténtico croissant francés horneado diariamente con mantequilla importada.",
    imagen: "https://images.pexels.com/photos/3892469/pexels-photo-3892469.jpeg",
    disponible: true,
    ingredientes: ["Harina", "Mantequilla", "Levadura", "Sal"]
  },
  {
    id: 7,
    nombre: "Cheesecake de Frutos Rojos",
    categoria: Categoria.PASTELERIA,
    precio: 75.00,
    descripcion: "Cremoso cheesecake horneado con base de galleta y cubierta de frutos rojos.",
    imagen: "https://images.pexels.com/photos/1291712/pexels-photo-1291712.jpeg",
    disponible: true,
    ingredientes: ["Queso crema", "Galleta", "Azúcar", "Frutos rojos"],
    destacado: true
  },
  {
    id: 8,
    nombre: "Sandwich de Pavo",
    categoria: Categoria.COMIDA,
    precio: 85.00,
    descripcion: "Delicioso sándwich con pavo, aguacate, lechuga y aderezo especial en pan artesanal.",
    imagen: "https://images.pexels.com/photos/1647163/pexels-photo-1647163.jpeg",
    disponible: true,
    ingredientes: ["Pan artesanal", "Pavo", "Aguacate", "Lechuga", "Tomate", "Aderezo especial"]
  },
  {
    id: 9,
    nombre: "Ensalada Mediterránea",
    categoria: Categoria.COMIDA,
    precio: 95.00,
    descripcion: "Fresca ensalada con mix de lechugas, tomate, pepino, queso feta y aderezo de oliva.",
    imagen: "https://images.pexels.com/photos/1213710/pexels-photo-1213710.jpeg",
    disponible: true,
    ingredientes: ["Lechugas mixtas", "Tomate", "Pepino", "Queso feta", "Aceitunas", "Aceite de oliva"],
    destacado: true
  },
  {
    id: 10,
    nombre: "Muffin de Arándanos",
    categoria: Categoria.PASTELERIA,
    precio: 40.00,
    descripcion: "Esponjoso muffin con arándanos frescos horneado diariamente.",
    imagen: "https://images.pexels.com/photos/8330392/pexels-photo-8330392.jpeg",
    disponible: true,
    ingredientes: ["Harina", "Huevo", "Azúcar", "Arándanos frescos"]
  }
];

// Simular la obtención de todos los productos
export const obtenerProductos = (): Promise<Producto[]> => {
  return new Promise((resolve) => {
    // Simular delay de red
    setTimeout(() => {
      resolve(productosMock);
    }, 800);
  });
};

// Simular la obtención de un producto por ID
export const obtenerProductoPorId = (id: number): Promise<Producto | undefined> => {
  return new Promise((resolve, reject) => {
    // Simular delay de red
    setTimeout(() => {
      const producto = productosMock.find(p => p.id === id);
      if (producto) {
        resolve(producto);
      } else {
        reject(new Error('Producto no encontrado'));
      }
    }, 500);
  });
};

// Simular la obtención de productos por categoría
export const obtenerProductosPorCategoria = (categoria: Categoria): Promise<Producto[]> => {
  return new Promise((resolve) => {
    // Simular delay de red
    setTimeout(() => {
      const productosFiltrados = productosMock.filter(p => p.categoria === categoria);
      resolve(productosFiltrados);
    }, 600);
  });
};

// Simular la obtención de productos destacados
export const obtenerProductosDestacados = (): Promise<Producto[]> => {
  return new Promise((resolve) => {
    // Simular delay de red
    setTimeout(() => {
      const productosDestacados = productosMock.filter(p => p.destacado === true);
      resolve(productosDestacados);
    }, 600);
  });
};