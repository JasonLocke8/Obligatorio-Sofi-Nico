import { configureStore } from "@reduxjs/toolkit";
import sliceRegistros from "./features/sliceRegistros";
import sliceActividades from "./features/sliceActividades";

export const store = configureStore({
  reducer: {
    sliceRegistros,
    sliceActividades,
  },
});
