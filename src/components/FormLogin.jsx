/* eslint-disable no-unused-vars */

import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  Container,
  Avatar,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { loginFetch } from "../services/loginFetch";
import { useNavigate } from "react-router-dom";
import Alert from '@mui/material/Alert';

const LoginForm = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState(""); // crea una variable de estado llamada username y guarda el valor del nombre de usuario
  // crea una función setUsername, que sirve para actualizar el valor de username.
  // El estado inicial es '' (una cadena vacía), es decir que cuando se carga el componente, username está vacío.
  const [password, setPassword] = useState("");
  const [deshabilitar, setDeshabilitar] = useState(true);

  const [mostrarAlert, setMostrarAlert] = useState(false);
  const [mensajeDeError, setMensajeDeError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    await realizarLoginApi();
  };

  useEffect(() => {
    setDeshabilitar(username === "" || password === "");
  }, [username, password]);



  const realizarLoginApi = async () => {

    localStorage.clear();

    const datos = await loginFetch(username, password);

    if (datos.codigo === 200) {     
      const apiKey = datos.apiKey;
      const id = datos.id;

      localStorage.setItem("apiKey", apiKey);
      localStorage.setItem("id", id);

      navigate("/dashboard");
    } else {
      setMostrarAlert(true);
      setMensajeDeError(datos.mensaje);
      const timer = setTimeout(() => {
        setMostrarAlert(false);
      }, 5000);

      return () => clearTimeout(timer);
    }

    return datos;
  };

  const handleClickRegistro = () => {
    navigate("/registro");
  };

  return (
    <Container component="main" maxWidth="xs">

      {mostrarAlert && <Alert severity="error"> {mensajeDeError} </Alert> }

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
          Login
        </Typography>
        <Box component="form" onSubmit={handleLogin} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Usuario"
            name="username"
            autoComplete="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Contraseña"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3, mb: 2 }}
            disabled={deshabilitar}
          >
            Ingresar
          </Button>

          <Button
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3, mb: 2 }}
            onClick={handleClickRegistro}
          >
            Registrarse
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default LoginForm;
