import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
// Importamos la imagen del catálogo
import imagenCatalogo from '../assets/elbuenpollopromo.jpeg'; 

export default function CatalogPage() {
  const numeroWhatsApp = "5493584116988";
  const mensajeWA = encodeURIComponent("¡Hola! Vi el catálogo de ofertas y me gustaría hacer un pedido.");

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      className="min-h-screen bg-stone-900 p-4 md:p-8 flex flex-col items-center"
    >
      <div className="max-w-4xl w-full">
        {/* Botón Volver */}
        <Link to="/" className="text-orange-400 font-bold hover:text-orange-300 mb-6 inline-block transition-colors">
          ← Volver al Inicio
        </Link>
        
        <header className="text-center mb-8">
          <h1 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter">
            Nuestras <span className="text-orange-500">Ofertas</span>
          </h1>
          <p className="text-stone-400 mt-2 font-medium">Calidad y precio todos los días en Río Cuarto</p>
        </header>

        {/* Contenedor de la Imagen con Estilo */}
        <motion.div 
          initial={{ y: 20 }}
          animate={{ y: 0 }}
          className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-orange-500/20 bg-stone-800"
        >
          <img 
            src={imagenCatalogo} 
            alt="Catálogo El Buen Pollo" 
            className="w-full h-auto object-contain"
          />
          
          {/* Overlay de brillo sutil */}
          <div className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent pointer-events-none" />
        </motion.div>

        {/* Info de contacto debajo de la imagen */}
        <div className="mt-8 text-center text-stone-400 text-sm italic">
          * Precios sujetos a cambios y disponibilidad de stock.
        </div>
      </div>

      {/* BOTÓN FLOTANTE DE WHATSAPP */}
      <motion.a
        href={`https://wa.me/${numeroWhatsApp}?text=${mensajeWA}`}
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-8 right-8 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-[0_10px_25px_rgba(37,211,102,0.4)] flex items-center justify-center group"
      >
        {/* Icono de WhatsApp (SVG) */}
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="32" 
          height="32" 
          viewBox="0 0 24 24" 
          fill="currentColor"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>

        {/* Texto al pasar el mouse (opcional) */}
        <span className="max-w-0 overflow-hidden group-hover:max-w-xs group-hover:ml-2 transition-all duration-300 font-bold whitespace-nowrap">
          Hacer pedido
        </span>
      </motion.a>
    </motion.div>
  );
}