import React, { useState } from "react";
import "./HowItWorks.css";

function HowItWorks() {
  const [showNotifications, setShowNotifications] = useState(false);

  const goToPostItem = () => {
    window.location.href = "/post-item";
  };

  const goToBrowse = () => {
    window.location.href = "/browse";
  };

  return (
    <div className="how-it-works-page">

      {/* NAVBAR */}
      <header className="navbar">

        <a href="/" className="logo">
          <div className="logo-icon">
            🎓
          </div>

          <div className="logo-text">
            Campus<br />
            <span>Marketplace</span>
          </div>
        </a>

        <nav className="nav-links">
          <a href="/">Home</a>
          <a href="/browse">Browse</a>
          <a href="/categories">Categories</a>

          <a href="/how-it-works" className="active">
            How It Works
          </a>

          <a href="/about">About Us</a>
        </nav>

        <div className="nav-right">

          <button
            className="post-btn"
            onClick={goToPostItem}
          >
            ＋ Post an Item
          </button>

          <button
            className="notification-btn"
            onClick={() =>
              setShowNotifications(!showNotifications)
            }
          >
            ♧
          </button>

          <a href="/login" className="login-btn">

            <div className="profile-icon">
              ♙
            </div>

            <span>Login</span>

          </a>

        </div>

      </header>

      {/* NOTIFICATION */}
      {showNotifications && (
        <div className="notification-popup show">
          <h3>Notifications</h3>

          <p>
            You currently have no new notifications.
          </p>
        </div>
      )}

      {/* HERO */}
      <section className="hero">

        <div className="hero-badge">
          Simple • Fast • Student Friendly
        </div>

        <h1>
          How Campus Marketplace{" "}
          <span>Works</span>
        </h1>

        <p>
          Buy and sell items within your college
          community in just a few simple steps.
        </p>

      </section>

      {/* MAIN */}
      <main className="container">

        {/* STEPS */}
        <div className="section-heading">

          <h2>
            Get Started in 4 Easy Steps
          </h2>

          <p>
            Everything you need to buy or sell on campus.
          </p>

        </div>

        <section className="steps">

          {/* STEP 1 */}
          <div className="step">

            <div className="step-number">
              1
            </div>

            <div className="step-icon">
              🔎
            </div>

            <h3>
              Browse
            </h3>

            <p>
              Explore books, electronics,
              furniture, clothing and other
              products listed by students.
            </p>

          </div>

          {/* STEP 2 */}
          <div className="step">

            <div className="step-number">
              2
            </div>

            <div className="step-icon">
              ❤️
            </div>

            <h3>
              Choose
            </h3>

            <p>
              Find an item you like and
              check its price, condition,
              category and location.
            </p>

          </div>

          {/* STEP 3 */}
          <div className="step">

            <div className="step-number">
              3
            </div>

            <div className="step-icon">
              💬
            </div>

            <h3>
              Connect
            </h3>

            <p>
              Contact the seller and
              arrange a convenient place
              and time to meet.
            </p>

          </div>

          {/* STEP 4 */}
          <div className="step">

            <div className="step-number">
              4
            </div>

            <div className="step-icon">
              🤝
            </div>

            <h3>
              Buy or Sell
            </h3>

            <p>
              Complete the transaction
              safely and enjoy a simple
              campus marketplace experience.
            </p>

          </div>

        </section>

        {/* BUY / SELL */}
        <section className="two-column">

          {/* BUY */}
          <div className="info-card">

            <div className="info-card-header">

              <div className="info-card-icon">
                🛒
              </div>

              <h3>
                Buying an Item
              </h3>

            </div>

            <ul className="info-list">

              <li>
                <span className="check">✓</span>
                Browse available listings.
              </li>

              <li>
                <span className="check">✓</span>
                Use categories and search
                to find what you need.
              </li>

              <li>
                <span className="check">✓</span>
                Check the item's condition,
                price and location.
              </li>

              <li>
                <span className="check">✓</span>
                Contact the seller.
              </li>

              <li>
                <span className="check">✓</span>
                Meet on campus and
                complete the purchase.
              </li>

            </ul>

          </div>

          {/* SELL */}
          <div className="info-card">

            <div className="info-card-header">

              <div className="info-card-icon">
                📦
              </div>

              <h3>
                Selling an Item
              </h3>

            </div>

            <ul className="info-list">

              <li>
                <span className="check">✓</span>
                Click "Post an Item".
              </li>

              <li>
                <span className="check">✓</span>
                Add the product name,
                price and category.
              </li>

              <li>
                <span className="check">✓</span>
                Upload clear product
                photos.
              </li>

              <li>
                <span className="check">✓</span>
                Add your campus location
                and item condition.
              </li>

              <li>
                <span className="check">✓</span>
                Publish your listing and
                connect with buyers.
              </li>

            </ul>

          </div>

        </section>

        {/* SAFETY */}
        <section className="safety">

          <div className="safety-icon">
            🛡️
          </div>

          <div>

            <h2>
              Stay Safe While Trading
            </h2>

            <p>
              Meet in public campus locations,
              verify the item before making a
              payment, and never share your
              password or sensitive account
              information with anyone.
            </p>

          </div>

        </section>

        {/* CTA */}
        <section className="cta">

          <h2>
            Ready to Get Started?
          </h2>

          <p>
            Find something useful or sell
            something you no longer need.
          </p>

          <div className="cta-buttons">

            <button
              className="cta-primary"
              onClick={goToBrowse}
            >
              Browse Listings
            </button>

            <button
              className="cta-secondary"
              onClick={goToPostItem}
            >
              ＋ Post an Item
            </button>

          </div>

        </section>

      </main>

    </div>
  );
}

export default HowItWorks;