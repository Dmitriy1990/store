import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Product } from '../types/product';

export const fetchProduct = createAsyncThunk('product/fetchProduct', async function (id: number) {
  const response = await fetch(`http://localhost:3001/product/${id}`);
  const data = await response.json();
  return data;
});

type ProductType = {
  data: null | Product;
  loading: boolean;
};

export const product = createSlice({
  name: 'product',
  initialState: {
    data: null,
    loading: true
  } as ProductType,
  reducers: {
    clear(state) {
      state.data = null;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProduct.fulfilled, (state, actions) => {
      state.loading = false;
      state.data = actions.payload;
    });
    builder.addCase(fetchProduct.rejected, (state, actions) => {
      state.loading = false;
    });
  }
});

export const { clear } = product.actions;

export default product.reducer;
