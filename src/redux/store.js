import { configureStore } from '@reduxjs/toolkit'
import sliceRegistros from './features/sliceRegistros';
import slicePaises from './features/slicePaises';
export const store = configureStore({
    reducer: {
        sliceRegistros,
        slicePaises
    },
})