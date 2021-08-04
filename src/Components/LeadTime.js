import "./App.css";
import React, { useState } from "react";
import { minuteString } from "./dateUtility";

function LeadTime() {
  const sectionTitle = "Lead Time";

  // define state for the LeadTime form
  const localStorageName = "leadTime";
  const savedLeadTime = JSON.parse(localStorage.getItem(localStorageName));
  const [newLeadTime, setNewLeadTime] = useState({
    savedTime: savedLeadTime || "",
    time: "",
  });

  // define the function that runs when the form is submitted
  const createLeadTime = (e) => {
    e.preventDefault();
    setNewLeadTime({ ...newLeadTime, savedTime: newLeadTime.time });
    localStorage.setItem(localStorageName, JSON.stringify(newLeadTime.time));
  };

  return (
    <div className="AppSection">
      <h3>{sectionTitle}</h3>
      <p>
        From code pushed to code deployed:{" "}
        <strong>
          {newLeadTime.savedTime + " " + minuteString(newLeadTime.savedTime)}
        </strong>
      </p>
      <form onSubmit={createLeadTime}>
        <p>
          <label htmlFor="time">Change Lead Time (in minutes)</label>
          <input
            id="time"
            className="form-control"
            type="number"
            required
            min="1"
            name="time"
            value={newLeadTime.time}
            onChange={(e) =>
              setNewLeadTime({ ...newLeadTime, time: e.target.value })
            }
          />
        </p>
        <button type="submit" className="btn btn-primary">
          Update Lead Time
        </button>
      </form>
    </div>
  );
}

export default LeadTime;
