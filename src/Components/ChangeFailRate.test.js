import { render, screen } from '@testing-library/react';
import ChangeFailRate from './ChangeFailRate';
// import userEvent from "@testing-library/user-event";

test('Change Fail Rate title test', () => {
  render(<ChangeFailRate />);
  const linkElement = screen.getAllByText(/Change Fail Rate/)[0];
  expect(linkElement).toBeInTheDocument();
});

test("test change fail rate - deployments=0, failures=0", () => {
  // setup
  changeFailRateEntryTest(0, 0, '0%');
});

test("test change fail rate - deployments=2, failures=0", () => {
  // setup
  changeFailRateEntryTest(2, 0, '0%');
});

test("test change fail rate - deployments=0, failures=1", () => {
  // setup
  changeFailRateEntryTest(0, 1, '100%');
});

test("test change fail rate - deployments=1, failures=3", () => {
  // setup
  changeFailRateEntryTest(1, 3, '100%');
});

test("test change fail rate - deployments=3, failures=1", () => {
  // setup
  changeFailRateEntryTest(3, 1, '33.3%');
});

test("test change fail rate - deployments=7, failures=3", () => {
  // setup
  changeFailRateEntryTest(7, 3, '42.9%');
});

test("test change fail rate - deployments=3, failures=7", () => {
  // setup
  changeFailRateEntryTest(3, 7, '100%');
});

test("test change fail rate - deployments=11, failures=3", () => {
  // setup
  changeFailRateEntryTest(11, 3, '27.3%');
});

function changeFailRateEntryTest(deploymentCount, failureCount, freqRegX) {
  // setup

  // execution 
  render(<ChangeFailRate deploymentCount={deploymentCount} failureCount={failureCount} />);

  // assertion

  if (typeof freqRegX !== "undefined") {
    const freqElement = screen.getByText(freqRegX);
    expect(freqElement).toBeInTheDocument();
  }
}
