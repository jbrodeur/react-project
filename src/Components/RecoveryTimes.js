import "./App.css";
import React, { useState } from "react";
import {
  formatTime,
  formatDate,
  minuteString,
  jsDate,
} from "./dateUtility";

function RecoveryTimes(props) {
  const sectionTitle = "Recovery Times";

  // define state for the list of Deployments
  const localStorageName = "RecoveryTimes";
  const savedFailures = JSON.parse(localStorage.getItem(localStorageName));
  var [failures, setFailures] = useState(savedFailures || []);

  // define state for the Deployments form
  const [newFailure, setNewFailure] = useState({
    date: "",
    duration: 0,
    time: "",
  });

  function calculateMTTR(failures) {
    var ave;
    if (failures.length <= 0) {
      ave = 0;
    }
    else if (failures.length === 1) {
      ave = parseInt(failures[0].duration, 10);
    }
    else {
      const total = failures.reduce((acc, c) => acc + parseInt(c.duration, 10), 0);
      ave = Math.round(total / failures.length * 10) / 10 ;  
    }

     return ave + " " +  minuteString(ave);
  }

  // define the function that runs when the form is submitted
  const createFailure = (e) => {
    e.preventDefault();
    var sorted = [...failures, newFailure].sort(function (a, b) {
      return jsDate(b.date, b.time) - jsDate(a.date, a.time);
    });

    setFailures((failure) => sorted );
    localStorage.setItem(localStorageName, JSON.stringify(sorted))

    if (typeof props.setFailureCount != "undefined") {
      props.setFailureCount((failureCount) => sorted.length );
    }

    setNewFailure({ date: "", duration: 0, time: "" });
  };


  return (
    <div className="AppSection">
      <h3>{sectionTitle}</h3>

      <p>
        MTTR: <strong>{calculateMTTR(failures)}</strong>
      </p>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Start Time</th>
            <th> Duration (minutes)</th>
          </tr>
        </thead>
        <tbody>
          {failures.map((failure, i) => (
            <tr key={i}>
              <td>
                {formatDate(failure.date, failure.time) +
                  " " +
                  formatTime(failure.date, failure.time)}
              </td>
              <td className="right-justified"> {failure.duration}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <form onSubmit={createFailure}>
        <p>
          <label htmlFor="date">Start Date</label>
          <input
            id="date"
            className="form-control"
            type="date"
            required
            name="date"
            value={newFailure.date}
            onChange={(e) =>
              setNewFailure({ ...newFailure, date: e.target.value })
            }
          />

          <label htmlFor="time">Start Time</label>
          <input
            id="time"
            className="form-control"
            type="time"
            required
            name="time"
            value={newFailure.time}
            onChange={(e) =>
              setNewFailure({ ...newFailure, time: e.target.value })
            }
          />
        </p>
        <p>
          <label htmlFor="duration">Duration</label>
          <input
            id="duration"
            className="form-control"
            type="number"
            min="0"
            required
            name="duration"
            value={newFailure.duration}
            onChange={(e) =>
              setNewFailure({ ...newFailure, duration: e.target.value })
            }
          />
        </p>
        <button data-testid="addRecoveryTimeButton" type="submit" className="btn btn-primary">
          Add Recovery Time
        </button>
      </form>
    </div>
  );
}

export default RecoveryTimes;
