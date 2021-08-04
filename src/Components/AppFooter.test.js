import { render, screen } from '@testing-library/react';
import AppFooter from './AppFooter';

test('AppFooter test', () => {
  render(<AppFooter />);
  const linkElement = screen.getByText(/developed with ♥ by -/i);
  expect(linkElement).toBeInTheDocument();
});
