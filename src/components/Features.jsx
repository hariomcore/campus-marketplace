import React from "react";

function Features() {
  return (
    <section className="features">
      <div className="feature">
        <div className="feature-icon">🛡️</div>

        <div>
          <h3>Safe & Secure</h3>

          <p>
            Verified users only. Your safety
            <br />
            is our priority.
          </p>
        </div>
      </div>

      <div className="feature">
        <div className="feature-icon">👥</div>

        <div>
          <h3>For Students, By Students</h3>

          <p>
            Built exclusively for our college
            <br />
            community.
          </p>
        </div>
      </div>

      <div className="feature">
        <div className="feature-icon">🏷️</div>

        <div>
          <h3>Great Deals</h3>

          <p>
            Find the best items at
            <br />
            unbeatable prices.
          </p>
        </div>
      </div>
    </section>
  );
}

export default Features;