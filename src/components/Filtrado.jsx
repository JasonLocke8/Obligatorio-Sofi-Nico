import React from "react";
import { Container, Box, Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { filtrarPorFecha } from "../redux/features/sliceRegistros"

const Filtrado = () => {
  const dispatch = useDispatch();

  const handleMostrarTodo = () => {
    dispatch(filtrarPorFecha("todo"));
    console.log("Mostrar todo");
    console.log(dispatch(filtrarPorFecha("todo")));
  };

  const handleMostrarPorSemana = () => {
    dispatch(filtrarPorFecha("semana"));
    console.log("Mostrar por semana");
    console.log(dispatch(filtrarPorFecha("semana")));
  };

  const handleMostrarPorMes = () => {
    dispatch(filtrarPorFecha("mes"));
    console.log("Mostrar por mes");
    console.log(dispatch(filtrarPorFecha("mes")));
  };

  return (
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
  );
};

export default Filtrado;
