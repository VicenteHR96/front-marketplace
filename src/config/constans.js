// export const URLBASE = "http://localhost:3000";
export const URLBASE = "https://api-marketplace-xy61.onrender.com";

export const ENDPOINT = {
  login: `${URLBASE}/login`, //Conectado
  registro: `${URLBASE}/usuario/registro`, //Conectado
  user: `${URLBASE}/usuario/profile`, //Conectado
  productos: `${URLBASE}/productos`, //Conectado
  //nuevo
  productosCategoria: `${URLBASE}/productos/categoria`, //Lunes 13
  producto: (id) => `${URLBASE}/productos/producto/${id}`, //Conectado
  productosUsuario: `${URLBASE}/productos/usuario`, //Conectado (Falta unir parámetros de paginación y limites en Datatable)
  productoRegistro: `${URLBASE}/producto`, //Conectado
  productoLike: `${URLBASE}/producto/like`, //Conectado
  productoLikeDelete: `${URLBASE}/producto/like`, //Conectado
  productoMensajes: (id) => `${URLBASE}/producto/mensajes/${id}`,
  productoMensaje: `${URLBASE}/producto/mensaje`,
};

// Put del usuario, editar datos de usuarios //Conectado
// Registro firebase y conexión con base de datos
