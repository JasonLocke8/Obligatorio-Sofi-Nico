/* eslint-disable no-unused-vars */

import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Card, Typography, CardContent } from "@mui/material";


const TiempoDia = () => {
  // constante que va a guardar el tiempo
  const [tiempoTotal, setTiempoTotal] = useState(0);
  //let tiempoTotal = 0;

  // traer la lista de registros actual
  const registros = useSelector((state) => state.sliceRegistros);

  useEffect(() => {
    let total = 0;
    const hoy = new Date().toISOString().split("T")[0];

    registros.forEach((registro) => {
      const registroFecha = new Date(registro.fecha).toISOString().split("T")[0];
      if (registroFecha === hoy) {
        total += Number(registro.tiempo);
      }
    });
    setTiempoTotal(total);
  }, [registros]);

  return (
    <Card sx={{ backgroundColor: 'rgba(0, 191, 255, 0.2)', marginBottom: 2, marginTop: 2, boxShadow: 'none', borderRadius: '25px' }}>
      <CardContent>
        <Typography variant="h6" component="div">
          Tiempo total en el día
        </Typography>
        <Typography variant="h4" fontWeight="bold">
          {tiempoTotal} minutos
        </Typography>
      </CardContent>
    </Card>
  );
};

export default TiempoDia;
