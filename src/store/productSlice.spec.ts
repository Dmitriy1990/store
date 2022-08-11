import axios from 'axios';
import { fetchProducts } from './productsSlice';

describe('get product', () => {
  it('calls product id', async () => {
    const mock = [
      {
        id: 5,
        title: 'Nike',
        description: 'Nike Air Max Pre-Day',
        discount: 0.2,
        price: 17900,
        oldPrice: 19700,
        image:
          'https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/6420ad8f-a803-4bc0-9bf3-85a0feac922f/air-max-pre-day-mens-shoes-JBXGg7.png',
        fullDescription:
          'Сейчас мужские кроссовки коллекции Air Jordan являются отличным выбором не только для занятий профессиональным спортом, но и для ежедневных выходов. Главная особенность коллекции заключается в широком выборе цветов мужских кроссовок. Купить мужские кроссовки Nike Air Jordan можно как в классическом белом и черном цветах, так и с использованием незаурядного синего, голубого, красного и зеленого тонов.'
      }
    ];
    const dispatch = jest.fn();
    const thunk = fetchProducts();
    await thunk(dispatch, () => {}, 1);
    const path = dispatch.mock.calls[0][0].type;
    expect(dispatch.mock.calls.length).toBe(2);
  });
});
