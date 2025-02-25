import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const sliceRegistros = createSlice({
  name: "registros",
  initialState,
  reducers: {
    cargarRegistrosIniciales: (state, action) => {
      const registrosIniciales = action.payload;
      return registrosIniciales;
    },

    agregarRegistro: (state, action) => {
      const nuevoRegistro = action.payload;
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
