/* eslint-disable no-unused-vars */

import React, { useState, useEffect } from "react";
import { eliminarRegistro as eliminarAPI } from "../services/eliminarRegistro";
import { eliminarRegistro as eliminarRedux } from "../redux/features/sliceRegistros";
import { obtenerActividades } from "../services/obtenerActividades";
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

  const [actividades, setActividades] = useState([]);
  const urlImagenes = "https://movetrack.develotion.com/imgs/";

  const dispatch = useDispatch();

  const registros2 = useSelector((state) => state.sliceRegistros);

  const cargarActividades = async () => {
    try {
      const actividades = await obtenerActividades();
      setActividades(actividades);
    } catch (error) {
      console.error("Error al obtener las actividades:", error);
    }
  };

  useEffect(() => {
    cargarActividades();
  }, []);

  useEffect(() => {
    //const registrosValidos = registros2.filter(registro => registro.id !== undefined);
    // chequear que esta pasando aca, con lo nuevo de formar el obj parece que no es necesario esto, VER
    //const validRegistros = registros2 || [];
    setRegistros(registros2);
    //console.log(registros);
  }, [registros2]);

  const handleEliminarRegistro = async (e) => {
    console.log(e.target.id);

    try {
      const resultado = await eliminarAPI(
        e.target.id,
        localStorage.getItem("apiKey"),
        localStorage.getItem("id")
      );
      if (resultado.codigo == 200) {
        dispatch(eliminarRedux(e.target.id));
        console.log("Registro eliminado correctamente");
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

    console.log("Mostrar todo");

    setRegistros(registros2);
    
    //console.log(dispatch(filtrarPorFecha("todo")));
  };

  const handleMostrarPorSemana = () => {
    //dispatch(filtrarPorFecha("semana"));
    console.log("Mostrar por semana");
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
    //dispatch(filtrarPorFecha("mes"));
    console.log("Mostrar por mes");
    
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
              // console.log("ID: ", registro.id);

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
