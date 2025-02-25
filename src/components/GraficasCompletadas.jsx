/* eslint-disable no-unused-vars */

import React from "react";
import Grafica from "./Grafica";
import { useSelector } from "react-redux";
import { Container } from "@mui/material"; // or the appropriate library/file

/* Gráfico de minutos por actividad: se deberán graficar las
actividades de las que hay registros mostrando la cantidad
de sesiones de esa actividad, no se muestran en la gráfica las
actividades que no tengan registros.
*/

const useActividades = () => {
  const listaActividades = useSelector((state) => state.sliceActividades);

  const devolverNombreActividad = (idActividad) => {
    const actividad = listaActividades.find(
      (actividad) => actividad.id == idActividad
    );

    if (actividad) {
      return actividad.nombre;
    } else {
      return "";
    }
  };

  return devolverNombreActividad;
};

const generarEtiquetasYDatos = (resultadoGraficaMinutos) => {
  const hoy = new Date();
  const etiquetas2 = [];
  const datos2 = [];

  for (let i = 6; i >= 0; i--) {
    const fecha = new Date();
    fecha.setDate(hoy.getDate() - i);
    const fechaStr = fecha.toISOString().split("T")[0];
    etiquetas2.push(fechaStr);
    datos2.push(resultadoGraficaMinutos[fechaStr] || 0);
  }

  return { etiquetas2, datos2 };
};

const GraficasCompletadas = () => {
  const convertirNombreActividad = useActividades();
  const registros = useSelector((state) => state.sliceRegistros);

  const callback = (acc, val) => {
    if (val.idActividad) {
      if (acc[val.idActividad]) {
        acc[val.idActividad] = acc[val.idActividad] + 1;
      } else {
        acc[val.idActividad] = 1;
      }
    }
    return acc;
  };
  
  const resultado = registros.reduce(callback, {});
  const idActividades = Object.keys(resultado);
  const actividades = Object.values(resultado);
  const cantSesiones = idActividades.map((id) => convertirNombreActividad(id));

  // const callbackMinutos = (acc, val) => { // FALTA, ver porque no se agregan los de exactamente hace una semana, y que se muestren todos los dias, no los que tienen solo registros
  //   const fecha = new Date(val.fecha).toISOString().split("T")[0];

  //   const hoy = new Date();
  //   const semanaPasada = new Date();

  //   semanaPasada.setDate(hoy.getDate() - 7);
  //   console.log(semanaPasada)

  //   if (new Date (val.fecha) >= semanaPasada ) {
  //     const minutos = Number(val.tiempo) || 0; 
  
  //     if (acc[fecha]) {
  //       acc[fecha] += minutos; 
  //     } else {
  //       acc[fecha] = minutos; 
  //     }
  //   }
  //   return acc;
  // };

  //const resultadoGraficaMinutos = registros.reduce(callbackMinutos, {});
  // const etiquetas2 = Object.keys(resultadoGraficaMinutos).sort();
  // const datos2 = Object.values(resultadoGraficaMinutos);





  // Gráfico de minutos de los últimos siete días: se deberá mostrar la cantidad de minutos ejercitados cada día en la última semana.

  const callbackMinutos = (acc, val) => {
    const fecha = new Date(val.fecha).toISOString().split("T")[0];

    const hoy = new Date();
    const semanaPasada = new Date();
    semanaPasada.setDate(hoy.getDate() - 7);

    if (new Date(val.fecha) >= semanaPasada) {
      const minutos = Number(val.tiempo) || 0;

      if (acc[fecha]) {
        acc[fecha] += minutos;
      } else {
        acc[fecha] = minutos;
      }
    }
    return acc;
  };

  const resultadoGraficaMinutos = registros.reduce(callbackMinutos, {});
  const { etiquetas2, datos2 } = generarEtiquetasYDatos(resultadoGraficaMinutos);

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: { xs: "column", lg: "row" },
        alignItems: "center",
      }}
    >
      <div style={{ flex: 1 }}>
        <Grafica
          etiquetas={cantSesiones}
          datos={actividades}
          nombreGrafica="Sesiones por Actividad"
          nombreDatos="Cantidad de Sesiones"
          color="#1976d2"
        />
      </div>
      <div style={{ flex: 1 }}>
        <Grafica
          etiquetas={etiquetas2}
          datos={datos2}
          nombreGrafica="Minutos por día"
          nombreDatos="Cantidad de minutos"
          color="#1976d2"
        />
      </div>
    </Container>
  );
};

export default GraficasCompletadas;
