import { configureStore } from '@reduxjs/toolkit'
import sliceRegistros from './features/sliceRegistros';
import slicePaises from './features/slicePaises';
import sliceActividades from './features/sliceActividades';

export const store = configureStore({
    reducer: {
        sliceRegistros,
        slicePaises,
        sliceActividades,
    },
})