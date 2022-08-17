import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
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
  async (id: number, { getState }) => {
    const state = (await getState()) as RootState;

    console.log('thunkAPI', state.products);
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
      console.log('actions', actions);
      state.loading = false;
    });
  }
});

export default basket.reducer;
