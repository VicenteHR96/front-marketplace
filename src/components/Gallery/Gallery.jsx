import React from "react";
import ProductCard from "../MyCard/ProductCard";
import { Pagination } from "@mui/material";
import { PizzaContext } from "../../contexts/PizzaContext";

const Gallery = ({ pizzas }) => {
  const { currentPage, setCurrentPage, totalPages } =
    React.useContext(PizzaContext);

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  return (
    <div className="gallery">
      {pizzas.map((pizza) => (
        <ProductCard pizza={pizza} key={pizza.id} />
      ))}
      <div className="w-100 d-flex justify-content-center">
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={handlePageChange}
          size="large"
        />
      </div>
    </div>
  );
};

export default Gallery;
