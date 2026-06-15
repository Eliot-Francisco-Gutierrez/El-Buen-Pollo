// src/components/ImportExcel.jsx

import * as XLSX from "xlsx";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase";

export default function ImportExcel() {

  const importar = async () => {

    try {

      const response = await fetch(
        "/Productos_Categorizados.xlsx"
      );

      const data = await response.arrayBuffer();

      const workbook = XLSX.read(data);

      const worksheet =
        workbook.Sheets[
          workbook.SheetNames[0]
        ];

      const productos =
        XLSX.utils.sheet_to_json(
          worksheet
        );

      let cargados = 0;
        alert(`Voy a importar ${productos.length} productos`);
        console.log(productos.length);
        for (const producto of productos) {

        await addDoc(collection(db, "productos"), {
            codigo: producto.Codigo || "",
            nombre: producto.Nombre || "",
            stock: Number(producto.Stock) || 0,
            precio: Number(producto["Precio Venta"]) || 0,
            categoria: producto.Categoria || "General",
        });

        cargados++;
        }

      alert(
        `${cargados} productos importados`
      );

    } catch (error) {

      console.error(error);

      alert(
        "Error al importar"
      );
    }
  };

  return (
    <button
      onClick={importar}
      className="
      bg-purple-600
      text-white
      px-4
      py-2
      rounded
      "
    >
      Importar Excel
    </button>
  );
}