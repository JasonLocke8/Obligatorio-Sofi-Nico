import "./App.css";
import FormLogin from "./components/FormLogin";
import FormRegistro from "./components/FormRegistro";
import Dashboard from "./components/Dashboard";

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter></BrowserRouter>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<FormLogin />} />
          <Route path="/registro" element={<FormRegistro />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </BrowserRouter>

      {/* <h1>Registro</h1>
      <FormRegistro></FormRegistro>      
      <h1>Login</h1>
      <FormLogin></FormLogin>

      <br />
      <button type="button">Logout</button>
      <br />

      <Dashboard></Dashboard>

      <h2>Listado de Registros</h2>

      <button type="button">Última semana</button>
      <button type="button">Último mes</button>
      <button type="button">Todos los registros</button>

      <Listado></Listado>
      <h2>Informe de tiempo</h2>

      {/* Tiempo total: en un componente aparte, se deberá mostrar el
      total de tiempo en minutos insumido en sesiones hasta el
      momento.
      */}

      {/* Tiempo diario: en otro componente mostrar la cantidad de
      tiempo en minutos registrados en el día. */}

      {/* <h2>Análisis:</h2> */}

      {/* Gráco de minutos por actividad: se deberán gracar las
actividades de las que hay registros mostrando la cantidad
de sesiones de esa actividad, no se muestran en la gráca las
actividades que no tengan registros.
4.4.2. Gráco de minutos de los últimos siete días: se deberá
mostrar la cantidad de minutos ejercitados cada día en la
última semana, los días que no tengan registros se mostrarán
igualmente en la gráca.
4.4.3. Evolución personal: Mostrar en un componente una frase
motivadora “¡que no decaiga!” en caso que el usuario haya
tenido menos tiempo de sesiones hoy que ayer o “¡Bien
hecho!” si hoy ya superó el tiempo de sesiones de ayer */}
    </>
  );
}

export default App;
