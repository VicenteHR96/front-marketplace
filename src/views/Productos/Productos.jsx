import React, { useEffect, useState, useContext } from "react";
import { useLocation } from "react-router-dom";
import Gallery from "../../components/Gallery/Gallery";
import Filtros from "../../components/Filtros/Filtros.jsx";
import { PizzaContext } from "../../contexts/PizzaContext.jsx";

const Productos = () => {
  const location = useLocation();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const { pizzas, getData } = useContext(PizzaContext);

  useEffect(() => {
    if (location.state && location.state.selectedCategory) {
      setSelectedCategory(location.state.selectedCategory);
    }
  }, [location.state]);

  useEffect(() => {
    getData; // Carga inicial de productos
  }, []);

  const handleCategorySelect = (categories) => {
    setSelectedCategory(categories.length === 1 ? categories[0] : null);
  };

  // Filtrar pizzas por categoría seleccionada
  const filteredPizzas = selectedCategory
    ? pizzas.filter((pizza) => pizza.categoria === selectedCategory)
    : pizzas;

  return (
    <div className="productos">
      <section className="filtros px-4 mt-4 d-flex flex-column align-items-center mb-5">
        <h4>Filtros</h4>
        <Filtros
          onCategorySelect={handleCategorySelect}
          initialCategory={selectedCategory}
        />
      </section>
      <section>
        <Gallery pizzas={filteredPizzas} />
      </section>
    </div>
  );
};

export default Productos;
