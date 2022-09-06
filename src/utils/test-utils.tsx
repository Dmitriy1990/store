import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { render } from '@testing-library/react';
import { RootState, getStoreWithState } from '../store/store';

export function renderWithContext(el: React.ReactElement, state?: RootState) {
  const store = getStoreWithState(state);
  const utils = render(
    <Provider store={store}>
      <Router>{el}</Router>
    </Provider>
  );
  return { store, ...utils };
}
