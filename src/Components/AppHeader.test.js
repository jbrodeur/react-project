import { render, screen } from '@testing-library/react';
import AppHeader from './AppHeader';

test('AppHeader test', () => {
  render(<AppHeader />);
  const linkElement = screen.getByText(/software delivery performance metrics/i);
  expect(linkElement).toBeInTheDocument();
});
