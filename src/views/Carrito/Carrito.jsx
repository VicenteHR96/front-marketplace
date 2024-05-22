import React, { useContext, useEffect, useState } from "react";
import { PizzaContext } from "../../contexts/PizzaContext";
import QInput from "../../components/QInput/QInput";
import RemoveCircleRounded from "@mui/icons-material/RemoveCircleRounded";
import AddCircleRounded from "@mui/icons-material/AddCircleRounded";
import { Avatar, Divider, IconButton, Button } from "@mui/material";
import CardPayment from "../../components/CardPayment/CardPayment";
import axios from "axios";
import { Wallet, initMercadoPago } from "@mercadopago/sdk-react";

const Carrito = () => {
  const { pizzas, setPizzas, total, setTotal } = React.useContext(PizzaContext);

  const handleSuma = (id) => {
    const index = pizzas.findIndex((p) => p.id_producto === id);
    if (index !== -1) {
      const pizzasCarrito = [...pizzas];
      if (typeof pizzasCarrito[index].cantidad !== "undefined") {
        // Si la cantidad está definida, la incrementamos
        pizzasCarrito[index].cantidad++;
      } else {
        // Si la cantidad no está definida, la establecemos en 1
        pizzasCarrito[index].cantidad = 1;
      }
      setPizzas(pizzasCarrito);
      setTotal((prev) => prev + pizzasCarrito[index].precio);
    }
  };

  const handleResta = (id_producto) => {
    const index = pizzas.findIndex((p) => p.id_producto === id_producto);
    if (index !== -1) {
      const pizzasCarrito = [...pizzas];
      if (pizzasCarrito[index].cantidad > 0) {
        pizzasCarrito[index].cantidad--;
        setPizzas(pizzasCarrito);
        setTotal((prev) => prev - pizzasCarrito[index].precio);
      }
    }
  };

  //Prueba MercadoPago

  const [preferenceId, setPreferenceId] = useState(null);

  useEffect(() => {
    initMercadoPago("TEST-7363d557-fdcf-4462-b677-e5edc30fb58c", {
      locale: "es-CL",
    });
  }, []);

  const createPreference = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/create_preference",
        {
          title: "Ejemplo title",
          quantity: 1,
          price: 990,
        }
      );
      const { id } = response.data;
      return id;
    } catch (error) {
      console.log("Error de CardPayment Axios:" + error);
    }
  };

  const handleBuy = async () => {
    const id = await createPreference();
    if (id) {
      setPreferenceId(id);
    }
  };

  return (
    <div className="cont-resumen">
      <div className="section-resumen">
        <h2>Detalle del pedido:</h2>
        {pizzas
          .filter((p) => typeof p.cantidad !== "undefined" && p.cantidad > 0)
          .map((p) => {
            return (
              <div key={p.id}>
                <hr />
                <div className="tabla-resumen">
                  <div className="section-detalle-compra">
                    <div className="d-flex justify-content-center w-50">
                      <Avatar
                        alt="Remy Sharp"
                        src={p.foto}
                        sx={{ width: 56, height: 56 }}
                      />
                    </div>
                    {/* <Divider orientation="vertical" flexItem /> */}
                    <div className="d-flex justify-content-center w-50">
                      <h6 className="m-0">{p.nombre_producto}</h6>
                    </div>
                  </div>
                  <div className="section-cantidad ">
                    <div className="cart w-50">
                      <div className="d-flex justify-content-center">
                        <div className="Add">
                          <IconButton
                            size="large"
                            color="inherit"
                            onClick={() => handleResta(p.id_producto)}
                          >
                            <RemoveCircleRounded className="btn-add" />
                          </IconButton>{" "}
                          {p.cantidad}
                          <IconButton
                            size="large"
                            color="inherit"
                            onClick={() => handleSuma(p.id_producto)}
                          >
                            <AddCircleRounded className="btn-add" />
                          </IconButton>
                        </div>
                      </div>
                    </div>
                    <div className="w-50 price-item">
                      <h6>{`$ ${p.precio * p.cantidad}`}</h6>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        <hr />
        <div className="total">
          {/* Prueba MercadoPago */}
          <div className="d-flex flex-column justify-content-center align-items-between">
            <Button
              variant="contained"
              color="primary"
              onClick={handleBuy}
              style={{ minWidth: "280px", height: "48px" }}
            >
              Realizar compra
            </Button>
            {preferenceId && (
              <Wallet
                initialization={{
                  preferenceId: preferenceId,
                  redirectMode: "modal",
                }}
                customization={{ texts: { valueProp: "smart_option" } }}
              />
            )}
          </div>
          <h3>Total: $ {total}</h3>
        </div>
      </div>
    </div>
  );
};

export default Carrito;
