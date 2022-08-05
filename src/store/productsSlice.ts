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
      console.log('actions', actions);
      console.log('state', state);
    });
    builder.addCase(fetchProducts.rejected, (state, actions) => {
      console.log('actions', actions);
      state.loading = false;
    });
  }
});

const todoSlice = createSlice({
  name: 'todos',
  initialState: {
    todos: [] as any[]
    // other: newTodo.getInitialState
  },
  reducers: {
    addTodo(state, action) {
      console.log('state', state);
      console.log('action', action);
      state.todos.push({
        id: new Date().toISOString(),
        text: action.payload.value,
        completed: false
      });
    },
    toggleTodo(state, action) {
      state.todos = state.todos.map((item: any) => {
        if (item.id !== action.payload) return item;
        else
          return {
            ...item,
            completed: !item.completed
          };
      });
    },
    delTodo(state, action) {
      state.todos = state.todos.filter((i: any) => i.id !== action.payload);
    }
  }
});

export const { addTodo, toggleTodo, delTodo } = todoSlice.actions;

export default products.reducer;
