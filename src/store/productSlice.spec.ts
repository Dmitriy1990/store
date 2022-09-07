import product, { clear, ProductType, fetchProduct } from './productSlice';
import { getStoreWithState } from './store';
import { Product } from '../types/product';

const stateWithBasket = (data: { data: Product | null; loading: boolean }) => ({
  products: {
    data: [],
    totalRecords: 0,
    loading: true,
    column: false,
    sort: 'asc,desc',
    num: 0
  },
  product: { data, loading: true },
  basket: data
});

const mock = {
  id: 1,
  title: 'Nike',
  description: 'Nike Air Max Flyknit Racer',
  discount: 0.1,
  price: 19200,
  oldPrice: 24900,
  image:
    'https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/1492bfe1-0bd0-4697-b20b-cb41ec5b4f6b/air-max-flyknit-racer-mens-shoes-PsrWR7.png',
  fullDescription:
    'Сейчас мужские кроссовки коллекции Air Jordan являются отличным выбором не только для занятий профессиональным спортом, но и для ежедневных выходов. Главная особенность коллекции заключается в широком выборе цветов мужских кроссовок. Купить мужские кроссовки Nike Air Jordan можно как в классическом белом и черном цветах, так и с использованием незаурядного синего, голубого, красного и зеленого тонов.',
  count: 1
};

describe('Product reducer', () => {
  it('should return empty state when passed an empty action', () => {
    const initialState = undefined;
    const action = { type: '' };
    const result = product(initialState, action);
    expect(result).toEqual({ data: null, loading: true });
  });

  it('should clear value', () => {
    const initialState = { data: mock, loading: false };
    const action = clear();
    const result = product(initialState as ProductType, action);
    expect(result).toEqual({ data: null, loading: false });
  });

  it('thunk', async () => {
    const dispatch = jest.fn();
    const initialState: ProductType = { data: mock, loading: false };
    const thunk = fetchProduct(1);
    await thunk(dispatch, () => initialState, undefined);
    const { calls } = dispatch.mock;
    expect(calls).toHaveLength(2);
    expect(calls[0][0].type).toEqual('product/fetchProduct/pending');
    expect(calls[1][0].type).toEqual('product/fetchProduct/fulfilled');
    expect(calls[1][0].payload).toEqual(mock);
  });

  it('thunk rejected', async () => {
    const dispatch = jest.fn();
    const thunk = fetchProduct(1000);
    await thunk(dispatch, () => ({}), undefined);
    const { calls } = dispatch.mock;
    expect(calls).toHaveLength(2);
    expect(calls[0][0].type).toEqual('product/fetchProduct/pending');
    expect(calls[1][0].type).toEqual('product/fetchProduct/rejected');
    expect(calls[1][0].payload).toEqual(undefined);
  });

  it('test state product', async () => {
    const initialState: ProductType = { data: mock, loading: false };
    const state = stateWithBasket(initialState);
    const store = getStoreWithState(state as any);
    await store.dispatch(fetchProduct(4));
    expect(store.getState().basket).toEqual(initialState);
  });

  it('test state product rejected', async () => {
    const initialState: ProductType = { data: null, loading: false };
    const state = stateWithBasket(initialState);
    const store = getStoreWithState(state as any);
    await store.dispatch(fetchProduct.rejected(null, '', 3));
    expect(store.getState().basket).toEqual(initialState);
  });
});
