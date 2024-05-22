import React, { useContext, useState, useEffect } from "react";
import RrssBtn from "../rrssBtn/RrssBtn";
import {
  faApple,
  faFacebook,
  faGoogle,
  faXTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ENDPOINT } from "../../config/constans";
import Context from "../../contexts/Context.js";
import {
  loginGoogle,
  loginUsuario,
  onSignOut,
  registroUsuario,
} from "../../credenciales.js";
import useUsuairo from "../../hooks/useUsuario";
import { PizzaContext } from "../../contexts/PizzaContext.jsx";

const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
const initialForm = { email: "docente@desafiolatam.com", password: "123456" };

const SignIn = () => {
  const [isSignUp, setIsSignUp] = useState(true);
  const { userData, setUserData } = useContext(PizzaContext);

  const toggleView = () => {
    setIsSignUp(!isSignUp);
  };

  const usuario = useUsuairo();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    error: "",
  });

  useEffect(() => {
    if (userData.email !== "" && userData.tipoAcceso === "") {
      axios
        .post(ENDPOINT.login, userData)
        .then(({ data }) => {
          window.sessionStorage.setItem("token", data.token);
          const { email, uid } = userData;
          // Utiliza un setTimeout para desacoplar la actualización del estado
          setTimeout(() => {
            setUserData({ email, uid, tipoAcceso: "L" });
          }, 0);
        })
        .catch(({ response: { data } }) => {
          console.error(data);
          // window.alert(`${data.message} 🙁.`);
        });
    }
  }, [userData]);

  const handleSubmit = () => {
    loginUsuario(formData, setFormData, setUserData);
  };

  // setTimeout(() => setFormData({ ...formData, error: "" }), 3000);

  /* Parte de conexión */

  const navigate = useNavigate();
  const [user, setUser] = useState(initialForm);
  const { setDeveloper } = useContext(Context);

  const handleUser = (event) =>
    setUser({ ...user, [event.target.name]: event.target.value });

  const handleForm = (event) => {
    event.preventDefault();

    if (!emailRegex.test(user.email)) {
      return window.alert("El formato del email no es correcto!");
    }

    // axios
    //   .post(ENDPOINT.login, user)
    //   .then(({ data }) => {
    //     window.sessionStorage.setItem("token", data.token);
    //     window.alert("Usuario identificado con éxito 😀.");
    //     setDeveloper({});
    //     navigate("/");
    //   })
    //   .catch(({ response: { data } }) => {
    //     console.error(data);
    //     window.alert(`${data.message} 🙁.`);
    //   });
  };

  return (
    <>
      {usuario ? (
        navigate("/")
      ) : (
        <div className="form-container sign-in">
          <form className="form-logsign" onSubmit={handleForm}>
            <h1>Iniciar sesión</h1>
            <div className="social-icons">
              <RrssBtn
                icon={faFacebook}
                styleIcon={{ color: "3b5998" }}
              ></RrssBtn>
              <RrssBtn icon={faXTwitter}></RrssBtn>
              <RrssBtn
                icon={faGoogle}
                styleIcon={{ color: "#DB4437" }}
              ></RrssBtn>
              <RrssBtn icon={faApple}></RrssBtn>
            </div>
            <span>or use your email password</span>
            <input
              className="form-control"
              type="email"
              placeholder="Correo electrónico"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />

            <input
              className="form-control"
              type="password"
              placeholder="Contraseña"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />

            <a href="#">Forget Your Password?</a>
            <button onClick={handleSubmit}>Iniciar sesión</button>
          </form>
        </div>
      )}
    </>
  );
};

export default SignIn;
