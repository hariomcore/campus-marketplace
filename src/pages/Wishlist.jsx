import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Wishlist.css";

function Wishlist() {
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const savedWishlist = JSON.parse(
      localStorage.getItem("wishlist") || "[]"
    );

    setWishlist(savedWishlist);
  }, []);

  const removeFromWishlist = (name) => {
    const updatedWishlist = wishlist.filter(
      (item) => item.name !== name
    );

    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
    setWishlist(updatedWishlist);
  };

  return (
    <div className="wishlist-page">
      <div className="wishlist-container">

        <div className="wishlist-header">
          <h1>My Wishlist</h1>
          <p>Items you have saved for later.</p>
        </div>

        {wishlist.length === 0 ? (
          <div className="wishlist-empty">
            <div className="wishlist-empty-icon">♡</div>

            <h2>Your Wishlist is Empty</h2>

            <p>
              Save items you like by clicking the heart button on a product.
            </p>

            <Link to="/browse" className="wishlist-browse-btn">
              Browse Listings
            </Link>
          </div>
        ) : (
          <div className="wishlist-grid">
            {wishlist.map((item) => (
              <div className="wishlist-card" key={item.name}>

                <div className="wishlist-image-container">
                  <img
                    src={item.image}
                    alt={item.alt}
                    className="wishlist-image"
                  />
                </div>

                <div className="wishlist-info">
                  <h3>{item.name}</h3>

                  <div className="wishlist-price">
                    {item.price}
                  </div>

                  <button
                    className="wishlist-remove-btn"
                    onClick={() => removeFromWishlist(item.name)}
                  >
                    Remove from Wishlist
                  </button>
                </div>

              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}

export default Wishlist;