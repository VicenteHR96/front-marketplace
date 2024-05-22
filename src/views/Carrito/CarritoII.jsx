import React, { useContext, useEffect, useState } from "react";
import { PizzaContext } from "../../contexts/PizzaContext";
import QInput from "../../components/QInput/QInput";
import RemoveCircleRounded from "@mui/icons-material/RemoveCircleRounded";
import AddCircleRounded from "@mui/icons-material/AddCircleRounded";
import {
  Avatar,
  Divider,
  IconButton,
  Button,
  Container,
  Box,
  Grid,
  styled,
  Paper,
  Typography,
} from "@mui/material";

import CardPayment from "../../components/CardPayment/CardPayment";
import axios from "axios";
import { Wallet, initMercadoPago } from "@mercadopago/sdk-react";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(3),
  textAlign: "center",
  color: theme.palette.text.secondary,
  boxShadow: "0px 4px 16px rgba(43, 52, 69, 0.1);",
}));

const ItemTotal = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(3),

  color: theme.palette.text.secondary,
  boxShadow: "0px 4px 16px rgba(43, 52, 69, 0.1);",
}));

const CarritoII = () => {
  const { pizzas, setPizzas, total, setTotal } = React.useContext(PizzaContext);

  const handleSuma = (id) => {
    const index = pizzas.findIndex((p) => p.id_producto === id);
    if (index !== -1) {
      const pizzasCarrito = [...pizzas];
      if (typeof pizzasCarrito[index].cantidad !== "undefined") {
        pizzasCarrito[index].cantidad++;
      } else {
        pizzasCarrito[index].cantidad = 1;
      }

      setPizzas(pizzasCarrito);
      setTotal((prev) => prev + pizzasCarrito[index].precio);
    } else {
      console.error(`Producto con id ${id} no encontrado`);
    }
  };

  const handleResta = (id) => {
    const index = pizzas.findIndex((p) => p.id_producto === id);
    if (index !== -1) {
      const pizzasCarrito = [...pizzas];
      if (
        typeof pizzasCarrito[index].cantidad !== "undefined" &&
        pizzasCarrito[index].cantidad > 0
      ) {
        pizzasCarrito[index].cantidad--;
        setPizzas(pizzasCarrito);
        setTotal((prev) => prev - pizzasCarrito[index].precio);
      } else {
        console.error(`Cantidad del producto con id ${id} es inválida`);
      }
    } else {
      console.error(`Producto con id ${id} no encontrado`);
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
    <div style={{ backgroundColor: "#f6f9fc" }}>
      {/* Sección encabezado de vista */}

      <Box component="section" sx={{ p: 2 }}>
        <h2>Detalle del pedido:</h2>
      </Box>

      {/* Sección Items */}
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={0}>
          <Grid item xs={12} md={8} justifycontent="center" alignItems="center">
            <Grid
              container
              spacing={3}
              className="pb-3 m-0 w-100"
              style={{ placeContent: "center" }}
            >
              {pizzas
                .filter(
                  (p) => typeof p.cantidad !== "undefined" && p.cantidad > 0
                )
                .map((p) => {
                  return (
                    <Grid
                      item
                      xs={12}
                      md={12}
                      key={p.id}
                      style={{ paddingRight: "24px" }}
                    >
                      <Item className="d-flex cartItem p-0">
                        <Grid container>
                          <Grid item xs={12} sm={4}>
                            <Item
                              className="d-flex"
                              style={{
                                boxShadow: "none",
                                justifyContent: "center",
                              }}
                            >
                              <Avatar
                                alt="Remy Sharp"
                                src={p.foto}
                                style={{
                                  width: "140px",
                                  height: "140px",
                                  display: "block",
                                }}
                              />
                            </Item>
                          </Grid>

                          <Grid item xs={12} sm={8}>
                            <Item
                              className="w-100 d-flex flex-column text-start"
                              style={{
                                boxShadow: "none",
                                height: "100%",
                                justifyContent: "space-between",
                                padding: "24px 24px 24px 0",
                              }}
                            >
                              <div
                                style={{ paddingLeft: "24px", height: "40px" }}
                                className="d-flex align-items-center"
                              >
                                <Typography variant="h6" className="m-0 p-0">
                                  <b>{p.nombre_producto}</b>
                                </Typography>
                              </div>
                              <div
                                className="d-flex align-items-center"
                                style={{ paddingLeft: "24px", height: "40px" }}
                              >
                                <Box>{`$ ${p.precio} x ${p.cantidad}`}</Box>
                              </div>
                              <div
                                className="Add"
                                style={{
                                  paddingLeft: "calc(-1rem + 28px)",
                                  width: "4rem",
                                }}
                              >
                                <IconButton
                                  color="inherit"
                                  onClick={() => handleResta(p.id_producto)}
                                >
                                  <RemoveCircleRounded
                                    color="error"
                                    className="btn-add"
                                  />
                                </IconButton>{" "}
                                {p.cantidad}
                                <IconButton
                                  color="inherit"
                                  onClick={() => handleSuma(p.id_producto)}
                                >
                                  <AddCircleRounded
                                    color="primary"
                                    className="btn-add"
                                  />
                                </IconButton>
                              </div>
                            </Item>
                          </Grid>
                        </Grid>
                      </Item>
                    </Grid>
                  );
                })}
            </Grid>
          </Grid>

          {/* Sección Botones y total */}

          <Grid
            item
            xs={12}
            md={4}
            justifycontent="center"
            alignItems="center"
            style={{
              placeItems: "baseline",
              marginTop: "0",
              paddingLeft: "0",
              marginLeft: "0",
            }}
          >
            <Grid
              container
              spacing={3}
              className="pb-3 m-0 w-100"
              style={{ placeContent: "center" }}
            >
              <Grid item xs={12} md={12} style={{ paddingRight: "24px" }}>
                <ItemTotal justifycontent="space-between">
                  {" "}
                  <div className="d-flex justify-content-between">
                    <h3 className="pb-0 mb-0">Total:</h3>
                    <h3 className="pb-0 mb-0"> $ {total}</h3>
                  </div>
                </ItemTotal>
                <Divider></Divider>
                <ItemTotal className="text-align-center">
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleBuy}
                    style={{ width: "100%", height: "48px" }}
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
                </ItemTotal>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </div>
    //     <div className="cont-resumen">
    //       <div className="section-resumen">
    //         <h2>Detalle del pedido:</h2>
    //         {pizzas
    //           .filter((p) => typeof p.cantidad !== "undefined" && p.cantidad > 0)
    //           .map((p) => {
    //             return (
    //               <div key={p.id}>
    //                 <hr />
    //                 <div className="tabla-resumen">
    //                   <div className="section-detalle-compra">
    //                     <div className="d-flex justify-content-center w-50">
    //                       <Avatar
    //                         alt="Remy Sharp"
    //                         src={p.foto}
    //                         sx={{ width: 56, height: 56 }}
    //                       />
    //                     </div>
    //                     {/* <Divider orientation="vertical" flexItem /> */}
    //                     <div className="d-flex justify-content-center w-50">
    //                       <h6 className="m-0">{p.nombre_producto}</h6>
    //                     </div>
    //                   </div>
    //                   <div className="section-cantidad ">
    //                     <div className="cart w-50">
    //                       <div className="d-flex justify-content-center">
    //                         <div className="Add">
    //                           <IconButton
    //                             size="large"
    //                             color="inherit"
    //                             onClick={() => handleResta(p.id_producto)}
    //                           >
    //                             <RemoveCircleRounded className="btn-add" />
    //                           </IconButton>{" "}
    //                           {p.cantidad}
    //                           <IconButton
    //                             size="large"
    //                             color="inherit"
    //                             onClick={() => handleSuma(p.id_producto)}
    //                           >
    //                             <AddCircleRounded className="btn-add" />
    //                           </IconButton>
    //                         </div>
    //                       </div>
    //                     </div>
    //                     <div className="w-50 price-item">
    //                       <h6>{`$ ${p.precio * p.cantidad}`}</h6>
    //                     </div>
    //                   </div>
    //                 </div>
    //               </div>
    //             );
    //           })}
    //         <hr />
    //         <div className="total">
    //           {/* Prueba MercadoPago */}
    //           <div className="d-flex flex-column justify-content-center align-items-between">
    //             <Button
    //               variant="contained"
    //               color="primary"
    //               onClick={handleBuy}
    //               style={{ minWidth: "280px", height: "48px" }}
    //             >
    //               Realizar compra
    //             </Button>
    //             {preferenceId && (
    //               <Wallet
    //                 initialization={{
    //                   preferenceId: preferenceId,
    //                   redirectMode: "modal",
    //                 }}
    //                 customization={{ texts: { valueProp: "smart_option" } }}
    //               />
    //             )}
    //           </div>
    //           <h3>Total: $ {total}</h3>
    //         </div>
    //       </div>
    //     </div>
  );
};

export default CarritoII;
