import React, { useContext, useEffect, useState } from "react";
import "./CrearProducto.css";
import Button from "@mui/material/Button";
import CustomInput from "../../components/Profile/CustomInput";
import { PizzaContext } from "../../contexts/PizzaContext";
import useUsuairo from "../../hooks/useUsuario";
import {
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
} from "@mui/material";

const CrearProducto = () => {
  // const [idCategoria, setIdCategoria] = useState(null);
  const {
    registrarProducto,
    userProfile,
    getUserData,
    nombre,
    setNombre,
    descripcion_corta,
    setDescripcion_corta,
    descripcion_completa,
    setDescripcion_completa,
    foto,
    setFoto,
    precio,
    setPrecio,
    stock,
    setStock,
    id_categoria,
    setId_categoria,
    id_usuario,
    setId_usuario,
  } = useContext(PizzaContext);
  const usuario = useUsuairo();
  console.log("Nombre:", nombre);
  console.log("Descripción corta:", descripcion_corta);
  console.log("Descripción completa:", descripcion_completa);
  console.log("Foto:", foto);
  console.log("Precio:", precio);
  console.log("Stock:", stock);
  console.log("ID Usuario:", id_usuario);
  console.log("ID Categoría:", id_categoria);
  // const handleImageUpload = (e) => {
  //   const files = Array.from(e.target.files);
  //   setFormData({ ...formData, foto: [...formData.foto, ...files] });
  // };

  useEffect(() => {
    // Llamar a getUserData solo si userProfile está vacío
    if (!userProfile.id_usuario || !userProfile) {
      getUserData();
    } else {
      setId_usuario(userProfile.id_usuario);
    }
  }, [userProfile]);

  const isLogin = () => {
    if (usuario) {
      return (
        <>
          <Button
            onClick={handleSubmit}
            variant="contained"
            color="primary"
            sx={{ width: "100%", p: 1, my: 1 }}
          >
            Agregar producto
          </Button>
        </>
      );
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Aquí puedes agregar la lógica para enviar los datos del formulario al servidor
    if (!userProfile.id_usuario || !userProfile) {
      getUserData();
      setId_usuario(userProfile.id_usuario);
    } else setId_usuario(userProfile.id_usuario);

    await registrarProducto(
      nombre,
      descripcion_corta,
      descripcion_completa,
      foto,
      precio,
      stock,
      id_usuario,
      id_categoria
    );
  };

  const handleChange = (event) => {
    setId_categoria(event.target.value);
  };

  return (
    <div>
      <h2>Crear Producto</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="nombre">Nombre del producto</label>

          <TextField
            fullWidth
            placeholder="Título..."
            id="fullWidth"
            value={nombre}
            onChange={(event) => setNombre(event.target.value)}
            type="text"
            inputProps={{
              maxLength: 50,
            }}
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Descripción del producto</label>

          <TextField
            placeholder="Descripción breve..."
            multiline
            fullWidth
            value={descripcion_corta}
            onChange={(event) => setDescripcion_corta(event.target.value)}
            inputProps={{
              maxLength: 100,
            }}
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Detalles del producto</label>

          <TextField
            placeholder="Descripción completa..."
            multiline
            fullWidth
            value={descripcion_completa}
            onChange={(event) => setDescripcion_completa(event.target.value)}
            inputProps={{
              maxLength: 500,
            }}
          />
        </div>
        <div className="form-group">
          <label htmlFor="price">Precio</label>

          <FormControl fullWidth>
            <OutlinedInput
              startAdornment={
                <InputAdornment position="start">$</InputAdornment>
              }
              value={precio}
              placeholder="Monto..."
              onChange={(event) => setPrecio(event.target.value)}
            />
          </FormControl>
        </div>
        <div className="form-group">
          <label htmlFor="foto">URL de imagen</label>
          <TextField
            fullWidth
            placeholder="Imagen..."
            value={foto}
            onChange={(event) => setFoto(event.target.value)}
            type="text"
            inputProps={{
              maxLength: 500,
            }}
          />
        </div>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="stock">Stock</label>

            <TextField
              type="number"
              placeholder="Cantidad..."
              value={stock}
              onChange={(event) => setStock(event.target.value)}
            />
          </div>
          <div className="form-group product-category">
            <label htmlFor="idCategoria">Categoría</label>
            {/* <select
              id="idCategoria"
              name="idCategoria"
              value={id_categoria}
              onChange={(event) => setId_categoria(event.target.value)}
              style={{ backgroundColor: "white", color: "black" }}
            >
              <option value="1">Deportes</option>
              <option value="2">Mascotas</option>
              <option value="3">Ropa</option>
            </select> */}
            <FormControl fullWidth>
              <Select displayEmpty value={id_categoria} onChange={handleChange}>
                <MenuItem disabled value="0">
                  Seleccionar...
                </MenuItem>
                <MenuItem value="1">Deportes</MenuItem>
                <MenuItem value="2">Mascotas</MenuItem>
                <MenuItem value="3">Ropa</MenuItem>
              </Select>
            </FormControl>
          </div>
        </div>
        {isLogin()}
      </form>
    </div>
  );
};

export default CrearProducto;
