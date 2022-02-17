import { render, screen } from '@testing-library/react';
import App from './App';

test('The shopping list app For a busy world', () => {
  render(<App />);
  const linkElement = screen.getByText(/The shopping list app For a busy world/i);
  expect(linkElement).toBeInTheDocument();
});
