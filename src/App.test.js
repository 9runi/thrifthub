import { render, screen } from '@testing-library/react';
import App from './App';

test('renders ThriftHub app', () => {
  render(<App />);
  const elements = screen.getAllByText(/ThriftHub/i);
  expect(elements.length).toBeGreaterThan(0);
});
