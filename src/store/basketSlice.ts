import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { Action } from 'history';
import { Product } from '../types/product';
import { RootState } from './store';

export const fetchPurchases = createAsyncThunk('product/fetchPurchases', async function (thunkAPI) {
  const response = await axios.get('http://localhost:3001/purchases');
  const data = await response.data;
  return data;
});

export const addToBasket = createAsyncThunk(
  'product/fetchPurchases',
  async function (item: Product) {
    const response = await axios.post('http://localhost:3001/purchases', item);
    console.log('add to basket', response);
  }
);

export const amountProduct = createAsyncThunk(
  'product/amountProduct',
  async (obj: { id: number; count: number }, { getState }) => {
    const state = (await getState()) as RootState;
    const newData = state.basket.data.find((item) => item.id === obj.id);
    if (newData) {
      await axios.put(`http://localhost:3001/purchases/${obj.id}`, {
        ...newData,
        count: obj.count
      });
    }
    return obj;
  }
);

export const deleteProduct = createAsyncThunk(
  'product/deleteProduct',
  async (id: number, { getState }) => {
    await axios.delete(`http://localhost:3001/purchases/${id}`);
    return id;
  }
);

export const basket = createSlice({
  name: 'basket',
  initialState: {
    data: [] as Product[],
    loading: true
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPurchases.fulfilled, (state, actions) => {
      state.loading = false;
      state.data = actions.payload;
    });
    builder.addCase(fetchPurchases.rejected, (state, actions) => {
      state.loading = false;
    });
    builder.addCase(deleteProduct.fulfilled, (state, actions) => {
      state.data = state.data.filter((item) => item.id !== actions.payload);
    });
    builder.addCase(amountProduct.fulfilled, (state, actions) => {
      const idx = state.data.findIndex((item) => item.id === actions.payload.id);
      if (idx !== -1) {
        state.data = [
          ...state.data.slice(0, idx),
          { ...state.data[idx], count: actions.payload.count },
          ...state.data.slice(idx + 1)
        ];
      }
    });
  }
});

export default basket.reducer;
