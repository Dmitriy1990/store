import { fetchProducts } from './productsSlice';
import products, { toggleView, changeSort } from './productsSlice';
import data from '../data/index.json';
import { getStoreWithState } from './store';
import { Product } from '../types/product';
import { Sorted } from '../types/sort';

const stateWithProducts = (data: { data: Product[]; loading: boolean }) => ({
  data,
  totalRecords: 0,
  loading: data.loading,
  column: false,
  sort: 'asc,desc',
  num: 0
});

const initialState = {
  data: [],
  totalRecords: 0,
  loading: true,
  column: false,
  sort: Sorted.DEFAULT,
  num: 0
};

describe('Products reducer', () => {
  it('should return empty state when passed an empty action', () => {
    const initialState = undefined;
    const action = { type: '' };
    const result = products(initialState, action);
    expect(result).toEqual({
      data: [],
      totalRecords: 0,
      loading: true,
      column: false,
      sort: Sorted.DEFAULT,
      num: 0
    });
  });

  it('toggleview should change value', () => {
    const action = toggleView();
    let result = products(initialState, action);
    expect(result).toEqual({ ...initialState, column: true });
    result = products(result, action);
    expect(result).toEqual({ ...initialState, column: false });
  });

  it('changeSort should change value', () => {
    const action = changeSort(Sorted.ASC);
    let result = products(initialState, action);
    expect(result).toEqual({ ...initialState, sort: Sorted.ASC });
  });

  describe('thunk test', () => {
    it('fetchProduct mocked dispatch', async () => {
      const dispatch = jest.fn();
      const state = data.product.slice(0, 3);
      const thunk = fetchProducts({ sort: Sorted.DEFAULT, num: 0 });
      await thunk(dispatch, () => state, undefined);
      const { calls } = dispatch.mock;
      expect(calls).toHaveLength(2);
      expect(calls[0][0].type).toEqual('product/fetchProducts/pending');
      expect(calls[1][0].type).toEqual('product/fetchProducts/fulfilled');
      expect(calls[1][0].payload.count).toBe(data.product.length);
    });

    it('fetchProduct rejected', async () => {
      const state = stateWithProducts({ data: [], loading: false });
      const store = getStoreWithState(state as any);
      await store.dispatch(fetchProducts.rejected(null, '', { sort: Sorted.DEFAULT, num: 0 }));
      expect(store.getState().products.loading).toEqual(false);
    });

    it('test state products', async () => {
      const mock = {
        data: data.product.slice(0, 3),
        totalRecords: 0,
        loading: true,
        column: false,
        sort: Sorted.DEFAULT,
        num: 0
      };

      const store = getStoreWithState(mock as any);
      await store.dispatch(fetchProducts({ sort: Sorted.DEFAULT, num: 0 }));
      expect(store.getState().products.num).toEqual(3);
      expect(store.getState().products.totalRecords).toEqual(data.product.length);
      expect(store.getState().products.loading).toEqual(false);
    });

    it('addFetchProducts test', () => {});
  });
});
