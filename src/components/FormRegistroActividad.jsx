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
  Grid
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
    <Grid container spacing={2} alignItems="center">
    
    {/* Selección de actividad */}
    <Grid item xs={12} sm={3}>
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
    </Grid>

    {/* Campo Duración */}
    <Grid item xs={12} sm={3}>
      <TextField
        type="number"
        label="Duración (minutos)"
        value={duracion}
        onChange={(e) => setDuracion(e.target.value)}
        fullWidth
        error={errorDuracion}
        helperText={errorDuracion ? "Debe ser mayor a 0" : ""}
        required
      />
    </Grid>

    {/* Campo Fecha */}
    <Grid item xs={12} sm={3}>
      <TextField
        type="date"
        label="Fecha"
        value={fecha}
        onChange={(e) => setFecha(e.target.value)}
        fullWidth
        InputLabelProps={{ shrink: true }}
        error={errorFecha}
        helperText={errorFecha ? "No puede ser futura" : ""}
        required
      />
    </Grid>

    {/* Botón de Enviar alineado a la derecha */}
    <Grid item xs={12} sm={3} display="flex" justifyContent="flex-end">
      <Button type="submit" variant="contained" color="primary" sx={{ px: 4 }}>
        Registrar
      </Button>
    </Grid>

    </Grid>

  );
};
export default FormRegistroActividad;
