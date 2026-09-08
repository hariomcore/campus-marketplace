import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function ProductCard({ name, price, image, alt }) {
  const navigate = useNavigate();
  const [liked, setLiked] = useState(() => {
    const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
    return wishlist.some((item) => item.name === name);
  });

  const openProduct = () => {
  navigate("/product?name=" + encodeURIComponent(name));
};

  const toggleHeart = (event) => {
    event.stopPropagation();

    const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");

    if (liked) {
      const updatedWishlist = wishlist.filter(
        (item) => item.name !== name
      );

      localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
      setLiked(false);
    } else {
      const product = {
        name,
        price,
        image,
        alt,
      };

      wishlist.push(product);

      localStorage.setItem("wishlist", JSON.stringify(wishlist));
      setLiked(true);
    }
  };

  return (
    <div className="product" onClick={openProduct}>
      <button
        className={`heart ${liked ? "active" : ""}`}
        onClick={toggleHeart}
      >
        {liked ? "♥" : "♡"}
      </button>

      <img
        className="product-image"
        src={image}
        alt={alt}
      />

      <div className="product-info">
        <div className="product-name">{name}</div>
        <div className="price">{price}</div>
      </div>
    </div>
  );
}

export default ProductCard;