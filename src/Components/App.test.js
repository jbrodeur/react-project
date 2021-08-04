import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/software delivery performance metrics/i);
  expect(linkElement).toBeInTheDocument();
});
