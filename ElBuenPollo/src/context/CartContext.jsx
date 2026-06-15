// src/context/CartContext.jsx
import React, { createContext, useState } from 'react';

// Creamos el contexto
export const CartContext = createContext();

// Creamos el proveedor que envolverá a nuestra App
export const CartProvider = ({ children }) => {
  const [carrito, setCarrito] = useState([]);

  // Función para agregar al carrito
  const agregarAlCarrito = (producto) => {
    setCarrito((prevCarrito) => {
      // Verificamos si el producto ya está en el carrito
      const itemExistente = prevCarrito.find(item => item.id === producto.id);
      
      if (itemExistente) {
        // Si ya está, le sumamos 1 a la cantidad
        return prevCarrito.map(item => 
          item.id === producto.id 
            ? { ...item, cantidad: item.cantidad + 1 } 
            : item
        );
      } else {
        // Si no está, lo agregamos con cantidad 1
        return [...prevCarrito, { ...producto, cantidad: 1 }];
      }
    });
  };

  // Función para eliminar un producto del carrito
  const eliminarDelCarrito = (id) => {
    setCarrito((prevCarrito) => prevCarrito.filter(item => item.id !== id));
  };

  // Función para vaciar el carrito
  const vaciarCarrito = () => {
    setCarrito([]);
  };

  // Calculamos el total de plata
  const totalCarrito = carrito.reduce((total, item) => total + (item.precio * item.cantidad), 0);

  // Calculamos la cantidad total de artículos
  const cantidadArticulos = carrito.reduce((total, item) => total + item.cantidad, 0);

  return (
    <CartContext.Provider value={{ 
      carrito, 
      agregarAlCarrito, 
      eliminarDelCarrito, 
      vaciarCarrito,
      totalCarrito,
      cantidadArticulos
    }}>
      {children}
    </CartContext.Provider>
  );
};