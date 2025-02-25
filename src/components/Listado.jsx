/* eslint-disable no-unused-vars */

import React, { useState, useEffect } from "react";
import { eliminarRegistro as eliminarAPI } from "../services/eliminarRegistro";
import { eliminarRegistro as eliminarRedux } from "../redux/features/sliceRegistros";
import { useSelector, useDispatch } from "react-redux";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Container,
  Box,
} from "@mui/material";

const Listado = () => {
  const [registros, setRegistros] = useState([]);
  const urlImagenes = "https://movetrack.develotion.com/imgs/";

  const dispatch = useDispatch();
  const registros2 = useSelector((state) => state.sliceRegistros);
  const actividades = useSelector((state) => state.sliceActividades);

  useEffect(() => {
    setRegistros(registros2);
  }, [registros2]);

  const handleEliminarRegistro = async (e) => {
    try {
      const resultado = await eliminarAPI(
        e.target.id,
        localStorage.getItem("apiKey"),
        localStorage.getItem("id")
      );
      if (resultado.codigo === 200) {
        dispatch(eliminarRedux(e.target.id));
      } else {
        console.error("Error al eliminar el registro");
      }
    } catch (error) {
      console.error("Error al eliminar el registro:", error);
    }

    return;
  };

  const handleMostrarTodo = () => {
    setRegistros(registros2);
  };

  const handleMostrarPorSemana = () => {
    const hoy = new Date();
    const semanaPasada = new Date(hoy);
    semanaPasada.setDate(hoy.getDate() - 7);

    const registrosFiltrados = registros2.filter((registro) => {
      const fechaRegistro = new Date(registro.fecha);
      return fechaRegistro >= semanaPasada && fechaRegistro <= hoy;
    });

    setRegistros(registrosFiltrados);
  };

  const handleMostrarPorMes = () => {
    const hoy = new Date();
    const mesPasado = new Date(hoy);
    mesPasado.setDate(hoy.getMonth() - 1);

    const registrosFiltrados = registros2.filter((registro) => {
      const fechaRegistro = new Date(registro.fecha);
      return fechaRegistro >= mesPasado && fechaRegistro <= hoy;
    });

    setRegistros(registrosFiltrados);
  };

  return (
    <div>
      <Container sx={{ display: "flex", justifyContent: "space-between", padding: "0 !important" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            gap: 2,
            marginTop: "20px",
            textTransform: "none",
            marginBottom: "20px",
          }}
        >
          <Button
            id="todo"
            variant="contained"
            onClick={handleMostrarTodo}
            sx={{
              border: "2px solid #1976d2",
              backgroundColor: "rgba(0, 191, 255, 0)",
              color: "#383838",
              borderRadius: "25px",
              textTransform: "none",
              boxShadow: "none",
              "&:hover": {
                boxShadow: "none",
                borderColor: "#00bfff",
                backgroundColor: "rgba(0, 191, 255, 0.5)",
              },
            }}
          >
            Ver todos
          </Button>
          <Button
            id="semana"
            variant="contained"
            onClick={handleMostrarPorSemana}
            sx={{
              backgroundColor: "rgba(0, 191, 255, 0.2)",
              color: "#383838",
              borderRadius: "25px",
              textTransform: "none",
              boxShadow: "none",
              "&:hover": {
                boxShadow: "none",
                borderColor: "#00bfff",
                backgroundColor: "rgba(0, 191, 255, 0.5)",
              },
            }}
          >
            Última semana
          </Button>
          <Button
            id="mes"
            variant="contained"
            onClick={handleMostrarPorMes}
            sx={{
              backgroundColor: "rgba(0, 191, 255, 0.2)",
              color: "#383838",
              borderRadius: "25px",
              textTransform: "none",
              boxShadow: "none",
              "&:hover": {
                boxShadow: "none",
                borderColor: "#00bfff",
                backgroundColor: "rgba(0, 191, 255, 0.5)",
              },
            }}
          >
            Último mes
          </Button>
        </Box>
      </Container>

      <TableContainer component={Paper} sx={{ boxShadow: "none" }}>
        <Table sx={{ borderCollapse: "separate" }}>
          <TableHead>
            <TableRow>
              <TableCell colSpan={2}>Actividades</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {registros.map((registro) => {
              const actividad = actividades.find(
                (actividad) => actividad.id === registro.idActividad
              );
              const nombreActividad = actividad
                ? actividad.nombre
                : "Sin nombre";
              const imagen = actividad
                ? actividad.imagen
                : `${registro.idActividad}.png`;

                return (
                <TableRow
                  key={registro.id}
                  sx={{ borderBottom: "1px solid #e0e0e0" }}
                >
                  <TableCell style={{ display: "flex", alignItems: "center" }}>
                  <img
                  src={`${urlImagenes}${imagen}.png`}
                  alt="icono"
                  style={{ marginRight: "10px", width: "60px" }}
                  />
                  {nombreActividad}
                  </TableCell>
                  <TableCell align="right">
                  <Button
                  variant="contained"
                  color="primary"
                  id={registro.id}
                  onClick={handleEliminarRegistro}
                  sx={{
                  backgroundColor: "rgba(0, 191, 255, 0.2)",
                  color: "#383838",
                  borderRadius: "25px",
                  textTransform: "none",
                  boxShadow: "none",
                  "&:hover": {
                    boxShadow: "none",
                    borderColor: "#00bfff",
                    backgroundColor: "rgba(0, 191, 255, 0.5)",
                  },
                  }}
                  >
                  Eliminar
                  </Button>
                  </TableCell>
                </TableRow>
                );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Listado;
