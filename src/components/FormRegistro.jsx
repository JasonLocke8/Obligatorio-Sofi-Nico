/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
/*import CampoInput from './CampoInput';
import Boton from './Boton';
import Label from './Label';
import Select from './Select';*/
import {
  TextField,
  Button,
  Box,
  Container,
  Typography,
  Avatar,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { registroFetch } from "../services/registroFetch";
import { obtenerPaises } from "../services/obtenerPaises";
import { useNavigate } from "react-router-dom";
import Alert from '@mui/material/Alert';

const FormRegistro = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    usuario: "",
    password: "",
    pais: "",
  });
  const [paises, setPaises] = useState([]);
  const [mostrarAlert, setMostrarAlert] = useState(false);
  const [errorMensaje, setErrorMensaje] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // console.log(formData);

    if (
      formData.usuario === "" ||
      formData.password === "" ||
      formData.pais === ""
    ) {
      return;
    } else {
      await realizarRegistroApi();
    }
  };

  const realizarRegistroApi = async () => {
    const datos = await registroFetch(
      formData.usuario,
      formData.password,
      formData.pais
    );

    if (datos.codigo === 200) {

      localStorage.setItem("apiKey", datos.apiKey);
      localStorage.setItem("id", datos.id);

      navigate("/dashboard");
      
    } else{
      setMostrarAlert(true);
      setErrorMensaje(datos.mensaje)
      const timer = setTimeout(() => {
        setMostrarAlert(false);
      }, 5000);

      return () => clearTimeout(timer);
    }

    return datos;
  };

  const cargarPaises = async () => {
    try {
      const cargarPaisesSelect = await obtenerPaises();
      setPaises(cargarPaisesSelect);
    } catch (error) {
      console.error("Error fetching los paises:", error);
    }
  };

  useEffect(() => {
    cargarPaises();
  }, []);

  const handleClickLogin = () => {
    navigate("/login");
  };

  return (
    <Container component="main" maxWidth="xs">
      {mostrarAlert && <Alert severity="error">{errorMensaje}</Alert>}
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Registro de Usuario
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <TextField
            fullWidth
            label="Usuario"
            name="usuario"
            value={formData.usuario}
            onChange={handleChange}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Contraseña"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            margin="normal"
            required
          />
          <FormControl fullWidth margin="normal" required>
            <InputLabel>País</InputLabel>
            <Select name="pais" value={formData.pais} onChange={handleChange}>
              {paises.map((pais) => (
                <MenuItem key={pais.id} value={pais.id}>
                  {pais.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
          >
            Enviar
          </Button>

          <Button
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
            onClick={handleClickLogin}
          >
            Volver
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default FormRegistro;
