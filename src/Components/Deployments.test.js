import { render, screen } from '@testing-library/react';
import Deployments from './Deployments';
import userEvent from "@testing-library/user-event";

test('Deployments title test', () => {
  render(<Deployments />);
  const linkElement = screen.getByText(/deployments/i);
  expect(linkElement).toBeInTheDocument();
});

test("allows users to add deployment - no entry", () => {
  // setup
  const testData = [];

  deploymentEntryTest(testData, /0\/week/i);
});

test("allows users to add deployment - single entry", () => {

  // setup
  const testData = [
    {
      date: "2021-07-27",
      time: "02:31",
      expected: "7/27/2021 2:31:00 AM"
    }
  ]

  deploymentEntryTest(testData, /1\/week/i);
});

test("allows users to add deployment - two entries", () => {

  // setup
  const testData = [
    {
      date: "2021-07-05",
      time: "02:05",
      expected: "7/5/2021 2:05:00 AM"
    },
    {
      date: "2021-07-06",
      time: "02:06",
      expected: "7/6/2021 2:06:00 AM"
    }
  ]

  deploymentEntryTest(testData, /2\/week/i);
});

test("allows users to add deployment - two entries over a one month span", () => {

  // setup
  const testData = [
    {
      date: "2021-07-01",
      time: "02:01",
      expected: "7/1/2021 2:01:00 AM"
    },
    {
      date: "2021-07-30",
      time: "02:30",
      expected: "7/30/2021 2:30:00 AM"
    }
  ]

  deploymentEntryTest(testData, /0.4\/week/i);
});


test("allows users to add deployment - multiple entries", () => {
  // setup
  const testData = [
    {
      date: "2021-07-08",
      time: "04:05",
      expected: "7/8/2021 4:05:00 AM"
    },
    {
      date: "2021-07-10",
      time: "16:05",
      expected: "7/10/2021 4:05:00 PM"
    },
    {
      date: "2021-07-06",
      time: "01:23",
      expected: "7/6/2021 1:23:00 AM"
    },
    {
      date: "2021-07-07",
      time: "07:27",
      expected: "7/7/2021 7:27:00 AM"
    }
  ];

  deploymentEntryTest(testData, /4\/week/i);
});

test("allows users to add deployment - multiple entries", () => {
  // setup
  const testData = [
    {
      date: "2021-07-08",
      time: "04:08",
      expected: "7/8/2021 4:08:00 AM"
    },
    {
      date: "2021-07-10",
      time: "16:10",
      expected: "7/10/2021 4:10:00 PM"
    },
    {
      date: "2021-07-20",
      time: "01:20",
      expected: "7/20/2021 1:20:00 AM"
    },
    {
      date: "2021-07-21",
      time: "07:21",
      expected: "7/21/2021 7:21:00 AM"
    },
    {
      date: "2021-07-22",
      time: "07:22",
      expected: "7/22/2021 7:22:00 AM"
    }
  ];

  deploymentEntryTest(testData, /1.7\/week/i);
});

test("allows users to add deployment - five weeks in a month", () => {
  // setup
  const testData = [
    {
      date: "2021-07-01",
      time: "04:08",
      expected: "7/1/2021 4:08:00 AM"
    },
    {
      date: "2021-07-10",
      time: "16:10",
      expected: "7/10/2021 4:10:00 PM"
    },
    {
      date: "2021-07-20",
      time: "01:20",
      expected: "7/20/2021 1:20:00 AM"
    },
    {
      date: "2021-07-21",
      time: "07:21",
      expected: "7/21/2021 7:21:00 AM"
    },
    {
      date: "2021-07-27",
      time: "07:22",
      expected: "7/27/2021 7:22:00 AM"
    }
  ];

  deploymentEntryTest(testData, /1\/week/i);
});

test("allows users to add deployment - Empty entry data", () => {

  // setup
  const testData = [
    {
      date: "",
      time: "",
      expected: "12/1/1899 12:00:00 AM"
    }
  ]

  deploymentEntryTest(testData, /1\/week/i);
});

function deploymentEntryTest(testData, freqRegX) {
  // setup
  localStorage.clear();

  // Sort testData - leave the original array unsorted
  var sortedTestData = testData.slice().sort(function(a,b){
    var dtA = a.date + a.time;
    var dtB = b.date + b.time;
    if (dtB < dtA) {
      return -1;
    }
    if (dtB > dtA) {
      return 1;
    }
    return 0;
  });

  // execution 

  render(<Deployments />);

  const dateField = screen.getByLabelText("Deployment Date");
  const timeField = screen.getByLabelText("Deployment Time");
  const addDeploymentButton = screen.getByTestId("addDeploymentButton");

  // Add the test data - unsorted
  for(var i = 0; i < testData.length; i++) {
    userEvent.type(dateField, testData[i].date);
    userEvent.type(timeField, testData[i].time);
    userEvent.click(addDeploymentButton);
  }

  // assertion
  // expect(deploymentCount).toHaveValue(sortedTestData.length);

  // check number of rows in table
  const tableRows = screen.queryAllByRole('row');
  expect(tableRows).toHaveLength(sortedTestData.length);

  // Test the table data - sorted
  for(var i = 0; i < tableRows.length; i++) {
    var row = tableRows[i];
    // screen.debug(row);
    expect(row).toHaveTextContent(sortedTestData[i].expected);
  }

  if (typeof freqRegX !== "undefined") {
    const freqElement = screen.getByText(freqRegX);
    expect(freqElement).toBeInTheDocument();
  }
}

