/* eslint-disable no-unused-vars */
/*import CampoInput from './CampoInput';
import Boton from './Boton';
import Label from './Label';
import Select from './Select';*/
import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Typography,
} from "@mui/material";
import { obtenerActividades } from "../services/obtenerActividades";
import { agregarRegistro } from "../redux/features/sliceRegistros";
import { useDispatch } from "react-redux";

const FormRegistroActividad = () => {
  const [duracion, setDuracion] = useState("");
  const [fecha, setFecha] = useState("");
  const [idActividad, setActividad] = useState("");
  const [actividades, setActividades] = useState([]);

  const [errorDuracion, setErrorDuracion] = useState(false);
  const [errorFecha, setErrorFecha] = useState(false);

  const apikey = localStorage.getItem("apiKey");
  const iduser = localStorage.getItem("id");

  const dispatch = useDispatch();

  const cargarActividades = async () => {
    try {
      const cargarActividadesSelect = await obtenerActividades();
      setActividades(cargarActividadesSelect);
    } catch (error) {
      console.error("Error al obtener las actividades:", error);
    }
  };

  useEffect(() => {
    cargarActividades();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const fechaHoy = new Date();
    const fechaElegida = new Date(fecha);

    const duracionValida = duracion > 0;
    const fechaValida = fechaElegida <= fechaHoy; // validar que la fecha tiene que ser menor o igual o hoy

    setErrorDuracion(!duracionValida);
    setErrorFecha(!fechaValida);

    if (duracionValida && fechaValida) {
      await realizarRegistroActividad();
    }
  };

  const realizarRegistroActividad = async () => {
    // aca va la logica de llamar a la api para agregar la tarea
    const respuesta = await fetch(
      `https://movetrack.develotion.com/registros.php`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apikey: apikey,
          iduser: iduser,
        },
        body: JSON.stringify({
          idActividad: idActividad,
          idUsuario: iduser,
          tiempo: duracion,
          fecha: fecha,
        }),
      }
    )
      .then((response) => response.json())
      .then((json) => {
        return json;
      });

    if (respuesta.codigo === 200) { // agregue esto, antes no se actualizaba bien porque la api solo nos devuelve codigo, id de registro y un mnsj. de esta forma si le pasamos al estado algo de la forma que tiene que ser para mostrarlo en el listado despues
      const nuevoRegistro = {
        id: respuesta.idRegistro,
        idActividad: idActividad,
        idUsuario: iduser,
        tiempo: duracion,
        fecha: fecha,
      };

      dispatch(agregarRegistro(nuevoRegistro));
    }
    
  };

  return (
    /*
        <form onSubmit={handleSubmit}>
            <Label text={"Actividad: "} htmlFor="actividad"></Label>
            <Select options={actividades} id="actividad" name="actividad" value={idActividad} onChange={(e) => setActividad(e.target.value)} atributo="nombre"  />

            <Label text={"Duracion: "} htmlFor={"duracion"}></Label>
            <CampoInput type="number" placeholder="" value={duracion} onChange={(e) => setDuracion(e.target.value)} name="duracion"/>


            <Label text={"Fecha: "} htmlFor={"fecha"}></Label>
            <CampoInput type="date" placeholder="" value={fecha} onChange={(e) => setFecha(e.target.value)} name="fecha"/>

            <Boton text="Registrar"/>
        </form>*/
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        width: "100%",
        maxWidth: 400,
        mx: "auto",
        p: 3,
        bgcolor: "white",
        boxShadow: 2,
        borderRadius: 2,
      }}
    >
      <Typography variant="h5" textAlign="center" gutterBottom>
        Agregar registro
      </Typography>

      {/* Selección de actividad */}
      <FormControl fullWidth required>
        <InputLabel>Actividad</InputLabel>
        <Select
          value={idActividad}
          onChange={(e) => setActividad(e.target.value)}
        >
          {actividades.map((actividad) => (
            <MenuItem key={actividad.id} value={actividad.id}>
              {actividad.nombre}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Campo Duración */}
      <TextField
        type="number"
        label="Duración (minutos)"
        value={duracion}
        onChange={(e) => setDuracion(e.target.value)}
        fullWidth
        error={errorDuracion}
        helperText={errorDuracion ? "La duración debe ser mayor a 0" : ""}
        required
      />

      {/* Campo Fecha */}
      <TextField
        type="date"
        label="Fecha"
        value={fecha}
        onChange={(e) => setFecha(e.target.value)}
        fullWidth
        InputLabelProps={{ shrink: true }} // no se si va
        error={errorFecha}
        helperText={errorFecha ? "La fecha no puede ser futura" : ""}
        required
      />

      {/* Botón de Enviar */}
      <Button type="submit" variant="contained" color="primary" fullWidth>
        Registrar
      </Button>
    </Box>
  );
};
export default FormRegistroActividad;
