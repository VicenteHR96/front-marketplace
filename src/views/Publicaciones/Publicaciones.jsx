import React, { useContext, useEffect } from "react";
import { PizzaContext } from "../../contexts/PizzaContext";
import ProductCard from "../../components/MyCard/ProductCard";
import { Typography } from "@mui/material";
import SentimentDissatisfiedRoundedIcon from "@mui/icons-material/SentimentDissatisfiedRounded";

const Publicaciones = () => {
  const { getProductUser, productUser, userProfile } = useContext(PizzaContext);

  return (
    <div className="p-5">
      <div className="w-100 mb-4 text-center">
        <h2>Mis publicaciones</h2>
      </div>
      {productUser.length == 0 ? (
        <div>
          <div className="w-100 d-flex justify-content-center p-4">
            <img
              src="https://static.thenounproject.com/png/5603289-200.png"
              alt="No publications"
              style={{ filter: "opacity(0.6)" }}
            />
          </div>
          <div className="w-100 d-flex align-items-center justify-content-center gap-2">
            <Typography color="text.secondary" variant="h4">
              Aún no has agregado ninguna publicación
            </Typography>
            <SentimentDissatisfiedRoundedIcon
              style={{ color: "rgba(0, 0, 0, 0.6)" }}
              fontSize="large"
            ></SentimentDissatisfiedRoundedIcon>
          </div>
        </div>
      ) : (
        <div className="gallery">
          {productUser.map((p) => {
            return <ProductCard pizza={p} key={p.id}></ProductCard>;
          })}
        </div>
      )}
    </div>
  );
};

export default Publicaciones;
