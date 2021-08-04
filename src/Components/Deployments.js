import './App.css';
import React, { useState } from "react";
import {formatTime, formatDate, jsDate, weeksBetween} from "./dateUtility"

function Deployments(props) {
  const sectionTitle = 'Deployments';

  // define state for the list of Deployments
  const localStorageName = "Deployments";
  const savedDeployments = JSON.parse(localStorage.getItem(localStorageName));
  var [deployments, setDeployments] = useState(savedDeployments || []);
  
  // define state for the Deployments form
  const [newDeployment, setNewDeployment] = useState({ date: "", time: "" });

  // define the function that runs when the form is submitted
  const createDeployment = (e) => {
    e.preventDefault();

    var sorted = [...deployments, newDeployment].sort(function(a,b){
      return jsDate(b.date, b.time) - jsDate(a.date, a.time);
    });

    setDeployments((deployment) => sorted);

    localStorage.setItem(localStorageName, JSON.stringify(sorted));

    if (typeof props.setDeploymentCount != "undefined") {
      props.setDeploymentCount((deploymentCount) => sorted.length);
    }

    setNewDeployment({ date: "", time: "" });
  };

  function calculateFrequency(deployments) {
    var frequency = 0;
    if (deployments.length <= 0) {
      return 0;
    }
    if (deployments.length === 1) {
      return 1;
    }

    // Compute the number of weeks from the first deploment to the last deployment
    var numWeeks = 0;

    var dt2 = jsDate(deployments[0].date, '');
    var dt1 = jsDate(deployments[deployments.length-1].date, '');
    numWeeks = weeksBetween(dt1, dt2);
    // Need to add one for average calc
    numWeeks++;

    // calculate deployment frequency (Number of deployments divided by the number of weeks between first deployment and last deployment)
    frequency = deployments.length / numWeeks;

    // Round to 1 decimal place
    return Math.round(frequency * 10) / 10;
  }

  return (
    <div className="AppSection">
      <h3>{sectionTitle}</h3>
      <p>Frequency: <strong>{calculateFrequency(deployments) + '/week'}</strong></p>
      <table className="table table-striped">
        <tbody>
          {deployments.map((deployment, i) => (
            <tr key={i}>
              <td>{(i+1)+'.'}</td>
              <td>{formatDate(deployment.date, deployment.time) + ' ' + formatTime(deployment.date, deployment.time)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <form onSubmit={createDeployment}>
        <p>
          <label htmlFor="date">Deployment Date</label>
          <input
            id="date"
            className="form-control"
            type="date"
            required
            name="date"
            value={newDeployment.date}
            onChange={(e) => setNewDeployment({ ...newDeployment, date: e.target.value })}
          />
        </p>
        <p>
          <label htmlFor="time">Deployment Time</label>
          <input
            id="time"
            className="form-control"
            type="time"
            required
            name="time"
            value={newDeployment.time}
            onChange={(e) => setNewDeployment({ ...newDeployment, time: e.target.value })}
          />
        </p>
        <button data-testid="addDeploymentButton" type="submit" className="btn btn-primary">Add Deployment</button>
      </form>
    </div>
  );
}

export default Deployments;
