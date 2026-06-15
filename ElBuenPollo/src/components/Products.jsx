import React, { useEffect, useState, useContext } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { CartContext } from "../context/CartContext";

export default function Products() {
  const [paginaActual, setPaginaActual] = useState(1);
  const productosPorPagina = 20;
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [busqueda, setBusqueda] = useState("");
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("Todos");
  const { agregarAlCarrito } = useContext(CartContext);

    useEffect(() => {
    setPaginaActual(1);
  }, [busqueda, categoriaSeleccionada]);
  useEffect(() => {
  console.log(productos.length);
}, [productos]);

  useEffect(() => {
    const obtenerProductos = async () => {
      try {
        const productosRef = collection(db, "productos");
        const snapshot = await getDocs(productosRef);

        const listaProductos = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setProductos(listaProductos);
      } catch (error) {
        console.error(error);
      } finally {
        setCargando(false);
      }
    };

    obtenerProductos();
  }, []);

  // Categorías únicas
  const categorias = [
    "Todos",
    ...new Set(
      productos
        .map((p) => p.categoria)
        .filter(Boolean)
    ),
  ];

  // Filtro
  const productosFiltrados = productos.filter((producto) => {
    const coincideBusqueda = producto.nombre
      .toLowerCase()
      .includes(busqueda.toLowerCase());

    const coincideCategoria =
      categoriaSeleccionada === "Todos" ||
      producto.categoria === categoriaSeleccionada;

    return coincideBusqueda && coincideCategoria;
  });

    const indiceUltimoProducto =
      paginaActual * productosPorPagina;

    const indicePrimerProducto =
      indiceUltimoProducto - productosPorPagina;

    const productosMostrar =
      productosFiltrados.slice(
        indicePrimerProducto,
        indiceUltimoProducto
      );

    const totalPaginas = Math.ceil(
      productosFiltrados.length /
        productosPorPagina
    );

  if (cargando) {
    return (
      <div className="text-center py-20 text-white text-xl">
        Cargando productos...
      </div>
    );
  }

  return (
    <div>

      {/* BUSCADOR */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Buscar producto..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          className="
            w-full
            p-4
            rounded-xl
            bg-[#2a0d0d]
            border
            border-orange-500
            text-white
            placeholder:text-orange-200
            focus:outline-none
            focus:ring-2
            focus:ring-orange-500
          "
        />
      </div>

      {/* CATEGORÍAS */}
      <div className="flex flex-wrap gap-2 mb-8">
        {categorias.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategoriaSeleccionada(cat)}
            className={`px-4 py-2 rounded-full font-semibold transition ${
              categoriaSeleccionada === cat
                ? "bg-orange-500 text-white"
                : "bg-white text-black"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* PRODUCTOS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

        {productosMostrar.map((prod) => (
          <div
            key={prod.id}
            className="
              bg-[#4a1414]
              border
              border-orange-500/30
              rounded-2xl
              shadow-lg
              shadow-black/40
              p-5
              flex
              flex-col
              justify-between
              hover:scale-[1.02]
              hover:border-orange-500
              transition-all
            "
          >
            <div>
              <h3 className="font-bold text-lg mb-2 text-white">
                {prod.nombre}
              </h3>

              <p className="text-sm text-orange-100">
                Categoría: {prod.categoria || "Sin categoría"}
              </p>

              <p className="text-sm text-orange-200">
                Stock: {prod.stock}
              </p>
            </div>

            <div className="mt-4 flex justify-between items-center">
              <span className="font-black text-orange-600 text-xl">
                ${Number(prod.precio).toLocaleString()}
              </span>

              <button
                onClick={() => agregarAlCarrito(prod)}
                className="
                  bg-orange-500
                  hover:bg-orange-600
                  text-white
                  px-4
                  py-2
                  rounded-xl
                  font-bold
                  transition
                "
              >
                Agregar
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center items-center gap-2 mt-8 flex-wrap">

        <button
          disabled={paginaActual === 1}
          onClick={() =>
            setPaginaActual(paginaActual - 1)
          }
          className="
            px-4 py-2
            bg-orange-500
            text-white
            rounded
            disabled:opacity-40
          "
        >
          ←
        </button>

        {[...Array(totalPaginas)].map((_, index) => (
          <button
            key={index}
            onClick={() =>
              setPaginaActual(index + 1)
            }
            className={`
              px-4 py-2 rounded
              ${
                paginaActual === index + 1
                  ? "bg-orange-500 text-white"
                  : "bg-white text-black"
              }
            `}
          >
            {index + 1}
          </button>
        ))}

        <button
          disabled={paginaActual === totalPaginas}
          onClick={() =>
            setPaginaActual(paginaActual + 1)
          }
          className="
            px-4 py-2
            bg-orange-500
            text-white
            rounded
            disabled:opacity-40
          "
        >
          →
        </button>

      </div>

      {busqueda === "" && productosFiltrados.length > 20 && (
        <div className="text-center mt-8 text-gray-300">
          Mostrando 20 productos. Utiliza el buscador para encontrar más.
        </div>
      )}
    </div>
  );
}