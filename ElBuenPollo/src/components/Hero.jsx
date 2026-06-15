import { motion } from "framer-motion";
import logoCentro from "../assets/Logo_el_buen_pollo.png";

export default function Hero() {
  return (
    <section id="inicio" className="relative min-h-[80vh] flex items-center bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        {/* Lado Izquierdo: Textos */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-orange-500 font-bold uppercase tracking-[4px] text-sm mb-4 block">
            Tu pollería de confianza en Río Cuarto
          </span>
          <h1 className="text-6xl md:text-7xl font-black text-[#4a1414] leading-[1.1] mb-6">
            Bienvenidos al <br />
            <span className="text-orange-500">Buen Pollo Centro</span>
          </h1>
          <p className="text-xl text-gray-600 mb-10 max-w-lg font-medium">
            Compromiso innegociable con la calidad y la frescura en cada uno de nuestros productos seleccionados.
          </p>
          
          <div className="flex flex-wrap gap-4">
            <a href="CatalogPage" className="bg-[#4a1414] text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-xl shadow-orange-900/20 hover:bg-orange-800 transition-all">
              Ver Catálogo
            </a>
            <a href="#contacto" className="bg-white text-gray-700 border-2 border-gray-100 px-8 py-4 rounded-2xl font-bold text-lg hover:border-orange-200 transition-all">
              Ubicación
            </a>
          </div>
        </motion.div>

        {/* Lado Derecho: Logo Portada */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative flex justify-center"
        >
          <div className="relative w-full max-w-[500px] aspect-square">
            {/* Decoración de fondo */}
            <div className="absolute inset-0 bg-orange-100 rounded-full blur-3xl opacity-50" />
            <img 
              src={logoCentro} 
              alt="Logo El Buen Pollo" 
              className="relative z-10 w-full h-full object-contain drop-shadow-2xl rounded-full shadow-lg shadow-orange-900/30"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}