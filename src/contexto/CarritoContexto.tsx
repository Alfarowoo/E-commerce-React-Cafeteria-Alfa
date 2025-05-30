import React, { createContext, useState, useContext, ReactNode } from 'react';
import { Producto } from '../tipos/tipos';

// Definición de tipos para el contexto del carrito
interface ItemCarrito {
  producto: Producto;
  cantidad: number;
}

interface CarritoContextoProps {
  carrito: ItemCarrito[];
  agregarAlCarrito: (producto: Producto, cantidad: number) => void;
  eliminarDelCarrito: (id: number) => void;
  actualizarCantidad: (id: number, cantidad: number) => void;
  limpiarCarrito: () => void;
  obtenerTotal: () => number;
  obtenerCantidadItems: () => number;
}

// Creación del contexto con un valor inicial
const CarritoContexto = createContext<CarritoContextoProps | undefined>(undefined);

// Hook personalizado para usar el contexto del carrito
export const useCarrito = () => {
  const contexto = useContext(CarritoContexto);
  if (contexto === undefined) {
    throw new Error('useCarrito debe ser usado dentro de un CarritoProvider');
  }
  return contexto;
};

// Props para el proveedor del contexto
interface CarritoProviderProps {
  children: ReactNode;
}

// Componente proveedor del contexto
export const CarritoProvider: React.FC<CarritoProviderProps> = ({ children }) => {
  const [carrito, setCarrito] = useState<ItemCarrito[]>([]);

  // Función para agregar productos al carrito
  const agregarAlCarrito = (producto: Producto, cantidad: number) => {
    setCarrito(itemsActuales => {
      // Verificar si el producto ya existe en el carrito
      const itemExistente = itemsActuales.find(item => item.producto.id === producto.id);
      
      if (itemExistente) {
        // Si existe, actualizar la cantidad
        return itemsActuales.map(item => 
          item.producto.id === producto.id 
            ? { ...item, cantidad: item.cantidad + cantidad } 
            : item
        );
      } else {
        // Si no existe, agregar como nuevo item
        return [...itemsActuales, { producto, cantidad }];
      }
    });
  };

  // Función para eliminar productos del carrito
  const eliminarDelCarrito = (id: number) => {
    setCarrito(itemsActuales => 
      itemsActuales.filter(item => item.producto.id !== id)
    );
  };

  // Función para actualizar la cantidad de un producto
  const actualizarCantidad = (id: number, cantidad: number) => {
    setCarrito(itemsActuales => 
      itemsActuales.map(item => 
        item.producto.id === id 
          ? { ...item, cantidad: Math.max(1, cantidad) } 
          : item
      )
    );
  };

  // Función para limpiar el carrito
  const limpiarCarrito = () => {
    setCarrito([]);
  };

  // Función para obtener el total del carrito
  const obtenerTotal = () => {
    return carrito.reduce((total, item) => 
      total + (item.producto.precio * item.cantidad), 0
    );
  };

  // Función para obtener la cantidad total de items en el carrito
  const obtenerCantidadItems = () => {
    return carrito.reduce((total, item) => total + item.cantidad, 0);
  };

  // Valor del contexto que se proporcionará
  const valor = {
    carrito,
    agregarAlCarrito,
    eliminarDelCarrito,
    actualizarCantidad,
    limpiarCarrito,
    obtenerTotal,
    obtenerCantidadItems
  };

  return (
    <CarritoContexto.Provider value={valor}>
      {children}
    </CarritoContexto.Provider>
  );
};

export default CarritoContexto;