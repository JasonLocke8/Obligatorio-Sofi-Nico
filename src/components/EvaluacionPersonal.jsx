/* eslint-disable no-unused-vars */

import React from 'react'
import { useEffect, useState } from "react";
import { Card, Typography, CardContent } from "@mui/material";
import { useSelector } from "react-redux";

const EvolucionPersonal = () => {
    const [tiempoTotal, setTiempoTotal] = useState(0);
    const [mensaje, setMensaje] = useState("");
  
  // traer la lista de registros actual
     const registros = useSelector((state) => state.sliceRegistros);

  useEffect(() => {
    let totalHoy = 0;
    let totalAyer = 0;

    const hoy = new Date()
    const ayer = new Date()
    ayer.setDate(hoy.getDate() - 1)
    // console.log(hoy)
    // console.log(ayer)

    const hoyStr = hoy.toISOString().split("T")[0];
    const ayerStr = ayer.toISOString().split("T")[0];

    // console.log(hoyStr)
    // console.log(ayerStr)

    registros.forEach((registro) => {
      const registroFecha = new Date(registro.fecha).toISOString().split("T")[0];
      if (registroFecha === hoyStr) {
        totalHoy += Number(registro.tiempo);
      } else if (registroFecha === ayerStr) {
        totalAyer += Number(registro.tiempo);
      }
    });

    setMensaje(totalHoy > totalAyer ? "¡Bien hecho!" : "¡Que no decaiga!");
    
  }, [registros]);

  return (
    <Card>
    <CardContent>
      <Typography variant="h4" sx={{ mt: 2 }}>
        {mensaje}
      </Typography>
    </CardContent>
  </Card>
  )
}

export default EvolucionPersonal