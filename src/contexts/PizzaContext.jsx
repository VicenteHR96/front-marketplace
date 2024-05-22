import React, { createContext, useEffect, useState } from "react";
import { ENDPOINT } from "../config/constans";
import axios from "axios";

export const PizzaContext = createContext({});

const PizzaContextProvider = ({ children }) => {
  //crearproducto
  const [nombre, setNombre] = useState("");
  const [descripcion_corta, setDescripcion_corta] = useState("");
  const [descripcion_completa, setDescripcion_completa] = useState("");
  const [foto, setFoto] = useState("");
  const [precio, setPrecio] = useState(0);
  const [stock, setStock] = useState(0);
  const [id_categoria, setId_categoria] = useState(0);
  const [id_usuario, setId_usuario] = useState(0);
  //
  const [pizzas, setPizzas] = useState([]);
  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [userProfile, setUserProfile] = useState({
    id_usuario: "",
    email: "",
    nombre: "",
    telefono: "",
    sexo: "",
    id_sexo: 4,
    avatar: "",
  });

  const [userData, setUserData] = useState({
    email: "",
    uid: "",
    token: "",
    tipoAcceso: "",
  });
  //Categoria de productos
  const [selectedCategory, setSelectedCategory] = useState(0);
  //Productos de usuario
  const [productUser, setProductUser] = useState([]);
  //Likes
  const [likesUser, setLikesUser] = useState([]);

  const url = "/pizzas.json";

  //Obtener datos de usuario

  const getUserData = async () => {
    try {
      const token = window.sessionStorage.getItem("token");
      console.log(`Token getUserData: ${token}`);
      const response = await axios.get(ENDPOINT.user, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUserProfile(response.data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  React.useEffect(() => {
    const isAuthenticated = sessionStorage.getItem("token") !== null;
    if (isAuthenticated) {
      getUserData();
    }
  }, [userData]);

  React.useEffect(() => {
    if (userProfile.id_usuario) {
      getLike();
    }
  }, [userProfile]);

  // Modificar User Profile

  const updateUserData = async (userProfile) => {
    try {
      const token = window.sessionStorage.getItem("token");
      const response = await axios.put(ENDPOINT.user, userProfile, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUserProfile(response.data);
    } catch (error) {
      console.error("Error updating user data:", error);
    }
  };

  //Obtener productos

  const getData = async (page = 1) => {
    const { data } = await axios.get(ENDPOINT.productos, {
      params: { page, limit: 10 },
    });
    setPizzas(data.datos);
    setTotalPages(data.totalPages); // Assuming the API response includes the total number of pages
    setCurrentPage(page);
  };

  useEffect(() => {
    getData(currentPage);
  }, [currentPage]);

  //Obtener producto detalle

  const getProductDetails = async (id) => {
    try {
      const response = await axios.get(ENDPOINT.producto(id));
      return response.data;
    } catch (error) {
      console.error("Error fetching pizza details:", error);
      return null;
    }
  };

  // Obtener categoría de productos
  const getCategoryProduct = async () => {
    try {
      const response = await axios.get(ENDPOINT.productosCategoria, {
        params: { id_categoria: userProfile.id_usuario }, // Pasa el ID del usuario como parámetro de consulta
      });
      setSelectedCategory(response);
    } catch (error) {
      console.error("Error get categoryProduct:", error);
    }
  };

  // Obtener productos de usuario
  const getProductUser = async () => {
    try {
      console.log("Consolelog de getProductUser:" + userProfile.id_usuario);
      const token = window.sessionStorage.getItem("token");
      const response = await axios.get(ENDPOINT.productosUsuario, {
        headers: { Authorization: `Bearer ${token}` },
        params: { id_usuario: userProfile.id_usuario }, // Pasa el ID del usuario como parámetro de consulta
      });
      setProductUser(response.data.datos);
      console.log(response.data.datos);
    } catch (error) {
      console.error("Error get like:", error);
    }
  };

  React.useEffect(() => {
    if (userProfile.id_usuario) {
      getProductUser();
    }
  }, [userProfile]);

  //Agregar Producto

  const registrarProducto = async (
    nombre,
    descripcion_corta,
    descripcion_completa,
    foto,
    precio,
    stock,
    id_usuario,
    id_categoria
  ) => {
    try {
      const token = window.sessionStorage.getItem("token");
      const post = {
        nombre,
        descripcion_corta,
        descripcion_completa,
        foto,
        precio,
        stock,
        id_usuario,
        id_categoria,
      };
      await axios.post(ENDPOINT.productoRegistro, post, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(post);
      getData();
    } catch (error) {
      console.error("Error Post Producto:", error);
      window.alert(`${error.response.data.message} 🙁.`);
    }
  };

  //Get Like
  const getLike = async () => {
    try {
      console.log("Consolelog de getLike:" + userProfile.id_usuario);
      const token = window.sessionStorage.getItem("token");
      const response = await axios.get(ENDPOINT.productoLike, {
        headers: { Authorization: `Bearer ${token}` },
        params: { id_usuario: userProfile.id_usuario }, // Pasa el ID del usuario como parámetro de consulta
      });
      setLikesUser(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error get like:", error);
    }
  };

  //Post Like

  const postLike = async (id_producto, id_usuario) => {
    try {
      const token = window.sessionStorage.getItem("token");
      await axios.post(
        ENDPOINT.productoLike,
        { id_usuario, id_producto },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
    } catch (error) {
      console.error("Error post like:", error);
    }
  };

  //Delete Like

  const deleteLike = async (id_producto, id_usuario) => {
    try {
      const token = window.sessionStorage.getItem("token");
      await axios.delete(
        ENDPOINT.productoLikeDelete,

        {
          data: { id_usuario, id_producto },
          headers: { Authorization: `Bearer ${token}` },
        }
      );
    } catch (error) {
      console.error("Error delete like:", error);
    }
  };

  return (
    <PizzaContext.Provider
      value={{
        pizzas,
        setPizzas,
        total,
        setTotal,
        currentPage,
        setCurrentPage,
        totalPages,
        getProductDetails,
        registrarProducto,
        getUserData,
        //Datos de usuario
        userData,
        setUserData,
        userProfile,
        setUserProfile,
        updateUserData,
        //Productos de usuario
        productUser,
        setProductUser,
        getProductUser,
        //Likes
        getLike,
        setLikesUser,
        likesUser,
        postLike,
        deleteLike,
        //producto crear
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
      }}
    >
      {children}
    </PizzaContext.Provider>
  );
};

export default PizzaContextProvider;
