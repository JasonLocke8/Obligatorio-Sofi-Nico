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
  Box
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
      if (resultado.codigo == 200) {
        dispatch(eliminarRedux(e.target.id));
        // console.log("Registro eliminado correctamente");
      } else {
        console.error("Error al eliminar el registro");
        console.log(resultado);
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

    const registrosFiltrados = registros2.filter(registro => {
      const fechaRegistro = new Date(registro.fecha);
      return fechaRegistro >= semanaPasada && fechaRegistro <= hoy;
    })
    
    setRegistros(registrosFiltrados);


  };

  const handleMostrarPorMes = () => {
    
    const hoy = new Date();
    const mesPasado = new Date(hoy);
    mesPasado.setDate(hoy.getMonth() - 1);

    const registrosFiltrados = registros2.filter(registro => {
      const fechaRegistro = new Date(registro.fecha);
      return fechaRegistro >= mesPasado && fechaRegistro <= hoy;
    })
    
    setRegistros(registrosFiltrados);
  };

  return (

    <div>
      <Container>
        <Box>
          <Button id="todo" variant="contained" onClick={handleMostrarTodo}>
            Ver todos
          </Button>
          <Button
            id="semana"
            variant="contained"
            onClick={handleMostrarPorSemana}
          >
            Última semana
          </Button>
          <Button id="mes" variant="contained" onClick={handleMostrarPorMes}>
            Último mes
          </Button>
        </Box>
      </Container>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Icono</TableCell>
              <TableCell>Actividad</TableCell>
              <TableCell>Acciones</TableCell>
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
                <TableRow key={registro.id}>
                  <TableCell>
                    <img src={`${urlImagenes}${imagen}.png`} alt="icono" />
                  </TableCell>
                  <TableCell>{nombreActividad}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="primary"
                      id={registro.id}
                      onClick={handleEliminarRegistro}
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
