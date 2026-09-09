import React, { useState } from "react";
import "./Categories.css";
import Navbar from "../components/Navbar";


const categories = [
  {
    name: "Books & Notes",
    className: "books",
    icon: "📚",
    description:
      "Textbooks, semester notes, reference books and study material.",
  },
  {
    name: "Electronics",
    className: "electronics",
    icon: "💻",
    description:
      "Laptops, headphones, calculators, keyboards and gadgets.",
  },
  {
    name: "Furniture",
    className: "furniture",
    icon: "🪑",
    description:
      "Study chairs, tables, shelves and hostel furniture.",
  },
  {
    name: "Clothing",
    className: "clothing",
    icon: "👕",
    description:
      "College wear, jackets, shoes, bags and accessories.",
  },
  {
    name: "Sports",
    className: "sports",
    icon: "🏀",
    description:
      "Footballs, basketballs, cricket equipment and fitness gear.",
  },
  {
    name: "Hobbies",
    className: "hobbies",
    icon: "🎸",
    description:
      "Musical instruments, art supplies, games and hobby items.",
  },
  {
    name: "Stationery",
    className: "stationery",
    icon: "✏️",
    description:
      "Pens, notebooks, files, drawing tools and writing essentials.",
  },
  {
    name: "Hostel Essentials",
    className: "hostel",
    icon: "🛏️",
    description:
      "Lamps, storage items, room accessories and daily essentials.",
  },
  {
    name: "Others",
    className: "others",
    icon: "•••",
    description:
      "Discover other useful products available from students.",
  },
];

function Categories() {
  const [searchText, setSearchText] = useState("");

  const filteredCategories = categories.filter((category) => {
    const search = searchText.toLowerCase().trim();

    return (
      category.name.toLowerCase().includes(search) ||
      category.description.toLowerCase().includes(search)
    );
  });

  const openCategory = (category) => {
    window.location.href =
      "/browse?category=" + encodeURIComponent(category);
  };

  const goToPostItem = () => {
    window.location.href = "/post-item";
  };

  const goToNotifications = () => {
    window.location.href = "/notification";
  };

  return (
    <div className="categories-page">
      {/* NAVBAR */}
      <header className="navbar">

        {/* LOGO */}
        <a href="/" className="logo">
          <div className="logo-icon">
            🎓
          </div>

          <div className="logo-text">
            Campus<br />
            <span>Marketplace</span>
          </div>
        </a>

        {/* NAVIGATION */}
        <nav className="nav-links">
          <a href="/">Home</a>

          <a href="/browse">Browse</a>

          <a href="/categories" className="active">
            Categories
          </a>

          <a href="/how-it-works">
            How It Works
          </a>

          <a href="/about">
            About Us
          </a>
        </nav>

        {/* RIGHT SIDE */}
        <div className="nav-right">

          <button
            className="post-btn"
            onClick={goToPostItem}
          >
            + Post an Item
          </button>

          <button
            className="notification-btn"
            onClick={goToNotifications}
            title="Notifications"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" />
              <path d="M10 21h4" />
            </svg>
          </button>

          <a href="/login" className="login-btn">

            <div className="profile-icon">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle
                  cx="12"
                  cy="8"
                  r="3"
                />

                <path
                  d="M5 21c0-3.5 3-6 7-6s7 2.5 7 6"
                />
              </svg>
            </div>

            <span>Login</span>

          </a>
        </div>
      </header>

      {/* PAGE HEADER */}
      <section className="page-header">

        <h1>
          Browse Categories
        </h1>

        <p>
          Find exactly what you need from your campus community.
        </p>

      </section>

      {/* MAIN CONTENT */}
      <main className="main-container">

        {/* SEARCH */}
        <div className="search-container">

          <div className="search-icon">

            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle
                cx="11"
                cy="11"
                r="7"
              />

              <path d="m20 20-4-4" />
            </svg>

          </div>

          <input
            type="text"
            placeholder="Search categories..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />

          <button
            className="search-btn"
            onClick={() => setSearchText(searchText)}
          >
            Search
          </button>

        </div>

        {/* TITLE */}
        <div className="section-title">

          <h2>
            All Categories
          </h2>

          <p>
            Explore items by category
          </p>

        </div>

        {/* CATEGORY GRID */}
        <div className="category-grid">

          {filteredCategories.map((category) => (

            <div
              key={category.name}
              className={`category-card ${category.className}`}
              onClick={() => openCategory(category.name)}
            >

              <div className="category-icon">
                {category.icon}
              </div>

              <div className="category-arrow">
                →
              </div>

              <h3>
                {category.name}
              </h3>

              <p>
                {category.description}
              </p>

            </div>

          ))}

        </div>

        {/* BOTTOM FEATURES */}
        <section className="features">

          <div className="feature">

            <div className="feature-icon">
              🛡️
            </div>

            <div>
              <h4>
                Safe Marketplace
              </h4>

              <p>
                Connect with students from your campus.
              </p>
            </div>

          </div>

          <div className="feature">

            <div className="feature-icon">
              💰
            </div>

            <div>
              <h4>
                Student-Friendly Prices
              </h4>

              <p>
                Find useful products at affordable prices.
              </p>
            </div>

          </div>

          <div className="feature">

            <div className="feature-icon">
              ⚡
            </div>

            <div>
              <h4>
                Easy Discovery
              </h4>

              <p>
                Find products quickly through categories.
              </p>
            </div>

          </div>

        </section>

      </main>

    </div>
  );
}

export default Categories;