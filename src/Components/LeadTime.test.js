import { render, screen } from '@testing-library/react';
import LeadTime from './LeadTime';
import userEvent from "@testing-library/user-event";


test('Lead Time title test', () => {
  render(<LeadTime />);
  const linkElement = screen.getAllByText(/Lead Time/)[0];
  expect(linkElement).toBeInTheDocument();
})

test("allows users to add greater than 1 minute leadtime", () => {
  // setup
  leadTimeTest(31);
});

test("allows users to add one minute leadtime", () => {
  // setup
  leadTimeTest(1);
});

function leadTimeTest(time) {
    // setup
    localStorage.clear();
    var expected = '';
    if (time === 1) {
      expected = time + ' minute';
    } else {
      expected = time + ' minutes';
    }
  
    // execution 
    render(<LeadTime />);
  
    const inputField = screen.getByLabelText("Change Lead Time (in minutes)");
  
    userEvent.type(inputField, time.toString());
    userEvent.click(screen.getByRole("button"));
  
    expect(screen.getByText(expected)).toBeVisible();
}
