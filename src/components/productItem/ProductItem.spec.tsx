import React from 'react';
import { render, fireEvent, waitForElementToBeRemoved } from '@testing-library/react';
import { ProductItem } from './ProductItem';

describe('ProductItem', () => {
  it('Counter value if button click add', () => {
    const { queryByTestId } = render(<ProductItem />);
    const btn = queryByTestId('add');
    const counter = queryByTestId('counter');
    fireEvent.click(btn as HTMLElement);
    fireEvent.click(btn as HTMLElement);
    expect(counter?.textContent).toBe('3');
  });

  it('Counter value if button click dec', () => {
    const { queryByTestId } = render(<ProductItem />);
    const btn = queryByTestId('dec');
    const counter = queryByTestId('counter');
    fireEvent.click(btn as HTMLElement);
    fireEvent.click(btn as HTMLElement);
    expect(counter?.textContent).toBe('1');
  });
});
