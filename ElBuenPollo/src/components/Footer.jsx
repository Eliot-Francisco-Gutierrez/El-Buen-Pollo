import { motion } from "framer-motion";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#4a1414] text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12 border-b border-white/10 pb-12">
        
        {/* Info Marca */}
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-[#facc15]">EL BUEN POLLO</h3>
          <p className="text-gray-300 text-sm leading-relaxed">
            Calidad premium en productos avícolas, artículos de almacén y congelados. 
            Frescura garantizada en tu mesa todos los días.
          </p>
        </div>

        {/* Horarios */}
        <div className="space-y-4">
          <h4 className="text-orange-400 font-bold uppercase tracking-widest text-xs">Horarios</h4>
          <ul className="text-sm text-gray-300 space-y-2">
            <li>Lunes a Sábado: 09:00 - 13:30 |17:00 - 21:00</li>
            <li>Domingos: 09:00 - 13:30</li>
          </ul>
        </div>

        {/* Contacto Rápido */}
        <div className="space-y-4">
          <h4 className="text-orange-400 font-bold uppercase tracking-widest text-xs">Contacto</h4>
          <motion.a 
            href="https://wa.me/5493584116988"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ x: 5, color: "#4ade80" }}
            className="flex items-center gap-3 text-white font-bold transition-colors"
          >
            <div className="bg-[#25D366] p-2 rounded-full shadow-lg">
              {/* MISMO ICONO SVG DE WHATSAPP */}
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="20" 
                height="20" 
                viewBox="0 0 24 24" 
                fill="white"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
            </div>
            Hacé tu pedido por WhatsApp
          </motion.a>
          <p className="text-sm text-gray-300">📍 Vélez Sarsfield 802, Río Cuarto</p>
        </div>
      </div>

      {/* Copyright */}
      <div className="max-w-7xl mx-auto px-6 mt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-400 gap-4">
       <p>© {currentYear} El Buen Pollo - Todos los derechos reservados.</p>
        <p>Diseño por <span className="text-white font-medium underline underline-offset-4 cursor-pointer">Pupa Lab</span></p>
      </div>
    </footer>
  );
}