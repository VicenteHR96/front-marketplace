import React, { useContext, useEffect } from "react";
import { PizzaContext } from "../../contexts/PizzaContext";
import ProductCard from "../../components/MyCard/ProductCard";
import { Typography } from "@mui/material";
import SentimentDissatisfiedRoundedIcon from "@mui/icons-material/SentimentDissatisfiedRounded";

const Favoritos = () => {
  const { getLike, likesUser, userProfile, pizzas, getData } =
    useContext(PizzaContext);

  React.useEffect(() => {
    if (userProfile.id_usuario) {
      getLike();
    }
  }, [userProfile]);

  useEffect(() => {
    if (!pizzas.id_producto) {
      getData;
    }
  }, [pizzas]);

  return (
    <div className="p-5">
      <div className="w-100 mb-4 text-center">
        <h2>Mis favoritos</h2>
      </div>
      {likesUser.length == 0 ? (
        <div>
          <div className="w-100 d-flex justify-content-center p-4">
            <img
              src="https://static.thenounproject.com/png/3900390-200.png"
              alt="Dislike"
              style={{ filter: "opacity(0.6)" }}
            />
          </div>
          <div className="w-100 d-flex align-items-center justify-content-center gap-2">
            <Typography color="text.secondary" variant="h4">
              Aún no has agregado productos a tus favoritos
            </Typography>
            <SentimentDissatisfiedRoundedIcon
              style={{ color: "rgba(0, 0, 0, 0.6)" }}
              fontSize="large"
            ></SentimentDissatisfiedRoundedIcon>
          </div>
        </div>
      ) : (
        <div className="gallery">
          {likesUser.map((p) => {
            return <ProductCard pizza={p} key={p.id_producto}></ProductCard>;
          })}
        </div>
      )}
    </div>
  );
};

export default Favoritos;
