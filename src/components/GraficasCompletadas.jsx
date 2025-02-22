/* eslint-disable no-unused-vars */

import React from "react";
import Grafica from "./Grafica";
import { useSelector } from "react-redux";

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

  const resultado = registros.reduce(callback, {});
  
  const idActividades = Object.keys(resultado);
  const datos = Object.values(resultado);

  const etiquetas = idActividades.map(
    id => convertirNombreActividad(id)
  );

  return (
    <Grafica etiquetas={etiquetas} datos={datos} nombreGrafica="Sesiones por Actividad" nombreDatos="Cantidad de Sesiones" />
  );
};

export default GraficasCompletadas;