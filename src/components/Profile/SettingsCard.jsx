// IMPORTS
import React, { useContext, useState } from "react";
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import CardContent from "@mui/material/CardContent";
import { Tabs, Tab } from "@mui/material";
import UserDatos from "./UserDatos";
import DataTable from "../DataTable/DataTable";
import { PizzaContext } from "../../contexts/PizzaContext";

//APP
const SettingsCard = (props) => {
  const { getProductUser, getLike } = useContext(PizzaContext);
  //TAB STATES
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  //RETURN
  return (
    <Card variant="outlined" sx={{ height: "100%", width: "100%" }}>
      {/* TABS */}
      <br></br>
      <Tabs
        value={value}
        onChange={handleChange}
        textColor="primary"
        indicatorColor="primary"
      >
        <Tab label="Datos" />
        <Tab label="Publicaciones" />
        <Tab label="Favoritos" />
      </Tabs>
      <Divider></Divider>

      {/* MAIN CONTENT CONTAINER */}
      <CardContent
        sx={{
          p: 0,
          textAlign: { xs: "center", md: "start" },
        }}
        style={{ maxWidth: "100vw", paddingBottom: "0" }}
      >
        {/* FIELDS */}
        {value === 0 && (
          <div style={{ padding: "2rem" }}>
            <UserDatos
              firstName={props.firstName}
              lastName={props.lastName}
              midName={props.midName}
              phone={props.phone}
              email={props.email}
              pass={props.pass}
              gender={props.gender}
              setText={props.setText}
            />
          </div>
        )}

        {value === 1 && (
          <form style={{ margin: 0 }}>
            {/* Componentes para la pestaña "Publicaciones" */}
            <DataTable
              options={["Editar", "Borrar"]}
              getData={getProductUser}
            ></DataTable>{" "}
            {/*Conectar a Publicaciones de usuario*/}
          </form>
        )}
        {value === 2 && (
          <form style={{ margin: 0 }}>
            {/* Componentes para la pestaña "Favoritos" */}
            <DataTable
              options={["Quitar de Favoritos"]}
              getData={getLike}
            ></DataTable>{" "}
            {/*Conectar a Favoritos de usuario*/}
          </form>
        )}
      </CardContent>
    </Card>
  );
};

export default SettingsCard;
