import { render, screen } from '@testing-library/react';
import AppBody from './AppBody';
import userEvent from "@testing-library/user-event";

test('renders learn react link', () => {
  render(<AppBody />);
  const deploymentSection = screen.getAllByText(/Deployments/)[0];
  const leadtimeSection = screen.getAllByText(/Lead Time/)[0];
  const recoverytimesSection = screen.getAllByText(/Recovery Times/)[0];
  const changefailSection = screen.getAllByText(/Change Fail Rate/)[0];

  expect(deploymentSection).toBeInTheDocument();
  expect(leadtimeSection).toBeInTheDocument();
  expect(recoverytimesSection).toBeInTheDocument();
  expect(changefailSection).toBeInTheDocument();
});

test("allows users to add deployment - five weeks in a month", () => {
  // setup
  const testDeploymentData = [
    {
      date: "2021-07-01",
      time: "04:08",
    },
    {
      date: "2021-07-10",
      time: "16:10",
    },
    {
      date: "2021-07-11",
      time: "16:11",
    }
  ];

  const testRecoveryData = [
    {
      date: "2021-07-01",
      time: "04:08",
      duration: 30,
    }
  ];

  dataEntryTest(testDeploymentData, testRecoveryData, '33.3%');
});

test("allows users to add deployment - five weeks in a month", () => {
  // setup
  const testDeploymentData = [
    {
      date: "2021-07-01",
      time: "04:08",
    },
    {
      date: "2021-07-10",
      time: "16:10",
    }
  ];

  const testRecoveryData = [
    {
      date: "2021-07-01",
      time: "04:08",
      duration: 30,
    }
  ];

  dataEntryTest(testDeploymentData, testRecoveryData, '50%');
});


function dataEntryTest(testDeploymentData, testRecoveryData, freqRegX) {
  // setup
  localStorage.clear();

  // execution 

  render(<AppBody />);

  const deploymentDateField = screen.getByLabelText("Deployment Date");
  const deploymentTimeField = screen.getByLabelText("Deployment Time");
  const deploymentButton = screen.getByTestId("addDeploymentButton");

  // Add the test data - unsorted
  for(var i = 0; i < testDeploymentData.length; i++) {
    userEvent.type(deploymentDateField, testDeploymentData[i].date);
    userEvent.type(deploymentTimeField, testDeploymentData[i].time);
    userEvent.click(deploymentButton);
  }

  const recoveryDateField = screen.getByLabelText("Start Date");
  const recoveryTimeField = screen.getByLabelText("Start Time");
  const recoveryDurationField = screen.getByLabelText("Duration");
  const recoveryButton = screen.getByTestId("addRecoveryTimeButton");

  // Add the test data - unsorted
  for(var i = 0; i < testRecoveryData.length; i++) {
    userEvent.type(deploymentDateField, testRecoveryData[i].date);
    userEvent.type(deploymentTimeField, testRecoveryData[i].time);
    userEvent.type(recoveryDurationField, testRecoveryData[i].duration.toString());
    userEvent.click(recoveryButton);
  }

  if (typeof freqRegX !== "undefined") {
    const freqElement = screen.getByText(freqRegX);
    expect(freqElement).toBeInTheDocument();
  }
}


