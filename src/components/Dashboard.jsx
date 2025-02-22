/* eslint-disable no-unused-vars */

import React, { useState, useEffect } from "react";
import FormRegistroActividad from "./FormRegistroActividad";
import { Alert, Typography, Container, Box } from "@mui/material";
import Logout from "./Logout";
import Listado from "./Listado";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { cargarRegistrosIniciales } from "../redux/features/sliceRegistros";
import { cargarActividadesIniciales } from "../redux/features/sliceActividades";
import TiempoTotal from "./TiempoTotal";
import TiempoDia from "./TiempoDia";
import EvaluacionPersonal from "./EvaluacionPersonal";
import { obtenerActividades } from "../services/obtenerActividades";
import GraficasCompletadas from "./GraficasCompletadas";

const Dashboard = () => {
  const [mostrarAlert, setMostrarAlert] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  //const [actividades, setActividades] = useState([]);
  
  const apikey = localStorage.getItem("apiKey");
  const iduser = localStorage.getItem("id");

  useEffect(() => {
    if (!apikey) {
      navigate("/login");
    }

    const timer = setTimeout(() => {
      setMostrarAlert(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, [apikey, navigate]);

  useEffect(() => {
    if (apikey == undefined) {
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
          if (data.codigo === 200) {
            dispatch(cargarRegistrosIniciales(data.registros));
          }
        });
    }
  }, [apikey, iduser, dispatch, navigate]);

  // useEffect(() => {
  //   /*const cargarActividades = async () => {
  //     try {
  //       const actividades = await obtenerActividades();
  //       setActividades(actividades);
  //     } catch (error) {
  //       console.error("Error al obtener las actividades:", error);
  //     }
  //   };
  //   cargarActividades();*/
  //   fetch(`https://movetrack.develotion.com/actividades.php`, {
  //     method: "GET",
  //     headers: {
  //       "Content-Type": "application/json",
  //       apikey: apikey,
  //       iduser: iduser,
  //     },
  //   })
  //     .then((response) => {
  //       return response.json();
  //     })
  //     .then((data) => {
  //       if (data.codigo === 200) {
  //         dispatch(cargarActividadesIniciales(data.actividades));
  //       }
  //     });
  // }, []);

  useEffect(() => {
    const cargarActividades = async () => {
      try {
        const actividades = await obtenerActividades();
        dispatch(cargarActividadesIniciales(actividades));
      } catch (error) {
        console.error("Error al obtener las actividades: ", error);
      }
    };
    cargarActividades();
  }, [dispatch]);

  return (
    <Container>
      <Box>
        {mostrarAlert && (
          <Alert severity="success">Bienvenido a tu dashboard</Alert>
        )}
        <Logout></Logout>
        <EvaluacionPersonal></EvaluacionPersonal>
        <Typography component="h1" variant="h1">
          Dashboard
        </Typography>
        <FormRegistroActividad />
        <Listado />
        <TiempoTotal />
        <TiempoDia />
        <GraficasCompletadas />
      </Box>
    </Container>
  );
};

export default Dashboard;
