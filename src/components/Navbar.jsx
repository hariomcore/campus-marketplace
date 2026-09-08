import React from "react";
import Notification from "./Notification";
import { NavLink, Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const goToPostItem = () => {
    navigate("/post-item");
  };

  const openNotifications = () => {
    navigate("/notifications");
  };

  return (
    <header className="navbar">
      {/* Logo */}
      <Link to="/" className="logo">
        <div className="logo-icon">🎓</div>

        <div className="logo-text">
          Campus
          <br />
          <span>Marketplace</span>
        </div>
      </Link>

      {/* Navigation */}
      <nav className="nav-links">
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          Home
        </NavLink>

        <NavLink
          to="/browse"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          Browse
        </NavLink>

        <NavLink
          to="/categories"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          Categories
        </NavLink>

        <NavLink
          to="/how-it-works"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          How It Works
        </NavLink>

        <NavLink
          to="/about"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          About Us
        </NavLink>
      </nav>

      {/* Right side */}
      <div className="nav-right">
        <button className="post-btn" onClick={goToPostItem}>
          ＋ Post an Item
        </button>

        <button
          className="notification-btn"
          onClick={openNotifications}
          title="Notifications"
        >
          <Notification />
        </button>

        <Link to="/wishlist" className="wishlist-btn" title="Wishlist">
          ♡
        </Link>

        <Link to="/login" className="login-btn">
          <div className="profile-icon">♙</div>

          <span>Login</span>
        </Link>
      </div>
    </header>
  );
}

export default Navbar;