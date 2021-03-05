import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import { Provider } from 'react-redux';
import store from './app/store';

it('renders app title', () => {
    render(
        <Provider store={store}>
            <App/>
        </Provider>
    );
    const element = screen.getByText(/YoGa/);
    expect(element).toBeInTheDocument();
});
