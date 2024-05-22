import React, { useContext } from "react";
import ProfileCard from "../../components/Profile/ProfileCard";
import ProfileBase from "../../components/Profile/ProfileBase";
import LogSign from "../LogSign/LogSign";
import Context from "../../contexts/Context";
import useUsuairo from "../../hooks/useUsuario";

const Perfil = () => {
  const { getDeveloper } = useContext(Context);
  const usuario = useUsuairo();

  const isLogin = () => {
    if (!usuario) {
      return (
        <>
          <LogSign></LogSign>
        </>
      );
    }

    return (
      <>
        <ProfileBase></ProfileBase>
      </>
    );
  };

  return <>{isLogin()}</>;
};

export default Perfil;
