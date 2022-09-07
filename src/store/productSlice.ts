import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Product } from '../types/product';
import axios from 'axios';
import { getProduct } from '../api/api';

export const fetchProduct = createAsyncThunk(
  'product/fetchProduct',
  async function (id: number, { rejectWithValue }) {
    const response = await getProduct(id);
    // if (!response.ok) {
    //   return rejectWithValue('error');
    // }
    // const data = await response.json();

    return response;
  }
);

export type ProductType = {
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
    builder.addCase(fetchProduct.rejected, (state) => {
      state.loading = false;
      state.data = null;
    });
  }
});

export const { clear } = product.actions;

export default product.reducer;
