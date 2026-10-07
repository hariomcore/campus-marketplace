import React, { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import Notification from "./Notification";
import { NavLink, Link, useNavigate } from "react-router-dom";

const SUPABASE_URL = "https://kgblcekcxkkmigjsbwbo.supabase.co";

const SUPABASE_KEY =
  "sb_publishable_vevfsasP9ZzzU8zCLh5qWQ_H4uLd_2W";

const supabase = createClient(
  SUPABASE_URL,
  SUPABASE_KEY
);

function Navbar() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [profilePhoto, setProfilePhoto] = useState(
    localStorage.getItem("profilePhoto") || null
  );
  useEffect(() => {
  const getUser = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    setUser(user);
  };

  getUser();

    const handlePhotoChange = () => {
      const photo = localStorage.getItem("profilePhoto");
      setProfilePhoto(photo);
    };

    window.addEventListener(
      "profilePhotoChanged",
      handlePhotoChange
    );

    return () => {
      window.removeEventListener(
        "profilePhotoChanged",
        handlePhotoChange
      );
    };
  }, []);
  

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

        <button
          className="cart-link"
          onClick={() => navigate("/cart")}
        >
          🛒 Cart
        </button>

      <div className="profile-area">

      <button
        className="profile-icon"
        onClick={() => {
            if (user) {
            navigate("/profile");
          } else {
            navigate("/login");
          }
        }}
        title={user ? "Profile" : "Login"}
      >
        {profilePhoto ? (
        <img
          src={profilePhoto}
          alt="Profile"
        />
          ) : (
          "♙"
          )}
      </button>

      {user ? (
      <button
        className="login-text"
        onClick={() => navigate("/profile")}
      >
        Profile
        </button>
        ) : (
        <Link to="/login" className="login-text">
        Login
        </Link>
        )}
      </div>

      </div>
    </header>
  );
}

export default Navbar;