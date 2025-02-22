/* eslint-disable no-unused-vars */

import React from "react";
import Grafica from "./Grafica";
import { useSelector } from "react-redux";

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

  const callbackMinutos = (acc, val) => { // FALTA, ver porque no se agregan los de exactamente hace una semana, y que se muestren todos los dias, no los que tienen solo registros
    const fecha = new Date(val.fecha).toISOString().split("T")[0];

    const hoy = new Date();
    const semanaPasada = new Date();

    semanaPasada.setDate(hoy.getDate() - 7);
    console.log(semanaPasada)

    if (new Date (val.fecha) >= semanaPasada ) {
      const minutos = Number(val.tiempo) || 0; 
  
      if (acc[fecha]) {
        acc[fecha] += minutos; 
      } else {
        acc[fecha] = minutos; 
      }
    }
    return acc;
  };

  const resultado = registros.reduce(callback, {});
  const resultadoGraficaMinutos = registros.reduce(callbackMinutos, {});

  const idActividades = Object.keys(resultado);
  const datos = Object.values(resultado);

  const etiquetas2 = Object.keys(resultadoGraficaMinutos).sort();
  const datos2 = Object.values(resultadoGraficaMinutos);

  const etiquetas = idActividades.map((id) => convertirNombreActividad(id));

  return (
    <div>
      <Grafica
        etiquetas={etiquetas}
        datos={datos}
        nombreGrafica="Sesiones por Actividad"
        nombreDatos="Cantidad de Sesiones"
      />
      <Grafica
        etiquetas={etiquetas2}
        datos={datos2}
        nombreGrafica="Minutos por día"
        nombreDatos="Cantidad de minutos"
      />
    </div>
  );
};

export default GraficasCompletadas;
