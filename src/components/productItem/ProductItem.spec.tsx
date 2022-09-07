import React from 'react';
import { render, fireEvent, waitForElementToBeRemoved } from '@testing-library/react';
import { ProductItem } from './ProductItem';

const mock = {
  id: 5,
  title: 'Nike',
  description: 'Nike Air Max Pre-Day',
  discount: 0.2,
  price: 17900,
  oldPrice: 19700,
  image:
    'https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/6420ad8f-a803-4bc0-9bf3-85a0feac922f/air-max-pre-day-mens-shoes-JBXGg7.png',
  fullDescription:
    'Сейчас мужские кроссовки коллекции Air Jordan являются отличным выбором не только для занятий профессиональным спортом, но и для ежедневных выходов. Главная особенность коллекции заключается в широком выборе цветов мужских кроссовок. Купить мужские кроссовки Nike Air Jordan можно как в классическом белом и черном цветах, так и с использованием незаурядного синего, голубого, красного и зеленого тонов.',
  count: 2
};

describe('ProductItem', () => {
  it('Counter value if button click add', () => {
    const { queryByTestId } = render(<ProductItem data={mock} onDelete={() => undefined} />);
    const btn = queryByTestId('add');
    const counter = queryByTestId('counter');
    fireEvent.click(btn as HTMLElement);
    fireEvent.click(btn as HTMLElement);
    expect(counter?.textContent).toBe('4');
  });

  it('Counter value if button click dec', () => {
    const { queryByTestId } = render(<ProductItem data={mock} onDelete={() => undefined} />);
    const btn = queryByTestId('dec');
    const counter = queryByTestId('counter');
    fireEvent.click(btn as HTMLElement);
    fireEvent.click(btn as HTMLElement);
    expect(counter?.textContent).toBe('1');
  });
});
