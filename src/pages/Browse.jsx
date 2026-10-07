import React from "react";
import { useEffect, useMemo, useState } from "react";
import "./Browse.css";
import Navbar from "../components/Navbar";

const products = [
  {
    name: "Engineering Mathematics Book",
    category: "Books & Notes",
    price: 350,
    condition: "Good Condition",
    image:
      "https://cbspd.s3.ap-south-1.amazonaws.com/assets/images/m37TTvJYYCNsdf2V6X951732859387.jpg",
  },
  {
    name: "HP Pavilion Laptop",
    category: "Electronics",
    price: 28000,
    condition: "Like New",
    image:
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=700&q=85",
  },
  {
    name: "Study Chair",
    category: "Furniture",
    price: 1200,
    condition: "Good Condition",
    image:
      "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?auto=format&fit=crop&w=700&q=85",
  },
  {
    name: "Boat Headphones",
    category: "Electronics",
    price: 1000,
    condition: "Like New",
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=700&q=85",
  },
  {
    name: "Skybags Backpack",
    category: "Bags",
    price: 800,
    condition: "Good Condition",
    image:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=700&q=85",
  },
  {
    name: "Yamaha Acoustic Guitar",
    category: "Hobbies",
    price: 5500,
    condition: "Good Condition",
    image:
      "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?auto=format&fit=crop&w=700&q=85",
  },
];

const categories = [
  "All",
  "Books & Notes",
  "Electronics",
  "Furniture",
  "Clothing",
  "Sports",
  "Hobbies",
];

function Browse() {
  const [postedProducts, setPostedProducts] = useState(() => {
    return JSON.parse(localStorage.getItem("listings") || "[]");
  });

  useEffect(() => {
  const listings = JSON.parse(
    localStorage.getItem("listings") || "[]"
  );

  const cleanedListings = listings.filter(
    (item) => Number(item.price) > 0
  );

  localStorage.setItem(
    "listings",
    JSON.stringify(cleanedListings)
  );

  setPostedProducts(cleanedListings);
  }, []);

  const cleanedProducts = postedProducts.filter(
    (product) => Number(product.price) > 0
  );
  
  const allProducts = [...products, ...cleanedProducts];

  const params = new URLSearchParams(window.location.search);

  const urlCategory = params.get("category");
  const urlSearch = params.get("search");

  const validCategory = categories.includes(urlCategory)
    ? urlCategory
    : "All";

  const [category, setCategory] = useState(validCategory);
  const [search, setSearch] = useState(urlSearch || "");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [sort, setSort] = useState("newest");
  const [wishlist, setWishlist] = useState([]);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  /*
   * Update browser URL when category/search changes.
   * This keeps compatibility with the old browse.html URL structure.
   */
  useEffect(() => {
    const newParams = new URLSearchParams();

    if (category !== "All") {
      newParams.set("category", category);
    }

    if (search.trim()) {
      newParams.set("search", search.trim());
    }

    const query = newParams.toString();

    window.history.replaceState(
      {},
      "",
      query ? `/browse?${query}` : "/browse"
    );
  }, [category, search]);

  /*
   * Filtering + sorting
   */
  const filteredProducts = useMemo(() => {
    const minimum = minPrice === "" ? 0 : Number(minPrice);
    const maximum =
      maxPrice === "" ? Infinity : Number(maxPrice);

    let result = allProducts.filter((product) => {
      const matchesSearch = product.name
        .toLowerCase()
        .includes(search.toLowerCase().trim());

      const matchesCategory =
        category === "All" ||
        product.category === category;

      const matchesPrice =
        product.price >= minimum &&
        product.price <= maximum;

      return (
        matchesSearch &&
        matchesCategory &&
        matchesPrice
      );
    });

    if (sort === "low") {
      result.sort((a, b) => a.price - b.price);
    }

    if (sort === "high") {
      result.sort((a, b) => b.price - a.price);
    }

    if (sort === "name") {
      result.sort((a, b) =>
        a.name.localeCompare(b.name)
      );
    }

    return result;
  }, [category, search, minPrice, maxPrice, sort]);

  /*
   * Category selection
   */
  const selectCategory = (selectedCategory) => {
    setCategory(selectedCategory);
  };

  /*
   * Wishlist
   */
  const toggleWishlist = (event, productName) => {
    event.stopPropagation();

    setWishlist((previous) => {
      if (previous.includes(productName)) {
        return previous.filter(
          (name) => name !== productName
        );
      }

      return [...previous, productName];
    });
  };

  /*
   * Open product details
   */
  const openProduct = (product) => {
    const productParams = new URLSearchParams();

    productParams.set("name", product.name);
    productParams.set("category", product.category);
    productParams.set("price", product.price);

    window.location.href =
      `/product?${productParams.toString()}`;
  };

  /*
   * Reset all filters
   */
  const resetFilters = () => {
    setSearch("");
    setMinPrice("");
    setMaxPrice("");
    setCategory("All");
    setSort("newest");
  };

  /*
   * Navigation
   *
   * If your React Router uses different paths,
   * change these paths here only.
   */
  const goTo = (path) => {
    window.location.href = path;
  };

  return (
    <>
      <Navbar />
      
      {/* ================= NOTIFICATION ================= */}

      {notificationsOpen && (
        <div className="notification-popup">
          <h3>Notifications</h3>

          <p>
            You currently have no new notifications.
          </p>
        </div>
      )}

      {/* ================= PAGE HEADER ================= */}

      <section className="page-header">
        <div className="header-inner">
          <h1>Browse Listings</h1>

          <p>
            Discover great products from students around
            your campus.
          </p>
        </div>
      </section>

      {/* ================= MAIN ================= */}

      <main className="main-container">

        {/* ================= FILTER SIDEBAR ================= */}

        <aside className="filters">
          <h2>Filters</h2>

          <div className="filter-section">
            <div className="filter-title">
              Category
            </div>

            {categories.map((item) => (
              <label
                className="radio-row"
                key={item}
              >
                <input
                  type="radio"
                  name="categoryFilter"
                  value={item}
                  checked={category === item}
                  onChange={() =>
                    selectCategory(item)
                  }
                />

                {item === "All"
                  ? "All Categories"
                  : item}
              </label>
            ))}
          </div>

          {/* PRICE */}

          <div className="filter-section">
            <div className="filter-title">
              Price Range
            </div>

            <div className="price-inputs">
              <input
                type="number"
                placeholder="Min"
                value={minPrice}
                onChange={(event) =>
                  setMinPrice(event.target.value)
                }
              />

              <input
                type="number"
                placeholder="Max"
                value={maxPrice}
                onChange={(event) =>
                  setMaxPrice(event.target.value)
                }
              />
            </div>
          </div>

          <button
            className="reset-btn"
            onClick={resetFilters}
          >
            Reset Filters
          </button>
        </aside>

        {/* ================= CONTENT ================= */}

        <section className="content">

          {/* SEARCH */}

          <div className="search-row">
            <div className="search-box">
              <svg viewBox="0 0 24 24">
                <circle
                  cx="11"
                  cy="11"
                  r="7"
                />
                <path d="m20 20-4-4" />
              </svg>

              <input
                type="text"
                placeholder="Search books, electronics, furniture..."
                value={search}
                onChange={(event) =>
                  setSearch(event.target.value)
                }
              />
            </div>

            <button
              className="search-button"
              onClick={() => setSearch(search.trim())}
            >
              Search
            </button>
          </div>

          {/* CATEGORY BUTTONS */}

          <div className="category-buttons">
            {categories.map((item) => (
              <button
                key={item}
                className={`category-btn ${
                  category === item ? "active" : ""
                }`}
                onClick={() =>
                  selectCategory(item)
                }
              >
                {item}
              </button>
            ))}
          </div>

          {/* RESULTS HEADER */}

          <div className="results-header">
            <div className="results-count">
              Showing {filteredProducts.length} listings
            </div>

            <select
              className="sort-select"
              value={sort}
              onChange={(event) =>
                setSort(event.target.value)
              }
            >
              <option value="newest">
                Newest
              </option>

              <option value="low">
                Price: Low to High
              </option>

              <option value="high">
                Price: High to Low
              </option>

              <option value="name">
                Name
              </option>
            </select>
          </div>

          {/* PRODUCTS */}

          <div className="products">
            {filteredProducts.map((product) => {
              const isWishlisted =
                wishlist.includes(product.name);

              return (
                <div
                  className="product"
                  key={product.name}
                  onClick={() =>
                    openProduct(product)
                  }
                >
                  <div className="product-image-container">
                    <img
                      className="product-image"
                      src={product.image}
                      alt={product.name}
                    />

                    <button
                      className={`heart ${
                        isWishlisted ? "active" : ""
                      }`}
                      onClick={(event) =>
                        toggleWishlist(
                          event,
                          product.name
                        )
                      }
                      aria-label={
                        isWishlisted
                          ? "Remove from wishlist"
                          : "Add to wishlist"
                      }
                    >
                      <svg viewBox="0 0 24 24">
                        <path d="M20.8 8.8c0 5.2-8.8 10.2-8.8 10.2S3.2 14 3.2 8.8A4.8 4.8 0 0 1 12 6.2a4.8 4.8 0 0 1 8.8 2.6Z" />
                      </svg>
                    </button>
                  </div>

                  <div className="product-info">
                    <div className="product-name">
                      {product.name}
                    </div>

                    <div className="price">
                      ₹{Number(product.price || 0).toLocaleString("en-IN")}
                    </div>

                    <div className="product-bottom">
                      <span className="condition">
                        {product.condition}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* EMPTY STATE */}

            {filteredProducts.length === 0 && (
              <div className="empty">
                <h2>No products found</h2>

                <p>
                  Try changing your search or filters.
                </p>
              </div>
            )}
          </div>
        </section>
      </main>
    </>
  );
}

export default Browse;