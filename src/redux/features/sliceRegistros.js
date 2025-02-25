import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const sliceRegistros = createSlice({
  name: "registros",
  initialState,
  reducers: {
    // Es una función pura que recibe el estado actual y la acción enviada, y devuelve un nuevo estado.

    cargarRegistrosIniciales: (state, action) => {
      const registrosIniciales = action.payload;
      return registrosIniciales;
    },

    agregarRegistro: (state, action) => {
      // state: estado actual, action: funcion enviada

      const nuevoRegistro = action.payload; // action es un objeto que tiene un type () y opcionalmente un payload
      // El payload es la carga que lleva action, en este caso los datos del nuevo registro
      state.push(nuevoRegistro);
    },

    eliminarRegistro: (state, action) => {
      const idRegistro = action.payload;
      return state.filter((registro) => registro.id != idRegistro);
    },

  },
});

export const {
  agregarRegistro,
  cargarRegistrosIniciales,
  eliminarRegistro,
  filtrarPorFecha,
} = sliceRegistros.actions; 
export default sliceRegistros.reducer;
