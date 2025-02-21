import React from "react";
import FormRegistroActividad from "./FormRegistroActividad";
import { Alert, Typography, Container, Box } from "@mui/material";
import Logout from "./Logout";
import Listado from "./Listado";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { cargarRegistrosIniciales } from "../redux/features/sliceRegistros";

const Dashboard = () => {
  const [mostrarAlert, setMostrarAlert] = React.useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const apikey = localStorage.getItem("apiKey"); // agregue ahora
  const iduser = localStorage.getItem("id"); // agregue ahora

  useEffect(() => {
    // tenemos que agregar la validacion de que si existe la apiKey en el LS, si no que lleva al login
    const timer = setTimeout(() => {
      setMostrarAlert(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (apikey == undefined) {
      // si no hay apiKey lo lleva al login
      navigate("/login");
    } else {
      fetch(
        `https://movetrack.develotion.com/registros.php?idUsuario=${iduser}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            apikey: apikey,
            iduser: iduser,
          },
        }
      )
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          if(data.codigo === 200){
            dispatch(cargarRegistrosIniciales(data.registros));
          }
        });
    }
  }, []);

  return (
    <Container>
      <Box>
        {mostrarAlert && (
          <Alert severity="success">Bienvenido a tu dashboard</Alert>
        )}
        <Logout></Logout>
        <Typography component="h1" variant="h1">
          Dashboard
        </Typography>
        <FormRegistroActividad></FormRegistroActividad>
        <Listado></Listado>
      </Box>
    </Container>
  );
};

export default Dashboard;
