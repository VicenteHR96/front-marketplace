import "bootstrap/dist/css/bootstrap.min.css";
import MyNav from "./components/MyNav/MyNav.jsx";
import { Route, Routes } from "react-router-dom";
import Home from "./views/Home/Home";
import Carrito from "./views/Carrito/Carrito";
import Pizza from "./views/Pizza/Pizza";
import LogSign from "./views/LogSign/LogSign";
import Footer from "./components/Footer/Footer";
import Productos from "./views/Productos/Productos";
import useDeveloper from "./hooks/useDeveloper";
import Context from "./contexts/Context.js";
import CrearProducto from "./views/CrearProducto/CrearProducto.jsx";
import "react-image-crop/dist/ReactCrop.css";
import Perfil from "./views/Perfil/Perfil.jsx";
import CarritoII from "./views/Carrito/CarritoII.jsx";
import Publicaciones from "./views/Publicaciones/Publicaciones.jsx";
import Favoritos from "./views/Favoritos/Favoritos.jsx";

function App() {
  const globalState = useDeveloper();

  return (
    <Context.Provider value={globalState}>
      <MyNav />
      <Routes>
        {/* Público */}
        <Route path="/" element={<Home />} />
        <Route path="/productos/producto/:id" element={<Pizza />} />
        <Route path="/login" element={<LogSign />} />
        <Route path="/productos" element={<Productos />} />
        {/* Privado */}
        <Route path="/carrito" element={<CarritoII />} />
        <Route path="/perfil" element={<Perfil />} />
        <Route path="/crear-producto" element={<CrearProducto />} />
        <Route path="/publicaciones" element={<Publicaciones />} />
        <Route path="/favoritos" element={<Favoritos />} />
        <Route path="*" element={<Home />} />
      </Routes>
      <Footer />
    </Context.Provider>
  );
}

export default App;
