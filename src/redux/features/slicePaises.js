import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { obtenerPaises } from '../../services/obtenerPaises';

export const fetchPaises = createAsyncThunk(
  'paises/fetchPaises',
  async () => {
    const response = await obtenerPaises();
    return response.data;
  }
);

const slicePaises = createSlice({
  name: 'paises',
  initialState: {
    paises: [],
    status: 'idle',
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPaises.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPaises.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.paises = action.payload;
      })
      .addCase(fetchPaises.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  }
});

export default slicePaises.reducer;