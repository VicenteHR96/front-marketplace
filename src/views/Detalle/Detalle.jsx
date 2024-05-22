import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { PizzaContext } from "../../contexts/PizzaContext";
import { Button } from "react-bootstrap";

const Detalle = () => {
  const { id } = useParams();
  const { pizzas, setPizzas, setTotal } = useContext(PizzaContext);

  const index = pizzas.findIndex((pizza) => pizza.id === id);
  const pizzaX = pizzas[index];

  const handleClick = () => {
    const index = pizzas.findIndex((p) => p.id === pizzaX.id);
    const pizzasCarrito = [...pizzas];
    if (typeof pizzasCarrito[index].cantidad != "undefined") {
      pizzasCarrito[index].cantidad++;
    } else {
      pizzasCarrito[index].cantidad = 1;
    }

    setPizzas(pizzasCarrito);
    setTotal((prev) => prev + pizzaX.price);
  };

  return (
    <div className="cont-detalle">
      <div className="section-detalle">
        <div className="img-detalle">
          <img src={pizzaX.foto} alt={pizzaX.name} />
        </div>
        <div className="detalle-texto">
          <h3>{pizzaX.name[0].toUpperCase() + pizzaX.name.slice(1)}</h3>
          <hr />
          <p style={{ textAlign: "justify" }}>{pizzaX.desc}</p>

          <h6>Ingredientes:</h6>
          <ul style={{ listStyle: "none" }}>
            {pizzaX.ingredients.map((i, index) => {
              return <li key={index}>🍕 {i[0].toUpperCase() + i.slice(1)}</li>;
            })}
          </ul>
          <hr />
          <h3>Precio: $ {pizzaX.price}</h3>
          <Button variant="danger" onClick={handleClick}>
            Añadir 🛒
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Detalle;
