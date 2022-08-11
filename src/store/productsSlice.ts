import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Product } from '../types/product';

export const fetchProducts = createAsyncThunk('product/fetchProducts', async function (thunkAPI) {
  const response = await fetch('http://localhost:3001/product');
  const data = await response.json();
  return data;
});

export const products = createSlice({
  name: 'products',
  initialState: {
    data: [] as Product[],
    loading: true
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.fulfilled, (state, actions) => {
      state.loading = false;
      state.data = actions.payload;
    });
    builder.addCase(fetchProducts.rejected, (state, actions) => {
      console.log('actions', actions);
      state.loading = false;
    });
  }
});

export default products.reducer;
