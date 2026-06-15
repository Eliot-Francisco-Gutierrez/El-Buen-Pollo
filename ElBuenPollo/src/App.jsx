import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import Productos from "./components/ProductCard";
import Blog from "./components/Blog";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import CatalogPage from "./pages/CatalogPage";
import LoginPage from "./pages/LoginPage";
import ProtectedRoute from "./data/ProtectedRoute";
import { motion, AnimatePresence } from "framer-motion";
import AdminPage from "./pages/AdminPage";
import LoginAdmin from "./pages/LoginAdmin";

export default function App() {
  return (
    <Router>
      <div className="bg-white antialiased selection:bg-orange-100 selection:text-orange-900">
        <Routes>
          {/* LANDING PAGE PRINCIPAL */}
          <Route path="/" element={
            <AnimatePresence>
              <Header />
              <main>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <div id="inicio"><Hero /></div>
                  <div id="nosotros"><About /></div>
                  <div className="max-w-7xl mx-auto px-6">
                    <div className="h-px bg-linear-to-r from-transparent via-gray-200 to-transparent" />
                  </div>
                  <div id="productos"><Productos /></div>
                  <div id="contacto"><Contact /></div>
                </motion.div>
              </main>
              <Footer />
            </AnimatePresence>
          } />

          {/* VISTA SOLO CATÁLOGO */}
          <Route path="/CatalogPage" element={<CatalogPage />} />
          <Route path="/login" element={<LoginPage />} />

          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/login-admin"
            element={<LoginAdmin />}
          />
          </Routes>
      </div>
    </Router>
  );
}