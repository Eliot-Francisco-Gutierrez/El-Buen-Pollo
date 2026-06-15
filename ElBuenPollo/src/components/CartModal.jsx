import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { motion, AnimatePresence } from "framer-motion";

export default function CartModal({ isOpen, onClose }) {
const numeroWhatsApp = "5493584116988";
  const {
    carrito,
    eliminarDelCarrito,
    vaciarCarrito,
    totalCarrito,
  } = useContext(CartContext);
  const generarPedidoWhatsApp = () => {
  let mensaje = "Hola, quiero realizar el siguiente pedido:%0A%0A";

  carrito.forEach((item) => {
    mensaje += `• ${item.cantidad}x ${item.nombre} - $${(
      item.precio * item.cantidad
    ).toLocaleString()}%0A`;
  });

  mensaje += `%0A💰 Total: $${totalCarrito.toLocaleString()}%0A%0A`;
  mensaje += "Nombre:%0A";
  mensaje += "Dirección:%0A";
  mensaje += "Forma de pago:%0A";

  window.open(
    `https://wa.me/${numeroWhatsApp}?text=${mensaje}`,
    "_blank"
  );
};

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 bg-black/40 z-[998]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          <motion.div
            className="fixed top-0 right-0 h-screen w-[400px] max-w-[90vw] bg-white shadow-2xl z-[999] flex flex-col"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.25 }}
          >
            <div className="flex justify-between items-center p-5 border-b">
              <h2 className="text-2xl font-bold text-[#4a1414]">
                Mi Carrito
              </h2>

              <button
                onClick={onClose}
                className="text-3xl text-gray-500 hover:text-black"
              >
                ✕
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4">
              {carrito.length === 0 ? (
                <div className="h-full flex items-center justify-center text-gray-500">
                  Tu carrito está vacío
                </div>
              ) : (
                <div className="space-y-4">
                  {carrito.map((item) => (
                    <div
                      key={item.id}
                      className="border rounded-xl p-3 flex items-center gap-3"
                    >
                    <div className="w-16 h-16 bg-orange-100 rounded-xl flex items-center justify-center text-3xl">
                    📦
                    </div>

                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-800">
                          {item.nombre}
                        </h3>

                        <p className="text-sm text-gray-500">
                          Cantidad: {item.cantidad}
                        </p>

                        <p className="font-bold text-orange-600">
                          $
                          {(item.precio * item.cantidad).toLocaleString()}
                        </p>
                      </div>

                      <button
                        onClick={() => eliminarDelCarrito(item.id)}
                        className="text-red-500 hover:text-red-700 text-xl"
                      >
                        🗑️
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {carrito.length > 0 && (
              <div className="border-t p-5 space-y-4">
                <div className="flex justify-between text-xl font-bold">
                  <span>Total</span>
                  <span>${totalCarrito.toLocaleString()}</span>
                </div>

                <button
                onClick={generarPedidoWhatsApp}
                className="w-full bg-green-600 text-white py-3 rounded-xl font-bold hover:bg-green-700"
                >
                Finalizar Pedido por WhatsApp
                </button>

                <button
                  onClick={vaciarCarrito}
                  className="w-full bg-red-100 text-red-600 py-3 rounded-xl font-semibold hover:bg-red-200"
                >
                  Vaciar Carrito
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}