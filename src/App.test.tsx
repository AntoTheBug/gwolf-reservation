import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

it('renders app title', () => {
  render(<App />);
  const element = screen.getByText(/YoGa/);
  expect(element).toBeInTheDocument();
});
