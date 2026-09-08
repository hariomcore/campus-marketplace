import React, { useState } from "react";
import "./Notification.css";

function Notification() {
  const [showNotification, setShowNotification] = useState(false);

  return (
    <>
      <button
        className="notification-btn"
        onClick={() => setShowNotification(!showNotification)}
        aria-label="Notifications"
      >
        🔔
      </button>

      {showNotification && (
        <div className="notification-popup">
          <h4>Notifications</h4>
          <p>You currently have no new notifications.</p>
        </div>
      )}
    </>
  );
}

export default Notification;