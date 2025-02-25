import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const sliceActividades = createSlice({
  name: "actividades",
  initialState,
  reducers: {
    cargarActividadesIniciales: (state, action) => {
      const actividadesIniciales = action.payload;
      return actividadesIniciales;
    },
  },
});

export const { cargarActividadesIniciales } = sliceActividades.actions;
export default sliceActividades.reducer;