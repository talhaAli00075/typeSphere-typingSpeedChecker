import React from "react";
import "./Dashboard.css";

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <div className="dashboard-main">
        <div className="dashboard-profile">
          <img src="/images/icons8-person-50.png" alt="" />
          <div className="dashboard-profile-info">
            <p id="profile-username">talhaali0075</p>
            <p id="profile-joined">Joined on Jan 1, 2023</p>
          </div>
        </div>
        <div className="dashboard-starting">
          <p>test started</p>
          <p id="test-no">0</p>
        </div>
        <div className="dashboard-completed">
          <p>test started</p>
          <p id="test-com">0</p>
        </div>
        <div className="dashboard-total">
          <p>time playing</p>
          <p id="time-total">00:00:00</p>
        </div>
      </div>
      <div className="dashboard-history">
        <p>Test Completed</p>

        <p>WPM</p>

        <p>Accuracy</p>

        <p>Total Typed</p>

        <p>Wrong Typed</p>

        <p>Created At</p>
      </div>
    </div>
  );
};
export default Dashboard;
