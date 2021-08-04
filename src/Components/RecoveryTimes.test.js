import { render, screen } from "@testing-library/react";
import RecoveryTimes from "./RecoveryTimes";
import userEvent from "@testing-library/user-event";

test("Recovery Times title test", () => {
  render(<RecoveryTimes />);
  const linkElement = screen.getByText(/recovery times/i);
  expect(linkElement).toBeInTheDocument();
});

test("Allows users to add a recovery", () => {
  // setup
  const testData = [
    {
      date: "2021-07-01",
      time: "02:01",
      duration: 120,
      expected: "7/1/2021 2:01:00 AM",
    },
    {
      date: "2021-07-30",
      time: "02:30",
      duration: 60,
      expected: "7/30/2021 2:30:00 AM",
    },
  ];
  const regexPattern = '90 minutes';
  recoveryTimeEntryTest(testData, regexPattern);
  
});
test("allows users to add a recovery time - multiple entries", () => {
  // setup
  const testData = [
    {
      date: "2021-07-08",
      time: "04:08",
      duration: 42,
      expected: "7/8/2021 4:08:00 AM",
    },
    {
      date: "2021-07-10",
      time: "16:10",
      duration: 60,
      expected: "7/10/2021 4:10:00 PM",
    },
    {
      date: "2021-07-20",
      time: "01:20",
      duration: 90,
      expected: "7/20/2021 1:20:00 AM",
    },
    {
      date: "2021-07-21",
      time: "07:21",
      duration: 120,
      expected: "7/21/2021 7:21:00 AM",
    },
    {
      date: "2021-07-22",
      time: "07:22",
      duration: 150,
      expected: "7/22/2021 7:22:00 AM",
    },
    {
      date: "2021-07-25",
      time: "07:22",
      duration: 113,
      expected: "7/25/2021 7:22:00 AM",
    },
  ];

  recoveryTimeEntryTest(testData, '95.8 minutes');
});

test("allows users to add a recovery time - rounding needed", () => {
  // setup
  const testData = [
    {
      date: "2021-07-08",
      time: "04:08",
      duration: 10,
      expected: "7/8/2021 4:08:00 AM",
    },
    {
      date: "2021-07-10",
      time: "16:10",
      duration: 13,
      expected: "7/10/2021 4:10:00 PM",
    },
    {
      date: "2021-07-20",
      time: "01:20",
      duration: 15,
      expected: "7/20/2021 1:20:00 AM",
    },
  ];

  recoveryTimeEntryTest(testData, '12.7 minutes');
});

test("allows users to add a recovery time - multiple entries", () => {
  // setup
  const testData = [
    {
      date: "2021-07-08",
      time: "04:08",
      duration: 1,
      expected: "7/8/2021 4:08:00 AM",
    },
  ];

  recoveryTimeEntryTest(testData, '1 minute');
});

function recoveryTimeEntryTest(testData, RegX) {
  // setup
localStorage.clear();
   //Sort testData - leave the original array unsorted
  var sortedTestData = testData.slice().sort(function (a, b) {
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
  render(<RecoveryTimes/>);

  const dateField = screen.getByLabelText("Start Date");
  const timeField = screen.getByLabelText("Start Time");
  const durationField = screen.getByLabelText("Duration");
  const addRecoveryButton = screen.getByTestId("addRecoveryTimeButton");
  // const addRecoveryButton = screen.getByRole("button");

  // Add the test data - unsorted
  for (var i = 0; i < testData.length; i++) {
    userEvent.type(dateField, testData[i].date);
    userEvent.type(timeField, testData[i].time);
    userEvent.type(durationField,testData[i].duration.toString());
    userEvent.click(addRecoveryButton);
  }

  // assertion

  // check number of rows in table
  const tableRows = screen.queryAllByRole("row");
  expect(tableRows).toHaveLength(testData.length + 1);

  // Test the table data - sorted
  for (var i = 0; i < sortedTestData.length; i++) {
    var row = tableRows[i + 1];
    // screen.debug(row);
    expect(row).toHaveTextContent(sortedTestData[i].expected);
  }

  if (typeof RegX !== "undefined") {
    const freqElement = screen.getByText(RegX);
    expect(freqElement).toBeInTheDocument();
  }
}
