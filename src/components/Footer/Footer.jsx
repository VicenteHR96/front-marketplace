import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import "./Footer.css";

function Footer() {
  const navigate = useNavigate();
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    navigate('/productos', { state: { selectedCategory: category } });
  };

  const handleHover = (category) => {
    setHoveredCategory(category);
  };

  const handleHoverLeave = () => {
    setHoveredCategory(null);
  };

  const handlePopoverOpen = (event, category) => {
    setAnchorEl(event.currentTarget);
    handleHover(category);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
    handleHoverLeave();
  };

  const open = Boolean(anchorEl);

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-newsletter">
          <h1 className="footer-newsletter__header h1-footer">
            ¿Quieres recibir nuestras últimas ofertas y novedades?
          </h1>
          <div className="footer-newsletter__form">
            <input type="email" name="email" placeholder="ejemplo@correo.com" />
            <button type="submit" className="submit-btn">
              Suscribirse
            </button>
          </div>
        </div>
        <div className="footer-body">
          <div className="footer-body__content">
            <p>
              Somos un marketplace líder en venta de productos de moda, ropa deportiva y accesorios para mascotas. Ofrecemos una amplia variedad de productos de alta calidad a precios competitivos.
            </p>
          </div>
          <nav className="footer-body__nav">
        <ul className="footer-body__nav-list">
          <li className="footer-body__nav-item">
          Categorías
                <ul className="footer-body__nav-sublist">
                  <li className="footer-body__nav-subitem">
                    <a
                      href="#"
                      className="footer-body__nav-link"
                      onClick={() => handleCategoryClick("Deportes")}
                      onMouseEnter={(e) => handlePopoverOpen(e, "Deportes")}
                      onMouseLeave={handlePopoverClose}
                      aria-owns={open && hoveredCategory === "Deportes" ? "mouse-over-popover" : undefined}
                      aria-haspopup="true"
                    >
                      Deportes
                    </a>
                  </li>
                  <li className="footer-body__nav-subitem">
                    <a
                      href="#"
                      className="footer-body__nav-link"
                      onClick={() => handleCategoryClick("Mascotas")}
                      onMouseEnter={(e) => handlePopoverOpen(e, "Mascotas")}
                      onMouseLeave={handlePopoverClose}
                      aria-owns={open && hoveredCategory === "Mascotas" ? "mouse-over-popover" : undefined}
                      aria-haspopup="true"
                    >
                      Mascotas
                    </a>
                  </li>
                  <li className="footer-body__nav-subitem">
                    <a
                      href="#"
                      className="footer-body__nav-link"
                      onClick={() => handleCategoryClick("Ropa")}
                      onMouseEnter={(e) => handlePopoverOpen(e, "Ropa")}
                      onMouseLeave={handlePopoverClose}
                      aria-owns={open && hoveredCategory === "Ropa" ? "mouse-over-popover" : undefined}
                      aria-haspopup="true"
                    >
                      Ropa
                    </a>
                  </li>
                </ul>
              </li>
              <li className="footer-body__nav-item">
                Sobre nosotros
                <ul className="footer-body__nav-sublist">
                  <li className="footer-body__nav-subitem">
                    <a
                      href="#"
                      className="footer-body__nav-link"
                      onMouseEnter={(e) => handlePopoverOpen(e, "Sobre Nosotros")}
                      onMouseLeave={handlePopoverClose}
                      aria-owns={open && hoveredCategory === "Sobre Nosotros" ? "mouse-over-popover" : undefined}
                      aria-haspopup="true"
                    >
                      Nuestra empresa
                    </a>
                  </li>
                  <li className="footer-body__nav-subitem">
                    <a
                      href="#"
                      className="footer-body__nav-link"
                      onMouseEnter={(e) => handlePopoverOpen(e, "Sobre Nosotros")}
                      onMouseLeave={handlePopoverClose}
                      aria-owns={open && hoveredCategory === "Sobre Nosotros" ? "mouse-over-popover" : undefined}
                      aria-haspopup="true"
                    >
                      Trabaja con nosotros
                    </a>
                  </li>
                  <li className="footer-body__nav-subitem">
                    <a
                      href="#"
                      className="footer-body__nav-link"
                      onMouseEnter={(e) => handlePopoverOpen(e, "Sobre Nosotros")}
                      onMouseLeave={handlePopoverClose}
                      aria-owns={open && hoveredCategory === "Sobre Nosotros" ? "mouse-over-popover" : undefined}
                      aria-haspopup="true"
                    >
                      Sostenibilidad
                    </a>
                  </li>
                </ul>
              </li>
              <li className="footer-body__nav-item">
                Ayuda
                <ul className="footer-body__nav-sublist">
                  <li className="footer-body__nav-subitem">
                    <a
                      href="#"
                      className="footer-body__nav-link"
                      onMouseEnter={(e) => handlePopoverOpen(e, "Ayuda")}
                      onMouseLeave={handlePopoverClose}
                      aria-owns={open && hoveredCategory === "Ayuda" ? "mouse-over-popover" : undefined}
                      aria-haspopup="true"
                    >
                      Preguntas frecuentes
                    </a>
                  </li>
                  <li className="footer-body__nav-subitem">
                    <a
                      href="#"
                      className="footer-body__nav-link"
                      onMouseEnter={(e) => handlePopoverOpen(e, "Ayuda")}
                      onMouseLeave={handlePopoverClose}
                      aria-owns={open && hoveredCategory === "Ayuda" ? "mouse-over-popover" : undefined}
                      aria-haspopup="true"
                    >
                      Contacto
                    </a>
                  </li>
                  <li className="footer-body__nav-subitem">
                    <a
                      href="#"
                      className="footer-body__nav-link"
                      onMouseEnter={(e) => handlePopoverOpen(e, "Ayuda")}
                      onMouseLeave={handlePopoverClose}
                      aria-owns={open && hoveredCategory === "Ayuda" ? "mouse-over-popover" : undefined}
                      aria-haspopup="true"
                    >
                      Devoluciones y cambios
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
          </nav>
        </div>
        <div className="footer-attribute">
          <p>&copy; TuMarketplace 2024. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
