import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { signOut } from "firebase/auth";
import { auth, db } from "../firebase";
import ImportExcel from "../components/ImportExcel";

export default function AdminPage() {
  const [busqueda, setBusqueda] = useState("");
  const [filtroCategoria, setFiltroCategoria] = useState("Todos");
  const [productos, setProductos] = useState([]);
  const [editando, setEditando] = useState(null);

  const [codigo, setCodigo] = useState("");
  const [nombre, setNombre] = useState("");
  const [precio, setPrecio] = useState("");
  const [stock, setStock] = useState("");
  const [categoria, setCategoria] = useState("");

  const cerrarSesion = async () => {
    await signOut(auth);
  };

  const cargarProductos = async () => {
    try {
      const snapshot = await getDocs(collection(db, "productos"));

      const lista = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setProductos(lista);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    cargarProductos();
  }, []);

  const agregarProducto = async (e) => {
    e.preventDefault();

    if (
      !codigo ||
      !nombre ||
      !precio ||
      !stock ||
      !categoria
    ) {
      alert("Completa todos los campos");
      return;
    }

    try {
      await addDoc(collection(db, "productos"), {
        codigo,
        nombre,
        precio: Number(precio),
        stock: Number(stock),
        categoria,
      });

      setCodigo("");
      setNombre("");
      setPrecio("");
      setStock("");
      setCategoria("");

      await cargarProductos();

      alert("Producto agregado correctamente");
    } catch (error) {
      console.error(error);
      alert("Error al agregar producto");
    }
  };

  const eliminarProducto = async (id) => {
    if (!window.confirm("¿Eliminar producto?")) return;

    try {
      await deleteDoc(doc(db, "productos", id));
      cargarProductos();
    } catch (error) {
      console.error(error);
    }
  };

  const actualizarProducto = async () => {
    try {
      await updateDoc(
        doc(db, "productos", editando.id),
        {
          codigo: editando.codigo,
          nombre: editando.nombre,
          precio: Number(editando.precio),
          stock: Number(editando.stock),
          categoria: editando.categoria,
        }
      );

      setEditando(null);
      cargarProductos();

      alert("Producto actualizado");
    } catch (error) {
      console.error(error);
      alert("Error al actualizar");
    }
  };

  const productosFiltrados = productos.filter((producto) => {
  const texto = busqueda.toLowerCase();

  const coincideBusqueda =
    producto.nombre?.toLowerCase().includes(texto) ||
    producto.codigo?.toLowerCase().includes(texto);

  const coincideCategoria =
    filtroCategoria === "Todos" ||
    producto.categoria === filtroCategoria;

    return coincideBusqueda && coincideCategoria;
  });
  return (
    <div className="min-h-screen bg-stone-100 p-8">
      <div className="max-w-7xl mx-auto">

        {/* HEADER */}

        <div className="flex flex-wrap gap-3 justify-between items-center mb-8">

          <h1 className="text-4xl font-black">
            Panel Administrador
          </h1>

          <div className="flex gap-3">
            <button
              onClick={cerrarSesion}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
            >
              Cerrar Sesión
            </button>

          </div>
        </div>

        {/* FORMULARIO */}
            <div className="bg-white p-4 rounded-xl shadow mb-6">

      <h2 className="font-bold text-xl mb-4">
        Buscar Productos
      </h2>

      <div className="grid md:grid-cols-2 gap-4">

        <input
          type="text"
          placeholder="Buscar por nombre o código..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          className="border p-3 rounded-lg"
        />

        <select
          value={filtroCategoria}
          onChange={(e) =>
            setFiltroCategoria(e.target.value)
          }
          className="border p-3 rounded-lg"
        >
          <option value="Todos">
            Todas las categorías
          </option>

          <option value="Almacen">
            Almacén
          </option>

          <option value="Carnes">
            Carnes
          </option>

          <option value="Pollo">
            Pollo
          </option>

          <option value="Bebidas">
            Bebidas
          </option>

          <option value="Limpieza">
            Limpieza
          </option>

          <option value="Golosinas">
            Golosinas
          </option>

          <option value="Congelados">
            Congelados
          </option>

          <option value="Fiambres">
            Fiambres
          </option>
        </select>

      </div>

      <div className="mt-4 text-gray-600">
        Productos encontrados:{" "}
        <span className="font-bold">
          {productosFiltrados.length}
        </span>
      </div>

    </div>
        <form
          onSubmit={agregarProducto}
          className="bg-white p-6 rounded-xl shadow mb-8"
        >
          <h2 className="text-2xl font-bold mb-5">
            Agregar Producto
          </h2>

          <div className="grid md:grid-cols-3 gap-4">

            <input
              type="text"
              placeholder="Código"
              value={codigo}
              onChange={(e) =>
                setCodigo(e.target.value)
              }
              className="border p-3 rounded-lg"
            />

            <input
              type="text"
              placeholder="Nombre"
              value={nombre}
              onChange={(e) =>
                setNombre(e.target.value)
              }
              className="border p-3 rounded-lg"
            />

            <input
              type="number"
              placeholder="Precio"
              value={precio}
              onChange={(e) =>
                setPrecio(e.target.value)
              }
              className="border p-3 rounded-lg"
            />

            <input
              type="number"
              placeholder="Stock"
              value={stock}
              onChange={(e) =>
                setStock(e.target.value)
              }
              className="border p-3 rounded-lg"
            />

            <select
              value={categoria}
              onChange={(e) =>
                setCategoria(e.target.value)
              }
              className="border p-3 rounded-lg"
            >
              <option value="">
                Seleccionar categoría
              </option>

              <option value="Almacen">
                Almacén
              </option>

              <option value="Carnes">
                Carnes
              </option>

              <option value="Pollo">
                Pollo
              </option>

              <option value="Bebidas">
                Bebidas
              </option>

              <option value="Limpieza">
                Limpieza
              </option>

              <option value="Golosinas">
                Golosinas
              </option>

              <option value="Congelados">
                Congelados
              </option>

              <option value="Fiambres">
                Fiambres
              </option>
            </select>

          </div>

          <button
            type="submit"
            className="mt-5 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-bold"
          >
            Guardar Producto
          </button>
        </form>

        {/* TABLA */}

        <div className="bg-white rounded-xl shadow overflow-hidden">

          <table className="w-full">

            <thead className="bg-stone-200">
              <tr>
                <th className="text-left p-4">
                  Código
                </th>

                <th className="text-left p-4">
                  Nombre
                </th>

                <th className="text-left p-4">
                  Precio
                </th>

                <th className="text-left p-4">
                  Stock
                </th>

                <th className="text-left p-4">
                  Categoría
                </th>

                <th className="text-left p-4">
                  Acciones
                </th>
              </tr>
            </thead>

            <tbody>
              {productosFiltrados.map((producto) => (
                <tr
                  key={producto.id}
                  className="border-b hover:bg-stone-50"
                >
                  <td className="p-4">
                    {producto.codigo}
                  </td>

                  <td className="p-4">
                    {producto.nombre}
                  </td>

                  <td className="p-4">
                    $
                    {Number(
                      producto.precio
                    ).toLocaleString()}
                  </td>

                  <td className="p-4">
                    {producto.stock}
                  </td>

                  <td className="p-4">
                    {producto.categoria ||
                      "Sin categoría"}
                  </td>

                  <td className="p-4 flex gap-2">
                    <button
                      onClick={() =>
                        setEditando(producto)
                      }
                      className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                    >
                      Editar
                    </button>

                    <button
                      onClick={() =>
                        eliminarProducto(
                          producto.id
                        )
                      }
                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>

          </table>

        </div>

        {/* MODAL EDITAR */}

        {editando && (
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">

            <div className="bg-white p-6 rounded-xl w-[500px]">

              <h2 className="text-2xl font-bold mb-4">
                Editar Producto
              </h2>

              <input
                className="border p-3 w-full mb-3"
                placeholder="Código"
                value={editando.codigo || ""}
                onChange={(e) =>
                  setEditando({
                    ...editando,
                    codigo: e.target.value,
                  })
                }
              />

              <input
                className="border p-3 w-full mb-3"
                placeholder="Nombre"
                value={editando.nombre}
                onChange={(e) =>
                  setEditando({
                    ...editando,
                    nombre: e.target.value,
                  })
                }
              />

              <input
                className="border p-3 w-full mb-3"
                placeholder="Precio"
                value={editando.precio}
                onChange={(e) =>
                  setEditando({
                    ...editando,
                    precio: e.target.value,
                  })
                }
              />

              <input
                className="border p-3 w-full mb-3"
                placeholder="Stock"
                value={editando.stock}
                onChange={(e) =>
                  setEditando({
                    ...editando,
                    stock: e.target.value,
                  })
                }
              />

              <select
                className="border p-3 w-full mb-4"
                value={editando.categoria || ""}
                onChange={(e) =>
                  setEditando({
                    ...editando,
                    categoria: e.target.value,
                  })
                }
              >
                <option value="">
                  Seleccionar categoría
                </option>

                <option value="Almacen">
                  Almacén
                </option>

                <option value="Carnes">
                  Carnes
                </option>

                <option value="Pollo">
                  Pollo
                </option>

                <option value="Bebidas">
                  Bebidas
                </option>

                <option value="Limpieza">
                  Limpieza
                </option>

                <option value="Golosinas">
                  Golosinas
                </option>

                <option value="Congelados">
                  Congelados
                </option>

                <option value="Fiambres">
                  Fiambres
                </option>
              </select>

              <div className="flex gap-3">

                <button
                  onClick={actualizarProducto}
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
                >
                  Guardar
                </button>

                <button
                  onClick={() =>
                    setEditando(null)
                  }
                  className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded"
                >
                  Cancelar
                </button>

              </div>

            </div>

          </div>
        )}

      </div>
    </div>
  );
}