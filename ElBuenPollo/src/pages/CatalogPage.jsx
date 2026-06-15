import { useState, useContext } from "react";
import { CartContext } from "../context/CartContext";
import CartModal from "../components/CartModal";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Products from "../components/Products";

export default function CatalogPage() {
  const { cantidadArticulos } = useContext(CartContext);
  const [cartOpen, setCartOpen] = useState(false);

  const numeroWhatsApp = "5493584116988";
  const mensajeWA = encodeURIComponent(
    "Hola! Vi el catálogo y me gustaría realizar un pedido."
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-stone-900"
    >
      <div className="max-w-7xl mx-auto px-4 py-8">

        <div className="flex justify-between items-center mb-8">

          <Link
            to="/"
            className="text-orange-400 font-bold hover:text-orange-300"
          >
            ← Volver al Inicio
          </Link>

            <button
              onClick={() => setCartOpen(true)}
              className="
                fixed
                bottom-28
                right-8
                z-50
                bg-orange-500
                hover:bg-orange-600
                text-white
                w-16
                h-16
                rounded-full
                shadow-2xl
                flex
                items-center
                justify-center
                text-3xl
                transition-all
                hover:scale-110
              "
            >
              🛒

              {cantidadArticulos > 0 && (
                <span
                  className="
                    absolute
                    -top-1
                    -right-1
                    bg-red-500
                    text-white
                    h-6
                    w-6
                    rounded-full
                    flex
                    items-center
                    justify-center
                    text-xs
                    font-bold
                    animate-pulse
                  "
                >
                  {cantidadArticulos}
                </span>
              )}
            </button>

        </div>

        <header className="text-center mb-10">
          <h1 className="text-4xl md:text-6xl font-black text-white">
            NUESTRAS <span className="text-orange-500">OFERTAS</span>
          </h1>

          <p className="text-stone-400 mt-3">
            Calidad y precio todos los días en Río Cuarto
          </p>
        </header>

        <Products />

        <div className="mt-10 text-center text-stone-400 text-sm">
          * Precios sujetos a cambios y disponibilidad de stock.
        </div>
      </div>

      <CartModal
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
      />

      {/* WhatsApp */}

      <motion.a
        href={`https://wa.me/${numeroWhatsApp}?text=${mensajeWA}`}
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-8 right-8 z-50 bg-green-500 text-white p-4 rounded-full shadow-xl"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 32 32"
          className="w-8 h-8 fill-current"
        >
          <path d="M16 .4C7.4.4.4 7.4.4 16c0 2.8.7 5.4 2.1 7.8L0 32l8.4-2.2c2.2 1.2 4.8 1.8 7.6 1.8 8.6 0 15.6-7 15.6-15.6S24.6.4 16 .4zm0 28.4c-2.4 0-4.7-.6-6.7-1.8l-.5-.3-5 1.3 1.3-4.9-.3-.5A12.6 12.6 0 1 1 16 28.8zm6.9-9.5c-.4-.2-2.2-1.1-2.5-1.2-.3-.1-.6-.2-.9.2-.3.4-1 1.2-1.2 1.4-.2.2-.5.3-.9.1-.4-.2-1.7-.6-3.2-2-1.2-1.1-2-2.4-2.2-2.8-.2-.4 0-.6.2-.8.2-.2.4-.5.6-.7.2-.2.3-.4.4-.7.1-.2.1-.5 0-.7-.1-.2-.9-2.1-1.2-2.9-.3-.8-.6-.7-.9-.7h-.8c-.3 0-.7.1-1 .5-.3.4-1.3 1.3-1.3 3.2 0 1.9 1.4 3.8 1.6 4 .2.3 2.7 4.1 6.5 5.7.9.4 1.7.7 2.3.9 1 .3 1.9.2 2.6.1.8-.1 2.2-.9 2.5-1.7.3-.8.3-1.5.2-1.7-.1-.2-.4-.3-.8-.5z"/>
        </svg>
      </motion.a>
    </motion.div>
  );
}