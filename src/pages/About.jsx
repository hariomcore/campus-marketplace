import React, { useState } from "react";
import "./About.css";

function About() {
  const [showNotifications, setShowNotifications] = useState(false);

  const goToPostItem = () => {
    window.location.href = "/post-item";
  };

  const goToBrowse = () => {
    window.location.href = "/browse";
  };

  return (
    <div className="about-page">

      {/* NAVBAR */}
      <header className="navbar">

        <a href="/" className="logo">
          <div className="logo-icon">🎓</div>

          <div className="logo-text">
            Campus<br />
            <span>Marketplace</span>
          </div>
        </a>

        <nav className="nav-links">
          <a href="/">Home</a>
          <a href="/browse">Browse</a>
          <a href="/categories">Categories</a>
          <a href="/how-it-works">How It Works</a>
          <a href="/about" className="active">
            About Us
          </a>
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
            <div className="profile-icon">♙</div>
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
          About Campus Marketplace
        </div>

        <h1>
          Built for Students,{" "}
          <span>By Students</span>
        </h1>

        <p>
          Campus Marketplace makes it simple for
          college students to buy, sell and discover
          useful products within their own campus
          community.
        </p>

      </section>

      {/* MAIN */}
      <main className="container">

        {/* INTRODUCTION */}
        <section className="intro">

          <div className="intro-text">

            <h2>
              Your Campus,{" "}
              <span>Your Marketplace</span>
            </h2>

            <p>
              Campus Marketplace is a student-focused
              platform designed to make buying and selling
              within a college community easier and more
              convenient.
            </p>

            <p>
              Instead of searching through random groups
              or relying on word of mouth, students can
              discover books, electronics, furniture,
              clothing, sports equipment and many other
              useful items in one place.
            </p>

            <p>
              Our goal is to create a simple and trusted
              digital marketplace where students can
              connect with other students around them.
            </p>

          </div>

          <div className="intro-visual">

            <div className="visual-content">

              <div className="visual-icon">
                🎓
              </div>

              <h3>Campus Marketplace</h3>

              <p>
                Buy • Sell • Connect
              </p>

            </div>

          </div>

        </section>

        {/* MISSION & VISION */}
        <section>

          <div className="section-heading">
            <h2>Our Mission & Vision</h2>

            <p>
              Creating a better marketplace experience
              for students.
            </p>
          </div>

          <div className="mission-grid">

            <div className="mission-card">

              <div className="mission-icon">
                🎯
              </div>

              <h3>Our Mission</h3>

              <p>
                Our mission is to provide students with
                an easy, affordable and convenient platform
                for buying and selling products within
                their campus community.
              </p>

            </div>

            <div className="mission-card">

              <div className="mission-icon">
                🚀
              </div>

              <h3>Our Vision</h3>

              <p>
                We envision a connected campus where
                students can easily exchange useful
                products, reduce waste and build stronger
                connections with their community.
              </p>

            </div>

          </div>

        </section>

        {/* FEATURES */}
        <section>

          <div className="section-heading">

            <h2>
              What Makes Campus Marketplace Different?
            </h2>

            <p>
              Designed around the needs of college students.
            </p>

          </div>

          <div className="features">

            <div className="feature">
              <div className="feature-icon">🏫</div>

              <h3>Campus Focused</h3>

              <p>
                Designed specifically for college
                communities, making it easier to find
                products close to you.
              </p>
            </div>

            <div className="feature">
              <div className="feature-icon">🔍</div>

              <h3>Easy Discovery</h3>

              <p>
                Search and browse products using
                categories, prices and locations.
              </p>
            </div>

            <div className="feature">
              <div className="feature-icon">💰</div>

              <h3>Student-Friendly Prices</h3>

              <p>
                Find affordable second-hand products
                and give unused items a new life.
              </p>
            </div>

            <div className="feature">
              <div className="feature-icon">🤝</div>

              <h3>Student Community</h3>

              <p>
                Connect directly with other students
                who are buying or selling items.
              </p>
            </div>

            <div className="feature">
              <div className="feature-icon">⚡</div>

              <h3>Simple Experience</h3>

              <p>
                A clean and straightforward interface
                makes buying and selling easy.
              </p>
            </div>

            <div className="feature">
              <div className="feature-icon">♻️</div>

              <h3>Reduce Waste</h3>

              <p>
                Help useful products stay in circulation
                instead of being thrown away.
              </p>
            </div>

          </div>

        </section>

        {/* VALUES */}
        <section className="values">

          <div className="values-heading">

            <h2>Our Core Values</h2>

            <p>
              The principles behind Campus Marketplace.
            </p>

          </div>

          <div className="values-grid">

            <div className="value">
              <div className="value-icon">🛡️</div>

              <h3>Trust</h3>

              <p>
                Building a marketplace
                students can rely on.
              </p>
            </div>

            <div className="value">
              <div className="value-icon">💡</div>

              <h3>Simplicity</h3>

              <p>
                Keeping the experience
                simple and easy to use.
              </p>
            </div>

            <div className="value">
              <div className="value-icon">👥</div>

              <h3>Community</h3>

              <p>
                Connecting students
                within their campus.
              </p>
            </div>

            <div className="value">
              <div className="value-icon">🌱</div>

              <h3>Sustainability</h3>

              <p>
                Giving products a second
                life and reducing waste.
              </p>
            </div>

          </div>

        </section>

        {/* CTA */}
        <section className="cta">

          <h2>
            Be Part of Your Campus Marketplace
          </h2>

          <p>
            Find something you need or sell something
            you no longer use.
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

export default About;