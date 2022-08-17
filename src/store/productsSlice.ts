import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Product } from '../types/product';
import axios from 'axios';
import { Sorted } from '../types/sort';

type Props = {
  sort: Sorted;
  num: number;
};

const LIMIT = 3;

export const fetchProducts = createAsyncThunk(
  'product/fetchProducts',
  async function (props: Props, thunkAPI) {
    const response = await axios.get(
      `http://localhost:3001/product?_sort=price&_order=${props.sort}&_start=${props.num}&_limit=${LIMIT}`
    );
    const data = await response.data;
    const count = response.headers['x-total-count'];
    return [data, count];
  }
);

export const addFetchProducts = createAsyncThunk(
  'product/addFetchProducts',
  async function (props: Props, thunkAPI) {
    const response = await axios.get(
      `http://localhost:3001/product?_sort=price&_order=${props.sort}&_start=${props.num}&_limit=${LIMIT}`
    );
    const data = await response.data;
    return data;
  }
);

export const products = createSlice({
  name: 'products',
  initialState: {
    data: [] as Product[],
    totalRecords: 0,
    loading: true,
    column: false,
    sort: Sorted.DEFAULT,
    num: 0
  },
  reducers: {
    toggleView(state) {
      state.column = !state.column;
    },
    changeSort(state, actions) {
      state.sort = actions.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.fulfilled, (state, actions) => {
      state.loading = false;
      state.data = actions.payload[0];
      state.totalRecords = actions.payload[1];
      state.num = 3;
    });
    builder.addCase(fetchProducts.rejected, (state, actions) => {
      state.loading = false;
    });

    builder.addCase(addFetchProducts.fulfilled, (state, actions) => {
      state.loading = false;
      state.data.push(...actions.payload);
      state.num = state.num + 3;
    });
    builder.addCase(addFetchProducts.rejected, (state, actions) => {
      state.loading = false;
    });
  }
});

export const { toggleView, changeSort } = products.actions;

export default products.reducer;
