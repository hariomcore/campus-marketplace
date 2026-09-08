import React from "react";
import "./Notifications.css";

function Notifications() {
  return (
    <div className="notifications-page">
      <div className="notifications-container">
        <div className="notifications-header">
          <h1>Notifications</h1>
          <p>Stay updated with activity on your campus marketplace.</p>
        </div>

        <div className="notifications-empty">
          <div className="notifications-icon">🔔</div>
          <h2>No New Notifications</h2>
          <p>You currently have no new notifications.</p>
        </div>
      </div>
    </div>
  );
}

export default Notifications;