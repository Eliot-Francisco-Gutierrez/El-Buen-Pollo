// src/pages/LoginAdmin.jsx

import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

export default function LoginAdmin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const login = async (e) => {
    e.preventDefault();

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/admin");
    } catch {
      setError("Credenciales incorrectas");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-stone-100">
      <form
        onSubmit={login}
        className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md"
      >
        <h1 className="text-3xl font-bold mb-6">
          Acceso Administrador
        </h1>

        <input
          type="email"
          placeholder="Correo"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border p-3 rounded mb-4"
        />

        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border p-3 rounded mb-4"
        />

        {error && (
          <p className="text-red-500 mb-4">{error}</p>
        )}

        <button
          className="w-full bg-green-600 text-white py-3 rounded"
        >
          Ingresar
        </button>
      </form>
    </div>
  );
}