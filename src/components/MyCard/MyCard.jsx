import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import AddShoppingCartRoundedIcon from "@mui/icons-material/AddShoppingCartRounded";
import { useNavigate } from "react-router-dom";
import { PizzaContext } from "../../contexts/PizzaContext";
import Fav from "../Fav/Fav";

const AddtoCart = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function ProductCard({ pizza }) {
  const { pizzas, setPizzas, setTotal } = React.useContext(PizzaContext);
  const { getProductDetails } = React.useContext(PizzaContext);
  const navigate = useNavigate();

  function truncateText(text, maxLength) {
    if (text.length > maxLength) {
      return text.slice(0, maxLength) + "...";
    } else {
      return text;
    }
  }

  const handleClick = (event) => {
    event.stopPropagation();
    const index = pizzas.findIndex((p) => p.id === pizza.id);
    const pizzasCarrito = [...pizzas];
    if (typeof pizzasCarrito[index].cantidad != "undefined") {
      pizzasCarrito[index].cantidad++;
    } else {
      pizzasCarrito[index].cantidad = 1;
    }
  };

  const handleDetalle = async () => {
    const pizzaDetails = await getProductDetails(pizza.id);
    if (pizzaDetails) {
      navigate(`/productos/producto/${pizza.id}`, { state: { pizzaDetails } });
    } else {
      // Handle error or show feedback to the user
    }
  };

  return (
    <Card
      sx={{ width: 345, height: 450 }}
      className="card"
      onClick={handleDetalle}
    >
      <div className="d-flex flex-column justify-content-between h-100">
        <div className="cont-imgcard">
          <CardMedia
            component="img"
            height="194"
            image={`/public/${pizza.foto}`}
            alt={pizza.nombre_producto}
            className="img-card"
          />
        </div>

        <div className="d-flex justify-content-between">
          <CardHeader title={truncateText(pizza.nombre_producto, 35)} />
          <Typography
            variant="body2"
            color="text.secondary"
            className="MuiCardHeader-root css-185gdzj-MuiCardHeader-root"
          >
            {`$${pizza.precio}`}
          </Typography>
        </div>
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {truncateText(pizza.descripcion_corta, 100)}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <Fav></Fav>
          <AddtoCart onClick={handleClick} aria-label="Añadir al carrito">
            <AddShoppingCartRoundedIcon />
          </AddtoCart>
        </CardActions>
      </div>
    </Card>
  );
}
