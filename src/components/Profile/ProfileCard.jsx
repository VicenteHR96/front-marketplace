import React, { useContext, useEffect, useState } from "react";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import Badge from "@mui/material/Badge";
import Button from "@mui/material/Button";
import { IconButton, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Modal from "../Modal/Modal";
import { PizzaContext } from "../../contexts/PizzaContext";
import useUsuario from "../../hooks/useUsuario";
import CrearProducto from "../../views/CrearProducto/CrearProducto";

const styles = {
  details: {
    padding: "1rem",
    borderTop: "1px solid #e1e1e1",
  },
  value: {
    padding: "1rem 2rem",
    borderTop: "1px solid #e1e1e1",
    color: "#899499",
  },
};

export default function ProfileCard(props) {
  const [modalOpen, setModalOpen] = useState(false);
  const [crearProductoOpen, setCrearProductoOpen] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState("");
  const [newAvatarUrl, setNewAvatarUrl] = useState("");

  const { getUserData, userProfile, setUserProfile, updateUserData } =
    useContext(PizzaContext);
  const usuario = useUsuario();

  const handleUrlChange = (event) => {
    setNewAvatarUrl(event.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userProfile.id_usuario || !userProfile) {
      await getUserData();
    }

    if (newAvatarUrl) {
      const updatedProfile = { ...userProfile, avatar: newAvatarUrl };
      await updateUserData(updatedProfile);
      setAvatarUrl(newAvatarUrl);
      setModalOpen(false);
    }
  };

  useEffect(() => {
    if (!userProfile.id_usuario) {
      getUserData();
    }
  }, [userProfile, getUserData]);

  useEffect(() => {
    if (userProfile) {
      setAvatarUrl(userProfile.avatar);
    }
  }, [userProfile]);

  if (!userProfile) {
    return <div>Loading...</div>;
  }

  const navigate = useNavigate();

  const handleAddProduct = () => {
    navigate("/crear-producto");
  };

  return (
    <Card variant="outlined">
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
        <Grid item sx={{ p: "1.5rem 0rem", textAlign: "center" }}>
          <Badge
            overlap="circular"
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            badgeContent={
              <IconButton onClick={() => setModalOpen(true)} color="primary">
                <PhotoCameraIcon
                  sx={{
                    border: "5px solid white",
                    backgroundColor: "#1976d2",
                    borderRadius: "50%",
                    padding: ".2rem",
                    width: 35,
                    height: 35,
                    color: "white",
                  }}
                />
              </IconButton>
            }
          >
            <Avatar
              sx={{ width: 100, height: 100, mb: 1.5 }}
              src={avatarUrl}
              alt="Avatar"
            />
          </Badge>
          <Typography variant="h6">{props.name}</Typography>
          <Typography color="text.secondary" style={{ fontSize: "smaller" }}>
            {props.sub}
          </Typography>
        </Grid>
        <Grid container>
          <Grid item xs={6}>
            <Typography style={styles.details}>Mensajes</Typography>
            <Typography style={styles.details}>Publicaciones</Typography>
            <Typography style={styles.details}>Favoritos</Typography>
          </Grid>
          <Grid item xs={6} sx={{ textAlign: "end" }}>
            <Typography style={styles.value}>{props.dt1}</Typography>
            <Typography style={styles.value}>{props.dt2}</Typography>
            <Typography style={styles.value}>{props.dt3}</Typography>
          </Grid>
        </Grid>
        <Grid item style={styles.details} sx={{ width: "100%" }}>
          <Button
            variant="contained"
            color="primary"
            sx={{ width: "99%", p: 1, my: 2 }}
            onClick={() => setCrearProductoOpen(true)}
          >
            Agregar producto
          </Button>
        </Grid>
      </Grid>
      {modalOpen && (
        <Modal
          closeModal={() => setModalOpen(false)}
          contenido={
            <>
              <label htmlFor="avatar-url">Insertar URL de su Avatar</label>
              <TextField
                id="avatar-url"
                fullWidth
                placeholder="Inserte su avatar..."
                value={newAvatarUrl}
                onChange={handleUrlChange}
                type="text"
              />
              <Button
                onClick={handleSubmit}
                variant="contained"
                color="primary"
                sx={{ width: "100%", p: 1, my: 1 }}
              >
                Agregar avatar
              </Button>
            </>
          }
        />
      )}
      {crearProductoOpen && (
        <Modal
          closeModal={() => setCrearProductoOpen(false)}
          contenido={<CrearProducto />}
        />
      )}
    </Card>
  );
}
