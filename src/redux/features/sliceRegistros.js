import { createSlice } from "@reduxjs/toolkit";

//const initialState = { registros: [] };
const initialState = [];

const sliceRegistros = createSlice({
    name: "registros",
    initialState,
    reducers: { // Es una función pura que recibe el estado actual y la acción enviada, y devuelve un nuevo estado.
        
        cargarRegistrosIniciales: (state, action) => {
            //console.log('cargarRegistrosIniciales action', action)
            const registrosIniciales = action.payload;
            return registrosIniciales;
           // return { ...state, registros: registrosIniciales };
        },
        
        agregarRegistro : (state, action) => { // state: estado actual, action: funcion enviada
            //console.log('agregarRegistro action', action)
            //console.log('agregarRegistro state', state)
            const nuevoRegistro = action.payload; // action es un objeto que tiene un type () y opcionalmente un payload 
                                                    // El payload es la carga que lleva action, en este caso los datos del nuevo registro
            state.push(nuevoRegistro);    
            //return { ...state, registros: [...state.registros, nuevoRegistro]};
        },

        eliminarRegistro : (state, action) => {
            const idRegistro = action.payload;
            // console.log(state.registros);

            // const registrosFiltrados = state.registros.filter(registro => registro.id !== idRegistro);
            // console.log(registrosFiltrados);
            
            //return { ...state, registros: registrosFiltrados};
            return state.filter(registro => registro.id != idRegistro);
        }
    }
});

export const {agregarRegistro, cargarRegistrosIniciales, eliminarRegistro} = sliceRegistros.actions; // que estoy haciendo aca?
export default sliceRegistros.reducer;