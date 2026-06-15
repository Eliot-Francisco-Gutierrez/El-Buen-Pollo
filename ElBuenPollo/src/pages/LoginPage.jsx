import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const login = async (e) => {
    e.preventDefault();

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/admin");
    } catch (error) {
      alert("Usuario o contraseña incorrectos");
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-stone-100">
      <form
        onSubmit={login}
        className="bg-white p-8 rounded-xl shadow-lg w-[400px]"
      >
        <h1 className="text-3xl font-bold mb-6">
          Login Administrador
        </h1>

        <input
          type="email"
          placeholder="Correo"
          className="w-full border p-3 rounded mb-4"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Contraseña"
          className="w-full border p-3 rounded mb-4"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="submit"
          className="w-full bg-green-600 text-white p-3 rounded"
        >
          Ingresar
        </button>
      </form>
    </div>
  );
}