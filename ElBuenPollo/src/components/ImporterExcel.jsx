import React, { useState } from 'react';
import { read, utils } from 'xlsx';
import { collection, writeBatch, doc } from 'firebase/firestore';
import { db } from '../firebase';

export default function ImporterExcel() {
  const [cargando, setCargando] = useState(false);
  const [mensaje, setMensaje] = useState("");

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setCargando(true);
    setMensaje("Leyendo archivo...");

    const reader = new FileReader();
    reader.onload = async (event) => {
      try {
        const workbook = read(event.target.result, { type: "binary" });
        const sheetName = workbook.SheetNames[0];
        const data = utils.sheet_to_json(workbook.Sheets[sheetName]);

        setMensaje(`Subiendo ${data.length} productos a Firebase...`);

        const lotes = [];
        let batch = writeBatch(db);
        let contador = 0;

        data.forEach((item) => {

          const docRef = item.Codigo 
            ? doc(db, "productos", String(item.Codigo))
            : doc(collection(db, "productos"));

          batch.set(docRef, {
            nombre: item.Nombre || "Sin nombre",
            stock: Number(item.Stock) || 0,
            precio: Number(item['Precio Venta']) || 0,
            codigo: item.Codigo ? String(item.Codigo) : ""
          });

          contador++;
          if (contador === 400) { // Límite de seguridad
            lotes.push(batch.commit());
            batch = writeBatch(db);
            contador = 0;
          }
        });

        if (contador > 0) {
          lotes.push(batch.commit());
        }

        await Promise.all(lotes);
        setMensaje("✅ ¡Los 670 productos se subieron exitosamente a Firebase!");
      } catch (error) {
        console.error("Error subiendo datos:", error);
        setMensaje("❌ Hubo un error al subir los datos.");
      }
      setCargando(false);
    };
    reader.readAsBinaryString(file);
  };

  return (
    <div className="p-8 bg-stone-100 rounded-xl max-w-md mx-auto my-12 text-center border-2 border-dashed border-stone-300">
      <h2 className="text-xl font-bold mb-4 text-stone-800">Cargar Inventario a BD</h2>
      <p className="text-sm text-stone-500 mb-6">Selecciona el archivo "ListaProductos (2).xlsx"</p>
      
      <input 
        type="file" 
        accept=".xlsx, .xls" 
        onChange={handleFileUpload}
        className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-orange-50 file:text-orange-700 hover:file:bg-orange-100 mb-4"
        disabled={cargando}
      />
      
      {mensaje && (
        <div className={`mt-4 font-bold ${cargando ? 'text-blue-500' : 'text-green-600'}`}>
          {mensaje}
        </div>
      )}
    </div>
  );
}