import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Hero() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const searchProducts = () => {
    const trimmedSearch = search.trim();

    if (trimmedSearch === "") {
      alert("Please enter an item to search.");
      return;
    }

    navigate("/browse?search=" + encodeURIComponent(trimmedSearch));
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      searchProducts();
    }
  };

  return (
    <section className="hero">
      <div className="hero-content">
        <h1>
          Buy. Sell. Connect.
          <br />
          All on Campus.
        </h1>

        <p>
          The easiest way to buy and sell items
          <br />
          within your college community.
        </p>

        <div className="search-box">
          <span className="search-icon">⌕</span>

          <input
            type="text"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search for items, books, gadgets and more..."
          />

          <button onClick={searchProducts}>Search</button>
        </div>
      </div>
    </section>
  );
}

export default Hero;