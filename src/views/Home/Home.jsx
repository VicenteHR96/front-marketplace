import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Banner from "../../components/Banner/Banner";
import Gallery from "../../components/Gallery/Gallery";
import CategoriesCard from "../../components/CategoriesCards/CategoriesCards.jsx";
import { PizzaContext } from "../../contexts/PizzaContext.jsx";

const Home = () => {
  const navigate = useNavigate();
  const { pizzas } = useContext(PizzaContext);

  const handleCategoryClick = (category) => {
    navigate("/productos", { state: { selectedCategory: category } });
  };

  return (
    <>
      <Banner />
      <CategoriesCard onCategoryClick={handleCategoryClick} />
      <div className="cont-gallery">
        <Gallery pizzas={pizzas} />
      </div>
    </>
  );
};

export default Home;
